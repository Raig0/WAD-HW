<template>
    <div class="contact-page">
        <h1>Contact Us</h1>

        <div class="team">
            <div class="member" v-for="m in members" :key="m.email">
                <h2 class="name">{{ m.name }}</h2>
                <p class="role">{{ m.role }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ContactUs",
    data() {
        return {
            members: [
                {
                    name: "Raigo Leesment",
                    role: "Frontend",
                },
                {
                    name: "Mairon Mihkelsoo",
                    role: "Backend",
                },
                {
                    name: "Kenert Kustov",
                    role: "Fullstack",
                },
            ],
        };
    },
};
</script>

<style scoped>
.contact-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

h1 {
    margin-bottom: 2rem;
}

.team {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 2rem;
}
@media (max-width: 600px) {
    .team {
        flex-direction: column;
        align-items: center;
    }
}

.member {
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    padding: 2rem;
    background: #fafafa;
    align-items: center;
    text-align: center;
    min-width: 16rem;
}

.name {
    margin: 0 0 0.25rem 0;
}

.role {
    margin: 0 0 0.5rem 0;
    color: #4b5563;
}
</style>
