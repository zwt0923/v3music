import http from '../utils/http'
export default{
    //搜索歌曲
    searchKeyWrod (data){
     return  http.get('cloudsearch/multimatch',data)
    },
    //获取歌曲播放url
    getSong(data){
        return  http.get('song/url',data)
    },
    //获取歌词
    getLyric(data){
        return  http.get('lyric',data)
    }
}