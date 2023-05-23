import MobileMainCover from '../assets/images/image-web-3-mobile.jpg';
// import DesktopMainCover from '../assets/images/image-web-3-desktop.jpg';
import { React } from 'react'

export const Article = () => {
    return (
        <div className='md:grid grid-cols-3 grid-rows-flex'>
            <div className='col-span-2 '>
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
            {/* Title under banner */}
            <div className='lg:relative flex mt-4'>
                <div className="">
                    <h1 className="lg:block top-0 font-black text-darkSpaceBlueColor text-5xl lg:text-6xl">
                        The Bright Future of Web 3.0?
                    </h1>
                </div>

            </div>
            {/* under banner */}
            <div className='lg:relative flex mt-4'>
                <div className="lg:relative grid lg:block">
                    <p className="text-gunMentalColor">
                        We dive into the next evolution of the web that claims to put the
                        power of the platforms back into the hands of the people. But is it
                        really fulfilling its promise?
                    </p>
                    <a className="w-fit lg:absolute cursor-pointer tracking-[0.25rem] py-3 px-9 mt-7 max-h-12 bottom-0 uppercase font-semibold bg-lightVermillionColor hover:bg-darkSpaceBlueColor focus:bg-darkSpaceBlueColor text-backgroundColorWhite">
                        Read More
                    </a>
                </div>
            </div>
            {/* news in right */}
            <div className='col-start-3 row-start-1 row-span-2 bg-darkSpaceBlueColor p-8 xs: mt-[3rem] md:mt-0 md:ml-8'>
                <h2 className="text-yellowColor text-4xl font-bold">New</h2>
                <article>
                    <a href="/">
                        <h3 className="text-backgroundColorWhite font-bold text-xl mt-7 mb-2 focus:text-yellowColor hover:text-yellowColor">
                            Hydrogen VS Electric Cars
                        </h3>
                    </a>
                    <p className="text-silverColor mb-7 leading-7">
                        Will hydrogen-fueled cars ever catch up to EVs?
                    </p>
                </article>
                <hr className="border-0 h-px bg-gunMentalColor" />
                <article>
                    <a href="/">
                        <h3 className="text-backgroundColorWhite font-bold text-xl mt-7 mb-2 focus:text-yellowColor hover:text-yellowColor">
                            The Downsides of AI Artistry
                        </h3>
                    </a>
                    <p className="text-silverColor mb-7 leading-7">
                        What are the possible adverse effects of on-demand AI image
                        generation?
                    </p>
                </article>
                <hr className="border-0 h-px bg-gunMentalColor" />
                <article>
                    <a href="/">
                        <h3 className="text-backgroundColorWhite font-bold text-xl mt-7 mb-2 focus:text-yellowColor hover:text-yellowColor">
                            Is VC Funding Drying Up?
                        </h3>
                    </a>
                    <p className="text-silverColor mb-7 leading-7">
                        Private funding by VC firms is down 50% YOY. We take a look at what
                        that means.
                    </p>
                </article>
            </div>
        </div>
    );
};