"use strict";
var rts = require("./rts.js");
var environment = rts.builtins.IO.os["env"];
var length = rts.builtins.Bytes["length"];
var _2b_ = rts.builtins.Prelude["+"];
var slice = rts.builtins.Bytes["slice"];
var _3d__3d_ = rts.builtins.Prelude["=="];
var _2d_ = rts.builtins.Prelude["-"];
var iterate = function (local_15) {
   return {tag: "nonEmpty"
          ,data: {head: local_15.initial
                 ,tail: function (local_16) {
                    return iterate({initial: local_15.next(local_15.initial)
                                   ,next: local_15.next});
                 }}};
};
var _3e_ = rts.builtins.Prelude[">"];
var _3c_ = rts.builtins.Prelude["<"];
var take = function (local_22) {
   var x = function (x23) { return x23;}(local_22.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_24 = x.data;
       var x = function (x25) { return x25;}(local_22.__while(local_24.head));
       switch (x.tag)
       {
         case "false":
           var local_26 = x.data;
           return {tag: "empty",data: {}};
         case "true":
           var local_27 = x.data;
           return {tag: "nonEmpty"
                  ,data: {head: local_24.head
                         ,tail: function (local_28) {
                            return take({list: local_24.tail({})
                                        ,__while: local_22.__while});
                         }}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_ef15e9ece99a44fc9a41740a570f3fc9"
                                        ,"388ac081138d4b3bb98f2c7c6c5674d6");
       }
     case "empty":
       var local_29 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_ef15e9ece99a44fc9a41740a570f3fc9"
                                    ,"908fa9a99fac4a058be9f984a22b1430");
   }
};
var _2e__2e_1 = function (local_13) {
   return take({list: iterate({initial: local_13.start
                              ,next: function (local_14) {
                                 return _2b_({infixl: local_14,infixr: local_13.step});
                              }})
               ,__while: function () {
                  var x = function (x17) {
                             return x17;
                          }(_3e_({infixl: local_13.step,infixr: 0.0}));
                  switch (x.tag)
                  {
                    case "false":
                      var local_18 = x.data;
                      return function (local_19) {
                             return _3e_({infixl: local_19,infixr: local_13.stop});
                          };
                    case "true":
                      var local_20 = x.data;
                      return function (local_21) {
                             return _3c_({infixl: local_21,infixr: local_13.stop});
                          };
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_976e4af994d74546b61bfcdc6bf2c950"
                                                   ,"0cab2989e68742c6aedf4360d1ce05ae");
                  }
               }()});
};
var _2e__2e_ = function (local_12) {
   return _2e__2e_1({step: 1.0,start: local_12.start,stop: local_12.stop});
};
var first = function (local_30) {
   var x = function (x31) { return x31;}(local_30.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_32 = x.data;
       var x = function (x33) { return x33;}(local_30.that(local_32.head));
       switch (x.tag)
       {
         case "false":
           var local_34 = x.data;
           return first({that: local_30.that,list: local_32.tail({})});
         case "true":
           var local_35 = x.data;
           return {tag: "just",data: local_32.head};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_8a1642b8d2ef4d669df333f01821017e"
                                        ,"dc5bff2c6387486ea6f4d43193feaf06");
       }
     case "empty":
       var local_36 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8a1642b8d2ef4d669df333f01821017e"
                                    ,"2e32b7557b4e490bb6cd14a351193ae2");
   }
};
var find = function (local_10) {
   var subLen = length(local_10.slice);
   return first({that: function (local_11) {
                   return _3d__3d_({infixl: slice({object: local_10.__bytes
                                                  ,start: local_11
                                                  ,stop: _2b_({infixl: local_11
                                                              ,infixr: subLen})})
                                   ,infixr: local_10.slice});
                }
                ,list: _2e__2e_({start: 0.0
                                ,stop: _2b_({infixl: _2d_({infixl: length(local_10.__bytes)
                                                          ,infixr: subLen})
                                            ,infixr: 1.0})})});
};
var _3a__3a_ = function (local_40) {
   return {tag: "nonEmpty",data: {head: local_40.infixl,tail: local_40.infixr}};
};
var split1 = function (local_9) {
   var x = function (x37) {
              return x37;
           }(find({__bytes: local_9.__bytes,slice: local_9.seperator}));
   switch (x.tag)
   {
     case "just":
       var local_38 = x.data;
       return _3a__3a_({infixl: slice({object: local_9.__bytes,start: 0.0,stop: local_38})
                       ,infixr: function (local_39) {
                          return split1({__bytes: slice({object: local_9.__bytes
                                                        ,start: _2b_({infixl: local_38
                                                                     ,infixr: length(local_9.seperator)})
                                                        ,stop: length(local_9.__bytes)})
                                        ,seperator: local_9.seperator});
                       }});
     case "nothing":
       var local_41 = x.data;
       return _3a__3a_({infixl: local_9.__bytes
                       ,infixr: function (local_42) {
                          return {tag: "empty",data: {}};
                       }});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_b21053ea92ed45029fa78a5121bf6e3a"
                                    ,"ff767a75261daa1e4a165bc04bb8c028");
   }
};
var foldLazy = function (local_47) {
   var x = function (x48) { return x48;}(local_47.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_49 = x.data;
       return local_47.binop({rest: function (local_50) {
                                var dummy = _3d__3d_({infixl: local_50,infixr: {}});
                                return foldLazy({list: local_49.tail({})
                                                ,initial: local_47.initial
                                                ,binop: local_47.binop});
                             }
                             ,item: local_49.head});
     case "empty":
       return local_47.initial(x.data);
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a2dc21b7c3b04474a4cd67135dd74e65"
                                    ,"487496adc31e442cbda46679c6451ca8");
   }
};
var map = function (local_44) {
   return foldLazy({list: local_44.list
                   ,initial: function (local_45) {
                      return {tag: "empty",data: {}};
                   }
                   ,binop: function (local_46) {
                      return {tag: "nonEmpty"
                             ,data: {head: local_44.mapping(local_46.item)
                                    ,tail: local_46.rest}};
                   }});
};
var split = function (local_6) {
   return split1({__bytes: function (x7) {
                    return x7;
                 }(local_6.text)
                 ,seperator: function (x8) {
                    return x8;
                 }(local_6.seperator)});
};
var newMutArray = rts.builtins.Mut.Array["new"];
var appendMutArray = rts.builtins.Mut.Array["append"];
var __return = rts.builtins.Mut["return"];
var _3b_ = rts.builtins.Mut["bind"];
var sequence__ = function (list1) {
   return foldLazy({list: list1
                   ,initial: function (local_52) {
                      return __return({});
                   }
                   ,binop: function (local_53) {
                      return _3b_({infixl: local_53.item
                                  ,infixr: function (local_54) {
                                     return local_53.rest({});
                                  }});
                   }});
};
var runMutArray = rts.builtins.Mut.Array["run"];
var toArray = function (list) {
   return runMutArray(_3b_({infixl: newMutArray
                           ,infixr: function (__array) {
                              return _3b_({infixl: sequence__(map({list: list
                                                                  ,mapping: function (local_51) {
                                                                     return appendMutArray({object: __array
                                                                                           ,value: local_51});
                                                                  }}))
                                          ,infixr: function (local_55) {
                                             return __return(__array);
                                          }});
                           }}));
};
var length1 = rts.builtins.Array["length"];
var item = rts.builtins.Array["item"];
var _26__26_ = function (local_59) {
   var x = function (x60) { return x60;}(local_59.infixl);
   switch (x.tag)
   {
     case "false":
       var local_61 = x.data;
       return {tag: "false",data: {}};
     case "true":
       return local_59.infixr(x.data);
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_e75aed3cb68c4fd395ce0c5c287eadba"
                                    ,"b49d483abc72480a838ef25795ee9758");
   }
};
var ignoreError = function (local_64) {
   throw rts.exceptions.ReachedHole("Reached a hole"
                                   ,"DEF_157261c59c9a44f1867b85e4d1b49818"
                                   ,"4c518e5b0faa46fe87f4941f1e0cbe54");
};
var byteAt = rts.builtins.Bytes["byteAt"];
var fromBytes = function (__bytes) {
   var length2 = length(__bytes);
   return map({list: _2e__2e_({start: 0.0,stop: length2})
              ,mapping: function (local_76) {
                 return byteAt({index: local_76,object: __bytes});
              }});
};
var _2a_ = rts.builtins.Prelude["*"];
var fold = function (local_78) {
   var x = function (x79) { return x79;}(local_78.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_80 = x.data;
       return fold({list: local_80.tail({})
                   ,initial: local_78.binop({acc: local_78.initial,item: local_80.head})
                   ,binop: local_78.binop});
     case "empty":
       var local_81 = x.data;
       return local_78.initial;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d742e997601e4a6f9fab3277d9fb50d5"
                                    ,"637233b5b124439a95770c0e0d801258");
   }
};
var parseInt = function (local_74) {
   return fold({list: fromBytes(function (x75) {
                  return x75;
               }(local_74))
               ,initial: 0.0
               ,binop: function (local_77) {
                  return _2d_({infixl: _2b_({infixl: _2a_({infixl: local_77.acc
                                                          ,infixr: 10.0})
                                            ,infixr: local_77.item})
                              ,infixr: 48.0});
               }});
};
var parseDatabaseUrl = function (local_5) {
   var local_56 = toArray(split({text: local_5,seperator: rts.bytesFromAscii("/")}));
   var x = function (x62) {
              return x62;
           }(_26__26_({infixl: _3d__3d_({infixl: length1(local_56),infixr: 4.0})
                      ,infixr: function (local_57) {
                         return _26__26_({infixl: _3d__3d_({infixl: item({index: 0.0
                                                                         ,object: local_56})
                                                           ,infixr: rts.bytesFromAscii("postgres:")})
                                         ,infixr: function (local_58) {
                                            return _3d__3d_({infixl: item({index: 1.0
                                                                          ,object: local_56})
                                                            ,infixr: rts.bytesFromAscii("")});
                                         }});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_63 = x.data;
       return ignoreError(function () {
              throw rts.exceptions.ReachedHole("Reached a hole"
                                              ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                              ,"5813e29d7943cb3b7293f7b5baf46584");
           }());
     case "true":
       var local_65 = x.data;
       var local_66 = toArray(split({text: item({index: 2.0,object: local_56})
                                    ,seperator: rts.bytesFromAscii(":")}));
       var x = function (x67) {
                  return x67;
               }(_3d__3d_({infixl: length1(local_66),infixr: 3.0}));
       switch (x.tag)
       {
         case "false":
           var local_68 = x.data;
           return ignoreError(function () {
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                                  ,"0f3aa79fa902ac4dcfbe4ffb6cb00ace");
               }());
         case "true":
           var local_69 = x.data;
           var local_70 = toArray(split({text: item({index: 1.0,object: local_66})
                                        ,seperator: rts.bytesFromAscii("@")}));
           var x = function (x71) {
                      return x71;
                   }(_3d__3d_({infixl: length1(local_70),infixr: 2.0}));
           switch (x.tag)
           {
             case "false":
               var local_72 = x.data;
               throw rts.exceptions.ReachedHole("Reached a hole"
                                               ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                               ,"5f05f8b37b1c7b3e9433533043cfce0c");
             case "true":
               var local_73 = x.data;
               return {database: item({index: 3.0,object: local_56})
                      ,host: item({index: 1.0,object: local_70})
                      ,password: item({index: 0.0,object: local_70})
                      ,port: parseInt(item({index: 2.0,object: local_66}))
                      ,user: item({index: 0.0,object: local_66})};
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                            ,"0fef265c92877b87a9625a41bc75d47e");
           }
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                        ,"36c2c6bc2ac853ecdad25882e9dff9b3");
       }
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                    ,"c1b87d5403ac10715b1a607424a16996");
   }
};
var connect = rts.builtins.IO.database.postgres["connect"];
var pestovalDb = _3b_({infixl: environment(function (x1) {
                         return x1;
                      }(rts.bytesFromAscii("DATABASE_URL")))
                      ,infixr: function (local_2) {
                         return connect(function () {
                                var x = function (x3) { return x3;}(local_2);
                                switch (x.tag)
                                {
                                  case "just":
                                    var local_4 = x.data;
                                    return parseDatabaseUrl(local_4);
                                  case "nothing":
                                    var local_82 = x.data;
                                    return {database: rts.bytesFromAscii("pestoval")
                                           ,host: rts.bytesFromAscii("localhost")
                                           ,password: rts.bytesFromAscii("")
                                           ,port: 5432.0
                                           ,user: rts.bytesFromAscii("postgres")};
                                  default:
                                    throw rts.exceptions.LamduBug("Unhandled case"
                                                                 ,"DEF_310093b260fa4b6cb5bea69115ecdcd7"
                                                                 ,"c8bbb47b81fffd1f3979d0b41aeb381c");
                                }
                             }());
                      }});
var fromArray = function (__array1) {
   var length3 = length1(__array1);
   return map({list: _2e__2e_({start: 0.0,stop: length3})
              ,mapping: function (local_96) {
                 return item({index: local_96,object: __array1});
              }});
};
var _2264_ = rts.builtins.Prelude["<="];
var drop = function (local_97) {
   var x = function (x98) { return x98;}(_2264_({infixl: local_97.count,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_99 = x.data;
       var x = function (x100) { return x100;}(local_97.list);
       switch (x.tag)
       {
         case "nonEmpty":
           var local_101 = x.data;
           return drop({list: local_101.tail({})
                       ,count: _2d_({infixl: local_97.count,infixr: 1.0})});
         case "empty":
           var local_102 = x.data;
           return {tag: "empty",data: {}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_efdcd00625534eb5b480c13776995953"
                                        ,"3484afddcc5745189195b1b977bc31a4");
       }
     case "true":
       var local_103 = x.data;
       return local_97.list;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_efdcd00625534eb5b480c13776995953"
                                    ,"f4402d1f89754f369b736a668f8d2784");
   }
};
var _2b__2b_2 = function (local_123) {
   return foldLazy({list: local_123.infixl
                   ,initial: local_123.infixr
                   ,binop: function (local_124) {
                      return {tag: "nonEmpty"
                             ,data: {head: local_124.item,tail: local_124.rest}};
                   }});
};
var toBytes = rts.builtins.Bytes["fromArray"];
var _2b__2b_1 = function (local_121) {
   return toBytes(toArray(_2b__2b_2({infixl: fromBytes(local_121.a)
                                    ,infixr: function (local_122) {
                                       return fromBytes(local_121.b);
                                    }})));
};
var _2b__2b_ = function (local_118) {
   return _2b__2b_1({a: function (x119) {
                       return x119;
                    }(local_118.a)
                    ,b: function (x120) {
                       return x120;
                    }(local_118.b)});
};
var httpNotFound404 = function (local_117) {
   return {content: {__data: function (x125) {
                       return x125;
                    }(_2b__2b_({a: rts.bytesFromAscii("Not found: "),b: local_117}))
                    ,mimeType: rts.bytesFromAscii("text/plain")}
          ,status: {message: rts.bytesFromAscii("Not Found"),code: 404.0}};
};
var query = rts.builtins.IO.database.postgres["query"];
var _7c__7c_ = function (local_139) {
   var x = function (x140) { return x140;}(local_139.infixl);
   switch (x.tag)
   {
     case "false":
       return local_139.infixr(x.data);
     case "true":
       var local_141 = x.data;
       return {tag: "true",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_dff4e86e63c54fab8b58ab3fe7e440ad"
                                    ,"cc82dca9551140c9af0084b786718cc5");
   }
};
var anyOf = function (local_136) {
   return foldLazy({list: local_136.list
                   ,initial: function (local_137) {
                      return {tag: "false",data: {}};
                   }
                   ,binop: function (local_138) {
                      return _7c__7c_({infixl: local_136.satisfy(local_138.item)
                                      ,infixr: local_138.rest});
                   }});
};
var pestovalAuth = function (local_131) {
   return _3b_({infixl: query({database: local_131.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT pestoval_teacher.id, pestoval_teacher.is_admin\nFROM pestoval_teacher\nWHERE pestoval_teacher.password = \'")
                                                             ,b: local_131.password})
                                                ,b: rts.bytesFromAscii("\'")})})
               ,infixr: function (x132) {
                  switch (x132.tag)
                  {
                    case "error":
                      var local_133 = x132.data;
                      return ignoreError(local_133);
                    case "success":
                      var local_134 = x132.data;
                      return __return(function () {
                             var x = function (x142) {
                                        return x142;
                                     }(anyOf({list: fromArray(local_134.__data)
                                             ,satisfy: function (local_135) {
                                                return _3d__3d_({infixl: item({index: 1.0
                                                                              ,object: local_135})
                                                                ,infixr: rts.bytesFromAscii("true")});
                                             }}));
                             switch (x.tag)
                             {
                               case "false":
                                 var local_143 = x.data;
                                 var x = function (x146) {
                                            return x146;
                                         }(anyOf({list: fromArray(local_134.__data)
                                                 ,satisfy: function (local_144) {
                                                    var teacher =
                                                    parseInt(item({index: 0.0
                                                                  ,object: local_144}));
                                                    return anyOf({list: fromArray(local_131.teachers)
                                                                 ,satisfy: function (local_145) {
                                                                    return _3d__3d_({infixl: local_145.id
                                                                                    ,infixr: teacher});
                                                                 }});
                                                 }}));
                                 switch (x.tag)
                                 {
                                   case "false":
                                     var local_147 = x.data;
                                     return {tag: "unauthorized",data: {}};
                                   case "true":
                                     var local_148 = x.data;
                                     return {tag: "teacher",data: {}};
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                                  ,"63099f6a8ec233abc1896a5e6518eaf6");
                                 }
                               case "true":
                                 var local_149 = x.data;
                                 return {tag: "admin",data: {}};
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                              ,"b84d758acd2ea6369ce2cf3b7a5967f8");
                             }
                          }());
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                   ,"1f18689701297d125d3c9c40f71dabaf");
                  }
               }});
};
var _22f2_ = function (local_153) {
   return {root: local_153.infixl,subTrees: local_153.infixr};
};
var leaf = function (local_152) { return _22f2_({infixl: local_152,infixr: []});};
var singleton = function (local_154) { return [local_154];};
var renderHtml = rts.builtins.Optimized["renderHtml"];
var httpOk200 = {message: rts.bytesFromAscii("OK"),code: 200.0};
var pestovalPage = function (local_158) {
   return {content: {__data: function (x163) {
                       return x163;
                    }(_2b__2b_({a: rts.bytesFromAscii("<!DOCTYPE html>\n")
                               ,b: renderHtml(_22f2_({infixl: rts.bytesFromAscii("<html>")
                                                     ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<head>")
                                                                      ,infixr: [leaf(rts.bytesFromAscii("<meta charset=\"utf-8\" />"))
                                                                               ,_22f2_({infixl: rts.bytesFromAscii("<title>")
                                                                                       ,infixr: singleton(leaf(local_158.title))})
                                                                               ,_22f2_({infixl: rts.bytesFromAscii("<body>")
                                                                                       ,infixr: local_158.body})]})]}))}))
                    ,mimeType: rts.bytesFromAscii("text/html")}
          ,status: httpOk200};
};
var pestovalUnauthorized = {content: {__data: function (x170) {
                                        return x170;
                                     }(rts.bytesFromAscii("Not authorized to edit"))
                                     ,mimeType: rts.bytesFromAscii("text/plain")}
                           ,status: {message: rts.bytesFromAscii("Unauthorized")
                                    ,code: 403.0}};
