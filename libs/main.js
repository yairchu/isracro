"use strict";
var rts = require("./rts.js");
var environment = rts.builtins.IO.os["env"];
var length = rts.builtins.Bytes["length"];
var _2b_ = rts.builtins.Prelude["+"];
var slice1 = rts.builtins.Bytes["slice"];
var _3d__3d_ = rts.builtins.Prelude["=="];
var _2d_ = rts.builtins.Prelude["-"];
var iterate = function (local_11) {
   return {tag: "nonEmpty"
          ,data: {head: local_11.initial
                 ,tail: function (local_12) {
                    return iterate({initial: local_11.next(local_11.initial)
                                   ,next: local_11.next});
                 }}};
};
var _3e_ = rts.builtins.Prelude[">"];
var _3c_ = rts.builtins.Prelude["<"];
var take = function (local_17) {
   var x = local_17.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_18 = x.data;
       var x = local_17.__while(local_18.head);
       switch (x.tag)
       {
         case "false":
           var local_19 = x.data;
           return {tag: "empty",data: {}};
         case "true":
           var local_20 = x.data;
           return {tag: "nonEmpty"
                  ,data: {head: local_18.head
                         ,tail: function (local_21) {
                            return take({stream: local_18.tail({})
                                        ,__while: local_17.__while});
                         }}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_ef15e9ece99a44fc9a41740a570f3fc9"
                                        ,"388ac081138d4b3bb98f2c7c6c5674d6");
       }
     case "empty":
       var local_22 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_ef15e9ece99a44fc9a41740a570f3fc9"
                                    ,"908fa9a99fac4a058be9f984a22b1430");
   }
};
var _2e__2e_1 = function (local_9) {
   return take({stream: iterate({initial: local_9.start
                                ,next: function (local_10) {
                                   return _2b_({infixl: local_10,infixr: local_9.step});
                                }})
               ,__while: function () {
                  var x = _3e_({infixl: local_9.step,infixr: 0.0});
                  switch (x.tag)
                  {
                    case "false":
                      var local_13 = x.data;
                      return function (local_14) {
                             return _3e_({infixl: local_14,infixr: local_9.stop});
                          };
                    case "true":
                      var local_15 = x.data;
                      return function (local_16) {
                             return _3c_({infixl: local_16,infixr: local_9.stop});
                          };
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_976e4af994d74546b61bfcdc6bf2c950"
                                                   ,"0cab2989e68742c6aedf4360d1ce05ae");
                  }
               }()});
};
var _2e__2e_ = function (local_8) {
   return _2e__2e_1({step: 1.0,start: local_8.start,stop: local_8.stop});
};
var first = function (local_23) {
   var x = local_23.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_24 = x.data;
       var x = local_23.that(local_24.head);
       switch (x.tag)
       {
         case "false":
           var local_25 = x.data;
           return first({that: local_23.that,stream: local_24.tail({})});
         case "true":
           var local_26 = x.data;
           return {tag: "just",data: local_24.head};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_8a1642b8d2ef4d669df333f01821017e"
                                        ,"dc5bff2c6387486ea6f4d43193feaf06");
       }
     case "empty":
       var local_27 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8a1642b8d2ef4d669df333f01821017e"
                                    ,"2e32b7557b4e490bb6cd14a351193ae2");
   }
};
var find = function (local_6) {
   var subLen = length(local_6.slice);
   return first({that: function (local_7) {
                   return _3d__3d_({infixl: slice1({object: local_6.__bytes
                                                   ,start: local_7
                                                   ,stop: _2b_({infixl: local_7
                                                               ,infixr: subLen})})
                                   ,infixr: local_6.slice});
                }
                ,stream: _2e__2e_({start: 0.0
                                  ,stop: _2b_({infixl: _2d_({infixl: length(local_6.__bytes)
                                                            ,infixr: subLen})
                                              ,infixr: 1.0})})});
};
var _3a__3a_ = function (local_30) {
   return {tag: "nonEmpty",data: {head: local_30.infixl,tail: local_30.infixr}};
};
var split1 = function (local_5) {
   var x = find({__bytes: local_5.__bytes,slice: local_5.seperator});
   switch (x.tag)
   {
     case "just":
       var local_28 = x.data;
       return _3a__3a_({infixl: slice1({object: local_5.__bytes
                                       ,start: 0.0
                                       ,stop: local_28})
                       ,infixr: function (local_29) {
                          return split1({__bytes: slice1({object: local_5.__bytes
                                                         ,start: _2b_({infixl: local_28
                                                                      ,infixr: length(local_5.seperator)})
                                                         ,stop: length(local_5.__bytes)})
                                        ,seperator: local_5.seperator});
                       }});
     case "nothing":
       var local_31 = x.data;
       return _3a__3a_({infixl: local_5.__bytes
                       ,infixr: function (local_32) {
                          return {tag: "empty",data: {}};
                       }});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_b21053ea92ed45029fa78a5121bf6e3a"
                                    ,"ff767a75261daa1e4a165bc04bb8c028");
   }
};
var foldLazy = function (local_37) {
   var x = local_37.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_38 = x.data;
       return local_37.binop({rest: function (local_39) {
                                var dummy = _3d__3d_({infixl: local_39,infixr: {}});
                                return foldLazy({stream: local_38.tail({})
                                                ,initial: local_37.initial
                                                ,binop: local_37.binop});
                             }
                             ,item: local_38.head});
     case "empty":
       return local_37.initial(x.data);
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a2dc21b7c3b04474a4cd67135dd74e65"
                                    ,"487496adc31e442cbda46679c6451ca8");
   }
};
var map = function (local_34) {
   return foldLazy({stream: local_34.stream
                   ,initial: function (local_35) {
                      return {tag: "empty",data: {}};
                   }
                   ,binop: function (local_36) {
                      return {tag: "nonEmpty"
                             ,data: {head: local_34.mapping(local_36.item)
                                    ,tail: local_36.rest}};
                   }});
};
var split = function (local_4) {
   return split1({__bytes: local_4.text,seperator: local_4.seperator});
};
var newMutArray = rts.builtins.Mut.Array["new"];
var appendMutArray = rts.builtins.Mut.Array["append"];
var __return = rts.builtins.Mut["return"];
var _3b_ = rts.builtins.Mut["bind"];
var sequence__ = function (stream2) {
   return foldLazy({stream: stream2
                   ,initial: function (local_41) {
                      return __return({});
                   }
                   ,binop: function (local_42) {
                      return _3b_({infixl: local_42.item
                                  ,infixr: function (local_43) {
                                     return local_42.rest({});
                                  }});
                   }});
};
var runMutArray = rts.builtins.Mut.Array["run"];
var toArray = function (stream1) {
   return runMutArray(_3b_({infixl: newMutArray
                           ,infixr: function (__array) {
                              return _3b_({infixl: sequence__(map({stream: stream1
                                                                  ,mapping: function (local_40) {
                                                                     return appendMutArray({object: __array
                                                                                           ,value: local_40});
                                                                  }}))
                                          ,infixr: function (local_44) {
                                             return __return(__array);
                                          }});
                           }}));
};
var length1 = rts.builtins.Array["length"];
var item1 = rts.builtins.Array["item"];
var _26__26_ = function (local_48) {
   var x = local_48.infixl;
   switch (x.tag)
   {
     case "false":
       var local_49 = x.data;
       return {tag: "false",data: {}};
     case "true":
       return local_48.infixr(x.data);
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_e75aed3cb68c4fd395ce0c5c287eadba"
                                    ,"b49d483abc72480a838ef25795ee9758");
   }
};
var ignoreError = function (local_51) {
   throw rts.exceptions.ReachedHole("Reached a hole"
                                   ,"DEF_157261c59c9a44f1867b85e4d1b49818"
                                   ,"4c518e5b0faa46fe87f4941f1e0cbe54");
};
var byteAt = rts.builtins.Bytes["byteAt"];
var fromBytes = function (__bytes1) {
   var length2 = length(__bytes1);
   return map({stream: _2e__2e_({start: 0.0,stop: length2})
              ,mapping: function (local_60) {
                 return byteAt({index: local_60,object: __bytes1});
              }});
};
var _2a_ = rts.builtins.Prelude["*"];
var fold = function (local_62) {
   var x = local_62.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_63 = x.data;
       return fold({stream: local_63.tail({})
                   ,initial: local_62.binop({acc: local_62.initial,item: local_63.head})
                   ,binop: local_62.binop});
     case "empty":
       var local_64 = x.data;
       return local_62.initial;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d742e997601e4a6f9fab3277d9fb50d5"
                                    ,"637233b5b124439a95770c0e0d801258");
   }
};
var parseInt = function (local_59) {
   return fold({stream: fromBytes(local_59)
               ,initial: 0.0
               ,binop: function (local_61) {
                  return _2d_({infixl: _2b_({infixl: _2a_({infixl: local_61.acc
                                                          ,infixr: 10.0})
                                            ,infixr: local_61.item})
                              ,infixr: 48.0});
               }});
};
var parseDatabaseUrl = function (local_3) {
   var local_45 = toArray(split({text: local_3,seperator: rts.bytesFromAscii("/")}));
   var x = _26__26_({infixl: _3d__3d_({infixl: length1(local_45),infixr: 4.0})
                    ,infixr: function (local_46) {
                       return _26__26_({infixl: _3d__3d_({infixl: item1({index: 0.0
                                                                        ,object: local_45})
                                                         ,infixr: rts.bytesFromAscii("postgres:")})
                                       ,infixr: function (local_47) {
                                          return _3d__3d_({infixl: item1({index: 1.0
                                                                         ,object: local_45})
                                                          ,infixr: rts.bytesFromAscii("")});
                                       }});
                    }});
   switch (x.tag)
   {
     case "false":
       var local_50 = x.data;
       return ignoreError(function () {
              throw rts.exceptions.ReachedHole("Reached a hole"
                                              ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                              ,"5813e29d7943cb3b7293f7b5baf46584");
           }());
     case "true":
       var local_52 = x.data;
       var local_53 = toArray(split({text: item1({index: 2.0,object: local_45})
                                    ,seperator: rts.bytesFromAscii(":")}));
       var x = _3d__3d_({infixl: length1(local_53),infixr: 3.0});
       switch (x.tag)
       {
         case "false":
           var local_54 = x.data;
           return ignoreError(function () {
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                                  ,"0f3aa79fa902ac4dcfbe4ffb6cb00ace");
               }());
         case "true":
           var local_55 = x.data;
           var local_56 = toArray(split({text: item1({index: 1.0,object: local_53})
                                        ,seperator: rts.bytesFromAscii("@")}));
           var x = _3d__3d_({infixl: length1(local_56),infixr: 2.0});
           switch (x.tag)
           {
             case "false":
               var local_57 = x.data;
               throw rts.exceptions.ReachedHole("Reached a hole"
                                               ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                               ,"5f05f8b37b1c7b3e9433533043cfce0c");
             case "true":
               var local_58 = x.data;
               return {database: item1({index: 3.0,object: local_45})
                      ,host: item1({index: 1.0,object: local_56})
                      ,password: item1({index: 0.0,object: local_56})
                      ,port: parseInt(item1({index: 2.0,object: local_53}))
                      ,user: item1({index: 0.0,object: local_53})};
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
var pestovalDb = _3b_({infixl: environment(rts.bytesFromAscii("DATABASE_URL"))
                      ,infixr: function (local_1) {
                         return connect(function () {
                                var x = local_1;
                                switch (x.tag)
                                {
                                  case "just":
                                    var local_2 = x.data;
                                    return parseDatabaseUrl(local_2);
                                  case "nothing":
                                    var local_65 = x.data;
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
   return map({stream: _2e__2e_({start: 0.0,stop: length3})
              ,mapping: function (local_75) {
                 return item1({index: local_75,object: __array1});
              }});
};
var _2264_ = rts.builtins.Prelude["<="];
var drop = function (local_76) {
   var x = _2264_({infixl: local_76.count,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_77 = x.data;
       var x = local_76.stream;
       switch (x.tag)
       {
         case "nonEmpty":
           var local_78 = x.data;
           return drop({stream: local_78.tail({})
                       ,count: _2d_({infixl: local_76.count,infixr: 1.0})});
         case "empty":
           var local_79 = x.data;
           return {tag: "empty",data: {}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_efdcd00625534eb5b480c13776995953"
                                        ,"3484afddcc5745189195b1b977bc31a4");
       }
     case "true":
       var local_80 = x.data;
       return local_76.stream;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_efdcd00625534eb5b480c13776995953"
                                    ,"f4402d1f89754f369b736a668f8d2784");
   }
};
var _2b__2b_2 = function (local_91) {
   return foldLazy({stream: local_91.infixl
                   ,initial: local_91.infixr
                   ,binop: function (local_92) {
                      return {tag: "nonEmpty"
                             ,data: {head: local_92.item,tail: local_92.rest}};
                   }});
};
var toBytes = rts.builtins.Bytes["fromArray"];
var _2b__2b_1 = function (local_89) {
   return toBytes(toArray(_2b__2b_2({infixl: fromBytes(local_89.a)
                                    ,infixr: function (local_90) {
                                       return fromBytes(local_89.b);
                                    }})));
};
var _2b__2b_ = function (local_88) { return _2b__2b_1({a: local_88.a,b: local_88.b});};
var httpNotFound404 = function (local_87) {
   return {content: {__data: _2b__2b_({a: rts.bytesFromAscii("Not found: "),b: local_87})
                    ,mimeType: rts.bytesFromAscii("text/plain")}
          ,status: {message: rts.bytesFromAscii("Not Found"),code: 404.0}};
};
var query = rts.builtins.IO.database.postgres["query"];
var _7c__7c_ = function (local_105) {
   var x = local_105.infixl;
   switch (x.tag)
   {
     case "false":
       return local_105.infixr(x.data);
     case "true":
       var local_106 = x.data;
       return {tag: "true",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_dff4e86e63c54fab8b58ab3fe7e440ad"
                                    ,"cc82dca9551140c9af0084b786718cc5");
   }
};
var anyOf = function (local_102) {
   return foldLazy({stream: local_102.stream
                   ,initial: function (local_103) {
                      return {tag: "false",data: {}};
                   }
                   ,binop: function (local_104) {
                      return _7c__7c_({infixl: local_102.satisfy(local_104.item)
                                      ,infixr: local_104.rest});
                   }});
};
var pestovalAuth = function (local_97) {
   return _3b_({infixl: query({database: local_97.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT pestoval_teacher.id, pestoval_teacher.is_admin\nFROM pestoval_teacher\nWHERE pestoval_teacher.password = \'")
                                                             ,b: local_97.password})
                                                ,b: rts.bytesFromAscii("\'")})})
               ,infixr: function (x98) {
                  switch (x98.tag)
                  {
                    case "error":
                      var local_99 = x98.data;
                      return ignoreError(local_99);
                    case "success":
                      var local_100 = x98.data;
                      return __return(function () {
                             var x = anyOf({stream: fromArray(local_100.__data)
                                           ,satisfy: function (local_101) {
                                              return _3d__3d_({infixl: item1({index: 1.0
                                                                             ,object: local_101})
                                                              ,infixr: rts.bytesFromAscii("true")});
                                           }});
                             switch (x.tag)
                             {
                               case "false":
                                 var local_107 = x.data;
                                 var x = anyOf({stream: fromArray(local_100.__data)
                                               ,satisfy: function (local_108) {
                                                  var teacher = parseInt(item1({index: 0.0
                                                                               ,object: local_108}));
                                                  return anyOf({stream: fromArray(local_97.teachers)
                                                               ,satisfy: function (local_109) {
                                                                  return _3d__3d_({infixl: local_109.id
                                                                                  ,infixr: teacher});
                                                               }});
                                               }});
                                 switch (x.tag)
                                 {
                                   case "false":
                                     var local_110 = x.data;
                                     return {tag: "unauthorized",data: {}};
                                   case "true":
                                     var local_111 = x.data;
                                     return {tag: "teacher1",data: {}};
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                                  ,"63099f6a8ec233abc1896a5e6518eaf6");
                                 }
                               case "true":
                                 var local_112 = x.data;
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
var _2f__2f_ = rts.builtins.Prelude["div"];
var _2260_ = rts.builtins.Prelude["/="];
var _25_ = rts.builtins.Prelude["mod"];
var digitsLittleEndian = function (local_120) {
   return map({stream: take({stream: iterate({initial: local_120.__number
                                             ,next: function (local_121) {
                                                return _2f__2f_({infixl: local_121
                                                                ,infixr: local_120.base});
                                             }})
                            ,__while: function (local_122) {
                               return _2260_({infixl: local_122,infixr: 0.0});
                            }})
              ,mapping: function (local_123) {
                 return _25_({infixl: local_123,infixr: local_120.base});
              }});
};
var reverse = function (stream3) {
   return fold({stream: stream3
               ,initial: {tag: "empty",data: {}}
               ,binop: function (local_124) {
                  return {tag: "nonEmpty"
                         ,data: {head: local_124.item
                                ,tail: function (local_125) {
                                   return local_124.acc;
                                }}};
               }});
};
var showNum = function (local_118) {
   var x = _3d__3d_({infixl: local_118,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_119 = x.data;
       return toBytes(toArray(map({stream: reverse(digitsLittleEndian({__number: local_118
                                                                      ,base: 10.0}))
                                  ,mapping: function (local_126) {
                                     return _2b_({infixl: 48.0,infixr: local_126});
                                  }})));
     case "true":
       var local_127 = x.data;
       return rts.bytesFromAscii("0");
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8dc07f8cc25f46b2bd345789b6a59f4d"
                                    ,"39f9fdd2b9889a256be50861539f39e5");
   }
};
var concat = function (stream4) {
   return foldLazy({stream: stream4
                   ,initial: function (local_142) {
                      return {tag: "empty",data: {}};
                   }
                   ,binop: function (local_143) {
                      return _2b__2b_2({infixl: local_143.item,infixr: local_143.rest});
                   }});
};
var intersperse = function (local_136) {
   var x = local_136.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_137 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_137.head
                     ,tail: function (local_138) {
                        return concat(map({stream: local_137.tail({})
                                          ,mapping: function (local_139) {
                                             return {tag: "nonEmpty"
                                                    ,data: {head: local_136.item
                                                           ,tail: function (local_140) {
                                                              return {tag: "nonEmpty"
                                                                     ,data: {head: local_139
                                                                            ,tail: function (local_141) {
                                                                               return {tag: "empty"
                                                                                      ,data: {}};
                                                                            }}};
                                                           }}};
                                          }}));
                     }}};
     case "empty":
       var local_144 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_579c35851cfc4b5aa7495fd3f68d64f9"
                                    ,"7e436409026e4dd49fb7d2389f2caa1d");
   }
};
var concat2 = function (stream6) {
   return toBytes(toArray(concat(map({stream: stream6,mapping: fromBytes}))));
};
var concat1 = concat2;
var join = function (local_135) {
   return concat1(intersperse({stream: local_135.texts,item: local_135.seperator}));
};
var id1 = function (__x) { return __x;};
var maybe = function (local_161) {
   var x = local_161.object;
   switch (x.tag)
   {
     case "just":
       return id1(x.data);
     case "nothing":
       var local_162 = x.data;
       return local_161.or;
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
       var local_154 = x.data;
       return function (local_155) {
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: local_155.table
                                                        ,b: rts.bytesFromAscii(".")})
                                           ,b: local_155.field})
                              ,b: function () {
                                 var x = local_155.as;
                                 switch (x.tag)
                                 {
                                   case "just":
                                     var local_156 = x.data;
                                     return _2b__2b_({a: rts.bytesFromAscii(" AS ")
                                                     ,b: local_156});
                                   case "nothing":
                                     var local_157 = x.data;
                                     return rts.bytesFromAscii("");
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                                                  ,"601b6d53f526392df53d629ee0c2ad71");
                                 }
                              }()});
           };
     case "hebrew":
       var local_158 = x.data;
       return function (local_159) {
              var local_160 = _2b__2b_({a: _2b__2b_({a: local_159.table
                                                    ,b: rts.bytesFromAscii(".")})
                                       ,b: local_159.field});
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("COALESCE(NULLIF(")
                                                                                  ,b: local_160})
                                                                     ,b: rts.bytesFromAscii("_hebrew, \'\'), ")})
                                                        ,b: local_160})
                                           ,b: rts.bytesFromAscii(") AS ")})
                              ,b: maybe({object: local_159.as,or: local_159.field})});
           };
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                    ,"77f1ffdc76bae5c4dbaf326aa2ff70a2");
   }
};
var pestovalQuerySessionsSql = function (local_147) {
   return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id,\n  pestoval_timeslot.id AS timeslot_id, pestoval_timeslot.start, pestoval_timeslot.stop,\n  pestoval_location.id AS location_id,\n  pestoval_level.id AS level_id, pestoval_level.color,")
                                ,infixr: function (local_148) {
                                   return _3a__3a_({infixl: join({texts: map({stream: _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                        ,field: rts.bytesFromAscii("name")
                                                                                                        ,as: {tag: "just"
                                                                                                             ,data: rts.bytesFromAscii("session_name")}}
                                                                                               ,infixr: function (local_149) {
                                                                                                  return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                           ,field: rts.bytesFromAscii("description")
                                                                                                                           ,as: {tag: "nothing"
                                                                                                                                ,data: {}}}
                                                                                                                  ,infixr: function (local_150) {
                                                                                                                     return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                                              ,field: rts.bytesFromAscii("prereqs")
                                                                                                                                              ,as: {tag: "nothing"
                                                                                                                                                   ,data: {}}}
                                                                                                                                     ,infixr: function (local_151) {
                                                                                                                                        return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_location")
                                                                                                                                                                 ,field: rts.bytesFromAscii("name")
                                                                                                                                                                 ,as: {tag: "just"
                                                                                                                                                                      ,data: rts.bytesFromAscii("location_name")}}
                                                                                                                                                        ,infixr: function (local_152) {
                                                                                                                                                           return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_level")
                                                                                                                                                                                    ,field: rts.bytesFromAscii("name")
                                                                                                                                                                                    ,as: {tag: "just"
                                                                                                                                                                                         ,data: rts.bytesFromAscii("level_name")}}
                                                                                                                                                                           ,infixr: function (local_153) {
                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                           }});
                                                                                                                                                        }});
                                                                                                                                     }});
                                                                                                                  }});
                                                                                               }})
                                                                             ,mapping: queryFieldLang(local_147.language2)})
                                                                 ,seperator: rts.bytesFromAscii(", ")})
                                                   ,infixr: function (local_163) {
                                                      return _3a__3a_({infixl: local_147.from
                                                                      ,infixr: function (local_164) {
                                                                         return _2b__2b_2({infixl: map({stream: _3a__3a_({infixl: {key: rts.bytesFromAscii("when_id")
                                                                                                                                  ,table: rts.bytesFromAscii("pestoval_timeslot")}
                                                                                                                         ,infixr: function (local_165) {
                                                                                                                            return _3a__3a_({infixl: {key: rts.bytesFromAscii("location_id")
                                                                                                                                                     ,table: rts.bytesFromAscii("pestoval_location")}
                                                                                                                                            ,infixr: function (local_166) {
                                                                                                                                               return _3a__3a_({infixl: {key: rts.bytesFromAscii("level_id")
                                                                                                                                                                        ,table: rts.bytesFromAscii("pestoval_level")}
                                                                                                                                                               ,infixr: function (local_167) {
                                                                                                                                                                  return {tag: "empty"
                                                                                                                                                                         ,data: {}};
                                                                                                                                                               }});
                                                                                                                                            }});
                                                                                                                         }})
                                                                                                       ,mapping: function (local_168) {
                                                                                                          return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("LEFT OUTER JOIN ")
                                                                                                                                       ,infixr: function (local_169) {
                                                                                                                                          return _3a__3a_({infixl: local_168.table
                                                                                                                                                          ,infixr: function (local_170) {
                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(" ON pestoval_session.")
                                                                                                                                                                             ,infixr: function (local_171) {
                                                                                                                                                                                return _3a__3a_({infixl: local_168.key
                                                                                                                                                                                                ,infixr: function (local_172) {
                                                                                                                                                                                                   return _3a__3a_({infixl: rts.bytesFromAscii(" = ")
                                                                                                                                                                                                                   ,infixr: function (local_173) {
                                                                                                                                                                                                                      return _3a__3a_({infixl: local_168.table
                                                                                                                                                                                                                                      ,infixr: function (local_174) {
                                                                                                                                                                                                                                         return _3a__3a_({infixl: rts.bytesFromAscii(".id")
                                                                                                                                                                                                                                                         ,infixr: function (local_175) {
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
                                                                                          ,infixr: function (local_176) {
                                                                                             return _2b__2b_2({infixl: function () {
                                                                                                                 var x =
                                                                                                                 _3d__3d_({infixl: local_147.where
                                                                                                                          ,infixr: rts.bytesFromAscii("")});
                                                                                                                 switch (x.tag)
                                                                                                                 {
                                                                                                                   case "false":
                                                                                                                     var local_177 =
                                                                                                                     x.data;
                                                                                                                     return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("WHERE ")
                                                                                                                                                       ,b: local_147.where})
                                                                                                                                     ,infixr: function (local_178) {
                                                                                                                                        return {tag: "empty"
                                                                                                                                               ,data: {}};
                                                                                                                                     }});
                                                                                                                   case "true":
                                                                                                                     var local_179 =
                                                                                                                     x.data;
                                                                                                                     return {tag: "empty"
                                                                                                                            ,data: {}};
                                                                                                                   default:
                                                                                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                  ,"DEF_140efbae773e4fea9f554e346c7b58e8"
                                                                                                                                                  ,"f573ad31abd803e9dda9e82ec3ef4df2");
                                                                                                                 }
                                                                                                              }()
                                                                                                              ,infixr: function (local_180) {
                                                                                                                 return _3a__3a_({infixl: rts.bytesFromAscii("ORDER BY pestoval_timeslot.start, pestoval_location.id")
                                                                                                                                 ,infixr: function (local_181) {
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
var newMutArray1 = function (stream7) {
   return _3b_({infixl: newMutArray
               ,infixr: function (__array2) {
                  return _3b_({infixl: sequence__(map({stream: stream7
                                                      ,mapping: function (item2) {
                                                         return appendMutArray({object: __array2
                                                                               ,value: item2});
                                                      }}))
                              ,infixr: function (local_192) {
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
var sort1 = function (local_194) {
   var x = _2265_({infixl: _2b_({infixl: local_194.start,infixr: 1.0})
                  ,infixr: local_194.stop});
   switch (x.tag)
   {
     case "false":
       var local_195 = x.data;
       return _3b_({infixl: readMutArray({index: local_194.start
                                         ,object: local_194.__array4})
                   ,infixr: function (pivot) {
                      return _3b_({infixl: newMutRef(local_194.start)
                                  ,infixr: function (pivotPosRef) {
                                     return _3b_({infixl: sequence__(map({stream: _2e__2e_({start: _2b_({infixl: local_194.start
                                                                                                        ,infixr: 1.0})
                                                                                           ,stop: local_194.stop})
                                                                         ,mapping: function (index1) {
                                                                            return _3b_({infixl: readMutArray({index: index1
                                                                                                              ,object: local_194.__array4})
                                                                                        ,infixr: function (object1) {
                                                                                           var x =
                                                                                           local_194._3c_1({infixl: object1
                                                                                                           ,infixr: pivot});
                                                                                           switch (x.tag)
                                                                                           {
                                                                                             case "false":
                                                                                               var local_196 =
                                                                                               x.data;
                                                                                               return __return({});
                                                                                             case "true":
                                                                                               var local_197 =
                                                                                               x.data;
                                                                                               return _3b_({infixl: readMutRef(pivotPosRef)
                                                                                                           ,infixr: function (pivotPos) {
                                                                                                              return _3b_({infixl: writeMutArray({index: pivotPos
                                                                                                                                                 ,object: local_194.__array4
                                                                                                                                                 ,value: object1})
                                                                                                                          ,infixr: function (local_198) {
                                                                                                                             var newPivotPos =
                                                                                                                             _2b_({infixl: pivotPos
                                                                                                                                  ,infixr: 1.0});
                                                                                                                             return _3b_({infixl: writeMutRef({object: pivotPosRef
                                                                                                                                                              ,value: newPivotPos})
                                                                                                                                         ,infixr: function (local_199) {
                                                                                                                                            return _3b_({infixl: readMutArray({index: newPivotPos
                                                                                                                                                                              ,object: local_194.__array4})
                                                                                                                                                        ,infixr: function (local_200) {
                                                                                                                                                           return writeMutArray({index: index1
                                                                                                                                                                                ,object: local_194.__array4
                                                                                                                                                                                ,value: local_200});
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
                                                 ,infixr: function (local_201) {
                                                    return _3b_({infixl: readMutRef(pivotPosRef)
                                                                ,infixr: function (index2) {
                                                                   return _3b_({infixl: writeMutArray({index: index2
                                                                                                      ,object: local_194.__array4
                                                                                                      ,value: pivot})
                                                                               ,infixr: function (local_202) {
                                                                                  return _3b_({infixl: sort1({start: local_194.start
                                                                                                             ,stop: index2
                                                                                                             ,_3c_1: local_194._3c_1
                                                                                                             ,__array4: local_194.__array4})
                                                                                              ,infixr: function (local_203) {
                                                                                                 return sort1({start: _2b_({infixl: index2
                                                                                                                           ,infixr: 1.0})
                                                                                                              ,stop: local_194.stop
                                                                                                              ,_3c_1: local_194._3c_1
                                                                                                              ,__array4: local_194.__array4});
                                                                                              }});
                                                                               }});
                                                                }});
                                                 }});
                                  }});
                   }});
     case "true":
       var local_204 = x.data;
       return __return({});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_7dc48073b9e642f0921b10b11676f38b"
                                    ,"767c3133b4f8a61071c98bc4f445f9a6");
   }
};
var sort = function (local_191) {
   return runMutArray(_3b_({infixl: newMutArray1(local_191.stream)
                           ,infixr: function (__array3) {
                              return _3b_({infixl: length4(__array3)
                                          ,infixr: function (local_193) {
                                             return _3b_({infixl: sort1({start: 0.0
                                                                        ,stop: local_193
                                                                        ,_3c_1: local_191._3c_1
                                                                        ,__array4: __array3})
                                                         ,infixr: function (local_205) {
                                                            return __return(__array3);
                                                         }});
                                          }});
                           }}));
};
var foldLazy1 = function (local_221) {
   return foldLazy({stream: local_221.stream
                   ,initial: function (local_222) {
                      return local_221.done;
                   }
                   ,binop: function (local_223) {
                      return function (state1) {
                             return local_221.step({state: state1
                                                   ,rest: local_223.rest
                                                   ,item: local_223.item});
                          };
                   }})(local_221.initialState);
};
var group = function (local_207) {
   return foldLazy1({stream: local_207.stream
                    ,initialState: {tag: "empty",data: {}}
                    ,step: function (local_208) {
                       var x = local_208.state;
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_209 = x.data;
                           var x = local_207.by({infixl: local_209.head
                                                ,infixr: local_208.item});
                           switch (x.tag)
                           {
                             case "false":
                               var local_210 = x.data;
                               return _3a__3a_({infixl: toArray(reverse(local_208.state))
                                               ,infixr: function (local_211) {
                                                  return local_208.rest({})(_3a__3a_({infixl: local_208.item
                                                                                     ,infixr: function (local_212) {
                                                                                        return {tag: "empty"
                                                                                               ,data: {}};
                                                                                     }}));
                                               }});
                             case "true":
                               var local_213 = x.data;
                               return local_208.rest({})(_3a__3a_({infixl: local_208.item
                                                                  ,infixr: function (local_214) {
                                                                     return local_208.state;
                                                                  }}));
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                            ,"80c64c4a3e825d563e72c3ff848be12a");
                           }
                         case "empty":
                           var local_215 = x.data;
                           return local_208.rest({})(_3a__3a_({infixl: local_208.item
                                                              ,infixr: function (local_216) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }}));
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                        ,"74a01a012e28a30393aafbb0e69c22f4");
                       }
                    }
                    ,done: function (local_217) {
                       var x = local_217;
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_218 = x.data;
                           return _3a__3a_({infixl: toArray(reverse(local_217))
                                           ,infixr: function (local_219) {
                                              return {tag: "empty",data: {}};
                                           }});
                         case "empty":
                           var local_220 = x.data;
                           return {tag: "empty",data: {}};
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                        ,"44a912bc33ec9c258e1ba58d8731bdd8");
                       }
                    }});
};
var pestovalQuerySessionTeachers = function (local_185) {
   return _3b_({infixl: query({database: local_185.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_session_teachers.teacher_id, pestoval_session_teachers.session_id,\n  ")
                                                             ,b: queryFieldLang(local_185.language2)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_teacher ON pestoval_session_teachers.teacher_id = pestoval_teacher.id")})})
               ,infixr: function (x186) {
                  switch (x186.tag)
                  {
                    case "error":
                      var local_187 = x186.data;
                      return ignoreError(local_187);
                    case "success":
                      var local_188 = x186.data;
                      return __return(toArray(map({stream: group({stream: fromArray(sort({stream: map({stream: fromArray(local_188.__data)
                                                                                                      ,mapping: function (local_189) {
                                                                                                         return {teacher1: {name: item1({index: 2.0
                                                                                                                                        ,object: local_189})
                                                                                                                           ,id: parseInt(item1({index: 0.0
                                                                                                                                               ,object: local_189}))}
                                                                                                                ,session: parseInt(item1({index: 1.0
                                                                                                                                         ,object: local_189}))};
                                                                                                      }})
                                                                                         ,_3c_1: function (local_190) {
                                                                                            return _3c_({infixl: local_190.infixl.session
                                                                                                        ,infixr: local_190.infixr.session});
                                                                                         }}))
                                                                 ,by: function (local_206) {
                                                                    return _3d__3d_({infixl: local_206.infixl.session
                                                                                    ,infixr: local_206.infixr.session});
                                                                 }})
                                                  ,mapping: function (local_224) {
                                                     return {value: toArray(map({stream: fromArray(local_224)
                                                                                ,mapping: function (local_225) {
                                                                                   return local_225.teacher1;
                                                                                }}))
                                                            ,key: item1({index: 0.0
                                                                        ,object: local_224}).session};
                                                  }})));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_de80144d74df47438852d18bad3b3eaf"
                                                   ,"9800f3fc1326d8ea5b4af24b15b823d4");
                  }
               }});
};
var _3e__3d__3c_ = function (local_232) {
   var x = _3d__3d_({infixl: local_232.__x1,infixr: local_232.y});
   switch (x.tag)
   {
     case "false":
       var local_233 = x.data;
       var x = _3c_({infixl: local_232.__x1,infixr: local_232.y});
       switch (x.tag)
       {
         case "false":
           var local_234 = x.data;
           return {tag: "_3e_1",data: {}};
         case "true":
           var local_235 = x.data;
           return {tag: "_3c_1",data: {}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_710304e7117b480ba76d20139b3980c1"
                                        ,"b36d82ac26521ea940b13add4c373a2c");
       }
     case "true":
       var local_236 = x.data;
       return {tag: "_3d__3d_1",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_710304e7117b480ba76d20139b3980c1"
                                    ,"508e7c4e652cf07b779c96cd2344172c");
   }
};
var _2f_ = rts.builtins.Prelude["/"];
var floor = function (local_240) {
   return _2d_({infixl: local_240,infixr: _25_({infixl: local_240,infixr: 1.0})});
};
var search1 = function (local_238) {
   var x = _2265_({infixl: local_238.start,infixr: local_238.stop});
   switch (x.tag)
   {
     case "false":
       var local_239 = x.data;
       var pivot1 = floor(_2f_({infixl: _2b_({infixl: local_238.start
                                             ,infixr: local_238.stop})
                               ,infixr: 2.0}));
       var x = local_238.compareTo(pivot1);
       switch (x.tag)
       {
         case "_3e_1":
           var local_241 = x.data;
           return search1({start: _2b_({infixl: pivot1,infixr: 1.0})
                          ,stop: local_238.stop
                          ,compareTo: local_238.compareTo});
         case "_3c_1":
           var local_242 = x.data;
           return search1({start: local_238.start
                          ,stop: pivot1
                          ,compareTo: local_238.compareTo});
         case "_3d__3d_1":
           var local_243 = x.data;
           return {tag: "just",data: pivot1};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                        ,"c6c8b9c428c0b8b42ffc038b0554d06b");
       }
     case "true":
       var local_244 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                    ,"c22774ac01ba95da7d4aa96a5694962d");
   }
};
var search = function (local_237) {
   return search1({start: 0.0
                  ,stop: length1(local_237.sorted)
                  ,compareTo: function (index4) {
                     return local_237.compareTo(item1({index: index4
                                                      ,object: local_237.sorted}));
                  }});
};
var lookup = function (local_230) {
   var x = search({compareTo: function (local_231) {
                     return _3e__3d__3c_({y: local_231.key,__x1: local_230.key});
                  }
                  ,sorted: local_230.sorted});
   switch (x.tag)
   {
     case "just":
       var index5 = x.data;
       return {tag: "just",data: item1({index: index5,object: local_230.sorted}).value};
     case "nothing":
       var local_245 = x.data;
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
var index6 = function (local_254) {
   var x = first({that: function (index7) {
                    return _3d__3d_({infixl: item1({index: index7
                                                   ,object: local_254.__array4})
                                    ,infixr: local_254.item});
                 }
                 ,stream: _2e__2e_({start: 0.0,stop: length1(local_254.__array4)})});
   switch (x.tag)
   {
     case "just":
       return id1(x.data);
     case "nothing":
       var local_255 = x.data;
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
var parseDateTime = function (text1) {
   var local_247 = toArray(split({text: text1,seperator: rts.bytesFromAscii(" ")}));
   var item4 = function (local_248) {
      return item1({index: local_248,object: local_247});
   };
   var local_249 = toArray(split({text: item4(4.0),seperator: rts.bytesFromAscii(":")}));
   var local_251 = function (local_250) {
      return parseInt(item1({index: local_250,object: local_249}));
   };
   return {time: {timezone: unwords(_3a__3a_({infixl: item4(5.0)
                                             ,infixr: function (local_252) {
                                                return _3a__3a_({infixl: item4(6.0)
                                                                ,infixr: function (local_253) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }}))
                 ,minute: local_251(1.0)
                 ,second: local_251(2.0)
                 ,hour: local_251(0.0)}
          ,date: {weekDay: _2b_({infixl: index6({__array4: dayNames,item: item4(0.0)})
                                ,infixr: 1.0})
                 ,month: _2b_({infixl: index6({__array4: monthNames,item: item4(1.0)})
                              ,infixr: 1.0})
                 ,day: parseInt(item4(2.0))
                 ,year: parseInt(item4(3.0))}};
};
var pestovalQuerySessions = function (local_116) {
   var local_130 = function () {
                      var x = local_116.teacher1;
                      switch (x.tag)
                      {
                        case "just":
                          var local_117 = x.data;
                          return {where: _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("pestoval_session_teachers.teacher_id = ")
                                                                    ,b: showNum(local_117)})
                                                  ,infixr: function (local_128) {
                                                     return {tag: "empty",data: {}};
                                                  }})
                                 ,from: rts.bytesFromAscii("FROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_session ON pestoval_session_teachers.session_id = pestoval_session.id")};
                        case "nothing":
                          var local_129 = x.data;
                          return {where: {tag: "empty",data: {}}
                                 ,from: rts.bytesFromAscii("FROM pestoval_session")};
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                       ,"c83b0d9e623697d989e5a09fb1c59c4f");
                      }
                   }();
   return _3b_({infixl: query({database: local_116.database
                              ,object: pestovalQuerySessionsSql({where: join({texts: _2b__2b_2({infixl: local_130.where
                                                                                               ,infixr: function (local_131) {
                                                                                                  var x =
                                                                                                  local_116.filter;
                                                                                                  switch (x.tag)
                                                                                                  {
                                                                                                    case "just":
                                                                                                      var local_132 =
                                                                                                      x.data;
                                                                                                      return _3a__3a_({infixl: local_132
                                                                                                                      ,infixr: function (local_133) {
                                                                                                                         return {tag: "empty"
                                                                                                                                ,data: {}};
                                                                                                                      }});
                                                                                                    case "nothing":
                                                                                                      var local_134 =
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
                                                                ,from: local_130.from
                                                                ,language2: local_116.language2})})
               ,infixr: function (x182) {
                  switch (x182.tag)
                  {
                    case "error":
                      var local_183 = x182.data;
                      return ignoreError(local_183);
                    case "success":
                      var local_184 = x182.data;
                      return _3b_({infixl: pestovalQuerySessionTeachers({database: local_116.database
                                                                        ,language2: local_116.language2})
                                  ,infixr: function (teachers1) {
                                     var field1 = function (local_226) {
                                        var x = first({that: function (index3) {
                                                         return _3d__3d_({infixl: item1({index: index3
                                                                                        ,object: local_184.fields})
                                                                         ,infixr: local_226});
                                                      }
                                                      ,stream: _2e__2e_({start: 0.0
                                                                        ,stop: length1(local_184.fields)})});
                                        switch (x.tag)
                                        {
                                          case "just":
                                            return id1(x.data);
                                          case "nothing":
                                            var local_227 = x.data;
                                            throw rts.exceptions.ReachedHole("Reached a hole"
                                                                            ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                            ,"a8dea6e428906f6970698acdd1c10cbd");
                                          default:
                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                         ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                         ,"ca9c646dae236b23539d3c03280dc8af");
                                        }
                                     };
                                     var session1 = field1(rts.bytesFromAscii("id"));
                                     var when =
                                     {start: field1(rts.bytesFromAscii("start"))
                                     ,stop: field1(rts.bytesFromAscii("stop"))
                                     ,id: field1(rts.bytesFromAscii("timeslot_id"))};
                                     var name1 =
                                     field1(rts.bytesFromAscii("session_name"));
                                     var level =
                                     {name: field1(rts.bytesFromAscii("level_name"))
                                     ,id: field1(rts.bytesFromAscii("level_id"))
                                     ,color: field1(rts.bytesFromAscii("color"))};
                                     var place =
                                     {name: field1(rts.bytesFromAscii("location_name"))
                                     ,id: field1(rts.bytesFromAscii("location_id"))};
                                     var description =
                                     field1(rts.bytesFromAscii("description"));
                                     var prereqs = field1(rts.bytesFromAscii("prereqs"));
                                     return __return(toArray(map({stream: fromArray(local_184.__data)
                                                                 ,mapping: function (local_228) {
                                                                    var item3 =
                                                                    function (local_229) {
                                                                       return item1({index: local_229
                                                                                    ,object: local_228});
                                                                    };
                                                                    var id2 =
                                                                    parseInt(item3(session1));
                                                                    return {prereqs1: item3(prereqs)
                                                                           ,name: item3(name1)
                                                                           ,place1: {name: item3(place.name)
                                                                                    ,id: parseInt(item3(place.id))}
                                                                           ,description1: item3(description)
                                                                           ,teachers: function () {
                                                                              var x =
                                                                              lookup({key: id2
                                                                                     ,sorted: teachers1});
                                                                              switch (x.tag)
                                                                              {
                                                                                case "just":
                                                                                  return id1(x.data);
                                                                                case "nothing":
                                                                                  var local_246 =
                                                                                  x.data;
                                                                                  return [];
                                                                                default:
                                                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                               ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                                                               ,"4727001e8f10c93cea88012dc24e67a0");
                                                                              }
                                                                           }()
                                                                           ,id: id2
                                                                           ,when1: {start: parseDateTime(item3(when.start))
                                                                                   ,stop: parseDateTime(item3(when.stop))
                                                                                   ,id: parseInt(item3(when.id))}
                                                                           ,level1: {name: item3(level.name)
                                                                                    ,id: parseInt(item3(level.id))
                                                                                    ,color: item3(level.color)}};
                                                                 }})));
                                  }});
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                   ,"b7f232d070f067bfe76ad6b4679cb4aa");
                  }
               }});
};
var _22f2_ = function (local_259) {
   return {root: local_259.infixl,subTrees: local_259.infixr};
};
var leaf = function (local_258) { return _22f2_({infixl: local_258,infixr: []});};
var singleton = function (local_260) { return [local_260];};
var htmlParagraph = function (text2) {
   return _22f2_({infixl: rts.bytesFromAscii("<p>"),infixr: singleton(leaf(text2))});
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
var replicate = function (local_322) {
   var x = _2264_({infixl: local_322.count,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_323 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_322.item
                     ,tail: function (local_324) {
                        return replicate({count: _2d_({infixl: local_322.count
                                                      ,infixr: 1.0})
                                         ,item: local_322.item});
                     }}};
     case "true":
       var local_325 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_70f79762f05c41ccb9677f7a60746680"
                                    ,"3b53ee6d875f49f4acdb9a2e8b33fb2d");
   }
};
var rightJustify = function (local_320) {
   var count1 = _2d_({infixl: local_320.length5,infixr: length(local_320.text)});
   var x = _2264_({infixl: count1,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_321 = x.data;
       return _2b__2b_({a: toBytes(toArray(replicate({count: count1
                                                     ,item: local_320.character})))
                       ,b: local_320.text});
     case "true":
       var local_326 = x.data;
       return local_320.text;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_c96ce62be72e4d1e85d07af16867169d"
                                    ,"ea6106b4e471dead7c7d3638866db4a1");
   }
};
var showTime = function (local_316) {
   return join({texts: map({stream: _3a__3a_({infixl: local_316.hour
                                             ,infixr: function (local_317) {
                                                return _3a__3a_({infixl: local_316.minute
                                                                ,infixr: function (local_318) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }})
                           ,mapping: function (local_319) {
                              return rightJustify({length5: 2.0
                                                  ,text: showNum(local_319)
                                                  ,character: 48.0});
                           }})
               ,seperator: rts.bytesFromAscii(":")});
};
var formatTimeSlot = function (local_312) {
   return join({texts: _3a__3a_({infixl: item1({index: _2d_({infixl: local_312.timeSlot.start.date.weekDay
                                                            ,infixr: 1.0})
                                               ,object: function () {
                                                  var x = local_312.language2;
                                                  switch (x.tag)
                                                  {
                                                    case "english":
                                                      var local_313 = x.data;
                                                      return dayNames;
                                                    case "hebrew":
                                                      var local_314 = x.data;
                                                      return dayNamesHebrew;
                                                    default:
                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                   ,"DEF_4fed722dd3634c0db388c78e255c1429"
                                                                                   ,"5582218e01f5831eae7835c315a758c0");
                                                  }
                                               }()})
                                ,infixr: function (local_315) {
                                   return _3a__3a_({infixl: showTime(local_312.timeSlot.start.time)
                                                   ,infixr: function (local_327) {
                                                      return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                      ,infixr: function (local_328) {
                                                                         return _3a__3a_({infixl: showTime(local_312.timeSlot.stop.time)
                                                                                         ,infixr: function (local_329) {
                                                                                            return {tag: "empty"
                                                                                                   ,data: {}};
                                                                                         }});
                                                                      }});
                                                   }});
                                }})
               ,seperator: rts.bytesFromAscii(" ")});
};
var replace = function (local_340) {
   return join({texts: split({text: local_340.text,seperator: local_340.from})
               ,seperator: local_340.to});
};
var pestovalSessionInfo = function (local_279) {
   var local_283 = function (local_280) {
      return _22f2_({infixl: rts.bytesFromAscii("<p>")
                    ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<b>")
                                     ,infixr: singleton(leaf(local_280.key))})
                             ,leaf(local_280.value)]});
   };
   var teacher2 = function (local_284) {
      return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/")
                                              ,infixr: function (local_285) {
                                                 return _3a__3a_({infixl: function () {
                                                                    var x =
                                                                    local_279.language2;
                                                                    switch (x.tag)
                                                                    {
                                                                      case "english":
                                                                        var local_286 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("eng");
                                                                      case "hebrew":
                                                                        var local_287 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("heb");
                                                                      default:
                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                     ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                     ,"25c06dfd8f7a82ef041d5e079e02e218");
                                                                    }
                                                                 }()
                                                                 ,infixr: function (local_288) {
                                                                    return _3a__3a_({infixl: rts.bytesFromAscii("/teacher/")
                                                                                    ,infixr: function (local_289) {
                                                                                       return _3a__3a_({infixl: showNum(local_284.id)
                                                                                                       ,infixr: function (local_290) {
                                                                                                          return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                          ,infixr: function (local_291) {
                                                                                                                             return {tag: "empty"
                                                                                                                                    ,data: {}};
                                                                                                                          }});
                                                                                                       }});
                                                                                    }});
                                                                 }});
                                              }}))
                    ,infixr: singleton(leaf(local_284.name))});
   };
   return toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                           ,infixr: function () {
                                              var x =
                                              fromArray(local_279.session.teachers);
                                              switch (x.tag)
                                              {
                                                case "nonEmpty":
                                                  var local_292 = x.data;
                                                  return toArray(_3a__3a_({infixl: teacher2(local_292.head)
                                                                          ,infixr: function (local_293) {
                                                                             return _2b__2b_2({infixl: concat(map({stream: local_292.tail({})
                                                                                                                  ,mapping: function (local_294) {
                                                                                                                     return _3a__3a_({infixl: leaf(function () {
                                                                                                                                        var x =
                                                                                                                                        local_279.language2;
                                                                                                                                        switch (x.tag)
                                                                                                                                        {
                                                                                                                                          case "english":
                                                                                                                                            var local_295 =
                                                                                                                                            x.data;
                                                                                                                                            return rts.bytesFromAscii(" & ");
                                                                                                                                          case "hebrew":
                                                                                                                                            var local_296 =
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
                                                                                                                                     ,infixr: function (local_297) {
                                                                                                                                        return _3a__3a_({infixl: teacher2(local_294)
                                                                                                                                                        ,infixr: function (local_298) {
                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                  ,data: {}};
                                                                                                                                                        }});
                                                                                                                                     }});
                                                                                                                  }}))
                                                                                              ,infixr: function (local_299) {
                                                                                                 return _3a__3a_({infixl: leaf(_2b__2b_({a: rts.bytesFromAscii(": ")
                                                                                                                                        ,b: local_279.session.name}))
                                                                                                                 ,infixr: function (local_300) {
                                                                                                                    return {tag: "empty"
                                                                                                                           ,data: {}};
                                                                                                                 }});
                                                                                              }});
                                                                          }}));
                                                case "empty":
                                                  var local_301 = x.data;
                                                  return singleton(leaf(local_279.session.name));
                                                default:
                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                               ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                               ,"ed7be6bad9f71095a62be6746bf728a3");
                                              }
                                           }()})
                           ,infixr: function (local_302) {
                              return _2b__2b_2({infixl: function () {
                                                  var x = local_279.password;
                                                  switch (x.tag)
                                                  {
                                                    case "just":
                                                      var local_303 = x.data;
                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                      ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/eng/edit/")
                                                                                                                                               ,infixr: function (local_304) {
                                                                                                                                                  return _3a__3a_({infixl: showNum(local_279.session.id)
                                                                                                                                                                  ,infixr: function (local_305) {
                                                                                                                                                                     return _3a__3a_({infixl: rts.bytesFromAscii("/")
                                                                                                                                                                                     ,infixr: function (local_306) {
                                                                                                                                                                                        return _3a__3a_({infixl: local_303
                                                                                                                                                                                                        ,infixr: function (local_307) {
                                                                                                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                                                                                                                           ,infixr: function (local_308) {
                                                                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                                                                           }});
                                                                                                                                                                                                        }});
                                                                                                                                                                                     }});
                                                                                                                                                                  }});
                                                                                                                                               }})
                                                                                                                              ,seperator: rts.bytesFromAscii("")})
                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("Edit details")))}))})
                                                                      ,infixr: function (local_309) {
                                                                         return {tag: "empty"
                                                                                ,data: {}};
                                                                      }});
                                                    case "nothing":
                                                      var local_310 = x.data;
                                                      return {tag: "empty",data: {}};
                                                    default:
                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                   ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                   ,"fad3e2035a95ac24b0214f741995983a");
                                                  }
                                               }()
                                               ,infixr: function (local_311) {
                                                  return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<b>")
                                                                                  ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_279.session.when1
                                                                                                                         ,language2: local_279.language2})))})
                                                                  ,infixr: function (local_330) {
                                                                     return _3a__3a_({infixl: local_283({value: local_279.session.place1.name
                                                                                                        ,key: function () {
                                                                                                           var x =
                                                                                                           local_279.language2;
                                                                                                           switch (x.tag)
                                                                                                           {
                                                                                                             case "english":
                                                                                                               var local_331 =
                                                                                                               x.data;
                                                                                                               return rts.bytesFromAscii("Where: ");
                                                                                                             case "hebrew":
                                                                                                               var local_332 =
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
                                                                                     ,infixr: function (local_333) {
                                                                                        return _3a__3a_({infixl: local_283({value: local_279.session.level1.name
                                                                                                                           ,key: function () {
                                                                                                                              var x =
                                                                                                                              local_279.language2;
                                                                                                                              switch (x.tag)
                                                                                                                              {
                                                                                                                                case "english":
                                                                                                                                  var local_334 =
                                                                                                                                  x.data;
                                                                                                                                  return rts.bytesFromAscii("Who: ");
                                                                                                                                case "hebrew":
                                                                                                                                  var local_335 =
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
                                                                                                        ,infixr: function (local_336) {
                                                                                                           return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                           ,infixr: singleton(leaf(function () {
                                                                                                                                              var x =
                                                                                                                                              local_279.language2;
                                                                                                                                              switch (x.tag)
                                                                                                                                              {
                                                                                                                                                case "english":
                                                                                                                                                  var local_337 =
                                                                                                                                                  x.data;
                                                                                                                                                  return rts.bytesFromAscii("Description:");
                                                                                                                                                case "hebrew":
                                                                                                                                                  var local_338 =
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
                                                                                                                           ,infixr: function (local_339) {
                                                                                                                              var local_341 =
                                                                                                                              function (text3) {
                                                                                                                                 return replace({text: text3
                                                                                                                                                ,from: rts.bytesFromAscii("\n")
                                                                                                                                                ,to: rts.bytesFromAscii("<br/>\n")});
                                                                                                                              };
                                                                                                                              return _3a__3a_({infixl: htmlParagraph(local_341(local_279.session.description1))
                                                                                                                                              ,infixr: function (local_342) {
                                                                                                                                                 return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                 ,infixr: singleton(leaf(function () {
                                                                                                                                                                                    var x =
                                                                                                                                                                                    local_279.language2;
                                                                                                                                                                                    switch (x.tag)
                                                                                                                                                                                    {
                                                                                                                                                                                      case "english":
                                                                                                                                                                                        var local_343 =
                                                                                                                                                                                        x.data;
                                                                                                                                                                                        return rts.bytesFromAscii("Prereqs:");
                                                                                                                                                                                      case "hebrew":
                                                                                                                                                                                        var local_344 =
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
                                                                                                                                                                 ,infixr: function (local_345) {
                                                                                                                                                                    return _3a__3a_({infixl: htmlParagraph(local_341(local_279.session.prereqs1))
                                                                                                                                                                                    ,infixr: function (local_346) {
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
var htmlPopup = function (local_347) {
   return _22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<div id=\"")
                                                ,infixr: function (local_348) {
                                                   return _3a__3a_({infixl: local_347.id
                                                                   ,infixr: function (local_349) {
                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("\" class=\"overlay\">")
                                                                                      ,infixr: function (local_350) {
                                                                                         return {tag: "empty"
                                                                                                ,data: {}};
                                                                                      }});
                                                                   }});
                                                }})
                               ,seperator: rts.bytesFromAscii("")})
                 ,infixr: [leaf(rts.bytesFromAscii("<a class=\"cancel\" href=\"javascript:history.back()\">"))
                          ,_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<div class=\"popup\" style=\"background-color:")
                                                                 ,infixr: function (local_352) {
                                                                    return _3a__3a_({infixl: local_347.color
                                                                                    ,infixr: function (local_353) {
                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\">")
                                                                                                       ,infixr: function (local_354) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                    }});
                                                                 }})
                                                ,seperator: rts.bytesFromAscii("")})
                                  ,infixr: local_347.content})]});
};
var pestovalSessionCell = function (local_263) {
   var local_264 = _2b__2b_({a: rts.bytesFromAscii("popup-")
                            ,b: showNum(local_263.session.id)});
   var local_265 = htmlParagraph(local_263.session.place1.name);
   return _22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td style=\"background-color:")
                                                ,infixr: function (local_266) {
                                                   var color1 =
                                                   local_263.session.level1.color;
                                                   return _3a__3a_({infixl: function () {
                                                                      var x =
                                                                      _3d__3d_({infixl: color1
                                                                               ,infixr: rts.bytesFromAscii("null")});
                                                                      switch (x.tag)
                                                                      {
                                                                        case "false":
                                                                          var local_267 =
                                                                          x.data;
                                                                          return color1;
                                                                        case "true":
                                                                          var local_268 =
                                                                          x.data;
                                                                          return rts.bytesFromAscii("#eee");
                                                                        default:
                                                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                       ,"DEF_9020eea8542142a09c1a8813ef9990af"
                                                                                                       ,"8af192079f77d68114daa54992f28614");
                                                                      }
                                                                   }()
                                                                   ,infixr: function (local_269) {
                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(";")
                                                                                      ,infixr: function (local_270) {
                                                                                         return _3a__3a_({infixl: local_263.style
                                                                                                         ,infixr: function (local_271) {
                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii("\" ")
                                                                                                                            ,infixr: function (local_272) {
                                                                                                                               return _3a__3a_({infixl: local_263.attributes
                                                                                                                                               ,infixr: function (local_273) {
                                                                                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(">")
                                                                                                                                                                  ,infixr: function (local_274) {
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
                                                                 ,infixr: function (local_275) {
                                                                    return _3a__3a_({infixl: local_264
                                                                                    ,infixr: function (local_276) {
                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\" style=\"text-decoration: none; color: black;\">")
                                                                                                       ,infixr: function (local_277) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                    }});
                                                                 }})
                                                ,seperator: rts.bytesFromAscii("")})
                                  ,infixr: local_263.content})
                          ,htmlPopup({content: pestovalSessionInfo({password: local_263.password
                                                                   ,language2: local_263.language2
                                                                   ,session: local_263.session})
                                     ,id: local_264
                                     ,color: local_263.session.level1.color})]});
};
var htmlTable = function (local_357) {
   return _22f2_({infixl: _2b__2b_({a: rts.bytesFromAscii("<table width=\"100%\"")
                                   ,b: function () {
                                      var x = local_357.language2;
                                      switch (x.tag)
                                      {
                                        case "english":
                                          var local_358 = x.data;
                                          return rts.bytesFromAscii(">");
                                        case "hebrew":
                                          var local_359 = x.data;
                                          return rts.bytesFromAscii(" dir=\"rtl\">");
                                        default:
                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                       ,"DEF_c270fb6c0aee498e865b7bf936941c16"
                                                                       ,"3593d20a3691e4acedfdfbe5a1b33cdf");
                                      }
                                   }()})
                 ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<tbody>")
                                           ,infixr: local_357.body}))});
};
var pestovalManageFloating = function (local_115) {
   return _3b_({infixl: pestovalQuerySessions({database: local_115.database
                                              ,teacher1: {tag: "nothing",data: {}}
                                              ,language2: {tag: "english",data: {}}
                                              ,filter: {tag: "just"
                                                       ,data: rts.bytesFromAscii("pestoval_session.location_id IS NULL")}})
               ,infixr: function (local_256) {
                  return __return(function () {
                         var x = _3d__3d_({infixl: length1(local_256),infixr: 0.0});
                         switch (x.tag)
                         {
                           case "false":
                             var local_257 = x.data;
                             return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Floating Sessions")))})
                                             ,infixr: function (local_262) {
                                                return _3a__3a_({infixl: htmlTable({body: toArray(map({stream: fromArray(local_256)
                                                                                                      ,mapping: function (session2) {
                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                       ,infixr: singleton(pestovalSessionCell({password: {tag: "just"
                                                                                                                                                                         ,data: local_115.password}
                                                                                                                                                              ,content: []
                                                                                                                                                              ,style: rts.bytesFromAscii("")
                                                                                                                                                              ,attributes: rts.bytesFromAscii("")
                                                                                                                                                              ,language2: {tag: "english"
                                                                                                                                                                          ,data: {}}
                                                                                                                                                              ,session: session2}))});
                                                                                                      }}))
                                                                                   ,language2: {tag: "english"
                                                                                               ,data: {}}})
                                                                ,infixr: function (local_360) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }});
                           case "true":
                             var local_361 = x.data;
                             return {tag: "empty",data: {}};
                           default:
                             throw rts.exceptions.LamduBug("Unhandled case"
                                                          ,"DEF_d40cade7acd3445089af06cfb0ca8c08"
                                                          ,"3aeafeb193f3926d38156605e21596e9");
                         }
                      }());
               }});
};
var processSimpleQuery = function (x365) {
   switch (x365.tag)
   {
     case "error":
       var local_366 = x365.data;
       return ignoreError(local_366);
     case "success":
       var local_367 = x365.data;
       return __return(toArray(map({stream: fromArray(local_367.__data)
                                   ,mapping: function (local_368) {
                                      return {name: item1({index: 1.0,object: local_368})
                                             ,id: parseInt(item1({index: 0.0
                                                                 ,object: local_368}))};
                                   }})));
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a0f0234c060c4086a39fffe55fe3f9a9"
                                    ,"bc83e03aa2977cc46406e062c7e1acaa");
   }
};
var pestovalQueryTeachers = function (local_364) {
   return _3b_({infixl: query({database: local_364.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_teacher.id, ")
                                                             ,b: queryFieldLang(local_364.language2)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_teacher\nORDER BY name")})})
               ,infixr: processSimpleQuery});
};
var pestovalManageTeachers = function (local_363) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_363.database
                                              ,language2: {tag: "english",data: {}}})
               ,infixr: function (teachers2) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_369) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(map({stream: fromArray(teachers2)
                                                                                                   ,mapping: function (local_370) {
                                                                                                      return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                    ,infixr: singleton(_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<a href=\"/eng/teacher/")
                                                                                                                                                                                                       ,b: showNum(local_370.id)})
                                                                                                                                                                                          ,b: rts.bytesFromAscii("/")})
                                                                                                                                                                             ,b: local_363.password})
                                                                                                                                                                ,b: rts.bytesFromAscii("/\">")})
                                                                                                                                              ,infixr: singleton(leaf(local_370.name))}))});
                                                                                                   }}))})
                                                              ,infixr: function (local_371) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var sequence = function (stream8) {
   return foldLazy({stream: stream8
                   ,initial: function (local_373) {
                      return __return({tag: "empty",data: {}});
                   }
                   ,binop: function (local_374) {
                      return _3b_({infixl: local_374.item
                                  ,infixr: function (local_375) {
                                     return _3b_({infixl: local_374.rest({})
                                                 ,infixr: function (local_376) {
                                                    return __return({tag: "nonEmpty"
                                                                    ,data: {head: local_375
                                                                           ,tail: function (local_377) {
                                                                              return local_376;
                                                                           }}});
                                                 }});
                                  }});
                   }});
};
var isPrefixOf = function (local_388) {
   var local_389 = length(local_388.whole);
   var local_390 = length(local_388.prefix);
   return _26__26_({infixl: _2265_({infixl: local_389,infixr: local_390})
                   ,infixr: function (local_391) {
                      return _3d__3d_({infixl: slice1({object: local_388.whole
                                                      ,start: 0.0
                                                      ,stop: local_390})
                                      ,infixr: local_388.prefix});
                   }});
};
var has = function (local_387) {
   return isPrefixOf({whole: local_387.text,prefix: local_387.prefix});
};
var isSuffixOf = function (local_394) {
   var local_395 = length(local_394.whole);
   var local_396 = length(local_394.suffix);
   return _26__26_({infixl: _2265_({infixl: local_395,infixr: local_396})
                   ,infixr: function (local_397) {
                      return _3d__3d_({infixl: slice1({object: local_394.whole
                                                      ,start: _2d_({infixl: local_395
                                                                   ,infixr: local_396})
                                                      ,stop: local_395})
                                      ,infixr: local_394.suffix});
                   }});
};
var has1 = function (local_393) {
   return isSuffixOf({suffix: local_393.suffix,whole: local_393.text});
};
var not = function (local_398) {
   var x = local_398;
   switch (x.tag)
   {
     case "false":
       var local_399 = x.data;
       return {tag: "true",data: {}};
     case "true":
       var local_400 = x.data;
       return {tag: "false",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_414bf66f7dd84da7881a390b2f34ef76"
                                    ,"b298b3233fa94db5b07f79925bfdbb19");
   }
};
var renderHtml = function (tree) {
   var local_384 = tree.root;
   return join({texts: _3a__3a_({infixl: local_384
                                ,infixr: function (local_385) {
                                   return _2b__2b_2({infixl: map({stream: fromArray(tree.subTrees)
                                                                 ,mapping: renderHtml})
                                                    ,infixr: function (local_386) {
                                                       var x =
                                                       _26__26_({infixl: has({text: local_384
                                                                             ,prefix: rts.bytesFromAscii("<")})
                                                                ,infixr: function (local_392) {
                                                                   return not(has1({text: local_384
                                                                                   ,suffix: rts.bytesFromAscii("/>")}));
                                                                }});
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_401 = x.data;
                                                           return {tag: "empty",data: {}};
                                                         case "true":
                                                           var local_402 = x.data;
                                                           return _3a__3a_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("</")
                                                                                                          ,infixr: function (local_403) {
                                                                                                             return _3a__3a_({infixl: toBytes(toArray(take({stream: drop({stream: fromBytes(local_384)
                                                                                                                                                                         ,count: 1.0})
                                                                                                                                                           ,__while: function (local_404) {
                                                                                                                                                              return _26__26_({infixl: _2260_({infixl: local_404
                                                                                                                                                                                              ,infixr: 32.0})
                                                                                                                                                                              ,infixr: function (local_405) {
                                                                                                                                                                                 return _2260_({infixl: local_404
                                                                                                                                                                                               ,infixr: 62.0});
                                                                                                                                                                              }});
                                                                                                                                                           }})))
                                                                                                                             ,infixr: function (local_406) {
                                                                                                                                return _3a__3a_({infixl: rts.bytesFromAscii(">")
                                                                                                                                                ,infixr: function (local_407) {
                                                                                                                                                   return {tag: "empty"
                                                                                                                                                          ,data: {}};
                                                                                                                                                }});
                                                                                                                             }});
                                                                                                          }})
                                                                                         ,seperator: rts.bytesFromAscii("")})
                                                                           ,infixr: function (local_408) {
                                                                              return {tag: "empty"
                                                                                     ,data: {}};
                                                                           }});
                                                         default:
                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                        ,"DEF_530c1a87609548afa689653c0d0ccc0f"
                                                                                        ,"7dac157ffb2d07db68f45bd01877de20");
                                                       }
                                                    }});
                                }})
               ,seperator: rts.bytesFromAscii("")});
};
var httpOk200 = {message: rts.bytesFromAscii("OK"),code: 200.0};
var pestovalPage = function (local_379) {
   return {content: {__data: _2b__2b_({a: rts.bytesFromAscii("<!DOCTYPE html>\n")
                                      ,b: renderHtml(_22f2_({infixl: rts.bytesFromAscii("<html>")
                                                            ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<head>")
                                                                             ,infixr: [leaf(rts.bytesFromAscii("<meta charset=\"utf-8\" />"))
                                                                                      ,_22f2_({infixl: rts.bytesFromAscii("<title>")
                                                                                              ,infixr: singleton(leaf(local_379.title))})
                                                                                      ,_22f2_({infixl: rts.bytesFromAscii("<body>")
                                                                                              ,infixr: local_379.body})]})]}))})
                    ,mimeType: rts.bytesFromAscii("text/html")}
          ,status: httpOk200};
};
var pestovalUnauthorized = {content: {__data: rts.bytesFromAscii("Not authorized to edit")
                                     ,mimeType: rts.bytesFromAscii("text/plain")}
                           ,status: {message: rts.bytesFromAscii("Unauthorized")
                                    ,code: 403.0}};
var pestovalManage = function (local_94) {
   var password1 = function () {
                      var x = _3d__3d_({infixl: length1(local_94.path),infixr: 0.0});
                      switch (x.tag)
                      {
                        case "false":
                          var local_95 = x.data;
                          return item1({index: 0.0,object: local_94.path});
                        case "true":
                          var local_96 = x.data;
                          return rts.bytesFromAscii("");
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_e7b481c7abf74eb892737b8de024fc75"
                                                       ,"87f1806be8d1cfa4cad909539a3a312d");
                      }
                   }();
   return _3b_({infixl: pestovalAuth({database: local_94.database
                                     ,password: password1
                                     ,teachers: []})
               ,infixr: function (x113) {
                  switch (x113.tag)
                  {
                    case "admin":
                      var local_114 = x113.data;
                      return _3b_({infixl: sequence(_3a__3a_({infixl: pestovalManageFloating({database: local_94.database
                                                                                             ,password: password1})
                                                             ,infixr: function (local_362) {
                                                                return _3a__3a_({infixl: pestovalManageTeachers({database: local_94.database
                                                                                                                ,password: password1})
                                                                                ,infixr: function (local_372) {
                                                                                   return {tag: "empty"
                                                                                          ,data: {}};
                                                                                }});
                                                             }}))
                                  ,infixr: function (local_378) {
                                     return __return(pestovalPage({title: rts.bytesFromAscii("Manage")
                                                                  ,body: toArray(concat(local_378))}));
                                  }});
                    default:
                      var local_409 = x113;
                      return __return(pestovalUnauthorized);
                  }
               }});
};
var getSession = function (local_413) {
   var filter1 = {tag: "just"
                 ,data: _2b__2b_({a: rts.bytesFromAscii("pestoval_session.id = ")
                                 ,b: showNum(local_413.id)})};
   return _3b_({infixl: pestovalQuerySessions({database: local_413.database
                                              ,teacher1: {tag: "nothing",data: {}}
                                              ,language2: {tag: "english",data: {}}
                                              ,filter: filter1})
               ,infixr: function (local_414) {
                  return _3b_({infixl: pestovalQuerySessions({database: local_413.database
                                                             ,teacher1: {tag: "nothing"
                                                                        ,data: {}}
                                                             ,language2: {tag: "hebrew"
                                                                         ,data: {}}
                                                             ,filter: filter1})
                              ,infixr: function (local_415) {
                                 return __return(function () {
                                        var x =
                                        _26__26_({infixl: _3d__3d_({infixl: length1(local_414)
                                                                   ,infixr: 1.0})
                                                 ,infixr: function (local_416) {
                                                    return _3d__3d_({infixl: length1(local_415)
                                                                    ,infixr: 1.0});
                                                 }});
                                        switch (x.tag)
                                        {
                                          case "false":
                                            var local_417 = x.data;
                                            return {tag: "nothing",data: {}};
                                          case "true":
                                            var local_418 = x.data;
                                            var english1 = item1({index: 0.0
                                                                 ,object: local_414});
                                            var hebrew1 = item1({index: 0.0
                                                                ,object: local_415});
                                            return {tag: "just"
                                                   ,data: {prereqs1: {english: english1.prereqs1
                                                                     ,hebrew: function () {
                                                                        var x =
                                                                        _3d__3d_({infixl: hebrew1.prereqs1
                                                                                 ,infixr: english1.prereqs1});
                                                                        switch (x.tag)
                                                                        {
                                                                          case "false":
                                                                            var local_419 =
                                                                            x.data;
                                                                            return hebrew1.prereqs1;
                                                                          case "true":
                                                                            var local_420 =
                                                                            x.data;
                                                                            return rts.bytesFromAscii("");
                                                                          default:
                                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                         ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                         ,"66008b68b7f09f3bc6eb8f888fcedd0f");
                                                                        }
                                                                     }()}
                                                          ,name: {english: english1.name
                                                                 ,hebrew: function () {
                                                                    var x =
                                                                    _3d__3d_({infixl: hebrew1.name
                                                                             ,infixr: english1.name});
                                                                    switch (x.tag)
                                                                    {
                                                                      case "false":
                                                                        var local_421 =
                                                                        x.data;
                                                                        return hebrew1.name;
                                                                      case "true":
                                                                        var local_422 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("");
                                                                      default:
                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                     ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                     ,"2182d2a13ee677d6f08e74aba25b59cb");
                                                                    }
                                                                 }()}
                                                          ,place1: english1.place1
                                                          ,description1: {english: english1.description1
                                                                         ,hebrew: function () {
                                                                            var x =
                                                                            _3d__3d_({infixl: hebrew1.description1
                                                                                     ,infixr: english1.description1});
                                                                            switch (x.tag)
                                                                            {
                                                                              case "false":
                                                                                var local_423 =
                                                                                x.data;
                                                                                return hebrew1.description1;
                                                                              case "true":
                                                                                var local_424 =
                                                                                x.data;
                                                                                return rts.bytesFromAscii("");
                                                                              default:
                                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                             ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                             ,"e3d09b66fde49642215bacd53e5f9ffc");
                                                                            }
                                                                         }()}
                                                          ,teachers: english1.teachers
                                                          ,id: english1.id
                                                          ,when1: english1.when1
                                                          ,level1: english1.level1}};
                                          default:
                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                         ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                         ,"282e1ffc1e2c4271d86489b39185d0e0");
                                        }
                                     }());
                              }});
               }});
};
var allOf = function (local_442) {
   return foldLazy({stream: local_442.stream
                   ,initial: function (local_443) {
                      return {tag: "true",data: {}};
                   }
                   ,binop: function (local_444) {
                      return _26__26_({infixl: local_442.satisfy(local_444.item)
                                      ,infixr: local_444.rest});
                   }});
};
var filter2 = function (local_445) {
   var x = local_445.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_446 = x.data;
       var rest1 = function (local_447) {
          return filter2({stream: local_446.tail({}),keep: local_445.keep});
       };
       var x = local_445.keep(local_446.head);
       switch (x.tag)
       {
         case "false":
           var local_448 = x.data;
           return rest1({});
         case "true":
           var local_449 = x.data;
           return {tag: "nonEmpty",data: {head: local_446.head,tail: rest1}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                        ,"fbe0954bea2f4c248cb91ac61e7821ba");
       }
     case "empty":
       var local_450 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                    ,"2cb5f2574b8b4e3d8e5510fee403db44");
   }
};
var teachersEditForm = function (local_431) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_431.database
                                              ,language2: {tag: "english",data: {}}})
               ,infixr: function (local_432) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_433) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(_2b__2b_2({infixl: map({stream: fromArray(local_431.teachers)
                                                                                                                      ,mapping: function (local_434) {
                                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                       ,infixr: [leaf(local_434.name)
                                                                                                                                                ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<button type=\"submit\" name=\"remove_teacher\" value=\"")
                                                                                                                                                                                       ,b: showNum(local_434.id)})
                                                                                                                                                                          ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Remove")))})]});
                                                                                                                      }})
                                                                                                         ,infixr: function (local_437) {
                                                                                                            return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                            ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<label for=\"add_teacher\">")
                                                                                                                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Add:")))})
                                                                                                                                                     ,_22f2_({infixl: rts.bytesFromAscii("<select id=\"add_teacher\" name=\"add_teacher\">")
                                                                                                                                                             ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                                                                                                       ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                                                                                                       ,infixr: function (local_439) {
                                                                                                                                                                                          return map({stream: filter2({stream: fromArray(local_432)
                                                                                                                                                                                                                      ,keep: function (local_440) {
                                                                                                                                                                                                                         return allOf({stream: fromArray(local_431.teachers)
                                                                                                                                                                                                                                      ,satisfy: function (local_441) {
                                                                                                                                                                                                                                         return _2260_({infixl: local_440.id
                                                                                                                                                                                                                                                       ,infixr: local_441.id});
                                                                                                                                                                                                                                      }});
                                                                                                                                                                                                                      }})
                                                                                                                                                                                                     ,mapping: function (local_451) {
                                                                                                                                                                                                        return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                                                                                                     ,b: showNum(local_451.id)})
                                                                                                                                                                                                                                        ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                                                                                      ,infixr: singleton(leaf(local_451.name))});
                                                                                                                                                                                                     }});
                                                                                                                                                                                       }}))})]})
                                                                                                                            ,infixr: function (local_453) {
                                                                                                                               return {tag: "empty"
                                                                                                                                      ,data: {}};
                                                                                                                            }});
                                                                                                         }}))})
                                                              ,infixr: function (local_454) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalQueryLevels = function (database2) {
   return _3b_({infixl: query({database: database2
                              ,object: rts.bytesFromAscii("SELECT\n  pestoval_level.id, pestoval_level.name\nFROM pestoval_level\nORDER BY pestoval_level.as_number")})
               ,infixr: processSimpleQuery});
};
var levelEditForm = function (local_456) {
   return _3b_({infixl: pestovalQueryLevels(local_456.database)
               ,infixr: function (local_457) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Level")))})
                                           ,infixr: function (local_458) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"level\" name=\"level\">")
                                                                              ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                        ,infixr: function (local_459) {
                                                                                                           return map({stream: fromArray(local_457)
                                                                                                                      ,mapping: function (local_460) {
                                                                                                                         return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                      ,b: showNum(local_460.id)})
                                                                                                                                                         ,b: function () {
                                                                                                                                                            var x =
                                                                                                                                                            _3d__3d_({infixl: local_460.id
                                                                                                                                                                     ,infixr: local_456.level1.id});
                                                                                                                                                            switch (x.tag)
                                                                                                                                                            {
                                                                                                                                                              case "false":
                                                                                                                                                                var local_461 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\">");
                                                                                                                                                              case "true":
                                                                                                                                                                var local_462 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\" selected>");
                                                                                                                                                              default:
                                                                                                                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                             ,"DEF_a5e4925095a54ec393e6e4d5942a5dec"
                                                                                                                                                                                             ,"9a49b8f7220edcf647eba821ecf8b91a");
                                                                                                                                                            }
                                                                                                                                                         }()})
                                                                                                                                       ,infixr: singleton(leaf(local_460.name))});
                                                                                                                      }});
                                                                                                        }}))})
                                                              ,infixr: function (local_463) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var locationEditForm = function (local_465) {
   return _3b_({infixl: _3b_({infixl: query({database: local_465.database
                                            ,object: rts.bytesFromAscii("SELECT pestoval_location.id, pestoval_location.name FROM pestoval_location")})
                             ,infixr: processSimpleQuery})
               ,infixr: function (local_466) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Where")))})
                                           ,infixr: function (local_467) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"location\" name=\"location\">")
                                                                              ,infixr: toArray(map({stream: fromArray(local_466)
                                                                                                   ,mapping: function (local_468) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_468.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         _3d__3d_({infixl: local_468.id
                                                                                                                                                  ,infixr: local_465.where.id});
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_469 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_470 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                          ,"DEF_937ecfd7a5fb4cd6800d072419740277"
                                                                                                                                                                          ,"ae5dc56c181ace2274e213d24cf032c6");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(local_468.name))});
                                                                                                   }}))})
                                                              ,infixr: function (local_471) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalQueryTimeSlots = function (database3) {
   return _3b_({infixl: query({database: database3
                              ,object: rts.bytesFromAscii("SELECT\n  pestoval_timeslot.id, pestoval_timeslot.start, pestoval_timeslot.stop\nFROM pestoval_timeslot\nORDER BY pestoval_timeslot.start")})
               ,infixr: function (x474) {
                  switch (x474.tag)
                  {
                    case "error":
                      var local_475 = x474.data;
                      return ignoreError(local_475);
                    case "success":
                      var local_476 = x474.data;
                      return __return(toArray(map({stream: fromArray(local_476.__data)
                                                  ,mapping: function (local_477) {
                                                     return {start: parseDateTime(item1({index: 1.0
                                                                                        ,object: local_477}))
                                                            ,stop: parseDateTime(item1({index: 2.0
                                                                                       ,object: local_477}))
                                                            ,id: parseInt(item1({index: 0.0
                                                                                ,object: local_477}))};
                                                  }})));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_e253b6e9f37d40d099b39de266d912c9"
                                                   ,"37d0edcc32ab5606822a8107f66ced58");
                  }
               }});
};
var timeSlotEditForm = function (local_473) {
   return _3b_({infixl: pestovalQueryTimeSlots(local_473.database)
               ,infixr: function (local_478) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("When")))})
                                           ,infixr: function (local_479) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"when\" name=\"when\">")
                                                                              ,infixr: toArray(map({stream: fromArray(local_478)
                                                                                                   ,mapping: function (local_480) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_480.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         _3d__3d_({infixl: local_480.id
                                                                                                                                                  ,infixr: local_473.when1.id});
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_481 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_482 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                          ,"DEF_3860ce434c144382b8c11631e28ab02f"
                                                                                                                                                                          ,"11873d6a08b91a78c3a93a526e65434f");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_480
                                                                                                                                                           ,language2: {tag: "english"
                                                                                                                                                                       ,data: {}}})))});
                                                                                                   }}))})
                                                              ,infixr: function (local_483) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalSessionSummary = function (session4) {
   return concat(map({stream: _3a__3a_({infixl: {name: rts.bytesFromAscii("Teachers")
                                                ,value: join({texts: map({stream: fromArray(session4.teachers)
                                                                         ,mapping: function (local_487) {
                                                                            return local_487.name;
                                                                         }})
                                                             ,seperator: rts.bytesFromAscii(" & ")})}
                                       ,infixr: function (local_488) {
                                          return _3a__3a_({infixl: {name: rts.bytesFromAscii("Where")
                                                                   ,value: session4.place1.name}
                                                          ,infixr: function (local_489) {
                                                             return _3a__3a_({infixl: {name: rts.bytesFromAscii("When")
                                                                                      ,value: formatTimeSlot({timeSlot: session4.when1
                                                                                                             ,language2: {tag: "english"
                                                                                                                         ,data: {}}})}
                                                                             ,infixr: function (local_490) {
                                                                                return _3a__3a_({infixl: {name: rts.bytesFromAscii("What")
                                                                                                         ,value: session4.name}
                                                                                                ,infixr: function (local_491) {
                                                                                                   return _3a__3a_({infixl: {name: rts.bytesFromAscii("Level")
                                                                                                                            ,value: session4.level1.name}
                                                                                                                   ,infixr: function (local_492) {
                                                                                                                      return {tag: "empty"
                                                                                                                             ,data: {}};
                                                                                                                   }});
                                                                                                }});
                                                                             }});
                                                          }});
                                       }})
                     ,mapping: function (local_493) {
                        return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h4>")
                                                        ,infixr: singleton(leaf(local_493.name))})
                                        ,infixr: function (local_494) {
                                           return _3a__3a_({infixl: leaf(local_493.value)
                                                           ,infixr: function (local_495) {
                                                              return {tag: "empty"
                                                                     ,data: {}};
                                                           }});
                                        }});
                     }}));
};
var pestovalEditField = function (local_500) {
   return _3a__3a_({infixl: {name: local_500.name
                            ,value: local_500.value.english
                            ,key: local_500.key}
                   ,infixr: function (local_501) {
                      return _3a__3a_({infixl: {name: _2b__2b_({a: local_500.name
                                                               ,b: rts.bytesFromAscii(" (Hebrew)")})
                                               ,value: local_500.value.hebrew
                                               ,key: _2b__2b_({a: local_500.key
                                                              ,b: rts.bytesFromAscii("_hebrew")})}
                                      ,infixr: function (local_502) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var pestovalEditFields = function (local_505) {
   return _2b__2b_2({infixl: pestovalEditField({name: rts.bytesFromAscii("Description")
                                               ,value: local_505.description1
                                               ,key: rts.bytesFromAscii("description")})
                    ,infixr: function (local_506) {
                       return pestovalEditField({name: rts.bytesFromAscii("Pre-reqs")
                                                ,value: local_505.prereqs1
                                                ,key: rts.bytesFromAscii("prereqs")});
                    }});
};
var formTextArea = function (local_507) {
   return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<label for=\"")
                                                                  ,b: local_507.key})
                                                     ,b: rts.bytesFromAscii("\">")})
                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                             ,infixr: singleton(leaf(_2b__2b_({a: local_507.name
                                                                                              ,b: rts.bytesFromAscii(":")})))}))})
                   ,infixr: function (local_508) {
                      return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<textarea rows=10 cols=80 id=\"")
                                                                                                               ,b: local_507.key})
                                                                                                  ,b: rts.bytesFromAscii("\" name=\"")})
                                                                                     ,b: local_507.key})
                                                                        ,b: rts.bytesFromAscii("\">")})
                                                      ,infixr: singleton(leaf(local_507.value))})
                                      ,infixr: function (local_509) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var parseHex = function (text5) {
   var local_536 = function (local_524) {
      var x = _2264_({infixl: local_524,infixr: 57.0});
      switch (x.tag)
      {
        case "false":
          var local_525 = x.data;
          var x = _2264_({infixl: local_524,infixr: 70.0});
          switch (x.tag)
          {
            case "false":
              var local_526 = x.data;
              var x = _26__26_({infixl: _2264_({infixl: 97.0,infixr: local_524})
                               ,infixr: function (local_527) {
                                  return _2264_({infixl: local_524,infixr: 102.0});
                               }});
              switch (x.tag)
              {
                case "false":
                  var local_528 = x.data;
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"6361c631c359bf491a698736b910c593");
                case "true":
                  var local_529 = x.data;
                  return _2d_({infixl: local_524,infixr: 87.0});
                default:
                  throw rts.exceptions.LamduBug("Unhandled case"
                                               ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                               ,"5a1355193393bda93a2c8e331b53d26c");
              }
            case "true":
              var local_530 = x.data;
              var x = _2264_({infixl: 65.0,infixr: local_524});
              switch (x.tag)
              {
                case "false":
                  var local_531 = x.data;
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"d856f42600765d7302f46b291563ca8f");
                case "true":
                  var local_532 = x.data;
                  return _2d_({infixl: local_524,infixr: 55.0});
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
          var local_533 = x.data;
          var x = _2264_({infixl: 48.0,infixr: local_524});
          switch (x.tag)
          {
            case "false":
              var local_534 = x.data;
              throw rts.exceptions.ReachedHole("Reached a hole"
                                              ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                              ,"c930879571c8b455c7030f716fce3db8");
            case "true":
              var local_535 = x.data;
              return _2d_({infixl: local_524,infixr: 48.0});
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
   return fold({stream: fromBytes(text5)
               ,initial: 0.0
               ,binop: function (local_537) {
                  return _2b_({infixl: _2a_({infixl: local_537.acc,infixr: 16.0})
                              ,infixr: local_536(local_537.item)});
               }});
};
var decodeUrl = function (text4) {
   return concat1(function () {
          var x = split({text: replace({text: text4
                                       ,from: rts.bytesFromAscii("+")
                                       ,to: rts.bytesFromAscii(" ")})
                        ,seperator: rts.bytesFromAscii("%")});
          switch (x.tag)
          {
            case "nonEmpty":
              var local_519 = x.data;
              return _3a__3a_({infixl: local_519.head
                              ,infixr: function (local_520) {
                                 return map({stream: local_519.tail({})
                                            ,mapping: function (local_521) {
                                               var x = _2265_({infixl: length(local_521)
                                                              ,infixr: 2.0});
                                               switch (x.tag)
                                               {
                                                 case "false":
                                                   var local_522 = x.data;
                                                   throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                   ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                   ,"dc688712fae3cce5d326448fdfdec2a5");
                                                 case "true":
                                                   var local_523 = x.data;
                                                   return _2b__2b_({a: toBytes(singleton(parseHex(slice1({object: local_521
                                                                                                         ,start: 0.0
                                                                                                         ,stop: 2.0}))))
                                                                   ,b: slice1({object: local_521
                                                                              ,start: 2.0
                                                                              ,stop: length(local_521)})});
                                                 default:
                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                ,"3d161b85ea84c55ce4d08379f720f0c6");
                                               }
                                            }});
                              }});
            case "empty":
              var local_538 = x.data;
              return {tag: "empty",data: {}};
            default:
              throw rts.exceptions.LamduBug("Unhandled case"
                                           ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                           ,"a27f7e5bb742b4c492509cfb987f05dd");
          }
       }());
};
var parsePostBody = function (body1) {
   return map({stream: split({text: body1,seperator: rts.bytesFromAscii("&")})
              ,mapping: function (field2) {
                 var local_516 = toArray(split({text: field2
                                               ,seperator: rts.bytesFromAscii("=")}));
                 var x = _3d__3d_({infixl: length1(local_516),infixr: 2.0});
                 switch (x.tag)
                 {
                   case "false":
                     var local_517 = x.data;
                     return ignoreError(function () {
                            throw rts.exceptions.ReachedHole("Reached a hole"
                                                            ,"DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                            ,"c4215356d194f30cdd17797a99d63ff1");
                         }());
                   case "true":
                     var local_518 = x.data;
                     return {value: decodeUrl(item1({index: 1.0,object: local_516}))
                            ,key: item1({index: 0.0,object: local_516})};
                   default:
                     throw rts.exceptions.LamduBug("Unhandled case"
                                                  ,"DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                  ,"611148533b9174ce687e759e68987e1b");
                 }
              }});
};
var postgresEncodeText = function (text6) {
   return _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("E\'")
                                ,b: concat1(map({stream: fromBytes(text6)
                                                ,mapping: function (local_547) {
                                                   var x = _3d__3d_({infixl: local_547
                                                                    ,infixr: 10.0});
                                                   switch (x.tag)
                                                   {
                                                     case "false":
                                                       var local_548 = x.data;
                                                       var x = _3d__3d_({infixl: local_547
                                                                        ,infixr: 13.0});
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_549 = x.data;
                                                           var x =
                                                           _3d__3d_({infixl: local_547
                                                                    ,infixr: 39.0});
                                                           switch (x.tag)
                                                           {
                                                             case "false":
                                                               var local_550 = x.data;
                                                               var x =
                                                               _3d__3d_({infixl: local_547
                                                                        ,infixr: 92.0});
                                                               switch (x.tag)
                                                               {
                                                                 case "false":
                                                                   var local_551 = x.data;
                                                                   return toBytes(singleton(local_547));
                                                                 case "true":
                                                                   var local_552 = x.data;
                                                                   return rts.bytesFromAscii("\\\\");
                                                                 default:
                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                                ,"db1c255f9dc88b1c4474ccb94732b223");
                                                               }
                                                             case "true":
                                                               var local_553 = x.data;
                                                               return rts.bytesFromAscii("\\\'");
                                                             default:
                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                            ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                            ,"c5163200e2f7d7f5292c38e34f78058d");
                                                           }
                                                         case "true":
                                                           var local_554 = x.data;
                                                           return rts.bytesFromAscii("\\r");
                                                         default:
                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                        ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                        ,"af75122f296de089cbe121bebb73e3af");
                                                       }
                                                     case "true":
                                                       var local_555 = x.data;
                                                       return rts.bytesFromAscii("\\n");
                                                     default:
                                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                                    ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                    ,"6e996a4b5e8af95a3b4a4fcb8897103c");
                                                   }
                                                }}))})
                   ,b: rts.bytesFromAscii("\'")});
};
var head1 = function (stream9) {
   var x = stream9;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_568 = x.data;
       return {tag: "just",data: local_568.head};
     case "empty":
       var local_569 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6ed761736e084d6c97cf57a406116d35"
                                    ,"f3442eac4d4349a99cafaa88a24c4a7a");
   }
};
var mapMaybe = function (local_570) {
   var x = local_570.maybe1;
   switch (x.tag)
   {
     case "just":
       var local_571 = x.data;
       return {tag: "just",data: local_570.mapping(local_571)};
     case "nothing":
       var local_572 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_2e9eb864b9154a2594c46dbc34021fab"
                                    ,"5ed58bf5b9734ee5b4f4dc26197f7885");
   }
};
var lookup1 = function (local_563) {
   return mapMaybe({mapping: function (local_564) {
                      return local_564.value;
                   }
                   ,maybe1: head1(filter2({stream: local_563.assocs
                                          ,keep: function (local_565) {
                                             var local_567 = function (local_566) {
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
                                                                ,infixr: local_565});
                                             };
                                             return _3d__3d_({infixl: local_565.key
                                                             ,infixr: local_563.key});
                                          }}))});
};
var updateSessionRow = function (local_540) {
   return _3b_({infixl: query({database: local_540.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET ")
                                                                          ,b: join({texts: concat(map({stream: fromArray(local_540.body)
                                                                                                      ,mapping: function (local_541) {
                                                                                                         var x =
                                                                                                         _7c__7c_({infixl: _3d__3d_({infixl: local_541.key
                                                                                                                                    ,infixr: rts.bytesFromAscii("level")})
                                                                                                                  ,infixr: function (local_542) {
                                                                                                                     return _7c__7c_({infixl: _3d__3d_({infixl: local_541.key
                                                                                                                                                       ,infixr: rts.bytesFromAscii("location")})
                                                                                                                                     ,infixr: function (local_543) {
                                                                                                                                        return _3d__3d_({infixl: local_541.key
                                                                                                                                                        ,infixr: rts.bytesFromAscii("when")});
                                                                                                                                     }});
                                                                                                                  }});
                                                                                                         switch (x.tag)
                                                                                                         {
                                                                                                           case "false":
                                                                                                             var local_544 =
                                                                                                             x.data;
                                                                                                             var x =
                                                                                                             _7c__7c_({infixl: _3d__3d_({infixl: local_541.key
                                                                                                                                        ,infixr: rts.bytesFromAscii("add_teacher")})
                                                                                                                      ,infixr: function (local_545) {
                                                                                                                         return _3d__3d_({infixl: local_541.key
                                                                                                                                         ,infixr: rts.bytesFromAscii("remove_teacher")});
                                                                                                                      }});
                                                                                                             switch (x.tag)
                                                                                                             {
                                                                                                               case "false":
                                                                                                                 var local_546 =
                                                                                                                 x.data;
                                                                                                                 return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_541.key
                                                                                                                                                                ,b: rts.bytesFromAscii(" = ")})
                                                                                                                                                   ,b: postgresEncodeText(local_541.value)})
                                                                                                                                 ,infixr: function (local_556) {
                                                                                                                                    return {tag: "empty"
                                                                                                                                           ,data: {}};
                                                                                                                                 }});
                                                                                                               case "true":
                                                                                                                 var local_557 =
                                                                                                                 x.data;
                                                                                                                 return {tag: "empty"
                                                                                                                        ,data: {}};
                                                                                                               default:
                                                                                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                              ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                                                                              ,"267a2077130878c293cf4285fc1e3f96");
                                                                                                             }
                                                                                                           case "true":
                                                                                                             var local_558 =
                                                                                                             x.data;
                                                                                                             return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_541.key
                                                                                                                                                            ,b: rts.bytesFromAscii("_id = ")})
                                                                                                                                               ,b: local_541.value})
                                                                                                                             ,infixr: function (local_559) {
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
                                                ,b: showNum(local_540.session)})})
               ,infixr: function (local_560) {
                  var x = local_560;
                  switch (x.tag)
                  {
                    case "error":
                      var local_561 = x.data;
                      return __return({tag: "error",data: local_561});
                    case "success":
                      var local_562 = x.data;
                      return _3b_({infixl: function () {
                                     var x = lookup1({assocs: fromArray(local_540.body)
                                                     ,key: rts.bytesFromAscii("add_teacher")});
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_573 = x.data;
                                         var x = _3d__3d_({infixl: local_573
                                                          ,infixr: rts.bytesFromAscii("")});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_574 = x.data;
                                             return _3b_({infixl: query({database: local_540.database
                                                                        ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("INSERT INTO pestoval_session_teachers (session_id, teacher_id)\nVALUES (")
                                                                                                                                 ,b: showNum(local_540.session)})
                                                                                                                    ,b: rts.bytesFromAscii(", ")})
                                                                                                       ,b: local_573})
                                                                                          ,b: rts.bytesFromAscii(")")})})
                                                         ,infixr: function (x575) {
                                                            switch (x575.tag)
                                                            {
                                                              case "error":
                                                                var local_576 = x575.data;
                                                                return ignoreError(local_576);
                                                              case "success":
                                                                var local_577 = x575.data;
                                                                return __return({});
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                             ,"3ad72f38b50bc1b5cc297ad16d68f28c");
                                                            }
                                                         }});
                                           case "true":
                                             var local_578 = x.data;
                                             return __return({});
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                          ,"138352fb50e0b842a35b65e5440d4cbb");
                                         }
                                       case "nothing":
                                         var local_579 = x.data;
                                         return __return({});
                                       default:
                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                      ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                      ,"b7e3310f75aa51661dd00a4d961cbe7d");
                                     }
                                  }()
                                  ,infixr: function (local_580) {
                                     var x = lookup1({assocs: fromArray(local_540.body)
                                                     ,key: rts.bytesFromAscii("remove_teacher")});
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_581 = x.data;
                                         return _3b_({infixl: query({database: local_540.database
                                                                    ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("DELETE FROM pestoval_session_teachers\nWHERE pestoval_session_teachers.session_id = ")
                                                                                                                ,b: showNum(local_540.session)})
                                                                                                   ,b: rts.bytesFromAscii(" AND pestoval_session_teachers.teacher_id = ")})
                                                                                      ,b: local_581})})
                                                     ,infixr: function (x582) {
                                                        switch (x582.tag)
                                                        {
                                                          case "error":
                                                            var local_583 = x582.data;
                                                            return __return({tag: "error"
                                                                            ,data: local_583});
                                                          case "success":
                                                            var local_584 = x582.data;
                                                            return __return({tag: "success"
                                                                            ,data: {}});
                                                          default:
                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                         ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                         ,"c22e107f85c6554bb3a7ef4080f8f72a");
                                                        }
                                                     }});
                                       case "nothing":
                                         var local_585 = x.data;
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
var tryQuery = function (local_587) {
   return function (x588) {
          switch (x588.tag)
          {
            case "error":
              var local_589 = x588.data;
              return __return({content: {__data: _2b__2b_({a: rts.bytesFromAscii("Database error: ")
                                                          ,b: local_589})
                                        ,mimeType: rts.bytesFromAscii("text/plain")}
                              ,status: {message: rts.bytesFromAscii("Internal Server Error")
                                       ,code: 500.0}});
            case "success":
              return local_587(x588.data);
            default:
              throw rts.exceptions.LamduBug("Unhandled case"
                                           ,"DEF_6ab93b1ac8a248c0a946996efdd08c5f"
                                           ,"601e113ccba88e0bf9ac1fe558419963");
          }
       };
};
var pestovalVerifyUpdate = function (local_591) {
   var x = lookup1({assocs: fromArray(local_591.body),key: rts.bytesFromAscii("when")});
   switch (x.tag)
   {
     case "just":
       var when2 = x.data;
       var x = lookup1({assocs: fromArray(local_591.body)
                       ,key: rts.bytesFromAscii("location")});
       switch (x.tag)
       {
         case "just":
           var where1 = x.data;
           return _3b_({infixl: query({database: local_591.database
                                      ,object: concat1(_3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id\nFROM pestoval_session\nWHERE pestoval_session.id <> ")
                                                                ,infixr: function (local_592) {
                                                                   return _3a__3a_({infixl: showNum(local_591.session)
                                                                                   ,infixr: function (local_593) {
                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.location_id = ")
                                                                                                      ,infixr: function (local_594) {
                                                                                                         return _3a__3a_({infixl: where1
                                                                                                                         ,infixr: function (local_595) {
                                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.when_id = ")
                                                                                                                                            ,infixr: function (local_596) {
                                                                                                                                               return _3a__3a_({infixl: when2
                                                                                                                                                               ,infixr: function (local_597) {
                                                                                                                                                                  return {tag: "empty"
                                                                                                                                                                         ,data: {}};
                                                                                                                                                               }});
                                                                                                                                            }});
                                                                                                                         }});
                                                                                                      }});
                                                                                   }});
                                                                }}))})
                       ,infixr: function (x598) {
                          switch (x598.tag)
                          {
                            case "error":
                              var local_599 = x598.data;
                              return ignoreError(local_599);
                            case "success":
                              var local_600 = x598.data;
                              return __return(function () {
                                     var x = _3d__3d_({infixl: length1(local_600.__data)
                                                      ,infixr: 0.0});
                                     switch (x.tag)
                                     {
                                       case "false":
                                         var local_601 = x.data;
                                         return {tag: "conflicts"
                                                ,data: toArray(map({stream: fromArray(local_600.__data)
                                                                   ,mapping: function (local_602) {
                                                                      return parseInt(item1({index: 0.0
                                                                                            ,object: local_602}));
                                                                   }}))};
                                       case "true":
                                         var local_603 = x.data;
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
           var local_604 = x.data;
           return ignoreError({});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_bcca348b043a42949aaf89fb2eccfc72"
                                        ,"7aa622f233fd592d4ac16d681620a799");
       }
     case "nothing":
       var local_605 = x.data;
       return __return({tag: "good",data: {}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_bcca348b043a42949aaf89fb2eccfc72"
                                    ,"814512c476a997315cd8f86c31cf843c");
   }
};
var pestovalUpdate = function (local_514) {
   var x = local_514.request1.body;
   switch (x.tag)
   {
     case "just":
       var local_515 = x.data;
       var body2 = toArray(parsePostBody(local_515));
       var local_590 = function (local_539) {
          return _3b_({infixl: updateSessionRow({body: body2
                                                ,database: local_514.database
                                                ,session: local_514.session})
                      ,infixr: tryQuery(function (local_586) {
                         return __return({content: {__data: rts.bytesFromAscii("Update successful, refresh")
                                                   ,mimeType: rts.bytesFromAscii("text/plain")}
                                         ,status: {message: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: ")
                                                                     ,b: local_539})
                                                  ,code: 303.0}});
                      })});
       };
       return _3b_({infixl: pestovalVerifyUpdate({body: body2
                                                 ,database: local_514.database
                                                 ,session: local_514.session})
                   ,infixr: function (x606) {
                      switch (x606.tag)
                      {
                        case "conflicts":
                          var conflicts1 = x606.data;
                          return _3b_({infixl: query({database: local_514.database
                                                     ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET location_id = NULL\nWHERE pestoval_session.id IN (")
                                                                                    ,b: join({texts: map({stream: fromArray(conflicts1)
                                                                                                         ,mapping: showNum})
                                                                                             ,seperator: rts.bytesFromAscii(", ")})})
                                                                       ,b: rts.bytesFromAscii(")")})})
                                      ,infixr: tryQuery(function (local_607) {
                                         return local_590(_2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("/eng/manage/")
                                                                                ,b: local_514.password})
                                                                   ,b: rts.bytesFromAscii("/")}));
                                      })});
                        case "good":
                          var local_608 = x606.data;
                          return local_590(local_514.request1.path);
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                       ,"7605757a63256d30d9c89a9804c8dd00");
                      }
                   }});
     case "nothing":
       var local_609 = x.data;
       return __return({content: {__data: rts.bytesFromAscii("POST with no body")
                                 ,mimeType: rts.bytesFromAscii("text/plain")}
                       ,status: {message: rts.bytesFromAscii("Forbidden"),code: 403.0}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                    ,"7155adc9c6327a297327ec4e1f1a8007");
   }
};
var pestovalEditPage = function (local_411) {
   var local_412 = toArray(split({text: local_411.request1.path
                                 ,seperator: rts.bytesFromAscii("/")}));
   var id3 = parseInt(item1({index: 3.0,object: local_412}));
   var password2 = item1({index: 4.0,object: local_412});
   return _3b_({infixl: getSession({database: local_411.database,id: id3})
               ,infixr: function (local_425) {
                  var x = local_425;
                  switch (x.tag)
                  {
                    case "just":
                      var session3 = x.data;
                      return _3b_({infixl: pestovalAuth({database: local_411.database
                                                        ,password: password2
                                                        ,teachers: session3.teachers})
                                  ,infixr: function (x426) {
                                     switch (x426.tag)
                                     {
                                       case "unauthorized":
                                         var local_427 = x426.data;
                                         return __return(pestovalUnauthorized);
                                       default:
                                         var local_428 = x426;
                                         var x =
                                         _3d__3d_({infixl: local_411.request1.method
                                                  ,infixr: rts.bytesFromAscii("POST")});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_429 = x.data;
                                             return _3b_({infixl: function () {
                                                            var x = local_428;
                                                            switch (x.tag)
                                                            {
                                                              case "admin":
                                                                var local_430 = x.data;
                                                                return _3b_({infixl: sequence(_3a__3a_({infixl: teachersEditForm({database: local_411.database
                                                                                                                                 ,teachers: session3.teachers})
                                                                                                       ,infixr: function (local_455) {
                                                                                                          return _3a__3a_({infixl: levelEditForm({database: local_411.database
                                                                                                                                                 ,level1: session3.level1})
                                                                                                                          ,infixr: function (local_464) {
                                                                                                                             return _3a__3a_({infixl: locationEditForm({where: session3.place1
                                                                                                                                                                       ,database: local_411.database})
                                                                                                                                             ,infixr: function (local_472) {
                                                                                                                                                return _3a__3a_({infixl: timeSlotEditForm({database: local_411.database
                                                                                                                                                                                          ,when1: session3.when1})
                                                                                                                                                                ,infixr: function (local_484) {
                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                          ,data: {}};
                                                                                                                                                                }});
                                                                                                                                             }});
                                                                                                                          }});
                                                                                                       }}))
                                                                            ,infixr: function (local_485) {
                                                                               return __return(concat(local_485));
                                                                            }});
                                                              case "teacher1":
                                                                var local_486 = x.data;
                                                                return __return(pestovalSessionSummary({name: session3.name.english
                                                                                                       ,place1: session3.place1
                                                                                                       ,teachers: session3.teachers
                                                                                                       ,when1: session3.when1
                                                                                                       ,level1: session3.level1}));
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                                             ,"51101d04f9fe7ce01c9a8a10e2124c7f");
                                                            }
                                                         }()
                                                         ,infixr: function (local_496) {
                                                            return __return(pestovalPage({title: rts.bytesFromAscii("Edit Session")
                                                                                         ,body: [_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Edit Session")))})
                                                                                                ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"")
                                                                                                                                       ,b: local_411.request1.path})
                                                                                                                          ,b: rts.bytesFromAscii("\">")})
                                                                                                        ,infixr: toArray(_2b__2b_2({infixl: local_496
                                                                                                                                   ,infixr: function (local_498) {
                                                                                                                                      return _2b__2b_2({infixl: concat(map({stream: _2b__2b_2({infixl: function () {
                                                                                                                                                                                                 var x =
                                                                                                                                                                                                 local_428;
                                                                                                                                                                                                 switch (x.tag)
                                                                                                                                                                                                 {
                                                                                                                                                                                                   case "admin":
                                                                                                                                                                                                     var local_499 =
                                                                                                                                                                                                     x.data;
                                                                                                                                                                                                     return pestovalEditField({name: rts.bytesFromAscii("Name")
                                                                                                                                                                                                                              ,value: session3.name
                                                                                                                                                                                                                              ,key: rts.bytesFromAscii("name")});
                                                                                                                                                                                                   case "teacher1":
                                                                                                                                                                                                     var local_503 =
                                                                                                                                                                                                     x.data;
                                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                                   default:
                                                                                                                                                                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                                                                  ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                                                                                                                                                                                  ,"b24e7f87522990052299e7d83ddb641c");
                                                                                                                                                                                                 }
                                                                                                                                                                                              }()
                                                                                                                                                                                              ,infixr: function (local_504) {
                                                                                                                                                                                                 return pestovalEditFields(session3);
                                                                                                                                                                                              }})
                                                                                                                                                                           ,mapping: formTextArea}))
                                                                                                                                                       ,infixr: function (local_510) {
                                                                                                                                                          return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                                                                                                                          ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                                                                    ,infixr: singleton(leaf(rts.bytesFromAscii("Update")))}))})
                                                                                                                                                                          ,infixr: function (local_511) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                       }});
                                                                                                                                   }}))})]}));
                                                         }});
                                           case "true":
                                             var local_513 = x.data;
                                             return pestovalUpdate({request1: local_411.request1
                                                                   ,database: local_411.database
                                                                   ,password: password2
                                                                   ,session: session3.id});
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                          ,"649431586e8fa4f8144892306470de2e");
                                         }
                                     }
                                  }});
                    case "nothing":
                      var local_610 = x.data;
                      return __return(httpNotFound404(local_411.request1.path));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                   ,"08ce1c8a7d9560da25879978070222da");
                  }
               }});
};
var overlaysCss = _22f2_({infixl: rts.bytesFromAscii("<style type=\"text/css\">")
                         ,infixr: singleton(leaf(rts.bytesFromAscii("/* Thanks https://eichefam.net/2011/12/21/popup-windows-without-javascript/ */\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0,0,0,0.5);\n  transition: opacity 200ms;\n  visibility: hidden;\n  opacity: 0;\n}\n.overlay:target {\n  visibility: visible;\n  opacity: 1;\n}\n.cancel {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  cursor: default;\n}\n.popup {\n  margin: 50px auto;\n  padding: 20px;\n  background: #fff;\n  border: 1px solid #666;\n  width: 70%;\n  box-shadow: 0 0 50px rgba(0,0,0,0.5);\n  position: relative;\n}")))});
