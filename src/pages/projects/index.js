export async function getServerSideProps(context) {
    return {
            redirect: {
            destination: '/',
            permanent: true,
        },
    };
}

export default function Page() { <div>Redirecting...</div> }