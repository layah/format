 ;(function(global,fn){
        'use strict';
        if(!global.format){
            return global.format=fn();
        };
       })(window,function(){
        function DateFomat(date,fmt){
                this.date=(date==undefined?new Date():date);
                this.default=fmt || "yyyy MM dd HH:mm:ss w";
                var pad=function(val){
                    var len=2;
                    val=val.toString();
                    while(val.length<len){
                        val='0'+val;
                    };
                    return val;
                };

                var dayName=function(index){
                    var dateNames=['星期日','星期一','星期二','星期三','星期四','星期五','星期六',];
                    return dateNames[index];
                };

                var dateType={
                    "yyyy":function(dateObj){
                        return dateObj.getFullYear();
                    },
                    "MM":function(dateObj){
                        return pad(dateObj.getMonth() + 1);
                    },
                    "dd":function(dateObj){
                        return pad(dateObj.getDate());
                    },
                    "HH":function(dateObj){
                        return pad(dateObj.getHours());
                    },
                    "mm":function(dateObj){
                        return pad(dateObj.getMinutes());
                    },
                    "ss":function(dateObj){
                        return pad(dateObj.getSeconds());
                    },
                    "w":function(dateObj){
                        return dayName(dateObj.getDay());
                    }
                }; 
                return {
                    date:this.format.call(this,dateType)
                }
            };
            DateFomat.prototype.format=function(fmtDate){
                var parse=/yy(?:yy)|d{2}|MM|HH|[aA]|w+|[yMdHmsw]+|"[^"]*"|'[^']*'/g;
                var _this=this;
                return this.default.toString().replace(parse,function($0,$1,$2){
                    return $0 in fmtDate && fmtDate[$0](_this.date);
                });
            }; 
            return DateFomat;
       });