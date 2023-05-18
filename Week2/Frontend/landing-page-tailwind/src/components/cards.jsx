import Article1Cover from '../assets/images/image-retro-pcs.jpg';
import Article2Cover from '../assets/images/image-top-laptops.jpg';
import Article3Cover from '../assets/images/image-gaming-growth.jpg';

export const Cards = () => {
    return (
        <section className="grid gap-6 md:grid-cols-3 md:mt-[5.5rem] mt-[4rem]">
            <article className="grid gap-6 grid-cols-3">
                <img alt="Retro Computers" src={Article1Cover} />
                <div className="col-span-2">
                    <div className="text-silverColor font-bold text-4xl">01</div>
                    <a href="/">
                        <h4 className="font-black text-darkSpaceBlueColor text-lg my-2 hover:text-lightVermillionColor focus:text-lightVermillionColor">
                            Reviving Retro PCs
                        </h4>
                    </a>
                    <p className="text-gunMentalColor text-medium">What happens when old PCs are given modern upgrades?</p>
                </div>
            </article>
            <article className="grid gap-6 grid-cols-3">               
                <img alt="Retro Computers" src={Article2Cover} />
                <div className="col-span-2">
                    <div className="text-silverColor font-bold text-4xl">02</div>
                    <a href="/">
                        <h4 className="font-black text-darkSpaceBlueColor text-lg my-2 hover:text-lightVermillionColor focus:text-lightVermillionColor">
                            Top 10 Laptops of 2022
                        </h4>
                    </a>
                    <p className="text-gunMentalColor text-medium">Our best picks for various needs and budgets.</p>
                </div>
            </article>
            <article className="grid gap-6 grid-cols-3">
                <img alt="Retro Computers" src={Article3Cover} />
                <div className="col-span-2">
                    <div className="text-silverColor font-bold text-4xl">03</div>
                    <a href="/">
                        <h4 className="font-black text-darkSpaceBlueColor text-lg my-2 hover:text-lightVermillionColor focus:text-lightVermillionColor">
                            The Growth of Gaming
                        </h4>
                    </a>
                    <p className="text-gunMentalColor text-medium">How the pandemic has sparked fresh opportunities.</p>
                </div>
            </article>
        </section>
    );
};