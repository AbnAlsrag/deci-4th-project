const main = document.getElementById("main");
const comments = document.getElementById("comments");
const comments_section = document.getElementById("comments-section");
const navbar_list = document.getElementById("navbar__list");
const name_input = document.getElementById("name-input");
const email_input = document.getElementById("email-input");
const comment_input = document.getElementById("comment-input");
const submit_btn = document.getElementById("submit-btn");

let sections = [];
let previous_section = 0;

const section_4_html = `<section id="section4" data-nav="Section 4">
                        <div class="landing__container">
                        <h2>Section 4</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra
                            dapibus. Suspendisse potenti. Pellentesque maximus imperdiet
                            elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis.</p>

                        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel
                            luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus.</p>
                        </div>
                        </section>`

main.innerHTML += section_4_html;

{
    let current = undefined;
    let i = 1;
    do {
        current = document.getElementById(`section${i}`);
        if (current != undefined) {
            sections.push(current);
        }
        i++;
    } while (current != undefined);
    sections.push(comments);
}

for (let i = 0; i < sections.length; i++) {
    navbar_list.innerHTML += `<button>${sections[i].dataset.nav}</button>`;
}

const buttons = navbar_list.getElementsByTagName("button");

for (let i = 0; i < buttons.length-1; i++) {
    const button = buttons[i];
    button.onclick = function () {
        const section = document.getElementById(`section${i+1}`);
        section.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    }
}

buttons[buttons.length-1].onclick = function () {
    comments.scrollIntoView({ block: 'end',  behavior: 'smooth' });
};

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('active');
        } else {
        entry.target.classList.remove('active');
        }
    });
};

const intersection_observer_options = {
    root: null,   
    rootMargin: '0px',
    threshold: 0.5,
};
const observer = new IntersectionObserver(callback, intersection_observer_options);

window.addEventListener("scroll", function () {
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        observer.observe(section);
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

submit_btn.onclick = function () {
    if (!isValidEmail(email_input.value)) {
        alert("wrong email");
        return;
    }

    if (name_input.value.length === 0 || comment_input.value.length === 0) {
        alert("wrong name or comment");
        return;
    }

    comments_section.innerHTML += `<p>${name_input.value}, ${email_input.value}: ${comment_input.value}</p>`;
};