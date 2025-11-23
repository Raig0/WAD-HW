<template>
    <header class="header">
        <ul class="nav">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/addPost">Add Post</RouterLink></li>

            <li class="nav-img">
                <a @click="toggleMenu">
                    <img
                        src="../assets/res/images/me.png"
                        alt="Profile picture" />
                </a>
            </li>

            <div class="dropdown-wrap" id="dropDown">
                <div class="dropdown">
                    <h4>Raigo Lehement</h4>
                    <hr />
                    <h4>raigo.lehement@mail.ee</h4>
                    <hr />
                    <h4 id="logout">logout</h4>
                </div>
            </div>
        </ul>
    </header>
</template>

<script>
export default {
    name: "HeaderComponent",
};

let dropDown = document.getElementById("dropDown");

function toggleMenu() {
    dropDown.classList.toggle("open-menu");
}
</script>
