document.addEventListener("DOMContentLoaded", function() {
    let projectCard = document.getElementsByClassName("projectCard");
    for (let i = 0; i < projectCard.length; i++) {
        projectCard[i].addEventListener("mouseover", flipCard);
        //projectCard[i].addEventListener("mouseout", flipCard);
    }
});

function flipCard(e) {
    e.target.style.transform = "rotateY(180deg)";
    //e.target.style.delay?
}