var pestovalNewSession = function (local_127) {
   var path1 = toArray(split({text: local_127.request.path
                             ,seperator: rts.bytesFromAscii("/")}));
   var password = function () {
                     var x = function (x128) {
                                return x128;
                             }(_3c_({infixl: length1(path1),infixr: 4.0}));
                     switch (x.tag)
                     {
                       case "false":
                         var local_129 = x.data;
                         return item({index: 3.0,object: path1});
                       case "true":
                         var local_130 = x.data;
                         return rts.bytesFromAscii("");
                       default:
                         throw rts.exceptions.LamduBug("Unhandled case"
                                                      ,"DEF_58b862440b544a868611e6c34623ba8d"
                                                      ,"62283a5c2242313ef39e1a8069cf8e6a");
                     }
                  }();
   return _3b_({infixl: pestovalAuth({database: local_127.database
                                     ,password: password
                                     ,teachers: []})
               ,infixr: function (x150) {
                  switch (x150.tag)
                  {
                    case "admin":
                      var local_151 = x150.data;
                      var language2 = item({index: 1.0,object: path1});
                      var body =
                      singleton(_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<a href=\"/")
                                                                                                ,b: language2})
                                                                                   ,b: rts.bytesFromAscii("/manage/")})
                                                                      ,b: password})
                                                         ,b: rts.bytesFromAscii("\">")})
                                       ,infixr: singleton(leaf(rts.bytesFromAscii("Continue")))}));
                      var x = function (x156) {
                                 return x156;
                              }(_3d__3d_({infixl: local_127.request.method
                                         ,infixr: rts.bytesFromAscii("POST")}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_157 = x.data;
                          return __return(pestovalPage({title: rts.bytesFromAscii("Session added")
                                                       ,body: body}));
                        case "true":
                          var local_164 = x.data;
                          return _3b_({infixl: query({database: local_127.database
                                                     ,object: rts.bytesFromAscii("INSERT INTO pestoval_session\n(name, level_id, when_id, description, prereqs, name_hebrew, description_hebrew, prereqs_hebrew)\nVALUES (\'new\', 1, 28, \'\', \'\', \'\', \'\', \'\')")})
                                      ,infixr: function (x165) {
                                         switch (x165.tag)
                                         {
                                           case "error":
                                             var local_166 = x165.data;
                                             return ignoreError(local_166);
                                           case "success":
                                             var local_167 = x165.data;
                                             return __return({content: {__data: function (x168) {
                                                                          return x168;
                                                                       }(renderHtml(_22f2_({infixl: rts.bytesFromAscii("<html>")
                                                                                           ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<body>")
                                                                                                                     ,infixr: body}))})))
                                                                       ,mimeType: rts.bytesFromAscii("text/html")}
                                                             ,status: {message: rts.bytesFromAscii("See other")
                                                                      ,code: 303.0}});
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_58b862440b544a868611e6c34623ba8d"
                                                                          ,"134e9d9888a88d205a9623cfaebda279");
                                         }
                                      }});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_58b862440b544a868611e6c34623ba8d"
                                                       ,"2383e009c016ca319ccb1d423f4f9f53");
                      }
                    default:
                      var local_169 = x150;
                      return __return(pestovalUnauthorized);
                  }
               }});
};
var _2f__2f_ = rts.builtins.Prelude["div"];
var _2260_ = rts.builtins.Prelude["/="];
var _25_ = rts.builtins.Prelude["mod"];
var digitsLittleEndian = function (local_185) {
   return map({list: take({list: iterate({initial: local_185.__number
                                         ,next: function (local_186) {
                                            return _2f__2f_({infixl: local_186
                                                            ,infixr: local_185.base});
                                         }})
                          ,__while: function (local_187) {
                             return _2260_({infixl: local_187,infixr: 0.0});
                          }})
              ,mapping: function (local_188) {
                 return _25_({infixl: local_188,infixr: local_185.base});
              }});
};
var reverse = function (list2) {
   return fold({list: list2
               ,initial: {tag: "empty",data: {}}
               ,binop: function (local_189) {
                  return {tag: "nonEmpty"
                         ,data: {head: local_189.item
                                ,tail: function (local_190) {
                                   return local_189.acc;
                                }}};
               }});
};
var showNum = function (local_182) {
   var x = function (x183) { return x183;}(_3d__3d_({infixl: local_182,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_184 = x.data;
       return toBytes(toArray(map({list: reverse(digitsLittleEndian({__number: local_182
                                                                    ,base: 10.0}))
                                  ,mapping: function (local_191) {
                                     return _2b_({infixl: 48.0,infixr: local_191});
                                  }})));
     case "true":
       var local_192 = x.data;
       return rts.bytesFromAscii("0");
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8dc07f8cc25f46b2bd345789b6a59f4d"
                                    ,"39f9fdd2b9889a256be50861539f39e5");
   }
};
var concat = function (list3) {
   return foldLazy({list: list3
                   ,initial: function (local_209) {
                      return {tag: "empty",data: {}};
                   }
                   ,binop: function (local_210) {
                      return _2b__2b_2({infixl: local_210.item,infixr: local_210.rest});
                   }});
};
var intersperse = function (local_202) {
   var x = function (x203) { return x203;}(local_202.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_204 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_204.head
                     ,tail: function (local_205) {
                        return concat(map({list: local_204.tail({})
                                          ,mapping: function (local_206) {
                                             return {tag: "nonEmpty"
                                                    ,data: {head: local_202.item
                                                           ,tail: function (local_207) {
                                                              return {tag: "nonEmpty"
                                                                     ,data: {head: local_206
                                                                            ,tail: function (local_208) {
                                                                               return {tag: "empty"
                                                                                      ,data: {}};
                                                                            }}};
                                                           }}};
                                          }}));
                     }}};
     case "empty":
       var local_211 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_579c35851cfc4b5aa7495fd3f68d64f9"
                                    ,"7e436409026e4dd49fb7d2389f2caa1d");
   }
};
var concat2 = function (list5) {
   return toBytes(toArray(concat(map({list: list5,mapping: fromBytes}))));
};
var concat1 = concat2;
var join = function (local_201) {
   return concat1(intersperse({list: local_201.texts,item: local_201.seperator}));
};
var id = function (__x) { return __x;};
var maybe = function (local_230) {
   var x = function (x231) { return x231;}(local_230.object);
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_232 = x.data;
       return local_230.or;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6c78a9bb4dc7418b9c6fcbcdd77f4088"
                                    ,"df8546f58bdc08635e9f6ff7be4f4953");
   }
};
var queryFieldLang = function (language3) {
   var x = language3;
   switch (x.tag)
   {
     case "english":
       var local_222 = x.data;
       return function (local_223) {
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: local_223.table
                                                        ,b: rts.bytesFromAscii(".")})
                                           ,b: local_223.field})
                              ,b: function () {
                                 var x = function (x224) { return x224;}(local_223.as);
                                 switch (x.tag)
                                 {
                                   case "just":
                                     var local_225 = x.data;
                                     return _2b__2b_({a: rts.bytesFromAscii(" AS ")
                                                     ,b: local_225});
                                   case "nothing":
                                     var local_226 = x.data;
                                     return rts.bytesFromAscii("");
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                                                  ,"601b6d53f526392df53d629ee0c2ad71");
                                 }
                              }()});
           };
     case "hebrew":
       var local_227 = x.data;
       return function (local_228) {
              var local_229 = _2b__2b_({a: _2b__2b_({a: local_228.table
                                                    ,b: rts.bytesFromAscii(".")})
                                       ,b: local_228.field});
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("COALESCE(NULLIF(")
                                                                                  ,b: local_229})
                                                                     ,b: rts.bytesFromAscii("_hebrew, \'\'), ")})
                                                        ,b: local_229})
                                           ,b: rts.bytesFromAscii(") AS ")})
                              ,b: maybe({object: local_228.as,or: local_228.field})});
           };
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                    ,"77f1ffdc76bae5c4dbaf326aa2ff70a2");
   }
};
var pestovalQuerySessionsSql = function (local_215) {
   return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id,\n  pestoval_timeslot.id AS timeslot_id, pestoval_timeslot.start, pestoval_timeslot.stop,\n  pestoval_location.id AS location_id,\n  pestoval_level.id AS level_id, pestoval_level.color,")
                                ,infixr: function (local_216) {
                                   return _3a__3a_({infixl: join({texts: map({list: _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                      ,field: rts.bytesFromAscii("name")
                                                                                                      ,as: {tag: "just"
                                                                                                           ,data: rts.bytesFromAscii("session_name")}}
                                                                                             ,infixr: function (local_217) {
                                                                                                return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                         ,field: rts.bytesFromAscii("description")
                                                                                                                         ,as: {tag: "nothing"
                                                                                                                              ,data: {}}}
                                                                                                                ,infixr: function (local_218) {
                                                                                                                   return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                                            ,field: rts.bytesFromAscii("prereqs")
                                                                                                                                            ,as: {tag: "nothing"
                                                                                                                                                 ,data: {}}}
                                                                                                                                   ,infixr: function (local_219) {
                                                                                                                                      return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_location")
                                                                                                                                                               ,field: rts.bytesFromAscii("name")
                                                                                                                                                               ,as: {tag: "just"
                                                                                                                                                                    ,data: rts.bytesFromAscii("location_name")}}
                                                                                                                                                      ,infixr: function (local_220) {
                                                                                                                                                         return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_level")
                                                                                                                                                                                  ,field: rts.bytesFromAscii("name")
                                                                                                                                                                                  ,as: {tag: "just"
                                                                                                                                                                                       ,data: rts.bytesFromAscii("level_name")}}
                                                                                                                                                                         ,infixr: function (local_221) {
                                                                                                                                                                            return {tag: "empty"
                                                                                                                                                                                   ,data: {}};
                                                                                                                                                                         }});
                                                                                                                                                      }});
                                                                                                                                   }});
                                                                                                                }});
                                                                                             }})
                                                                             ,mapping: queryFieldLang(local_215.language)})
                                                                 ,seperator: rts.bytesFromAscii(", ")})
                                                   ,infixr: function (local_233) {
                                                      return _3a__3a_({infixl: local_215.from
                                                                      ,infixr: function (local_234) {
                                                                         return _2b__2b_2({infixl: map({list: _3a__3a_({infixl: {key: rts.bytesFromAscii("when_id")
                                                                                                                                ,table: rts.bytesFromAscii("pestoval_timeslot")}
                                                                                                                       ,infixr: function (local_235) {
                                                                                                                          return _3a__3a_({infixl: {key: rts.bytesFromAscii("location_id")
                                                                                                                                                   ,table: rts.bytesFromAscii("pestoval_location")}
                                                                                                                                          ,infixr: function (local_236) {
                                                                                                                                             return _3a__3a_({infixl: {key: rts.bytesFromAscii("level_id")
                                                                                                                                                                      ,table: rts.bytesFromAscii("pestoval_level")}
                                                                                                                                                             ,infixr: function (local_237) {
                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                       ,data: {}};
                                                                                                                                                             }});
                                                                                                                                          }});
                                                                                                                       }})
                                                                                                       ,mapping: function (local_238) {
                                                                                                          return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("LEFT OUTER JOIN ")
                                                                                                                                       ,infixr: function (local_239) {
                                                                                                                                          return _3a__3a_({infixl: local_238.table
                                                                                                                                                          ,infixr: function (local_240) {
                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(" ON pestoval_session.")
                                                                                                                                                                             ,infixr: function (local_241) {
                                                                                                                                                                                return _3a__3a_({infixl: local_238.key
                                                                                                                                                                                                ,infixr: function (local_242) {
                                                                                                                                                                                                   return _3a__3a_({infixl: rts.bytesFromAscii(" = ")
                                                                                                                                                                                                                   ,infixr: function (local_243) {
                                                                                                                                                                                                                      return _3a__3a_({infixl: local_238.table
                                                                                                                                                                                                                                      ,infixr: function (local_244) {
                                                                                                                                                                                                                                         return _3a__3a_({infixl: rts.bytesFromAscii(".id")
                                                                                                                                                                                                                                                         ,infixr: function (local_245) {
                                                                                                                                                                                                                                                            return {tag: "empty"
                                                                                                                                                                                                                                                                   ,data: {}};
                                                                                                                                                                                                                                                         }});
                                                                                                                                                                                                                                      }});
                                                                                                                                                                                                                   }});
                                                                                                                                                                                                }});
                                                                                                                                                                             }});
                                                                                                                                                          }});
                                                                                                                                       }})
                                                                                                                      ,seperator: rts.bytesFromAscii("")});
                                                                                                       }})
                                                                                          ,infixr: function (local_246) {
                                                                                             return _2b__2b_2({infixl: function () {
                                                                                                                 var x =
                                                                                                                 function (x247) {
                                                                                                                    return x247;
                                                                                                                 }(_3d__3d_({infixl: local_215.where
                                                                                                                            ,infixr: rts.bytesFromAscii("")}));
                                                                                                                 switch (x.tag)
                                                                                                                 {
                                                                                                                   case "false":
                                                                                                                     var local_248 =
                                                                                                                     x.data;
                                                                                                                     return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("WHERE ")
                                                                                                                                                       ,b: local_215.where})
                                                                                                                                     ,infixr: function (local_249) {
                                                                                                                                        return {tag: "empty"
                                                                                                                                               ,data: {}};
                                                                                                                                     }});
                                                                                                                   case "true":
                                                                                                                     var local_250 =
                                                                                                                     x.data;
                                                                                                                     return {tag: "empty"
                                                                                                                            ,data: {}};
                                                                                                                   default:
                                                                                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                  ,"DEF_140efbae773e4fea9f554e346c7b58e8"
                                                                                                                                                  ,"f573ad31abd803e9dda9e82ec3ef4df2");
                                                                                                                 }
                                                                                                              }()
                                                                                                              ,infixr: function (local_251) {
                                                                                                                 return _3a__3a_({infixl: rts.bytesFromAscii("ORDER BY pestoval_timeslot.start, pestoval_location.id")
                                                                                                                                 ,infixr: function (local_252) {
                                                                                                                                    return {tag: "empty"
                                                                                                                                           ,data: {}};
                                                                                                                                 }});
                                                                                                              }});
                                                                                          }});
                                                                      }});
                                                   }});
                                }})
               ,seperator: rts.bytesFromAscii("\n")});
};
var pestovalTeacherName = {table: rts.bytesFromAscii("pestoval_teacher")
                          ,field: rts.bytesFromAscii("name")
                          ,as: {tag: "nothing",data: {}}};
var newMutArray1 = function (list6) {
   return _3b_({infixl: newMutArray
               ,infixr: function (__array2) {
                  return _3b_({infixl: sequence__(map({list: list6
                                                      ,mapping: function (item1) {
                                                         return appendMutArray({object: __array2
                                                                               ,value: item1});
                                                      }}))
                              ,infixr: function (local_263) {
                                 return __return(__array2);
                              }});
               }});
};
var length4 = rts.builtins.Mut.Array["length"];
var _2265_ = rts.builtins.Prelude[">="];
var readMutArray = rts.builtins.Mut.Array["read"];
var newMutRef = rts.builtins.Mut.Ref["new"];
var readMutRef = rts.builtins.Mut.Ref["read"];
var writeMutArray = rts.builtins.Mut.Array["write"];
var writeMutRef = rts.builtins.Mut.Ref["write"];
var sort1 = function (local_265) {
   var x = function (x266) {
              return x266;
           }(_2265_({infixl: _2b_({infixl: local_265.start,infixr: 1.0})
                    ,infixr: local_265.stop}));
   switch (x.tag)
   {
     case "false":
       var local_267 = x.data;
       return _3b_({infixl: readMutArray({index: local_265.start
                                         ,object: local_265.__array})
                   ,infixr: function (pivot) {
                      return _3b_({infixl: newMutRef(local_265.start)
                                  ,infixr: function (pivotPosRef) {
                                     return _3b_({infixl: sequence__(map({list: _2e__2e_({start: _2b_({infixl: local_265.start
                                                                                                      ,infixr: 1.0})
                                                                                         ,stop: local_265.stop})
                                                                         ,mapping: function (index) {
                                                                            return _3b_({infixl: readMutArray({index: index
                                                                                                              ,object: local_265.__array})
                                                                                        ,infixr: function (object) {
                                                                                           var x =
                                                                                           function (x268) {
                                                                                              return x268;
                                                                                           }(local_265._3c_({infixl: object
                                                                                                            ,infixr: pivot}));
                                                                                           switch (x.tag)
                                                                                           {
                                                                                             case "false":
                                                                                               var local_269 =
                                                                                               x.data;
                                                                                               return __return({});
                                                                                             case "true":
                                                                                               var local_270 =
                                                                                               x.data;
                                                                                               return _3b_({infixl: readMutRef(pivotPosRef)
                                                                                                           ,infixr: function (pivotPos) {
                                                                                                              return _3b_({infixl: writeMutArray({index: pivotPos
                                                                                                                                                 ,object: local_265.__array
                                                                                                                                                 ,value: object})
                                                                                                                          ,infixr: function (local_271) {
                                                                                                                             var newPivotPos =
                                                                                                                             _2b_({infixl: pivotPos
                                                                                                                                  ,infixr: 1.0});
                                                                                                                             return _3b_({infixl: writeMutRef({object: pivotPosRef
                                                                                                                                                              ,value: newPivotPos})
                                                                                                                                         ,infixr: function (local_272) {
                                                                                                                                            return _3b_({infixl: readMutArray({index: newPivotPos
                                                                                                                                                                              ,object: local_265.__array})
                                                                                                                                                        ,infixr: function (local_273) {
                                                                                                                                                           return writeMutArray({index: index
                                                                                                                                                                                ,object: local_265.__array
                                                                                                                                                                                ,value: local_273});
                                                                                                                                                        }});
                                                                                                                                         }});
                                                                                                                          }});
                                                                                                           }});
                                                                                             default:
                                                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                            ,"DEF_7dc48073b9e642f0921b10b11676f38b"
                                                                                                                            ,"20ca215bae629c3b4189e451c898fa54");
                                                                                           }
                                                                                        }});
                                                                         }}))
                                                 ,infixr: function (local_274) {
                                                    return _3b_({infixl: readMutRef(pivotPosRef)
                                                                ,infixr: function (index1) {
                                                                   return _3b_({infixl: writeMutArray({index: index1
                                                                                                      ,object: local_265.__array
                                                                                                      ,value: pivot})
                                                                               ,infixr: function (local_275) {
                                                                                  return _3b_({infixl: sort1({start: local_265.start
                                                                                                             ,stop: index1
                                                                                                             ,_3c_: local_265._3c_
                                                                                                             ,__array: local_265.__array})
                                                                                              ,infixr: function (local_276) {
                                                                                                 return sort1({start: _2b_({infixl: index1
                                                                                                                           ,infixr: 1.0})
                                                                                                              ,stop: local_265.stop
                                                                                                              ,_3c_: local_265._3c_
                                                                                                              ,__array: local_265.__array});
                                                                                              }});
                                                                               }});
                                                                }});
                                                 }});
                                  }});
                   }});
     case "true":
       var local_277 = x.data;
       return __return({});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_7dc48073b9e642f0921b10b11676f38b"
                                    ,"767c3133b4f8a61071c98bc4f445f9a6");
   }
};
var sort = function (local_262) {
   return runMutArray(_3b_({infixl: newMutArray1(local_262.list)
                           ,infixr: function (__array3) {
                              return _3b_({infixl: length4(__array3)
                                          ,infixr: function (local_264) {
                                             return _3b_({infixl: sort1({start: 0.0
                                                                        ,stop: local_264
                                                                        ,_3c_: local_262._3c_
                                                                        ,__array: __array3})
                                                         ,infixr: function (local_278) {
                                                            return __return(__array3);
                                                         }});
                                          }});
                           }}));
};
var foldLazy1 = function (local_297) {
   return foldLazy({list: local_297.list
                   ,initial: function (local_298) {
                      return local_297.done;
                   }
                   ,binop: function (local_299) {
                      return function (state) {
                             return local_297.step({state: state
                                                   ,rest: local_299.rest
                                                   ,item: local_299.item});
                          };
                   }})(local_297.initialState);
};
var group = function (local_280) {
   return foldLazy1({list: local_280.list
                    ,initialState: {tag: "empty",data: {}}
                    ,step: function (local_281) {
                       var x = function (x282) { return x282;}(local_281.state);
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_283 = x.data;
                           var x = function (x284) {
                                      return x284;
                                   }(local_280.by({infixl: local_283.head
                                                  ,infixr: local_281.item}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_285 = x.data;
                               return _3a__3a_({infixl: toArray(reverse(local_281.state))
                                               ,infixr: function (local_286) {
                                                  return local_281.rest({})(_3a__3a_({infixl: local_281.item
                                                                                     ,infixr: function (local_287) {
                                                                                        return {tag: "empty"
                                                                                               ,data: {}};
                                                                                     }}));
                                               }});
                             case "true":
                               var local_288 = x.data;
                               return local_281.rest({})(_3a__3a_({infixl: local_281.item
                                                                  ,infixr: function (local_289) {
                                                                     return local_281.state;
                                                                  }}));
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                            ,"80c64c4a3e825d563e72c3ff848be12a");
                           }
                         case "empty":
                           var local_290 = x.data;
                           return local_281.rest({})(_3a__3a_({infixl: local_281.item
                                                              ,infixr: function (local_291) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }}));
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                        ,"74a01a012e28a30393aafbb0e69c22f4");
                       }
                    }
                    ,done: function (local_292) {
                       var x = function (x293) { return x293;}(local_292);
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_294 = x.data;
                           return _3a__3a_({infixl: toArray(reverse(local_292))
                                           ,infixr: function (local_295) {
                                              return {tag: "empty",data: {}};
                                           }});
                         case "empty":
                           var local_296 = x.data;
                           return {tag: "empty",data: {}};
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                        ,"44a912bc33ec9c258e1ba58d8731bdd8");
                       }
                    }});
};
var pestovalQuerySessionTeachers = function (local_256) {
   return _3b_({infixl: query({database: local_256.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_session_teachers.teacher_id, pestoval_session_teachers.session_id,\n  ")
                                                             ,b: queryFieldLang(local_256.language)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_teacher ON pestoval_session_teachers.teacher_id = pestoval_teacher.id")})})
               ,infixr: function (x257) {
                  switch (x257.tag)
                  {
                    case "error":
                      var local_258 = x257.data;
                      return ignoreError(local_258);
                    case "success":
                      var local_259 = x257.data;
                      return __return(toArray(map({list: group({list: fromArray(sort({list: map({list: fromArray(local_259.__data)
                                                                                                ,mapping: function (local_260) {
                                                                                                   return {teacher: {name: item({index: 2.0
                                                                                                                                ,object: local_260})
                                                                                                                    ,id: parseInt(item({index: 0.0
                                                                                                                                       ,object: local_260}))}
                                                                                                          ,session: parseInt(item({index: 1.0
                                                                                                                                  ,object: local_260}))};
                                                                                                }})
                                                                                     ,_3c_: function (local_261) {
                                                                                        return _3c_({infixl: local_261.infixl.session
                                                                                                    ,infixr: local_261.infixr.session});
                                                                                     }}))
                                                               ,by: function (local_279) {
                                                                  return _3d__3d_({infixl: local_279.infixl.session
                                                                                  ,infixr: local_279.infixr.session});
                                                               }})
                                                  ,mapping: function (local_300) {
                                                     return {value: toArray(map({list: fromArray(local_300)
                                                                                ,mapping: function (local_301) {
                                                                                   return local_301.teacher;
                                                                                }}))
                                                            ,key: item({index: 0.0
                                                                       ,object: local_300}).session};
                                                  }})));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_de80144d74df47438852d18bad3b3eaf"
                                                   ,"9800f3fc1326d8ea5b4af24b15b823d4");
                  }
               }});
};
var _3e__3d__3c_ = function (local_309) {
   var x = function (x310) {
              return x310;
           }(_3d__3d_({infixl: local_309.__x,infixr: local_309.y}));
   switch (x.tag)
   {
     case "false":
       var local_311 = x.data;
       var x = function (x312) {
                  return x312;
               }(_3c_({infixl: local_309.__x,infixr: local_309.y}));
       switch (x.tag)
       {
         case "false":
           var local_313 = x.data;
           return {tag: "_3e_",data: {}};
         case "true":
           var local_314 = x.data;
           return {tag: "_3c_",data: {}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_710304e7117b480ba76d20139b3980c1"
                                        ,"b36d82ac26521ea940b13add4c373a2c");
       }
     case "true":
       var local_315 = x.data;
       return {tag: "_3d__3d_",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_710304e7117b480ba76d20139b3980c1"
                                    ,"508e7c4e652cf07b779c96cd2344172c");
   }
};
var _2f_ = rts.builtins.Prelude["/"];
var floor = function (local_320) {
   return _2d_({infixl: local_320,infixr: _25_({infixl: local_320,infixr: 1.0})});
};
var search1 = function (local_317) {
   var x = function (x318) {
              return x318;
           }(_2265_({infixl: local_317.start,infixr: local_317.stop}));
   switch (x.tag)
   {
     case "false":
       var local_319 = x.data;
       var pivot1 = floor(_2f_({infixl: _2b_({infixl: local_317.start
                                             ,infixr: local_317.stop})
                               ,infixr: 2.0}));
       var x = local_317.compareTo(pivot1);
       switch (x.tag)
       {
         case "_3e_":
           var local_321 = x.data;
           return search1({start: _2b_({infixl: pivot1,infixr: 1.0})
                          ,stop: local_317.stop
                          ,compareTo: local_317.compareTo});
         case "_3c_":
           var local_322 = x.data;
           return search1({start: local_317.start
                          ,stop: pivot1
                          ,compareTo: local_317.compareTo});
         case "_3d__3d_":
           var local_323 = x.data;
           return {tag: "just",data: pivot1};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                        ,"c6c8b9c428c0b8b42ffc038b0554d06b");
       }
     case "true":
       var local_324 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                    ,"c22774ac01ba95da7d4aa96a5694962d");
   }
};
var search = function (local_316) {
   return search1({start: 0.0
                  ,stop: length1(local_316.sorted)
                  ,compareTo: function (index3) {
                     return local_316.compareTo(item({index: index3
                                                     ,object: local_316.sorted}));
                  }});
};
var lookup = function (local_307) {
   var x = function (x325) {
              return x325;
           }(search({compareTo: function (local_308) {
                       return _3e__3d__3c_({y: local_308.key,__x: local_307.key});
                    }
                    ,sorted: local_307.sorted}));
   switch (x.tag)
   {
     case "just":
       var index4 = x.data;
       return {tag: "just",data: item({index: index4,object: local_307.sorted}).value};
     case "nothing":
       var local_326 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a4e4077b0c07428e86abf1bac4a10b4f"
                                    ,"037df5e76b157671e777748996e8ff72");
   }
};
var unwords = function (words) {
   return join({texts: words,seperator: rts.bytesFromAscii(" ")});
};
var dayNames = toArray(split({text: rts.bytesFromAscii("Mon Tue Wed Thu Fri Sat Sun")
                             ,seperator: rts.bytesFromAscii(" ")}));
var index5 = function (local_336) {
   var x = function (x337) {
              return x337;
           }(first({that: function (index6) {
                      return _3d__3d_({infixl: item({index: index6
                                                    ,object: local_336.__array})
                                      ,infixr: local_336.item});
                   }
                   ,list: _2e__2e_({start: 0.0,stop: length1(local_336.__array)})}));
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_338 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_bb1f3635a22340e9b8036656619efdc1"
                                       ,"d0062c09c4ee2abcd4b0cc313b84fc5d");
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_bb1f3635a22340e9b8036656619efdc1"
                                    ,"eafac946fbbd2eb5e94b628a7f5d6613");
   }
};
var monthNames =
toArray(split({text: rts.bytesFromAscii("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec")
              ,seperator: rts.bytesFromAscii(" ")}));
