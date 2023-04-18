document.addEventListener("DOMContentLoaded", () => {
    //Activate AOS
    AOS.init({        
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 200, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1500, // values from 0 to 3000, with step 50ms
        easing: 'ease-out', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
      });

    //Sticky Header
    const header=document.querySelector('#js-header');
    window.addEventListener('scroll', ()=>{    
        if(window.scrollY >= 123){
            header.classList.add('is-inner');
        }else{
            header.classList.remove('is-inner');
        }
    });

    //Nav Active State
    const nav=document.querySelector('#js-nav');
    const navItems=nav.querySelectorAll('li a');
    const removeAllActiveStates=()=>{
        //remove all active states
        navItems.forEach(e=>e.classList.remove('is-active'));
    }
    navItems.forEach((navItem)=>{
        navItem.addEventListener('click', ()=>{
            removeAllActiveStates();
            
            //apply new active state
            navItem.classList.add('is-active');
        });
    });

    //Duplicate Text for Inifinite Horizontal Scrolling
    const headingScroll=document.querySelector('#js-heading-scroll');
    for(let i=0; i < 10; i++){
        headingScroll.innerText+=` ${headingScroll.innerText}`;
    }
});