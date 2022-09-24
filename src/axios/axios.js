import axios from 'axios';
import JsonP from "jsonp";

export default class Axios{
    static jsonp (options){
        return new Promise((resolve,reject)=>{
            JsonP(
                //获得网址
                options.url,
                //options一个大括号对象，可选param指定回调查询的字符串的名称
                {
                    param:'callback'
                },
                //fn 回调函数 配合实例化的新promise对象执行成功resolve返回数据response和失败reject数据err
                (err,response)=>{
                    if(response){
                        resolve(response)
                    }else{
                        reject(err.message)
                    }
                }
            )
        })
    }
}