var parseDateTime = function (text) {
   var local_329 = toArray(split({text: text,seperator: rts.bytesFromAscii(" ")}));
   var item3 = function (local_330) { return item({index: local_330,object: local_329});};
   var local_331 = toArray(split({text: item3(4.0),seperator: rts.bytesFromAscii(":")}));
   var local_333 = function (local_332) {
      return parseInt(item({index: local_332,object: local_331}));
   };
   return {time: {timezone: unwords(_3a__3a_({infixl: item3(5.0)
                                             ,infixr: function (local_334) {
                                                return _3a__3a_({infixl: item3(6.0)
                                                                ,infixr: function (local_335) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }}))
                 ,minute: local_333(1.0)
                 ,second: local_333(2.0)
                 ,hour: local_333(0.0)}
          ,date: {weekDay: _2b_({infixl: index5({__array: dayNames,item: item3(0.0)})
                                ,infixr: 1.0})
                 ,month: _2b_({infixl: index5({__array: monthNames,item: item3(1.0)})
                              ,infixr: 1.0})
                 ,day: parseInt(item3(2.0))
                 ,year: parseInt(item3(3.0))}};
};
var pestovalQuerySessions = function (local_179) {
   var local_195 = function () {
                      var x = function (x180) { return x180;}(local_179.teacher);
                      switch (x.tag)
                      {
                        case "just":
                          var local_181 = x.data;
                          return {where: _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("pestoval_session_teachers.teacher_id = ")
                                                                    ,b: showNum(local_181)})
                                                  ,infixr: function (local_193) {
                                                     return {tag: "empty",data: {}};
                                                  }})
                                 ,from: rts.bytesFromAscii("FROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_session ON pestoval_session_teachers.session_id = pestoval_session.id")};
                        case "nothing":
                          var local_194 = x.data;
                          return {where: {tag: "empty",data: {}}
                                 ,from: rts.bytesFromAscii("FROM pestoval_session")};
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                       ,"c83b0d9e623697d989e5a09fb1c59c4f");
                      }
                   }();
   return _3b_({infixl: query({database: local_179.database
                              ,object: pestovalQuerySessionsSql({where: join({texts: _2b__2b_2({infixl: local_195.where
                                                                                               ,infixr: function (local_196) {
                                                                                                  var x =
                                                                                                  function (x197) {
                                                                                                     return x197;
                                                                                                  }(local_179.filter);
                                                                                                  switch (x.tag)
                                                                                                  {
                                                                                                    case "just":
                                                                                                      var local_198 =
                                                                                                      x.data;
                                                                                                      return _3a__3a_({infixl: local_198
                                                                                                                      ,infixr: function (local_199) {
                                                                                                                         return {tag: "empty"
                                                                                                                                ,data: {}};
                                                                                                                      }});
                                                                                                    case "nothing":
                                                                                                      var local_200 =
                                                                                                      x.data;
                                                                                                      return {tag: "empty"
                                                                                                             ,data: {}};
                                                                                                    default:
                                                                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                   ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                                                                                   ,"b9b460a647ac4021e5d0ace3826c3537");
                                                                                                  }
                                                                                               }})
                                                                             ,seperator: rts.bytesFromAscii(" AND ")})
                                                                ,from: local_195.from
                                                                ,language: local_179.language})})
               ,infixr: function (x253) {
                  switch (x253.tag)
                  {
                    case "error":
                      var local_254 = x253.data;
                      return ignoreError(local_254);
                    case "success":
                      var local_255 = x253.data;
                      return _3b_({infixl: pestovalQuerySessionTeachers({database: local_179.database
                                                                        ,language: local_179.language})
                                  ,infixr: function (teachers) {
                                     var field = function (local_302) {
                                        var x = function (x303) {
                                                   return x303;
                                                }(first({that: function (index2) {
                                                           return _3d__3d_({infixl: item({index: index2
                                                                                         ,object: local_255.fields})
                                                                           ,infixr: local_302});
                                                        }
                                                        ,list: _2e__2e_({start: 0.0
                                                                        ,stop: length1(local_255.fields)})}));
                                        switch (x.tag)
                                        {
                                          case "just":
                                            return id(x.data);
                                          case "nothing":
                                            var local_304 = x.data;
                                            throw rts.exceptions.ReachedHole("Reached a hole"
                                                                            ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                            ,"a8dea6e428906f6970698acdd1c10cbd");
                                          default:
                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                         ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                         ,"ca9c646dae236b23539d3c03280dc8af");
                                        }
                                     };
                                     var session = field(rts.bytesFromAscii("id"));
                                     var when = {start: field(rts.bytesFromAscii("start"))
                                                ,stop: field(rts.bytesFromAscii("stop"))
                                                ,id: field(rts.bytesFromAscii("timeslot_id"))};
                                     var name = field(rts.bytesFromAscii("session_name"));
                                     var level =
                                     {name: field(rts.bytesFromAscii("level_name"))
                                     ,id: field(rts.bytesFromAscii("level_id"))
                                     ,color: field(rts.bytesFromAscii("color"))};
                                     var place =
                                     {name: field(rts.bytesFromAscii("location_name"))
                                     ,id: field(rts.bytesFromAscii("location_id"))};
                                     var description =
                                     field(rts.bytesFromAscii("description"));
                                     var prereqs = field(rts.bytesFromAscii("prereqs"));
                                     return __return(toArray(map({list: fromArray(local_255.__data)
                                                                 ,mapping: function (local_305) {
                                                                    var item2 =
                                                                    function (local_306) {
                                                                       return item({index: local_306
                                                                                   ,object: local_305});
                                                                    };
                                                                    var id1 =
                                                                    parseInt(item2(session));
                                                                    return {prereqs: item2(prereqs)
                                                                           ,name: item2(name)
                                                                           ,place: {name: item2(place.name)
                                                                                   ,id: parseInt(item2(place.id))}
                                                                           ,description: item2(description)
                                                                           ,teachers: function () {
                                                                              var x =
                                                                              function (x327) {
                                                                                 return x327;
                                                                              }(lookup({key: id1
                                                                                       ,sorted: teachers}));
                                                                              switch (x.tag)
                                                                              {
                                                                                case "just":
                                                                                  return id(x.data);
                                                                                case "nothing":
                                                                                  var local_328 =
                                                                                  x.data;
                                                                                  return [];
                                                                                default:
                                                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                               ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                                                               ,"4727001e8f10c93cea88012dc24e67a0");
                                                                              }
                                                                           }()
                                                                           ,id: id1
                                                                           ,when: {start: parseDateTime(item2(when.start))
                                                                                  ,stop: parseDateTime(item2(when.stop))
                                                                                  ,id: parseInt(item2(when.id))}
                                                                           ,level: {name: item2(level.name)
                                                                                   ,id: parseInt(item2(level.id))
                                                                                   ,color: item2(level.color)}};
                                                                 }})));
                                  }});
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                   ,"b7f232d070f067bfe76ad6b4679cb4aa");
                  }
               }});
};
var htmlParagraph = function (text1) {
   return _22f2_({infixl: rts.bytesFromAscii("<p>"),infixr: singleton(leaf(text1))});
};
var dayNamesHebrew = toArray(split({text: rts.bytes([215
                                                    ,169
                                                    ,215
                                                    ,160
                                                    ,215
                                                    ,153
                                                    ,32
                                                    ,215
                                                    ,169
                                                    ,215
                                                    ,156
                                                    ,215
                                                    ,153
                                                    ,215
                                                    ,169
                                                    ,215
                                                    ,153
                                                    ,32
                                                    ,215
                                                    ,168
                                                    ,215
                                                    ,145
                                                    ,215
                                                    ,153
                                                    ,215
                                                    ,162
                                                    ,215
                                                    ,153
                                                    ,32
                                                    ,215
                                                    ,151
                                                    ,215
                                                    ,158
                                                    ,215
                                                    ,153
                                                    ,215
                                                    ,169
                                                    ,215
                                                    ,153
                                                    ,32
                                                    ,215
                                                    ,169
                                                    ,215
                                                    ,153
                                                    ,215
                                                    ,169
                                                    ,215
                                                    ,153
                                                    ,32
                                                    ,215
                                                    ,169
                                                    ,215
                                                    ,145
                                                    ,215
                                                    ,170
                                                    ,32
                                                    ,215
                                                    ,168
                                                    ,215
                                                    ,144
                                                    ,215
                                                    ,169
                                                    ,215
                                                    ,149
                                                    ,215
                                                    ,159])
                                   ,seperator: rts.bytesFromAscii(" ")}));
