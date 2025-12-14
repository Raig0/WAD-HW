<template>
    <div id="login">
        <form class="forms" @submit.prevent="validateForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="Email"
                    required />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="Password"
                    required />
            </div>

            <div v-if="errors.length" class="error">
                <ul>
                    <li v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>

            <div class="wrap">
                <button type="submit">Signup</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
    name: "Signup",
    data() {
        return {
            email: "",
            password: "",
            errors: [],
        };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        checkPassword(password) {
            this.errors = [];

            if (password.length < 8 || password.length > 14) {
                this.errors.push("Password must be 8-14 characters long.");
            }
            if (!/[A-Z]/.test(password)) {
                this.errors.push(
                    "Password must contain at least one uppercase alphabet character."
                );
            }
            if ((password.match(/[a-z]/g) || []).length < 2) {
                this.errors.push(
                    "Password must contain at least two lowercase alphabet characters."
                );
            }
            if (!/[0-9]/.test(password)) {
                this.errors.push(
                    "Password must contain at least one numeric value."
                );
            }
            if (!/^[A-Z]/.test(password)) {
                this.errors.push(
                    "Password must start with an uppercase letter."
                );
            }
            if (!/_/.test(password)) {
                this.errors.push("Password must contain character _");
            }
        },
        async validateForm() {
            this.checkPassword(this.password);

            if (this.errors.length === 0) {
                try {
                    const res = await axios.post("http://localhost:3000/users", {
                        email: this.email,
                        password: this.password,
                    });
                    const token = res.data.token;
                    localStorage.setItem("token", token);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    this.email = "";
                    this.password = "";
                    this.router.push("/");
                } catch (err) {
                    console.error(err);
                    this.errors.push(err.response && err.response.data && err.response.data.message ? err.response.data.message : "Error creating account");
                }
            }
        },
    },
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 1em;
}

#login {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

#login .forms {
    margin-top: 5em;
    background-color: rgb(235, 233, 233);
    border-radius: 1em;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 20px;
    transition: transform 0.2s;
    width: 25em;
}

.form-group {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1em;
    padding: 0.5em 0;
}

#login .forms label {
    display: block;
    width: 30%;
    margin: 0;
    text-align: right;
    color: #555;
    font-weight: bold;
}

#login input {
    width: 65%;
    margin-bottom: 0;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    text-align: center;
}

#login .wrap {
    display: flex;
    justify-content: center;
}

#login .wrap button {
    padding: 10px;
    margin-top: 1em;
    margin-bottom: 2em;
    border: none;
    border-radius: 1em;
    color: white;
    cursor: pointer;
    background-color: blue;
    width: 30%;
    font-size: 15px;
}

@media (max-width: 480px) {
    #login .forms {
        width: 90%;
        padding: 16px;
    }
    .form-group {
        flex-direction: column;
        align-items: stretch;
    }
    #login .forms label {
        width: 100%;
        margin-bottom: 6px;
    }
    #login input {
        width: 100%;
    }
    #login .wrap button {
        width: 40%;
    }
}
</style>
