/**
 * @class Utils 
 * 所有数据处理方法存放在此处
 */

class Utils {
    /**
     * 获取初始化数据，该方法在运行的时候应该将所有数据都初始化完成
     * @param {Object} data 包含数据的对象
     * 
     * @return {Object} 返回一个对象 ， 它当中应当存在几个数据 pcAll ->pc端总留言数目 , wapAll -> wap端总留言数目 , all ->  pc移动端的总数目
     */

    getIntData(data){

        if(!data) return false;

        var wapData = !!data[2] ? this.get_item_data(data[2]) : null;

        var pcData = !!data[1] ? this.get_item_data(data[1]) : null;
        
        var allData =!!data[3] ? this.get_item_data(data[3]) : null;

        return {1:pcData,2:wapData,3:allData}
        
    }

    /**
     * 获取数组中的最大值,并且返回对应的对象
     */

    get_item_data(data){
        var max = {value:0,name:''};
        var all = 0;
        data.forEach(element => {
            
            max = element.value > max.value ? element : max;

            all+=element.value;

        });

        return {max:max,all:all};
    }

    /**
     * 处理对象，转化为数组
     */
    
    

}


export default Utils