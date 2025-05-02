"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import CloseIcon from "./close-icon";
import { cardsData } from "./cards";

export default function LayoutCards() {
  const createTemplate = useMutation(api.templates.createTemplate)
  const router = useRouter()
  const [active, setActive] = useState<(typeof cardsData)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const redirectBuild = async (layout: string) => {
    const id = await createTemplate({ layout })
    router.push(`/build/${id}`)
  }

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.05 }}
            className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              // layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div >
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full max-h-[400px] sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
                <div>
                  <div className="flex justify-between items-center p-4">
                    <div>
                      <motion.h3
                        // layoutId={`title-${active.title}-${id}`}
                        className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                      >
                        {active.title}
                      </motion.h3>
                      {
                        active.description ?
                          <motion.p
                            // layoutId={`description-${active.description}-${id}`}
                            className="text-neutral-600 dark:text-neutral-400 text-base"
                          >
                            {active.description}
                          </motion.p> : <></>
                      }
                    </div>
                    <motion.button
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => redirectBuild(active.type)}
                      className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white hover:scale-105 transition-all"
                    >
                      {active.ctaText}
                    </motion.button>
                  </div>
                  <div className="pt-4 relative px-4">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    >
                      {/* {typeof active.content === "function"
                        ? active.content()
                        : active.content} */}
                      <p>{active.content}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-7xl mx-auto w-full grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(300px,_400px))] items-start gap-8">
        {cardsData.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={card.content ? () => setActive(card) : undefined}
            className="h-[400px] flex hover:scale-105 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-all shadow-lg"
          >
            <div className="flex gap-4 flex-col w-full h-[400px]">
              <motion.div layoutId={`image-${card.title}-${id}`} className="relative h-[400px]">
                <Image
                  width={300}
                  height={300}
                  src={card.src}
                  alt={card.title}
                  className="w-full max-h-[400px] rounded-lg object-cover object-top border"
                />
                <div className="flex justify-center items-center flex-col absolute bottom-0 left-0 w-full rounded-b-lg bg-slate-100 border-t">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div >
        ))
        }
      </ul >
    </>
  );
}




