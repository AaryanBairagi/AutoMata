import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { clients , products } from "@/lib/constant";
import { HeroParallax } from "@/components/global/hero-parallax";
import { LampComponent } from "@/components/global/lamp";
import Navbar from "@/components/global/Navbar";
import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import { CheckIcon, Github } from "lucide-react";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center pb-10"
            style={{ background: 'radial-gradient(125% 125% at 50% 10%, #000 35%, #223 100%)',}}>
          <Navbar/>
          <section className=" min-h-screen w-full rounded-md
          !overflow-visible relative flex flex-col items-center antialiased * ">
            <div className="absolute inset-0 h-full w-full items-center px-5 py-24
            ">
            </div>
            <div className="flex flex-col relative z-10">
              <ContainerScroll 
              titleComponent={
                <div className="flex flex-col justify-center items-center">
                  <Button size='sm' className="p-8 mt-8 mb-8 md:mb-0 text-2xl w-full md:w-fit border-t-2 rounded-full border-[#4D4D4D]
                  bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl
                  hover:shadow-neutral-500 duration-500">

                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600 
                      md:text-center font-sans group:hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                      Start For Free Today
                    </span>

                  </Button>

                  <h1 className="text-balance text-5xl mt-3 md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 
                    font-sans font-bold">
                    AI-powered Automation
                  </h1>
                </div>
              } >

              </ContainerScroll>
            </div>
          </section>
          <InfiniteMovingCards  className="my-12" items={clients} direction="right" speed="slow" />
          
          <section>
              <HeroParallax products={products}></HeroParallax>
          </section>

          <section className="mt-[80px] relative">
                <LampComponent />

                  <div className="flex flex-wrap items-center max-w-6xl justify-center gap-4 mx-auto -mt-135 px-3 z-20 relative">

                  {/* PLAN 1 */}
                  <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 dark:bg-black border border-black/[0.1] dark:border-white/[0.2] rounded-xl p-6 w-full md:w-[350px] h-auto relative group/card transition-all hover:shadow-xl dark:hover:shadow-neutral-500/[0.1]">
                    <CardItem translateZ={50} className="text-xl font-bold text-neutral dark:text-white">
                      Developer
                      <h2 className="text-6xl mt-1">$0</h2>
                    </CardItem>

                    <CardItem translateZ={60} className="text-sm font-medium text-neutral-500 dark:text-neutral-300 mt-2 max-w-sm">
                      Get a glimpse of the power of AI automation with our Developer plan.
                      <ul className="flex flex-col my-4 gap-2">
                        <li className="flex items-center gap-2">
                          <CheckIcon /> Free Automations
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckIcon /> 100 Tasks per month
                        </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon /> Two Step Actions
                      </li>
                    </ul>
                    </CardItem>

                    <div className="flex items-center justify-between mt-8">
                    <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl font-normal text-xs dark:text-white">Try now →</CardItem>
                    <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl font-normal text-xs text-white bg-black dark:bg-white dark:text-black">Get started now</CardItem>
                    </div>
                    </CardBody>
                  </CardContainer>

                  {/* PLAN 2 */}
                  <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 rounded-xl p-6 w-full md:!w-[350px] h-auto relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500 dark:bg-black
                    border border-black/[0.1] dark:border-white/[0.2] ">
                        <CardItem translateZ={50} className="text-xl font-bold text-neutral-500 dark:text-white"> StartUp
                          <h2 className="text-6xl">$19</h2>
                        </CardItem>
                        <CardItem translateZ={60} className="text-sm font-medium mt-2 max-w-sm text-neutral-500 dark:text-neutral-300">
                          Unlock efficiency and scalability with powerful automation tailored for startups
                          <ul className="flex flex-col my-4 gap-2">
                            <li className="flex items-center gap-2">
                              <CheckIcon/> Everything in Developer
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckIcon/> 5000 Tasks per month
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckIcon/> Multi-step Workflows
                            </li>
                          </ul>
                        </CardItem>
                        <div className="flex items-center justify-between mt-8">
                        <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl font-normal text-xs dark:text-white">
                          Try now →
                        </CardItem>
                        <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl font-normal text-xs text-white bg-black dark:text-black dark:bg-white">
                          Get started now
                        </CardItem>
                        </div>
                    </CardBody>
                  </CardContainer>

                  {/* PLAN 3 */}
                  <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 rounded-xl p-6 w-full md:!w-[350px] h-auto relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500 dark:bg-black
                    border border-black/[0.1] dark:border-white/[0.2] ">
                        <CardItem translateZ={50} className="text-xl font-bold text-neutral-500 dark:text-white"> Enterprise
                          <h2 className="text-6xl">$49</h2>
                        </CardItem>
                        <CardItem translateZ={60} className="text-sm font-medium mt-2 max-w-sm text-neutral-500 dark:text-neutral-300">
                          End-to-end automation with enterprise-grade performance and flexibility.                          
                          <ul className="flex flex-col my-4 gap-2">
                            <li className="flex items-center gap-2">
                              <CheckIcon/> Everything in Startup
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckIcon/> Unlimited Tasks
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckIcon/> Role-based access control
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckIcon/> Team collaboration
                            </li>
                          </ul>
                        </CardItem>
                        <div className="flex items-center justify-between mt-8">
                        <CardItem translateZ={20} as="button" className="px-4 py-2 text-xs font-normal dark:text-white rounded-xl">
                          Try now →
                        </CardItem>
                        <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl font-normal text-xs text-white bg-black dark:text-black dark:bg-white">
                          Get started now
                        </CardItem>
                        </div>
                    </CardBody>
                  </CardContainer>
                  </div>
          </section> 

          <footer className="mt-32 w-full text-center py-6 border-t border-white/10 text-neutral-400 text-md">
            <div className="mb-1">
              Built with <span className="text-white">🤍</span> by <span className="font-semibold text-white">Aaryan Bairagi</span>
            </div>

            <div className="text-xs text-neutral-500 mt-1 flex items-center justify-center gap-2 flex-wrap">
              <span>AI Automation Platform · v1.0 · © {new Date().getFullYear()}</span>
    
              <a
              href="https://github.com/AaryanBairagi/AutoMata"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 underline hover:text-white transition-colors">
              <Github size={14} strokeWidth={1.5} />
              GitHub
              </a>
            </div>
          </footer>
      </main> 
  );
}