var pestovalTeacherPage = function (local_612) {
   var teacher3 = parseInt(item1({index: 0.0,object: local_612.path}));
   return _3b_({infixl: query({database: local_612.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT ")
                                                                          ,b: queryFieldLang(local_612.language2)({table: rts.bytesFromAscii("pestoval_teacher")
                                                                                                                  ,field: rts.bytesFromAscii("name")
                                                                                                                  ,as: {tag: "nothing"
                                                                                                                       ,data: {}}})})
                                                             ,b: rts.bytesFromAscii(", pestoval_teacher.password\nFROM pestoval_teacher\nWHERE pestoval_teacher.id =")})
                                                ,b: showNum(teacher3)})})
               ,infixr: function (x613) {
                  switch (x613.tag)
                  {
                    case "error":
                      var local_614 = x613.data;
                      return ignoreError(local_614);
                    case "success":
                      var local_615 = x613.data;
                      var password3 = function () {
                                         var x =
                                         _26__26_({infixl: _3e_({infixl: length1(local_612.path)
                                                                ,infixr: 1.0})
                                                  ,infixr: function (local_616) {
                                                     return _2260_({infixl: item1({index: 1.0
                                                                                  ,object: local_612.path})
                                                                   ,infixr: rts.bytesFromAscii("")});
                                                  }});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_617 = x.data;
                                             return {tag: "nothing",data: {}};
                                           case "true":
                                             var local_618 = x.data;
                                             return {tag: "just"
                                                    ,data: item1({index: 1.0
                                                                 ,object: local_612.path})};
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_50938aa1a135407c826989b9e1339047"
                                                                          ,"91cc4c8b5af33ae92f94375e3a666b89");
                                         }
                                      }();
                      var title1 = item1({index: 0.0
                                         ,object: item1({index: 0.0
                                                        ,object: local_615.__data})});
                      return _3b_({infixl: pestovalQuerySessions({database: local_612.database
                                                                 ,teacher1: {tag: "just"
                                                                            ,data: teacher3}
                                                                 ,language2: local_612.language2
                                                                 ,filter: {tag: "nothing"
                                                                          ,data: {}}})
                                  ,infixr: function (local_619) {
                                     return __return(pestovalPage({title: title1
                                                                  ,body: [overlaysCss
                                                                         ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                            ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                                      ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                                                ,infixr: singleton(leaf(title1))}))}))})
                                                                                                            ,infixr: function (local_621) {
                                                                                                               return map({stream: fromArray(local_619)
                                                                                                                          ,mapping: function (session5) {
                                                                                                                             var local_636 =
                                                                                                                             join({texts: _3a__3a_({infixl: session5.name
                                                                                                                                                   ,infixr: function (local_622) {
                                                                                                                                                      var x =
                                                                                                                                                      filter2({stream: fromArray(session5.teachers)
                                                                                                                                                              ,keep: function (local_623) {
                                                                                                                                                                 return _2260_({infixl: local_623.id
                                                                                                                                                                               ,infixr: teacher3});
                                                                                                                                                              }});
                                                                                                                                                      switch (x.tag)
                                                                                                                                                      {
                                                                                                                                                        case "nonEmpty":
                                                                                                                                                          var local_624 =
                                                                                                                                                          x.data;
                                                                                                                                                          return _3a__3a_({infixl: concat1(_3a__3a_({infixl: function () {
                                                                                                                                                                                                       var x =
                                                                                                                                                                                                       local_612.language2;
                                                                                                                                                                                                       switch (x.tag)
                                                                                                                                                                                                       {
                                                                                                                                                                                                         case "english":
                                                                                                                                                                                                           var local_625 =
                                                                                                                                                                                                           x.data;
                                                                                                                                                                                                           return rts.bytesFromAscii("(With ");
                                                                                                                                                                                                         case "hebrew":
                                                                                                                                                                                                           var local_626 =
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
                                                                                                                                                                                                    ,infixr: function (local_627) {
                                                                                                                                                                                                       return _3a__3a_({infixl: local_624.head.name
                                                                                                                                                                                                                       ,infixr: function (local_628) {
                                                                                                                                                                                                                          return _3a__3a_({infixl: join({texts: map({stream: local_624.tail({})
                                                                                                                                                                                                                                                                    ,mapping: function (local_629) {
                                                                                                                                                                                                                                                                       return _2b__2b_({a: function () {
                                                                                                                                                                                                                                                                                          var x =
                                                                                                                                                                                                                                                                                          local_612.language2;
                                                                                                                                                                                                                                                                                          switch (x.tag)
                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                            case "english":
                                                                                                                                                                                                                                                                                              var local_630 =
                                                                                                                                                                                                                                                                                              x.data;
                                                                                                                                                                                                                                                                                              return rts.bytesFromAscii(" & ");
                                                                                                                                                                                                                                                                                            case "hebrew":
                                                                                                                                                                                                                                                                                              var local_631 =
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
                                                                                                                                                                                                                                                                                       ,b: local_629.name});
                                                                                                                                                                                                                                                                    }})
                                                                                                                                                                                                                                                        ,seperator: rts.bytesFromAscii("")})
                                                                                                                                                                                                                                          ,infixr: function (local_632) {
                                                                                                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(")")
                                                                                                                                                                                                                                                             ,infixr: function (local_633) {
                                                                                                                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                                                                                                                       ,data: {}};
                                                                                                                                                                                                                                                             }});
                                                                                                                                                                                                                                          }});
                                                                                                                                                                                                                       }});
                                                                                                                                                                                                    }}))
                                                                                                                                                                          ,infixr: function (local_634) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                        case "empty":
                                                                                                                                                          var local_635 =
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
                                                                                                                                                                                                    ,infixr: singleton(leaf(join({texts: _3a__3a_({infixl: formatTimeSlot({timeSlot: session5.when1
                                                                                                                                                                                                                                                                          ,language2: local_612.language2})
                                                                                                                                                                                                                                                  ,infixr: function (local_637) {
                                                                                                                                                                                                                                                     return _3a__3a_({infixl: session5.place1.name
                                                                                                                                                                                                                                                                     ,infixr: function (local_638) {
                                                                                                                                                                                                                                                                        return {tag: "empty"
                                                                                                                                                                                                                                                                               ,data: {}};
                                                                                                                                                                                                                                                                     }});
                                                                                                                                                                                                                                                  }})
                                                                                                                                                                                                                                 ,seperator: rts.bytesFromAscii(" / ")})))})
                                                                                                                                                                                            ,htmlParagraph(local_636)]
                                                                                                                                                                                  ,style: rts.bytesFromAscii("")
                                                                                                                                                                                  ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                  ,language2: local_612.language2
                                                                                                                                                                                  ,session: session5}))});
                                                                                                                          }});
                                                                                                            }}))
                                                                                    ,language2: local_612.language2})]}));
                                  }});
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_50938aa1a135407c826989b9e1339047"
                                                   ,"fc81fe2932d91417e79f74d97a2f2ad5");
                  }
               }});
};
var maximum2 = function (local_665) {
   var x = _2265_({infixl: local_665.__x1,infixr: local_665.y});
   switch (x.tag)
   {
     case "false":
       var local_666 = x.data;
       return local_665.y;
     case "true":
       var local_667 = x.data;
       return local_665.__x1;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_19e923b820b04266a9811a6b34fe7b37"
                                    ,"a5d0a997c71340b2b9d148187aeb6d00");
   }
};
var nonEmptyFold = function (local_668) {
   var x = local_668.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_669 = x.data;
       return {tag: "just"
              ,data: fold({stream: local_669.tail({})
                          ,initial: local_669.head
                          ,binop: local_668.binop})};
     case "empty":
       var local_670 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_05d859467ac547cc890fea33e3ff4642"
                                    ,"eb3e9576545c4cc390019d2c5a8d9ce4");
   }
};
var maximum1 = function (stream10) {
   return nonEmptyFold({stream: stream10
                       ,binop: function (local_664) {
                          return maximum2({y: local_664.item,__x1: local_664.acc});
                       }});
};
var gcd = function (local_674) {
   var x = _3d__3d_({infixl: local_674.__x1,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_675 = x.data;
       return gcd({y: local_674.__x1
                  ,__x1: _25_({infixl: local_674.y,infixr: local_674.__x1})});
     case "true":
       var local_676 = x.data;
       return local_674.y;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_493da5cfecea49b89fd9a10c42df9e12"
                                    ,"426c0882a83d8df5efe64ca0e57098af");
   }
};
var lcm = function (local_673) {
   return _2f_({infixl: _2a_({infixl: local_673.__x1,infixr: local_673.y})
               ,infixr: gcd({y: local_673.y,__x1: local_673.__x1})});
};
var timeSlotRow = function (local_679) {
   return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                 ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td colspan=")
                                                                          ,infixr: function (local_680) {
                                                                             return _3a__3a_({infixl: showNum(local_679.numColumns1)
                                                                                             ,infixr: function (local_681) {
                                                                                                return _3a__3a_({infixl: rts.bytesFromAscii(" style=\"font-size:150%; border-top:3pt solid black;\">")
                                                                                                                ,infixr: function (local_682) {
                                                                                                                   return {tag: "empty"
                                                                                                                          ,data: {}};
                                                                                                                }});
                                                                                             }});
                                                                          }})
                                                         ,seperator: rts.bytesFromAscii("")})
                                           ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_679.timeSlot
                                                                                  ,language2: local_679.language2})))}))});
};
var formatTeachers = function (local_686) {
   return htmlParagraph(_2b__2b_({a: join({texts: map({stream: fromArray(local_686.teachers)
                                                      ,mapping: function (local_687) {
                                                         return local_687.name;
                                                      }})
                                          ,seperator: function () {
                                             var x = local_686.language2;
                                             switch (x.tag)
                                             {
                                               case "english":
                                                 var local_688 = x.data;
                                                 return rts.bytesFromAscii(" & ");
                                               case "hebrew":
                                                 var local_689 = x.data;
                                                 return rts.bytes([32,215,149]);
                                               default:
                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                              ,"DEF_b343578f80c84dbf8532d81d3be7c414"
                                                                              ,"5501c290d329fa41da6be2be94a5f4d0");
                                             }
                                          }()})
                                 ,b: rts.bytesFromAscii(":")}));
};
var detailedSessionInfo = function (local_685) {
   return [formatTeachers({teachers: local_685.session.teachers
                          ,language2: local_685.language2})
          ,htmlParagraph(local_685.session.name)
          ,htmlParagraph(local_685.session.place1.name)];
};
var pestovalLevelsPage = function (local_643) {
   var minimum = parseInt(item1({index: 0.0,object: local_643.path}));
   var maximum = function () {
                    var x = _3e_({infixl: length1(local_643.path),infixr: 1.0});
                    switch (x.tag)
                    {
                      case "false":
                        var local_644 = x.data;
                        return minimum;
                      case "true":
                        var local_645 = x.data;
                        return parseInt(item1({index: 1.0,object: local_643.path}));
                      default:
                        throw rts.exceptions.LamduBug("Unhandled case"
                                                     ,"DEF_a358e35c87a74404b2c606eb39bddad1"
                                                     ,"4c173067c4670de5fcb231cf53d90418");
                    }
                 }();
   var title2 = join({texts: function () {
                        var x = _3d__3d_({infixl: minimum,infixr: maximum});
                        switch (x.tag)
                        {
                          case "false":
                            var local_646 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_643.language2;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_647 = x.data;
                                                   return rts.bytesFromAscii("Levels");
                                                 case "hebrew":
                                                   var local_648 = x.data;
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
                                            ,infixr: function (local_649) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_650) {
                                                                  return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                                  ,infixr: function (local_651) {
                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                     ,infixr: function (local_652) {
                                                                                                        return {tag: "empty"
                                                                                                               ,data: {}};
                                                                                                     }});
                                                                                  }});
                                                               }});
                                            }});
                          case "true":
                            var local_653 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_643.language2;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_654 = x.data;
                                                   return rts.bytesFromAscii("Level");
                                                 case "hebrew":
                                                   var local_655 = x.data;
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
                                            ,infixr: function (local_656) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_657) {
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
   return _3b_({infixl: pestovalQuerySessions({database: local_643.database
                                              ,teacher1: {tag: "nothing",data: {}}
                                              ,language2: local_643.language2
                                              ,filter: {tag: "just"
                                                       ,data: concat1(_3a__3a_({infixl: showNum(minimum)
                                                                               ,infixr: function (local_658) {
                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(" <= pestoval_level.as_number AND pestoval_level.as_number <= ")
                                                                                                  ,infixr: function (local_659) {
                                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                                     ,infixr: function (local_660) {
                                                                                                                        return {tag: "empty"
                                                                                                                               ,data: {}};
                                                                                                                     }});
                                                                                                  }});
                                                                               }}))}})
               ,infixr: function (local_661) {
                  var local_663 = toArray(group({stream: fromArray(local_661)
                                                ,by: function (local_662) {
                                                   return _3d__3d_({infixl: local_662.infixl.when1.id
                                                                   ,infixr: local_662.infixr.when1.id});
                                                }}));
                  var local_671 =
                  maybe({object: maximum1(map({stream: fromArray(local_663)
                                              ,mapping: length1}))
                        ,or: 0.0});
                  var numColumns = fold({stream: _2e__2e_({start: 1.0
                                                          ,stop: _2b_({infixl: local_671
                                                                      ,infixr: 1.0})})
                                        ,initial: 1.0
                                        ,binop: function (local_672) {
                                           return lcm({y: local_672.item
                                                      ,__x1: local_672.acc});
                                        }});
                  return __return(pestovalPage({title: title2
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                         ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                             ,infixr: singleton(leaf(title2))}))}))})
                                                                                         ,infixr: function (local_678) {
                                                                                            return concat(map({stream: fromArray(local_663)
                                                                                                              ,mapping: function (group1) {
                                                                                                                 return _3a__3a_({infixl: timeSlotRow({numColumns1: numColumns
                                                                                                                                                      ,timeSlot: item1({index: 0.0
                                                                                                                                                                       ,object: group1}).when1
                                                                                                                                                      ,language2: local_643.language2})
                                                                                                                                 ,infixr: function (local_683) {
                                                                                                                                    var attributes1 =
                                                                                                                                    function (local_684) {
                                                                                                                                       return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("colspan=")
                                                                                                                                                                                              ,b: showNum(_2f_({infixl: numColumns
                                                                                                                                                                                                               ,infixr: local_684}))})
                                                                                                                                                                                 ,b: rts.bytesFromAscii(" width=\"")})
                                                                                                                                                                    ,b: showNum(_2f__2f_({infixl: 100.0
                                                                                                                                                                                         ,infixr: local_684}))})
                                                                                                                                                       ,b: rts.bytesFromAscii("%\"")});
                                                                                                                                    }(length1(group1));
                                                                                                                                    return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                                    ,infixr: toArray(map({stream: fromArray(group1)
                                                                                                                                                                                         ,mapping: function (session6) {
                                                                                                                                                                                            return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                                                                  ,data: {}}
                                                                                                                                                                                                                       ,content: singleton(_22f2_({infixl: rts.bytesFromAscii("<div style=\"font-size:110%\">")
                                                                                                                                                                                                                                                  ,infixr: detailedSessionInfo({language2: local_643.language2
                                                                                                                                                                                                                                                                               ,session: session6})}))
                                                                                                                                                                                                                       ,style: rts.bytesFromAscii("border-left: 1pt solid black")
                                                                                                                                                                                                                       ,attributes: attributes1
                                                                                                                                                                                                                       ,language2: local_643.language2
                                                                                                                                                                                                                       ,session: session6});
                                                                                                                                                                                         }}))})
                                                                                                                                                    ,infixr: function (local_693) {
                                                                                                                                                       return {tag: "empty"
                                                                                                                                                              ,data: {}};
                                                                                                                                                    }});
                                                                                                                                 }});
                                                                                                              }}));
                                                                                         }}))
                                                                 ,language2: local_643.language2})]}));
               }});
};
var dedup = function (local_700) {
   return toArray(map({stream: group({stream: local_700,by: _3d__3d_})
                      ,mapping: function (local_701) {
                         return item1({index: 0.0,object: local_701});
                      }}));
};
var placesRow = function (local_704) {
   var local_708 = join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<th width=\"")
                                         ,infixr: function (local_705) {
                                            return _3a__3a_({infixl: showNum(_2f_({infixl: 100.0
                                                                                  ,infixr: length1(local_704)}))
                                                            ,infixr: function (local_706) {
                                                               return _3a__3a_({infixl: rts.bytesFromAscii("%\">")
                                                                               ,infixr: function (local_707) {
                                                                                  return {tag: "empty"
                                                                                         ,data: {}};
                                                                               }});
                                                            }});
                                         }})
                        ,seperator: rts.bytesFromAscii("")});
   return _22f2_({infixl: rts.bytesFromAscii("<tr style=\"background-color:#eee\">")
                 ,infixr: toArray(map({stream: fromArray(local_704)
                                      ,mapping: function (local_709) {
                                         return _22f2_({infixl: local_708
                                                       ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/places/")
                                                                                                                ,infixr: function (local_710) {
                                                                                                                   return _3a__3a_({infixl: showNum(local_709.id)
                                                                                                                                   ,infixr: function (local_711) {
                                                                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("/\"> ")
                                                                                                                                                      ,infixr: function (local_712) {
                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                ,data: {}};
                                                                                                                                                      }});
                                                                                                                                   }});
                                                                                                                }})
                                                                                               ,seperator: rts.bytesFromAscii("")})
                                                                                 ,infixr: singleton(leaf(local_709.name))}))});
                                      }}))});
};
var toArray1 = function (local_718) {
   return runMutArray(_3b_({infixl: newMutArray1(replicate({count: local_718.size
                                                           ,item: {tag: "nothing"
                                                                  ,data: {}}}))
                           ,infixr: function (__array5) {
                              return _3b_({infixl: sequence__(map({stream: local_718.stream
                                                                  ,mapping: function (local_719) {
                                                                     return writeMutArray({index: local_718.index(local_719)
                                                                                          ,object: __array5
                                                                                          ,value: {tag: "just"
                                                                                                  ,data: local_719}});
                                                                  }}))
                                          ,infixr: function (local_720) {
                                             return __return(__array5);
                                          }});
                           }}));
};
var pestovalSessionsTable = function (local_696) {
   return _3b_({infixl: pestovalQuerySessions({database: local_696.database
                                              ,teacher1: {tag: "nothing",data: {}}
                                              ,language2: local_696.language2
                                              ,filter: {tag: "nothing",data: {}}})
               ,infixr: function (local_697) {
                  var local_702 =
                  dedup(fromArray(sort({stream: map({stream: fromArray(local_697)
                                                    ,mapping: function (local_698) {
                                                       return local_698.place1;
                                                    }})
                                       ,_3c_1: function (local_699) {
                                          return _3c_({infixl: local_699.infixl.id
                                                      ,infixr: local_699.infixr.id});
                                       }})));
                  var numColumns2 = length1(local_702);
                  return __return(pestovalPage({title: rts.bytesFromAscii("All Sessions")
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(_3a__3a_({infixl: placesRow(local_702)
                                                                                         ,infixr: function (local_713) {
                                                                                            return concat(map({stream: group({stream: fromArray(local_697)
                                                                                                                             ,by: function (local_714) {
                                                                                                                                return _3d__3d_({infixl: local_714.infixl.when1.id
                                                                                                                                                ,infixr: local_714.infixr.when1.id});
                                                                                                                             }})
                                                                                                              ,mapping: function (local_715) {
                                                                                                                 return _3a__3a_({infixl: timeSlotRow({numColumns1: numColumns2
                                                                                                                                                      ,timeSlot: item1({index: 0.0
                                                                                                                                                                       ,object: local_715}).when1
                                                                                                                                                      ,language2: local_696.language2})
                                                                                                                                 ,infixr: function (local_716) {
                                                                                                                                    return map({stream: fromArray(toArray1({stream: fromArray(local_715)
                                                                                                                                                                           ,index: function (local_717) {
                                                                                                                                                                              return index6({__array4: local_702
                                                                                                                                                                                            ,item: local_717.place1});
                                                                                                                                                                           }
                                                                                                                                                                           ,size: numColumns2}))
                                                                                                                                               ,mapping: function (local_721) {
                                                                                                                                                  var x =
                                                                                                                                                  local_721;
                                                                                                                                                  switch (x.tag)
                                                                                                                                                  {
                                                                                                                                                    case "just":
                                                                                                                                                      var session7 =
                                                                                                                                                      x.data;
                                                                                                                                                      return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                            ,data: {}}
                                                                                                                                                                                 ,content: [formatTeachers({teachers: session7.teachers
                                                                                                                                                                                                           ,language2: local_696.language2})
                                                                                                                                                                                           ,htmlParagraph(session7.name)]
                                                                                                                                                                                 ,style: rts.bytesFromAscii("")
                                                                                                                                                                                 ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                 ,language2: local_696.language2
                                                                                                                                                                                 ,session: session7});
                                                                                                                                                    case "nothing":
                                                                                                                                                      var local_724 =
                                                                                                                                                      x.data;
                                                                                                                                                      return leaf(rts.bytesFromAscii("<td style=\"background-color:#f8f8f8\">"));
                                                                                                                                                    default:
                                                                                                                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                   ,"DEF_753a440ceaa64a519d4334364c39d50b"
                                                                                                                                                                                   ,"e22df53d1ea1be33327cca9a5f4067a5");
                                                                                                                                                  }
                                                                                                                                               }});
                                                                                                                                 }});
                                                                                                              }}));
                                                                                         }}))
                                                                 ,language2: local_696.language2})]}));
               }});
};
var readFile = rts.builtins.IO.file["readFile"];
var pestovalIndex = _3b_({infixl: readFile(rts.bytesFromAscii("index.html"))
                         ,infixr: function (local_727) {
                            return __return({content: {__data: local_727
                                                      ,mimeType: rts.bytesFromAscii("text/html")}
                                            ,status: httpOk200});
                         }});
