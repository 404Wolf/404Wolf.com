export async function getServerSideProps() {
    return {
            redirect: {
            destination: '/resume.pdf',
            permanent: true,
        },
    };
}

export default function Page() { <div>Redirecting...</div> }
