export default async function handler(req, res) {
    const url = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`

    // Fetch the list of all project ids using the listed endpoint
    let projects = await fetch(`${url}/api/projects/listed`)
        .then(res => res.json())
        .then(data => data.projects)

    // Fetch data for each project using the by_id endpoint
    projects = await Promise.all(projects.map(projectId => {
        return fetch(`${url}/api/projects/by_id`, {headers: {id: projectId}})
            .then(res => res.json())
            .then(data => data.data);
    }))

    // Now that we have a list of all the projects' data, we can filter them by tag
    const located = []  // All projects that have the tag
    projects.forEach(project => {
        if (project.tags.includes(req.headers.tag)) {
            located.push(project);
        }
    });
    res.status(200).json({ located: located })
}