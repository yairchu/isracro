"use strict";
var rts = require("./rts.js");
var environment = rts.builtins.IO.os["env"];
var length = rts.builtins.Bytes["length"];
var _2b_ = rts.builtins.Prelude["+"];
var slice1 = rts.builtins.Bytes["slice"];
var _3d__3d_ = rts.builtins.Prelude["=="];
var _2d_ = rts.builtins.Prelude["-"];
var iterate = function (local_10) {
   return {tag: "nonEmpty"
          ,data: {head: local_10.initial
                 ,tail: function (local_11) {
                    return iterate({initial: local_10.next(local_10.initial)
                                   ,next: local_10.next});
                 }}};
};
var _3e_ = rts.builtins.Prelude[">"];
var _3c_ = rts.builtins.Prelude["<"];
var take = function (local_16) {
   var x = local_16.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_17 = x.data;
       var x = local_16.__while(local_17.head);
       switch (x.tag)
       {
         case "false":
           var local_18 = x.data;
           return {tag: "empty",data: {}};
         case "true":
           var local_19 = x.data;
           return {tag: "nonEmpty"
                  ,data: {head: local_17.head
                         ,tail: function (local_20) {
                            return take({stream: local_17.tail({})
                                        ,__while: local_16.__while});
                         }}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_ef15e9ece99a44fc9a41740a570f3fc9"
                                        ,"388ac081138d4b3bb98f2c7c6c5674d6");
       }
     case "empty":
       var local_21 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_ef15e9ece99a44fc9a41740a570f3fc9"
                                    ,"908fa9a99fac4a058be9f984a22b1430");
   }
};
var _2e__2e_1 = function (local_8) {
   return take({stream: iterate({initial: local_8.start
                                ,next: function (local_9) {
                                   return _2b_({infixl: local_9,infixr: local_8.step});
                                }})
               ,__while: function () {
                  var x = _3e_({infixl: local_8.step,infixr: 0.0});
                  switch (x.tag)
                  {
                    case "false":
                      var local_12 = x.data;
                      return function (local_13) {
                             return _3e_({infixl: local_13,infixr: local_8.stop});
                          };
                    case "true":
                      var local_14 = x.data;
                      return function (local_15) {
                             return _3c_({infixl: local_15,infixr: local_8.stop});
                          };
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_976e4af994d74546b61bfcdc6bf2c950"
                                                   ,"0cab2989e68742c6aedf4360d1ce05ae");
                  }
               }()});
};
var _2e__2e_ = function (local_7) {
   return _2e__2e_1({step: 1.0,start: local_7.start,stop: local_7.stop});
};
var first = function (local_22) {
   var x = local_22.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_23 = x.data;
       var x = local_22.that(local_23.head);
       switch (x.tag)
       {
         case "false":
           var local_24 = x.data;
           return first({that: local_22.that,stream: local_23.tail({})});
         case "true":
           var local_25 = x.data;
           return {tag: "just",data: local_23.head};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_8a1642b8d2ef4d669df333f01821017e"
                                        ,"dc5bff2c6387486ea6f4d43193feaf06");
       }
     case "empty":
       var local_26 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8a1642b8d2ef4d669df333f01821017e"
                                    ,"2e32b7557b4e490bb6cd14a351193ae2");
   }
};
var find = function (local_5) {
   var subLen = length(local_5.slice);
   return first({that: function (local_6) {
                   return _3d__3d_({infixl: slice1({object: local_5.__bytes
                                                   ,start: local_6
                                                   ,stop: _2b_({infixl: local_6
                                                               ,infixr: subLen})})
                                   ,infixr: local_5.slice});
                }
                ,stream: _2e__2e_({start: 0.0
                                  ,stop: _2b_({infixl: _2d_({infixl: length(local_5.__bytes)
                                                            ,infixr: subLen})
                                              ,infixr: 1.0})})});
};
var _3a__3a_ = function (local_29) {
   return {tag: "nonEmpty",data: {head: local_29.infixl,tail: local_29.infixr}};
};
var split1 = function (local_4) {
   var x = find({__bytes: local_4.__bytes,slice: local_4.seperator});
   switch (x.tag)
   {
     case "just":
       var local_27 = x.data;
       return _3a__3a_({infixl: slice1({object: local_4.__bytes
                                       ,start: 0.0
                                       ,stop: local_27})
                       ,infixr: function (local_28) {
                          return split1({__bytes: slice1({object: local_4.__bytes
                                                         ,start: _2b_({infixl: local_27
                                                                      ,infixr: length(local_4.seperator)})
                                                         ,stop: length(local_4.__bytes)})
                                        ,seperator: local_4.seperator});
                       }});
     case "nothing":
       var local_30 = x.data;
       return _3a__3a_({infixl: local_4.__bytes
                       ,infixr: function (local_31) {
                          return {tag: "empty",data: {}};
                       }});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_b21053ea92ed45029fa78a5121bf6e3a"
                                    ,"ff767a75261daa1e4a165bc04bb8c028");
   }
};
var foldLazy = function (local_36) {
   var x = local_36.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_37 = x.data;
       return local_36.binop({rest: function (local_38) {
                                var dummy = _3d__3d_({infixl: local_38,infixr: {}});
                                return foldLazy({stream: local_37.tail({})
                                                ,initial: local_36.initial
                                                ,binop: local_36.binop});
                             }
                             ,item: local_37.head});
     case "empty":
       return local_36.initial(x.data);
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a2dc21b7c3b04474a4cd67135dd74e65"
                                    ,"487496adc31e442cbda46679c6451ca8");
   }
};
var map = function (local_33) {
   return foldLazy({stream: local_33.stream
                   ,initial: function (local_34) {
                      return {tag: "empty",data: {}};
                   }
                   ,binop: function (local_35) {
                      return {tag: "nonEmpty"
                             ,data: {head: local_33.mapping(local_35.item)
                                    ,tail: local_35.rest}};
                   }});
};
var split = function (local_3) {
   return split1({__bytes: local_3.text,seperator: local_3.seperator});
};
var newMutArray = rts.builtins.Mut.Array["new"];
var appendMutArray = rts.builtins.Mut.Array["append"];
var __return = rts.builtins.Mut["return"];
var _3b_ = rts.builtins.Mut["bind"];
var sequence__ = function (stream2) {
   return foldLazy({stream: stream2
                   ,initial: function (local_40) {
                      return __return({});
                   }
                   ,binop: function (local_41) {
                      return _3b_({infixl: local_41.item
                                  ,infixr: function (local_42) {
                                     return local_41.rest({});
                                  }});
                   }});
};
var runMutArray = rts.builtins.Mut.Array["run"];
var toArray = function (stream1) {
   return runMutArray(_3b_({infixl: newMutArray
                           ,infixr: function (__array) {
                              return _3b_({infixl: sequence__(map({stream: stream1
                                                                  ,mapping: function (local_39) {
                                                                     return appendMutArray({object: __array
                                                                                           ,value: local_39});
                                                                  }}))
                                          ,infixr: function (local_43) {
                                             return __return(__array);
                                          }});
                           }}));
};
var length1 = rts.builtins.Array["length"];
var item1 = rts.builtins.Array["item"];
var _26__26_ = function (local_47) {
   var x = local_47.infixl;
   switch (x.tag)
   {
     case "false":
       var local_48 = x.data;
       return {tag: "false",data: {}};
     case "true":
       return local_47.infixr(x.data);
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_e75aed3cb68c4fd395ce0c5c287eadba"
                                    ,"b49d483abc72480a838ef25795ee9758");
   }
};
var ignoreError = function (local_50) {
   throw rts.exceptions.ReachedHole("Reached a hole"
                                   ,"DEF_157261c59c9a44f1867b85e4d1b49818"
                                   ,"4c518e5b0faa46fe87f4941f1e0cbe54");
};
var byteAt = rts.builtins.Bytes["byteAt"];
var fromBytes = function (__bytes1) {
   var length2 = length(__bytes1);
   return map({stream: _2e__2e_({start: 0.0,stop: length2})
              ,mapping: function (local_59) {
                 return byteAt({index: local_59,object: __bytes1});
              }});
};
var _2a_ = rts.builtins.Prelude["*"];
var fold = function (local_61) {
   var x = local_61.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_62 = x.data;
       return fold({stream: local_62.tail({})
                   ,initial: local_61.binop({acc: local_61.initial,item: local_62.head})
                   ,binop: local_61.binop});
     case "empty":
       var local_63 = x.data;
       return local_61.initial;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d742e997601e4a6f9fab3277d9fb50d5"
                                    ,"637233b5b124439a95770c0e0d801258");
   }
};
var parseInt = function (local_58) {
   return fold({stream: fromBytes(local_58)
               ,initial: 0.0
               ,binop: function (local_60) {
                  return _2d_({infixl: _2b_({infixl: _2a_({infixl: local_60.acc
                                                          ,infixr: 10.0})
                                            ,infixr: local_60.item})
                              ,infixr: 48.0});
               }});
};
var parseDatabaseUrl = function (url) {
   var local_44 = toArray(split({text: url,seperator: rts.bytesFromAscii("/")}));
   var x = _26__26_({infixl: _3d__3d_({infixl: length1(local_44),infixr: 4.0})
                    ,infixr: function (local_45) {
                       return _26__26_({infixl: _3d__3d_({infixl: item1({index: 0.0
                                                                        ,object: local_44})
                                                         ,infixr: rts.bytesFromAscii("postgres:")})
                                       ,infixr: function (local_46) {
                                          return _3d__3d_({infixl: item1({index: 1.0
                                                                         ,object: local_44})
                                                          ,infixr: rts.bytesFromAscii("")});
                                       }});
                    }});
   switch (x.tag)
   {
     case "false":
       var local_49 = x.data;
       return ignoreError(function () {
              throw rts.exceptions.ReachedHole("Reached a hole"
                                              ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                              ,"5813e29d7943cb3b7293f7b5baf46584");
           }());
     case "true":
       var local_51 = x.data;
       var local_52 = toArray(split({text: item1({index: 2.0,object: local_44})
                                    ,seperator: rts.bytesFromAscii(":")}));
       var x = _3d__3d_({infixl: length1(local_52),infixr: 3.0});
       switch (x.tag)
       {
         case "false":
           var local_53 = x.data;
           return ignoreError(function () {
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                                  ,"0f3aa79fa902ac4dcfbe4ffb6cb00ace");
               }());
         case "true":
           var local_54 = x.data;
           var local_55 = toArray(split({text: item1({index: 1.0,object: local_52})
                                        ,seperator: rts.bytesFromAscii("@")}));
           var x = _3d__3d_({infixl: length1(local_55),infixr: 2.0});
           switch (x.tag)
           {
             case "false":
               var local_56 = x.data;
               throw rts.exceptions.ReachedHole("Reached a hole"
                                               ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                               ,"5f05f8b37b1c7b3e9433533043cfce0c");
             case "true":
               var local_57 = x.data;
               return {database: item1({index: 3.0,object: local_44})
                      ,host: item1({index: 1.0,object: local_55})
                      ,password: item1({index: 0.0,object: local_55})
                      ,port: parseInt(item1({index: 2.0,object: local_52}))
                      ,user: item1({index: 0.0,object: local_52})};
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
                                    var local_64 = x.data;
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
              ,mapping: function (local_72) {
                 return item1({index: local_72,object: __array1});
              }});
};
var _2264_ = rts.builtins.Prelude["<="];
var drop = function (local_73) {
   var x = _2264_({infixl: local_73.count,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_74 = x.data;
       var x = local_73.stream;
       switch (x.tag)
       {
         case "nonEmpty":
           var local_75 = x.data;
           return drop({stream: local_75.tail({})
                       ,count: _2d_({infixl: local_73.count,infixr: 1.0})});
         case "empty":
           var local_76 = x.data;
           return {tag: "empty",data: {}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_efdcd00625534eb5b480c13776995953"
                                        ,"3484afddcc5745189195b1b977bc31a4");
       }
     case "true":
       var local_77 = x.data;
       return local_73.stream;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_efdcd00625534eb5b480c13776995953"
                                    ,"f4402d1f89754f369b736a668f8d2784");
   }
};
var _2b__2b_2 = function (local_88) {
   return foldLazy({stream: local_88.infixl
                   ,initial: local_88.infixr
                   ,binop: function (local_89) {
                      return {tag: "nonEmpty"
                             ,data: {head: local_89.item,tail: local_89.rest}};
                   }});
};
var toBytes = rts.builtins.Bytes["fromArray"];
var _2b__2b_1 = function (local_86) {
   return toBytes(toArray(_2b__2b_2({infixl: fromBytes(local_86.a)
                                    ,infixr: function (local_87) {
                                       return fromBytes(local_86.b);
                                    }})));
};
var _2b__2b_ = function (local_85) { return _2b__2b_1({a: local_85.a,b: local_85.b});};
var httpNotFound404 = function (local_84) {
   return {content: {__data: _2b__2b_({a: rts.bytesFromAscii("Not found: "),b: local_84})
                    ,mimeType: rts.bytesFromAscii("text/plain")}
          ,status: {message: rts.bytesFromAscii("Not Found"),code: 404.0}};
};
var query = rts.builtins.IO.database.postgres["query"];
var _7c__7c_ = function (local_102) {
   var x = local_102.infixl;
   switch (x.tag)
   {
     case "false":
       return local_102.infixr(x.data);
     case "true":
       var local_103 = x.data;
       return {tag: "true",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_dff4e86e63c54fab8b58ab3fe7e440ad"
                                    ,"cc82dca9551140c9af0084b786718cc5");
   }
};
var anyOf = function (local_99) {
   return foldLazy({stream: local_99.stream
                   ,initial: function (local_100) {
                      return {tag: "false",data: {}};
                   }
                   ,binop: function (local_101) {
                      return _7c__7c_({infixl: local_99.satisfy(local_101.item)
                                      ,infixr: local_101.rest});
                   }});
};
var pestovalAuth = function (local_94) {
   return _3b_({infixl: query({database: local_94.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT pestoval_teacher.id, pestoval_teacher.is_admin\nFROM pestoval_teacher\nWHERE pestoval_teacher.password = \'")
                                                             ,b: local_94.password})
                                                ,b: rts.bytesFromAscii("\'")})})
               ,infixr: function (x95) {
                  switch (x95.tag)
                  {
                    case "error":
                      var local_96 = x95.data;
                      return ignoreError(local_96);
                    case "success":
                      var local_97 = x95.data;
                      return __return(function () {
                             var x = anyOf({stream: fromArray(local_97.__data)
                                           ,satisfy: function (local_98) {
                                              return _3d__3d_({infixl: item1({index: 1.0
                                                                             ,object: local_98})
                                                              ,infixr: rts.bytesFromAscii("true")});
                                           }});
                             switch (x.tag)
                             {
                               case "false":
                                 var local_104 = x.data;
                                 var x = anyOf({stream: fromArray(local_97.__data)
                                               ,satisfy: function (local_105) {
                                                  var teacher = parseInt(item1({index: 0.0
                                                                               ,object: local_105}));
                                                  return anyOf({stream: fromArray(local_94.teachers)
                                                               ,satisfy: function (local_106) {
                                                                  return _3d__3d_({infixl: local_106.id
                                                                                  ,infixr: teacher});
                                                               }});
                                               }});
                                 switch (x.tag)
                                 {
                                   case "false":
                                     var local_107 = x.data;
                                     return {tag: "unauthorized",data: {}};
                                   case "true":
                                     var local_108 = x.data;
                                     return {tag: "teacher1",data: {}};
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                                  ,"63099f6a8ec233abc1896a5e6518eaf6");
                                 }
                               case "true":
                                 var local_109 = x.data;
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
var digitsLittleEndian = function (local_117) {
   return map({stream: take({stream: iterate({initial: local_117.__number
                                             ,next: function (local_118) {
                                                return _2f__2f_({infixl: local_118
                                                                ,infixr: local_117.base});
                                             }})
                            ,__while: function (local_119) {
                               return _2260_({infixl: local_119,infixr: 0.0});
                            }})
              ,mapping: function (local_120) {
                 return _25_({infixl: local_120,infixr: local_117.base});
              }});
};
var reverse = function (stream3) {
   return fold({stream: stream3
               ,initial: {tag: "empty",data: {}}
               ,binop: function (local_121) {
                  return {tag: "nonEmpty"
                         ,data: {head: local_121.item
                                ,tail: function (local_122) {
                                   return local_121.acc;
                                }}};
               }});
};
var showNum = function (local_115) {
   var x = _3d__3d_({infixl: local_115,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_116 = x.data;
       return toBytes(toArray(map({stream: reverse(digitsLittleEndian({__number: local_115
                                                                      ,base: 10.0}))
                                  ,mapping: function (local_123) {
                                     return _2b_({infixl: 48.0,infixr: local_123});
                                  }})));
     case "true":
       var local_124 = x.data;
       return rts.bytesFromAscii("0");
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8dc07f8cc25f46b2bd345789b6a59f4d"
                                    ,"39f9fdd2b9889a256be50861539f39e5");
   }
};
var concat = function (stream4) {
   return foldLazy({stream: stream4
                   ,initial: function (local_138) {
                      return {tag: "empty",data: {}};
                   }
                   ,binop: function (local_139) {
                      return _2b__2b_2({infixl: local_139.item,infixr: local_139.rest});
                   }});
};
var intersperse = function (local_132) {
   var x = local_132.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_133 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_133.head
                     ,tail: function (local_134) {
                        return concat(map({stream: local_133.tail({})
                                          ,mapping: function (local_135) {
                                             return {tag: "nonEmpty"
                                                    ,data: {head: local_132.item
                                                           ,tail: function (local_136) {
                                                              return {tag: "nonEmpty"
                                                                     ,data: {head: local_135
                                                                            ,tail: function (local_137) {
                                                                               return {tag: "empty"
                                                                                      ,data: {}};
                                                                            }}};
                                                           }}};
                                          }}));
                     }}};
     case "empty":
       var local_140 = x.data;
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
var join = function (local_131) {
   return concat1(intersperse({stream: local_131.texts,item: local_131.seperator}));
};
var id1 = function (__x) { return __x;};
var maybe = function (local_157) {
   var x = local_157.object;
   switch (x.tag)
   {
     case "just":
       return id1(x.data);
     case "nothing":
       var local_158 = x.data;
       return local_157.or;
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
       var local_150 = x.data;
       return function (local_151) {
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: local_151.table
                                                        ,b: rts.bytesFromAscii(".")})
                                           ,b: local_151.field})
                              ,b: function () {
                                 var x = local_151.as;
                                 switch (x.tag)
                                 {
                                   case "just":
                                     var local_152 = x.data;
                                     return _2b__2b_({a: rts.bytesFromAscii(" AS ")
                                                     ,b: local_152});
                                   case "nothing":
                                     var local_153 = x.data;
                                     return rts.bytesFromAscii("");
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                                                  ,"601b6d53f526392df53d629ee0c2ad71");
                                 }
                              }()});
           };
     case "hebrew":
       var local_154 = x.data;
       return function (local_155) {
              var local_156 = _2b__2b_({a: _2b__2b_({a: local_155.table
                                                    ,b: rts.bytesFromAscii(".")})
                                       ,b: local_155.field});
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("COALESCE(NULLIF(")
                                                                                  ,b: local_156})
                                                                     ,b: rts.bytesFromAscii("_hebrew, \'\'), ")})
                                                        ,b: local_156})
                                           ,b: rts.bytesFromAscii(") AS ")})
                              ,b: maybe({object: local_155.as,or: local_155.field})});
           };
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                    ,"77f1ffdc76bae5c4dbaf326aa2ff70a2");
   }
};
var pestovalQuerySessionsSql = function (local_143) {
   return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id,\n  pestoval_timeslot.id AS timeslot_id, pestoval_timeslot.start, pestoval_timeslot.stop,\n  pestoval_location.id AS location_id,\n  pestoval_level.id AS level_id, pestoval_level.color,")
                                ,infixr: function (local_144) {
                                   return _3a__3a_({infixl: join({texts: map({stream: _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                        ,field: rts.bytesFromAscii("name")
                                                                                                        ,as: {tag: "just"
                                                                                                             ,data: rts.bytesFromAscii("session_name")}}
                                                                                               ,infixr: function (local_145) {
                                                                                                  return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                           ,field: rts.bytesFromAscii("description")
                                                                                                                           ,as: {tag: "nothing"
                                                                                                                                ,data: {}}}
                                                                                                                  ,infixr: function (local_146) {
                                                                                                                     return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                                              ,field: rts.bytesFromAscii("prereqs")
                                                                                                                                              ,as: {tag: "nothing"
                                                                                                                                                   ,data: {}}}
                                                                                                                                     ,infixr: function (local_147) {
                                                                                                                                        return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_location")
                                                                                                                                                                 ,field: rts.bytesFromAscii("name")
                                                                                                                                                                 ,as: {tag: "just"
                                                                                                                                                                      ,data: rts.bytesFromAscii("location_name")}}
                                                                                                                                                        ,infixr: function (local_148) {
                                                                                                                                                           return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_level")
                                                                                                                                                                                    ,field: rts.bytesFromAscii("name")
                                                                                                                                                                                    ,as: {tag: "just"
                                                                                                                                                                                         ,data: rts.bytesFromAscii("level_name")}}
                                                                                                                                                                           ,infixr: function (local_149) {
                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                           }});
                                                                                                                                                        }});
                                                                                                                                     }});
                                                                                                                  }});
                                                                                               }})
                                                                             ,mapping: queryFieldLang(local_143.language2)})
                                                                 ,seperator: rts.bytesFromAscii(", ")})
                                                   ,infixr: function (local_159) {
                                                      return _3a__3a_({infixl: local_143.from
                                                                      ,infixr: function (local_160) {
                                                                         return _2b__2b_2({infixl: map({stream: _3a__3a_({infixl: {key: rts.bytesFromAscii("when_id")
                                                                                                                                  ,table: rts.bytesFromAscii("pestoval_timeslot")}
                                                                                                                         ,infixr: function (local_161) {
                                                                                                                            return _3a__3a_({infixl: {key: rts.bytesFromAscii("location_id")
                                                                                                                                                     ,table: rts.bytesFromAscii("pestoval_location")}
                                                                                                                                            ,infixr: function (local_162) {
                                                                                                                                               return _3a__3a_({infixl: {key: rts.bytesFromAscii("level_id")
                                                                                                                                                                        ,table: rts.bytesFromAscii("pestoval_level")}
                                                                                                                                                               ,infixr: function (local_163) {
                                                                                                                                                                  return {tag: "empty"
                                                                                                                                                                         ,data: {}};
                                                                                                                                                               }});
                                                                                                                                            }});
                                                                                                                         }})
                                                                                                       ,mapping: function (local_164) {
                                                                                                          return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("LEFT OUTER JOIN ")
                                                                                                                                       ,infixr: function (local_165) {
                                                                                                                                          return _3a__3a_({infixl: local_164.table
                                                                                                                                                          ,infixr: function (local_166) {
                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(" ON pestoval_session.")
                                                                                                                                                                             ,infixr: function (local_167) {
                                                                                                                                                                                return _3a__3a_({infixl: local_164.key
                                                                                                                                                                                                ,infixr: function (local_168) {
                                                                                                                                                                                                   return _3a__3a_({infixl: rts.bytesFromAscii(" = ")
                                                                                                                                                                                                                   ,infixr: function (local_169) {
                                                                                                                                                                                                                      return _3a__3a_({infixl: local_164.table
                                                                                                                                                                                                                                      ,infixr: function (local_170) {
                                                                                                                                                                                                                                         return _3a__3a_({infixl: rts.bytesFromAscii(".id")
                                                                                                                                                                                                                                                         ,infixr: function (local_171) {
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
                                                                                          ,infixr: function (local_172) {
                                                                                             return _2b__2b_2({infixl: function () {
                                                                                                                 var x =
                                                                                                                 _3d__3d_({infixl: local_143.where
                                                                                                                          ,infixr: rts.bytesFromAscii("")});
                                                                                                                 switch (x.tag)
                                                                                                                 {
                                                                                                                   case "false":
                                                                                                                     var local_173 =
                                                                                                                     x.data;
                                                                                                                     return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("WHERE ")
                                                                                                                                                       ,b: local_143.where})
                                                                                                                                     ,infixr: function (local_174) {
                                                                                                                                        return {tag: "empty"
                                                                                                                                               ,data: {}};
                                                                                                                                     }});
                                                                                                                   case "true":
                                                                                                                     var local_175 =
                                                                                                                     x.data;
                                                                                                                     return {tag: "empty"
                                                                                                                            ,data: {}};
                                                                                                                   default:
                                                                                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                  ,"DEF_140efbae773e4fea9f554e346c7b58e8"
                                                                                                                                                  ,"f573ad31abd803e9dda9e82ec3ef4df2");
                                                                                                                 }
                                                                                                              }()
                                                                                                              ,infixr: function (local_176) {
                                                                                                                 return _3a__3a_({infixl: rts.bytesFromAscii("ORDER BY pestoval_timeslot.start, pestoval_location.id")
                                                                                                                                 ,infixr: function (local_177) {
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
                              ,infixr: function (local_187) {
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
var sort1 = function (local_189) {
   var x = _2265_({infixl: _2b_({infixl: local_189.start,infixr: 1.0})
                  ,infixr: local_189.stop});
   switch (x.tag)
   {
     case "false":
       var local_190 = x.data;
       return _3b_({infixl: readMutArray({index: local_189.start
                                         ,object: local_189.__array4})
                   ,infixr: function (pivot) {
                      return _3b_({infixl: newMutRef(local_189.start)
                                  ,infixr: function (pivotPosRef) {
                                     return _3b_({infixl: sequence__(map({stream: _2e__2e_({start: _2b_({infixl: local_189.start
                                                                                                        ,infixr: 1.0})
                                                                                           ,stop: local_189.stop})
                                                                         ,mapping: function (index1) {
                                                                            return _3b_({infixl: readMutArray({index: index1
                                                                                                              ,object: local_189.__array4})
                                                                                        ,infixr: function (object1) {
                                                                                           var x =
                                                                                           local_189._3c_1({infixl: object1
                                                                                                           ,infixr: pivot});
                                                                                           switch (x.tag)
                                                                                           {
                                                                                             case "false":
                                                                                               var local_191 =
                                                                                               x.data;
                                                                                               return __return({});
                                                                                             case "true":
                                                                                               var local_192 =
                                                                                               x.data;
                                                                                               return _3b_({infixl: readMutRef(pivotPosRef)
                                                                                                           ,infixr: function (pivotPos) {
                                                                                                              return _3b_({infixl: writeMutArray({index: pivotPos
                                                                                                                                                 ,object: local_189.__array4
                                                                                                                                                 ,value: object1})
                                                                                                                          ,infixr: function (local_193) {
                                                                                                                             var newPivotPos =
                                                                                                                             _2b_({infixl: pivotPos
                                                                                                                                  ,infixr: 1.0});
                                                                                                                             return _3b_({infixl: writeMutRef({object: pivotPosRef
                                                                                                                                                              ,value: newPivotPos})
                                                                                                                                         ,infixr: function (local_194) {
                                                                                                                                            return _3b_({infixl: readMutArray({index: newPivotPos
                                                                                                                                                                              ,object: local_189.__array4})
                                                                                                                                                        ,infixr: function (local_195) {
                                                                                                                                                           return writeMutArray({index: index1
                                                                                                                                                                                ,object: local_189.__array4
                                                                                                                                                                                ,value: local_195});
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
                                                 ,infixr: function (local_196) {
                                                    return _3b_({infixl: readMutRef(pivotPosRef)
                                                                ,infixr: function (index2) {
                                                                   return _3b_({infixl: writeMutArray({index: index2
                                                                                                      ,object: local_189.__array4
                                                                                                      ,value: pivot})
                                                                               ,infixr: function (local_197) {
                                                                                  return _3b_({infixl: sort1({start: local_189.start
                                                                                                             ,stop: index2
                                                                                                             ,_3c_1: local_189._3c_1
                                                                                                             ,__array4: local_189.__array4})
                                                                                              ,infixr: function (local_198) {
                                                                                                 return sort1({start: _2b_({infixl: index2
                                                                                                                           ,infixr: 1.0})
                                                                                                              ,stop: local_189.stop
                                                                                                              ,_3c_1: local_189._3c_1
                                                                                                              ,__array4: local_189.__array4});
                                                                                              }});
                                                                               }});
                                                                }});
                                                 }});
                                  }});
                   }});
     case "true":
       var local_199 = x.data;
       return __return({});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_7dc48073b9e642f0921b10b11676f38b"
                                    ,"767c3133b4f8a61071c98bc4f445f9a6");
   }
};
var sort = function (local_186) {
   return runMutArray(_3b_({infixl: newMutArray1(local_186.stream)
                           ,infixr: function (__array3) {
                              return _3b_({infixl: length4(__array3)
                                          ,infixr: function (local_188) {
                                             return _3b_({infixl: sort1({start: 0.0
                                                                        ,stop: local_188
                                                                        ,_3c_1: local_186._3c_1
                                                                        ,__array4: __array3})
                                                         ,infixr: function (local_200) {
                                                            return __return(__array3);
                                                         }});
                                          }});
                           }}));
};
var foldLazy1 = function (local_216) {
   return foldLazy({stream: local_216.stream
                   ,initial: function (local_217) {
                      return local_216.done;
                   }
                   ,binop: function (local_218) {
                      return function (state1) {
                             return local_216.step({state: state1
                                                   ,rest: local_218.rest
                                                   ,item: local_218.item});
                          };
                   }})(local_216.initialState);
};
var group = function (local_202) {
   return foldLazy1({stream: local_202.stream
                    ,initialState: {tag: "empty",data: {}}
                    ,step: function (local_203) {
                       var x = local_203.state;
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_204 = x.data;
                           var x = local_202.by({infixl: local_204.head
                                                ,infixr: local_203.item});
                           switch (x.tag)
                           {
                             case "false":
                               var local_205 = x.data;
                               return _3a__3a_({infixl: toArray(reverse(local_203.state))
                                               ,infixr: function (local_206) {
                                                  return local_203.rest({})(_3a__3a_({infixl: local_203.item
                                                                                     ,infixr: function (local_207) {
                                                                                        return {tag: "empty"
                                                                                               ,data: {}};
                                                                                     }}));
                                               }});
                             case "true":
                               var local_208 = x.data;
                               return local_203.rest({})(_3a__3a_({infixl: local_203.item
                                                                  ,infixr: function (local_209) {
                                                                     return local_203.state;
                                                                  }}));
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                            ,"80c64c4a3e825d563e72c3ff848be12a");
                           }
                         case "empty":
                           var local_210 = x.data;
                           return local_203.rest({})(_3a__3a_({infixl: local_203.item
                                                              ,infixr: function (local_211) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }}));
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                        ,"74a01a012e28a30393aafbb0e69c22f4");
                       }
                    }
                    ,done: function (local_212) {
                       var x = local_212;
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_213 = x.data;
                           return _3a__3a_({infixl: toArray(reverse(local_212))
                                           ,infixr: function (local_214) {
                                              return {tag: "empty",data: {}};
                                           }});
                         case "empty":
                           var local_215 = x.data;
                           return {tag: "empty",data: {}};
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                        ,"44a912bc33ec9c258e1ba58d8731bdd8");
                       }
                    }});
};
var pestovalQuerySessionTeachers = function (local_181) {
   return _3b_({infixl: query({database: local_181.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_session_teachers.teacher_id, pestoval_session_teachers.session_id,\n  ")
                                                             ,b: queryFieldLang(local_181.language2)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_teacher ON pestoval_session_teachers.teacher_id = pestoval_teacher.id")})})
               ,infixr: function (x182) {
                  switch (x182.tag)
                  {
                    case "error":
                      var local_183 = x182.data;
                      return ignoreError(local_183);
                    case "success":
                      var local_184 = x182.data;
                      return __return(toArray(map({stream: group({stream: fromArray(sort({stream: map({stream: fromArray(local_184.__data)
                                                                                                      ,mapping: function (row) {
                                                                                                         return {teacher1: {name: item1({index: 2.0
                                                                                                                                        ,object: row})
                                                                                                                           ,id: parseInt(item1({index: 0.0
                                                                                                                                               ,object: row}))}
                                                                                                                ,session: parseInt(item1({index: 1.0
                                                                                                                                         ,object: row}))};
                                                                                                      }})
                                                                                         ,_3c_1: function (local_185) {
                                                                                            return _3c_({infixl: local_185.infixl.session
                                                                                                        ,infixr: local_185.infixr.session});
                                                                                         }}))
                                                                 ,by: function (local_201) {
                                                                    return _3d__3d_({infixl: local_201.infixl.session
                                                                                    ,infixr: local_201.infixr.session});
                                                                 }})
                                                  ,mapping: function (local_219) {
                                                     return {value: toArray(map({stream: fromArray(local_219)
                                                                                ,mapping: function (local_220) {
                                                                                   return local_220.teacher1;
                                                                                }}))
                                                            ,key: item1({index: 0.0
                                                                        ,object: local_219}).session};
                                                  }})));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_de80144d74df47438852d18bad3b3eaf"
                                                   ,"9800f3fc1326d8ea5b4af24b15b823d4");
                  }
               }});
};
var _3e__3d__3c_ = function (local_226) {
   var x = _3d__3d_({infixl: local_226.__x1,infixr: local_226.y});
   switch (x.tag)
   {
     case "false":
       var local_227 = x.data;
       var x = _3c_({infixl: local_226.__x1,infixr: local_226.y});
       switch (x.tag)
       {
         case "false":
           var local_228 = x.data;
           return {tag: "_3e_1",data: {}};
         case "true":
           var local_229 = x.data;
           return {tag: "_3c_1",data: {}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_710304e7117b480ba76d20139b3980c1"
                                        ,"b36d82ac26521ea940b13add4c373a2c");
       }
     case "true":
       var local_230 = x.data;
       return {tag: "_3d__3d_1",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_710304e7117b480ba76d20139b3980c1"
                                    ,"508e7c4e652cf07b779c96cd2344172c");
   }
};
var _2f_ = rts.builtins.Prelude["/"];
var floor = function (local_234) {
   return _2d_({infixl: local_234,infixr: _25_({infixl: local_234,infixr: 1.0})});
};
var search1 = function (local_232) {
   var x = _2265_({infixl: local_232.start,infixr: local_232.stop});
   switch (x.tag)
   {
     case "false":
       var local_233 = x.data;
       var pivot1 = floor(_2f_({infixl: _2b_({infixl: local_232.start
                                             ,infixr: local_232.stop})
                               ,infixr: 2.0}));
       var x = local_232.compareTo(pivot1);
       switch (x.tag)
       {
         case "_3e_1":
           var local_235 = x.data;
           return search1({start: _2b_({infixl: pivot1,infixr: 1.0})
                          ,stop: local_232.stop
                          ,compareTo: local_232.compareTo});
         case "_3c_1":
           var local_236 = x.data;
           return search1({start: local_232.start
                          ,stop: pivot1
                          ,compareTo: local_232.compareTo});
         case "_3d__3d_1":
           var local_237 = x.data;
           return {tag: "just",data: pivot1};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                        ,"c6c8b9c428c0b8b42ffc038b0554d06b");
       }
     case "true":
       var local_238 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                    ,"c22774ac01ba95da7d4aa96a5694962d");
   }
};
var search = function (local_231) {
   return search1({start: 0.0
                  ,stop: length1(local_231.sorted)
                  ,compareTo: function (index4) {
                     return local_231.compareTo(item1({index: index4
                                                      ,object: local_231.sorted}));
                  }});
};
var lookup = function (local_224) {
   var x = search({compareTo: function (local_225) {
                     return _3e__3d__3c_({y: local_225.key,__x1: local_224.key});
                  }
                  ,sorted: local_224.sorted});
   switch (x.tag)
   {
     case "just":
       var index5 = x.data;
       return {tag: "just",data: item1({index: index5,object: local_224.sorted}).value};
     case "nothing":
       var local_239 = x.data;
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
var index6 = function (local_245) {
   var x = first({that: function (index7) {
                    return _3d__3d_({infixl: item1({index: index7
                                                   ,object: local_245.__array4})
                                    ,infixr: local_245.item});
                 }
                 ,stream: _2e__2e_({start: 0.0,stop: length1(local_245.__array4)})});
   switch (x.tag)
   {
     case "just":
       return id1(x.data);
     case "nothing":
       var local_246 = x.data;
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
   var parts1 = toArray(split({text: text1,seperator: rts.bytesFromAscii(" ")}));
   var item4 = function (local_241) { return item1({index: local_241,object: parts1});};
   var timeText = toArray(split({text: item4(4.0),seperator: rts.bytesFromAscii(":")}));
   var timeItem = function (local_242) {
      return parseInt(item1({index: local_242,object: timeText}));
   };
   return {time: {timezone: unwords(_3a__3a_({infixl: item4(5.0)
                                             ,infixr: function (local_243) {
                                                return _3a__3a_({infixl: item4(6.0)
                                                                ,infixr: function (local_244) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }}))
                 ,minute: timeItem(1.0)
                 ,second: timeItem(2.0)
                 ,hour: timeItem(0.0)}
          ,date: {weekDay: _2b_({infixl: index6({__array4: dayNames,item: item4(0.0)})
                                ,infixr: 1.0})
                 ,month: _2b_({infixl: index6({__array4: monthNames,item: item4(1.0)})
                              ,infixr: 1.0})
                 ,day: parseInt(item4(2.0))
                 ,year: parseInt(item4(3.0))}};
};
var pestovalQuerySessions = function (local_113) {
   var teacherQuery = function () {
                         var x = local_113.teacher1;
                         switch (x.tag)
                         {
                           case "just":
                             var local_114 = x.data;
                             return {where: _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("pestoval_session_teachers.teacher_id = ")
                                                                       ,b: showNum(local_114)})
                                                     ,infixr: function (local_125) {
                                                        return {tag: "empty",data: {}};
                                                     }})
                                    ,from: rts.bytesFromAscii("FROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_session ON pestoval_session_teachers.session_id = pestoval_session.id")};
                           case "nothing":
                             var local_126 = x.data;
                             return {where: {tag: "empty",data: {}}
                                    ,from: rts.bytesFromAscii("FROM pestoval_session")};
                           default:
                             throw rts.exceptions.LamduBug("Unhandled case"
                                                          ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                          ,"c83b0d9e623697d989e5a09fb1c59c4f");
                         }
                      }();
   return _3b_({infixl: query({database: local_113.database
                              ,object: pestovalQuerySessionsSql({where: join({texts: _2b__2b_2({infixl: teacherQuery.where
                                                                                               ,infixr: function (local_127) {
                                                                                                  var x =
                                                                                                  local_113.filter;
                                                                                                  switch (x.tag)
                                                                                                  {
                                                                                                    case "just":
                                                                                                      var local_128 =
                                                                                                      x.data;
                                                                                                      return _3a__3a_({infixl: local_128
                                                                                                                      ,infixr: function (local_129) {
                                                                                                                         return {tag: "empty"
                                                                                                                                ,data: {}};
                                                                                                                      }});
                                                                                                    case "nothing":
                                                                                                      var local_130 =
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
                                                                ,from: teacherQuery.from
                                                                ,language2: local_113.language2})})
               ,infixr: function (x178) {
                  switch (x178.tag)
                  {
                    case "error":
                      var local_179 = x178.data;
                      return ignoreError(local_179);
                    case "success":
                      var local_180 = x178.data;
                      return _3b_({infixl: pestovalQuerySessionTeachers({database: local_113.database
                                                                        ,language2: local_113.language2})
                                  ,infixr: function (teachers1) {
                                     var field1 = function (local_221) {
                                        var x = first({that: function (index3) {
                                                         return _3d__3d_({infixl: item1({index: index3
                                                                                        ,object: local_180.fields})
                                                                         ,infixr: local_221});
                                                      }
                                                      ,stream: _2e__2e_({start: 0.0
                                                                        ,stop: length1(local_180.fields)})});
                                        switch (x.tag)
                                        {
                                          case "just":
                                            return id1(x.data);
                                          case "nothing":
                                            var local_222 = x.data;
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
                                     return __return(toArray(map({stream: fromArray(local_180.__data)
                                                                 ,mapping: function (row1) {
                                                                    var item3 =
                                                                    function (local_223) {
                                                                       return item1({index: local_223
                                                                                    ,object: row1});
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
                                                                                  var local_240 =
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
var _22f2_ = function (local_249) {
   return {root: local_249.infixl,subTrees: local_249.infixr};
};
var leaf = function (local_248) { return _22f2_({infixl: local_248,infixr: []});};
var singleton = function (local_250) { return [local_250];};
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
var replicate = function (local_310) {
   var x = _2264_({infixl: local_310.count,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_311 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_310.item
                     ,tail: function (local_312) {
                        return replicate({count: _2d_({infixl: local_310.count
                                                      ,infixr: 1.0})
                                         ,item: local_310.item});
                     }}};
     case "true":
       var local_313 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_70f79762f05c41ccb9677f7a60746680"
                                    ,"3b53ee6d875f49f4acdb9a2e8b33fb2d");
   }
};
var rightJustify = function (local_308) {
   var count1 = _2d_({infixl: local_308.length5,infixr: length(local_308.text)});
   var x = _2264_({infixl: count1,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_309 = x.data;
       return _2b__2b_({a: toBytes(toArray(replicate({count: count1
                                                     ,item: local_308.character})))
                       ,b: local_308.text});
     case "true":
       var local_314 = x.data;
       return local_308.text;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_c96ce62be72e4d1e85d07af16867169d"
                                    ,"ea6106b4e471dead7c7d3638866db4a1");
   }
};
var showTime = function (local_304) {
   return join({texts: map({stream: _3a__3a_({infixl: local_304.hour
                                             ,infixr: function (local_305) {
                                                return _3a__3a_({infixl: local_304.minute
                                                                ,infixr: function (local_306) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }})
                           ,mapping: function (local_307) {
                              return rightJustify({length5: 2.0
                                                  ,text: showNum(local_307)
                                                  ,character: 48.0});
                           }})
               ,seperator: rts.bytesFromAscii(":")});
};
var formatTimeSlot = function (local_300) {
   return join({texts: _3a__3a_({infixl: item1({index: _2d_({infixl: local_300.timeSlot.start.date.weekDay
                                                            ,infixr: 1.0})
                                               ,object: function () {
                                                  var x = local_300.language2;
                                                  switch (x.tag)
                                                  {
                                                    case "english":
                                                      var local_301 = x.data;
                                                      return dayNames;
                                                    case "hebrew":
                                                      var local_302 = x.data;
                                                      return dayNamesHebrew;
                                                    default:
                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                   ,"DEF_4fed722dd3634c0db388c78e255c1429"
                                                                                   ,"5582218e01f5831eae7835c315a758c0");
                                                  }
                                               }()})
                                ,infixr: function (local_303) {
                                   return _3a__3a_({infixl: showTime(local_300.timeSlot.start.time)
                                                   ,infixr: function (local_315) {
                                                      return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                      ,infixr: function (local_316) {
                                                                         return _3a__3a_({infixl: showTime(local_300.timeSlot.stop.time)
                                                                                         ,infixr: function (local_317) {
                                                                                            return {tag: "empty"
                                                                                                   ,data: {}};
                                                                                         }});
                                                                      }});
                                                   }});
                                }})
               ,seperator: rts.bytesFromAscii(" ")});
};
var replace = function (local_328) {
   return join({texts: split({text: local_328.text,seperator: local_328.from})
               ,seperator: local_328.to});
};
var pestovalSessionInfo = function (local_268) {
   var line = function (local_269) {
      return _22f2_({infixl: rts.bytesFromAscii("<p>")
                    ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<b>")
                                     ,infixr: singleton(leaf(local_269.key))})
                             ,leaf(local_269.value)]});
   };
   var teacher2 = function (local_272) {
      return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/")
                                              ,infixr: function (local_273) {
                                                 return _3a__3a_({infixl: function () {
                                                                    var x =
                                                                    local_268.language2;
                                                                    switch (x.tag)
                                                                    {
                                                                      case "english":
                                                                        var local_274 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("eng");
                                                                      case "hebrew":
                                                                        var local_275 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("heb");
                                                                      default:
                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                     ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                     ,"25c06dfd8f7a82ef041d5e079e02e218");
                                                                    }
                                                                 }()
                                                                 ,infixr: function (local_276) {
                                                                    return _3a__3a_({infixl: rts.bytesFromAscii("/teacher/")
                                                                                    ,infixr: function (local_277) {
                                                                                       return _3a__3a_({infixl: showNum(local_272.id)
                                                                                                       ,infixr: function (local_278) {
                                                                                                          return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                          ,infixr: function (local_279) {
                                                                                                                             return {tag: "empty"
                                                                                                                                    ,data: {}};
                                                                                                                          }});
                                                                                                       }});
                                                                                    }});
                                                                 }});
                                              }}))
                    ,infixr: singleton(leaf(local_272.name))});
   };
   return toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                           ,infixr: function () {
                                              var x =
                                              fromArray(local_268.session.teachers);
                                              switch (x.tag)
                                              {
                                                case "nonEmpty":
                                                  var local_280 = x.data;
                                                  return toArray(_3a__3a_({infixl: teacher2(local_280.head)
                                                                          ,infixr: function (local_281) {
                                                                             return _2b__2b_2({infixl: concat(map({stream: local_280.tail({})
                                                                                                                  ,mapping: function (local_282) {
                                                                                                                     return _3a__3a_({infixl: leaf(function () {
                                                                                                                                        var x =
                                                                                                                                        local_268.language2;
                                                                                                                                        switch (x.tag)
                                                                                                                                        {
                                                                                                                                          case "english":
                                                                                                                                            var local_283 =
                                                                                                                                            x.data;
                                                                                                                                            return rts.bytesFromAscii(" & ");
                                                                                                                                          case "hebrew":
                                                                                                                                            var local_284 =
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
                                                                                                                                     ,infixr: function (local_285) {
                                                                                                                                        return _3a__3a_({infixl: teacher2(local_282)
                                                                                                                                                        ,infixr: function (local_286) {
                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                  ,data: {}};
                                                                                                                                                        }});
                                                                                                                                     }});
                                                                                                                  }}))
                                                                                              ,infixr: function (local_287) {
                                                                                                 return _3a__3a_({infixl: leaf(_2b__2b_({a: rts.bytesFromAscii(": ")
                                                                                                                                        ,b: local_268.session.name}))
                                                                                                                 ,infixr: function (local_288) {
                                                                                                                    return {tag: "empty"
                                                                                                                           ,data: {}};
                                                                                                                 }});
                                                                                              }});
                                                                          }}));
                                                case "empty":
                                                  var local_289 = x.data;
                                                  return singleton(leaf(local_268.session.name));
                                                default:
                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                               ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                               ,"ed7be6bad9f71095a62be6746bf728a3");
                                              }
                                           }()})
                           ,infixr: function (local_290) {
                              return _2b__2b_2({infixl: function () {
                                                  var x = local_268.password;
                                                  switch (x.tag)
                                                  {
                                                    case "just":
                                                      var local_291 = x.data;
                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                      ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/eng/edit/")
                                                                                                                                               ,infixr: function (local_292) {
                                                                                                                                                  return _3a__3a_({infixl: showNum(local_268.session.id)
                                                                                                                                                                  ,infixr: function (local_293) {
                                                                                                                                                                     return _3a__3a_({infixl: rts.bytesFromAscii("/")
                                                                                                                                                                                     ,infixr: function (local_294) {
                                                                                                                                                                                        return _3a__3a_({infixl: local_291
                                                                                                                                                                                                        ,infixr: function (local_295) {
                                                                                                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                                                                                                                           ,infixr: function (local_296) {
                                                                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                                                                           }});
                                                                                                                                                                                                        }});
                                                                                                                                                                                     }});
                                                                                                                                                                  }});
                                                                                                                                               }})
                                                                                                                              ,seperator: rts.bytesFromAscii("")})
                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("Edit details")))}))})
                                                                      ,infixr: function (local_297) {
                                                                         return {tag: "empty"
                                                                                ,data: {}};
                                                                      }});
                                                    case "nothing":
                                                      var local_298 = x.data;
                                                      return {tag: "empty",data: {}};
                                                    default:
                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                   ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                   ,"fad3e2035a95ac24b0214f741995983a");
                                                  }
                                               }()
                                               ,infixr: function (local_299) {
                                                  return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<b>")
                                                                                  ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_268.session.when1
                                                                                                                         ,language2: local_268.language2})))})
                                                                  ,infixr: function (local_318) {
                                                                     return _3a__3a_({infixl: line({value: local_268.session.place1.name
                                                                                                   ,key: function () {
                                                                                                      var x =
                                                                                                      local_268.language2;
                                                                                                      switch (x.tag)
                                                                                                      {
                                                                                                        case "english":
                                                                                                          var local_319 =
                                                                                                          x.data;
                                                                                                          return rts.bytesFromAscii("Where: ");
                                                                                                        case "hebrew":
                                                                                                          var local_320 =
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
                                                                                     ,infixr: function (local_321) {
                                                                                        return _3a__3a_({infixl: line({value: local_268.session.level1.name
                                                                                                                      ,key: function () {
                                                                                                                         var x =
                                                                                                                         local_268.language2;
                                                                                                                         switch (x.tag)
                                                                                                                         {
                                                                                                                           case "english":
                                                                                                                             var local_322 =
                                                                                                                             x.data;
                                                                                                                             return rts.bytesFromAscii("Who: ");
                                                                                                                           case "hebrew":
                                                                                                                             var local_323 =
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
                                                                                                        ,infixr: function (local_324) {
                                                                                                           return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                           ,infixr: singleton(leaf(function () {
                                                                                                                                              var x =
                                                                                                                                              local_268.language2;
                                                                                                                                              switch (x.tag)
                                                                                                                                              {
                                                                                                                                                case "english":
                                                                                                                                                  var local_325 =
                                                                                                                                                  x.data;
                                                                                                                                                  return rts.bytesFromAscii("Description:");
                                                                                                                                                case "hebrew":
                                                                                                                                                  var local_326 =
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
                                                                                                                           ,infixr: function (local_327) {
                                                                                                                              var escapeLines =
                                                                                                                              function (text3) {
                                                                                                                                 return replace({text: text3
                                                                                                                                                ,from: rts.bytesFromAscii("\n")
                                                                                                                                                ,to: rts.bytesFromAscii("<br/>\n")});
                                                                                                                              };
                                                                                                                              return _3a__3a_({infixl: htmlParagraph(escapeLines(local_268.session.description1))
                                                                                                                                              ,infixr: function (local_329) {
                                                                                                                                                 return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                 ,infixr: singleton(leaf(function () {
                                                                                                                                                                                    var x =
                                                                                                                                                                                    local_268.language2;
                                                                                                                                                                                    switch (x.tag)
                                                                                                                                                                                    {
                                                                                                                                                                                      case "english":
                                                                                                                                                                                        var local_330 =
                                                                                                                                                                                        x.data;
                                                                                                                                                                                        return rts.bytesFromAscii("Prereqs:");
                                                                                                                                                                                      case "hebrew":
                                                                                                                                                                                        var local_331 =
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
                                                                                                                                                                 ,infixr: function (local_332) {
                                                                                                                                                                    return _3a__3a_({infixl: htmlParagraph(escapeLines(local_268.session.prereqs1))
                                                                                                                                                                                    ,infixr: function (local_333) {
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
var htmlPopup = function (local_334) {
   return _22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<div id=\"")
                                                ,infixr: function (local_335) {
                                                   return _3a__3a_({infixl: local_334.id
                                                                   ,infixr: function (local_336) {
                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("\" class=\"overlay\">")
                                                                                      ,infixr: function (local_337) {
                                                                                         return {tag: "empty"
                                                                                                ,data: {}};
                                                                                      }});
                                                                   }});
                                                }})
                               ,seperator: rts.bytesFromAscii("")})
                 ,infixr: [leaf(rts.bytesFromAscii("<a class=\"cancel\" href=\"javascript:history.back()\">"))
                          ,_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<div class=\"popup\" style=\"background-color:")
                                                                 ,infixr: function (local_339) {
                                                                    return _3a__3a_({infixl: local_334.color
                                                                                    ,infixr: function (local_340) {
                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\">")
                                                                                                       ,infixr: function (local_341) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                    }});
                                                                 }})
                                                ,seperator: rts.bytesFromAscii("")})
                                  ,infixr: local_334.content})]});
};
var pestovalSessionCell = function (local_253) {
   var popup = _2b__2b_({a: rts.bytesFromAscii("popup-")
                        ,b: showNum(local_253.session.id)});
   var local_254 = htmlParagraph(local_253.session.place1.name);
   return _22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td style=\"background-color:")
                                                ,infixr: function (local_255) {
                                                   var color1 =
                                                   local_253.session.level1.color;
                                                   return _3a__3a_({infixl: function () {
                                                                      var x =
                                                                      _3d__3d_({infixl: color1
                                                                               ,infixr: rts.bytesFromAscii("null")});
                                                                      switch (x.tag)
                                                                      {
                                                                        case "false":
                                                                          var local_256 =
                                                                          x.data;
                                                                          return color1;
                                                                        case "true":
                                                                          var local_257 =
                                                                          x.data;
                                                                          return rts.bytesFromAscii("#eee");
                                                                        default:
                                                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                       ,"DEF_9020eea8542142a09c1a8813ef9990af"
                                                                                                       ,"8af192079f77d68114daa54992f28614");
                                                                      }
                                                                   }()
                                                                   ,infixr: function (local_258) {
                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(";")
                                                                                      ,infixr: function (local_259) {
                                                                                         return _3a__3a_({infixl: local_253.style
                                                                                                         ,infixr: function (local_260) {
                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii("\" ")
                                                                                                                            ,infixr: function (local_261) {
                                                                                                                               return _3a__3a_({infixl: local_253.attributes
                                                                                                                                               ,infixr: function (local_262) {
                                                                                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(">")
                                                                                                                                                                  ,infixr: function (local_263) {
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
                                                                 ,infixr: function (local_264) {
                                                                    return _3a__3a_({infixl: popup
                                                                                    ,infixr: function (local_265) {
                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\" style=\"text-decoration: none; color: black;\">")
                                                                                                       ,infixr: function (local_266) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                    }});
                                                                 }})
                                                ,seperator: rts.bytesFromAscii("")})
                                  ,infixr: local_253.content})
                          ,htmlPopup({content: pestovalSessionInfo({password: local_253.password
                                                                   ,language2: local_253.language2
                                                                   ,session: local_253.session})
                                     ,id: popup
                                     ,color: local_253.session.level1.color})]});
};
var htmlTable = function (local_344) {
   return _22f2_({infixl: _2b__2b_({a: rts.bytesFromAscii("<table width=\"100%\"")
                                   ,b: function () {
                                      var x = local_344.language2;
                                      switch (x.tag)
                                      {
                                        case "english":
                                          var local_345 = x.data;
                                          return rts.bytesFromAscii(">");
                                        case "hebrew":
                                          var local_346 = x.data;
                                          return rts.bytesFromAscii(" dir=\"rtl\">");
                                        default:
                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                       ,"DEF_c270fb6c0aee498e865b7bf936941c16"
                                                                       ,"3593d20a3691e4acedfdfbe5a1b33cdf");
                                      }
                                   }()})
                 ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<tbody>")
                                           ,infixr: local_344.body}))});
};
var pestovalManageFloating = function (local_112) {
   return _3b_({infixl: pestovalQuerySessions({database: local_112.database
                                              ,teacher1: {tag: "nothing",data: {}}
                                              ,language2: {tag: "english",data: {}}
                                              ,filter: {tag: "just"
                                                       ,data: rts.bytesFromAscii("pestoval_session.location_id IS NULL")}})
               ,infixr: function (sessions) {
                  return __return(function () {
                         var x = _3d__3d_({infixl: length1(sessions),infixr: 0.0});
                         switch (x.tag)
                         {
                           case "false":
                             var local_247 = x.data;
                             return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Floating Sessions")))})
                                             ,infixr: function (local_252) {
                                                return _3a__3a_({infixl: htmlTable({body: toArray(map({stream: fromArray(sessions)
                                                                                                      ,mapping: function (session2) {
                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                       ,infixr: singleton(pestovalSessionCell({password: {tag: "just"
                                                                                                                                                                         ,data: local_112.password}
                                                                                                                                                              ,content: []
                                                                                                                                                              ,style: rts.bytesFromAscii("")
                                                                                                                                                              ,attributes: rts.bytesFromAscii("")
                                                                                                                                                              ,language2: {tag: "english"
                                                                                                                                                                          ,data: {}}
                                                                                                                                                              ,session: session2}))});
                                                                                                      }}))
                                                                                   ,language2: {tag: "english"
                                                                                               ,data: {}}})
                                                                ,infixr: function (local_347) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }});
                           case "true":
                             var local_348 = x.data;
                             return {tag: "empty",data: {}};
                           default:
                             throw rts.exceptions.LamduBug("Unhandled case"
                                                          ,"DEF_d40cade7acd3445089af06cfb0ca8c08"
                                                          ,"3aeafeb193f3926d38156605e21596e9");
                         }
                      }());
               }});
};
var processSimpleQuery = function (x352) {
   switch (x352.tag)
   {
     case "error":
       var local_353 = x352.data;
       return ignoreError(local_353);
     case "success":
       var local_354 = x352.data;
       return __return(toArray(map({stream: fromArray(local_354.__data)
                                   ,mapping: function (row2) {
                                      return {name: item1({index: 1.0,object: row2})
                                             ,id: parseInt(item1({index: 0.0
                                                                 ,object: row2}))};
                                   }})));
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a0f0234c060c4086a39fffe55fe3f9a9"
                                    ,"bc83e03aa2977cc46406e062c7e1acaa");
   }
};
var pestovalQueryTeachers = function (local_351) {
   return _3b_({infixl: query({database: local_351.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_teacher.id, ")
                                                             ,b: queryFieldLang(local_351.language2)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_teacher\nORDER BY name")})})
               ,infixr: processSimpleQuery});
};
var pestovalManageTeachers = function (local_350) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_350.database
                                              ,language2: {tag: "english",data: {}}})
               ,infixr: function (teachers2) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_355) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(map({stream: fromArray(teachers2)
                                                                                                   ,mapping: function (local_356) {
                                                                                                      return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                    ,infixr: singleton(_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<a href=\"/eng/teacher/")
                                                                                                                                                                                                       ,b: showNum(local_356.id)})
                                                                                                                                                                                          ,b: rts.bytesFromAscii("/")})
                                                                                                                                                                             ,b: local_350.password})
                                                                                                                                                                ,b: rts.bytesFromAscii("/\">")})
                                                                                                                                              ,infixr: singleton(leaf(local_356.name))}))});
                                                                                                   }}))})
                                                              ,infixr: function (local_357) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var sequence = function (stream8) {
   return foldLazy({stream: stream8
                   ,initial: function (local_359) {
                      return __return({tag: "empty",data: {}});
                   }
                   ,binop: function (local_360) {
                      return _3b_({infixl: local_360.item
                                  ,infixr: function (local_361) {
                                     return _3b_({infixl: local_360.rest({})
                                                 ,infixr: function (local_362) {
                                                    return __return({tag: "nonEmpty"
                                                                    ,data: {head: local_361
                                                                           ,tail: function (local_363) {
                                                                              return local_362;
                                                                           }}});
                                                 }});
                                  }});
                   }});
};
var isPrefixOf = function (local_374) {
   var lw = length(local_374.whole);
   var lp = length(local_374.prefix);
   return _26__26_({infixl: _2265_({infixl: lw,infixr: lp})
                   ,infixr: function (local_375) {
                      return _3d__3d_({infixl: slice1({object: local_374.whole
                                                      ,start: 0.0
                                                      ,stop: lp})
                                      ,infixr: local_374.prefix});
                   }});
};
var has = function (local_373) {
   return isPrefixOf({whole: local_373.text,prefix: local_373.prefix});
};
var isSuffixOf = function (local_378) {
   var lw1 = length(local_378.whole);
   var ls = length(local_378.suffix);
   return _26__26_({infixl: _2265_({infixl: lw1,infixr: ls})
                   ,infixr: function (local_379) {
                      return _3d__3d_({infixl: slice1({object: local_378.whole
                                                      ,start: _2d_({infixl: lw1
                                                                   ,infixr: ls})
                                                      ,stop: lw1})
                                      ,infixr: local_378.suffix});
                   }});
};
var has1 = function (local_377) {
   return isSuffixOf({suffix: local_377.suffix,whole: local_377.text});
};
var not = function (local_380) {
   var x = local_380;
   switch (x.tag)
   {
     case "false":
       var local_381 = x.data;
       return {tag: "true",data: {}};
     case "true":
       var local_382 = x.data;
       return {tag: "false",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_414bf66f7dd84da7881a390b2f34ef76"
                                    ,"b298b3233fa94db5b07f79925bfdbb19");
   }
};
var renderHtml = function (tree) {
   var local_370 = tree.root;
   return join({texts: _3a__3a_({infixl: local_370
                                ,infixr: function (local_371) {
                                   return _2b__2b_2({infixl: map({stream: fromArray(tree.subTrees)
                                                                 ,mapping: renderHtml})
                                                    ,infixr: function (local_372) {
                                                       var x =
                                                       _26__26_({infixl: has({text: local_370
                                                                             ,prefix: rts.bytesFromAscii("<")})
                                                                ,infixr: function (local_376) {
                                                                   return not(has1({text: local_370
                                                                                   ,suffix: rts.bytesFromAscii("/>")}));
                                                                }});
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_383 = x.data;
                                                           return {tag: "empty",data: {}};
                                                         case "true":
                                                           var local_384 = x.data;
                                                           return _3a__3a_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("</")
                                                                                                          ,infixr: function (local_385) {
                                                                                                             return _3a__3a_({infixl: toBytes(toArray(take({stream: drop({stream: fromBytes(local_370)
                                                                                                                                                                         ,count: 1.0})
                                                                                                                                                           ,__while: function (local_386) {
                                                                                                                                                              return _26__26_({infixl: _2260_({infixl: local_386
                                                                                                                                                                                              ,infixr: 32.0})
                                                                                                                                                                              ,infixr: function (local_387) {
                                                                                                                                                                                 return _2260_({infixl: local_386
                                                                                                                                                                                               ,infixr: 62.0});
                                                                                                                                                                              }});
                                                                                                                                                           }})))
                                                                                                                             ,infixr: function (local_388) {
                                                                                                                                return _3a__3a_({infixl: rts.bytesFromAscii(">")
                                                                                                                                                ,infixr: function (local_389) {
                                                                                                                                                   return {tag: "empty"
                                                                                                                                                          ,data: {}};
                                                                                                                                                }});
                                                                                                                             }});
                                                                                                          }})
                                                                                         ,seperator: rts.bytesFromAscii("")})
                                                                           ,infixr: function (local_390) {
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
var pestovalPage = function (local_365) {
   return {content: {__data: _2b__2b_({a: rts.bytesFromAscii("<!DOCTYPE html>\n")
                                      ,b: renderHtml(_22f2_({infixl: rts.bytesFromAscii("<html>")
                                                            ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<head>")
                                                                             ,infixr: [leaf(rts.bytesFromAscii("<meta charset=\"utf-8\" />"))
                                                                                      ,_22f2_({infixl: rts.bytesFromAscii("<title>")
                                                                                              ,infixr: singleton(leaf(local_365.title))})
                                                                                      ,_22f2_({infixl: rts.bytesFromAscii("<body>")
                                                                                              ,infixr: local_365.body})]})]}))})
                    ,mimeType: rts.bytesFromAscii("text/html")}
          ,status: httpOk200};
};
var pestovalUnauthorized = {content: {__data: rts.bytesFromAscii("Not authorized to edit")
                                     ,mimeType: rts.bytesFromAscii("text/plain")}
                           ,status: {message: rts.bytesFromAscii("Unauthorized")
                                    ,code: 403.0}};
var pestovalManage = function (local_91) {
   var password1 = function () {
                      var x = _3d__3d_({infixl: length1(local_91.path),infixr: 0.0});
                      switch (x.tag)
                      {
                        case "false":
                          var local_92 = x.data;
                          return item1({index: 0.0,object: local_91.path});
                        case "true":
                          var local_93 = x.data;
                          return rts.bytesFromAscii("");
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_e7b481c7abf74eb892737b8de024fc75"
                                                       ,"87f1806be8d1cfa4cad909539a3a312d");
                      }
                   }();
   return _3b_({infixl: pestovalAuth({database: local_91.database
                                     ,password: password1
                                     ,teachers: []})
               ,infixr: function (x110) {
                  switch (x110.tag)
                  {
                    case "admin":
                      var local_111 = x110.data;
                      return _3b_({infixl: sequence(_3a__3a_({infixl: pestovalManageFloating({database: local_91.database
                                                                                             ,password: password1})
                                                             ,infixr: function (local_349) {
                                                                return _3a__3a_({infixl: pestovalManageTeachers({database: local_91.database
                                                                                                                ,password: password1})
                                                                                ,infixr: function (local_358) {
                                                                                   return {tag: "empty"
                                                                                          ,data: {}};
                                                                                }});
                                                             }}))
                                  ,infixr: function (local_364) {
                                     return __return(pestovalPage({title: rts.bytesFromAscii("Manage")
                                                                  ,body: toArray(concat(local_364))}));
                                  }});
                    default:
                      var local_391 = x110;
                      return __return(pestovalUnauthorized);
                  }
               }});
};
var getSession = function (local_394) {
   var filter1 = {tag: "just"
                 ,data: _2b__2b_({a: rts.bytesFromAscii("pestoval_session.id = ")
                                 ,b: showNum(local_394.id)})};
   return _3b_({infixl: pestovalQuerySessions({database: local_394.database
                                              ,teacher1: {tag: "nothing",data: {}}
                                              ,language2: {tag: "english",data: {}}
                                              ,filter: filter1})
               ,infixr: function (local_395) {
                  return _3b_({infixl: pestovalQuerySessions({database: local_394.database
                                                             ,teacher1: {tag: "nothing"
                                                                        ,data: {}}
                                                             ,language2: {tag: "hebrew"
                                                                         ,data: {}}
                                                             ,filter: filter1})
                              ,infixr: function (local_396) {
                                 return __return(function () {
                                        var x =
                                        _26__26_({infixl: _3d__3d_({infixl: length1(local_395)
                                                                   ,infixr: 1.0})
                                                 ,infixr: function (local_397) {
                                                    return _3d__3d_({infixl: length1(local_396)
                                                                    ,infixr: 1.0});
                                                 }});
                                        switch (x.tag)
                                        {
                                          case "false":
                                            var local_398 = x.data;
                                            return {tag: "nothing",data: {}};
                                          case "true":
                                            var local_399 = x.data;
                                            var english1 = item1({index: 0.0
                                                                 ,object: local_395});
                                            var hebrew1 = item1({index: 0.0
                                                                ,object: local_396});
                                            return {tag: "just"
                                                   ,data: {prereqs1: {english: english1.prereqs1
                                                                     ,hebrew: function () {
                                                                        var x =
                                                                        _3d__3d_({infixl: hebrew1.prereqs1
                                                                                 ,infixr: english1.prereqs1});
                                                                        switch (x.tag)
                                                                        {
                                                                          case "false":
                                                                            var local_400 =
                                                                            x.data;
                                                                            return hebrew1.prereqs1;
                                                                          case "true":
                                                                            var local_401 =
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
                                                                        var local_402 =
                                                                        x.data;
                                                                        return hebrew1.name;
                                                                      case "true":
                                                                        var local_403 =
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
                                                                                var local_404 =
                                                                                x.data;
                                                                                return hebrew1.description1;
                                                                              case "true":
                                                                                var local_405 =
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
var allOf = function (local_421) {
   return foldLazy({stream: local_421.stream
                   ,initial: function (local_422) {
                      return {tag: "true",data: {}};
                   }
                   ,binop: function (local_423) {
                      return _26__26_({infixl: local_421.satisfy(local_423.item)
                                      ,infixr: local_423.rest});
                   }});
};
var filter2 = function (local_424) {
   var x = local_424.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_425 = x.data;
       var rest1 = function (local_426) {
          return filter2({stream: local_425.tail({}),keep: local_424.keep});
       };
       var x = local_424.keep(local_425.head);
       switch (x.tag)
       {
         case "false":
           var local_427 = x.data;
           return rest1({});
         case "true":
           var local_428 = x.data;
           return {tag: "nonEmpty",data: {head: local_425.head,tail: rest1}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                        ,"fbe0954bea2f4c248cb91ac61e7821ba");
       }
     case "empty":
       var local_429 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                    ,"2cb5f2574b8b4e3d8e5510fee403db44");
   }
};
var teachersEditForm = function (local_411) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_411.database
                                              ,language2: {tag: "english",data: {}}})
               ,infixr: function (all) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_412) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(_2b__2b_2({infixl: map({stream: fromArray(local_411.teachers)
                                                                                                                      ,mapping: function (local_413) {
                                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                       ,infixr: [leaf(local_413.name)
                                                                                                                                                ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<button type=\"submit\" name=\"remove_teacher\" value=\"")
                                                                                                                                                                                       ,b: showNum(local_413.id)})
                                                                                                                                                                          ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Remove")))})]});
                                                                                                                      }})
                                                                                                         ,infixr: function (local_416) {
                                                                                                            return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                            ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<label for=\"add_teacher\">")
                                                                                                                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Add:")))})
                                                                                                                                                     ,_22f2_({infixl: rts.bytesFromAscii("<select id=\"add_teacher\" name=\"add_teacher\">")
                                                                                                                                                             ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                                                                                                       ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                                                                                                       ,infixr: function (local_418) {
                                                                                                                                                                                          return map({stream: filter2({stream: fromArray(all)
                                                                                                                                                                                                                      ,keep: function (local_419) {
                                                                                                                                                                                                                         return allOf({stream: fromArray(local_411.teachers)
                                                                                                                                                                                                                                      ,satisfy: function (local_420) {
                                                                                                                                                                                                                                         return _2260_({infixl: local_419.id
                                                                                                                                                                                                                                                       ,infixr: local_420.id});
                                                                                                                                                                                                                                      }});
                                                                                                                                                                                                                      }})
                                                                                                                                                                                                     ,mapping: function (local_430) {
                                                                                                                                                                                                        return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                                                                                                     ,b: showNum(local_430.id)})
                                                                                                                                                                                                                                        ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                                                                                      ,infixr: singleton(leaf(local_430.name))});
                                                                                                                                                                                                     }});
                                                                                                                                                                                       }}))})]})
                                                                                                                            ,infixr: function (local_432) {
                                                                                                                               return {tag: "empty"
                                                                                                                                      ,data: {}};
                                                                                                                            }});
                                                                                                         }}))})
                                                              ,infixr: function (local_433) {
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
var levelEditForm = function (local_435) {
   return _3b_({infixl: pestovalQueryLevels(local_435.database)
               ,infixr: function (all1) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Level")))})
                                           ,infixr: function (local_436) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"level\" name=\"level\">")
                                                                              ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                        ,infixr: function (local_437) {
                                                                                                           return map({stream: fromArray(all1)
                                                                                                                      ,mapping: function (local_438) {
                                                                                                                         return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                      ,b: showNum(local_438.id)})
                                                                                                                                                         ,b: function () {
                                                                                                                                                            var x =
                                                                                                                                                            _3d__3d_({infixl: local_438.id
                                                                                                                                                                     ,infixr: local_435.level1.id});
                                                                                                                                                            switch (x.tag)
                                                                                                                                                            {
                                                                                                                                                              case "false":
                                                                                                                                                                var local_439 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\">");
                                                                                                                                                              case "true":
                                                                                                                                                                var local_440 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\" selected>");
                                                                                                                                                              default:
                                                                                                                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                             ,"DEF_a5e4925095a54ec393e6e4d5942a5dec"
                                                                                                                                                                                             ,"9a49b8f7220edcf647eba821ecf8b91a");
                                                                                                                                                            }
                                                                                                                                                         }()})
                                                                                                                                       ,infixr: singleton(leaf(local_438.name))});
                                                                                                                      }});
                                                                                                        }}))})
                                                              ,infixr: function (local_441) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var locationEditForm = function (local_443) {
   return _3b_({infixl: _3b_({infixl: query({database: local_443.database
                                            ,object: rts.bytesFromAscii("SELECT pestoval_location.id, pestoval_location.name FROM pestoval_location")})
                             ,infixr: processSimpleQuery})
               ,infixr: function (places) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Where")))})
                                           ,infixr: function (local_444) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"location\" name=\"location\">")
                                                                              ,infixr: toArray(map({stream: fromArray(places)
                                                                                                   ,mapping: function (local_445) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_445.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         _3d__3d_({infixl: local_445.id
                                                                                                                                                  ,infixr: local_443.where.id});
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_446 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_447 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                          ,"DEF_937ecfd7a5fb4cd6800d072419740277"
                                                                                                                                                                          ,"ae5dc56c181ace2274e213d24cf032c6");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(local_445.name))});
                                                                                                   }}))})
                                                              ,infixr: function (local_448) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalQueryTimeSlots = function (database3) {
   return _3b_({infixl: query({database: database3
                              ,object: rts.bytesFromAscii("SELECT\n  pestoval_timeslot.id, pestoval_timeslot.start, pestoval_timeslot.stop\nFROM pestoval_timeslot\nORDER BY pestoval_timeslot.start")})
               ,infixr: function (x451) {
                  switch (x451.tag)
                  {
                    case "error":
                      var local_452 = x451.data;
                      return ignoreError(local_452);
                    case "success":
                      var local_453 = x451.data;
                      return __return(toArray(map({stream: fromArray(local_453.__data)
                                                  ,mapping: function (row3) {
                                                     return {start: parseDateTime(item1({index: 1.0
                                                                                        ,object: row3}))
                                                            ,stop: parseDateTime(item1({index: 2.0
                                                                                       ,object: row3}))
                                                            ,id: parseInt(item1({index: 0.0
                                                                                ,object: row3}))};
                                                  }})));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_e253b6e9f37d40d099b39de266d912c9"
                                                   ,"37d0edcc32ab5606822a8107f66ced58");
                  }
               }});
};
var timeSlotEditForm = function (local_450) {
   return _3b_({infixl: pestovalQueryTimeSlots(local_450.database)
               ,infixr: function (all2) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("When")))})
                                           ,infixr: function (local_454) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"when\" name=\"when\">")
                                                                              ,infixr: toArray(map({stream: fromArray(all2)
                                                                                                   ,mapping: function (local_455) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_455.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         _3d__3d_({infixl: local_455.id
                                                                                                                                                  ,infixr: local_450.when1.id});
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_456 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_457 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                          ,"DEF_3860ce434c144382b8c11631e28ab02f"
                                                                                                                                                                          ,"11873d6a08b91a78c3a93a526e65434f");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_455
                                                                                                                                                           ,language2: {tag: "english"
                                                                                                                                                                       ,data: {}}})))});
                                                                                                   }}))})
                                                              ,infixr: function (local_458) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalSessionSummary = function (session4) {
   return concat(map({stream: _3a__3a_({infixl: {name: rts.bytesFromAscii("Teachers")
                                                ,value: join({texts: map({stream: fromArray(session4.teachers)
                                                                         ,mapping: function (local_462) {
                                                                            return local_462.name;
                                                                         }})
                                                             ,seperator: rts.bytesFromAscii(" & ")})}
                                       ,infixr: function (local_463) {
                                          return _3a__3a_({infixl: {name: rts.bytesFromAscii("Where")
                                                                   ,value: session4.place1.name}
                                                          ,infixr: function (local_464) {
                                                             return _3a__3a_({infixl: {name: rts.bytesFromAscii("When")
                                                                                      ,value: formatTimeSlot({timeSlot: session4.when1
                                                                                                             ,language2: {tag: "english"
                                                                                                                         ,data: {}}})}
                                                                             ,infixr: function (local_465) {
                                                                                return _3a__3a_({infixl: {name: rts.bytesFromAscii("What")
                                                                                                         ,value: session4.name}
                                                                                                ,infixr: function (local_466) {
                                                                                                   return _3a__3a_({infixl: {name: rts.bytesFromAscii("Level")
                                                                                                                            ,value: session4.level1.name}
                                                                                                                   ,infixr: function (local_467) {
                                                                                                                      return {tag: "empty"
                                                                                                                             ,data: {}};
                                                                                                                   }});
                                                                                                }});
                                                                             }});
                                                          }});
                                       }})
                     ,mapping: function (local_468) {
                        return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h4>")
                                                        ,infixr: singleton(leaf(local_468.name))})
                                        ,infixr: function (local_469) {
                                           return _3a__3a_({infixl: leaf(local_468.value)
                                                           ,infixr: function (local_470) {
                                                              return {tag: "empty"
                                                                     ,data: {}};
                                                           }});
                                        }});
                     }}));
};
var pestovalEditField = function (local_474) {
   return _3a__3a_({infixl: {name: local_474.name
                            ,value: local_474.value.english
                            ,key: local_474.key}
                   ,infixr: function (local_475) {
                      return _3a__3a_({infixl: {name: _2b__2b_({a: local_474.name
                                                               ,b: rts.bytesFromAscii(" (Hebrew)")})
                                               ,value: local_474.value.hebrew
                                               ,key: _2b__2b_({a: local_474.key
                                                              ,b: rts.bytesFromAscii("_hebrew")})}
                                      ,infixr: function (local_476) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var pestovalEditFields = function (local_479) {
   return _2b__2b_2({infixl: pestovalEditField({name: rts.bytesFromAscii("Description")
                                               ,value: local_479.description1
                                               ,key: rts.bytesFromAscii("description")})
                    ,infixr: function (local_480) {
                       return pestovalEditField({name: rts.bytesFromAscii("Pre-reqs")
                                                ,value: local_479.prereqs1
                                                ,key: rts.bytesFromAscii("prereqs")});
                    }});
};
var formTextArea = function (local_481) {
   return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<label for=\"")
                                                                  ,b: local_481.key})
                                                     ,b: rts.bytesFromAscii("\">")})
                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                             ,infixr: singleton(leaf(_2b__2b_({a: local_481.name
                                                                                              ,b: rts.bytesFromAscii(":")})))}))})
                   ,infixr: function (local_482) {
                      return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<textarea rows=10 cols=80 id=\"")
                                                                                                               ,b: local_481.key})
                                                                                                  ,b: rts.bytesFromAscii("\" name=\"")})
                                                                                     ,b: local_481.key})
                                                                        ,b: rts.bytesFromAscii("\">")})
                                                      ,infixr: singleton(leaf(local_481.value))})
                                      ,infixr: function (local_483) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var parseHex = function (text5) {
   var digitVal = function (local_497) {
      var x = _2264_({infixl: local_497,infixr: 57.0});
      switch (x.tag)
      {
        case "false":
          var local_498 = x.data;
          var x = _2264_({infixl: local_497,infixr: 70.0});
          switch (x.tag)
          {
            case "false":
              var local_499 = x.data;
              var x = _26__26_({infixl: _2264_({infixl: 97.0,infixr: local_497})
                               ,infixr: function (local_500) {
                                  return _2264_({infixl: local_497,infixr: 102.0});
                               }});
              switch (x.tag)
              {
                case "false":
                  var local_501 = x.data;
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"6361c631c359bf491a698736b910c593");
                case "true":
                  var local_502 = x.data;
                  return _2d_({infixl: local_497,infixr: 87.0});
                default:
                  throw rts.exceptions.LamduBug("Unhandled case"
                                               ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                               ,"5a1355193393bda93a2c8e331b53d26c");
              }
            case "true":
              var local_503 = x.data;
              var x = _2264_({infixl: 65.0,infixr: local_497});
              switch (x.tag)
              {
                case "false":
                  var local_504 = x.data;
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"d856f42600765d7302f46b291563ca8f");
                case "true":
                  var local_505 = x.data;
                  return _2d_({infixl: local_497,infixr: 55.0});
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
          var local_506 = x.data;
          var x = _2264_({infixl: 48.0,infixr: local_497});
          switch (x.tag)
          {
            case "false":
              var local_507 = x.data;
              throw rts.exceptions.ReachedHole("Reached a hole"
                                              ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                              ,"c930879571c8b455c7030f716fce3db8");
            case "true":
              var local_508 = x.data;
              return _2d_({infixl: local_497,infixr: 48.0});
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
               ,binop: function (local_509) {
                  return _2b_({infixl: _2a_({infixl: local_509.acc,infixr: 16.0})
                              ,infixr: digitVal(local_509.item)});
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
              var local_492 = x.data;
              return _3a__3a_({infixl: local_492.head
                              ,infixr: function (local_493) {
                                 return map({stream: local_492.tail({})
                                            ,mapping: function (local_494) {
                                               var x = _2265_({infixl: length(local_494)
                                                              ,infixr: 2.0});
                                               switch (x.tag)
                                               {
                                                 case "false":
                                                   var local_495 = x.data;
                                                   throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                   ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                   ,"dc688712fae3cce5d326448fdfdec2a5");
                                                 case "true":
                                                   var local_496 = x.data;
                                                   return _2b__2b_({a: toBytes(singleton(parseHex(slice1({object: local_494
                                                                                                         ,start: 0.0
                                                                                                         ,stop: 2.0}))))
                                                                   ,b: slice1({object: local_494
                                                                              ,start: 2.0
                                                                              ,stop: length(local_494)})});
                                                 default:
                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                ,"3d161b85ea84c55ce4d08379f720f0c6");
                                               }
                                            }});
                              }});
            case "empty":
              var local_510 = x.data;
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
                 var parts3 = toArray(split({text: field2
                                            ,seperator: rts.bytesFromAscii("=")}));
                 var x = _3d__3d_({infixl: length1(parts3),infixr: 2.0});
                 switch (x.tag)
                 {
                   case "false":
                     var local_490 = x.data;
                     return ignoreError(function () {
                            throw rts.exceptions.ReachedHole("Reached a hole"
                                                            ,"DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                            ,"c4215356d194f30cdd17797a99d63ff1");
                         }());
                   case "true":
                     var local_491 = x.data;
                     return {value: decodeUrl(item1({index: 1.0,object: parts3}))
                            ,key: item1({index: 0.0,object: parts3})};
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
                                                ,mapping: function (local_518) {
                                                   var x = _3d__3d_({infixl: local_518
                                                                    ,infixr: 10.0});
                                                   switch (x.tag)
                                                   {
                                                     case "false":
                                                       var local_519 = x.data;
                                                       var x = _3d__3d_({infixl: local_518
                                                                        ,infixr: 13.0});
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_520 = x.data;
                                                           var x =
                                                           _3d__3d_({infixl: local_518
                                                                    ,infixr: 39.0});
                                                           switch (x.tag)
                                                           {
                                                             case "false":
                                                               var local_521 = x.data;
                                                               var x =
                                                               _3d__3d_({infixl: local_518
                                                                        ,infixr: 92.0});
                                                               switch (x.tag)
                                                               {
                                                                 case "false":
                                                                   var local_522 = x.data;
                                                                   return toBytes(singleton(local_518));
                                                                 case "true":
                                                                   var local_523 = x.data;
                                                                   return rts.bytesFromAscii("\\\\");
                                                                 default:
                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                                ,"db1c255f9dc88b1c4474ccb94732b223");
                                                               }
                                                             case "true":
                                                               var local_524 = x.data;
                                                               return rts.bytesFromAscii("\\\'");
                                                             default:
                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                            ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                            ,"c5163200e2f7d7f5292c38e34f78058d");
                                                           }
                                                         case "true":
                                                           var local_525 = x.data;
                                                           return rts.bytesFromAscii("\\r");
                                                         default:
                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                        ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                        ,"af75122f296de089cbe121bebb73e3af");
                                                       }
                                                     case "true":
                                                       var local_526 = x.data;
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
       var local_539 = x.data;
       return {tag: "just",data: local_539.head};
     case "empty":
       var local_540 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6ed761736e084d6c97cf57a406116d35"
                                    ,"f3442eac4d4349a99cafaa88a24c4a7a");
   }
};
var mapMaybe = function (local_541) {
   var x = local_541.maybe1;
   switch (x.tag)
   {
     case "just":
       var local_542 = x.data;
       return {tag: "just",data: local_541.mapping(local_542)};
     case "nothing":
       var local_543 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_2e9eb864b9154a2594c46dbc34021fab"
                                    ,"5ed58bf5b9734ee5b4f4dc26197f7885");
   }
};
var lookup1 = function (local_534) {
   return mapMaybe({mapping: function (local_535) {
                      return local_535.value;
                   }
                   ,maybe1: head1(filter2({stream: local_534.assocs
                                          ,keep: function (local_536) {
                                             var local_538 = function (local_537) {
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
                                                                ,infixr: local_536});
                                             };
                                             return _3d__3d_({infixl: local_536.key
                                                             ,infixr: local_534.key});
                                          }}))});
};
var updateSessionRow = function (local_511) {
   return _3b_({infixl: query({database: local_511.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET ")
                                                                          ,b: join({texts: concat(map({stream: fromArray(local_511.body)
                                                                                                      ,mapping: function (local_512) {
                                                                                                         var x =
                                                                                                         _7c__7c_({infixl: _3d__3d_({infixl: local_512.key
                                                                                                                                    ,infixr: rts.bytesFromAscii("level")})
                                                                                                                  ,infixr: function (local_513) {
                                                                                                                     return _7c__7c_({infixl: _3d__3d_({infixl: local_512.key
                                                                                                                                                       ,infixr: rts.bytesFromAscii("location")})
                                                                                                                                     ,infixr: function (local_514) {
                                                                                                                                        return _3d__3d_({infixl: local_512.key
                                                                                                                                                        ,infixr: rts.bytesFromAscii("when")});
                                                                                                                                     }});
                                                                                                                  }});
                                                                                                         switch (x.tag)
                                                                                                         {
                                                                                                           case "false":
                                                                                                             var local_515 =
                                                                                                             x.data;
                                                                                                             var x =
                                                                                                             _7c__7c_({infixl: _3d__3d_({infixl: local_512.key
                                                                                                                                        ,infixr: rts.bytesFromAscii("add_teacher")})
                                                                                                                      ,infixr: function (local_516) {
                                                                                                                         return _3d__3d_({infixl: local_512.key
                                                                                                                                         ,infixr: rts.bytesFromAscii("remove_teacher")});
                                                                                                                      }});
                                                                                                             switch (x.tag)
                                                                                                             {
                                                                                                               case "false":
                                                                                                                 var local_517 =
                                                                                                                 x.data;
                                                                                                                 return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_512.key
                                                                                                                                                                ,b: rts.bytesFromAscii(" = ")})
                                                                                                                                                   ,b: postgresEncodeText(local_512.value)})
                                                                                                                                 ,infixr: function (local_527) {
                                                                                                                                    return {tag: "empty"
                                                                                                                                           ,data: {}};
                                                                                                                                 }});
                                                                                                               case "true":
                                                                                                                 var local_528 =
                                                                                                                 x.data;
                                                                                                                 return {tag: "empty"
                                                                                                                        ,data: {}};
                                                                                                               default:
                                                                                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                              ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                                                                              ,"267a2077130878c293cf4285fc1e3f96");
                                                                                                             }
                                                                                                           case "true":
                                                                                                             var local_529 =
                                                                                                             x.data;
                                                                                                             return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_512.key
                                                                                                                                                            ,b: rts.bytesFromAscii("_id = ")})
                                                                                                                                               ,b: local_512.value})
                                                                                                                             ,infixr: function (local_530) {
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
                                                ,b: showNum(local_511.session)})})
               ,infixr: function (local_531) {
                  var x = local_531;
                  switch (x.tag)
                  {
                    case "error":
                      var local_532 = x.data;
                      return __return({tag: "error",data: local_532});
                    case "success":
                      var local_533 = x.data;
                      return _3b_({infixl: function () {
                                     var x = lookup1({assocs: fromArray(local_511.body)
                                                     ,key: rts.bytesFromAscii("add_teacher")});
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_544 = x.data;
                                         var x = _3d__3d_({infixl: local_544
                                                          ,infixr: rts.bytesFromAscii("")});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_545 = x.data;
                                             return _3b_({infixl: query({database: local_511.database
                                                                        ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("INSERT INTO pestoval_session_teachers (session_id, teacher_id)\nVALUES (")
                                                                                                                                 ,b: showNum(local_511.session)})
                                                                                                                    ,b: rts.bytesFromAscii(", ")})
                                                                                                       ,b: local_544})
                                                                                          ,b: rts.bytesFromAscii(")")})})
                                                         ,infixr: function (x546) {
                                                            switch (x546.tag)
                                                            {
                                                              case "error":
                                                                var local_547 = x546.data;
                                                                return ignoreError(local_547);
                                                              case "success":
                                                                var local_548 = x546.data;
                                                                return __return({});
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                             ,"3ad72f38b50bc1b5cc297ad16d68f28c");
                                                            }
                                                         }});
                                           case "true":
                                             var local_549 = x.data;
                                             return __return({});
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                          ,"138352fb50e0b842a35b65e5440d4cbb");
                                         }
                                       case "nothing":
                                         var local_550 = x.data;
                                         return __return({});
                                       default:
                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                      ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                      ,"b7e3310f75aa51661dd00a4d961cbe7d");
                                     }
                                  }()
                                  ,infixr: function (local_551) {
                                     var x = lookup1({assocs: fromArray(local_511.body)
                                                     ,key: rts.bytesFromAscii("remove_teacher")});
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_552 = x.data;
                                         return _3b_({infixl: query({database: local_511.database
                                                                    ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("DELETE FROM pestoval_session_teachers\nWHERE pestoval_session_teachers.session_id = ")
                                                                                                                ,b: showNum(local_511.session)})
                                                                                                   ,b: rts.bytesFromAscii(" AND pestoval_session_teachers.teacher_id = ")})
                                                                                      ,b: local_552})})
                                                     ,infixr: function (x553) {
                                                        switch (x553.tag)
                                                        {
                                                          case "error":
                                                            var local_554 = x553.data;
                                                            return __return({tag: "error"
                                                                            ,data: local_554});
                                                          case "success":
                                                            var local_555 = x553.data;
                                                            return __return({tag: "success"
                                                                            ,data: {}});
                                                          default:
                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                         ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                         ,"c22e107f85c6554bb3a7ef4080f8f72a");
                                                        }
                                                     }});
                                       case "nothing":
                                         var local_556 = x.data;
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
var tryQuery = function (local_558) {
   return function (x559) {
          switch (x559.tag)
          {
            case "error":
              var local_560 = x559.data;
              return __return({content: {__data: _2b__2b_({a: rts.bytesFromAscii("Database error: ")
                                                          ,b: local_560})
                                        ,mimeType: rts.bytesFromAscii("text/plain")}
                              ,status: {message: rts.bytesFromAscii("Internal Server Error")
                                       ,code: 500.0}});
            case "success":
              return local_558(x559.data);
            default:
              throw rts.exceptions.LamduBug("Unhandled case"
                                           ,"DEF_6ab93b1ac8a248c0a946996efdd08c5f"
                                           ,"601e113ccba88e0bf9ac1fe558419963");
          }
       };
};
var pestovalVerifyUpdate = function (local_561) {
   var x = lookup1({assocs: fromArray(local_561.body),key: rts.bytesFromAscii("when")});
   switch (x.tag)
   {
     case "just":
       var when2 = x.data;
       var x = lookup1({assocs: fromArray(local_561.body)
                       ,key: rts.bytesFromAscii("location")});
       switch (x.tag)
       {
         case "just":
           var where1 = x.data;
           return _3b_({infixl: query({database: local_561.database
                                      ,object: concat1(_3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id\nFROM pestoval_session\nWHERE pestoval_session.id <> ")
                                                                ,infixr: function (local_562) {
                                                                   return _3a__3a_({infixl: showNum(local_561.session)
                                                                                   ,infixr: function (local_563) {
                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.location_id = ")
                                                                                                      ,infixr: function (local_564) {
                                                                                                         return _3a__3a_({infixl: where1
                                                                                                                         ,infixr: function (local_565) {
                                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.when_id = ")
                                                                                                                                            ,infixr: function (local_566) {
                                                                                                                                               return _3a__3a_({infixl: when2
                                                                                                                                                               ,infixr: function (local_567) {
                                                                                                                                                                  return {tag: "empty"
                                                                                                                                                                         ,data: {}};
                                                                                                                                                               }});
                                                                                                                                            }});
                                                                                                                         }});
                                                                                                      }});
                                                                                   }});
                                                                }}))})
                       ,infixr: function (x568) {
                          switch (x568.tag)
                          {
                            case "error":
                              var local_569 = x568.data;
                              return ignoreError(local_569);
                            case "success":
                              var local_570 = x568.data;
                              return __return(function () {
                                     var x = _3d__3d_({infixl: length1(local_570.__data)
                                                      ,infixr: 0.0});
                                     switch (x.tag)
                                     {
                                       case "false":
                                         var local_571 = x.data;
                                         return {tag: "conflicts"
                                                ,data: toArray(map({stream: fromArray(local_570.__data)
                                                                   ,mapping: function (local_572) {
                                                                      return parseInt(item1({index: 0.0
                                                                                            ,object: local_572}));
                                                                   }}))};
                                       case "true":
                                         var local_573 = x.data;
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
           var local_574 = x.data;
           return ignoreError({});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_bcca348b043a42949aaf89fb2eccfc72"
                                        ,"7aa622f233fd592d4ac16d681620a799");
       }
     case "nothing":
       var local_575 = x.data;
       return __return({tag: "good",data: {}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_bcca348b043a42949aaf89fb2eccfc72"
                                    ,"814512c476a997315cd8f86c31cf843c");
   }
};
var pestovalUpdate = function (local_488) {
   var x = local_488.request1.body;
   switch (x.tag)
   {
     case "just":
       var local_489 = x.data;
       var body2 = toArray(parsePostBody(local_489));
       var update = function (dest) {
          return _3b_({infixl: updateSessionRow({body: body2
                                                ,database: local_488.database
                                                ,session: local_488.session})
                      ,infixr: tryQuery(function (local_557) {
                         return __return({content: {__data: rts.bytesFromAscii("Update successful, refresh")
                                                   ,mimeType: rts.bytesFromAscii("text/plain")}
                                         ,status: {message: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: ")
                                                                     ,b: dest})
                                                  ,code: 303.0}});
                      })});
       };
       return _3b_({infixl: pestovalVerifyUpdate({body: body2
                                                 ,database: local_488.database
                                                 ,session: local_488.session})
                   ,infixr: function (x576) {
                      switch (x576.tag)
                      {
                        case "conflicts":
                          var conflicts1 = x576.data;
                          return _3b_({infixl: query({database: local_488.database
                                                     ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET location_id = NULL\nWHERE pestoval_session.id IN (")
                                                                                    ,b: join({texts: map({stream: fromArray(conflicts1)
                                                                                                         ,mapping: showNum})
                                                                                             ,seperator: rts.bytesFromAscii(", ")})})
                                                                       ,b: rts.bytesFromAscii(")")})})
                                      ,infixr: tryQuery(function (local_577) {
                                         return update(_2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("/eng/manage/")
                                                                             ,b: local_488.password})
                                                                ,b: rts.bytesFromAscii("/")}));
                                      })});
                        case "good":
                          var local_578 = x576.data;
                          return update(local_488.request1.path);
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                       ,"7605757a63256d30d9c89a9804c8dd00");
                      }
                   }});
     case "nothing":
       var local_579 = x.data;
       return __return({content: {__data: rts.bytesFromAscii("POST with no body")
                                 ,mimeType: rts.bytesFromAscii("text/plain")}
                       ,status: {message: rts.bytesFromAscii("Forbidden"),code: 403.0}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                    ,"7155adc9c6327a297327ec4e1f1a8007");
   }
};
var pestovalEditPage = function (local_393) {
   var parts2 = toArray(split({text: local_393.request1.path
                              ,seperator: rts.bytesFromAscii("/")}));
   var id3 = parseInt(item1({index: 3.0,object: parts2}));
   var password2 = item1({index: 4.0,object: parts2});
   return _3b_({infixl: getSession({database: local_393.database,id: id3})
               ,infixr: function (local_406) {
                  var x = local_406;
                  switch (x.tag)
                  {
                    case "just":
                      var session3 = x.data;
                      return _3b_({infixl: pestovalAuth({database: local_393.database
                                                        ,password: password2
                                                        ,teachers: session3.teachers})
                                  ,infixr: function (x407) {
                                     switch (x407.tag)
                                     {
                                       case "unauthorized":
                                         var local_408 = x407.data;
                                         return __return(pestovalUnauthorized);
                                       default:
                                         var authorization = x407;
                                         var x =
                                         _3d__3d_({infixl: local_393.request1.method
                                                  ,infixr: rts.bytesFromAscii("POST")});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_409 = x.data;
                                             return _3b_({infixl: function () {
                                                            var x = authorization;
                                                            switch (x.tag)
                                                            {
                                                              case "admin":
                                                                var local_410 = x.data;
                                                                return _3b_({infixl: sequence(_3a__3a_({infixl: teachersEditForm({database: local_393.database
                                                                                                                                 ,teachers: session3.teachers})
                                                                                                       ,infixr: function (local_434) {
                                                                                                          return _3a__3a_({infixl: levelEditForm({database: local_393.database
                                                                                                                                                 ,level1: session3.level1})
                                                                                                                          ,infixr: function (local_442) {
                                                                                                                             return _3a__3a_({infixl: locationEditForm({where: session3.place1
                                                                                                                                                                       ,database: local_393.database})
                                                                                                                                             ,infixr: function (local_449) {
                                                                                                                                                return _3a__3a_({infixl: timeSlotEditForm({database: local_393.database
                                                                                                                                                                                          ,when1: session3.when1})
                                                                                                                                                                ,infixr: function (local_459) {
                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                          ,data: {}};
                                                                                                                                                                }});
                                                                                                                                             }});
                                                                                                                          }});
                                                                                                       }}))
                                                                            ,infixr: function (local_460) {
                                                                               return __return(concat(local_460));
                                                                            }});
                                                              case "teacher1":
                                                                var local_461 = x.data;
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
                                                         ,infixr: function (top) {
                                                            return __return(pestovalPage({title: rts.bytesFromAscii("Edit Session")
                                                                                         ,body: [_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Edit Session")))})
                                                                                                ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"")
                                                                                                                                       ,b: local_393.request1.path})
                                                                                                                          ,b: rts.bytesFromAscii("\">")})
                                                                                                        ,infixr: toArray(_2b__2b_2({infixl: top
                                                                                                                                   ,infixr: function (local_472) {
                                                                                                                                      return _2b__2b_2({infixl: concat(map({stream: _2b__2b_2({infixl: function () {
                                                                                                                                                                                                 var x =
                                                                                                                                                                                                 authorization;
                                                                                                                                                                                                 switch (x.tag)
                                                                                                                                                                                                 {
                                                                                                                                                                                                   case "admin":
                                                                                                                                                                                                     var local_473 =
                                                                                                                                                                                                     x.data;
                                                                                                                                                                                                     return pestovalEditField({name: rts.bytesFromAscii("Name")
                                                                                                                                                                                                                              ,value: session3.name
                                                                                                                                                                                                                              ,key: rts.bytesFromAscii("name")});
                                                                                                                                                                                                   case "teacher1":
                                                                                                                                                                                                     var local_477 =
                                                                                                                                                                                                     x.data;
                                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                                   default:
                                                                                                                                                                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                                                                  ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                                                                                                                                                                                  ,"b24e7f87522990052299e7d83ddb641c");
                                                                                                                                                                                                 }
                                                                                                                                                                                              }()
                                                                                                                                                                                              ,infixr: function (local_478) {
                                                                                                                                                                                                 return pestovalEditFields(session3);
                                                                                                                                                                                              }})
                                                                                                                                                                           ,mapping: formTextArea}))
                                                                                                                                                       ,infixr: function (local_484) {
                                                                                                                                                          return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                                                                                                                          ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                                                                    ,infixr: singleton(leaf(rts.bytesFromAscii("Update")))}))})
                                                                                                                                                                          ,infixr: function (local_485) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                       }});
                                                                                                                                   }}))})]}));
                                                         }});
                                           case "true":
                                             var local_487 = x.data;
                                             return pestovalUpdate({request1: local_393.request1
                                                                   ,database: local_393.database
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
                      var local_580 = x.data;
                      return __return(httpNotFound404(local_393.request1.path));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                   ,"08ce1c8a7d9560da25879978070222da");
                  }
               }});
};
var overlaysCss = _22f2_({infixl: rts.bytesFromAscii("<style type=\"text/css\">")
                         ,infixr: singleton(leaf(rts.bytesFromAscii("/* Thanks https://eichefam.net/2011/12/21/popup-windows-without-javascript/ */\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0,0,0,0.5);\n  transition: opacity 200ms;\n  visibility: hidden;\n  opacity: 0;\n}\n.overlay:target {\n  visibility: visible;\n  opacity: 1;\n}\n.cancel {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  cursor: default;\n}\n.popup {\n  margin: 50px auto;\n  padding: 20px;\n  background: #fff;\n  border: 1px solid #666;\n  width: 70%;\n  box-shadow: 0 0 50px rgba(0,0,0,0.5);\n  position: relative;\n}")))});
