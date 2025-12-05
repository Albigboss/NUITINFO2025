document.querySelector(".bee").addEventListener("animationend", () => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";

    setTimeout(() => {
        loader.style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 800);
});