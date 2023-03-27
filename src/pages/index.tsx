import PostCardGrid from '@/components/posts/PostCardGrid'
import About from '@/components/about/About'
import Header from '@/components/header/Header'
import MainLayout from '@/layouts/MainLayout'
import Greeter from '@/components/header/Greeter'
import Tile from '@/components/misc/Tile'
import useSize from '@/utils/useSize'
import PostData from '@/components/posts/PostData'
import { list_posts } from './api/posts'

export async function getStaticProps() {
    const posts = await list_posts();

    return {
        props: {
            posts
        },
    }
}

interface HomeProps {
    posts: PostData[];
}

const Home = ({ posts }: HomeProps) => {
    const screenSize = useSize()

    return (
        <MainLayout header={<Greeter/>} headerWidth="w-[13.5rem] sm:w-[20rem]">
            <div className="flex flex-col gap-7">
                <Tile>
                    <Header/>
                </Tile>

                <div className="flex flex-col min-[520px]:flex-row gap-7 sm:gap-6">
                    <div className="sm:basis-[30%]">
                        <Tile title="Featured">
                            <PostCardGrid
                                onlyFeatured
                                posts={ posts }
                                showTags={ ["ongoing"] }
                                minAmount={ (screenSize[0] <= 640) ? 6 : undefined }
                                gridConfig="grid-cols-2 sm:grid-cols-1"
                            />
                        </Tile>
                    </div>
                    <div className="basis-[75%]">
                        <About/>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home
