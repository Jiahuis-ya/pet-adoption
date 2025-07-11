const base = {
    get() {
        // return {
        //     url : process.env.SYSTEM_URL,
        //     name: "petadoption",
        //     // 退出到首页链接
        //     indexUrl: process.env.SYSTEM_INDEX_URL
        // };

        return {
            url : "http://localhost:8080/petadoption/",
            name: "petadoption",
            // 退出到首页链接
            // indexUrl: 'http://localhost:8080/petadoption/front/index.html'
            indexUrl: 'http://localhost:8080/petadoption/front/dist/index.html#/index'
        };
    },
    getProjectName(){
        return {
            projectName: "宠物领养平台"
        } 
    }
}
export default base
