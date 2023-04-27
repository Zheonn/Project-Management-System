<template>
    <div class="message-container">
        <div v-if="msgType == 'ok'" class="ok-message">
            <p>{{ msg }}</p>
        </div>
        <div v-if="msgType == 'error'" class="error-message">
            <p>{{ msg }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:"Message",
    props: {
        msg: String,
        msgType: String
    }
}
</script>

<style scoped>
    .message-container {
        position: absolute;
        right: 5px;
        top: 55px;
    }

    .ok-message {
        color: rgb(4, 65, 4);
        background-color: rgb(133, 228, 133);
        border: 2px solid rgb(79, 180, 79);
        border-radius: 5px;
        padding: 10px;
        max-width: 400px;
        margin: 30xp auto;
    }

    .error-message {
        color: rgb(65, 4, 4);
        background-color: rgb(228, 133, 133);
        border: 2px solid rgb(180, 79, 79);
        border-radius: 5px;
        padding: 10px;
        max-width: 400px;
        margin: 30xp auto;
    }
</style>