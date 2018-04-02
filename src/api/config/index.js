import axios from 'axios'
import {getCookie} from '../../util/index'

const instance=axios.create();
const ApiUrl="http://10.0.0.227:8888";/*http://tzb.wzcl8.com*/


instance.defaults.timeout=5000
instance.defaults.headers['Content-Type']='application/x-www-form-urlencoded'

axios.interceptors.request.use=instance.interceptors.request.use
    instance.interceptors.request.use(config=>{
        return config
    },err=>{
        return Promise.reject(err)
})

/*axios.get("serverconfig.json").then((result)=>{
    this.ApiUrl = result.data.ApiUrl;
}).catch((error)=>{console.log(error)});*/

instance.interceptors.response.use(response=>{
    return response
},err=>{
    return Promise.reject(err)
})

export default {
    instance,
    ApiUrl
}