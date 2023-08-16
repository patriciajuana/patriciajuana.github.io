/**
 * References:
 * Simple Parallax: https://simpleparallax.com/#examples
 * GSAP: https://greensock.com/st-demos/
 */

document.addEventListener("DOMContentLoaded", () => {
    // Parallax Options
    document.querySelectorAll('.parallax').forEach((e) => {
        new simpleParallax(e);
    });
    document.querySelectorAll('.parallax-o').forEach((e) => {
        new simpleParallax(e, {
            overflow: true
        });
    });
    document.querySelectorAll('.parallax-down').forEach((e) => {
        new simpleParallax(e, {
            orientation: 'down',
            scale: 1.5
        });
    });
    document.querySelectorAll('.parallax-down-o').forEach((e) => {
        new simpleParallax(e, {
            orientation: 'down',
            overflow: true,
        });
    });

    //GSAP Slider
    const isDesktop = window.matchMedia("(min-width: 992px)").matches;
    if (isDesktop) {
        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
        const horizontalSlider = document.querySelector("#js-horizontal-slider");
        if (horizontalSlider) {
            const sliderItems = gsap.utils.toArray("#js-horizontal-slider .js-item");
            gsap.to(sliderItems, {
                xPercent: -100 * (sliderItems.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: "#js-horizontal-slider",
                    pin: true,
                    start: "top top",
                    scrub: 1,
                    end: () => "+=" + (horizontalSlider.offsetWidth - innerWidth)
                }
            });
        }
    }
});