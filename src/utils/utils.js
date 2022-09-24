import React from 'react'

export default{
    formateDate(date){
       if(!date) return
       //年月日
        const year=date.getFullYear();
        const month=date.getMonth()<9?'0'+date.getMonth():date.getMonth()
        const getdate=date.getDate();
        const hours=date.getHours()<9?'0'+date.getHours():date.getHours()
        const minutes=date.getMinutes()<9?'0'+date.getMinutes():date.getMinutes()
        const seconds=date.getSeconds()<9?'0'+date.getSeconds():date.getSeconds()
        return `${year}年${month}月${getdate}日  ${hours}:${minutes}:${seconds}`
    }
}