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
