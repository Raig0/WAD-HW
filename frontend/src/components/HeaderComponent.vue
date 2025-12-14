<template>
    <header class="header">
        <ul class="nav">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/login">Login</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>

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

<style scoped>
.header {
    width: 100%;
    background-color: rgba(246, 244, 251, 1);
}
.nav {
    padding: 1rem 8rem;
    margin: 0;
    gap: 10px;
    display: flex;
    list-style: none;
    align-items: center;
}

.nav-img {
    margin-left: auto;
    padding: 0;
    border-radius: 50%;
}
.nav-img img {
    border-radius: 50%;
}

.dropdown-wrap {
    position: absolute;
    top: 7%;
    right: 5%;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
    z-index: 10;
}
.dropdown-wrap.open-menu {
    max-height: 400px;
}

.dropdown {
    background-color: #ffffff;
    padding: 1rem;
    align-items: center;
    border-radius: 8px;
}

.dropdown h4 {
    font-weight: normal;
}

.dropdown hr {
    margin: 0.5rem 0;
    border: none;
    border-top: 1px solid #e5e7eb;
}

.dropdown #logout {
    color: red;
    cursor: pointer;
}

.nav-img img {
    width: 40px;
    height: 40px;
    cursor: pointer;
}

.nav li a {
    padding: 10px 20px;
    border-radius: 30px;
    text-decoration: none;
    font-size: 17px;
    color: black;
}

.nav li a:hover {
    background-color: #ffffff;
}

.nav li.nav-img a:hover,
.nav-img a:hover {
    background-color: transparent;
}
</style>

<script>
export default {
    name: "HeaderComponent",
};

let dropDown = document.getElementById("dropDown");

function toggleMenu() {
    dropDown.classList.toggle("open-menu");
}
</script>