var replicate = function (local_410) {
   var x = function (x411) { return x411;}(_2264_({infixl: local_410.count,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_412 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_410.item
                     ,tail: function (local_413) {
                        return replicate({count: _2d_({infixl: local_410.count
                                                      ,infixr: 1.0})
                                         ,item: local_410.item});
                     }}};
     case "true":
       var local_414 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_70f79762f05c41ccb9677f7a60746680"
                                    ,"3b53ee6d875f49f4acdb9a2e8b33fb2d");
   }
};
var rightJustify = function (local_406) {
   var count = _2d_({infixl: local_406.length
                    ,infixr: length(function (x407) {
                       return x407;
                    }(local_406.text))});
   var x = function (x408) { return x408;}(_2264_({infixl: count,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_409 = x.data;
       return _2b__2b_({a: toBytes(toArray(replicate({count: count
                                                     ,item: local_406.character})))
                       ,b: local_406.text});
     case "true":
       var local_415 = x.data;
       return local_406.text;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_c96ce62be72e4d1e85d07af16867169d"
                                    ,"ea6106b4e471dead7c7d3638866db4a1");
   }
};
var showTime = function (local_400) {
   return join({texts: map({list: _3a__3a_({infixl: function (x401) {
                                              return x401;
                                           }(local_400).hour
                                           ,infixr: function (local_402) {
                                              return _3a__3a_({infixl: function (x403) {
                                                                 return x403;
                                                              }(local_400).minute
                                                              ,infixr: function (local_404) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }})
                           ,mapping: function (local_405) {
                              return rightJustify({length: 2.0
                                                  ,text: showNum(local_405)
                                                  ,character: 48.0});
                           }})
               ,seperator: rts.bytesFromAscii(":")});
};
var formatTimeSlot = function (local_395) {
   return join({texts: _3a__3a_({infixl: item({index: _2d_({infixl: function (x396) {
                                                              return x396;
                                                           }(local_395.timeSlot.start.date).weekDay
                                                           ,infixr: 1.0})
                                              ,object: function () {
                                                 var x = local_395.language;
                                                 switch (x.tag)
                                                 {
                                                   case "english":
                                                     var local_397 = x.data;
                                                     return dayNames;
                                                   case "hebrew":
                                                     var local_398 = x.data;
                                                     return dayNamesHebrew;
                                                   default:
                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                  ,"DEF_4fed722dd3634c0db388c78e255c1429"
                                                                                  ,"5582218e01f5831eae7835c315a758c0");
                                                 }
                                              }()})
                                ,infixr: function (local_399) {
                                   return _3a__3a_({infixl: showTime(local_395.timeSlot.start.time)
                                                   ,infixr: function (local_416) {
                                                      return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                      ,infixr: function (local_417) {
                                                                         return _3a__3a_({infixl: showTime(local_395.timeSlot.stop.time)
                                                                                         ,infixr: function (local_418) {
                                                                                            return {tag: "empty"
                                                                                                   ,data: {}};
                                                                                         }});
                                                                      }});
                                                   }});
                                }})
               ,seperator: rts.bytesFromAscii(" ")});
};
var replace = function (local_429) {
   return join({texts: split({text: local_429.text,seperator: local_429.from})
               ,seperator: local_429.to});
};
var pestovalSessionInfo = function (local_360) {
   var local_364 = function (local_361) {
      return _22f2_({infixl: rts.bytesFromAscii("<p>")
                    ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<b>")
                                     ,infixr: singleton(leaf(local_361.key))})
                             ,leaf(local_361.value)]});
   };
   var teacher1 = function (local_365) {
      return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/")
                                              ,infixr: function (local_366) {
                                                 return _3a__3a_({infixl: function () {
                                                                    var x =
                                                                    local_360.language;
                                                                    switch (x.tag)
                                                                    {
                                                                      case "english":
                                                                        var local_367 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("eng");
                                                                      case "hebrew":
                                                                        var local_368 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("heb");
                                                                      default:
                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                     ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                     ,"25c06dfd8f7a82ef041d5e079e02e218");
                                                                    }
                                                                 }()
                                                                 ,infixr: function (local_369) {
                                                                    return _3a__3a_({infixl: rts.bytesFromAscii("/teacher/")
                                                                                    ,infixr: function (local_370) {
                                                                                       return _3a__3a_({infixl: showNum(local_365.id)
                                                                                                       ,infixr: function (local_371) {
                                                                                                          return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                          ,infixr: function (local_372) {
                                                                                                                             return {tag: "empty"
                                                                                                                                    ,data: {}};
                                                                                                                          }});
                                                                                                       }});
                                                                                    }});
                                                                 }});
                                              }}))
                    ,infixr: singleton(leaf(local_365.name))});
   };
   return toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                           ,infixr: function () {
                                              var x = function (x373) {
                                                         return x373;
                                                      }(fromArray(local_360.session.teachers));
                                              switch (x.tag)
                                              {
                                                case "nonEmpty":
                                                  var local_374 = x.data;
                                                  return toArray(_3a__3a_({infixl: teacher1(local_374.head)
                                                                          ,infixr: function (local_375) {
                                                                             return _2b__2b_2({infixl: concat(map({list: local_374.tail({})
                                                                                                                  ,mapping: function (local_376) {
                                                                                                                     return _3a__3a_({infixl: leaf(function () {
                                                                                                                                        var x =
                                                                                                                                        local_360.language;
                                                                                                                                        switch (x.tag)
                                                                                                                                        {
                                                                                                                                          case "english":
                                                                                                                                            var local_377 =
                                                                                                                                            x.data;
                                                                                                                                            return rts.bytesFromAscii(" & ");
                                                                                                                                          case "hebrew":
                                                                                                                                            var local_378 =
                                                                                                                                            x.data;
                                                                                                                                            return rts.bytes([32
                                                                                                                                                             ,215
                                                                                                                                                             ,149]);
                                                                                                                                          default:
                                                                                                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                         ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                                                         ,"9750a7059a5af134d0eb3dcae276f1a7");
                                                                                                                                        }
                                                                                                                                     }())
                                                                                                                                     ,infixr: function (local_379) {
                                                                                                                                        return _3a__3a_({infixl: teacher1(local_376)
                                                                                                                                                        ,infixr: function (local_380) {
                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                  ,data: {}};
                                                                                                                                                        }});
                                                                                                                                     }});
                                                                                                                  }}))
                                                                                              ,infixr: function (local_381) {
                                                                                                 return _3a__3a_({infixl: leaf(_2b__2b_({a: rts.bytesFromAscii(": ")
                                                                                                                                        ,b: local_360.session.name}))
                                                                                                                 ,infixr: function (local_382) {
                                                                                                                    return {tag: "empty"
                                                                                                                           ,data: {}};
                                                                                                                 }});
                                                                                              }});
                                                                          }}));
                                                case "empty":
                                                  var local_383 = x.data;
                                                  return singleton(leaf(local_360.session.name));
                                                default:
                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                               ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                               ,"ed7be6bad9f71095a62be6746bf728a3");
                                              }
                                           }()})
                           ,infixr: function (local_384) {
                              return _2b__2b_2({infixl: function () {
                                                  var x = function (x385) {
                                                             return x385;
                                                          }(local_360.password);
                                                  switch (x.tag)
                                                  {
                                                    case "just":
                                                      var local_386 = x.data;
                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                      ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/eng/edit/")
                                                                                                                                               ,infixr: function (local_387) {
                                                                                                                                                  return _3a__3a_({infixl: showNum(local_360.session.id)
                                                                                                                                                                  ,infixr: function (local_388) {
                                                                                                                                                                     return _3a__3a_({infixl: rts.bytesFromAscii("/")
                                                                                                                                                                                     ,infixr: function (local_389) {
                                                                                                                                                                                        return _3a__3a_({infixl: local_386
                                                                                                                                                                                                        ,infixr: function (local_390) {
                                                                                                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                                                                                                                           ,infixr: function (local_391) {
                                                                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                                                                           }});
                                                                                                                                                                                                        }});
                                                                                                                                                                                     }});
                                                                                                                                                                  }});
                                                                                                                                               }})
                                                                                                                              ,seperator: rts.bytesFromAscii("")})
                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("Edit details")))}))})
                                                                      ,infixr: function (local_392) {
                                                                         return {tag: "empty"
                                                                                ,data: {}};
                                                                      }});
                                                    case "nothing":
                                                      var local_393 = x.data;
                                                      return {tag: "empty",data: {}};
                                                    default:
                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                   ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                   ,"fad3e2035a95ac24b0214f741995983a");
                                                  }
                                               }()
                                               ,infixr: function (local_394) {
                                                  return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<b>")
                                                                                  ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_360.session.when
                                                                                                                         ,language: local_360.language})))})
                                                                  ,infixr: function (local_419) {
                                                                     return _3a__3a_({infixl: local_364({value: local_360.session.place.name
                                                                                                        ,key: function () {
                                                                                                           var x =
                                                                                                           local_360.language;
                                                                                                           switch (x.tag)
                                                                                                           {
                                                                                                             case "english":
                                                                                                               var local_420 =
                                                                                                               x.data;
                                                                                                               return rts.bytesFromAscii("Where: ");
                                                                                                             case "hebrew":
                                                                                                               var local_421 =
                                                                                                               x.data;
                                                                                                               return rts.bytes([215
                                                                                                                                ,144
                                                                                                                                ,215
                                                                                                                                ,153
                                                                                                                                ,215
                                                                                                                                ,164
                                                                                                                                ,215
                                                                                                                                ,148
                                                                                                                                ,58
                                                                                                                                ,32]);
                                                                                                             default:
                                                                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                            ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                            ,"179cde6923eb73cf24940af0561913a7");
                                                                                                           }
                                                                                                        }()})
                                                                                     ,infixr: function (local_422) {
                                                                                        return _3a__3a_({infixl: local_364({value: local_360.session.level.name
                                                                                                                           ,key: function () {
                                                                                                                              var x =
                                                                                                                              local_360.language;
                                                                                                                              switch (x.tag)
                                                                                                                              {
                                                                                                                                case "english":
                                                                                                                                  var local_423 =
                                                                                                                                  x.data;
                                                                                                                                  return rts.bytesFromAscii("Who: ");
                                                                                                                                case "hebrew":
                                                                                                                                  var local_424 =
                                                                                                                                  x.data;
                                                                                                                                  return rts.bytes([215
                                                                                                                                                   ,158
                                                                                                                                                   ,215
                                                                                                                                                   ,153
                                                                                                                                                   ,58
                                                                                                                                                   ,32]);
                                                                                                                                default:
                                                                                                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                               ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                                               ,"a86a0d0f193b3a5704ba058160976419");
                                                                                                                              }
                                                                                                                           }()})
                                                                                                        ,infixr: function (local_425) {
                                                                                                           return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                           ,infixr: singleton(leaf(function () {
                                                                                                                                              var x =
                                                                                                                                              local_360.language;
                                                                                                                                              switch (x.tag)
                                                                                                                                              {
                                                                                                                                                case "english":
                                                                                                                                                  var local_426 =
                                                                                                                                                  x.data;
                                                                                                                                                  return rts.bytesFromAscii("Description:");
                                                                                                                                                case "hebrew":
                                                                                                                                                  var local_427 =
                                                                                                                                                  x.data;
                                                                                                                                                  return rts.bytes([215
                                                                                                                                                                   ,170
                                                                                                                                                                   ,215
                                                                                                                                                                   ,153
                                                                                                                                                                   ,215
                                                                                                                                                                   ,144
                                                                                                                                                                   ,215
                                                                                                                                                                   ,149
                                                                                                                                                                   ,215
                                                                                                                                                                   ,168
                                                                                                                                                                   ,58]);
                                                                                                                                                default:
                                                                                                                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                               ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                                                               ,"9be0f6a7af77ef5ae10c6cc37838cf70");
                                                                                                                                              }
                                                                                                                                           }()))})
                                                                                                                           ,infixr: function (local_428) {
                                                                                                                              var local_430 =
                                                                                                                              function (text2) {
                                                                                                                                 return replace({text: text2
                                                                                                                                                ,from: rts.bytesFromAscii("\n")
                                                                                                                                                ,to: rts.bytesFromAscii("<br/>\n")});
                                                                                                                              };
                                                                                                                              return _3a__3a_({infixl: htmlParagraph(local_430(local_360.session.description))
                                                                                                                                              ,infixr: function (local_431) {
                                                                                                                                                 return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                 ,infixr: singleton(leaf(function () {
                                                                                                                                                                                    var x =
                                                                                                                                                                                    local_360.language;
                                                                                                                                                                                    switch (x.tag)
                                                                                                                                                                                    {
                                                                                                                                                                                      case "english":
                                                                                                                                                                                        var local_432 =
                                                                                                                                                                                        x.data;
                                                                                                                                                                                        return rts.bytesFromAscii("Prereqs:");
                                                                                                                                                                                      case "hebrew":
                                                                                                                                                                                        var local_433 =
                                                                                                                                                                                        x.data;
                                                                                                                                                                                        return rts.bytes([215
                                                                                                                                                                                                         ,147
                                                                                                                                                                                                         ,215
                                                                                                                                                                                                         ,168
                                                                                                                                                                                                         ,215
                                                                                                                                                                                                         ,153
                                                                                                                                                                                                         ,215
                                                                                                                                                                                                         ,169
                                                                                                                                                                                                         ,215
                                                                                                                                                                                                         ,149
                                                                                                                                                                                                         ,215
                                                                                                                                                                                                         ,170
                                                                                                                                                                                                         ,45
                                                                                                                                                                                                         ,215
                                                                                                                                                                                                         ,167
                                                                                                                                                                                                         ,215
                                                                                                                                                                                                         ,147
                                                                                                                                                                                                         ,215
                                                                                                                                                                                                         ,157
                                                                                                                                                                                                         ,58]);
                                                                                                                                                                                      default:
                                                                                                                                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                                                     ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                                                                                                     ,"2b42a6de4a3edaa1b093b42c3a22ec18");
                                                                                                                                                                                    }
                                                                                                                                                                                 }()))})
                                                                                                                                                                 ,infixr: function (local_434) {
                                                                                                                                                                    return _3a__3a_({infixl: htmlParagraph(local_430(local_360.session.prereqs))
                                                                                                                                                                                    ,infixr: function (local_435) {
                                                                                                                                                                                       return {tag: "empty"
                                                                                                                                                                                              ,data: {}};
                                                                                                                                                                                    }});
                                                                                                                                                                 }});
                                                                                                                                              }});
                                                                                                                           }});
                                                                                                        }});
                                                                                     }});
                                                                  }});
                                               }});
                           }}));
};
var htmlPopup = function (local_436) {
   return _22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<div id=\"")
                                                ,infixr: function (local_437) {
                                                   return _3a__3a_({infixl: local_436.id
                                                                   ,infixr: function (local_438) {
                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("\" class=\"overlay\">")
                                                                                      ,infixr: function (local_439) {
                                                                                         return {tag: "empty"
                                                                                                ,data: {}};
                                                                                      }});
                                                                   }});
                                                }})
                               ,seperator: rts.bytesFromAscii("")})
                 ,infixr: [leaf(rts.bytesFromAscii("<a class=\"cancel\" href=\"javascript:history.back()\">"))
                          ,_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<div class=\"popup\" style=\"background-color:")
                                                                 ,infixr: function (local_441) {
                                                                    return _3a__3a_({infixl: local_436.color
                                                                                    ,infixr: function (local_442) {
                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\">")
                                                                                                       ,infixr: function (local_443) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                    }});
                                                                 }})
                                                ,seperator: rts.bytesFromAscii("")})
                                  ,infixr: local_436.content})]});
};
var pestovalSessionCell = function (local_343) {
   var local_344 = _2b__2b_({a: rts.bytesFromAscii("popup-")
                            ,b: showNum(local_343.session.id)});
   var local_345 = htmlParagraph(local_343.session.place.name);
   return _22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td style=\"border:2pt solid white; background-color:")
                                                ,infixr: function (local_346) {
                                                   var color =
                                                   local_343.session.level.color;
                                                   return _3a__3a_({infixl: function () {
                                                                      var x =
                                                                      function (x347) {
                                                                         return x347;
                                                                      }(_3d__3d_({infixl: color
                                                                                 ,infixr: rts.bytesFromAscii("null")}));
                                                                      switch (x.tag)
                                                                      {
                                                                        case "false":
                                                                          var local_348 =
                                                                          x.data;
                                                                          return color;
                                                                        case "true":
                                                                          var local_349 =
                                                                          x.data;
                                                                          return rts.bytesFromAscii("#eee");
                                                                        default:
                                                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                       ,"DEF_9020eea8542142a09c1a8813ef9990af"
                                                                                                       ,"8af192079f77d68114daa54992f28614");
                                                                      }
                                                                   }()
                                                                   ,infixr: function (local_350) {
                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(";")
                                                                                      ,infixr: function (local_351) {
                                                                                         return _3a__3a_({infixl: local_343.style
                                                                                                         ,infixr: function (local_352) {
                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii("\" ")
                                                                                                                            ,infixr: function (local_353) {
                                                                                                                               return _3a__3a_({infixl: local_343.attributes
                                                                                                                                               ,infixr: function (local_354) {
                                                                                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(">")
                                                                                                                                                                  ,infixr: function (local_355) {
                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                            ,data: {}};
                                                                                                                                                                  }});
                                                                                                                                               }});
                                                                                                                            }});
                                                                                                         }});
                                                                                      }});
                                                                   }});
                                                }})
                               ,seperator: rts.bytesFromAscii("")})
                 ,infixr: [_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"#")
                                                                 ,infixr: function (local_356) {
                                                                    return _3a__3a_({infixl: local_344
                                                                                    ,infixr: function (local_357) {
                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\" style=\"text-decoration: none; color: black;\">")
                                                                                                       ,infixr: function (local_358) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                    }});
                                                                 }})
                                                ,seperator: rts.bytesFromAscii("")})
                                  ,infixr: local_343.content})
                          ,htmlPopup({content: pestovalSessionInfo({password: local_343.password
                                                                   ,language: local_343.language
                                                                   ,session: local_343.session})
                                     ,id: local_344
                                     ,color: local_343.session.level.color})]});
};
var htmlTable = function (local_446) {
   return _22f2_({infixl: _2b__2b_({a: rts.bytesFromAscii("<table width=\"100%\" style=\"table-layout:fixed; border-collapse:collapse\"")
                                   ,b: function () {
                                      var x = local_446.language;
                                      switch (x.tag)
                                      {
                                        case "english":
                                          var local_447 = x.data;
                                          return rts.bytesFromAscii(">");
                                        case "hebrew":
                                          var local_448 = x.data;
                                          return rts.bytesFromAscii(" dir=\"rtl\">");
                                        default:
                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                       ,"DEF_c270fb6c0aee498e865b7bf936941c16"
                                                                       ,"3593d20a3691e4acedfdfbe5a1b33cdf");
                                      }
                                   }()})
                 ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<tbody>")
                                           ,infixr: local_446.body}))});
};
var pestovalManageFloating = function (local_178) {
   return _3b_({infixl: pestovalQuerySessions({database: local_178.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: {tag: "english",data: {}}
                                              ,filter: {tag: "just"
                                                       ,data: rts.bytesFromAscii("pestoval_session.location_id IS NULL")}})
               ,infixr: function (local_339) {
                  return __return(function () {
                         var x = function (x340) {
                                    return x340;
                                 }(_3d__3d_({infixl: length1(local_339),infixr: 0.0}));
                         switch (x.tag)
                         {
                           case "false":
                             var local_341 = x.data;
                             return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Floating Sessions")))})
                                             ,infixr: function (local_342) {
                                                return _3a__3a_({infixl: htmlTable({body: toArray(map({list: fromArray(local_339)
                                                                                                      ,mapping: function (session1) {
                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                       ,infixr: singleton(pestovalSessionCell({password: {tag: "just"
                                                                                                                                                                         ,data: local_178.password}
                                                                                                                                                              ,content: []
                                                                                                                                                              ,style: rts.bytesFromAscii("")
                                                                                                                                                              ,attributes: rts.bytesFromAscii("")
                                                                                                                                                              ,language: {tag: "english"
                                                                                                                                                                         ,data: {}}
                                                                                                                                                              ,session: session1}))});
                                                                                                      }}))
                                                                                   ,language: {tag: "english"
                                                                                              ,data: {}}})
                                                                ,infixr: function (local_449) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }});
                           case "true":
                             var local_450 = x.data;
                             return {tag: "empty",data: {}};
                           default:
                             throw rts.exceptions.LamduBug("Unhandled case"
                                                          ,"DEF_d40cade7acd3445089af06cfb0ca8c08"
                                                          ,"3aeafeb193f3926d38156605e21596e9");
                         }
                      }());
               }});
};
var processSimpleQuery = function (x454) {
   switch (x454.tag)
   {
     case "error":
       var local_455 = x454.data;
       return ignoreError(local_455);
     case "success":
       var local_456 = x454.data;
       return __return(toArray(map({list: fromArray(local_456.__data)
                                   ,mapping: function (local_457) {
                                      return {name: item({index: 1.0,object: local_457})
                                             ,id: parseInt(item({index: 0.0
                                                                ,object: local_457}))};
                                   }})));
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a0f0234c060c4086a39fffe55fe3f9a9"
                                    ,"bc83e03aa2977cc46406e062c7e1acaa");
   }
};
var pestovalQueryTeachers = function (local_453) {
   return _3b_({infixl: query({database: local_453.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_teacher.id, ")
                                                             ,b: queryFieldLang(local_453.language)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_teacher\nORDER BY name")})})
               ,infixr: processSimpleQuery});
};
var pestovalManageTeachers = function (local_452) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_452.database
                                              ,language: {tag: "english",data: {}}})
               ,infixr: function (teachers1) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_458) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(map({list: fromArray(teachers1)
                                                                                                   ,mapping: function (local_459) {
                                                                                                      return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                    ,infixr: singleton(_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<a href=\"/eng/teacher/")
                                                                                                                                                                                                       ,b: showNum(local_459.id)})
                                                                                                                                                                                          ,b: rts.bytesFromAscii("/")})
                                                                                                                                                                             ,b: local_452.password})
                                                                                                                                                                ,b: rts.bytesFromAscii("/\">")})
                                                                                                                                              ,infixr: singleton(leaf(local_459.name))}))});
                                                                                                   }}))})
                                                              ,infixr: function (local_460) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var sequence = function (list7) {
   return foldLazy({list: list7
                   ,initial: function (local_464) {
                      return __return({tag: "empty",data: {}});
                   }
                   ,binop: function (local_465) {
                      return _3b_({infixl: local_465.item
                                  ,infixr: function (local_466) {
                                     return _3b_({infixl: local_465.rest({})
                                                 ,infixr: function (local_467) {
                                                    return __return({tag: "nonEmpty"
                                                                    ,data: {head: local_466
                                                                           ,tail: function (local_468) {
                                                                              return local_467;
                                                                           }}});
                                                 }});
                                  }});
                   }});
};
var pestovalManage = function (local_172) {
   var password1 = function () {
                      var x = function (x173) {
                                 return x173;
                              }(_3d__3d_({infixl: length1(local_172.path),infixr: 0.0}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_174 = x.data;
                          return item({index: 0.0,object: local_172.path});
                        case "true":
                          var local_175 = x.data;
                          return rts.bytesFromAscii("");
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_e7b481c7abf74eb892737b8de024fc75"
                                                       ,"87f1806be8d1cfa4cad909539a3a312d");
                      }
                   }();
   return _3b_({infixl: pestovalAuth({database: local_172.database
                                     ,password: password1
                                     ,teachers: []})
               ,infixr: function (x176) {
                  switch (x176.tag)
                  {
                    case "admin":
                      var local_177 = x176.data;
                      return _3b_({infixl: sequence(_3a__3a_({infixl: pestovalManageFloating({database: local_172.database
                                                                                             ,password: password1})
                                                             ,infixr: function (local_451) {
                                                                return _3a__3a_({infixl: pestovalManageTeachers({database: local_172.database
                                                                                                                ,password: password1})
                                                                                ,infixr: function (local_461) {
                                                                                   return _3a__3a_({infixl: __return(_3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"/eng/new/")
                                                                                                                                                                             ,b: password1})
                                                                                                                                                                ,b: rts.bytesFromAscii("\">")})
                                                                                                                                              ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Add new session")))}))})
                                                                                                                              ,infixr: function (local_462) {
                                                                                                                                 return {tag: "empty"
                                                                                                                                        ,data: {}};
                                                                                                                              }}))
                                                                                                   ,infixr: function (local_463) {
                                                                                                      return {tag: "empty"
                                                                                                             ,data: {}};
                                                                                                   }});
                                                                                }});
                                                             }}))
                                  ,infixr: function (local_469) {
                                     return __return(pestovalPage({title: rts.bytesFromAscii("Manage")
                                                                  ,body: toArray(concat(local_469))}));
                                  }});
                    default:
                      var local_470 = x176;
                      return __return(pestovalUnauthorized);
                  }
               }});
};
var getSession = function (local_474) {
   var filter = {tag: "just"
                ,data: _2b__2b_({a: rts.bytesFromAscii("pestoval_session.id = ")
                                ,b: showNum(local_474.id)})};
   return _3b_({infixl: pestovalQuerySessions({database: local_474.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: {tag: "english",data: {}}
                                              ,filter: filter})
               ,infixr: function (local_475) {
                  return _3b_({infixl: pestovalQuerySessions({database: local_474.database
                                                             ,teacher: {tag: "nothing"
                                                                       ,data: {}}
                                                             ,language: {tag: "hebrew"
                                                                        ,data: {}}
                                                             ,filter: filter})
                              ,infixr: function (local_476) {
                                 return __return(function () {
                                        var x = function (x478) {
                                                   return x478;
                                                }(_26__26_({infixl: _3d__3d_({infixl: length1(local_475)
                                                                             ,infixr: 1.0})
                                                           ,infixr: function (local_477) {
                                                              return _3d__3d_({infixl: length1(local_476)
                                                                              ,infixr: 1.0});
                                                           }}));
                                        switch (x.tag)
                                        {
                                          case "false":
                                            var local_479 = x.data;
                                            return {tag: "nothing",data: {}};
                                          case "true":
                                            var local_480 = x.data;
                                            var english = item({index: 0.0
                                                               ,object: local_475});
                                            var hebrew = item({index: 0.0
                                                              ,object: local_476});
                                            return {tag: "just"
                                                   ,data: {prereqs: {english: english.prereqs
                                                                    ,hebrew: function () {
                                                                       var x =
                                                                       function (x481) {
                                                                          return x481;
                                                                       }(_3d__3d_({infixl: hebrew.prereqs
                                                                                  ,infixr: english.prereqs}));
                                                                       switch (x.tag)
                                                                       {
                                                                         case "false":
                                                                           var local_482 =
                                                                           x.data;
                                                                           return hebrew.prereqs;
                                                                         case "true":
                                                                           var local_483 =
                                                                           x.data;
                                                                           return rts.bytesFromAscii("");
                                                                         default:
                                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                        ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                        ,"66008b68b7f09f3bc6eb8f888fcedd0f");
                                                                       }
                                                                    }()}
                                                          ,name: {english: english.name
                                                                 ,hebrew: function () {
                                                                    var x =
                                                                    function (x484) {
                                                                       return x484;
                                                                    }(_3d__3d_({infixl: hebrew.name
                                                                               ,infixr: english.name}));
                                                                    switch (x.tag)
                                                                    {
                                                                      case "false":
                                                                        var local_485 =
                                                                        x.data;
                                                                        return hebrew.name;
                                                                      case "true":
                                                                        var local_486 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("");
                                                                      default:
                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                     ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                     ,"2182d2a13ee677d6f08e74aba25b59cb");
                                                                    }
                                                                 }()}
                                                          ,place: english.place
                                                          ,description: {english: english.description
                                                                        ,hebrew: function () {
                                                                           var x =
                                                                           function (x487) {
                                                                              return x487;
                                                                           }(_3d__3d_({infixl: hebrew.description
                                                                                      ,infixr: english.description}));
                                                                           switch (x.tag)
                                                                           {
                                                                             case "false":
                                                                               var local_488 =
                                                                               x.data;
                                                                               return hebrew.description;
                                                                             case "true":
                                                                               var local_489 =
                                                                               x.data;
                                                                               return rts.bytesFromAscii("");
                                                                             default:
                                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                            ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                            ,"e3d09b66fde49642215bacd53e5f9ffc");
                                                                           }
                                                                        }()}
                                                          ,teachers: english.teachers
                                                          ,id: english.id
                                                          ,when: english.when
                                                          ,level: english.level}};
                                          default:
                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                         ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                         ,"282e1ffc1e2c4271d86489b39185d0e0");
                                        }
                                     }());
                              }});
               }});
};
var allOf = function (local_509) {
   return foldLazy({list: local_509.list
                   ,initial: function (local_510) {
                      return {tag: "true",data: {}};
                   }
                   ,binop: function (local_511) {
                      return _26__26_({infixl: local_509.satisfy(local_511.item)
                                      ,infixr: local_511.rest});
                   }});
};
var filter1 = function (local_512) {
   var x = function (x513) { return x513;}(local_512.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_514 = x.data;
       var rest = function (local_515) {
          return filter1({list: local_514.tail({}),keep: local_512.keep});
       };
       var x = function (x516) { return x516;}(local_512.keep(local_514.head));
       switch (x.tag)
       {
         case "false":
           var local_517 = x.data;
           return rest({});
         case "true":
           var local_518 = x.data;
           return {tag: "nonEmpty",data: {head: local_514.head,tail: rest}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                        ,"fbe0954bea2f4c248cb91ac61e7821ba");
       }
     case "empty":
       var local_519 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                    ,"2cb5f2574b8b4e3d8e5510fee403db44");
   }
};
var teachersEditForm = function (local_498) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_498.database
                                              ,language: {tag: "english",data: {}}})
               ,infixr: function (local_499) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_500) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(_2b__2b_2({infixl: map({list: fromArray(local_498.teachers)
                                                                                                                      ,mapping: function (local_501) {
                                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                       ,infixr: [leaf(local_501.name)
                                                                                                                                                ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<button type=\"submit\" name=\"remove_teacher\" value=\"")
                                                                                                                                                                                       ,b: showNum(local_501.id)})
                                                                                                                                                                          ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Remove")))})]});
                                                                                                                      }})
                                                                                                         ,infixr: function (local_504) {
                                                                                                            return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                            ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<label for=\"add_teacher\">")
                                                                                                                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Add:")))})
                                                                                                                                                     ,_22f2_({infixl: rts.bytesFromAscii("<select id=\"add_teacher\" name=\"add_teacher\">")
                                                                                                                                                             ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                                                                                                       ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                                                                                                       ,infixr: function (local_506) {
                                                                                                                                                                                          return map({list: filter1({list: fromArray(local_499)
                                                                                                                                                                                                                    ,keep: function (local_507) {
                                                                                                                                                                                                                       return allOf({list: fromArray(local_498.teachers)
                                                                                                                                                                                                                                    ,satisfy: function (local_508) {
                                                                                                                                                                                                                                       return _2260_({infixl: local_507.id
                                                                                                                                                                                                                                                     ,infixr: local_508.id});
                                                                                                                                                                                                                                    }});
                                                                                                                                                                                                                    }})
                                                                                                                                                                                                     ,mapping: function (local_520) {
                                                                                                                                                                                                        return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                                                                                                     ,b: showNum(local_520.id)})
                                                                                                                                                                                                                                        ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                                                                                      ,infixr: singleton(leaf(local_520.name))});
                                                                                                                                                                                                     }});
                                                                                                                                                                                       }}))})]})
                                                                                                                            ,infixr: function (local_522) {
                                                                                                                               return {tag: "empty"
                                                                                                                                      ,data: {}};
                                                                                                                            }});
                                                                                                         }}))})
                                                              ,infixr: function (local_523) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalQueryLevels = function (database1) {
   return _3b_({infixl: query({database: database1
                              ,object: rts.bytesFromAscii("SELECT\n  pestoval_level.id, pestoval_level.name\nFROM pestoval_level\nORDER BY pestoval_level.as_number")})
               ,infixr: processSimpleQuery});
};
var levelEditForm = function (local_525) {
   return _3b_({infixl: pestovalQueryLevels(local_525.database)
               ,infixr: function (local_526) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Level")))})
                                           ,infixr: function (local_527) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"level\" name=\"level\">")
                                                                              ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                        ,infixr: function (local_528) {
                                                                                                           return map({list: fromArray(local_526)
                                                                                                                      ,mapping: function (local_529) {
                                                                                                                         return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                      ,b: showNum(local_529.id)})
                                                                                                                                                         ,b: function () {
                                                                                                                                                            var x =
                                                                                                                                                            function (x530) {
                                                                                                                                                               return x530;
                                                                                                                                                            }(_3d__3d_({infixl: local_529.id
                                                                                                                                                                       ,infixr: local_525.level.id}));
                                                                                                                                                            switch (x.tag)
                                                                                                                                                            {
                                                                                                                                                              case "false":
                                                                                                                                                                var local_531 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\">");
                                                                                                                                                              case "true":
                                                                                                                                                                var local_532 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\" selected>");
                                                                                                                                                              default:
                                                                                                                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                             ,"DEF_a5e4925095a54ec393e6e4d5942a5dec"
                                                                                                                                                                                             ,"9a49b8f7220edcf647eba821ecf8b91a");
                                                                                                                                                            }
                                                                                                                                                         }()})
                                                                                                                                       ,infixr: singleton(leaf(local_529.name))});
                                                                                                                      }});
                                                                                                        }}))})
                                                              ,infixr: function (local_533) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var locationEditForm = function (local_535) {
   return _3b_({infixl: _3b_({infixl: query({database: local_535.database
                                            ,object: rts.bytesFromAscii("SELECT pestoval_location.id, pestoval_location.name FROM pestoval_location")})
                             ,infixr: processSimpleQuery})
               ,infixr: function (local_536) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Where")))})
                                           ,infixr: function (local_537) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"location\" name=\"location\">")
                                                                              ,infixr: toArray(map({list: fromArray(local_536)
                                                                                                   ,mapping: function (local_538) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_538.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         function (x539) {
                                                                                                                                            return x539;
                                                                                                                                         }(_3d__3d_({infixl: local_538.id
                                                                                                                                                    ,infixr: local_535.where.id}));
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_540 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_541 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                          ,"DEF_937ecfd7a5fb4cd6800d072419740277"
                                                                                                                                                                          ,"ae5dc56c181ace2274e213d24cf032c6");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(local_538.name))});
                                                                                                   }}))})
                                                              ,infixr: function (local_542) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalQueryTimeSlots = function (database2) {
   return _3b_({infixl: query({database: database2
                              ,object: rts.bytesFromAscii("SELECT\n  pestoval_timeslot.id, pestoval_timeslot.start, pestoval_timeslot.stop\nFROM pestoval_timeslot\nORDER BY pestoval_timeslot.start")})
               ,infixr: function (x545) {
                  switch (x545.tag)
                  {
                    case "error":
                      var local_546 = x545.data;
                      return ignoreError(local_546);
                    case "success":
                      var local_547 = x545.data;
                      return __return(toArray(map({list: fromArray(local_547.__data)
                                                  ,mapping: function (local_548) {
                                                     return {start: parseDateTime(item({index: 1.0
                                                                                       ,object: local_548}))
                                                            ,stop: parseDateTime(item({index: 2.0
                                                                                      ,object: local_548}))
                                                            ,id: parseInt(item({index: 0.0
                                                                               ,object: local_548}))};
                                                  }})));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_e253b6e9f37d40d099b39de266d912c9"
                                                   ,"37d0edcc32ab5606822a8107f66ced58");
                  }
               }});
};
var timeSlotEditForm = function (local_544) {
   return _3b_({infixl: pestovalQueryTimeSlots(local_544.database)
               ,infixr: function (local_549) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("When")))})
                                           ,infixr: function (local_550) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"when\" name=\"when\">")
                                                                              ,infixr: toArray(map({list: fromArray(local_549)
                                                                                                   ,mapping: function (local_551) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_551.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         function (x552) {
                                                                                                                                            return x552;
                                                                                                                                         }(_3d__3d_({infixl: local_551.id
                                                                                                                                                    ,infixr: local_544.when.id}));
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_553 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_554 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                          ,"DEF_3860ce434c144382b8c11631e28ab02f"
                                                                                                                                                                          ,"11873d6a08b91a78c3a93a526e65434f");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_551
                                                                                                                                                           ,language: {tag: "english"
                                                                                                                                                                      ,data: {}}})))});
                                                                                                   }}))})
                                                              ,infixr: function (local_555) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalSessionSummary = function (session3) {
   return concat(map({list: _3a__3a_({infixl: {name: rts.bytesFromAscii("Teachers")
                                              ,value: join({texts: map({list: fromArray(session3.teachers)
                                                                       ,mapping: function (local_559) {
                                                                          return local_559.name;
                                                                       }})
                                                           ,seperator: rts.bytesFromAscii(" & ")})}
                                     ,infixr: function (local_560) {
                                        return _3a__3a_({infixl: {name: rts.bytesFromAscii("Where")
                                                                 ,value: session3.place.name}
                                                        ,infixr: function (local_561) {
                                                           return _3a__3a_({infixl: {name: rts.bytesFromAscii("When")
                                                                                    ,value: formatTimeSlot({timeSlot: session3.when
                                                                                                           ,language: {tag: "english"
                                                                                                                      ,data: {}}})}
                                                                           ,infixr: function (local_562) {
                                                                              return _3a__3a_({infixl: {name: rts.bytesFromAscii("What")
                                                                                                       ,value: session3.name}
                                                                                              ,infixr: function (local_563) {
                                                                                                 return _3a__3a_({infixl: {name: rts.bytesFromAscii("Level")
                                                                                                                          ,value: session3.level.name}
                                                                                                                 ,infixr: function (local_564) {
                                                                                                                    return {tag: "empty"
                                                                                                                           ,data: {}};
                                                                                                                 }});
                                                                                              }});
                                                                           }});
                                                        }});
                                     }})
                     ,mapping: function (local_565) {
                        return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h4>")
                                                        ,infixr: singleton(leaf(local_565.name))})
                                        ,infixr: function (local_566) {
                                           return _3a__3a_({infixl: leaf(local_565.value)
                                                           ,infixr: function (local_567) {
                                                              return {tag: "empty"
                                                                     ,data: {}};
                                                           }});
                                        }});
                     }}));
};
var pestovalEditField = function (local_572) {
   return _3a__3a_({infixl: {name: local_572.name
                            ,value: local_572.value.english
                            ,key: local_572.key}
                   ,infixr: function (local_573) {
                      return _3a__3a_({infixl: {name: _2b__2b_({a: local_572.name
                                                               ,b: rts.bytesFromAscii(" (Hebrew)")})
                                               ,value: local_572.value.hebrew
                                               ,key: _2b__2b_({a: local_572.key
                                                              ,b: rts.bytesFromAscii("_hebrew")})}
                                      ,infixr: function (local_574) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var pestovalEditFields = function (local_577) {
   return _2b__2b_2({infixl: pestovalEditField({name: rts.bytesFromAscii("Description")
                                               ,value: local_577.description
                                               ,key: rts.bytesFromAscii("description")})
                    ,infixr: function (local_578) {
                       return pestovalEditField({name: rts.bytesFromAscii("Pre-reqs")
                                                ,value: local_577.prereqs
                                                ,key: rts.bytesFromAscii("prereqs")});
                    }});
};
var formTextArea = function (local_579) {
   return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<label for=\"")
                                                                  ,b: local_579.key})
                                                     ,b: rts.bytesFromAscii("\">")})
                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                             ,infixr: singleton(leaf(_2b__2b_({a: local_579.name
                                                                                              ,b: rts.bytesFromAscii(":")})))}))})
                   ,infixr: function (local_580) {
                      return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<textarea rows=10 cols=80 id=\"")
                                                                                                               ,b: local_579.key})
                                                                                                  ,b: rts.bytesFromAscii("\" name=\"")})
                                                                                     ,b: local_579.key})
                                                                        ,b: rts.bytesFromAscii("\">")})
                                                      ,infixr: singleton(leaf(local_579.value))})
                                      ,infixr: function (local_581) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var parseHex = function (text4) {
   var local_619 = function (local_602) {
      var x = function (x603) { return x603;}(_2264_({infixl: local_602,infixr: 57.0}));
      switch (x.tag)
      {
        case "false":
          var local_604 = x.data;
          var x = function (x605) {
                     return x605;
                  }(_2264_({infixl: local_602,infixr: 70.0}));
          switch (x.tag)
          {
            case "false":
              var local_606 = x.data;
              var x = function (x608) {
                         return x608;
                      }(_26__26_({infixl: _2264_({infixl: 97.0,infixr: local_602})
                                 ,infixr: function (local_607) {
                                    return _2264_({infixl: local_602,infixr: 102.0});
                                 }}));
              switch (x.tag)
              {
                case "false":
                  var local_609 = x.data;
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"6361c631c359bf491a698736b910c593");
                case "true":
                  var local_610 = x.data;
                  return _2d_({infixl: local_602,infixr: 87.0});
                default:
                  throw rts.exceptions.LamduBug("Unhandled case"
                                               ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                               ,"5a1355193393bda93a2c8e331b53d26c");
              }
            case "true":
              var local_611 = x.data;
              var x = function (x612) {
                         return x612;
                      }(_2264_({infixl: 65.0,infixr: local_602}));
              switch (x.tag)
              {
                case "false":
                  var local_613 = x.data;
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"d856f42600765d7302f46b291563ca8f");
                case "true":
                  var local_614 = x.data;
                  return _2d_({infixl: local_602,infixr: 55.0});
                default:
                  throw rts.exceptions.LamduBug("Unhandled case"
                                               ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                               ,"55268330b464548c2a0a1fadd767c020");
              }
            default:
              throw rts.exceptions.LamduBug("Unhandled case"
                                           ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                           ,"38523be8c44a3cbcb9944c83067688a3");
          }
        case "true":
          var local_615 = x.data;
          var x = function (x616) {
                     return x616;
                  }(_2264_({infixl: 48.0,infixr: local_602}));
          switch (x.tag)
          {
            case "false":
              var local_617 = x.data;
              throw rts.exceptions.ReachedHole("Reached a hole"
                                              ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                              ,"c930879571c8b455c7030f716fce3db8");
            case "true":
              var local_618 = x.data;
              return _2d_({infixl: local_602,infixr: 48.0});
            default:
              throw rts.exceptions.LamduBug("Unhandled case"
                                           ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                           ,"1b5c2c85846fb25efd189742c382cd3f");
          }
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                       ,"e97ad8b1282bfa2bad0ce76b4c4be651");
      }
   };
   return fold({list: fromBytes(function (x620) {
                  return x620;
               }(text4))
               ,initial: 0.0
               ,binop: function (local_621) {
                  return _2b_({infixl: _2a_({infixl: local_621.acc,infixr: 16.0})
                              ,infixr: local_619(local_621.item)});
               }});
};
var decodeUrl = function (text3) {
   return concat1(function () {
          var x = function (x593) {
                     return x593;
                  }(split({text: replace({text: text3
                                         ,from: rts.bytesFromAscii("+")
                                         ,to: rts.bytesFromAscii(" ")})
                          ,seperator: rts.bytesFromAscii("%")}));
          switch (x.tag)
          {
            case "nonEmpty":
              var local_594 = x.data;
              return _3a__3a_({infixl: local_594.head
                              ,infixr: function (local_595) {
                                 return map({list: local_594.tail({})
                                            ,mapping: function (local_596) {
                                               var x = function (x598) {
                                                          return x598;
                                                       }(_2265_({infixl: length(function (x597) {
                                                                   return x597;
                                                                }(local_596))
                                                                ,infixr: 2.0}));
                                               switch (x.tag)
                                               {
                                                 case "false":
                                                   var local_599 = x.data;
                                                   throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                   ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                   ,"dc688712fae3cce5d326448fdfdec2a5");
                                                 case "true":
                                                   var local_600 = x.data;
                                                   return _2b__2b_({a: toBytes(singleton(parseHex(slice({object: function (x601) {
                                                                                                           return x601;
                                                                                                        }(local_596)
                                                                                                        ,start: 0.0
                                                                                                        ,stop: 2.0}))))
                                                                   ,b: slice({object: function (x622) {
                                                                                return x622;
                                                                             }(local_596)
                                                                             ,start: 2.0
                                                                             ,stop: length(function (x623) {
                                                                                return x623;
                                                                             }(local_596))})});
                                                 default:
                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                ,"3d161b85ea84c55ce4d08379f720f0c6");
                                               }
                                            }});
                              }});
            case "empty":
              var local_624 = x.data;
              return {tag: "empty",data: {}};
            default:
              throw rts.exceptions.LamduBug("Unhandled case"
                                           ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                           ,"a27f7e5bb742b4c492509cfb987f05dd");
          }
       }());
};
var parsePostBody = function (body1) {
   return map({list: split({text: body1,seperator: rts.bytesFromAscii("&")})
              ,mapping: function (field1) {
                 var local_589 = toArray(split({text: field1
                                               ,seperator: rts.bytesFromAscii("=")}));
                 var x = function (x590) {
                            return x590;
                         }(_3d__3d_({infixl: length1(local_589),infixr: 2.0}));
                 switch (x.tag)
                 {
                   case "false":
                     var local_591 = x.data;
                     return ignoreError(function () {
                            throw rts.exceptions.ReachedHole("Reached a hole"
                                                            ,"DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                            ,"c4215356d194f30cdd17797a99d63ff1");
                         }());
                   case "true":
                     var local_592 = x.data;
                     return {value: decodeUrl(item({index: 1.0,object: local_589}))
                            ,key: item({index: 0.0,object: local_589})};
                   default:
                     throw rts.exceptions.LamduBug("Unhandled case"
                                                  ,"DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                  ,"611148533b9174ce687e759e68987e1b");
                 }
              }});
};
var postgresEncodeText = function (text5) {
   return _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("E\'")
                                ,b: concat1(map({list: fromBytes(function (x635) {
                                                   return x635;
                                                }(text5))
                                                ,mapping: function (local_636) {
                                                   var x = function (x637) {
                                                              return x637;
                                                           }(_3d__3d_({infixl: local_636
                                                                      ,infixr: 10.0}));
                                                   switch (x.tag)
                                                   {
                                                     case "false":
                                                       var local_638 = x.data;
                                                       var x = function (x639) {
                                                                  return x639;
                                                               }(_3d__3d_({infixl: local_636
                                                                          ,infixr: 13.0}));
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_640 = x.data;
                                                           var x = function (x641) {
                                                                      return x641;
                                                                   }(_3d__3d_({infixl: local_636
                                                                              ,infixr: 39.0}));
                                                           switch (x.tag)
                                                           {
                                                             case "false":
                                                               var local_642 = x.data;
                                                               var x = function (x643) {
                                                                          return x643;
                                                                       }(_3d__3d_({infixl: local_636
                                                                                  ,infixr: 92.0}));
                                                               switch (x.tag)
                                                               {
                                                                 case "false":
                                                                   var local_644 = x.data;
                                                                   return toBytes(singleton(local_636));
                                                                 case "true":
                                                                   var local_645 = x.data;
                                                                   return rts.bytesFromAscii("\\\\");
                                                                 default:
                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                                ,"db1c255f9dc88b1c4474ccb94732b223");
                                                               }
                                                             case "true":
                                                               var local_646 = x.data;
                                                               return rts.bytesFromAscii("\\\'");
                                                             default:
                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                            ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                            ,"c5163200e2f7d7f5292c38e34f78058d");
                                                           }
                                                         case "true":
                                                           var local_647 = x.data;
                                                           return rts.bytesFromAscii("\\r");
                                                         default:
                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                        ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                        ,"af75122f296de089cbe121bebb73e3af");
                                                       }
                                                     case "true":
                                                       var local_648 = x.data;
                                                       return rts.bytesFromAscii("\\n");
                                                     default:
                                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                                    ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                    ,"6e996a4b5e8af95a3b4a4fcb8897103c");
                                                   }
                                                }}))})
                   ,b: rts.bytesFromAscii("\'")});
};
var head = function (list8) {
   var x = function (x660) { return x660;}(list8);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_661 = x.data;
       return {tag: "just",data: local_661.head};
     case "empty":
       var local_662 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6ed761736e084d6c97cf57a406116d35"
                                    ,"f3442eac4d4349a99cafaa88a24c4a7a");
   }
};
var mapMaybe = function (local_663) {
   var x = function (x664) { return x664;}(local_663.maybe);
   switch (x.tag)
   {
     case "just":
       var local_665 = x.data;
       return {tag: "just",data: local_663.mapping(local_665)};
     case "nothing":
       var local_666 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_2e9eb864b9154a2594c46dbc34021fab"
                                    ,"5ed58bf5b9734ee5b4f4dc26197f7885");
   }
};
var lookup1 = function (local_656) {
   return mapMaybe({mapping: function (local_657) {
                      return local_657.value;
                   }
                   ,maybe: head(filter1({list: local_656.assocs
                                        ,keep: function (local_658) {
                                           var dummy1 = function (local_659) {
                                              return _3d__3d_({infixl: {value: function () {
                                                                          throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                                          ,"DEF_0d310f73ee5345e9a1903f10b0b0a466"
                                                                                                          ,"64902637b1ad4b65b6c193bd6db7b954");
                                                                       }()
                                                                       ,key: function () {
                                                                          throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                                          ,"DEF_0d310f73ee5345e9a1903f10b0b0a466"
                                                                                                          ,"94bfce1915d64b2eada80360aefe376a");
                                                                       }()}
                                                              ,infixr: local_658});
                                           };
                                           return _3d__3d_({infixl: local_658.key
                                                           ,infixr: local_656.key});
                                        }}))});
};
var updateSessionRow = function (local_626) {
   return _3b_({infixl: query({database: local_626.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET ")
                                                                          ,b: join({texts: concat(map({list: fromArray(local_626.body)
                                                                                                      ,mapping: function (local_627) {
                                                                                                         var x =
                                                                                                         function (x630) {
                                                                                                            return x630;
                                                                                                         }(_7c__7c_({infixl: _3d__3d_({infixl: local_627.key
                                                                                                                                      ,infixr: rts.bytesFromAscii("level")})
                                                                                                                    ,infixr: function (local_628) {
                                                                                                                       return _7c__7c_({infixl: _3d__3d_({infixl: local_627.key
                                                                                                                                                         ,infixr: rts.bytesFromAscii("location")})
                                                                                                                                       ,infixr: function (local_629) {
                                                                                                                                          return _3d__3d_({infixl: local_627.key
                                                                                                                                                          ,infixr: rts.bytesFromAscii("when")});
                                                                                                                                       }});
                                                                                                                    }}));
                                                                                                         switch (x.tag)
                                                                                                         {
                                                                                                           case "false":
                                                                                                             var local_631 =
                                                                                                             x.data;
                                                                                                             var x =
                                                                                                             function (x633) {
                                                                                                                return x633;
                                                                                                             }(_7c__7c_({infixl: _3d__3d_({infixl: local_627.key
                                                                                                                                          ,infixr: rts.bytesFromAscii("add_teacher")})
                                                                                                                        ,infixr: function (local_632) {
                                                                                                                           return _3d__3d_({infixl: local_627.key
                                                                                                                                           ,infixr: rts.bytesFromAscii("remove_teacher")});
                                                                                                                        }}));
                                                                                                             switch (x.tag)
                                                                                                             {
                                                                                                               case "false":
                                                                                                                 var local_634 =
                                                                                                                 x.data;
                                                                                                                 return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_627.key
                                                                                                                                                                ,b: rts.bytesFromAscii(" = ")})
                                                                                                                                                   ,b: postgresEncodeText(local_627.value)})
                                                                                                                                 ,infixr: function (local_649) {
                                                                                                                                    return {tag: "empty"
                                                                                                                                           ,data: {}};
                                                                                                                                 }});
                                                                                                               case "true":
                                                                                                                 var local_650 =
                                                                                                                 x.data;
                                                                                                                 return {tag: "empty"
                                                                                                                        ,data: {}};
                                                                                                               default:
                                                                                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                              ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                                                                              ,"267a2077130878c293cf4285fc1e3f96");
                                                                                                             }
                                                                                                           case "true":
                                                                                                             var local_651 =
                                                                                                             x.data;
                                                                                                             return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_627.key
                                                                                                                                                            ,b: rts.bytesFromAscii("_id = ")})
                                                                                                                                               ,b: local_627.value})
                                                                                                                             ,infixr: function (local_652) {
                                                                                                                                return {tag: "empty"
                                                                                                                                       ,data: {}};
                                                                                                                             }});
                                                                                                           default:
                                                                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                          ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                                                                          ,"aa9a84aaaa93dd43099d75a1165bfc4b");
                                                                                                         }
                                                                                                      }}))
                                                                                   ,seperator: rts.bytesFromAscii(", ")})})
                                                             ,b: rts.bytesFromAscii("\nWHERE pestoval_session.id = ")})
                                                ,b: showNum(local_626.session)})})
               ,infixr: function (local_653) {
                  var x = local_653;
                  switch (x.tag)
                  {
                    case "error":
                      var local_654 = x.data;
                      return __return({tag: "error",data: local_654});
                    case "success":
                      var local_655 = x.data;
                      return _3b_({infixl: function () {
                                     var x = function (x667) {
                                                return x667;
                                             }(lookup1({assocs: fromArray(local_626.body)
                                                       ,key: rts.bytesFromAscii("add_teacher")}));
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_668 = x.data;
                                         var x = function (x669) {
                                                    return x669;
                                                 }(_3d__3d_({infixl: local_668
                                                            ,infixr: rts.bytesFromAscii("")}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_670 = x.data;
                                             return _3b_({infixl: query({database: local_626.database
                                                                        ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("INSERT INTO pestoval_session_teachers (session_id, teacher_id)\nVALUES (")
                                                                                                                                 ,b: showNum(local_626.session)})
                                                                                                                    ,b: rts.bytesFromAscii(", ")})
                                                                                                       ,b: local_668})
                                                                                          ,b: rts.bytesFromAscii(")")})})
                                                         ,infixr: function (x671) {
                                                            switch (x671.tag)
                                                            {
                                                              case "error":
                                                                var local_672 = x671.data;
                                                                return ignoreError(local_672);
                                                              case "success":
                                                                var local_673 = x671.data;
                                                                return __return({});
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                             ,"3ad72f38b50bc1b5cc297ad16d68f28c");
                                                            }
                                                         }});
                                           case "true":
                                             var local_674 = x.data;
                                             return __return({});
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                          ,"138352fb50e0b842a35b65e5440d4cbb");
                                         }
                                       case "nothing":
                                         var local_675 = x.data;
                                         return __return({});
                                       default:
                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                      ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                      ,"b7e3310f75aa51661dd00a4d961cbe7d");
                                     }
                                  }()
                                  ,infixr: function (local_676) {
                                     var x = function (x677) {
                                                return x677;
                                             }(lookup1({assocs: fromArray(local_626.body)
                                                       ,key: rts.bytesFromAscii("remove_teacher")}));
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_678 = x.data;
                                         return _3b_({infixl: query({database: local_626.database
                                                                    ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("DELETE FROM pestoval_session_teachers\nWHERE pestoval_session_teachers.session_id = ")
                                                                                                                ,b: showNum(local_626.session)})
                                                                                                   ,b: rts.bytesFromAscii(" AND pestoval_session_teachers.teacher_id = ")})
                                                                                      ,b: local_678})})
                                                     ,infixr: function (x679) {
                                                        switch (x679.tag)
                                                        {
                                                          case "error":
                                                            var local_680 = x679.data;
                                                            return __return({tag: "error"
                                                                            ,data: local_680});
                                                          case "success":
                                                            var local_681 = x679.data;
                                                            return __return({tag: "success"
                                                                            ,data: {}});
                                                          default:
                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                         ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                         ,"c22e107f85c6554bb3a7ef4080f8f72a");
                                                        }
                                                     }});
                                       case "nothing":
                                         var local_682 = x.data;
                                         return __return({tag: "success",data: {}});
                                       default:
                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                      ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                      ,"9197400a83d728f8f268d101f14ab082");
                                     }
                                  }});
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                   ,"d4b370854f718e2abd9dba9dd71706db");
                  }
               }});
};
var tryQuery = function (local_685) {
   return function (x686) {
          switch (x686.tag)
          {
            case "error":
              var local_687 = x686.data;
              return __return({content: {__data: function (x688) {
                                           return x688;
                                        }(_2b__2b_({a: rts.bytesFromAscii("Database error: ")
                                                   ,b: local_687}))
                                        ,mimeType: rts.bytesFromAscii("text/plain")}
                              ,status: {message: rts.bytesFromAscii("Internal Server Error")
                                       ,code: 500.0}});
            case "success":
              return local_685(x686.data);
            default:
              throw rts.exceptions.LamduBug("Unhandled case"
                                           ,"DEF_6ab93b1ac8a248c0a946996efdd08c5f"
                                           ,"601e113ccba88e0bf9ac1fe558419963");
          }
       };
};
var pestovalVerifyUpdate = function (local_690) {
   var x = function (x691) {
              return x691;
           }(lookup1({assocs: fromArray(local_690.body)
                     ,key: rts.bytesFromAscii("when")}));
   switch (x.tag)
   {
     case "just":
       var when1 = x.data;
       var x = function (x692) {
                  return x692;
               }(lookup1({assocs: fromArray(local_690.body)
                         ,key: rts.bytesFromAscii("location")}));
       switch (x.tag)
       {
         case "just":
           var where = x.data;
           return _3b_({infixl: query({database: local_690.database
                                      ,object: concat1(_3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id\nFROM pestoval_session\nWHERE pestoval_session.id <> ")
                                                                ,infixr: function (local_693) {
                                                                   return _3a__3a_({infixl: showNum(local_690.session)
                                                                                   ,infixr: function (local_694) {
                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.location_id = ")
                                                                                                      ,infixr: function (local_695) {
                                                                                                         return _3a__3a_({infixl: where
                                                                                                                         ,infixr: function (local_696) {
                                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.when_id = ")
                                                                                                                                            ,infixr: function (local_697) {
                                                                                                                                               return _3a__3a_({infixl: when1
                                                                                                                                                               ,infixr: function (local_698) {
                                                                                                                                                                  return {tag: "empty"
                                                                                                                                                                         ,data: {}};
                                                                                                                                                               }});
                                                                                                                                            }});
                                                                                                                         }});
                                                                                                      }});
                                                                                   }});
                                                                }}))})
                       ,infixr: function (x699) {
                          switch (x699.tag)
                          {
                            case "error":
                              var local_700 = x699.data;
                              return ignoreError(local_700);
                            case "success":
                              var local_701 = x699.data;
                              return __return(function () {
                                     var x = function (x702) {
                                                return x702;
                                             }(_3d__3d_({infixl: length1(local_701.__data)
                                                        ,infixr: 0.0}));
                                     switch (x.tag)
                                     {
                                       case "false":
                                         var local_703 = x.data;
                                         return {tag: "conflicts"
                                                ,data: toArray(map({list: fromArray(local_701.__data)
                                                                   ,mapping: function (local_704) {
                                                                      return parseInt(item({index: 0.0
                                                                                           ,object: local_704}));
                                                                   }}))};
                                       case "true":
                                         var local_705 = x.data;
                                         return {tag: "good",data: {}};
                                       default:
                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                      ,"DEF_bcca348b043a42949aaf89fb2eccfc72"
                                                                      ,"339aed393d698704b76bee68659a072f");
                                     }
                                  }());
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_bcca348b043a42949aaf89fb2eccfc72"
                                                           ,"e1483df25f0a7b6a9f320e64ab515a71");
                          }
                       }});
         case "nothing":
           var local_706 = x.data;
           return ignoreError({});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_bcca348b043a42949aaf89fb2eccfc72"
                                        ,"7aa622f233fd592d4ac16d681620a799");
       }
     case "nothing":
       var local_707 = x.data;
       return __return({tag: "good",data: {}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_bcca348b043a42949aaf89fb2eccfc72"
                                    ,"814512c476a997315cd8f86c31cf843c");
   }
};
var pestovalUpdate = function (local_586) {
   var x = function (x587) { return x587;}(local_586.request.body);
   switch (x.tag)
   {
     case "just":
       var local_588 = x.data;
       var body2 = toArray(parsePostBody(local_588));
       var local_689 = function (local_625) {
          return _3b_({infixl: updateSessionRow({body: body2
                                                ,database: local_586.database
                                                ,session: local_586.session})
                      ,infixr: tryQuery(function (local_683) {
                         return __return({content: {__data: function (x684) {
                                                      return x684;
                                                   }(rts.bytesFromAscii("Update successful, refresh"))
                                                   ,mimeType: rts.bytesFromAscii("text/plain")}
                                         ,status: {message: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: ")
                                                                     ,b: local_625})
                                                  ,code: 303.0}});
                      })});
       };
       return _3b_({infixl: pestovalVerifyUpdate({body: body2
                                                 ,database: local_586.database
                                                 ,session: local_586.session})
                   ,infixr: function (x708) {
                      switch (x708.tag)
                      {
                        case "conflicts":
                          var conflicts = x708.data;
                          return _3b_({infixl: query({database: local_586.database
                                                     ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET location_id = NULL\nWHERE pestoval_session.id IN (")
                                                                                    ,b: join({texts: map({list: fromArray(conflicts)
                                                                                                         ,mapping: showNum})
                                                                                             ,seperator: rts.bytesFromAscii(", ")})})
                                                                       ,b: rts.bytesFromAscii(")")})})
                                      ,infixr: tryQuery(function (local_709) {
                                         return local_689(_2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("/eng/manage/")
                                                                                ,b: local_586.password})
                                                                   ,b: rts.bytesFromAscii("/")}));
                                      })});
                        case "good":
                          var local_710 = x708.data;
                          return local_689(local_586.request.path);
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                       ,"7605757a63256d30d9c89a9804c8dd00");
                      }
                   }});
     case "nothing":
       var local_711 = x.data;
       return __return({content: {__data: function (x712) {
                                    return x712;
                                 }(rts.bytesFromAscii("POST with no body"))
                                 ,mimeType: rts.bytesFromAscii("text/plain")}
                       ,status: {message: rts.bytesFromAscii("Forbidden"),code: 403.0}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                    ,"7155adc9c6327a297327ec4e1f1a8007");
   }
};
var pestovalEditPage = function (local_472) {
   var local_473 = toArray(split({text: local_472.request.path
                                 ,seperator: rts.bytesFromAscii("/")}));
   var id2 = parseInt(item({index: 3.0,object: local_473}));
   var password2 = item({index: 4.0,object: local_473});
   return _3b_({infixl: getSession({database: local_472.database,id: id2})
               ,infixr: function (local_490) {
                  var x = function (x491) { return x491;}(local_490);
                  switch (x.tag)
                  {
                    case "just":
                      var session2 = x.data;
                      return _3b_({infixl: pestovalAuth({database: local_472.database
                                                        ,password: password2
                                                        ,teachers: session2.teachers})
                                  ,infixr: function (x492) {
                                     switch (x492.tag)
                                     {
                                       case "unauthorized":
                                         var local_493 = x492.data;
                                         return __return(pestovalUnauthorized);
                                       default:
                                         var local_494 = x492;
                                         var x = function (x495) {
                                                    return x495;
                                                 }(_3d__3d_({infixl: local_472.request.method
                                                            ,infixr: rts.bytesFromAscii("POST")}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_496 = x.data;
                                             return _3b_({infixl: function () {
                                                            var x = local_494;
                                                            switch (x.tag)
                                                            {
                                                              case "admin":
                                                                var local_497 = x.data;
                                                                return _3b_({infixl: sequence(_3a__3a_({infixl: teachersEditForm({database: local_472.database
                                                                                                                                 ,teachers: session2.teachers})
                                                                                                       ,infixr: function (local_524) {
                                                                                                          return _3a__3a_({infixl: levelEditForm({database: local_472.database
                                                                                                                                                 ,level: session2.level})
                                                                                                                          ,infixr: function (local_534) {
                                                                                                                             return _3a__3a_({infixl: locationEditForm({where: session2.place
                                                                                                                                                                       ,database: local_472.database})
                                                                                                                                             ,infixr: function (local_543) {
                                                                                                                                                return _3a__3a_({infixl: timeSlotEditForm({database: local_472.database
                                                                                                                                                                                          ,when: session2.when})
                                                                                                                                                                ,infixr: function (local_556) {
                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                          ,data: {}};
                                                                                                                                                                }});
                                                                                                                                             }});
                                                                                                                          }});
                                                                                                       }}))
                                                                            ,infixr: function (local_557) {
                                                                               return __return(concat(local_557));
                                                                            }});
                                                              case "teacher":
                                                                var local_558 = x.data;
                                                                return __return(pestovalSessionSummary({name: session2.name.english
                                                                                                       ,place: session2.place
                                                                                                       ,teachers: session2.teachers
                                                                                                       ,when: session2.when
                                                                                                       ,level: session2.level}));
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                                             ,"51101d04f9fe7ce01c9a8a10e2124c7f");
                                                            }
                                                         }()
                                                         ,infixr: function (local_568) {
                                                            return __return(pestovalPage({title: rts.bytesFromAscii("Edit Session")
                                                                                         ,body: [_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Edit Session")))})
                                                                                                ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"")
                                                                                                                                       ,b: local_472.request.path})
                                                                                                                          ,b: rts.bytesFromAscii("\">")})
                                                                                                        ,infixr: toArray(_2b__2b_2({infixl: local_568
                                                                                                                                   ,infixr: function (local_570) {
                                                                                                                                      return _2b__2b_2({infixl: concat(map({list: _2b__2b_2({infixl: function () {
                                                                                                                                                                                               var x =
                                                                                                                                                                                               local_494;
                                                                                                                                                                                               switch (x.tag)
                                                                                                                                                                                               {
                                                                                                                                                                                                 case "admin":
                                                                                                                                                                                                   var local_571 =
                                                                                                                                                                                                   x.data;
                                                                                                                                                                                                   return pestovalEditField({name: rts.bytesFromAscii("Name")
                                                                                                                                                                                                                            ,value: session2.name
                                                                                                                                                                                                                            ,key: rts.bytesFromAscii("name")});
                                                                                                                                                                                                 case "teacher":
                                                                                                                                                                                                   var local_575 =
                                                                                                                                                                                                   x.data;
                                                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                                                          ,data: {}};
                                                                                                                                                                                                 default:
                                                                                                                                                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                                                                ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                                                                                                                                                                                ,"b24e7f87522990052299e7d83ddb641c");
                                                                                                                                                                                               }
                                                                                                                                                                                            }()
                                                                                                                                                                                            ,infixr: function (local_576) {
                                                                                                                                                                                               return pestovalEditFields(session2);
                                                                                                                                                                                            }})
                                                                                                                                                                           ,mapping: formTextArea}))
                                                                                                                                                       ,infixr: function (local_582) {
                                                                                                                                                          return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                                                                                                                          ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                                                                    ,infixr: singleton(leaf(rts.bytesFromAscii("Update")))}))})
                                                                                                                                                                          ,infixr: function (local_583) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                       }});
                                                                                                                                   }}))})]}));
                                                         }});
                                           case "true":
                                             var local_585 = x.data;
                                             return pestovalUpdate({request: local_472.request
                                                                   ,database: local_472.database
                                                                   ,password: password2
                                                                   ,session: session2.id});
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                          ,"649431586e8fa4f8144892306470de2e");
                                         }
                                     }
                                  }});
                    case "nothing":
                      var local_713 = x.data;
                      return __return(httpNotFound404(local_472.request.path));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                   ,"08ce1c8a7d9560da25879978070222da");
                  }
               }});
};
var overlaysCss = _22f2_({infixl: rts.bytesFromAscii("<style type=\"text/css\">")
                         ,infixr: singleton(leaf(rts.bytesFromAscii("/* Thanks https://eichefam.net/2011/12/21/popup-windows-without-javascript/ */\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0,0,0,0.5);\n  transition: opacity 200ms;\n  visibility: hidden;\n  opacity: 0;\n}\n.overlay:target {\n  visibility: visible;\n  opacity: 1;\n}\n.cancel {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  cursor: default;\n}\n.popup {\n  margin: 50px auto;\n  padding: 20px;\n  background: #fff;\n  border: 1px solid #666;\n  width: 70%;\n  box-shadow: 0 0 50px rgba(0,0,0,0.5);\n  position: relative;\n}")))});
