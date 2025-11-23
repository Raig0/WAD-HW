<template>
    <div id="login">
        <form class="forms" action="index.html">
            <p><strong>Welcome to PostIt</strong></p>
            <a href="#" style="text-decoration: none">Create an account</a>
            <p>or</p>
            <p>Please log in</p>
            <label for="email"></label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required />

            <label for="password"></label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required />

            <div class="wrap">
                <button type="submit">Log in</button>
            </div>
            <a href="#" style="text-decoration: none">Forgot password</a>
        </form>
    </div>
</template>

<style scoped>

#login .forms {
    margin-top: 5em;
    background-color: gainsboro;
    border-radius: 1em;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
    transition: transform 0.2s;
    width: 20em;
    text-align: center;
}
#login .forms label {
    display: block;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: left;
    color: #555;
    font-weight: bold;
}

#login input {
    width: 50%;
    margin-bottom: 15px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
}

#login .wrap button {
    padding: 10px;
    margin-top: 1px;
    margin-bottom: 2em;
    border: none;
    color: white;
    cursor: pointer;
    background-color: blue;
    width: 20%;
    font-size: 15px;
    text-decoration: none;
}
</style>
