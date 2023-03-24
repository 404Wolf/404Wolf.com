export async function getServerSideProps() {
    return {
            redirect: {
            destination: '/',
            permanent: true,
        },
    };
}

export default function Page() { <div>Redirecting...</div> }