var pestovalTeacherPage = function (local_715) {
   var teacher2 = parseInt(item({index: 0.0,object: local_715.path}));
   return _3b_({infixl: query({database: local_715.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT ")
                                                                          ,b: queryFieldLang(local_715.language)({table: rts.bytesFromAscii("pestoval_teacher")
                                                                                                                 ,field: rts.bytesFromAscii("name")
                                                                                                                 ,as: {tag: "nothing"
                                                                                                                      ,data: {}}})})
                                                             ,b: rts.bytesFromAscii(", pestoval_teacher.password\nFROM pestoval_teacher\nWHERE pestoval_teacher.id =")})
                                                ,b: showNum(teacher2)})})
               ,infixr: function (x716) {
                  switch (x716.tag)
                  {
                    case "error":
                      var local_717 = x716.data;
                      return ignoreError(local_717);
                    case "success":
                      var local_718 = x716.data;
                      var password3 = function () {
                                         var x = function (x720) {
                                                    return x720;
                                                 }(_26__26_({infixl: _3e_({infixl: length1(local_715.path)
                                                                          ,infixr: 1.0})
                                                            ,infixr: function (local_719) {
                                                               return _2260_({infixl: item({index: 1.0
                                                                                           ,object: local_715.path})
                                                                             ,infixr: rts.bytesFromAscii("")});
                                                            }}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_721 = x.data;
                                             return {tag: "nothing",data: {}};
                                           case "true":
                                             var local_722 = x.data;
                                             return {tag: "just"
                                                    ,data: item({index: 1.0
                                                                ,object: local_715.path})};
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_50938aa1a135407c826989b9e1339047"
                                                                          ,"91cc4c8b5af33ae92f94375e3a666b89");
                                         }
                                      }();
                      var title = item({index: 0.0
                                       ,object: item({index: 0.0
                                                     ,object: local_718.__data})});
                      return _3b_({infixl: pestovalQuerySessions({database: local_715.database
                                                                 ,teacher: {tag: "just"
                                                                           ,data: teacher2}
                                                                 ,language: local_715.language
                                                                 ,filter: {tag: "nothing"
                                                                          ,data: {}}})
                                  ,infixr: function (local_723) {
                                     return __return(pestovalPage({title: title
                                                                  ,body: [overlaysCss
                                                                         ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                            ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                                      ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                                                ,infixr: singleton(leaf(title))}))}))})
                                                                                                            ,infixr: function (local_725) {
                                                                                                               return map({list: fromArray(local_723)
                                                                                                                          ,mapping: function (session4) {
                                                                                                                             var local_741 =
                                                                                                                             join({texts: _3a__3a_({infixl: session4.name
                                                                                                                                                   ,infixr: function (local_726) {
                                                                                                                                                      var x =
                                                                                                                                                      function (x728) {
                                                                                                                                                         return x728;
                                                                                                                                                      }(filter1({list: fromArray(session4.teachers)
                                                                                                                                                                ,keep: function (local_727) {
                                                                                                                                                                   return _2260_({infixl: local_727.id
                                                                                                                                                                                 ,infixr: teacher2});
                                                                                                                                                                }}));
                                                                                                                                                      switch (x.tag)
                                                                                                                                                      {
                                                                                                                                                        case "nonEmpty":
                                                                                                                                                          var local_729 =
                                                                                                                                                          x.data;
                                                                                                                                                          return _3a__3a_({infixl: concat1(_3a__3a_({infixl: function () {
                                                                                                                                                                                                       var x =
                                                                                                                                                                                                       local_715.language;
                                                                                                                                                                                                       switch (x.tag)
                                                                                                                                                                                                       {
                                                                                                                                                                                                         case "english":
                                                                                                                                                                                                           var local_730 =
                                                                                                                                                                                                           x.data;
                                                                                                                                                                                                           return rts.bytesFromAscii("(With ");
                                                                                                                                                                                                         case "hebrew":
                                                                                                                                                                                                           var local_731 =
                                                                                                                                                                                                           x.data;
                                                                                                                                                                                                           return rts.bytes([40
                                                                                                                                                                                                                            ,215
                                                                                                                                                                                                                            ,162
                                                                                                                                                                                                                            ,215
                                                                                                                                                                                                                            ,157
                                                                                                                                                                                                                            ,32]);
                                                                                                                                                                                                         default:
                                                                                                                                                                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                                                                        ,"DEF_50938aa1a135407c826989b9e1339047"
                                                                                                                                                                                                                                        ,"a16f24536631cbaf81384fa985a3da71");
                                                                                                                                                                                                       }
                                                                                                                                                                                                    }()
                                                                                                                                                                                                    ,infixr: function (local_732) {
                                                                                                                                                                                                       return _3a__3a_({infixl: local_729.head.name
                                                                                                                                                                                                                       ,infixr: function (local_733) {
                                                                                                                                                                                                                          return _3a__3a_({infixl: join({texts: map({list: local_729.tail({})
                                                                                                                                                                                                                                                                    ,mapping: function (local_734) {
                                                                                                                                                                                                                                                                       return _2b__2b_({a: function () {
                                                                                                                                                                                                                                                                                          var x =
                                                                                                                                                                                                                                                                                          local_715.language;
                                                                                                                                                                                                                                                                                          switch (x.tag)
                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                            case "english":
                                                                                                                                                                                                                                                                                              var local_735 =
                                                                                                                                                                                                                                                                                              x.data;
                                                                                                                                                                                                                                                                                              return rts.bytesFromAscii(" & ");
                                                                                                                                                                                                                                                                                            case "hebrew":
                                                                                                                                                                                                                                                                                              var local_736 =
                                                                                                                                                                                                                                                                                              x.data;
                                                                                                                                                                                                                                                                                              return rts.bytes([32
                                                                                                                                                                                                                                                                                                               ,215
                                                                                                                                                                                                                                                                                                               ,149]);
                                                                                                                                                                                                                                                                                            default:
                                                                                                                                                                                                                                                                                              throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                                                                                                                                                           ,"DEF_50938aa1a135407c826989b9e1339047"
                                                                                                                                                                                                                                                                                                                           ,"b71998601b16ac26e10ab6485ff6b405");
                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                       }()
                                                                                                                                                                                                                                                                                       ,b: local_734.name});
                                                                                                                                                                                                                                                                    }})
                                                                                                                                                                                                                                                        ,seperator: rts.bytesFromAscii("")})
                                                                                                                                                                                                                                          ,infixr: function (local_737) {
                                                                                                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(")")
                                                                                                                                                                                                                                                             ,infixr: function (local_738) {
                                                                                                                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                                                                                                                       ,data: {}};
                                                                                                                                                                                                                                                             }});
                                                                                                                                                                                                                                          }});
                                                                                                                                                                                                                       }});
                                                                                                                                                                                                    }}))
                                                                                                                                                                          ,infixr: function (local_739) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                        case "empty":
                                                                                                                                                          var local_740 =
                                                                                                                                                          x.data;
                                                                                                                                                          return {tag: "empty"
                                                                                                                                                                 ,data: {}};
                                                                                                                                                        default:
                                                                                                                                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                       ,"DEF_50938aa1a135407c826989b9e1339047"
                                                                                                                                                                                       ,"0407d054d66f60bcf424f79da4b936ac");
                                                                                                                                                      }
                                                                                                                                                   }})
                                                                                                                                  ,seperator: rts.bytesFromAscii(" ")});
                                                                                                                             return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                           ,infixr: singleton(pestovalSessionCell({password: password3
                                                                                                                                                                                  ,content: [_22f2_({infixl: rts.bytesFromAscii("<p style=\"font-weight=bold\">")
                                                                                                                                                                                                    ,infixr: singleton(leaf(join({texts: _3a__3a_({infixl: formatTimeSlot({timeSlot: session4.when
                                                                                                                                                                                                                                                                          ,language: local_715.language})
                                                                                                                                                                                                                                                  ,infixr: function (local_742) {
                                                                                                                                                                                                                                                     return _3a__3a_({infixl: session4.place.name
                                                                                                                                                                                                                                                                     ,infixr: function (local_743) {
                                                                                                                                                                                                                                                                        return {tag: "empty"
                                                                                                                                                                                                                                                                               ,data: {}};
                                                                                                                                                                                                                                                                     }});
                                                                                                                                                                                                                                                  }})
                                                                                                                                                                                                                                 ,seperator: rts.bytesFromAscii(" / ")})))})
                                                                                                                                                                                            ,htmlParagraph(local_741)]
                                                                                                                                                                                  ,style: rts.bytesFromAscii("")
                                                                                                                                                                                  ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                  ,language: local_715.language
                                                                                                                                                                                  ,session: session4}))});
                                                                                                                          }});
                                                                                                            }}))
                                                                                    ,language: local_715.language})]}));
                                  }});
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_50938aa1a135407c826989b9e1339047"
                                                   ,"fc81fe2932d91417e79f74d97a2f2ad5");
                  }
               }});
};
var maximum2 = function (local_772) {
   var x = function (x773) {
              return x773;
           }(_2265_({infixl: local_772.__x,infixr: local_772.y}));
   switch (x.tag)
   {
     case "false":
       var local_774 = x.data;
       return local_772.y;
     case "true":
       var local_775 = x.data;
       return local_772.__x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_19e923b820b04266a9811a6b34fe7b37"
                                    ,"a5d0a997c71340b2b9d148187aeb6d00");
   }
};
var nonEmptyFold = function (local_776) {
   var x = function (x777) { return x777;}(local_776.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_778 = x.data;
       return {tag: "just"
              ,data: fold({list: local_778.tail({})
                          ,initial: local_778.head
                          ,binop: local_776.binop})};
     case "empty":
       var local_779 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_05d859467ac547cc890fea33e3ff4642"
                                    ,"eb3e9576545c4cc390019d2c5a8d9ce4");
   }
};
var maximum1 = function (list9) {
   return nonEmptyFold({list: list9
                       ,binop: function (local_771) {
                          return maximum2({y: local_771.item,__x: local_771.acc});
                       }});
};
var gcd = function (local_783) {
   var x = function (x784) { return x784;}(_3d__3d_({infixl: local_783.__x,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_785 = x.data;
       return gcd({y: local_783.__x
                  ,__x: _25_({infixl: local_783.y,infixr: local_783.__x})});
     case "true":
       var local_786 = x.data;
       return local_783.y;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_493da5cfecea49b89fd9a10c42df9e12"
                                    ,"426c0882a83d8df5efe64ca0e57098af");
   }
};
var lcm = function (local_782) {
   return _2f_({infixl: _2a_({infixl: local_782.__x,infixr: local_782.y})
               ,infixr: gcd({y: local_782.y,__x: local_782.__x})});
};
var timeSlotRow = function (local_789) {
   return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                 ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td colspan=")
                                                                          ,infixr: function (local_790) {
                                                                             return _3a__3a_({infixl: showNum(local_789.numColumns)
                                                                                             ,infixr: function (local_791) {
                                                                                                return _3a__3a_({infixl: rts.bytesFromAscii(" style=\"font-size:150%; border-top:3pt solid black;\">")
                                                                                                                ,infixr: function (local_792) {
                                                                                                                   return {tag: "empty"
                                                                                                                          ,data: {}};
                                                                                                                }});
                                                                                             }});
                                                                          }})
                                                         ,seperator: rts.bytesFromAscii("")})
                                           ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_789.timeSlot
                                                                                  ,language: local_789.language})))}))});
};
var formatTeachers = function (local_796) {
   return htmlParagraph(_2b__2b_({a: join({texts: map({list: fromArray(local_796.teachers)
                                                      ,mapping: function (local_797) {
                                                         return local_797.name;
                                                      }})
                                          ,seperator: function () {
                                             var x = local_796.language;
                                             switch (x.tag)
                                             {
                                               case "english":
                                                 var local_798 = x.data;
                                                 return rts.bytesFromAscii(" & ");
                                               case "hebrew":
                                                 var local_799 = x.data;
                                                 return rts.bytes([32,215,149]);
                                               default:
                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                              ,"DEF_b343578f80c84dbf8532d81d3be7c414"
                                                                              ,"5501c290d329fa41da6be2be94a5f4d0");
                                             }
                                          }()})
                                 ,b: rts.bytesFromAscii(":")}));
};
var detailedSessionInfo = function (local_795) {
   return [formatTeachers({teachers: local_795.session.teachers
                          ,language: local_795.language})
          ,htmlParagraph(local_795.session.name)
          ,htmlParagraph(local_795.session.place.name)];
};
var pestovalLevelsPage = function (local_748) {
   var minimum = parseInt(item({index: 0.0,object: local_748.path}));
   var maximum = function () {
                    var x = function (x749) {
                               return x749;
                            }(_3e_({infixl: length1(local_748.path),infixr: 1.0}));
                    switch (x.tag)
                    {
                      case "false":
                        var local_750 = x.data;
                        return minimum;
                      case "true":
                        var local_751 = x.data;
                        return parseInt(item({index: 1.0,object: local_748.path}));
                      default:
                        throw rts.exceptions.LamduBug("Unhandled case"
                                                     ,"DEF_a358e35c87a74404b2c606eb39bddad1"
                                                     ,"4c173067c4670de5fcb231cf53d90418");
                    }
                 }();
   var title1 = join({texts: function () {
                        var x = function (x752) {
                                   return x752;
                                }(_3d__3d_({infixl: minimum,infixr: maximum}));
                        switch (x.tag)
                        {
                          case "false":
                            var local_753 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_748.language;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_754 = x.data;
                                                   return rts.bytesFromAscii("Levels");
                                                 case "hebrew":
                                                   var local_755 = x.data;
                                                   return rts.bytes([215
                                                                    ,168
                                                                    ,215
                                                                    ,158
                                                                    ,215
                                                                    ,149
                                                                    ,215
                                                                    ,170]);
                                                 default:
                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                ,"DEF_a358e35c87a74404b2c606eb39bddad1"
                                                                                ,"08963304800bfcf7f4d88ceecad9ee10");
                                               }
                                            }()
                                            ,infixr: function (local_756) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_757) {
                                                                  return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                                  ,infixr: function (local_758) {
                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                     ,infixr: function (local_759) {
                                                                                                        return {tag: "empty"
                                                                                                               ,data: {}};
                                                                                                     }});
                                                                                  }});
                                                               }});
                                            }});
                          case "true":
                            var local_760 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_748.language;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_761 = x.data;
                                                   return rts.bytesFromAscii("Level");
                                                 case "hebrew":
                                                   var local_762 = x.data;
                                                   return rts.bytes([215
                                                                    ,168
                                                                    ,215
                                                                    ,158
                                                                    ,215
                                                                    ,148]);
                                                 default:
                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                ,"DEF_a358e35c87a74404b2c606eb39bddad1"
                                                                                ,"1d45559be5d78c9d31f75b33fb547a08");
                                               }
                                            }()
                                            ,infixr: function (local_763) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_764) {
                                                                  return {tag: "empty"
                                                                         ,data: {}};
                                                               }});
                                            }});
                          default:
                            throw rts.exceptions.LamduBug("Unhandled case"
                                                         ,"DEF_a358e35c87a74404b2c606eb39bddad1"
                                                         ,"058f4ae99fed9bb25e90ccf28bf6fa21");
                        }
                     }()
                     ,seperator: rts.bytesFromAscii(" ")});
   return _3b_({infixl: pestovalQuerySessions({database: local_748.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: local_748.language
                                              ,filter: {tag: "just"
                                                       ,data: concat1(_3a__3a_({infixl: showNum(minimum)
                                                                               ,infixr: function (local_765) {
                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(" <= pestoval_level.as_number AND pestoval_level.as_number <= ")
                                                                                                  ,infixr: function (local_766) {
                                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                                     ,infixr: function (local_767) {
                                                                                                                        return {tag: "empty"
                                                                                                                               ,data: {}};
                                                                                                                     }});
                                                                                                  }});
                                                                               }}))}})
               ,infixr: function (local_768) {
                  var local_770 = toArray(group({list: fromArray(local_768)
                                                ,by: function (local_769) {
                                                   return _3d__3d_({infixl: local_769.infixl.when.id
                                                                   ,infixr: local_769.infixr.when.id});
                                                }}));
                  var local_780 = maybe({object: maximum1(map({list: fromArray(local_770)
                                                              ,mapping: length1}))
                                        ,or: 0.0});
                  var numColumns = fold({list: _2e__2e_({start: 1.0
                                                        ,stop: _2b_({infixl: local_780
                                                                    ,infixr: 1.0})})
                                        ,initial: 1.0
                                        ,binop: function (local_781) {
                                           return lcm({y: local_781.item
                                                      ,__x: local_781.acc});
                                        }});
                  return __return(pestovalPage({title: title1
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                         ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                             ,infixr: singleton(leaf(title1))}))}))})
                                                                                         ,infixr: function (local_788) {
                                                                                            return concat(map({list: fromArray(local_770)
                                                                                                              ,mapping: function (group1) {
                                                                                                                 return _3a__3a_({infixl: timeSlotRow({numColumns: numColumns
                                                                                                                                                      ,timeSlot: item({index: 0.0
                                                                                                                                                                      ,object: group1}).when
                                                                                                                                                      ,language: local_748.language})
                                                                                                                                 ,infixr: function (local_793) {
                                                                                                                                    var attributes =
                                                                                                                                    function (local_794) {
                                                                                                                                       return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("colspan=")
                                                                                                                                                                                              ,b: showNum(_2f_({infixl: numColumns
                                                                                                                                                                                                               ,infixr: local_794}))})
                                                                                                                                                                                 ,b: rts.bytesFromAscii(" width=\"")})
                                                                                                                                                                    ,b: showNum(_2f__2f_({infixl: 100.0
                                                                                                                                                                                         ,infixr: local_794}))})
                                                                                                                                                       ,b: rts.bytesFromAscii("%\"")});
                                                                                                                                    }(length1(group1));
                                                                                                                                    return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                                    ,infixr: toArray(map({list: fromArray(group1)
                                                                                                                                                                                         ,mapping: function (session5) {
                                                                                                                                                                                            return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                                                                  ,data: {}}
                                                                                                                                                                                                                       ,content: singleton(_22f2_({infixl: rts.bytesFromAscii("<div style=\"font-size:110%\">")
                                                                                                                                                                                                                                                  ,infixr: detailedSessionInfo({language: local_748.language
                                                                                                                                                                                                                                                                               ,session: session5})}))
                                                                                                                                                                                                                       ,style: rts.bytesFromAscii("")
                                                                                                                                                                                                                       ,attributes: attributes
                                                                                                                                                                                                                       ,language: local_748.language
                                                                                                                                                                                                                       ,session: session5});
                                                                                                                                                                                         }}))})
                                                                                                                                                    ,infixr: function (local_803) {
                                                                                                                                                       return {tag: "empty"
                                                                                                                                                              ,data: {}};
                                                                                                                                                    }});
                                                                                                                                 }});
                                                                                                              }}));
                                                                                         }}))
                                                                 ,language: local_748.language})]}));
               }});
};
var dedup = function (local_810) {
   return toArray(map({list: group({list: local_810,by: _3d__3d_})
                      ,mapping: function (local_811) {
                         return item({index: 0.0,object: local_811});
                      }}));
};
var dayNamesFull =
toArray(split({text: rts.bytesFromAscii("Monday Tuesday Wednesday Thursday Friday Saturday Sunday")
              ,seperator: rts.bytesFromAscii(" ")}));