var pestovalHandler = function (local_68) {
   var local_69 = toArray(split({text: local_68.request1.path
                                ,seperator: rts.bytesFromAscii("/")}));
   var language = item1({index: 1.0,object: local_69});
   var x = _26__26_({infixl: _3d__3d_({infixl: length1(local_69),infixr: 2.0})
                    ,infixr: function (local_70) {
                       return _3d__3d_({infixl: language,infixr: rts.bytesFromAscii("")});
                    }});
   switch (x.tag)
   {
     case "false":
       var local_71 = x.data;
       var language1 = function () {
                          var x = _3d__3d_({infixl: language
                                           ,infixr: rts.bytesFromAscii("heb")});
                          switch (x.tag)
                          {
                            case "false":
                              var local_72 = x.data;
                              return {tag: "english",data: {}};
                            case "true":
                              var local_73 = x.data;
                              return {tag: "hebrew",data: {}};
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                           ,"a7d7d7d9e5191fb58b9d7aeb67e660b8");
                          }
                       }();
       var local_74 = item1({index: 2.0,object: local_69});
       var path1 = toArray(drop({stream: fromArray(local_69),count: 3.0}));
       var x = _26__26_({infixl: _3d__3d_({infixl: length1(local_69),infixr: 3.0})
                        ,infixr: function (local_81) {
                           return _3d__3d_({infixl: local_74
                                           ,infixr: rts.bytesFromAscii("")});
                        }});
       switch (x.tag)
       {
         case "false":
           var local_82 = x.data;
           var x = _3d__3d_({infixl: local_74,infixr: rts.bytesFromAscii("levels")});
           switch (x.tag)
           {
             case "false":
               var local_83 = x.data;
               var x = _3d__3d_({infixl: local_74,infixr: rts.bytesFromAscii("teacher")});
               switch (x.tag)
               {
                 case "false":
                   var local_84 = x.data;
                   var x = _3d__3d_({infixl: local_74
                                    ,infixr: rts.bytesFromAscii("edit")});
                   switch (x.tag)
                   {
                     case "false":
                       var local_85 = x.data;
                       var x = _3d__3d_({infixl: local_74
                                        ,infixr: rts.bytesFromAscii("manage")});
                       switch (x.tag)
                       {
                         case "false":
                           var local_86 = x.data;
                           return __return(httpNotFound404(local_68.request1.path));
                         case "true":
                           var local_93 = x.data;
                           return pestovalManage({path: path1
                                                 ,database: local_68.database});
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                        ,"3042fc773313a781882df94a14ec3bb3");
                       }
                     case "true":
                       var local_410 = x.data;
                       return pestovalEditPage({request1: local_68.request1
                                               ,database: local_68.database});
                     default:
                       throw rts.exceptions.LamduBug("Unhandled case"
                                                    ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                    ,"3904128e0f229aab0f559b8c4efd7e8c");
                   }
                 case "true":
                   var local_611 = x.data;
                   return pestovalTeacherPage({path: path1
                                              ,database: local_68.database
                                              ,language2: language1});
                 default:
                   throw rts.exceptions.LamduBug("Unhandled case"
                                                ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                ,"1efb5179a530efb5cf0ea0f292813e32");
               }
             case "true":
               var local_642 = x.data;
               return pestovalLevelsPage({path: path1
                                         ,database: local_68.database
                                         ,language2: language1});
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                            ,"3725e3e3e238c36942a62af16a116f25");
           }
         case "true":
           var local_695 = x.data;
           return pestovalSessionsTable({database: local_68.database
                                        ,language2: language1});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                        ,"0e90da8443f9aff3c55edb7f8fef28fc");
       }
     case "true":
       var local_726 = x.data;
       return pestovalIndex;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                    ,"56d9fbebaa75d3344238b42c2f66dbca");
   }
};
var send = rts.builtins.IO.network["socketSend"];
var truncateMutArray = rts.builtins.Mut.Array["truncate"];
var popLastMutArray = function (__array6) {
   return _3b_({infixl: length4(__array6)
               ,infixr: function (length6) {
                  var x = _3e_({infixl: length6,infixr: 0.0});
                  switch (x.tag)
                  {
                    case "false":
                      var local_742 = x.data;
                      return __return({tag: "nothing",data: {}});
                    case "true":
                      var local_743 = x.data;
                      return _3b_({infixl: readMutArray({index: _2d_({infixl: length6
                                                                     ,infixr: 1.0})
                                                        ,object: __array6})
                                  ,infixr: function (result) {
                                     return _3b_({infixl: truncateMutArray({object: __array6
                                                                           ,stop: _2d_({infixl: length6
                                                                                       ,infixr: 1.0})})
                                                 ,infixr: function (local_744) {
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
var find1 = function (local_766) {
   return first({that: function (local_767) {
                   return _3d__3d_({infixl: byteAt({index: local_767
                                                   ,object: local_766.__bytes})
                                   ,infixr: local_766.byte});
                }
                ,stream: _2e__2e_({start: local_766.start
                                  ,stop: length(local_766.__bytes)})});
};
var unsuffixed = function (local_779) {
   var x = isSuffixOf({suffix: local_779.suffix,whole: local_779.whole});
   switch (x.tag)
   {
     case "false":
       var local_780 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_781 = x.data;
       return {tag: "just"
              ,data: slice1({object: local_779.whole
                            ,start: 0.0
                            ,stop: _2d_({infixl: length(local_779.whole)
                                        ,infixr: length(local_779.suffix)})})};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6c2d206c45c348b3b8e2bbfdae7bde35"
                                    ,"7d90a0e076a149c4443b780b21470ef3");
   }
};
var removeSuffix = function (local_778) {
   var x = unsuffixed({suffix: local_778.suffix,whole: local_778.whole});
   switch (x.tag)
   {
     case "just":
       return id1(x.data);
     case "nothing":
       var local_782 = x.data;
       return local_778.whole;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8c9d00ae73ab41ca903aa34ee4c6601a"
                                    ,"97a63e2f16bd481c6e64fd0c8a6d92fa");
   }
};
var packetsEndWith = function (local_787) {
   var x = _3d__3d_({infixl: local_787.stop,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_788 = x.data;
       return _3b_({infixl: readMutArray({index: _2d_({infixl: local_787.stop
                                                      ,infixr: 1.0})
                                         ,object: local_787.packets1})
                   ,infixr: function (local_789) {
                      var x = isSuffixOf({suffix: local_787.suffix,whole: local_789});
                      switch (x.tag)
                      {
                        case "false":
                          var local_790 = x.data;
                          var x = unsuffixed({suffix: local_789,whole: local_787.suffix});
                          switch (x.tag)
                          {
                            case "just":
                              var remain1 = x.data;
                              return packetsEndWith({suffix: remain1
                                                    ,stop: _2d_({infixl: local_787.stop
                                                                ,infixr: 1.0})
                                                    ,packets1: local_787.packets1});
                            case "nothing":
                              var local_791 = x.data;
                              return __return({tag: "false",data: {}});
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                           ,"0d0804c08ad23d9eed424fc83122d6dc");
                          }
                        case "true":
                          var local_792 = x.data;
                          return __return({tag: "true",data: {}});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                       ,"49052b2836be0b25cb20bc95d00972ca");
                      }
                   }});
     case "true":
       var local_793 = x.data;
       return __return({tag: "false",data: {}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a2f069d7413941fdafe42795f6970175"
                                    ,"ae670587961cb7d305eef1133a3bbc18");
   }
};
var parseHttpHeaderPacket = function (local_765) {
   var x = find1({start: local_765.start,__bytes: local_765.newPacket,byte: 10.0});
   switch (x.tag)
   {
     case "just":
       var local_768 = x.data;
       var local_769 = _2b_({infixl: local_768,infixr: 1.0});
       return _3b_({infixl: length4(local_765.packets1)
                   ,infixr: function (local_770) {
                      var done1 = function (local_771) {
                         return _3b_({infixl: sequence(map({stream: _2e__2e_({start: 0.0
                                                                             ,stop: local_770})
                                                           ,mapping: function (local_772) {
                                                              return readMutArray({index: local_772
                                                                                  ,object: local_765.packets1});
                                                           }}))
                                     ,infixr: function (local_773) {
                                        var local_776 =
                                        concat2(_2b__2b_2({infixl: local_773
                                                          ,infixr: function (local_774) {
                                                             return _3a__3a_({infixl: slice1({object: local_765.newPacket
                                                                                             ,start: 0.0
                                                                                             ,stop: local_768})
                                                                             ,infixr: function (local_775) {
                                                                                return {tag: "empty"
                                                                                       ,data: {}};
                                                                             }});
                                                          }}));
                                        var local_783 =
                                        toArray(map({stream: split1({__bytes: local_776
                                                                    ,seperator: rts.bytes([10])})
                                                    ,mapping: function (local_777) {
                                                       return removeSuffix({suffix: rts.bytes([13])
                                                                           ,whole: local_777});
                                                    }}));
                                        return _3b_({infixl: truncateMutArray({object: local_765.packets1
                                                                              ,stop: 0.0})
                                                    ,infixr: function (local_784) {
                                                       return _3b_({infixl: appendMutArray({object: local_765.packets1
                                                                                           ,value: slice1({object: local_765.newPacket
                                                                                                          ,start: local_769
                                                                                                          ,stop: length(local_765.newPacket)})})
                                                                   ,infixr: function (local_785) {
                                                                      return __return({tag: "just"
                                                                                      ,data: local_783});
                                                                   }});
                                                    }});
                                     }});
                      };
                      var local_794 = function (local_786) {
                         return packetsEndWith({suffix: local_786
                                               ,stop: local_770
                                               ,packets1: local_765.packets1});
                      };
                      var next1 = function (local_795) {
                         return parseHttpHeaderPacket({start: local_769
                                                      ,newPacket: local_765.newPacket
                                                      ,packets1: local_765.packets1});
                      };
                      var x = _3d__3d_({infixl: local_768,infixr: 0.0});
                      switch (x.tag)
                      {
                        case "false":
                          var local_796 = x.data;
                          var local_797 = byteAt({index: _2d_({infixl: local_768
                                                              ,infixr: 1.0})
                                                 ,object: local_765.newPacket});
                          var x = _3d__3d_({infixl: local_797,infixr: 10.0});
                          switch (x.tag)
                          {
                            case "false":
                              var local_798 = x.data;
                              var x = _3d__3d_({infixl: local_797,infixr: 13.0});
                              switch (x.tag)
                              {
                                case "false":
                                  return next1(x.data);
                                case "true":
                                  var local_799 = x.data;
                                  var x = _3d__3d_({infixl: local_768,infixr: 1.0});
                                  switch (x.tag)
                                  {
                                    case "false":
                                      var local_800 = x.data;
                                      var x =
                                      _3d__3d_({infixl: byteAt({index: _2d_({infixl: local_768
                                                                            ,infixr: 2.0})
                                                               ,object: local_765.newPacket})
                                               ,infixr: 10.0});
                                      switch (x.tag)
                                      {
                                        case "false":
                                          return next1(x.data);
                                        case "true":
                                          return done1(x.data);
                                        default:
                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                       ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                       ,"2a6eda3fea34bfc4f50863f20c1e9ac2");
                                      }
                                    case "true":
                                      var local_801 = x.data;
                                      return _3b_({infixl: local_794(rts.bytes([10]))
                                                  ,infixr: function (local_802) {
                                                     var x = local_802;
                                                     switch (x.tag)
                                                     {
                                                       case "false":
                                                         return next1(x.data);
                                                       case "true":
                                                         return done1(x.data);
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
                              return done1(x.data);
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                           ,"2acaafd2775505f6a280aa18fe3c0e44");
                          }
                        case "true":
                          var local_803 = x.data;
                          return _3b_({infixl: local_794(rts.bytes([10]))
                                      ,infixr: function (local_804) {
                                         var x = local_804;
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_805 = x.data;
                                             return _3b_({infixl: local_794(rts.bytes([10
                                                                                      ,13]))
                                                         ,infixr: function (local_806) {
                                                            var x = local_806;
                                                            switch (x.tag)
                                                            {
                                                              case "false":
                                                                return next1(x.data);
                                                              case "true":
                                                                return done1(x.data);
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                                             ,"c323f65fadb272703b7b6aa5fd90432a");
                                                            }
                                                         }});
                                           case "true":
                                             return done1(x.data);
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
       var local_807 = x.data;
       return _3b_({infixl: appendMutArray({object: local_765.packets1
                                           ,value: local_765.newPacket})
                   ,infixr: function (local_808) {
                      return __return({tag: "nothing",data: {}});
                   }});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                    ,"a641e1eefdb6d290e8f5e30eb99ae939");
   }
};
var requestHeaderIndex = function (x813) {
   switch (x813.tag)
   {
     case "referer":
       var local_814 = x813.data;
       return 9.0;
     case "range":
       var local_815 = x813.data;
       return 4.0;
     case "contentLength":
       var local_816 = x813.data;
       return 0.0;
     case "connection":
       var local_817 = x813.data;
       return 3.0;
     case "host":
       var local_818 = x813.data;
       return 5.0;
     case "userAgent":
       var local_819 = x813.data;
       return 10.0;
     case "ifModifiedSince":
       var local_820 = x813.data;
       return 6.0;
     case "ifRange":
       var local_821 = x813.data;
       return 8.0;
     case "count":
       var local_822 = x813.data;
       return 11.0;
     case "transferEncoding":
       var local_823 = x813.data;
       return 1.0;
     case "expect":
       var local_824 = x813.data;
       return 2.0;
     case "ifUnmodifiedSince":
       var local_825 = x813.data;
       return 7.0;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_1b4c5f4e650b40db91d34fcbb46eedcc"
                                    ,"2d1d3f6c02b34a16b1ecc9cff08b339e");
   }
};
var toLower8 = function (local_830) {
   var x = _7c__7c_({infixl: _26__26_({infixl: _2264_({infixl: 65.0,infixr: local_830})
                                      ,infixr: function (local_831) {
                                         return _2264_({infixl: local_830,infixr: 90.0});
                                      }})
                    ,infixr: function (local_832) {
                       return _26__26_({infixl: _2264_({infixl: 192.0,infixr: local_830})
                                       ,infixr: function (local_833) {
                                          return _26__26_({infixl: _2264_({infixl: local_830
                                                                          ,infixr: 222.0})
                                                          ,infixr: function (local_834) {
                                                             return _2260_({infixl: local_830
                                                                           ,infixr: 215.0});
                                                          }});
                                       }});
                    }});
   switch (x.tag)
   {
     case "false":
       var local_835 = x.data;
       return local_830;
     case "true":
       var local_836 = x.data;
       return _2b_({infixl: local_830,infixr: 32.0});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d53402309e2246e0acda443ccc6735f8"
                                    ,"26914d49ae6cd50363dc7b55bd37d4d5");
   }
};
var numHeadItems = function (local_842) {
   return foldLazy({stream: local_842.stream
                   ,initial: function (local_843) {
                      return id1;
                   }
                   ,binop: function (local_844) {
                      return function (local_845) {
                             var x = local_842.that(local_844.item);
                             switch (x.tag)
                             {
                               case "false":
                                 var local_846 = x.data;
                                 return local_845;
                               case "true":
                                 var local_847 = x.data;
                                 return local_844.rest({})(_2b_({infixl: local_845
                                                                ,infixr: 1.0}));
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_8e2a63199d5c4946ae51e428c77e2587"
                                                              ,"b73a61d07547543acce9e5aa2b53f447");
                             }
                          };
                   }})(0.0);
};
var parseHeader = function (local_828) {
   var local_837 = function (local_829) {
      return {headerNameOrig: local_829
             ,headerNameLower: toBytes(toArray(map({stream: fromBytes(local_829)
                                                   ,mapping: toLower8})))};
   };
   var x = find1({start: 0.0,__bytes: local_828,byte: 58.0});
   switch (x.tag)
   {
     case "just":
       var local_838 = x.data;
       var x = Object.assign({__data: function (local_839) {
                               return slice1({object: local_828
                                             ,start: _2b_({infixl: _2b_({infixl: local_838
                                                                        ,infixr: 1.0})
                                                          ,infixr: numHeadItems({that: function (local_840) {
                                                                                   return _7c__7c_({infixl: _3d__3d_({infixl: local_840
                                                                                                                     ,infixr: 32.0})
                                                                                                   ,infixr: function (local_841) {
                                                                                                      return _3d__3d_({infixl: local_840
                                                                                                                      ,infixr: 9.0});
                                                                                                   }});
                                                                                }
                                                                                ,stream: fromBytes(slice1({object: local_828
                                                                                                          ,start: _2b_({infixl: local_838
                                                                                                                       ,infixr: 1.0})
                                                                                                          ,stop: local_839}))})})
                                             ,stop: local_839});
                            }(length(local_828))}
                            ,local_837(slice1({object: local_828
                                              ,start: 0.0
                                              ,stop: local_838})));
       delete x.cacheId;
       return x;
     case "nothing":
       var local_848 = x.data;
       var x = Object.assign({__data: rts.bytesFromAscii("")},local_837(local_828));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_24c62861bfb940e4addebcc337a003f8"
                                    ,"2fd2696b8bb145a1f8ea35cf6754cfb8");
   }
};
var requestHeaderIndexFromText = function (local_850) {
   var local_851 = length(local_850);
   var local_855 = function (local_852) {
      var x = _3d__3d_({infixl: local_850,infixr: local_852.text});
      switch (x.tag)
      {
        case "false":
          var local_853 = x.data;
          return {tag: "nothing",data: {}};
        case "true":
          var local_854 = x.data;
          return {tag: "just",data: requestHeaderIndex(local_852.value)};
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                       ,"dc1fada55c8b610b4ec39d131179bc92");
      }
   };
   var x = _3d__3d_({infixl: local_851,infixr: 4.0});
   switch (x.tag)
   {
     case "false":
       var local_856 = x.data;
       var x = _3d__3d_({infixl: local_851,infixr: 5.0});
       switch (x.tag)
       {
         case "false":
           var local_857 = x.data;
           var x = _3d__3d_({infixl: local_851,infixr: 6.0});
           switch (x.tag)
           {
             case "false":
               var local_858 = x.data;
               var x = _3d__3d_({infixl: local_851,infixr: 7.0});
               switch (x.tag)
               {
                 case "false":
                   var local_859 = x.data;
                   var x = _3d__3d_({infixl: local_851,infixr: 8.0});
                   switch (x.tag)
                   {
                     case "false":
                       var local_860 = x.data;
                       var x = _3d__3d_({infixl: local_851,infixr: 10.0});
                       switch (x.tag)
                       {
                         case "false":
                           var local_861 = x.data;
                           var x = _3d__3d_({infixl: local_851,infixr: 14.0});
                           switch (x.tag)
                           {
                             case "false":
                               var local_862 = x.data;
                               var x = _3d__3d_({infixl: local_851,infixr: 17.0});
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_863 = x.data;
                                   var x = _3d__3d_({infixl: local_851,infixr: 19.0});
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_864 = x.data;
                                       return {tag: "nothing",data: {}};
                                     case "true":
                                       var local_865 = x.data;
                                       return local_855({text: rts.bytesFromAscii("if-unmodified-since")
                                                        ,value: {tag: "ifUnmodifiedSince"
                                                                ,data: {}}});
                                     default:
                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                    ,"f8cf9e99c6ebab86468dac6f079e1d43");
                                   }
                                 case "true":
                                   var local_866 = x.data;
                                   var x = _3d__3d_({infixl: local_850
                                                    ,infixr: rts.bytesFromAscii("transfer-encoding")});
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_867 = x.data;
                                       var x = _3d__3d_({infixl: local_850
                                                        ,infixr: rts.bytesFromAscii("if-modified-since")});
                                       switch (x.tag)
                                       {
                                         case "false":
                                           var local_868 = x.data;
                                           return {tag: "nothing",data: {}};
                                         case "true":
                                           var local_869 = x.data;
                                           return {tag: "just"
                                                  ,data: requestHeaderIndex({tag: "ifModifiedSince"
                                                                            ,data: {}})};
                                         default:
                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                        ,"5c9b7e120cfcbfe66378a56aa55e1554");
                                       }
                                     case "true":
                                       var local_870 = x.data;
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
                               var local_871 = x.data;
                               return local_855({text: rts.bytesFromAscii("content-length")
                                                ,value: {tag: "contentLength",data: {}}});
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                            ,"316352807090bd4b8e1627c428b18ad0");
                           }
                         case "true":
                           var local_872 = x.data;
                           var x = _3d__3d_({infixl: local_850
                                            ,infixr: rts.bytesFromAscii("user-agent")});
                           switch (x.tag)
                           {
                             case "false":
                               var local_873 = x.data;
                               var x = _3d__3d_({infixl: local_850
                                                ,infixr: rts.bytesFromAscii("connection")});
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_874 = x.data;
                                   return {tag: "nothing",data: {}};
                                 case "true":
                                   var local_875 = x.data;
                                   return {tag: "just"
                                          ,data: requestHeaderIndex({tag: "connection"
                                                                    ,data: {}})};
                                 default:
                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                ,"0a18521fa15139803614889d5ac640f3");
                               }
                             case "true":
                               var local_876 = x.data;
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
                       var local_877 = x.data;
                       return local_855({text: rts.bytesFromAscii("if-range")
                                        ,value: {tag: "ifRange",data: {}}});
                     default:
                       throw rts.exceptions.LamduBug("Unhandled case"
                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                    ,"0c12468dbe34d1382d0b97b93b5cab94");
                   }
                 case "true":
                   var local_878 = x.data;
                   return local_855({text: rts.bytesFromAscii("referer")
                                    ,value: {tag: "referer",data: {}}});
                 default:
                   throw rts.exceptions.LamduBug("Unhandled case"
                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                ,"13eb12f71c41a5c676528975f4cd2d8f");
               }
             case "true":
               var local_879 = x.data;
               return local_855({text: rts.bytesFromAscii("expect")
                                ,value: {tag: "expect",data: {}}});
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                            ,"a709b7964f58d9b479a336260545d465");
           }
         case "true":
           var local_880 = x.data;
           return local_855({text: rts.bytesFromAscii("range")
                            ,value: {tag: "range",data: {}}});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                        ,"1d20a17a150e74e964a7731e9e75cc90");
       }
     case "true":
       var local_881 = x.data;
       return local_855({text: rts.bytesFromAscii("host"),value: {tag: "host",data: {}}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                    ,"b082b30c0d03c8abd35416fd055c4e65");
   }
};
var parseHeaders = function (local_811) {
   var local_888 = runMutArray(_3b_({infixl: newMutArray
                                    ,infixr: function (local_812) {
                                       return _3b_({infixl: sequence__(replicate({count: requestHeaderIndex({tag: "count"
                                                                                                            ,data: {}})
                                                                                 ,item: appendMutArray({object: local_812
                                                                                                       ,value: {tag: "nothing"
                                                                                                               ,data: {}}})}))
                                                   ,infixr: function (local_826) {
                                                      return _3b_({infixl: sequence__(map({stream: _2e__2e_({start: 1.0
                                                                                                            ,stop: length1(local_811)})
                                                                                          ,mapping: function (local_827) {
                                                                                             var local_849 =
                                                                                             parseHeader(item1({index: local_827
                                                                                                               ,object: local_811}));
                                                                                             var local_882 =
                                                                                             requestHeaderIndexFromText(local_849.headerNameLower);
                                                                                             var x =
                                                                                             local_882;
                                                                                             switch (x.tag)
                                                                                             {
                                                                                               case "just":
                                                                                                 var index8 =
                                                                                                 x.data;
                                                                                                 return _3b_({infixl: readMutArray({index: index8
                                                                                                                                   ,object: local_812})
                                                                                                             ,infixr: function (local_883) {
                                                                                                                var x =
                                                                                                                local_883;
                                                                                                                switch (x.tag)
                                                                                                                {
                                                                                                                  case "just":
                                                                                                                    var local_884 =
                                                                                                                    x.data;
                                                                                                                    throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                                                                                    ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                    ,"0ba4efe1ab9b937a5c4c329950c130eb");
                                                                                                                  case "nothing":
                                                                                                                    var local_885 =
                                                                                                                    x.data;
                                                                                                                    return writeMutArray({index: index8
                                                                                                                                         ,object: local_812
                                                                                                                                         ,value: {tag: "just"
                                                                                                                                                 ,data: local_849.__data}});
                                                                                                                  default:
                                                                                                                    throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                 ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                 ,"46e58c07915691b0449b51e2c57e8c26");
                                                                                                                }
                                                                                                             }});
                                                                                               case "nothing":
                                                                                                 var local_886 =
                                                                                                 x.data;
                                                                                                 return __return({});
                                                                                               default:
                                                                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                              ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                              ,"96d7c2e4942aa324705674b28c8d8892");
                                                                                             }
                                                                                          }}))
                                                                  ,infixr: function (local_887) {
                                                                     return __return(local_812);
                                                                  }});
                                                   }});
                                    }}));
   var value1 = function (local_889) {
      return item1({index: requestHeaderIndex(local_889),object: local_888});
   };
   return {referer: value1({tag: "referer",data: {}})
          ,range: value1({tag: "range",data: {}})
          ,contentLength: value1({tag: "contentLength",data: {}})
          ,connection: value1({tag: "connection",data: {}})
          ,host: value1({tag: "host",data: {}})
          ,userAgent: value1({tag: "userAgent",data: {}})
          ,ifModifiedSince: value1({tag: "ifModifiedSince",data: {}})
          ,ifRange: value1({tag: "ifRange",data: {}})
          ,transferEncoding: value1({tag: "transferEncoding",data: {}})
          ,expect: value1({tag: "expect",data: {}})
          ,ifUnmodifiedSince: value1({tag: "ifUnmodifiedSince",data: {}})};
};
var parseHttpVersion = function (local_894) {
   var x = _26__26_({infixl: _3d__3d_({infixl: slice1({object: local_894
                                                      ,start: 0.0
                                                      ,stop: 5.0})
                                      ,infixr: rts.bytesFromAscii("HTTP/")})
                    ,infixr: function (local_895) {
                       return _26__26_({infixl: _3d__3d_({infixl: slice1({object: local_894
                                                                         ,start: 6.0
                                                                         ,stop: 7.0})
                                                         ,infixr: rts.bytesFromAscii(".")})
                                       ,infixr: function (local_896) {
                                          return _2265_({infixl: length(local_894)
                                                        ,infixr: 8.0});
                                       }});
                    }});
   switch (x.tag)
   {
     case "false":
       var local_897 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                       ,"d4d438d8b8c3035dd13c03c182e694f8");
     case "true":
       var local_898 = x.data;
       var local_899 = byteAt({index: 5.0,object: local_894});
       var local_900 = byteAt({index: 7.0,object: local_894});
       var x = _3d__3d_({infixl: local_899,infixr: 49.0});
       switch (x.tag)
       {
         case "false":
           var local_901 = x.data;
           var x = _26__26_({infixl: _3d__3d_({infixl: local_899,infixr: 50.0})
                            ,infixr: function (local_902) {
                               return _3d__3d_({infixl: local_900,infixr: 48.0});
                            }});
           switch (x.tag)
           {
             case "false":
               var local_903 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_904 = x.data;
               return {minor: 0.0,major: 2.0};
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                            ,"6d72ed51030c146e142824d8c5608502");
           }
         case "true":
           var local_905 = x.data;
           var x = _3d__3d_({infixl: local_900,infixr: 49.0});
           switch (x.tag)
           {
             case "false":
               var local_906 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_907 = x.data;
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
var parseHttpPathAndQuery = function (local_908) {
   var x = find1({start: 0.0,__bytes: local_908,byte: 63.0});
   switch (x.tag)
   {
     case "just":
       var local_909 = x.data;
       return {path: slice1({object: local_908,start: 0.0,stop: local_909})
              ,query1: slice1({object: local_908
                              ,start: local_909
                              ,stop: length(local_908)})};
     case "nothing":
       var local_910 = x.data;
       return {path: local_908,query1: rts.bytesFromAscii("")};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_e1ddf2e103fc4a77ba877761b12b0489"
                                    ,"7b5454e4261c24d201d9384e83ca385c");
   }
};
var parseRequestLine = function (local_890) {
   var local_891 = toArray(split({text: local_890,seperator: rts.bytesFromAscii(" ")}));
   var x = _3d__3d_({infixl: length1(local_891),infixr: 3.0});
   switch (x.tag)
   {
     case "false":
       var local_892 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                       ,"a7de8d96fb5e1479e6bb2a3ddb6eeaaa");
     case "true":
       var local_893 = x.data;
       var x = Object.assign({httpVersion: parseHttpVersion(item1({index: 2.0
                                                                  ,object: local_891}))
                             ,method: item1({index: 0.0,object: local_891})}
                            ,parseHttpPathAndQuery(item1({index: 1.0
                                                         ,object: local_891})));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                    ,"1a29dea7dd98168ceba76256560b374b");
   }
};
var unprefixed = function (local_920) {
   var x = isPrefixOf({whole: local_920.whole,prefix: local_920.prefix});
   switch (x.tag)
   {
     case "false":
       var local_921 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_922 = x.data;
       return {tag: "just"
              ,data: slice1({object: local_920.whole
                            ,start: length(local_920.prefix)
                            ,stop: length(local_920.whole)})};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_1d18b3f94ac64cc39b8dc131624a5e9f"
                                    ,"2de3ba5a8affabb154216378ec3580e6");
   }
};
var httpAddLocalPath = function (local_911) {
   var local_912 = local_911.path;
   var nonEmpty1 = function (local_913) {
      var x = _3d__3d_({infixl: local_913,infixr: rts.bytesFromAscii("")});
      switch (x.tag)
      {
        case "false":
          var local_914 = x.data;
          return local_913;
        case "true":
          var local_915 = x.data;
          return rts.bytesFromAscii("/");
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_97b5de980c3149218877e33920fb5729"
                                       ,"5ae9e78cf85c5d6952c38eb479596553");
      }
   };
   var local_919 = function (local_916) {
      return nonEmpty1(function () {
             var x = find1({start: 0.0,__bytes: local_916,byte: 47.0});
             switch (x.tag)
             {
               case "just":
                 var local_917 = x.data;
                 return slice1({object: local_916
                               ,start: local_917
                               ,stop: length(local_916)});
               case "nothing":
                 var local_918 = x.data;
                 return rts.bytesFromAscii("");
               default:
                 throw rts.exceptions.LamduBug("Unhandled case"
                                              ,"DEF_97b5de980c3149218877e33920fb5729"
                                              ,"8d9250a6123ff265d7652592a88c96a8");
             }
          }());
   };
   var x = Object.assign({localPath: function () {
                           var x = unprefixed({whole: local_912
                                              ,prefix: rts.bytesFromAscii("http://")});
                           switch (x.tag)
                           {
                             case "just":
                               return local_919(x.data);
                             case "nothing":
                               var local_923 = x.data;
                               var x = unprefixed({whole: local_912
                                                  ,prefix: rts.bytesFromAscii("https://")});
                               switch (x.tag)
                               {
                                 case "just":
                                   return local_919(x.data);
                                 case "nothing":
                                   var local_924 = x.data;
                                   return nonEmpty1(local_912);
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
                        ,local_911);
   delete x.cacheId;
   return x;
};
var httpContinueMessage = function (local_927) {
   return concat2(_3a__3a_({infixl: function () {
                              var x = _3d__3d_({infixl: local_927
                                               ,infixr: {minor: 1.0,major: 1.0}});
                              switch (x.tag)
                              {
                                case "false":
                                  var local_928 = x.data;
                                  return rts.bytesFromAscii("HTTP/1.0");
                                case "true":
                                  var local_929 = x.data;
                                  return rts.bytesFromAscii("HTTP/1.1");
                                default:
                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                               ,"DEF_28b20b49b76041158f817cb6f1ae7069"
                                                               ,"7a33dc1474f28318b0a1a21410017295");
                              }
                           }()
                           ,infixr: function (local_930) {
                              return _3a__3a_({infixl: rts.bytesFromAscii(" 100 Continue")
                                              ,infixr: function (local_931) {
                                                 return _3a__3a_({infixl: rts.bytes([13
                                                                                    ,10
                                                                                    ,13
                                                                                    ,10])
                                                                 ,infixr: function (local_932) {
                                                                    return {tag: "empty"
                                                                           ,data: {}};
                                                                 }});
                                              }});
                           }}));
};
var parseHttpRequestPacket = function (local_741) {
   var local_748 = _3b_({infixl: popLastMutArray(local_741.unparsedPackets1)
                        ,infixr: function (local_745) {
                           var x = local_745;
                           switch (x.tag)
                           {
                             case "just":
                               var local_746 = x.data;
                               return parseHttpRequestPacket({socket: local_741.socket
                                                             ,unparsedPackets1: local_741.unparsedPackets1
                                                             ,newPacket: local_746
                                                             ,stateRef1: local_741.stateRef1
                                                             ,handler: local_741.handler});
                             case "nothing":
                               var local_747 = x.data;
                               return __return({});
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                            ,"a71ca59bb3302212a2d667ac7d89c4e8");
                           }
                        }});
   return _3b_({infixl: readMutRef(local_741.stateRef1)
               ,infixr: function (x749) {
                  switch (x749.tag)
                  {
                    case "body":
                      var local_750 = x749.data;
                      var local_751 = length(local_741.newPacket);
                      var x = _3c_({infixl: local_751,infixr: local_750.remain});
                      switch (x.tag)
                      {
                        case "false":
                          var local_752 = x.data;
                          return _3b_({infixl: length4(local_741.unparsedPackets1)
                                      ,infixr: function (local_753) {
                                         return _3b_({infixl: sequence(map({stream: _2e__2e_({start: 0.0
                                                                                             ,stop: local_753})
                                                                           ,mapping: function (local_754) {
                                                                              return readMutArray({index: local_754
                                                                                                  ,object: local_741.unparsedPackets1});
                                                                           }}))
                                                     ,infixr: function (packets) {
                                                        return _3b_({infixl: _3b_({infixl: truncateMutArray({object: local_741.unparsedPackets1
                                                                                                            ,stop: 0.0})
                                                                                  ,infixr: function (local_755) {
                                                                                     return local_741.handler({request1: function () {
                                                                                                                 var x =
                                                                                                                 Object.assign({body: {tag: "just"
                                                                                                                                      ,data: concat2(_2b__2b_2({infixl: packets
                                                                                                                                                               ,infixr: function (local_756) {
                                                                                                                                                                  return _3a__3a_({infixl: slice1({object: local_741.newPacket
                                                                                                                                                                                                  ,start: 0.0
                                                                                                                                                                                                  ,stop: local_750.remain})
                                                                                                                                                                                  ,infixr: function (local_757) {
                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                  }});
                                                                                                                                                               }}))}}
                                                                                                                              ,local_750.request1);
                                                                                                                 delete x.cacheId;
                                                                                                                 return x;
                                                                                                              }()
                                                                                                              ,socket: local_741.socket});
                                                                                  }})
                                                                    ,infixr: function (local_758) {
                                                                       return _3b_({infixl: writeMutRef({object: local_741.stateRef1
                                                                                                        ,value: {tag: "header"
                                                                                                                ,data: {}}})
                                                                                   ,infixr: function (local_759) {
                                                                                      var x =
                                                                                      _3c_({infixl: local_750.remain
                                                                                           ,infixr: local_751});
                                                                                      switch (x.tag)
                                                                                      {
                                                                                        case "false":
                                                                                          var local_760 =
                                                                                          x.data;
                                                                                          return __return({});
                                                                                        case "true":
                                                                                          var local_761 =
                                                                                          x.data;
                                                                                          return parseHttpRequestPacket({socket: local_741.socket
                                                                                                                        ,unparsedPackets1: local_741.unparsedPackets1
                                                                                                                        ,newPacket: slice1({object: local_741.newPacket
                                                                                                                                           ,start: local_750.remain
                                                                                                                                           ,stop: local_751})
                                                                                                                        ,stateRef1: local_741.stateRef1
                                                                                                                        ,handler: local_741.handler});
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
                          var local_762 = x.data;
                          return _3b_({infixl: appendMutArray({object: local_741.unparsedPackets1
                                                              ,value: local_741.newPacket})
                                      ,infixr: function (local_763) {
                                         return writeMutRef({object: local_741.stateRef1
                                                            ,value: {tag: "body"
                                                                    ,data: {request1: local_750.request1
                                                                           ,remain: _2d_({infixl: local_750.remain
                                                                                         ,infixr: local_751})}}});
                                      }});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                       ,"4a7857b1e6dc15eee111f928eef30ceb");
                      }
                    case "header":
                      var local_764 = x749.data;
                      return _3b_({infixl: parseHttpHeaderPacket({start: 0.0
                                                                 ,newPacket: local_741.newPacket
                                                                 ,packets1: local_741.unparsedPackets1})
                                  ,infixr: function (local_809) {
                                     var x = local_809;
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_810 = x.data;
                                         var request2 = function () {
                                                           var x =
                                                           Object.assign({headers: parseHeaders(local_810)}
                                                                        ,httpAddLocalPath(parseRequestLine(item1({index: 0.0
                                                                                                                 ,object: local_810}))));
                                                           delete x.cacheId;
                                                           return x;
                                                        }();
                                         return _3b_({infixl: function () {
                                                        var x =
                                                        _3d__3d_({infixl: request2.headers.expect
                                                                 ,infixr: {tag: "just"
                                                                          ,data: rts.bytesFromAscii("100-continue")}});
                                                        switch (x.tag)
                                                        {
                                                          case "false":
                                                            var local_925 = x.data;
                                                            return __return({});
                                                          case "true":
                                                            var local_926 = x.data;
                                                            return send({__data: httpContinueMessage(request2.httpVersion)
                                                                        ,socket: local_741.socket});
                                                          default:
                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                         ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                         ,"0010e59778d59572282a2dab5b43c99f");
                                                        }
                                                     }()
                                                     ,infixr: function (local_933) {
                                                        return _3b_({infixl: function () {
                                                                       var x =
                                                                       request2.headers.contentLength;
                                                                       switch (x.tag)
                                                                       {
                                                                         case "just":
                                                                           var local_934 =
                                                                           x.data;
                                                                           return writeMutRef({object: local_741.stateRef1
                                                                                              ,value: {tag: "body"
                                                                                                      ,data: {request1: request2
                                                                                                             ,remain: parseInt(local_934)}}});
                                                                         case "nothing":
                                                                           var local_935 =
                                                                           x.data;
                                                                           return local_741.handler({request1: function () {
                                                                                                       var x =
                                                                                                       Object.assign({body: {tag: "nothing"
                                                                                                                            ,data: {}}}
                                                                                                                    ,request2);
                                                                                                       delete x.cacheId;
                                                                                                       return x;
                                                                                                    }()
                                                                                                    ,socket: local_741.socket});
                                                                         default:
                                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                        ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                        ,"c91c5cea0890a94419165f2c0e413659");
                                                                       }
                                                                    }()
                                                                    ,infixr: function (local_936) {
                                                                       return local_748;
                                                                    }});
                                                     }});
                                       case "nothing":
                                         var local_937 = x.data;
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
var parseHttpRequests = function (local_739) {
   return _3b_({infixl: newMutRef({tag: "header",data: {}})
               ,infixr: function (stateRef) {
                  return _3b_({infixl: newMutArray
                              ,infixr: function (unparsedPackets) {
                                 return __return(function (local_740) {
                                        return parseHttpRequestPacket({socket: local_739.socket
                                                                      ,unparsedPackets1: unparsedPackets
                                                                      ,newPacket: local_740
                                                                      ,stateRef1: stateRef
                                                                      ,handler: local_739.handler});
                                     });
                              }});
               }});
};
var openTcpServer = rts.builtins.IO.network["openTcpServer"];
var httpServer = function (local_728) {
   return openTcpServer({connectionHandler: function (socket) {
                           return parseHttpRequests({socket: socket
                                                    ,handler: function (local_729) {
                                                       return _3b_({infixl: local_728.handler(local_729.request1)
                                                                   ,infixr: function (local_730) {
                                                                      return send({__data: _2b__2b_1({a: join({texts: _3a__3a_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("HTTP/1.1")
                                                                                                                                                              ,infixr: function (local_731) {
                                                                                                                                                                 return _3a__3a_({infixl: showNum(local_730.status.code)
                                                                                                                                                                                 ,infixr: function (local_732) {
                                                                                                                                                                                    return _3a__3a_({infixl: local_730.status.message
                                                                                                                                                                                                    ,infixr: function (local_733) {
                                                                                                                                                                                                       return {tag: "empty"
                                                                                                                                                                                                              ,data: {}};
                                                                                                                                                                                                    }});
                                                                                                                                                                                 }});
                                                                                                                                                              }})
                                                                                                                                             ,seperator: rts.bytesFromAscii(" ")})
                                                                                                                               ,infixr: function (local_734) {
                                                                                                                                  return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Type: ")
                                                                                                                                                                    ,b: local_730.content.mimeType})
                                                                                                                                                  ,infixr: function (local_735) {
                                                                                                                                                     return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Length: ")
                                                                                                                                                                                       ,b: showNum(length(local_730.content.__data))})
                                                                                                                                                                     ,infixr: function (local_736) {
                                                                                                                                                                        return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                        ,infixr: function (local_737) {
                                                                                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                                           ,infixr: function (local_738) {
                                                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                                                           }});
                                                                                                                                                                                        }});
                                                                                                                                                                     }});
                                                                                                                                                  }});
                                                                                                                               }})
                                                                                                              ,seperator: rts.bytesFromAscii("\r\n")})
                                                                                                     ,b: local_730.content.__data})
                                                                                  ,socket: socket});
                                                                   }});
                                                    }});
                        }
                        ,exclusive: {tag: "false",data: {}}
                        ,host: local_728.host
                        ,port: local_728.port});
};
var pestoval = _3b_({infixl: pestovalDb
                    ,infixr: function (database1) {
                       return _3b_({infixl: environment(rts.bytesFromAscii("PORT"))
                                   ,infixr: function (port1) {
                                      return httpServer({host: rts.bytesFromAscii("0.0.0.0")
                                                        ,port: function () {
                                                           var x = port1;
                                                           switch (x.tag)
                                                           {
                                                             case "just":
                                                               var local_66 = x.data;
                                                               return parseInt(local_66);
                                                             case "nothing":
                                                               var local_67 = x.data;
                                                               return 5000.0;
                                                             default:
                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                            ,"DEF_03805ab8c62443a3b30436fe169288a2"
                                                                                            ,"3c935b9a695b9f760ec99c27b590c3d2");
                                                           }
                                                        }()
                                                        ,handler: function (request) {
                                                           return pestovalHandler({request1: request
                                                                                  ,database: database1});
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
