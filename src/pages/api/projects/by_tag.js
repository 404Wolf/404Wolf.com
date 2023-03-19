export default async function handler(req, res) {
    const url = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`

    // Fetch the list of all project data using the listed endpoint
    let projects = await fetch(`${url}/api/projects/listed`)
        .then(res => res.json())
        .then(data => data.projects)

    // Now that we have a list of all the projects' data, we can filter them by tag
    const located = {}  // All projects that have the tag
    Object.entries(projects).forEach(([ id, data ]) => {
        if (data.tags.includes(req.headers.tag)) {
            located[id] = data;
        }
    });

    res.status(200).json({ located: located })
}