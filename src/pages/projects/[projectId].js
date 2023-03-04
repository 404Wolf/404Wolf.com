// import MainLayout from '@/components/layouts/main';
// import { projectIds } from "@/projects/projects.json";

// const Project = ({ projectId }) => {
//     return (
//         <MainLayout>
//             { projectId }
//         </MainLayout>
//     );
// }
 
// export async function getStaticPaths () {
//     const paths = []
//     for (let i=0; i < projectIds.length; i++) {
//         paths.push({
//             params: { projectId: projectIds[i] }
//         })
//     }
//     console.log(paths)
//     return {
//         paths,
//         fallback: false
//     }
// }

// export async function getStaticProps({ params }) {
//     const postData = getPostData(params.id);
//     return {
//         props: {
//         postData,
//         },
//     };
// }

// export default Project;