var placesRow = function (local_818) {
   return _22f2_({infixl: rts.bytesFromAscii("<tr style=\"background-color:#ddd; border-top: 3pt solid black\">")
                 ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<th style=\"font-size:150%\">")
                                                           ,infixr: singleton(leaf(local_818.day))})
                                           ,infixr: function (local_819) {
                                              return map({list: fromArray(local_818.places)
                                                         ,mapping: function (local_820) {
                                                            return _22f2_({infixl: rts.bytesFromAscii("<th>")
                                                                          ,infixr: singleton(leaf(local_820.name))});
                                                         }});
                                           }}))});
};
var toArray1 = function (local_827) {
   return runMutArray(_3b_({infixl: newMutArray1(replicate({count: local_827.size
                                                           ,item: {tag: "nothing"
                                                                  ,data: {}}}))
                           ,infixr: function (__array4) {
                              return _3b_({infixl: sequence__(map({list: local_827.list
                                                                  ,mapping: function (local_828) {
                                                                     return writeMutArray({index: local_827.index(local_828)
                                                                                          ,object: __array4
                                                                                          ,value: {tag: "just"
                                                                                                  ,data: local_828}});
                                                                  }}))
                                          ,infixr: function (local_829) {
                                             return __return(__array4);
                                          }});
                           }}));
};
var pestovalSessionsTable = function (local_806) {
   return _3b_({infixl: pestovalQuerySessions({database: local_806.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: local_806.language
                                              ,filter: {tag: "nothing",data: {}}})
               ,infixr: function (local_807) {
                  var places = dedup(fromArray(sort({list: map({list: fromArray(local_807)
                                                               ,mapping: function (local_808) {
                                                                  return local_808.place;
                                                               }})
                                                    ,_3c_: function (local_809) {
                                                       return _3c_({infixl: local_809.infixl.id
                                                                   ,infixr: local_809.infixr.id});
                                                    }})));
                  var numColumns1 = length1(places);
                  return __return(pestovalPage({title: rts.bytesFromAscii("All Sessions")
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(concat(map({list: group({list: fromArray(local_807)
                                                                                                        ,by: function (local_813) {
                                                                                                           return _3d__3d_({infixl: local_813.infixl.when.start.date
                                                                                                                           ,infixr: local_813.infixr.when.start.date});
                                                                                                        }})
                                                                                           ,mapping: function (local_814) {
                                                                                              return _3a__3a_({infixl: placesRow({places: places
                                                                                                                                 ,day: item({index: _2d_({infixl: function (x815) {
                                                                                                                                                            return x815;
                                                                                                                                                         }(item({index: 0.0
                                                                                                                                                                ,object: local_814}).when.start.date).weekDay
                                                                                                                                                         ,infixr: 1.0})
                                                                                                                                            ,object: function () {
                                                                                                                                               var x =
                                                                                                                                               local_806.language;
                                                                                                                                               switch (x.tag)
                                                                                                                                               {
                                                                                                                                                 case "english":
                                                                                                                                                   var local_816 =
                                                                                                                                                   x.data;
                                                                                                                                                   return dayNamesFull;
                                                                                                                                                 case "hebrew":
                                                                                                                                                   var local_817 =
                                                                                                                                                   x.data;
                                                                                                                                                   return dayNamesHebrew;
                                                                                                                                                 default:
                                                                                                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                ,"DEF_753a440ceaa64a519d4334364c39d50b"
                                                                                                                                                                                ,"617b9b9cd85a5c2e2919df2135ab6272");
                                                                                                                                               }
                                                                                                                                            }()})})
                                                                                                              ,infixr: function (local_821) {
                                                                                                                 return concat(map({list: group({list: fromArray(local_814)
                                                                                                                                                ,by: function (local_822) {
                                                                                                                                                   return _3d__3d_({infixl: local_822.infixl.when.id
                                                                                                                                                                   ,infixr: local_822.infixr.when.id});
                                                                                                                                                }})
                                                                                                                                   ,mapping: function (local_823) {
                                                                                                                                      var local_824 =
                                                                                                                                      item({index: 0.0
                                                                                                                                           ,object: local_823});
                                                                                                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                                      ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<th style=\"font-size:120%; background-color:#ddd\">")
                                                                                                                                                                                                                ,infixr: singleton(leaf(_2b__2b_({a: _2b__2b_({a: showTime(local_824.when.start.time)
                                                                                                                                                                                                                                                              ,b: rts.bytesFromAscii(" - ")})
                                                                                                                                                                                                                                                 ,b: showTime(local_824.when.stop.time)})))})
                                                                                                                                                                                                ,infixr: function (local_825) {
                                                                                                                                                                                                   return map({list: fromArray(toArray1({list: fromArray(local_823)
                                                                                                                                                                                                                                        ,index: function (local_826) {
                                                                                                                                                                                                                                           return index5({__array: places
                                                                                                                                                                                                                                                         ,item: local_826.place});
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        ,size: numColumns1}))
                                                                                                                                                                                                              ,mapping: function (local_830) {
                                                                                                                                                                                                                 var x =
                                                                                                                                                                                                                 function (x831) {
                                                                                                                                                                                                                    return x831;
                                                                                                                                                                                                                 }(local_830);
                                                                                                                                                                                                                 switch (x.tag)
                                                                                                                                                                                                                 {
                                                                                                                                                                                                                   case "just":
                                                                                                                                                                                                                     var session6 =
                                                                                                                                                                                                                     x.data;
                                                                                                                                                                                                                     return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                                                                                           ,data: {}}
                                                                                                                                                                                                                                                ,content: [formatTeachers({teachers: session6.teachers
                                                                                                                                                                                                                                                                          ,language: local_806.language})
                                                                                                                                                                                                                                                          ,htmlParagraph(session6.name)]
                                                                                                                                                                                                                                                ,style: rts.bytesFromAscii("")
                                                                                                                                                                                                                                                ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                                                                                ,language: local_806.language
                                                                                                                                                                                                                                                ,session: session6});
                                                                                                                                                                                                                   case "nothing":
                                                                                                                                                                                                                     var local_834 =
                                                                                                                                                                                                                     x.data;
                                                                                                                                                                                                                     return leaf(rts.bytesFromAscii("<td style=\"background-color:#f8f8f8\">"));
                                                                                                                                                                                                                   default:
                                                                                                                                                                                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                                                                                  ,"DEF_753a440ceaa64a519d4334364c39d50b"
                                                                                                                                                                                                                                                  ,"e22df53d1ea1be33327cca9a5f4067a5");
                                                                                                                                                                                                                 }
                                                                                                                                                                                                              }});
                                                                                                                                                                                                }}))})
                                                                                                                                                      ,infixr: function (local_835) {
                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                ,data: {}};
                                                                                                                                                      }});
                                                                                                                                   }}));
                                                                                                              }});
                                                                                           }})))
                                                                 ,language: local_806.language})]}));
               }});
};
var readFile = rts.builtins.IO.file["readFile"];
var pestovalIndex = _3b_({infixl: readFile(function (x838) {
                            return x838;
                         }(rts.bytesFromAscii("index.html")))
                         ,infixr: function (local_839) {
                            return __return({content: {__data: local_839
                                                      ,mimeType: rts.bytesFromAscii("text/html")}
                                            ,status: httpOk200});
                         }});
