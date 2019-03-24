import axios from "axios";


export default {
  // axios & async
  // https://ryulog.tistory.com/139

  async get_ipobj(url) {
    try{
      let response = await axios.get(url);
      console.log(response);
      return response;
    }
    catch (error) {
      console.log(error);
    }
  
    return null;
  },

  async async_get(url) {
    try {
      let result = await axios.get(url);
      // console.log(result);
      return result;
    }
    catch (error) {
      console.log(error);
      return error;
    }
  },

  refresh_ipobj: function (cb) {
    // var tmp = Date.parse(new Date()).toString();
    // tmp = tmp.substr(0, 10);

    var url = "http://localhost:3000/ipobjs";
    axios.get(url).then(function (result) {
      if (result.status == 200) {
        // console.log(result.data);
        cb(result.data);
      }
      else {
        console.log(result);
      }
    });
  },


  getnews: function(cb) {
    var url = "http://v.juhe.cn/toutiao/index?type=&key=fd3f7fc7f0aa529f06cfd38fb46c1f15";
    // axios.get('https://bird.ioliu.cn/joke/rand',{
    //     params:{
    //         pagesize:20
    //     }
    // })
    // .then(function(data){
    //     cb(data.data.data)
    // })
    axios.get("https://bird.ioliu.cn/v1/?url=" + url).then(function(data) {
      cb(data.data.result.data);
    });
  },
  getjoke: function(cb) {
    var tmp = Date.parse(new Date()).toString();
    tmp = tmp.substr(0, 10);
    var url =
      "http://japi.juhe.cn/joke/content/list.from?sort=&page=&pagesize=20&time=" + tmp + "&key=4938e9af16277c6209ca00a683d96849";
    axios.get("https://bird.ioliu.cn/v1/?url=" + url).then(function(data) {
      cb(data.data.result.data);
    });
  },
  getday: function(cb) {
    var now = new Date();
    var omonth = now.getMonth() + 1;
    var oday = now.getDate();
    var url = "http://api.juheapi.com/japi/toh?v=1.0&month=" + omonth + "&day=" + oday + "&key=22223d9e1deafd145e17eedb8b7897c2";
    axios.get("https://bird.ioliu.cn/v1/?url=" + url).then(function(data) {
      cb(data.data.result);
    });
  },
  getimgs: function(cb) {
    axios
      .get("https://bird.ioliu.cn/joke/rand", {
        params: {
          pagesize: 20,
        },
      })
      .then(function(data) {
        cb(data.data.data);
      });
  },
};
