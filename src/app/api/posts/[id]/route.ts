import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import s3 from "@/utils/aws";

const prisma = new PrismaClient();

export async function GET(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const post: any = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      resources: true,
    },
  });

  try {
    post.markdown = {
      id: post?.markdown,
      data: await fetch(s3.resourceUrl(`${post.markdown}.md`)).then((res) =>
        res.text(),
      ),
    };
  } catch {
    post.markdown = {
      id: post?.markdown,
      data: null,
    };
  }

  if (post === null) {
    return NextResponse.json(
      {
        status: "Error",
        message: "Unable to locate post",
      },
      {
        status: 404,
      },
    );
  } else {
    return NextResponse.json({
      status: "Success",
      data: post,
    });
  }
}

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const body = await req.json();

  let markdownId;
  if (body?.markdown?.id) {
    markdownId = body.markdown.id;
  } else {
    markdownId = `${id}_00001`;
  }

  if (
    await prisma.post.findUnique({
      where: { id: id },
    })
  ) {
    return NextResponse.json(
      {
        status: "Error",
        message: `Post "${id}" already exists.`,
      },
      {
        status: 400,
      },
    );
  }

  let resourceData = null;
  try {
    resourceData = await s3.getResource(`${markdownId}.md`, "utf-8");
  } catch {}

  const resourceEntry = await prisma.resource.findUnique({
    where: { id: markdownId },
  });

  if (resourceEntry && resourceData !== "" && resourceData !== null) {
    return NextResponse.json(
      {
        status: "Error",
        message: `Post "${id}" already exists.`,
      },
      {
        status: 400,
      },
    );
  }

  try {
    console.log(body);

    await prisma.post.create({
      data: {
        id: id,
        title: body.title || id,
        description: body.description || "",
        markdown: body.markdown?.id || `${id}_00001`,
        covers: body.covers,
        type: body.type,
        date: body.date,
        tags: body.tags,
        notes: body.notes,
        resources: resourceEntry
          ? {
              connect: [{ id: markdownId }],
            }
          : {
              create: [
                {
                  id: markdownId,
                  title: "Post Markdown",
                  filename: `${markdownId}.md`,
                  url: s3.resourceUrl(`${markdownId}.md`),
                  type: "markdown",
                },
              ],
            },
      },
    });
  } catch {
    return NextResponse.json(
      {
        status: "Error",
        message: "Failed to create post. Failed to create post entry.",
      },
      {
        status: 500,
      },
    );
  }

  // If we detected that the markdown file exists and is empty and
  // they have passed data, update its contents. If it didn't exist create
  // it with an empty string.
  if (body.markdown?.data || !resourceEntry || !resourceData)
    if (
      !(await s3.addResource(
        `${markdownId}.md`,
        body.markdown?.data || "",
        "str",
        "text/plain",
      ))
    ) {
      await prisma.post.delete({ where: { id: id } });
      return NextResponse.json(
        {
          status: "Error",
          message: "Failed to create post. Failed to create markdown resource.",
        },
        {
          status: 500,
        },
      );
    }

  return NextResponse.json({
    status: "Success",
    message: "Post successfully created",
  });
}

export async function DELETE(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
    include: {
      resources: true,
    },
  });
  if (post === null) {
    return NextResponse.json(
      {
        status: "Error",
        message: "Unable to locate post",
      },
      {
        status: 404,
      },
    );
  }
  await prisma.post.delete({
    where: {
      id: post.id,
    },
  });
  await Promise.all(
    post.resources.map((resource) => {
      try {
        s3.removeResource(resource.filename);
      } catch {}
    }),
  );

  return NextResponse.json({
    status: "Success",
    message: "Post successfully deleted",
  });
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const body = await req.json();

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  if (post === null) {
    return NextResponse.json(
      {
        status: "Error",
        message: "Unable to locate post",
      },
      {
        status: 404,
      },
    );
  }

  if (body.markdown) {
    await s3.addResource(
      `${body.markdown.id}.md`,
      body.markdown.data,
      "str",
      "text/plain",
    );
  }

  await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      id: body.id,
      title: body.title,
      description: body.description,
      markdown: body.markdown?.id,
      covers: body.covers,
      type: body.type,
      date: body.date,
      tags: body.tags,
      editedAt: new Date(),
      notes: body.notes,
    },
  });

  return NextResponse.json({
    status: "Success",
    message: "Post successfully updated",
  });
}