var pestovalHandler = function (local_87) {
   var local_88 = toArray(split({text: local_87.request.path
                                ,seperator: rts.bytesFromAscii("/")}));
   var language = item({index: 1.0,object: local_88});
   var x = function (x90) {
              return x90;
           }(_26__26_({infixl: _3d__3d_({infixl: length1(local_88),infixr: 2.0})
                      ,infixr: function (local_89) {
                         return _3d__3d_({infixl: language
                                         ,infixr: rts.bytesFromAscii("")});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_91 = x.data;
       var language1 = function () {
                          var x = function (x92) {
                                     return x92;
                                  }(_3d__3d_({infixl: language
                                             ,infixr: rts.bytesFromAscii("heb")}));
                          switch (x.tag)
                          {
                            case "false":
                              var local_93 = x.data;
                              return {tag: "english",data: {}};
                            case "true":
                              var local_94 = x.data;
                              return {tag: "hebrew",data: {}};
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                           ,"a7d7d7d9e5191fb58b9d7aeb67e660b8");
                          }
                       }();
       var local_95 = item({index: 2.0,object: local_88});
       var path = toArray(drop({list: fromArray(local_88),count: 3.0}));
       var x = function (x105) {
                  return x105;
               }(_26__26_({infixl: _3d__3d_({infixl: length1(local_88),infixr: 3.0})
                          ,infixr: function (local_104) {
                             return _3d__3d_({infixl: local_95
                                             ,infixr: rts.bytesFromAscii("")});
                          }}));
       switch (x.tag)
       {
         case "false":
           var local_106 = x.data;
           var x = function (x107) {
                      return x107;
                   }(_3d__3d_({infixl: local_95,infixr: rts.bytesFromAscii("levels")}));
           switch (x.tag)
           {
             case "false":
               var local_108 = x.data;
               var x = function (x109) {
                          return x109;
                       }(_3d__3d_({infixl: local_95
                                  ,infixr: rts.bytesFromAscii("teacher")}));
               switch (x.tag)
               {
                 case "false":
                   var local_110 = x.data;
                   var x = function (x111) {
                              return x111;
                           }(_3d__3d_({infixl: local_95
                                      ,infixr: rts.bytesFromAscii("edit")}));
                   switch (x.tag)
                   {
                     case "false":
                       var local_112 = x.data;
                       var x = function (x113) {
                                  return x113;
                               }(_3d__3d_({infixl: local_95
                                          ,infixr: rts.bytesFromAscii("manage")}));
                       switch (x.tag)
                       {
                         case "false":
                           var local_114 = x.data;
                           var x = function (x115) {
                                      return x115;
                                   }(_3d__3d_({infixl: local_95
                                              ,infixr: rts.bytesFromAscii("new")}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_116 = x.data;
                               return __return(httpNotFound404(local_87.request.path));
                             case "true":
                               var local_126 = x.data;
                               return pestovalNewSession({request: local_87.request
                                                         ,database: local_87.database});
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                            ,"bee63a6489f85dd8329b0439961b5e44");
                           }
                         case "true":
                           var local_171 = x.data;
                           return pestovalManage({path: path
                                                 ,database: local_87.database});
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                        ,"3042fc773313a781882df94a14ec3bb3");
                       }
                     case "true":
                       var local_471 = x.data;
                       return pestovalEditPage({request: local_87.request
                                               ,database: local_87.database});
                     default:
                       throw rts.exceptions.LamduBug("Unhandled case"
                                                    ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                    ,"3904128e0f229aab0f559b8c4efd7e8c");
                   }
                 case "true":
                   var local_714 = x.data;
                   return pestovalTeacherPage({path: path
                                              ,database: local_87.database
                                              ,language: language1});
                 default:
                   throw rts.exceptions.LamduBug("Unhandled case"
                                                ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                ,"1efb5179a530efb5cf0ea0f292813e32");
               }
             case "true":
               var local_747 = x.data;
               return pestovalLevelsPage({path: path
                                         ,database: local_87.database
                                         ,language: language1});
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                            ,"3725e3e3e238c36942a62af16a116f25");
           }
         case "true":
           var local_805 = x.data;
           return pestovalSessionsTable({database: local_87.database
                                        ,language: language1});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                        ,"0e90da8443f9aff3c55edb7f8fef28fc");
       }
     case "true":
       var local_837 = x.data;
       return pestovalIndex;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                    ,"56d9fbebaa75d3344238b42c2f66dbca");
   }
};
var send = rts.builtins.IO.network["socketSend"];
var truncateMutArray = rts.builtins.Mut.Array["truncate"];
var popLastMutArray = function (__array5) {
   return _3b_({infixl: length4(__array5)
               ,infixr: function (length5) {
                  var x = function (x855) {
                             return x855;
                          }(_3e_({infixl: length5,infixr: 0.0}));
                  switch (x.tag)
                  {
                    case "false":
                      var local_856 = x.data;
                      return __return({tag: "nothing",data: {}});
                    case "true":
                      var local_857 = x.data;
                      return _3b_({infixl: readMutArray({index: _2d_({infixl: length5
                                                                     ,infixr: 1.0})
                                                        ,object: __array5})
                                  ,infixr: function (result) {
                                     return _3b_({infixl: truncateMutArray({object: __array5
                                                                           ,stop: _2d_({infixl: length5
                                                                                       ,infixr: 1.0})})
                                                 ,infixr: function (local_858) {
                                                    return __return({tag: "just"
                                                                    ,data: result});
                                                 }});
                                  }});
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_e01662e48ef6e33c8390bb9b9237323b"
                                                   ,"31884079e791adac0b8961574383114f");
                  }
               }});
};
var find1 = function (local_883) {
   return first({that: function (local_884) {
                   return _3d__3d_({infixl: byteAt({index: local_884
                                                   ,object: local_883.__bytes})
                                   ,infixr: local_883.byte});
                }
                ,list: _2e__2e_({start: local_883.start
                                ,stop: length(local_883.__bytes)})});
};
var isSuffixOf = function (local_898) {
   var local_899 = length(local_898.whole);
   var local_900 = length(local_898.suffix);
   return _26__26_({infixl: _2265_({infixl: local_899,infixr: local_900})
                   ,infixr: function (local_901) {
                      return _3d__3d_({infixl: slice({object: local_898.whole
                                                     ,start: _2d_({infixl: local_899
                                                                  ,infixr: local_900})
                                                     ,stop: local_899})
                                      ,infixr: local_898.suffix});
                   }});
};
var unsuffixed = function (local_897) {
   var x = function (x902) {
              return x902;
           }(isSuffixOf({suffix: local_897.suffix,whole: local_897.whole}));
   switch (x.tag)
   {
     case "false":
       var local_903 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_904 = x.data;
       return {tag: "just"
              ,data: slice({object: local_897.whole
                           ,start: 0.0
                           ,stop: _2d_({infixl: length(local_897.whole)
                                       ,infixr: length(local_897.suffix)})})};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6c2d206c45c348b3b8e2bbfdae7bde35"
                                    ,"7d90a0e076a149c4443b780b21470ef3");
   }
};
var removeSuffix = function (local_896) {
   var x = function (x905) {
              return x905;
           }(unsuffixed({suffix: local_896.suffix,whole: local_896.whole}));
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_906 = x.data;
       return local_896.whole;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8c9d00ae73ab41ca903aa34ee4c6601a"
                                    ,"97a63e2f16bd481c6e64fd0c8a6d92fa");
   }
};
var packetsEndWith = function (local_911) {
   var x = function (x912) {
              return x912;
           }(_3d__3d_({infixl: local_911.stop,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_913 = x.data;
       return _3b_({infixl: readMutArray({index: _2d_({infixl: local_911.stop
                                                      ,infixr: 1.0})
                                         ,object: local_911.packets})
                   ,infixr: function (local_914) {
                      var x = function (x915) {
                                 return x915;
                              }(isSuffixOf({suffix: local_911.suffix,whole: local_914}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_916 = x.data;
                          var x = function (x917) {
                                     return x917;
                                  }(unsuffixed({suffix: local_914
                                               ,whole: local_911.suffix}));
                          switch (x.tag)
                          {
                            case "just":
                              var remain = x.data;
                              return packetsEndWith({suffix: remain
                                                    ,stop: _2d_({infixl: local_911.stop
                                                                ,infixr: 1.0})
                                                    ,packets: local_911.packets});
                            case "nothing":
                              var local_918 = x.data;
                              return __return({tag: "false",data: {}});
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                           ,"0d0804c08ad23d9eed424fc83122d6dc");
                          }
                        case "true":
                          var local_919 = x.data;
                          return __return({tag: "true",data: {}});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                       ,"49052b2836be0b25cb20bc95d00972ca");
                      }
                   }});
     case "true":
       var local_920 = x.data;
       return __return({tag: "false",data: {}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a2f069d7413941fdafe42795f6970175"
                                    ,"ae670587961cb7d305eef1133a3bbc18");
   }
};
var parseHttpHeaderPacket = function (local_882) {
   var x = function (x885) {
              return x885;
           }(find1({start: local_882.start,__bytes: local_882.newPacket,byte: 10.0}));
   switch (x.tag)
   {
     case "just":
       var local_886 = x.data;
       var local_887 = _2b_({infixl: local_886,infixr: 1.0});
       return _3b_({infixl: length4(local_882.packets)
                   ,infixr: function (local_888) {
                      var done = function (local_889) {
                         return _3b_({infixl: sequence(map({list: _2e__2e_({start: 0.0
                                                                           ,stop: local_888})
                                                           ,mapping: function (local_890) {
                                                              return readMutArray({index: local_890
                                                                                  ,object: local_882.packets});
                                                           }}))
                                     ,infixr: function (local_891) {
                                        var local_894 =
                                        concat2(_2b__2b_2({infixl: local_891
                                                          ,infixr: function (local_892) {
                                                             return _3a__3a_({infixl: slice({object: local_882.newPacket
                                                                                            ,start: 0.0
                                                                                            ,stop: local_886})
                                                                             ,infixr: function (local_893) {
                                                                                return {tag: "empty"
                                                                                       ,data: {}};
                                                                             }});
                                                          }}));
                                        var local_907 =
                                        toArray(map({list: split1({__bytes: local_894
                                                                  ,seperator: rts.bytes([10])})
                                                    ,mapping: function (local_895) {
                                                       return removeSuffix({suffix: rts.bytes([13])
                                                                           ,whole: local_895});
                                                    }}));
                                        return _3b_({infixl: truncateMutArray({object: local_882.packets
                                                                              ,stop: 0.0})
                                                    ,infixr: function (local_908) {
                                                       return _3b_({infixl: appendMutArray({object: local_882.packets
                                                                                           ,value: slice({object: local_882.newPacket
                                                                                                         ,start: local_887
                                                                                                         ,stop: length(local_882.newPacket)})})
                                                                   ,infixr: function (local_909) {
                                                                      return __return({tag: "just"
                                                                                      ,data: local_907});
                                                                   }});
                                                    }});
                                     }});
                      };
                      var local_921 = function (local_910) {
                         return packetsEndWith({suffix: local_910
                                               ,stop: local_888
                                               ,packets: local_882.packets});
                      };
                      var next = function (local_922) {
                         return parseHttpHeaderPacket({start: local_887
                                                      ,newPacket: local_882.newPacket
                                                      ,packets: local_882.packets});
                      };
                      var x = function (x923) {
                                 return x923;
                              }(_3d__3d_({infixl: local_886,infixr: 0.0}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_924 = x.data;
                          var local_925 = byteAt({index: _2d_({infixl: local_886
                                                              ,infixr: 1.0})
                                                 ,object: local_882.newPacket});
                          var x = function (x926) {
                                     return x926;
                                  }(_3d__3d_({infixl: local_925,infixr: 10.0}));
                          switch (x.tag)
                          {
                            case "false":
                              var local_927 = x.data;
                              var x = function (x928) {
                                         return x928;
                                      }(_3d__3d_({infixl: local_925,infixr: 13.0}));
                              switch (x.tag)
                              {
                                case "false":
                                  return next(x.data);
                                case "true":
                                  var local_929 = x.data;
                                  var x = function (x930) {
                                             return x930;
                                          }(_3d__3d_({infixl: local_886,infixr: 1.0}));
                                  switch (x.tag)
                                  {
                                    case "false":
                                      var local_931 = x.data;
                                      var x = function (x932) {
                                                 return x932;
                                              }(_3d__3d_({infixl: byteAt({index: _2d_({infixl: local_886
                                                                                      ,infixr: 2.0})
                                                                         ,object: local_882.newPacket})
                                                         ,infixr: 10.0}));
                                      switch (x.tag)
                                      {
                                        case "false":
                                          return next(x.data);
                                        case "true":
                                          return done(x.data);
                                        default:
                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                       ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                       ,"2a6eda3fea34bfc4f50863f20c1e9ac2");
                                      }
                                    case "true":
                                      var local_933 = x.data;
                                      return _3b_({infixl: local_921(rts.bytes([10]))
                                                  ,infixr: function (local_934) {
                                                     var x = function (x935) {
                                                                return x935;
                                                             }(local_934);
                                                     switch (x.tag)
                                                     {
                                                       case "false":
                                                         return next(x.data);
                                                       case "true":
                                                         return done(x.data);
                                                       default:
                                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                                      ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                                      ,"5f1c238b6da7ee82f5363516372a617b");
                                                     }
                                                  }});
                                    default:
                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                   ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                   ,"71aa132836b10c2273aec46a91adc29a");
                                  }
                                default:
                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                               ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                               ,"8a544343e9f5f27b97c6979a45025f5e");
                              }
                            case "true":
                              return done(x.data);
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                           ,"2acaafd2775505f6a280aa18fe3c0e44");
                          }
                        case "true":
                          var local_936 = x.data;
                          return _3b_({infixl: local_921(rts.bytes([10]))
                                      ,infixr: function (local_937) {
                                         var x = function (x938) {
                                                    return x938;
                                                 }(local_937);
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_939 = x.data;
                                             return _3b_({infixl: local_921(rts.bytes([10
                                                                                      ,13]))
                                                         ,infixr: function (local_940) {
                                                            var x = function (x941) {
                                                                       return x941;
                                                                    }(local_940);
                                                            switch (x.tag)
                                                            {
                                                              case "false":
                                                                return next(x.data);
                                                              case "true":
                                                                return done(x.data);
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                                             ,"c323f65fadb272703b7b6aa5fd90432a");
                                                            }
                                                         }});
                                           case "true":
                                             return done(x.data);
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                          ,"bd0b5ef73c2e50ad935a0466d30d1194");
                                         }
                                      }});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                       ,"ffa5bec95e83b04b17273d5e67253950");
                      }
                   }});
     case "nothing":
       var local_942 = x.data;
       return _3b_({infixl: appendMutArray({object: local_882.packets
                                           ,value: local_882.newPacket})
                   ,infixr: function (local_943) {
                      return __return({tag: "nothing",data: {}});
                   }});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                    ,"a641e1eefdb6d290e8f5e30eb99ae939");
   }
};
var requestHeaderIndex = function (x949) {
   switch (x949.tag)
   {
     case "referer":
       var local_950 = x949.data;
       return 9.0;
     case "range":
       var local_951 = x949.data;
       return 4.0;
     case "contentLength":
       var local_952 = x949.data;
       return 0.0;
     case "connection":
       var local_953 = x949.data;
       return 3.0;
     case "host":
       var local_954 = x949.data;
       return 5.0;
     case "userAgent":
       var local_955 = x949.data;
       return 10.0;
     case "ifModifiedSince":
       var local_956 = x949.data;
       return 6.0;
     case "ifRange":
       var local_957 = x949.data;
       return 8.0;
     case "count":
       var local_958 = x949.data;
       return 11.0;
     case "transferEncoding":
       var local_959 = x949.data;
       return 1.0;
     case "expect":
       var local_960 = x949.data;
       return 2.0;
     case "ifUnmodifiedSince":
       var local_961 = x949.data;
       return 7.0;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_1b4c5f4e650b40db91d34fcbb46eedcc"
                                    ,"2d1d3f6c02b34a16b1ecc9cff08b339e");
   }
};
var toLower8 = function (local_967) {
   var x = function (x972) {
              return x972;
           }(_7c__7c_({infixl: _26__26_({infixl: _2264_({infixl: 65.0,infixr: local_967})
                                        ,infixr: function (local_968) {
                                           return _2264_({infixl: local_967
                                                         ,infixr: 90.0});
                                        }})
                      ,infixr: function (local_969) {
                         return _26__26_({infixl: _2264_({infixl: 192.0
                                                         ,infixr: local_967})
                                         ,infixr: function (local_970) {
                                            return _26__26_({infixl: _2264_({infixl: local_967
                                                                            ,infixr: 222.0})
                                                            ,infixr: function (local_971) {
                                                               return _2260_({infixl: local_967
                                                                             ,infixr: 215.0});
                                                            }});
                                         }});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_973 = x.data;
       return local_967;
     case "true":
       var local_974 = x.data;
       return _2b_({infixl: local_967,infixr: 32.0});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d53402309e2246e0acda443ccc6735f8"
                                    ,"26914d49ae6cd50363dc7b55bd37d4d5");
   }
};
var numHeadItems = function (local_985) {
   return foldLazy({list: local_985.list
                   ,initial: function (local_986) {
                      return id;
                   }
                   ,binop: function (local_987) {
                      return function (local_988) {
                             var x = function (x989) {
                                        return x989;
                                     }(local_985.that(local_987.item));
                             switch (x.tag)
                             {
                               case "false":
                                 var local_990 = x.data;
                                 return local_988;
                               case "true":
                                 var local_991 = x.data;
                                 return local_987.rest({})(_2b_({infixl: local_988
                                                                ,infixr: 1.0}));
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_8e2a63199d5c4946ae51e428c77e2587"
                                                              ,"b73a61d07547543acce9e5aa2b53f447");
                             }
                          };
                   }})(0.0);
};
var parseHeader = function (local_964) {
   var local_975 = function (local_965) {
      return {headerNameOrig: local_965
             ,headerNameLower: toBytes(toArray(map({list: fromBytes(function (x966) {
                                                      return x966;
                                                   }(local_965))
                                                   ,mapping: toLower8})))};
   };
   var x = function (x977) {
              return x977;
           }(find1({start: 0.0
                   ,__bytes: function (x976) {
                      return x976;
                   }(local_964)
                   ,byte: 58.0}));
   switch (x.tag)
   {
     case "just":
       var local_978 = x.data;
       var x = Object.assign({__data: function (local_980) {
                               return slice({object: function (x981) {
                                               return x981;
                                            }(local_964)
                                            ,start: _2b_({infixl: _2b_({infixl: local_978
                                                                       ,infixr: 1.0})
                                                         ,infixr: numHeadItems({that: function (local_982) {
                                                                                  return _7c__7c_({infixl: _3d__3d_({infixl: local_982
                                                                                                                    ,infixr: 32.0})
                                                                                                  ,infixr: function (local_983) {
                                                                                                     return _3d__3d_({infixl: local_982
                                                                                                                     ,infixr: 9.0});
                                                                                                  }});
                                                                               }
                                                                               ,list: fromBytes(slice({object: function (x984) {
                                                                                                         return x984;
                                                                                                      }(local_964)
                                                                                                      ,start: _2b_({infixl: local_978
                                                                                                                   ,infixr: 1.0})
                                                                                                      ,stop: local_980}))})})
                                            ,stop: local_980});
                            }(length(function (x979) {
                               return x979;
                            }(local_964)))}
                            ,local_975(slice({object: function (x992) {
                                                return x992;
                                             }(local_964)
                                             ,start: 0.0
                                             ,stop: local_978})));
       delete x.cacheId;
       return x;
     case "nothing":
       var local_993 = x.data;
       var x = Object.assign({__data: rts.bytesFromAscii("")},local_975(local_964));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_24c62861bfb940e4addebcc337a003f8"
                                    ,"2fd2696b8bb145a1f8ea35cf6754cfb8");
   }
};
var requestHeaderIndexFromText = function (local_995) {
   var local_997 = length(function (x996) { return x996;}(local_995));
   var local_1002 = function (local_998) {
      var x = function (x999) {
                 return x999;
              }(_3d__3d_({infixl: local_995,infixr: local_998.text}));
      switch (x.tag)
      {
        case "false":
          var local_1000 = x.data;
          return {tag: "nothing",data: {}};
        case "true":
          var local_1001 = x.data;
          return {tag: "just",data: requestHeaderIndex(local_998.value)};
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                       ,"dc1fada55c8b610b4ec39d131179bc92");
      }
   };
   var x = function (x1003) { return x1003;}(_3d__3d_({infixl: local_997,infixr: 4.0}));
   switch (x.tag)
   {
     case "false":
       var local_1004 = x.data;
       var x = function (x1005) {
                  return x1005;
               }(_3d__3d_({infixl: local_997,infixr: 5.0}));
       switch (x.tag)
       {
         case "false":
           var local_1006 = x.data;
           var x = function (x1007) {
                      return x1007;
                   }(_3d__3d_({infixl: local_997,infixr: 6.0}));
           switch (x.tag)
           {
             case "false":
               var local_1008 = x.data;
               var x = function (x1009) {
                          return x1009;
                       }(_3d__3d_({infixl: local_997,infixr: 7.0}));
               switch (x.tag)
               {
                 case "false":
                   var local_1010 = x.data;
                   var x = function (x1011) {
                              return x1011;
                           }(_3d__3d_({infixl: local_997,infixr: 8.0}));
                   switch (x.tag)
                   {
                     case "false":
                       var local_1012 = x.data;
                       var x = function (x1013) {
                                  return x1013;
                               }(_3d__3d_({infixl: local_997,infixr: 10.0}));
                       switch (x.tag)
                       {
                         case "false":
                           var local_1014 = x.data;
                           var x = function (x1015) {
                                      return x1015;
                                   }(_3d__3d_({infixl: local_997,infixr: 14.0}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_1016 = x.data;
                               var x = function (x1017) {
                                          return x1017;
                                       }(_3d__3d_({infixl: local_997,infixr: 17.0}));
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_1018 = x.data;
                                   var x = function (x1019) {
                                              return x1019;
                                           }(_3d__3d_({infixl: local_997,infixr: 19.0}));
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_1020 = x.data;
                                       return {tag: "nothing",data: {}};
                                     case "true":
                                       var local_1021 = x.data;
                                       return local_1002({text: rts.bytesFromAscii("if-unmodified-since")
                                                         ,value: {tag: "ifUnmodifiedSince"
                                                                 ,data: {}}});
                                     default:
                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                    ,"f8cf9e99c6ebab86468dac6f079e1d43");
                                   }
                                 case "true":
                                   var local_1022 = x.data;
                                   var x = function (x1023) {
                                              return x1023;
                                           }(_3d__3d_({infixl: local_995
                                                      ,infixr: rts.bytesFromAscii("transfer-encoding")}));
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_1024 = x.data;
                                       var x = function (x1025) {
                                                  return x1025;
                                               }(_3d__3d_({infixl: local_995
                                                          ,infixr: rts.bytesFromAscii("if-modified-since")}));
                                       switch (x.tag)
                                       {
                                         case "false":
                                           var local_1026 = x.data;
                                           return {tag: "nothing",data: {}};
                                         case "true":
                                           var local_1027 = x.data;
                                           return {tag: "just"
                                                  ,data: requestHeaderIndex({tag: "ifModifiedSince"
                                                                            ,data: {}})};
                                         default:
                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                        ,"5c9b7e120cfcbfe66378a56aa55e1554");
                                       }
                                     case "true":
                                       var local_1028 = x.data;
                                       return {tag: "just"
                                              ,data: requestHeaderIndex({tag: "transferEncoding"
                                                                        ,data: {}})};
                                     default:
                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                    ,"9ec381855af586ca5f7ac0406a96f0db");
                                   }
                                 default:
                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                ,"f7b8f18ab48287152b84f01302b0a1e9");
                               }
                             case "true":
                               var local_1029 = x.data;
                               return local_1002({text: rts.bytesFromAscii("content-length")
                                                 ,value: {tag: "contentLength"
                                                         ,data: {}}});
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                            ,"316352807090bd4b8e1627c428b18ad0");
                           }
                         case "true":
                           var local_1030 = x.data;
                           var x = function (x1031) {
                                      return x1031;
                                   }(_3d__3d_({infixl: local_995
                                              ,infixr: rts.bytesFromAscii("user-agent")}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_1032 = x.data;
                               var x = function (x1033) {
                                          return x1033;
                                       }(_3d__3d_({infixl: local_995
                                                  ,infixr: rts.bytesFromAscii("connection")}));
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_1034 = x.data;
                                   return {tag: "nothing",data: {}};
                                 case "true":
                                   var local_1035 = x.data;
                                   return {tag: "just"
                                          ,data: requestHeaderIndex({tag: "connection"
                                                                    ,data: {}})};
                                 default:
                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                ,"0a18521fa15139803614889d5ac640f3");
                               }
                             case "true":
                               var local_1036 = x.data;
                               return {tag: "just"
                                      ,data: requestHeaderIndex({tag: "userAgent"
                                                                ,data: {}})};
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                            ,"02a6caa9597123d66ac17c49dd5a37b6");
                           }
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                        ,"7b3222baa853ea34afcad794d9b346da");
                       }
                     case "true":
                       var local_1037 = x.data;
                       return local_1002({text: rts.bytesFromAscii("if-range")
                                         ,value: {tag: "ifRange",data: {}}});
                     default:
                       throw rts.exceptions.LamduBug("Unhandled case"
                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                    ,"0c12468dbe34d1382d0b97b93b5cab94");
                   }
                 case "true":
                   var local_1038 = x.data;
                   return local_1002({text: rts.bytesFromAscii("referer")
                                     ,value: {tag: "referer",data: {}}});
                 default:
                   throw rts.exceptions.LamduBug("Unhandled case"
                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                ,"13eb12f71c41a5c676528975f4cd2d8f");
               }
             case "true":
               var local_1039 = x.data;
               return local_1002({text: rts.bytesFromAscii("expect")
                                 ,value: {tag: "expect",data: {}}});
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                            ,"a709b7964f58d9b479a336260545d465");
           }
         case "true":
           var local_1040 = x.data;
           return local_1002({text: rts.bytesFromAscii("range")
                             ,value: {tag: "range",data: {}}});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                        ,"1d20a17a150e74e964a7731e9e75cc90");
       }
     case "true":
       var local_1041 = x.data;
       return local_1002({text: rts.bytesFromAscii("host")
                         ,value: {tag: "host",data: {}}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                    ,"b082b30c0d03c8abd35416fd055c4e65");
   }
};
var parseHeaders = function (local_947) {
   var local_1050 = runMutArray(_3b_({infixl: newMutArray
                                     ,infixr: function (local_948) {
                                        return _3b_({infixl: sequence__(replicate({count: requestHeaderIndex({tag: "count"
                                                                                                             ,data: {}})
                                                                                  ,item: appendMutArray({object: local_948
                                                                                                        ,value: {tag: "nothing"
                                                                                                                ,data: {}}})}))
                                                    ,infixr: function (local_962) {
                                                       return _3b_({infixl: sequence__(map({list: _2e__2e_({start: 1.0
                                                                                                           ,stop: length1(local_947)})
                                                                                           ,mapping: function (local_963) {
                                                                                              var local_994 =
                                                                                              parseHeader(item({index: local_963
                                                                                                               ,object: local_947}));
                                                                                              var local_1042 =
                                                                                              requestHeaderIndexFromText(local_994.headerNameLower);
                                                                                              var x =
                                                                                              function (x1043) {
                                                                                                 return x1043;
                                                                                              }(local_1042);
                                                                                              switch (x.tag)
                                                                                              {
                                                                                                case "just":
                                                                                                  var index7 =
                                                                                                  x.data;
                                                                                                  return _3b_({infixl: readMutArray({index: index7
                                                                                                                                    ,object: local_948})
                                                                                                              ,infixr: function (local_1044) {
                                                                                                                 var x =
                                                                                                                 function (x1045) {
                                                                                                                    return x1045;
                                                                                                                 }(local_1044);
                                                                                                                 switch (x.tag)
                                                                                                                 {
                                                                                                                   case "just":
                                                                                                                     var local_1046 =
                                                                                                                     x.data;
                                                                                                                     throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                                                                                     ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                     ,"0ba4efe1ab9b937a5c4c329950c130eb");
                                                                                                                   case "nothing":
                                                                                                                     var local_1047 =
                                                                                                                     x.data;
                                                                                                                     return writeMutArray({index: index7
                                                                                                                                          ,object: local_948
                                                                                                                                          ,value: {tag: "just"
                                                                                                                                                  ,data: local_994.__data}});
                                                                                                                   default:
                                                                                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                  ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                  ,"46e58c07915691b0449b51e2c57e8c26");
                                                                                                                 }
                                                                                                              }});
                                                                                                case "nothing":
                                                                                                  var local_1048 =
                                                                                                  x.data;
                                                                                                  return __return({});
                                                                                                default:
                                                                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                               ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                               ,"96d7c2e4942aa324705674b28c8d8892");
                                                                                              }
                                                                                           }}))
                                                                   ,infixr: function (local_1049) {
                                                                      return __return(local_948);
                                                                   }});
                                                    }});
                                     }}));
   var value = function (local_1051) {
      return item({index: requestHeaderIndex(local_1051),object: local_1050});
   };
   return {referer: value({tag: "referer",data: {}})
          ,range: value({tag: "range",data: {}})
          ,contentLength: value({tag: "contentLength",data: {}})
          ,connection: value({tag: "connection",data: {}})
          ,host: value({tag: "host",data: {}})
          ,userAgent: value({tag: "userAgent",data: {}})
          ,ifModifiedSince: value({tag: "ifModifiedSince",data: {}})
          ,ifRange: value({tag: "ifRange",data: {}})
          ,transferEncoding: value({tag: "transferEncoding",data: {}})
          ,expect: value({tag: "expect",data: {}})
          ,ifUnmodifiedSince: value({tag: "ifUnmodifiedSince",data: {}})};
};
var parseHttpVersion = function (local_1057) {
   var x = function (x1063) {
              return x1063;
           }(_26__26_({infixl: _3d__3d_({infixl: slice({object: function (x1058) {
                                                          return x1058;
                                                       }(local_1057)
                                                       ,start: 0.0
                                                       ,stop: 5.0})
                                        ,infixr: rts.bytesFromAscii("HTTP/")})
                      ,infixr: function (local_1059) {
                         return _26__26_({infixl: _3d__3d_({infixl: slice({object: function (x1060) {
                                                                             return x1060;
                                                                          }(local_1057)
                                                                          ,start: 6.0
                                                                          ,stop: 7.0})
                                                           ,infixr: rts.bytesFromAscii(".")})
                                         ,infixr: function (local_1061) {
                                            return _2265_({infixl: length(function (x1062) {
                                                             return x1062;
                                                          }(local_1057))
                                                          ,infixr: 8.0});
                                         }});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_1064 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                       ,"d4d438d8b8c3035dd13c03c182e694f8");
     case "true":
       var local_1065 = x.data;
       var local_1067 = byteAt({index: 5.0
                               ,object: function (x1066) {
                                  return x1066;
                               }(local_1057)});
       var local_1069 = byteAt({index: 7.0
                               ,object: function (x1068) {
                                  return x1068;
                               }(local_1057)});
       var x = function (x1070) {
                  return x1070;
               }(_3d__3d_({infixl: local_1067,infixr: 49.0}));
       switch (x.tag)
       {
         case "false":
           var local_1071 = x.data;
           var x = function (x1073) {
                      return x1073;
                   }(_26__26_({infixl: _3d__3d_({infixl: local_1067,infixr: 50.0})
                              ,infixr: function (local_1072) {
                                 return _3d__3d_({infixl: local_1069,infixr: 48.0});
                              }}));
           switch (x.tag)
           {
             case "false":
               var local_1074 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_1075 = x.data;
               return {minor: 0.0,major: 2.0};
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                            ,"6d72ed51030c146e142824d8c5608502");
           }
         case "true":
           var local_1076 = x.data;
           var x = function (x1077) {
                      return x1077;
                   }(_3d__3d_({infixl: local_1069,infixr: 49.0}));
           switch (x.tag)
           {
             case "false":
               var local_1078 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_1079 = x.data;
               return {minor: 1.0,major: 1.0};
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                            ,"b80f6ac8b7a1b87599df15c30e4c6f7c");
           }
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                        ,"c98318a70f432213d8971ffbc44292ca");
       }
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                    ,"0a155af817e30618f126869341b69d73");
   }
};
var parseHttpPathAndQuery = function (local_1080) {
   var x = function (x1082) {
              return x1082;
           }(find1({start: 0.0
                   ,__bytes: function (x1081) {
                      return x1081;
                   }(local_1080)
                   ,byte: 63.0}));
   switch (x.tag)
   {
     case "just":
       var local_1083 = x.data;
       return {path: slice({object: function (x1084) {
                              return x1084;
                           }(local_1080)
                           ,start: 0.0
                           ,stop: local_1083})
              ,query: slice({object: function (x1085) {
                               return x1085;
                            }(local_1080)
                            ,start: local_1083
                            ,stop: length(function (x1086) {
                               return x1086;
                            }(local_1080))})};
     case "nothing":
       var local_1087 = x.data;
       return {path: local_1080,query: rts.bytesFromAscii("")};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_e1ddf2e103fc4a77ba877761b12b0489"
                                    ,"7b5454e4261c24d201d9384e83ca385c");
   }
};
var parseRequestLine = function (local_1052) {
   var local_1053 = toArray(split({text: local_1052,seperator: rts.bytesFromAscii(" ")}));
   var x = function (x1054) {
              return x1054;
           }(_3d__3d_({infixl: length1(local_1053),infixr: 3.0}));
   switch (x.tag)
   {
     case "false":
       var local_1055 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                       ,"a7de8d96fb5e1479e6bb2a3ddb6eeaaa");
     case "true":
       var local_1056 = x.data;
       var x = Object.assign({httpVersion: parseHttpVersion(item({index: 2.0
                                                                 ,object: local_1053}))
                             ,method: item({index: 0.0,object: local_1053})}
                            ,parseHttpPathAndQuery(item({index: 1.0
                                                        ,object: local_1053})));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                    ,"1a29dea7dd98168ceba76256560b374b");
   }
};
var isPrefixOf = function (local_1102) {
   var local_1103 = length(local_1102.whole);
   var local_1104 = length(local_1102.prefix);
   return _26__26_({infixl: _2265_({infixl: local_1103,infixr: local_1104})
                   ,infixr: function (local_1105) {
                      return _3d__3d_({infixl: slice({object: local_1102.whole
                                                     ,start: 0.0
                                                     ,stop: local_1104})
                                      ,infixr: local_1102.prefix});
                   }});
};
var unprefixed = function (local_1101) {
   var x = function (x1106) {
              return x1106;
           }(isPrefixOf({whole: local_1101.whole,prefix: local_1101.prefix}));
   switch (x.tag)
   {
     case "false":
       var local_1107 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_1108 = x.data;
       return {tag: "just"
              ,data: slice({object: local_1101.whole
                           ,start: length(local_1101.prefix)
                           ,stop: length(local_1101.whole)})};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_1d18b3f94ac64cc39b8dc131624a5e9f"
                                    ,"2de3ba5a8affabb154216378ec3580e6");
   }
};
var httpAddLocalPath = function (local_1088) {
   var local_1089 = local_1088.path;
   var nonEmpty = function (local_1090) {
      var x = function (x1091) {
                 return x1091;
              }(_3d__3d_({infixl: local_1090,infixr: rts.bytesFromAscii("")}));
      switch (x.tag)
      {
        case "false":
          var local_1092 = x.data;
          return local_1090;
        case "true":
          var local_1093 = x.data;
          return rts.bytesFromAscii("/");
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_97b5de980c3149218877e33920fb5729"
                                       ,"5ae9e78cf85c5d6952c38eb479596553");
      }
   };
   var local_1098 = function (local_1094) {
      return nonEmpty(function () {
             var x = function (x1095) {
                        return x1095;
                     }(find1({start: 0.0,__bytes: local_1094,byte: 47.0}));
             switch (x.tag)
             {
               case "just":
                 var local_1096 = x.data;
                 return slice({object: local_1094
                              ,start: local_1096
                              ,stop: length(local_1094)});
               case "nothing":
                 var local_1097 = x.data;
                 return rts.bytesFromAscii("");
               default:
                 throw rts.exceptions.LamduBug("Unhandled case"
                                              ,"DEF_97b5de980c3149218877e33920fb5729"
                                              ,"8d9250a6123ff265d7652592a88c96a8");
             }
          }());
   };
   var x = Object.assign({localPath: function () {
                           var x = function (x1109) {
                                      return x1109;
                                   }(unprefixed({whole: function (x1099) {
                                                   return x1099;
                                                }(local_1089)
                                                ,prefix: function (x1100) {
                                                   return x1100;
                                                }(rts.bytesFromAscii("http://"))}));
                           switch (x.tag)
                           {
                             case "just":
                               return local_1098(x.data);
                             case "nothing":
                               var local_1110 = x.data;
                               var x = function (x1113) {
                                          return x1113;
                                       }(unprefixed({whole: function (x1111) {
                                                       return x1111;
                                                    }(local_1089)
                                                    ,prefix: function (x1112) {
                                                       return x1112;
                                                    }(rts.bytesFromAscii("https://"))}));
                               switch (x.tag)
                               {
                                 case "just":
                                   return local_1098(x.data);
                                 case "nothing":
                                   var local_1114 = x.data;
                                   return nonEmpty(local_1089);
                                 default:
                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                ,"DEF_97b5de980c3149218877e33920fb5729"
                                                                ,"c0dd43e18ed983b36e5c60602a58a1ca");
                               }
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_97b5de980c3149218877e33920fb5729"
                                                            ,"fe5bc8fad7ae34a3fea4792464e3f2d9");
                           }
                        }()}
                        ,local_1088);
   delete x.cacheId;
   return x;
};
var httpContinueMessage = function (local_1118) {
   return concat2(_3a__3a_({infixl: function () {
                              var x = function (x1119) {
                                         return x1119;
                                      }(_3d__3d_({infixl: local_1118
                                                 ,infixr: {minor: 1.0,major: 1.0}}));
                              switch (x.tag)
                              {
                                case "false":
                                  var local_1120 = x.data;
                                  return function (x1121) {
                                         return x1121;
                                      }(rts.bytesFromAscii("HTTP/1.0"));
                                case "true":
                                  var local_1122 = x.data;
                                  return function (x1123) {
                                         return x1123;
                                      }(rts.bytesFromAscii("HTTP/1.1"));
                                default:
                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                               ,"DEF_28b20b49b76041158f817cb6f1ae7069"
                                                               ,"7a33dc1474f28318b0a1a21410017295");
                              }
                           }()
                           ,infixr: function (local_1124) {
                              return _3a__3a_({infixl: function (x1125) {
                                                 return x1125;
                                              }(rts.bytesFromAscii(" 100 Continue"))
                                              ,infixr: function (local_1126) {
                                                 return _3a__3a_({infixl: rts.bytes([13
                                                                                    ,10
                                                                                    ,13
                                                                                    ,10])
                                                                 ,infixr: function (local_1127) {
                                                                    return {tag: "empty"
                                                                           ,data: {}};
                                                                 }});
                                              }});
                           }}));
};
var parseHttpRequestPacket = function (local_854) {
   var local_863 = _3b_({infixl: popLastMutArray(local_854.unparsedPackets)
                        ,infixr: function (local_859) {
                           var x = function (x860) { return x860;}(local_859);
                           switch (x.tag)
                           {
                             case "just":
                               var local_861 = x.data;
                               return parseHttpRequestPacket({socket: local_854.socket
                                                             ,unparsedPackets: local_854.unparsedPackets
                                                             ,newPacket: local_861
                                                             ,stateRef: local_854.stateRef
                                                             ,handler: local_854.handler});
                             case "nothing":
                               var local_862 = x.data;
                               return __return({});
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                            ,"a71ca59bb3302212a2d667ac7d89c4e8");
                           }
                        }});
   return _3b_({infixl: readMutRef(local_854.stateRef)
               ,infixr: function (x864) {
                  switch (x864.tag)
                  {
                    case "body":
                      var local_865 = x864.data;
                      var local_866 = length(local_854.newPacket);
                      var x = function (x867) {
                                 return x867;
                              }(_3c_({infixl: local_866,infixr: local_865.remain}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_868 = x.data;
                          return _3b_({infixl: length4(local_854.unparsedPackets)
                                      ,infixr: function (local_869) {
                                         return _3b_({infixl: sequence(map({list: _2e__2e_({start: 0.0
                                                                                           ,stop: local_869})
                                                                           ,mapping: function (local_870) {
                                                                              return readMutArray({index: local_870
                                                                                                  ,object: local_854.unparsedPackets});
                                                                           }}))
                                                     ,infixr: function (packets) {
                                                        return _3b_({infixl: _3b_({infixl: truncateMutArray({object: local_854.unparsedPackets
                                                                                                            ,stop: 0.0})
                                                                                  ,infixr: function (local_871) {
                                                                                     return local_854.handler({request: function () {
                                                                                                                 var x =
                                                                                                                 Object.assign({body: {tag: "just"
                                                                                                                                      ,data: concat2(_2b__2b_2({infixl: packets
                                                                                                                                                               ,infixr: function (local_872) {
                                                                                                                                                                  return _3a__3a_({infixl: slice({object: local_854.newPacket
                                                                                                                                                                                                 ,start: 0.0
                                                                                                                                                                                                 ,stop: local_865.remain})
                                                                                                                                                                                  ,infixr: function (local_873) {
                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                  }});
                                                                                                                                                               }}))}}
                                                                                                                              ,local_865.request);
                                                                                                                 delete x.cacheId;
                                                                                                                 return x;
                                                                                                              }()
                                                                                                              ,socket: local_854.socket});
                                                                                  }})
                                                                    ,infixr: function (local_874) {
                                                                       return _3b_({infixl: writeMutRef({object: local_854.stateRef
                                                                                                        ,value: {tag: "header"
                                                                                                                ,data: {}}})
                                                                                   ,infixr: function (local_875) {
                                                                                      var x =
                                                                                      function (x876) {
                                                                                         return x876;
                                                                                      }(_3c_({infixl: local_865.remain
                                                                                             ,infixr: local_866}));
                                                                                      switch (x.tag)
                                                                                      {
                                                                                        case "false":
                                                                                          var local_877 =
                                                                                          x.data;
                                                                                          return __return({});
                                                                                        case "true":
                                                                                          var local_878 =
                                                                                          x.data;
                                                                                          return parseHttpRequestPacket({socket: local_854.socket
                                                                                                                        ,unparsedPackets: local_854.unparsedPackets
                                                                                                                        ,newPacket: slice({object: local_854.newPacket
                                                                                                                                          ,start: local_865.remain
                                                                                                                                          ,stop: local_866})
                                                                                                                        ,stateRef: local_854.stateRef
                                                                                                                        ,handler: local_854.handler});
                                                                                        default:
                                                                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                       ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                                       ,"648f5244207bc3a94b77db16bd2ed183");
                                                                                      }
                                                                                   }});
                                                                    }});
                                                     }});
                                      }});
                        case "true":
                          var local_879 = x.data;
                          return _3b_({infixl: appendMutArray({object: local_854.unparsedPackets
                                                              ,value: local_854.newPacket})
                                      ,infixr: function (local_880) {
                                         return writeMutRef({object: local_854.stateRef
                                                            ,value: {tag: "body"
                                                                    ,data: {request: local_865.request
                                                                           ,remain: _2d_({infixl: local_865.remain
                                                                                         ,infixr: local_866})}}});
                                      }});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                       ,"4a7857b1e6dc15eee111f928eef30ceb");
                      }
                    case "header":
                      var local_881 = x864.data;
                      return _3b_({infixl: parseHttpHeaderPacket({start: 0.0
                                                                 ,newPacket: local_854.newPacket
                                                                 ,packets: local_854.unparsedPackets})
                                  ,infixr: function (local_944) {
                                     var x = function (x945) { return x945;}(local_944);
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_946 = x.data;
                                         var request1 = function () {
                                                           var x =
                                                           Object.assign({headers: parseHeaders(local_946)}
                                                                        ,httpAddLocalPath(parseRequestLine(item({index: 0.0
                                                                                                                ,object: local_946}))));
                                                           delete x.cacheId;
                                                           return x;
                                                        }();
                                         return _3b_({infixl: function () {
                                                        var x = function (x1115) {
                                                                   return x1115;
                                                                }(_3d__3d_({infixl: request1.headers.expect
                                                                           ,infixr: {tag: "just"
                                                                                    ,data: rts.bytesFromAscii("100-continue")}}));
                                                        switch (x.tag)
                                                        {
                                                          case "false":
                                                            var local_1116 = x.data;
                                                            return __return({});
                                                          case "true":
                                                            var local_1117 = x.data;
                                                            return send({__data: httpContinueMessage(request1.httpVersion)
                                                                        ,socket: local_854.socket});
                                                          default:
                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                         ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                         ,"0010e59778d59572282a2dab5b43c99f");
                                                        }
                                                     }()
                                                     ,infixr: function (local_1128) {
                                                        return _3b_({infixl: function () {
                                                                       var x =
                                                                       function (x1129) {
                                                                          return x1129;
                                                                       }(request1.headers.contentLength);
                                                                       switch (x.tag)
                                                                       {
                                                                         case "just":
                                                                           var local_1130 =
                                                                           x.data;
                                                                           return writeMutRef({object: local_854.stateRef
                                                                                              ,value: {tag: "body"
                                                                                                      ,data: {request: request1
                                                                                                             ,remain: parseInt(local_1130)}}});
                                                                         case "nothing":
                                                                           var local_1131 =
                                                                           x.data;
                                                                           return local_854.handler({request: function () {
                                                                                                       var x =
                                                                                                       Object.assign({body: {tag: "nothing"
                                                                                                                            ,data: {}}}
                                                                                                                    ,request1);
                                                                                                       delete x.cacheId;
                                                                                                       return x;
                                                                                                    }()
                                                                                                    ,socket: local_854.socket});
                                                                         default:
                                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                        ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                        ,"c91c5cea0890a94419165f2c0e413659");
                                                                       }
                                                                    }()
                                                                    ,infixr: function (local_1132) {
                                                                       return local_863;
                                                                    }});
                                                     }});
                                       case "nothing":
                                         var local_1133 = x.data;
                                         return __return({});
                                       default:
                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                      ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                      ,"cef302b61f67cb881213fc7f4a6273d1");
                                     }
                                  }});
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                   ,"434367d98a0e9fd511b469733d2b51e0");
                  }
               }});
};
var parseHttpRequests = function (local_852) {
   return _3b_({infixl: newMutRef({tag: "header",data: {}})
               ,infixr: function (stateRef) {
                  return _3b_({infixl: newMutArray
                              ,infixr: function (unparsedPackets) {
                                 return __return(function (local_853) {
                                        return parseHttpRequestPacket({socket: local_852.socket
                                                                      ,unparsedPackets: unparsedPackets
                                                                      ,newPacket: local_853
                                                                      ,stateRef: stateRef
                                                                      ,handler: local_852.handler});
                                     });
                              }});
               }});
};
var openTcpServer = rts.builtins.IO.network["openTcpServer"];
var httpServer = function (local_840) {
   return openTcpServer({connectionHandler: function (socket) {
                           return parseHttpRequests({socket: socket
                                                    ,handler: function (local_841) {
                                                       return _3b_({infixl: local_840.handler(local_841.request)
                                                                   ,infixr: function (local_842) {
                                                                      return send({__data: _2b__2b_1({a: function (x851) {
                                                                                                        return x851;
                                                                                                     }(join({texts: _3a__3a_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("HTTP/1.1")
                                                                                                                                                            ,infixr: function (local_843) {
                                                                                                                                                               return _3a__3a_({infixl: showNum(local_842.status.code)
                                                                                                                                                                               ,infixr: function (local_844) {
                                                                                                                                                                                  return _3a__3a_({infixl: local_842.status.message
                                                                                                                                                                                                  ,infixr: function (local_845) {
                                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                                  }});
                                                                                                                                                                               }});
                                                                                                                                                            }})
                                                                                                                                           ,seperator: rts.bytesFromAscii(" ")})
                                                                                                                             ,infixr: function (local_846) {
                                                                                                                                return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Type: ")
                                                                                                                                                                  ,b: local_842.content.mimeType})
                                                                                                                                                ,infixr: function (local_847) {
                                                                                                                                                   return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Length: ")
                                                                                                                                                                                     ,b: showNum(length(local_842.content.__data))})
                                                                                                                                                                   ,infixr: function (local_848) {
                                                                                                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                      ,infixr: function (local_849) {
                                                                                                                                                                                         return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                                         ,infixr: function (local_850) {
                                                                                                                                                                                                            return {tag: "empty"
                                                                                                                                                                                                                   ,data: {}};
                                                                                                                                                                                                         }});
                                                                                                                                                                                      }});
                                                                                                                                                                   }});
                                                                                                                                                }});
                                                                                                                             }})
                                                                                                            ,seperator: rts.bytesFromAscii("\r\n")}))
                                                                                                     ,b: local_842.content.__data})
                                                                                  ,socket: socket});
                                                                   }});
                                                    }});
                        }
                        ,exclusive: {tag: "false",data: {}}
                        ,host: local_840.host
                        ,port: local_840.port});
};
var pestoval = _3b_({infixl: pestovalDb
                    ,infixr: function (database) {
                       return _3b_({infixl: environment(function (x83) {
                                      return x83;
                                   }(rts.bytesFromAscii("PORT")))
                                   ,infixr: function (port) {
                                      return httpServer({host: rts.bytesFromAscii("0.0.0.0")
                                                        ,port: function () {
                                                           var x = function (x84) {
                                                                      return x84;
                                                                   }(port);
                                                           switch (x.tag)
                                                           {
                                                             case "just":
                                                               var local_85 = x.data;
                                                               return parseInt(local_85);
                                                             case "nothing":
                                                               var local_86 = x.data;
                                                               return 5000.0;
                                                             default:
                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                            ,"DEF_03805ab8c62443a3b30436fe169288a2"
                                                                                            ,"3c935b9a695b9f760ec99c27b590c3d2");
                                                           }
                                                        }()
                                                        ,handler: function (request) {
                                                           return pestovalHandler({request: request
                                                                                  ,database: database});
                                                        }});
                                   }});
                    }});
try {
   var repl = pestoval;
   rts.logRepl(repl);
} catch (err) {
   rts.logReplErr(err);
} 
(function () {
        module.exports = repl;
     }());
