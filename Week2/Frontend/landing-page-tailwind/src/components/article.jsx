import MobileMainCover from '../assets/images/image-web-3-mobile.jpg';
// import DesktopMainCover from '../assets/images/image-web-3-desktop.jpg';
import { React } from 'react'

export const Article = () => {
    return (
        <div className='md:grid grid-cols-3 gap-1'>
            <div className='col-span-2 border-2'>
                <article
                    aria-label="Headline Article"
                    className="lg:col-span-2 lg:grid xl:block"
                >
                    {/* Image on top */}
                    <img
                        className="md:desktop-article-cover aspect-square object-cover lg:h-full lg:object-cover md:aspect-auto xl:h-auto xl:object-contain"
                        alt="Geometric Shapes"
                        src={MobileMainCover}
                    />
                </article>

            </div>
            {/* news in right */}
            <div className='row-span-2 border-2'>      
            <h2 className="text-soft-orange text-4xl font-bold">New</h2>
                <article>
                    <a href="/">
                        <h3 className="text-white font-bold text-xl mt-7 mb-2 focus:text-soft-orange hover:text-soft-orange">
                            Hydrogen VS Electric Cars
                        </h3>
                    </a>
                    <p className="text-grayish-blue mb-7 leading-7">
                        Will hydrogen-fueled cars ever catch up to EVs?
                    </p>
                </article>
                <hr className="border-0 h-px bg-dark-grayish-blue" />
                <article>
                    <a href="/">
                        <h3 className="text-white font-bold text-xl mt-7 mb-2 focus:text-soft-orange hover:text-soft-orange">
                            The Downsides of AI Artistry
                        </h3>
                    </a>
                    <p className="text-grayish-blue mb-7 leading-7">
                        What are the possible adverse effects of on-demand AI image
                        generation?
                    </p>
                </article>
                <hr className="border-0 h-px bg-dark-grayish-blue" />
                <article>
                    <a href="/">
                        <h3 className="text-white font-bold text-xl mt-7 mb-2 focus:text-soft-orange hover:text-soft-orange">
                            Is VC Funding Drying Up?
                        </h3>
                    </a>
                    <p className="text-grayish-blue mb-7 leading-7">
                        Private funding by VC firms is down 50% YOY. We take a look at what
                        that means.
                    </p>
                </article>
            </div>
            <div className='border-2'>
                <div className="grid lg:grid-cols-2 mt-8 gap-4">
                    <h1 className="font-black text-5xl lg:text-6xl text-very-dark-blue">
                        The Bright Future of Web 3.0?
                    </h1>
                </div>

            </div>
            {/* under banner */}
            <div className='border-2'>
                <div className="relative grid gap-8 lg:block">
                    <p className="text-dark-grayish-blue">
                        We dive into the next evolution of the web that claims to put the
                        power of the platforms back into the hands of the people. But is it
                        really fulfilling its promise?
                    </p>
                    <a
                        className="lg:bottom-0 uppercase font-semibold bg-soft-red hover:lightVermillionColor focus:darkSpaceBlueColor py-3 px-9 text-white"
                        href="/"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};