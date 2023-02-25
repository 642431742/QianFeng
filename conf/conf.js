const config = {
    baseurl:'http://localhost:8888',
    username:/\w{5,15}/,
    password:/\w{6,30}/,
    nickname:/^.{3,20}$/
};

export default config;