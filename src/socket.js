import io from "socket.io-client";

// const socket = () => io.connect(process.env.VUE_APP_BACKEND, {
//   extraHeaders: {
//     Authorization: `Bearer ${store.state.auth.token}`,
//   },
// });
console.log(process.env.VUE_APP_BROKER);

const socket = io.connect(process.env.VUE_APP_BROKER);

export default socket;