var pestovalTeacherPage = function (local_582) {
   var teacher3 = parseInt(item1({index: 0.0,object: local_582.path}));
   return _3b_({infixl: query({database: local_582.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT ")
                                                                          ,b: queryFieldLang(local_582.language2)({table: rts.bytesFromAscii("pestoval_teacher")
                                                                                                                  ,field: rts.bytesFromAscii("name")
                                                                                                                  ,as: {tag: "nothing"
                                                                                                                       ,data: {}}})})
                                                             ,b: rts.bytesFromAscii(", pestoval_teacher.password\nFROM pestoval_teacher\nWHERE pestoval_teacher.id =")})
                                                ,b: showNum(teacher3)})})
               ,infixr: function (x583) {
                  switch (x583.tag)
                  {
                    case "error":
                      var local_584 = x583.data;
                      return ignoreError(local_584);
                    case "success":
                      var local_585 = x583.data;
                      var password3 = function () {
                                         var x =
                                         _26__26_({infixl: _3e_({infixl: length1(local_582.path)
                                                                ,infixr: 1.0})
                                                  ,infixr: function (local_586) {
                                                     return _2260_({infixl: item1({index: 1.0
                                                                                  ,object: local_582.path})
                                                                   ,infixr: rts.bytesFromAscii("")});
                                                  }});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_587 = x.data;
                                             return {tag: "nothing",data: {}};
                                           case "true":
                                             var local_588 = x.data;
                                             return {tag: "just"
                                                    ,data: item1({index: 1.0
                                                                 ,object: local_582.path})};
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_50938aa1a135407c826989b9e1339047"
                                                                          ,"91cc4c8b5af33ae92f94375e3a666b89");
                                         }
                                      }();
                      var title1 = item1({index: 0.0
                                         ,object: item1({index: 0.0
                                                        ,object: local_585.__data})});
                      return _3b_({infixl: pestovalQuerySessions({database: local_582.database
                                                                 ,teacher1: {tag: "just"
                                                                            ,data: teacher3}
                                                                 ,language2: local_582.language2
                                                                 ,filter: {tag: "nothing"
                                                                          ,data: {}}})
                                  ,infixr: function (sessions1) {
                                     return __return(pestovalPage({title: title1
                                                                  ,body: [overlaysCss
                                                                         ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                            ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                                      ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                                                ,infixr: singleton(leaf(title1))}))}))})
                                                                                                            ,infixr: function (local_590) {
                                                                                                               return map({stream: fromArray(sessions1)
                                                                                                                          ,mapping: function (session5) {
                                                                                                                             var info =
                                                                                                                             join({texts: _3a__3a_({infixl: session5.name
                                                                                                                                                   ,infixr: function (local_591) {
                                                                                                                                                      var x =
                                                                                                                                                      filter2({stream: fromArray(session5.teachers)
                                                                                                                                                              ,keep: function (local_592) {
                                                                                                                                                                 return _2260_({infixl: local_592.id
                                                                                                                                                                               ,infixr: teacher3});
                                                                                                                                                              }});
                                                                                                                                                      switch (x.tag)
                                                                                                                                                      {
                                                                                                                                                        case "nonEmpty":
                                                                                                                                                          var local_593 =
                                                                                                                                                          x.data;
                                                                                                                                                          return _3a__3a_({infixl: concat1(_3a__3a_({infixl: function () {
                                                                                                                                                                                                       var x =
                                                                                                                                                                                                       local_582.language2;
                                                                                                                                                                                                       switch (x.tag)
                                                                                                                                                                                                       {
                                                                                                                                                                                                         case "english":
                                                                                                                                                                                                           var local_594 =
                                                                                                                                                                                                           x.data;
                                                                                                                                                                                                           return rts.bytesFromAscii("(With ");
                                                                                                                                                                                                         case "hebrew":
                                                                                                                                                                                                           var local_595 =
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
                                                                                                                                                                                                    ,infixr: function (local_596) {
                                                                                                                                                                                                       return _3a__3a_({infixl: local_593.head.name
                                                                                                                                                                                                                       ,infixr: function (local_597) {
                                                                                                                                                                                                                          return _3a__3a_({infixl: join({texts: map({stream: local_593.tail({})
                                                                                                                                                                                                                                                                    ,mapping: function (local_598) {
                                                                                                                                                                                                                                                                       return _2b__2b_({a: function () {
                                                                                                                                                                                                                                                                                          var x =
                                                                                                                                                                                                                                                                                          local_582.language2;
                                                                                                                                                                                                                                                                                          switch (x.tag)
                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                            case "english":
                                                                                                                                                                                                                                                                                              var local_599 =
                                                                                                                                                                                                                                                                                              x.data;
                                                                                                                                                                                                                                                                                              return rts.bytesFromAscii(" & ");
                                                                                                                                                                                                                                                                                            case "hebrew":
                                                                                                                                                                                                                                                                                              var local_600 =
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
                                                                                                                                                                                                                                                                                       ,b: local_598.name});
                                                                                                                                                                                                                                                                    }})
                                                                                                                                                                                                                                                        ,seperator: rts.bytesFromAscii("")})
                                                                                                                                                                                                                                          ,infixr: function (local_601) {
                                                                                                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(")")
                                                                                                                                                                                                                                                             ,infixr: function (local_602) {
                                                                                                                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                                                                                                                       ,data: {}};
                                                                                                                                                                                                                                                             }});
                                                                                                                                                                                                                                          }});
                                                                                                                                                                                                                       }});
                                                                                                                                                                                                    }}))
                                                                                                                                                                          ,infixr: function (local_603) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                        case "empty":
                                                                                                                                                          var local_604 =
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
                                                                                                                                                                                                                                                                          ,language2: local_582.language2})
                                                                                                                                                                                                                                                  ,infixr: function (local_605) {
                                                                                                                                                                                                                                                     return _3a__3a_({infixl: session5.place1.name
                                                                                                                                                                                                                                                                     ,infixr: function (local_606) {
                                                                                                                                                                                                                                                                        return {tag: "empty"
                                                                                                                                                                                                                                                                               ,data: {}};
                                                                                                                                                                                                                                                                     }});
                                                                                                                                                                                                                                                  }})
                                                                                                                                                                                                                                 ,seperator: rts.bytesFromAscii(" / ")})))})
                                                                                                                                                                                            ,htmlParagraph(info)]
                                                                                                                                                                                  ,style: rts.bytesFromAscii("")
                                                                                                                                                                                  ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                  ,language2: local_582.language2
                                                                                                                                                                                  ,session: session5}))});
                                                                                                                          }});
                                                                                                            }}))
                                                                                    ,language2: local_582.language2})]}));
                                  }});
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_50938aa1a135407c826989b9e1339047"
                                                   ,"fc81fe2932d91417e79f74d97a2f2ad5");
                  }
               }});
};
var pestovalTimeFilter =
rts.bytesFromAscii("pestoval_timeslot.stop >= now() AT TIME ZONE \'UTC-3\' - interval \'30 minutes\'");
var maximum2 = function (local_633) {
   var x = _2265_({infixl: local_633.__x1,infixr: local_633.y});
   switch (x.tag)
   {
     case "false":
       var local_634 = x.data;
       return local_633.y;
     case "true":
       var local_635 = x.data;
       return local_633.__x1;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_19e923b820b04266a9811a6b34fe7b37"
                                    ,"a5d0a997c71340b2b9d148187aeb6d00");
   }
};
var nonEmptyFold = function (local_636) {
   var x = local_636.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_637 = x.data;
       return {tag: "just"
              ,data: fold({stream: local_637.tail({})
                          ,initial: local_637.head
                          ,binop: local_636.binop})};
     case "empty":
       var local_638 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_05d859467ac547cc890fea33e3ff4642"
                                    ,"eb3e9576545c4cc390019d2c5a8d9ce4");
   }
};
var maximum1 = function (stream10) {
   return nonEmptyFold({stream: stream10
                       ,binop: function (local_632) {
                          return maximum2({y: local_632.item,__x1: local_632.acc});
                       }});
};
var gcd = function (local_641) {
   var x = _3d__3d_({infixl: local_641.__x1,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_642 = x.data;
       return gcd({y: local_641.__x1
                  ,__x1: _25_({infixl: local_641.y,infixr: local_641.__x1})});
     case "true":
       var local_643 = x.data;
       return local_641.y;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_493da5cfecea49b89fd9a10c42df9e12"
                                    ,"426c0882a83d8df5efe64ca0e57098af");
   }
};
var lcm = function (local_640) {
   return _2f_({infixl: _2a_({infixl: local_640.__x1,infixr: local_640.y})
               ,infixr: gcd({y: local_640.y,__x1: local_640.__x1})});
};
var timeSlotRow = function (local_646) {
   return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                 ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td colspan=")
                                                                          ,infixr: function (local_647) {
                                                                             return _3a__3a_({infixl: showNum(local_646.numColumns1)
                                                                                             ,infixr: function (local_648) {
                                                                                                return _3a__3a_({infixl: rts.bytesFromAscii(" style=\"font-size:150%; border-top:3pt solid black;\">")
                                                                                                                ,infixr: function (local_649) {
                                                                                                                   return {tag: "empty"
                                                                                                                          ,data: {}};
                                                                                                                }});
                                                                                             }});
                                                                          }})
                                                         ,seperator: rts.bytesFromAscii("")})
                                           ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_646.timeSlot
                                                                                  ,language2: local_646.language2})))}))});
};
var formatTeachers = function (local_653) {
   return htmlParagraph(_2b__2b_({a: join({texts: map({stream: fromArray(local_653.teachers)
                                                      ,mapping: function (local_654) {
                                                         return local_654.name;
                                                      }})
                                          ,seperator: function () {
                                             var x = local_653.language2;
                                             switch (x.tag)
                                             {
                                               case "english":
                                                 var local_655 = x.data;
                                                 return rts.bytesFromAscii(" & ");
                                               case "hebrew":
                                                 var local_656 = x.data;
                                                 return rts.bytes([32,215,149]);
                                               default:
                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                              ,"DEF_b343578f80c84dbf8532d81d3be7c414"
                                                                              ,"5501c290d329fa41da6be2be94a5f4d0");
                                             }
                                          }()})
                                 ,b: rts.bytesFromAscii(":")}));
};
var detailedSessionInfo = function (local_652) {
   return [formatTeachers({teachers: local_652.session.teachers
                          ,language2: local_652.language2})
          ,htmlParagraph(local_652.session.name)
          ,htmlParagraph(local_652.session.place1.name)];
};
var pestovalLevelsPage = function (local_611) {
   var minimum = parseInt(item1({index: 0.0,object: local_611.path}));
   var maximum = function () {
                    var x = _3e_({infixl: length1(local_611.path),infixr: 1.0});
                    switch (x.tag)
                    {
                      case "false":
                        var local_612 = x.data;
                        return minimum;
                      case "true":
                        var local_613 = x.data;
                        return parseInt(item1({index: 1.0,object: local_611.path}));
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
                            var local_614 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_611.language2;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_615 = x.data;
                                                   return rts.bytesFromAscii("Levels");
                                                 case "hebrew":
                                                   var local_616 = x.data;
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
                                            ,infixr: function (local_617) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_618) {
                                                                  return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                                  ,infixr: function (local_619) {
                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                     ,infixr: function (local_620) {
                                                                                                        return {tag: "empty"
                                                                                                               ,data: {}};
                                                                                                     }});
                                                                                  }});
                                                               }});
                                            }});
                          case "true":
                            var local_621 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_611.language2;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_622 = x.data;
                                                   return rts.bytesFromAscii("Level");
                                                 case "hebrew":
                                                   var local_623 = x.data;
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
                                            ,infixr: function (local_624) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_625) {
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
   return _3b_({infixl: pestovalQuerySessions({database: local_611.database
                                              ,teacher1: {tag: "nothing",data: {}}
                                              ,language2: local_611.language2
                                              ,filter: {tag: "just"
                                                       ,data: concat1(_3a__3a_({infixl: showNum(minimum)
                                                                               ,infixr: function (local_626) {
                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(" <= pestoval_level.as_number AND pestoval_level.as_number <= ")
                                                                                                  ,infixr: function (local_627) {
                                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                                     ,infixr: function (local_628) {
                                                                                                                        return _3a__3a_({infixl: rts.bytesFromAscii(" AND ")
                                                                                                                                        ,infixr: function (local_629) {
                                                                                                                                           return _3a__3a_({infixl: pestovalTimeFilter
                                                                                                                                                           ,infixr: function (local_630) {
                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                     ,data: {}};
                                                                                                                                                           }});
                                                                                                                                        }});
                                                                                                                     }});
                                                                                                  }});
                                                                               }}))}})
               ,infixr: function (sessions2) {
                  var groups = toArray(group({stream: fromArray(sessions2)
                                             ,by: function (local_631) {
                                                return _3d__3d_({infixl: local_631.infixl.when1.id
                                                                ,infixr: local_631.infixr.when1.id});
                                             }}));
                  var maxRow = maybe({object: maximum1(map({stream: fromArray(groups)
                                                           ,mapping: length1}))
                                     ,or: 0.0});
                  var numColumns = fold({stream: _2e__2e_({start: 1.0
                                                          ,stop: _2b_({infixl: maxRow
                                                                      ,infixr: 1.0})})
                                        ,initial: 1.0
                                        ,binop: function (local_639) {
                                           return lcm({y: local_639.item
                                                      ,__x1: local_639.acc});
                                        }});
                  return __return(pestovalPage({title: title2
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                         ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                             ,infixr: singleton(leaf(title2))}))}))})
                                                                                         ,infixr: function (local_645) {
                                                                                            return concat(map({stream: fromArray(groups)
                                                                                                              ,mapping: function (group1) {
                                                                                                                 return _3a__3a_({infixl: timeSlotRow({numColumns1: numColumns
                                                                                                                                                      ,timeSlot: item1({index: 0.0
                                                                                                                                                                       ,object: group1}).when1
                                                                                                                                                      ,language2: local_611.language2})
                                                                                                                                 ,infixr: function (local_650) {
                                                                                                                                    var attributes1 =
                                                                                                                                    function (local_651) {
                                                                                                                                       return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("colspan=")
                                                                                                                                                                                              ,b: showNum(_2f_({infixl: numColumns
                                                                                                                                                                                                               ,infixr: local_651}))})
                                                                                                                                                                                 ,b: rts.bytesFromAscii(" width=\"")})
                                                                                                                                                                    ,b: showNum(_2f__2f_({infixl: 100.0
                                                                                                                                                                                         ,infixr: local_651}))})
                                                                                                                                                       ,b: rts.bytesFromAscii("%\"")});
                                                                                                                                    }(length1(group1));
                                                                                                                                    return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                                    ,infixr: toArray(map({stream: fromArray(group1)
                                                                                                                                                                                         ,mapping: function (session6) {
                                                                                                                                                                                            return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                                                                  ,data: {}}
                                                                                                                                                                                                                       ,content: singleton(_22f2_({infixl: rts.bytesFromAscii("<div style=\"font-size:110%\">")
                                                                                                                                                                                                                                                  ,infixr: detailedSessionInfo({language2: local_611.language2
                                                                                                                                                                                                                                                                               ,session: session6})}))
                                                                                                                                                                                                                       ,style: rts.bytesFromAscii("border-left: 1pt solid black")
                                                                                                                                                                                                                       ,attributes: attributes1
                                                                                                                                                                                                                       ,language2: local_611.language2
                                                                                                                                                                                                                       ,session: session6});
                                                                                                                                                                                         }}))})
                                                                                                                                                    ,infixr: function (local_660) {
                                                                                                                                                       return {tag: "empty"
                                                                                                                                                              ,data: {}};
                                                                                                                                                    }});
                                                                                                                                 }});
                                                                                                              }}));
                                                                                         }}))
                                                                 ,language2: local_611.language2})]}));
               }});
};
var dedup = function (local_666) {
   return toArray(map({stream: group({stream: local_666,by: _3d__3d_})
                      ,mapping: function (local_667) {
                         return item1({index: 0.0,object: local_667});
                      }}));
};
var placesRow = function (places2) {
   var __tag = join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<th width=\"")
                                     ,infixr: function (local_669) {
                                        return _3a__3a_({infixl: showNum(_2f_({infixl: 100.0
                                                                              ,infixr: length1(places2)}))
                                                        ,infixr: function (local_670) {
                                                           return _3a__3a_({infixl: rts.bytesFromAscii("%\">")
                                                                           ,infixr: function (local_671) {
                                                                              return {tag: "empty"
                                                                                     ,data: {}};
                                                                           }});
                                                        }});
                                     }})
                    ,seperator: rts.bytesFromAscii("")});
   return _22f2_({infixl: rts.bytesFromAscii("<tr style=\"background-color:#eee\">")
                 ,infixr: toArray(map({stream: fromArray(places2)
                                      ,mapping: function (local_672) {
                                         return _22f2_({infixl: __tag
                                                       ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/places/")
                                                                                                                ,infixr: function (local_673) {
                                                                                                                   return _3a__3a_({infixl: showNum(local_672.id)
                                                                                                                                   ,infixr: function (local_674) {
                                                                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("/\"> ")
                                                                                                                                                      ,infixr: function (local_675) {
                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                ,data: {}};
                                                                                                                                                      }});
                                                                                                                                   }});
                                                                                                                }})
                                                                                               ,seperator: rts.bytesFromAscii("")})
                                                                                 ,infixr: singleton(leaf(local_672.name))}))});
                                      }}))});
};
var toArray1 = function (local_681) {
   return runMutArray(_3b_({infixl: newMutArray1(replicate({count: local_681.size
                                                           ,item: {tag: "nothing"
                                                                  ,data: {}}}))
                           ,infixr: function (__array5) {
                              return _3b_({infixl: sequence__(map({stream: local_681.stream
                                                                  ,mapping: function (local_682) {
                                                                     return writeMutArray({index: local_681.index(local_682)
                                                                                          ,object: __array5
                                                                                          ,value: {tag: "just"
                                                                                                  ,data: local_682}});
                                                                  }}))
                                          ,infixr: function (local_683) {
                                             return __return(__array5);
                                          }});
                           }}));
};
var pestovalSessionsTable = function (local_663) {
   return _3b_({infixl: pestovalQuerySessions({database: local_663.database
                                              ,teacher1: {tag: "nothing",data: {}}
                                              ,language2: local_663.language2
                                              ,filter: {tag: "just"
                                                       ,data: pestovalTimeFilter}})
               ,infixr: function (sessions3) {
                  var places1 =
                  dedup(fromArray(sort({stream: map({stream: fromArray(sessions3)
                                                    ,mapping: function (local_664) {
                                                       return local_664.place1;
                                                    }})
                                       ,_3c_1: function (local_665) {
                                          return _3c_({infixl: local_665.infixl.id
                                                      ,infixr: local_665.infixr.id});
                                       }})));
                  var numColumns2 = length1(places1);
                  return __return(pestovalPage({title: rts.bytesFromAscii("All Sessions")
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(_3a__3a_({infixl: placesRow(places1)
                                                                                         ,infixr: function (local_676) {
                                                                                            return concat(map({stream: group({stream: fromArray(sessions3)
                                                                                                                             ,by: function (local_677) {
                                                                                                                                return _3d__3d_({infixl: local_677.infixl.when1.id
                                                                                                                                                ,infixr: local_677.infixr.when1.id});
                                                                                                                             }})
                                                                                                              ,mapping: function (local_678) {
                                                                                                                 return _3a__3a_({infixl: timeSlotRow({numColumns1: numColumns2
                                                                                                                                                      ,timeSlot: item1({index: 0.0
                                                                                                                                                                       ,object: local_678}).when1
                                                                                                                                                      ,language2: local_663.language2})
                                                                                                                                 ,infixr: function (local_679) {
                                                                                                                                    return map({stream: fromArray(toArray1({stream: fromArray(local_678)
                                                                                                                                                                           ,index: function (local_680) {
                                                                                                                                                                              return index6({__array4: places1
                                                                                                                                                                                            ,item: local_680.place1});
                                                                                                                                                                           }
                                                                                                                                                                           ,size: numColumns2}))
                                                                                                                                               ,mapping: function (local_684) {
                                                                                                                                                  var x =
                                                                                                                                                  local_684;
                                                                                                                                                  switch (x.tag)
                                                                                                                                                  {
                                                                                                                                                    case "just":
                                                                                                                                                      var session7 =
                                                                                                                                                      x.data;
                                                                                                                                                      return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                            ,data: {}}
                                                                                                                                                                                 ,content: [formatTeachers({teachers: session7.teachers
                                                                                                                                                                                                           ,language2: local_663.language2})
                                                                                                                                                                                           ,htmlParagraph(session7.name)]
                                                                                                                                                                                 ,style: rts.bytesFromAscii("")
                                                                                                                                                                                 ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                 ,language2: local_663.language2
                                                                                                                                                                                 ,session: session7});
                                                                                                                                                    case "nothing":
                                                                                                                                                      var local_687 =
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
                                                                 ,language2: local_663.language2})]}));
               }});
};
var readFile = rts.builtins.IO.file["readFile"];
var pestovalIndex = _3b_({infixl: readFile(rts.bytesFromAscii("index.html"))
                         ,infixr: function (local_690) {
                            return __return({content: {__data: local_690
                                                      ,mimeType: rts.bytesFromAscii("text/html")}
                                            ,status: httpOk200});
                         }});
var pestovalHandler = function (local_67) {
   var parts = toArray(split({text: local_67.request1.path
                             ,seperator: rts.bytesFromAscii("/")}));
   var language = item1({index: 1.0,object: parts});
   var x = _26__26_({infixl: _3d__3d_({infixl: length1(parts),infixr: 2.0})
                    ,infixr: function (local_68) {
                       return _3d__3d_({infixl: language,infixr: rts.bytesFromAscii("")});
                    }});
   switch (x.tag)
   {
     case "false":
       var local_69 = x.data;
       var language1 = function () {
                          var x = _3d__3d_({infixl: language
                                           ,infixr: rts.bytesFromAscii("heb")});
                          switch (x.tag)
                          {
                            case "false":
                              var local_70 = x.data;
                              return {tag: "english",data: {}};
                            case "true":
                              var local_71 = x.data;
                              return {tag: "hebrew",data: {}};
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                           ,"a7d7d7d9e5191fb58b9d7aeb67e660b8");
                          }
                       }();
       var page = item1({index: 2.0,object: parts});
       var path1 = toArray(drop({stream: fromArray(parts),count: 3.0}));
       var x = _26__26_({infixl: _3d__3d_({infixl: length1(parts),infixr: 3.0})
                        ,infixr: function (local_78) {
                           return _3d__3d_({infixl: page,infixr: rts.bytesFromAscii("")});
                        }});
       switch (x.tag)
       {
         case "false":
           var local_79 = x.data;
           var x = _3d__3d_({infixl: page,infixr: rts.bytesFromAscii("levels")});
           switch (x.tag)
           {
             case "false":
               var local_80 = x.data;
               var x = _3d__3d_({infixl: page,infixr: rts.bytesFromAscii("teacher")});
               switch (x.tag)
               {
                 case "false":
                   var local_81 = x.data;
                   var x = _3d__3d_({infixl: page,infixr: rts.bytesFromAscii("edit")});
                   switch (x.tag)
                   {
                     case "false":
                       var local_82 = x.data;
                       var x = _3d__3d_({infixl: page
                                        ,infixr: rts.bytesFromAscii("manage")});
                       switch (x.tag)
                       {
                         case "false":
                           var local_83 = x.data;
                           return __return(httpNotFound404(local_67.request1.path));
                         case "true":
                           var local_90 = x.data;
                           return pestovalManage({path: path1
                                                 ,database: local_67.database});
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                        ,"3042fc773313a781882df94a14ec3bb3");
                       }
                     case "true":
                       var local_392 = x.data;
                       return pestovalEditPage({request1: local_67.request1
                                               ,database: local_67.database});
                     default:
                       throw rts.exceptions.LamduBug("Unhandled case"
                                                    ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                    ,"3904128e0f229aab0f559b8c4efd7e8c");
                   }
                 case "true":
                   var local_581 = x.data;
                   return pestovalTeacherPage({path: path1
                                              ,database: local_67.database
                                              ,language2: language1});
                 default:
                   throw rts.exceptions.LamduBug("Unhandled case"
                                                ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                ,"1efb5179a530efb5cf0ea0f292813e32");
               }
             case "true":
               var local_610 = x.data;
               return pestovalLevelsPage({path: path1
                                         ,database: local_67.database
                                         ,language2: language1});
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                            ,"3725e3e3e238c36942a62af16a116f25");
           }
         case "true":
           var local_662 = x.data;
           return pestovalSessionsTable({database: local_67.database
                                        ,language2: language1});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                        ,"0e90da8443f9aff3c55edb7f8fef28fc");
       }
     case "true":
       var local_689 = x.data;
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
                      var local_703 = x.data;
                      return __return({tag: "nothing",data: {}});
                    case "true":
                      var local_704 = x.data;
                      return _3b_({infixl: readMutArray({index: _2d_({infixl: length6
                                                                     ,infixr: 1.0})
                                                        ,object: __array6})
                                  ,infixr: function (result) {
                                     return _3b_({infixl: truncateMutArray({object: __array6
                                                                           ,stop: _2d_({infixl: length6
                                                                                       ,infixr: 1.0})})
                                                 ,infixr: function (local_705) {
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
var find1 = function (local_724) {
   return first({that: function (local_725) {
                   return _3d__3d_({infixl: byteAt({index: local_725
                                                   ,object: local_724.__bytes})
                                   ,infixr: local_724.byte});
                }
                ,stream: _2e__2e_({start: local_724.start
                                  ,stop: length(local_724.__bytes)})});
};
var unsuffixed = function (local_731) {
   var x = isSuffixOf({suffix: local_731.suffix,whole: local_731.whole});
   switch (x.tag)
   {
     case "false":
       var local_732 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_733 = x.data;
       return {tag: "just"
              ,data: slice1({object: local_731.whole
                            ,start: 0.0
                            ,stop: _2d_({infixl: length(local_731.whole)
                                        ,infixr: length(local_731.suffix)})})};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6c2d206c45c348b3b8e2bbfdae7bde35"
                                    ,"7d90a0e076a149c4443b780b21470ef3");
   }
};
var removeSuffix = function (local_730) {
   var x = unsuffixed({suffix: local_730.suffix,whole: local_730.whole});
   switch (x.tag)
   {
     case "just":
       return id1(x.data);
     case "nothing":
       var local_734 = x.data;
       return local_730.whole;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8c9d00ae73ab41ca903aa34ee4c6601a"
                                    ,"97a63e2f16bd481c6e64fd0c8a6d92fa");
   }
};
var packetsEndWith = function (local_738) {
   var x = _3d__3d_({infixl: local_738.stop,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_739 = x.data;
       return _3b_({infixl: readMutArray({index: _2d_({infixl: local_738.stop
                                                      ,infixr: 1.0})
                                         ,object: local_738.packets1})
                   ,infixr: function (packet1) {
                      var x = isSuffixOf({suffix: local_738.suffix,whole: packet1});
                      switch (x.tag)
                      {
                        case "false":
                          var local_740 = x.data;
                          var x = unsuffixed({suffix: packet1,whole: local_738.suffix});
                          switch (x.tag)
                          {
                            case "just":
                              var remain1 = x.data;
                              return packetsEndWith({suffix: remain1
                                                    ,stop: _2d_({infixl: local_738.stop
                                                                ,infixr: 1.0})
                                                    ,packets1: local_738.packets1});
                            case "nothing":
                              var local_741 = x.data;
                              return __return({tag: "false",data: {}});
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                           ,"0d0804c08ad23d9eed424fc83122d6dc");
                          }
                        case "true":
                          var local_742 = x.data;
                          return __return({tag: "true",data: {}});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                       ,"49052b2836be0b25cb20bc95d00972ca");
                      }
                   }});
     case "true":
       var local_743 = x.data;
       return __return({tag: "false",data: {}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a2f069d7413941fdafe42795f6970175"
                                    ,"ae670587961cb7d305eef1133a3bbc18");
   }
};
var parseHttpHeaderPacket = function (local_723) {
   var x = find1({start: local_723.start,__bytes: local_723.newPacket,byte: 10.0});
   switch (x.tag)
   {
     case "just":
       var lfPos = x.data;
       var after = _2b_({infixl: lfPos,infixr: 1.0});
       return _3b_({infixl: length4(local_723.packets1)
                   ,infixr: function (packetIdx) {
                      var done1 = function (local_726) {
                         return _3b_({infixl: sequence(map({stream: _2e__2e_({start: 0.0
                                                                             ,stop: packetIdx})
                                                           ,mapping: function (i) {
                                                              return readMutArray({index: i
                                                                                  ,object: local_723.packets1});
                                                           }}))
                                     ,infixr: function (local_727) {
                                        var headerBytes =
                                        concat2(_2b__2b_2({infixl: local_727
                                                          ,infixr: function (local_728) {
                                                             return _3a__3a_({infixl: slice1({object: local_723.newPacket
                                                                                             ,start: 0.0
                                                                                             ,stop: lfPos})
                                                                             ,infixr: function (local_729) {
                                                                                return {tag: "empty"
                                                                                       ,data: {}};
                                                                             }});
                                                          }}));
                                        var headerLines =
                                        toArray(map({stream: split1({__bytes: headerBytes
                                                                    ,seperator: rts.bytes([10])})
                                                    ,mapping: function (line1) {
                                                       return removeSuffix({suffix: rts.bytes([13])
                                                                           ,whole: line1});
                                                    }}));
                                        return _3b_({infixl: truncateMutArray({object: local_723.packets1
                                                                              ,stop: 0.0})
                                                    ,infixr: function (local_735) {
                                                       return _3b_({infixl: appendMutArray({object: local_723.packets1
                                                                                           ,value: slice1({object: local_723.newPacket
                                                                                                          ,start: after
                                                                                                          ,stop: length(local_723.newPacket)})})
                                                                   ,infixr: function (local_736) {
                                                                      return __return({tag: "just"
                                                                                      ,data: headerLines});
                                                                   }});
                                                    }});
                                     }});
                      };
                      var prevEndsWith = function (local_737) {
                         return packetsEndWith({suffix: local_737
                                               ,stop: packetIdx
                                               ,packets1: local_723.packets1});
                      };
                      var next1 = function (local_744) {
                         return parseHttpHeaderPacket({start: after
                                                      ,newPacket: local_723.newPacket
                                                      ,packets1: local_723.packets1});
                      };
                      var x = _3d__3d_({infixl: lfPos,infixr: 0.0});
                      switch (x.tag)
                      {
                        case "false":
                          var local_745 = x.data;
                          var prevByte = byteAt({index: _2d_({infixl: lfPos,infixr: 1.0})
                                                ,object: local_723.newPacket});
                          var x = _3d__3d_({infixl: prevByte,infixr: 10.0});
                          switch (x.tag)
                          {
                            case "false":
                              var local_746 = x.data;
                              var x = _3d__3d_({infixl: prevByte,infixr: 13.0});
                              switch (x.tag)
                              {
                                case "false":
                                  return next1(x.data);
                                case "true":
                                  var local_747 = x.data;
                                  var x = _3d__3d_({infixl: lfPos,infixr: 1.0});
                                  switch (x.tag)
                                  {
                                    case "false":
                                      var local_748 = x.data;
                                      var x =
                                      _3d__3d_({infixl: byteAt({index: _2d_({infixl: lfPos
                                                                            ,infixr: 2.0})
                                                               ,object: local_723.newPacket})
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
                                      var local_749 = x.data;
                                      return _3b_({infixl: prevEndsWith(rts.bytes([10]))
                                                  ,infixr: function (local_750) {
                                                     var x = local_750;
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
                          var local_751 = x.data;
                          return _3b_({infixl: prevEndsWith(rts.bytes([10]))
                                      ,infixr: function (local_752) {
                                         var x = local_752;
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_753 = x.data;
                                             return _3b_({infixl: prevEndsWith(rts.bytes([10
                                                                                         ,13]))
                                                         ,infixr: function (local_754) {
                                                            var x = local_754;
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
       var local_755 = x.data;
       return _3b_({infixl: appendMutArray({object: local_723.packets1
                                           ,value: local_723.newPacket})
                   ,infixr: function (local_756) {
                      return __return({tag: "nothing",data: {}});
                   }});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                    ,"a641e1eefdb6d290e8f5e30eb99ae939");
   }
};
var requestHeaderIndex = function (x759) {
   switch (x759.tag)
   {
     case "referer":
       var local_760 = x759.data;
       return 9.0;
     case "range":
       var local_761 = x759.data;
       return 4.0;
     case "contentLength":
       var local_762 = x759.data;
       return 0.0;
     case "connection":
       var local_763 = x759.data;
       return 3.0;
     case "host":
       var local_764 = x759.data;
       return 5.0;
     case "userAgent":
       var local_765 = x759.data;
       return 10.0;
     case "ifModifiedSince":
       var local_766 = x759.data;
       return 6.0;
     case "ifRange":
       var local_767 = x759.data;
       return 8.0;
     case "count":
       var local_768 = x759.data;
       return 11.0;
     case "transferEncoding":
       var local_769 = x759.data;
       return 1.0;
     case "expect":
       var local_770 = x759.data;
       return 2.0;
     case "ifUnmodifiedSince":
       var local_771 = x759.data;
       return 7.0;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_1b4c5f4e650b40db91d34fcbb46eedcc"
                                    ,"2d1d3f6c02b34a16b1ecc9cff08b339e");
   }
};
var toLower8 = function (local_774) {
   var x = _7c__7c_({infixl: _26__26_({infixl: _2264_({infixl: 65.0,infixr: local_774})
                                      ,infixr: function (local_775) {
                                         return _2264_({infixl: local_774,infixr: 90.0});
                                      }})
                    ,infixr: function (local_776) {
                       return _26__26_({infixl: _2264_({infixl: 192.0,infixr: local_774})
                                       ,infixr: function (local_777) {
                                          return _26__26_({infixl: _2264_({infixl: local_774
                                                                          ,infixr: 222.0})
                                                          ,infixr: function (local_778) {
                                                             return _2260_({infixl: local_774
                                                                           ,infixr: 215.0});
                                                          }});
                                       }});
                    }});
   switch (x.tag)
   {
     case "false":
       var local_779 = x.data;
       return local_774;
     case "true":
       var local_780 = x.data;
       return _2b_({infixl: local_774,infixr: 32.0});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d53402309e2246e0acda443ccc6735f8"
                                    ,"26914d49ae6cd50363dc7b55bd37d4d5");
   }
};
var numHeadItems = function (local_784) {
   return foldLazy({stream: local_784.stream
                   ,initial: function (local_785) {
                      return id1;
                   }
                   ,binop: function (local_786) {
                      return function (local_787) {
                             var x = local_784.that(local_786.item);
                             switch (x.tag)
                             {
                               case "false":
                                 var local_788 = x.data;
                                 return local_787;
                               case "true":
                                 var local_789 = x.data;
                                 return local_786.rest({})(_2b_({infixl: local_787
                                                                ,infixr: 1.0}));
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_8e2a63199d5c4946ae51e428c77e2587"
                                                              ,"b73a61d07547543acce9e5aa2b53f447");
                             }
                          };
                   }})(0.0);
};
var parseHeader = function (line2) {
   var withLower = function (local_773) {
      return {headerNameOrig: local_773
             ,headerNameLower: toBytes(toArray(map({stream: fromBytes(local_773)
                                                   ,mapping: toLower8})))};
   };
   var x = find1({start: 0.0,__bytes: line2,byte: 58.0});
   switch (x.tag)
   {
     case "just":
       var local_781 = x.data;
       var x = Object.assign({__data: function (local_782) {
                               return slice1({object: line2
                                             ,start: _2b_({infixl: _2b_({infixl: local_781
                                                                        ,infixr: 1.0})
                                                          ,infixr: numHeadItems({that: function (c) {
                                                                                   return _7c__7c_({infixl: _3d__3d_({infixl: c
                                                                                                                     ,infixr: 32.0})
                                                                                                   ,infixr: function (local_783) {
                                                                                                      return _3d__3d_({infixl: c
                                                                                                                      ,infixr: 9.0});
                                                                                                   }});
                                                                                }
                                                                                ,stream: fromBytes(slice1({object: line2
                                                                                                          ,start: _2b_({infixl: local_781
                                                                                                                       ,infixr: 1.0})
                                                                                                          ,stop: local_782}))})})
                                             ,stop: local_782});
                            }(length(line2))}
                            ,withLower(slice1({object: line2
                                              ,start: 0.0
                                              ,stop: local_781})));
       delete x.cacheId;
       return x;
     case "nothing":
       var local_790 = x.data;
       var x = Object.assign({__data: rts.bytesFromAscii("")},withLower(line2));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_24c62861bfb940e4addebcc337a003f8"
                                    ,"2fd2696b8bb145a1f8ea35cf6754cfb8");
   }
};
var requestHeaderIndexFromText = function (local_792) {
   var local_793 = length(local_792);
   var test = function (local_794) {
      var x = _3d__3d_({infixl: local_792,infixr: local_794.text});
      switch (x.tag)
      {
        case "false":
          var local_795 = x.data;
          return {tag: "nothing",data: {}};
        case "true":
          var local_796 = x.data;
          return {tag: "just",data: requestHeaderIndex(local_794.value)};
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                       ,"dc1fada55c8b610b4ec39d131179bc92");
      }
   };
   var x = _3d__3d_({infixl: local_793,infixr: 4.0});
   switch (x.tag)
   {
     case "false":
       var local_797 = x.data;
       var x = _3d__3d_({infixl: local_793,infixr: 5.0});
       switch (x.tag)
       {
         case "false":
           var local_798 = x.data;
           var x = _3d__3d_({infixl: local_793,infixr: 6.0});
           switch (x.tag)
           {
             case "false":
               var local_799 = x.data;
               var x = _3d__3d_({infixl: local_793,infixr: 7.0});
               switch (x.tag)
               {
                 case "false":
                   var local_800 = x.data;
                   var x = _3d__3d_({infixl: local_793,infixr: 8.0});
                   switch (x.tag)
                   {
                     case "false":
                       var local_801 = x.data;
                       var x = _3d__3d_({infixl: local_793,infixr: 10.0});
                       switch (x.tag)
                       {
                         case "false":
                           var local_802 = x.data;
                           var x = _3d__3d_({infixl: local_793,infixr: 14.0});
                           switch (x.tag)
                           {
                             case "false":
                               var local_803 = x.data;
                               var x = _3d__3d_({infixl: local_793,infixr: 17.0});
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_804 = x.data;
                                   var x = _3d__3d_({infixl: local_793,infixr: 19.0});
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_805 = x.data;
                                       return {tag: "nothing",data: {}};
                                     case "true":
                                       var local_806 = x.data;
                                       return test({text: rts.bytesFromAscii("if-unmodified-since")
                                                   ,value: {tag: "ifUnmodifiedSince"
                                                           ,data: {}}});
                                     default:
                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                    ,"f8cf9e99c6ebab86468dac6f079e1d43");
                                   }
                                 case "true":
                                   var local_807 = x.data;
                                   var x = _3d__3d_({infixl: local_792
                                                    ,infixr: rts.bytesFromAscii("transfer-encoding")});
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_808 = x.data;
                                       var x = _3d__3d_({infixl: local_792
                                                        ,infixr: rts.bytesFromAscii("if-modified-since")});
                                       switch (x.tag)
                                       {
                                         case "false":
                                           var local_809 = x.data;
                                           return {tag: "nothing",data: {}};
                                         case "true":
                                           var local_810 = x.data;
                                           return {tag: "just"
                                                  ,data: requestHeaderIndex({tag: "ifModifiedSince"
                                                                            ,data: {}})};
                                         default:
                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                        ,"5c9b7e120cfcbfe66378a56aa55e1554");
                                       }
                                     case "true":
                                       var local_811 = x.data;
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
                               var local_812 = x.data;
                               return test({text: rts.bytesFromAscii("content-length")
                                           ,value: {tag: "contentLength",data: {}}});
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                            ,"316352807090bd4b8e1627c428b18ad0");
                           }
                         case "true":
                           var local_813 = x.data;
                           var x = _3d__3d_({infixl: local_792
                                            ,infixr: rts.bytesFromAscii("user-agent")});
                           switch (x.tag)
                           {
                             case "false":
                               var local_814 = x.data;
                               var x = _3d__3d_({infixl: local_792
                                                ,infixr: rts.bytesFromAscii("connection")});
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_815 = x.data;
                                   return {tag: "nothing",data: {}};
                                 case "true":
                                   var local_816 = x.data;
                                   return {tag: "just"
                                          ,data: requestHeaderIndex({tag: "connection"
                                                                    ,data: {}})};
                                 default:
                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                ,"0a18521fa15139803614889d5ac640f3");
                               }
                             case "true":
                               var local_817 = x.data;
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
                       var local_818 = x.data;
                       return test({text: rts.bytesFromAscii("if-range")
                                   ,value: {tag: "ifRange",data: {}}});
                     default:
                       throw rts.exceptions.LamduBug("Unhandled case"
                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                    ,"0c12468dbe34d1382d0b97b93b5cab94");
                   }
                 case "true":
                   var local_819 = x.data;
                   return test({text: rts.bytesFromAscii("referer")
                               ,value: {tag: "referer",data: {}}});
                 default:
                   throw rts.exceptions.LamduBug("Unhandled case"
                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                ,"13eb12f71c41a5c676528975f4cd2d8f");
               }
             case "true":
               var local_820 = x.data;
               return test({text: rts.bytesFromAscii("expect")
                           ,value: {tag: "expect",data: {}}});
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                            ,"a709b7964f58d9b479a336260545d465");
           }
         case "true":
           var local_821 = x.data;
           return test({text: rts.bytesFromAscii("range")
                       ,value: {tag: "range",data: {}}});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                        ,"1d20a17a150e74e964a7731e9e75cc90");
       }
     case "true":
       var local_822 = x.data;
       return test({text: rts.bytesFromAscii("host"),value: {tag: "host",data: {}}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                    ,"b082b30c0d03c8abd35416fd055c4e65");
   }
};
var parseHeaders = function (local_758) {
   var headersArr1 = runMutArray(_3b_({infixl: newMutArray
                                      ,infixr: function (headersArr) {
                                         return _3b_({infixl: sequence__(replicate({count: requestHeaderIndex({tag: "count"
                                                                                                              ,data: {}})
                                                                                   ,item: appendMutArray({object: headersArr
                                                                                                         ,value: {tag: "nothing"
                                                                                                                 ,data: {}}})}))
                                                     ,infixr: function (local_772) {
                                                        return _3b_({infixl: sequence__(map({stream: _2e__2e_({start: 1.0
                                                                                                              ,stop: length1(local_758)})
                                                                                            ,mapping: function (i1) {
                                                                                               var local_791 =
                                                                                               parseHeader(item1({index: i1
                                                                                                                 ,object: local_758}));
                                                                                               var mIdx =
                                                                                               requestHeaderIndexFromText(local_791.headerNameLower);
                                                                                               var x =
                                                                                               mIdx;
                                                                                               switch (x.tag)
                                                                                               {
                                                                                                 case "just":
                                                                                                   var index8 =
                                                                                                   x.data;
                                                                                                   return _3b_({infixl: readMutArray({index: index8
                                                                                                                                     ,object: headersArr})
                                                                                                               ,infixr: function (mVal) {
                                                                                                                  var x =
                                                                                                                  mVal;
                                                                                                                  switch (x.tag)
                                                                                                                  {
                                                                                                                    case "just":
                                                                                                                      var local_823 =
                                                                                                                      x.data;
                                                                                                                      throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                                                                                      ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                      ,"0ba4efe1ab9b937a5c4c329950c130eb");
                                                                                                                    case "nothing":
                                                                                                                      var local_824 =
                                                                                                                      x.data;
                                                                                                                      return writeMutArray({index: index8
                                                                                                                                           ,object: headersArr
                                                                                                                                           ,value: {tag: "just"
                                                                                                                                                   ,data: local_791.__data}});
                                                                                                                    default:
                                                                                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                   ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                   ,"46e58c07915691b0449b51e2c57e8c26");
                                                                                                                  }
                                                                                                               }});
                                                                                                 case "nothing":
                                                                                                   var local_825 =
                                                                                                   x.data;
                                                                                                   return __return({});
                                                                                                 default:
                                                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                ,"96d7c2e4942aa324705674b28c8d8892");
                                                                                               }
                                                                                            }}))
                                                                    ,infixr: function (local_826) {
                                                                       return __return(headersArr);
                                                                    }});
                                                     }});
                                      }}));
   var value1 = function (hdr) {
      return item1({index: requestHeaderIndex(hdr),object: headersArr1});
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
var parseHttpVersion = function (local_830) {
   var x = _26__26_({infixl: _3d__3d_({infixl: slice1({object: local_830
                                                      ,start: 0.0
                                                      ,stop: 5.0})
                                      ,infixr: rts.bytesFromAscii("HTTP/")})
                    ,infixr: function (local_831) {
                       return _26__26_({infixl: _3d__3d_({infixl: slice1({object: local_830
                                                                         ,start: 6.0
                                                                         ,stop: 7.0})
                                                         ,infixr: rts.bytesFromAscii(".")})
                                       ,infixr: function (local_832) {
                                          return _2265_({infixl: length(local_830)
                                                        ,infixr: 8.0});
                                       }});
                    }});
   switch (x.tag)
   {
     case "false":
       var local_833 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                       ,"d4d438d8b8c3035dd13c03c182e694f8");
     case "true":
       var local_834 = x.data;
       var majByte = byteAt({index: 5.0,object: local_830});
       var minByte = byteAt({index: 7.0,object: local_830});
       var x = _3d__3d_({infixl: majByte,infixr: 49.0});
       switch (x.tag)
       {
         case "false":
           var local_835 = x.data;
           var x = _26__26_({infixl: _3d__3d_({infixl: majByte,infixr: 50.0})
                            ,infixr: function (local_836) {
                               return _3d__3d_({infixl: minByte,infixr: 48.0});
                            }});
           switch (x.tag)
           {
             case "false":
               var local_837 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_838 = x.data;
               return {minor: 0.0,major: 2.0};
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                            ,"6d72ed51030c146e142824d8c5608502");
           }
         case "true":
           var local_839 = x.data;
           var x = _3d__3d_({infixl: minByte,infixr: 49.0});
           switch (x.tag)
           {
             case "false":
               var local_840 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_841 = x.data;
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
var parseHttpPathAndQuery = function (local_842) {
   var x = find1({start: 0.0,__bytes: local_842,byte: 63.0});
   switch (x.tag)
   {
     case "just":
       var queryStart = x.data;
       return {path: slice1({object: local_842,start: 0.0,stop: queryStart})
              ,query1: slice1({object: local_842
                              ,start: queryStart
                              ,stop: length(local_842)})};
     case "nothing":
       var local_843 = x.data;
       return {path: local_842,query1: rts.bytesFromAscii("")};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_e1ddf2e103fc4a77ba877761b12b0489"
                                    ,"7b5454e4261c24d201d9384e83ca385c");
   }
};
var parseRequestLine = function (local_827) {
   var parts4 = toArray(split({text: local_827,seperator: rts.bytesFromAscii(" ")}));
   var x = _3d__3d_({infixl: length1(parts4),infixr: 3.0});
   switch (x.tag)
   {
     case "false":
       var local_828 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                       ,"a7de8d96fb5e1479e6bb2a3ddb6eeaaa");
     case "true":
       var local_829 = x.data;
       var x = Object.assign({httpVersion: parseHttpVersion(item1({index: 2.0
                                                                  ,object: parts4}))
                             ,method: item1({index: 0.0,object: parts4})}
                            ,parseHttpPathAndQuery(item1({index: 1.0,object: parts4})));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                    ,"1a29dea7dd98168ceba76256560b374b");
   }
};
var unprefixed = function (local_850) {
   var x = isPrefixOf({whole: local_850.whole,prefix: local_850.prefix});
   switch (x.tag)
   {
     case "false":
       var local_851 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_852 = x.data;
       return {tag: "just"
              ,data: slice1({object: local_850.whole
                            ,start: length(local_850.prefix)
                            ,stop: length(local_850.whole)})};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_1d18b3f94ac64cc39b8dc131624a5e9f"
                                    ,"2de3ba5a8affabb154216378ec3580e6");
   }
};
var httpAddLocalPath = function (r) {
   var p = r.path;
   var nonEmpty1 = function (local_844) {
      var x = _3d__3d_({infixl: local_844,infixr: rts.bytesFromAscii("")});
      switch (x.tag)
      {
        case "false":
          var local_845 = x.data;
          return local_844;
        case "true":
          var local_846 = x.data;
          return rts.bytesFromAscii("/");
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_97b5de980c3149218877e33920fb5729"
                                       ,"5ae9e78cf85c5d6952c38eb479596553");
      }
   };
   var afterSlash = function (local_847) {
      return nonEmpty1(function () {
             var x = find1({start: 0.0,__bytes: local_847,byte: 47.0});
             switch (x.tag)
             {
               case "just":
                 var local_848 = x.data;
                 return slice1({object: local_847
                               ,start: local_848
                               ,stop: length(local_847)});
               case "nothing":
                 var local_849 = x.data;
                 return rts.bytesFromAscii("");
               default:
                 throw rts.exceptions.LamduBug("Unhandled case"
                                              ,"DEF_97b5de980c3149218877e33920fb5729"
                                              ,"8d9250a6123ff265d7652592a88c96a8");
             }
          }());
   };
   var x = Object.assign({localPath: function () {
                           var x = unprefixed({whole: p
                                              ,prefix: rts.bytesFromAscii("http://")});
                           switch (x.tag)
                           {
                             case "just":
                               return afterSlash(x.data);
                             case "nothing":
                               var local_853 = x.data;
                               var x = unprefixed({whole: p
                                                  ,prefix: rts.bytesFromAscii("https://")});
                               switch (x.tag)
                               {
                                 case "just":
                                   return afterSlash(x.data);
                                 case "nothing":
                                   var local_854 = x.data;
                                   return nonEmpty1(p);
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
                        ,r);
   delete x.cacheId;
   return x;
};
var httpContinueMessage = function (local_857) {
   return concat2(_3a__3a_({infixl: function () {
                              var x = _3d__3d_({infixl: local_857
                                               ,infixr: {minor: 1.0,major: 1.0}});
                              switch (x.tag)
                              {
                                case "false":
                                  var local_858 = x.data;
                                  return rts.bytesFromAscii("HTTP/1.0");
                                case "true":
                                  var local_859 = x.data;
                                  return rts.bytesFromAscii("HTTP/1.1");
                                default:
                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                               ,"DEF_28b20b49b76041158f817cb6f1ae7069"
                                                               ,"7a33dc1474f28318b0a1a21410017295");
                              }
                           }()
                           ,infixr: function (local_860) {
                              return _3a__3a_({infixl: rts.bytesFromAscii(" 100 Continue")
                                              ,infixr: function (local_861) {
                                                 return _3a__3a_({infixl: rts.bytes([13
                                                                                    ,10
                                                                                    ,13
                                                                                    ,10])
                                                                 ,infixr: function (local_862) {
                                                                    return {tag: "empty"
                                                                           ,data: {}};
                                                                 }});
                                              }});
                           }}));
};
var parseHttpRequestPacket = function (local_702) {
   var parseRemain = _3b_({infixl: popLastMutArray(local_702.unparsedPackets1)
                          ,infixr: function (local_706) {
                             var x = local_706;
                             switch (x.tag)
                             {
                               case "just":
                                 var local_707 = x.data;
                                 return parseHttpRequestPacket({socket: local_702.socket
                                                               ,unparsedPackets1: local_702.unparsedPackets1
                                                               ,newPacket: local_707
                                                               ,stateRef1: local_702.stateRef1
                                                               ,handler: local_702.handler});
                               case "nothing":
                                 var local_708 = x.data;
                                 return __return({});
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                              ,"a71ca59bb3302212a2d667ac7d89c4e8");
                             }
                          }});
   return _3b_({infixl: readMutRef(local_702.stateRef1)
               ,infixr: function (x709) {
                  switch (x709.tag)
                  {
                    case "body":
                      var local_710 = x709.data;
                      var plen = length(local_702.newPacket);
                      var x = _3c_({infixl: plen,infixr: local_710.remain});
                      switch (x.tag)
                      {
                        case "false":
                          var local_711 = x.data;
                          return _3b_({infixl: length4(local_702.unparsedPackets1)
                                      ,infixr: function (numPackets) {
                                         return _3b_({infixl: sequence(map({stream: _2e__2e_({start: 0.0
                                                                                             ,stop: numPackets})
                                                                           ,mapping: function (local_712) {
                                                                              return readMutArray({index: local_712
                                                                                                  ,object: local_702.unparsedPackets1});
                                                                           }}))
                                                     ,infixr: function (packets) {
                                                        return _3b_({infixl: _3b_({infixl: truncateMutArray({object: local_702.unparsedPackets1
                                                                                                            ,stop: 0.0})
                                                                                  ,infixr: function (local_713) {
                                                                                     return local_702.handler({request1: function () {
                                                                                                                 var x =
                                                                                                                 Object.assign({body: {tag: "just"
                                                                                                                                      ,data: concat2(_2b__2b_2({infixl: packets
                                                                                                                                                               ,infixr: function (local_714) {
                                                                                                                                                                  return _3a__3a_({infixl: slice1({object: local_702.newPacket
                                                                                                                                                                                                  ,start: 0.0
                                                                                                                                                                                                  ,stop: local_710.remain})
                                                                                                                                                                                  ,infixr: function (local_715) {
                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                  }});
                                                                                                                                                               }}))}}
                                                                                                                              ,local_710.request1);
                                                                                                                 delete x.cacheId;
                                                                                                                 return x;
                                                                                                              }()
                                                                                                              ,socket: local_702.socket});
                                                                                  }})
                                                                    ,infixr: function (local_716) {
                                                                       return _3b_({infixl: writeMutRef({object: local_702.stateRef1
                                                                                                        ,value: {tag: "header"
                                                                                                                ,data: {}}})
                                                                                   ,infixr: function (local_717) {
                                                                                      var x =
                                                                                      _3c_({infixl: local_710.remain
                                                                                           ,infixr: plen});
                                                                                      switch (x.tag)
                                                                                      {
                                                                                        case "false":
                                                                                          var local_718 =
                                                                                          x.data;
                                                                                          return __return({});
                                                                                        case "true":
                                                                                          var local_719 =
                                                                                          x.data;
                                                                                          return parseHttpRequestPacket({socket: local_702.socket
                                                                                                                        ,unparsedPackets1: local_702.unparsedPackets1
                                                                                                                        ,newPacket: slice1({object: local_702.newPacket
                                                                                                                                           ,start: local_710.remain
                                                                                                                                           ,stop: plen})
                                                                                                                        ,stateRef1: local_702.stateRef1
                                                                                                                        ,handler: local_702.handler});
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
                          var local_720 = x.data;
                          return _3b_({infixl: appendMutArray({object: local_702.unparsedPackets1
                                                              ,value: local_702.newPacket})
                                      ,infixr: function (local_721) {
                                         return writeMutRef({object: local_702.stateRef1
                                                            ,value: {tag: "body"
                                                                    ,data: {request1: local_710.request1
                                                                           ,remain: _2d_({infixl: local_710.remain
                                                                                         ,infixr: plen})}}});
                                      }});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                       ,"4a7857b1e6dc15eee111f928eef30ceb");
                      }
                    case "header":
                      var local_722 = x709.data;
                      return _3b_({infixl: parseHttpHeaderPacket({start: 0.0
                                                                 ,newPacket: local_702.newPacket
                                                                 ,packets1: local_702.unparsedPackets1})
                                  ,infixr: function (local_757) {
                                     var x = local_757;
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var headerLines1 = x.data;
                                         var request2 = function () {
                                                           var x =
                                                           Object.assign({headers: parseHeaders(headerLines1)}
                                                                        ,httpAddLocalPath(parseRequestLine(item1({index: 0.0
                                                                                                                 ,object: headerLines1}))));
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
                                                            var local_855 = x.data;
                                                            return __return({});
                                                          case "true":
                                                            var local_856 = x.data;
                                                            return send({__data: httpContinueMessage(request2.httpVersion)
                                                                        ,socket: local_702.socket});
                                                          default:
                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                         ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                         ,"0010e59778d59572282a2dab5b43c99f");
                                                        }
                                                     }()
                                                     ,infixr: function (local_863) {
                                                        return _3b_({infixl: function () {
                                                                       var x =
                                                                       request2.headers.contentLength;
                                                                       switch (x.tag)
                                                                       {
                                                                         case "just":
                                                                           var lenText =
                                                                           x.data;
                                                                           return writeMutRef({object: local_702.stateRef1
                                                                                              ,value: {tag: "body"
                                                                                                      ,data: {request1: request2
                                                                                                             ,remain: parseInt(lenText)}}});
                                                                         case "nothing":
                                                                           var local_864 =
                                                                           x.data;
                                                                           return local_702.handler({request1: function () {
                                                                                                       var x =
                                                                                                       Object.assign({body: {tag: "nothing"
                                                                                                                            ,data: {}}}
                                                                                                                    ,request2);
                                                                                                       delete x.cacheId;
                                                                                                       return x;
                                                                                                    }()
                                                                                                    ,socket: local_702.socket});
                                                                         default:
                                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                        ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                        ,"c91c5cea0890a94419165f2c0e413659");
                                                                       }
                                                                    }()
                                                                    ,infixr: function (local_865) {
                                                                       return parseRemain;
                                                                    }});
                                                     }});
                                       case "nothing":
                                         var local_866 = x.data;
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
var parseHttpRequests = function (local_701) {
   return _3b_({infixl: newMutRef({tag: "header",data: {}})
               ,infixr: function (stateRef) {
                  return _3b_({infixl: newMutArray
                              ,infixr: function (unparsedPackets) {
                                 return __return(function (packet) {
                                        return parseHttpRequestPacket({socket: local_701.socket
                                                                      ,unparsedPackets1: unparsedPackets
                                                                      ,newPacket: packet
                                                                      ,stateRef1: stateRef
                                                                      ,handler: local_701.handler});
                                     });
                              }});
               }});
};
var openTcpServer = rts.builtins.IO.network["openTcpServer"];
var httpServer = function (local_691) {
   return openTcpServer({connectionHandler: function (socket) {
                           return parseHttpRequests({socket: socket
                                                    ,handler: function (local_692) {
                                                       return _3b_({infixl: local_691.handler(local_692.request1)
                                                                   ,infixr: function (response) {
                                                                      return send({__data: _2b__2b_1({a: join({texts: _3a__3a_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("HTTP/1.1")
                                                                                                                                                              ,infixr: function (local_693) {
                                                                                                                                                                 return _3a__3a_({infixl: showNum(response.status.code)
                                                                                                                                                                                 ,infixr: function (local_694) {
                                                                                                                                                                                    return _3a__3a_({infixl: response.status.message
                                                                                                                                                                                                    ,infixr: function (local_695) {
                                                                                                                                                                                                       return {tag: "empty"
                                                                                                                                                                                                              ,data: {}};
                                                                                                                                                                                                    }});
                                                                                                                                                                                 }});
                                                                                                                                                              }})
                                                                                                                                             ,seperator: rts.bytesFromAscii(" ")})
                                                                                                                               ,infixr: function (local_696) {
                                                                                                                                  return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Type: ")
                                                                                                                                                                    ,b: response.content.mimeType})
                                                                                                                                                  ,infixr: function (local_697) {
                                                                                                                                                     return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Length: ")
                                                                                                                                                                                       ,b: showNum(length(response.content.__data))})
                                                                                                                                                                     ,infixr: function (local_698) {
                                                                                                                                                                        return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                        ,infixr: function (local_699) {
                                                                                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                                           ,infixr: function (local_700) {
                                                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                                                           }});
                                                                                                                                                                                        }});
                                                                                                                                                                     }});
                                                                                                                                                  }});
                                                                                                                               }})
                                                                                                              ,seperator: rts.bytesFromAscii("\r\n")})
                                                                                                     ,b: response.content.__data})
                                                                                  ,socket: socket});
                                                                   }});
                                                    }});
                        }
                        ,exclusive: {tag: "false",data: {}}
                        ,host: local_691.host
                        ,port: local_691.port});
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
                                                               var local_65 = x.data;
                                                               return parseInt(local_65);
                                                             case "nothing":
                                                               var local_66 = x.data;
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
