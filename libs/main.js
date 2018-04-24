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
var _2b__2b_2 = function (local_87) {
   return foldLazy({stream: local_87.infixl
                   ,initial: local_87.infixr
                   ,binop: function (local_88) {
                      return {tag: "nonEmpty"
                             ,data: {head: local_88.item,tail: local_88.rest}};
                   }});
};
var toBytes = rts.builtins.Bytes["fromArray"];
var _2b__2b_1 = function (local_85) {
   return toBytes(toArray(_2b__2b_2({infixl: fromBytes(local_85.a)
                                    ,infixr: function (local_86) {
                                       return fromBytes(local_85.b);
                                    }})));
};
var _2b__2b_ = function (local_84) { return _2b__2b_1({a: local_84.a,b: local_84.b});};
var httpNotFound404 = function (local_83) {
   return {content: {__data: _2b__2b_({a: rts.bytesFromAscii("Not found: "),b: local_83})
                    ,mimeType: rts.bytesFromAscii("text/plain")}
          ,status: {message: rts.bytesFromAscii("Not Found"),code: 404.0}};
};
var _2f__2f_ = rts.builtins.Prelude["div"];
var _2260_ = rts.builtins.Prelude["/="];
var _25_ = rts.builtins.Prelude["mod"];
var digitsLittleEndian = function (local_94) {
   return map({stream: take({stream: iterate({initial: local_94.__number
                                             ,next: function (local_95) {
                                                return _2f__2f_({infixl: local_95
                                                                ,infixr: local_94.base});
                                             }})
                            ,__while: function (local_96) {
                               return _2260_({infixl: local_96,infixr: 0.0});
                            }})
              ,mapping: function (local_97) {
                 return _25_({infixl: local_97,infixr: local_94.base});
              }});
};
var reverse = function (stream3) {
   return fold({stream: stream3
               ,initial: {tag: "empty",data: {}}
               ,binop: function (local_98) {
                  return {tag: "nonEmpty"
                         ,data: {head: local_98.item
                                ,tail: function (local_99) {
                                   return local_98.acc;
                                }}};
               }});
};
var showNum = function (local_92) {
   var x = _3d__3d_({infixl: local_92,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_93 = x.data;
       return toBytes(toArray(map({stream: reverse(digitsLittleEndian({__number: local_92
                                                                      ,base: 10.0}))
                                  ,mapping: function (local_100) {
                                     return _2b_({infixl: 48.0,infixr: local_100});
                                  }})));
     case "true":
       var local_101 = x.data;
       return rts.bytesFromAscii("0");
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8dc07f8cc25f46b2bd345789b6a59f4d"
                                    ,"39f9fdd2b9889a256be50861539f39e5");
   }
};
var concat = function (stream4) {
   return foldLazy({stream: stream4
                   ,initial: function (local_117) {
                      return {tag: "empty",data: {}};
                   }
                   ,binop: function (local_118) {
                      return _2b__2b_2({infixl: local_118.item,infixr: local_118.rest});
                   }});
};
var intersperse = function (local_111) {
   var x = local_111.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_112 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_112.head
                     ,tail: function (local_113) {
                        return concat(map({stream: local_112.tail({})
                                          ,mapping: function (local_114) {
                                             return {tag: "nonEmpty"
                                                    ,data: {head: local_111.item
                                                           ,tail: function (local_115) {
                                                              return {tag: "nonEmpty"
                                                                     ,data: {head: local_114
                                                                            ,tail: function (local_116) {
                                                                               return {tag: "empty"
                                                                                      ,data: {}};
                                                                            }}};
                                                           }}};
                                          }}));
                     }}};
     case "empty":
       var local_119 = x.data;
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
var join = function (local_110) {
   return concat1(intersperse({stream: local_110.texts,item: local_110.seperator}));
};
var id2 = function (__x) { return __x;};
var maybe = function (local_136) {
   var x = local_136.object;
   switch (x.tag)
   {
     case "just":
       return id2(x.data);
     case "nothing":
       var local_137 = x.data;
       return local_136.or;
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
       var local_129 = x.data;
       return function (local_130) {
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: local_130.table
                                                        ,b: rts.bytesFromAscii(".")})
                                           ,b: local_130.field})
                              ,b: function () {
                                 var x = local_130.as;
                                 switch (x.tag)
                                 {
                                   case "just":
                                     var local_131 = x.data;
                                     return _2b__2b_({a: rts.bytesFromAscii(" AS ")
                                                     ,b: local_131});
                                   case "nothing":
                                     var local_132 = x.data;
                                     return rts.bytesFromAscii("");
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                                                  ,"601b6d53f526392df53d629ee0c2ad71");
                                 }
                              }()});
           };
     case "hebrew":
       var local_133 = x.data;
       return function (local_134) {
              var local_135 = _2b__2b_({a: _2b__2b_({a: local_134.table
                                                    ,b: rts.bytesFromAscii(".")})
                                       ,b: local_134.field});
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("COALESCE(NULLIF(")
                                                                                  ,b: local_135})
                                                                     ,b: rts.bytesFromAscii("_hebrew, \'\'), ")})
                                                        ,b: local_135})
                                           ,b: rts.bytesFromAscii(") AS ")})
                              ,b: maybe({object: local_134.as,or: local_134.field})});
           };
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                    ,"77f1ffdc76bae5c4dbaf326aa2ff70a2");
   }
};
var pestovalQuerySessionsSql = function (local_122) {
   return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id,\n  pestoval_timeslot.start, pestoval_timeslot.stop,\n  pestoval_location.id AS location_id,\n  pestoval_level.color,")
                                ,infixr: function (local_123) {
                                   return _3a__3a_({infixl: join({texts: map({stream: _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                        ,field: rts.bytesFromAscii("name")
                                                                                                        ,as: {tag: "just"
                                                                                                             ,data: rts.bytesFromAscii("session_name")}}
                                                                                               ,infixr: function (local_124) {
                                                                                                  return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                           ,field: rts.bytesFromAscii("description")
                                                                                                                           ,as: {tag: "nothing"
                                                                                                                                ,data: {}}}
                                                                                                                  ,infixr: function (local_125) {
                                                                                                                     return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                                              ,field: rts.bytesFromAscii("prereqs")
                                                                                                                                              ,as: {tag: "nothing"
                                                                                                                                                   ,data: {}}}
                                                                                                                                     ,infixr: function (local_126) {
                                                                                                                                        return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_location")
                                                                                                                                                                 ,field: rts.bytesFromAscii("name")
                                                                                                                                                                 ,as: {tag: "just"
                                                                                                                                                                      ,data: rts.bytesFromAscii("location_name")}}
                                                                                                                                                        ,infixr: function (local_127) {
                                                                                                                                                           return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_level")
                                                                                                                                                                                    ,field: rts.bytesFromAscii("name")
                                                                                                                                                                                    ,as: {tag: "just"
                                                                                                                                                                                         ,data: rts.bytesFromAscii("level_name")}}
                                                                                                                                                                           ,infixr: function (local_128) {
                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                           }});
                                                                                                                                                        }});
                                                                                                                                     }});
                                                                                                                  }});
                                                                                               }})
                                                                             ,mapping: queryFieldLang(local_122.language2)})
                                                                 ,seperator: rts.bytesFromAscii(", ")})
                                                   ,infixr: function (local_138) {
                                                      return _3a__3a_({infixl: local_122.from
                                                                      ,infixr: function (local_139) {
                                                                         return _2b__2b_2({infixl: map({stream: _3a__3a_({infixl: {key: rts.bytesFromAscii("when_id")
                                                                                                                                  ,table: rts.bytesFromAscii("pestoval_timeslot")}
                                                                                                                         ,infixr: function (local_140) {
                                                                                                                            return _3a__3a_({infixl: {key: rts.bytesFromAscii("location_id")
                                                                                                                                                     ,table: rts.bytesFromAscii("pestoval_location")}
                                                                                                                                            ,infixr: function (local_141) {
                                                                                                                                               return _3a__3a_({infixl: {key: rts.bytesFromAscii("level_id")
                                                                                                                                                                        ,table: rts.bytesFromAscii("pestoval_level")}
                                                                                                                                                               ,infixr: function (local_142) {
                                                                                                                                                                  return {tag: "empty"
                                                                                                                                                                         ,data: {}};
                                                                                                                                                               }});
                                                                                                                                            }});
                                                                                                                         }})
                                                                                                       ,mapping: function (local_143) {
                                                                                                          return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("LEFT OUTER JOIN ")
                                                                                                                                       ,infixr: function (local_144) {
                                                                                                                                          return _3a__3a_({infixl: local_143.table
                                                                                                                                                          ,infixr: function (local_145) {
                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(" ON pestoval_session.")
                                                                                                                                                                             ,infixr: function (local_146) {
                                                                                                                                                                                return _3a__3a_({infixl: local_143.key
                                                                                                                                                                                                ,infixr: function (local_147) {
                                                                                                                                                                                                   return _3a__3a_({infixl: rts.bytesFromAscii(" = ")
                                                                                                                                                                                                                   ,infixr: function (local_148) {
                                                                                                                                                                                                                      return _3a__3a_({infixl: local_143.table
                                                                                                                                                                                                                                      ,infixr: function (local_149) {
                                                                                                                                                                                                                                         return _3a__3a_({infixl: rts.bytesFromAscii(".id")
                                                                                                                                                                                                                                                         ,infixr: function (local_150) {
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
                                                                                          ,infixr: function (local_151) {
                                                                                             return _2b__2b_2({infixl: function () {
                                                                                                                 var x =
                                                                                                                 _3d__3d_({infixl: local_122.where
                                                                                                                          ,infixr: rts.bytesFromAscii("")});
                                                                                                                 switch (x.tag)
                                                                                                                 {
                                                                                                                   case "false":
                                                                                                                     var local_152 =
                                                                                                                     x.data;
                                                                                                                     return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("WHERE ")
                                                                                                                                                       ,b: local_122.where})
                                                                                                                                     ,infixr: function (local_153) {
                                                                                                                                        return {tag: "empty"
                                                                                                                                               ,data: {}};
                                                                                                                                     }});
                                                                                                                   case "true":
                                                                                                                     var local_154 =
                                                                                                                     x.data;
                                                                                                                     return {tag: "empty"
                                                                                                                            ,data: {}};
                                                                                                                   default:
                                                                                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                  ,"DEF_140efbae773e4fea9f554e346c7b58e8"
                                                                                                                                                  ,"f573ad31abd803e9dda9e82ec3ef4df2");
                                                                                                                 }
                                                                                                              }()
                                                                                                              ,infixr: function (local_155) {
                                                                                                                 return _3a__3a_({infixl: rts.bytesFromAscii("ORDER BY pestoval_timeslot.start, pestoval_location.id")
                                                                                                                                 ,infixr: function (local_156) {
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
var query = rts.builtins.IO.database.postgres["query"];
var newMutArray1 = function (stream7) {
   return _3b_({infixl: newMutArray
               ,infixr: function (__array2) {
                  return _3b_({infixl: sequence__(map({stream: stream7
                                                      ,mapping: function (item2) {
                                                         return appendMutArray({object: __array2
                                                                               ,value: item2});
                                                      }}))
                              ,infixr: function (local_166) {
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
var sort1 = function (local_168) {
   var x = _2265_({infixl: _2b_({infixl: local_168.start,infixr: 1.0})
                  ,infixr: local_168.stop});
   switch (x.tag)
   {
     case "false":
       var local_169 = x.data;
       return _3b_({infixl: readMutArray({index: local_168.start
                                         ,object: local_168.__array4})
                   ,infixr: function (pivot) {
                      return _3b_({infixl: newMutRef(local_168.start)
                                  ,infixr: function (pivotPosRef) {
                                     return _3b_({infixl: sequence__(map({stream: _2e__2e_({start: _2b_({infixl: local_168.start
                                                                                                        ,infixr: 1.0})
                                                                                           ,stop: local_168.stop})
                                                                         ,mapping: function (index1) {
                                                                            return _3b_({infixl: readMutArray({index: index1
                                                                                                              ,object: local_168.__array4})
                                                                                        ,infixr: function (object1) {
                                                                                           var x =
                                                                                           local_168._3c_1({infixl: object1
                                                                                                           ,infixr: pivot});
                                                                                           switch (x.tag)
                                                                                           {
                                                                                             case "false":
                                                                                               var local_170 =
                                                                                               x.data;
                                                                                               return __return({});
                                                                                             case "true":
                                                                                               var local_171 =
                                                                                               x.data;
                                                                                               return _3b_({infixl: readMutRef(pivotPosRef)
                                                                                                           ,infixr: function (pivotPos) {
                                                                                                              return _3b_({infixl: writeMutArray({index: pivotPos
                                                                                                                                                 ,object: local_168.__array4
                                                                                                                                                 ,value: object1})
                                                                                                                          ,infixr: function (local_172) {
                                                                                                                             var newPivotPos =
                                                                                                                             _2b_({infixl: pivotPos
                                                                                                                                  ,infixr: 1.0});
                                                                                                                             return _3b_({infixl: writeMutRef({object: pivotPosRef
                                                                                                                                                              ,value: newPivotPos})
                                                                                                                                         ,infixr: function (local_173) {
                                                                                                                                            return _3b_({infixl: readMutArray({index: newPivotPos
                                                                                                                                                                              ,object: local_168.__array4})
                                                                                                                                                        ,infixr: function (local_174) {
                                                                                                                                                           return writeMutArray({index: index1
                                                                                                                                                                                ,object: local_168.__array4
                                                                                                                                                                                ,value: local_174});
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
                                                 ,infixr: function (local_175) {
                                                    return _3b_({infixl: readMutRef(pivotPosRef)
                                                                ,infixr: function (index2) {
                                                                   return _3b_({infixl: writeMutArray({index: index2
                                                                                                      ,object: local_168.__array4
                                                                                                      ,value: pivot})
                                                                               ,infixr: function (local_176) {
                                                                                  return _3b_({infixl: sort1({start: local_168.start
                                                                                                             ,stop: index2
                                                                                                             ,_3c_1: local_168._3c_1
                                                                                                             ,__array4: local_168.__array4})
                                                                                              ,infixr: function (local_177) {
                                                                                                 return sort1({start: _2b_({infixl: index2
                                                                                                                           ,infixr: 1.0})
                                                                                                              ,stop: local_168.stop
                                                                                                              ,_3c_1: local_168._3c_1
                                                                                                              ,__array4: local_168.__array4});
                                                                                              }});
                                                                               }});
                                                                }});
                                                 }});
                                  }});
                   }});
     case "true":
       var local_178 = x.data;
       return __return({});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_7dc48073b9e642f0921b10b11676f38b"
                                    ,"767c3133b4f8a61071c98bc4f445f9a6");
   }
};
var sort = function (local_165) {
   return runMutArray(_3b_({infixl: newMutArray1(local_165.stream)
                           ,infixr: function (__array3) {
                              return _3b_({infixl: length4(__array3)
                                          ,infixr: function (local_167) {
                                             return _3b_({infixl: sort1({start: 0.0
                                                                        ,stop: local_167
                                                                        ,_3c_1: local_165._3c_1
                                                                        ,__array4: __array3})
                                                         ,infixr: function (local_179) {
                                                            return __return(__array3);
                                                         }});
                                          }});
                           }}));
};
var foldLazy1 = function (local_195) {
   return foldLazy({stream: local_195.stream
                   ,initial: function (local_196) {
                      return local_195.done;
                   }
                   ,binop: function (local_197) {
                      return function (state1) {
                             return local_195.step({state: state1
                                                   ,rest: local_197.rest
                                                   ,item: local_197.item});
                          };
                   }})(local_195.initialState);
};
var group = function (local_181) {
   return foldLazy1({stream: local_181.stream
                    ,initialState: {tag: "empty",data: {}}
                    ,step: function (local_182) {
                       var x = local_182.state;
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_183 = x.data;
                           var x = local_181.by({infixl: local_183.head
                                                ,infixr: local_182.item});
                           switch (x.tag)
                           {
                             case "false":
                               var local_184 = x.data;
                               return _3a__3a_({infixl: toArray(reverse(local_182.state))
                                               ,infixr: function (local_185) {
                                                  return local_182.rest({})(_3a__3a_({infixl: local_182.item
                                                                                     ,infixr: function (local_186) {
                                                                                        return {tag: "empty"
                                                                                               ,data: {}};
                                                                                     }}));
                                               }});
                             case "true":
                               var local_187 = x.data;
                               return local_182.rest({})(_3a__3a_({infixl: local_182.item
                                                                  ,infixr: function (local_188) {
                                                                     return local_182.state;
                                                                  }}));
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                            ,"80c64c4a3e825d563e72c3ff848be12a");
                           }
                         case "empty":
                           var local_189 = x.data;
                           return local_182.rest({})(_3a__3a_({infixl: local_182.item
                                                              ,infixr: function (local_190) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }}));
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                        ,"74a01a012e28a30393aafbb0e69c22f4");
                       }
                    }
                    ,done: function (local_191) {
                       var x = local_191;
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_192 = x.data;
                           return _3a__3a_({infixl: toArray(reverse(local_191))
                                           ,infixr: function (local_193) {
                                              return {tag: "empty",data: {}};
                                           }});
                         case "empty":
                           var local_194 = x.data;
                           return {tag: "empty",data: {}};
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                        ,"44a912bc33ec9c258e1ba58d8731bdd8");
                       }
                    }});
};
var pestovalQuerySessionTeachers = function (local_160) {
   return _3b_({infixl: query({database: local_160.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_session_teachers.teacher_id, pestoval_session_teachers.session_id,\n  ")
                                                             ,b: queryFieldLang(local_160.language2)({table: rts.bytesFromAscii("pestoval_teacher")
                                                                                                     ,field: rts.bytesFromAscii("name")
                                                                                                     ,as: {tag: "nothing"
                                                                                                          ,data: {}}})})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_teacher ON pestoval_session_teachers.teacher_id = pestoval_teacher.id")})})
               ,infixr: function (x161) {
                  switch (x161.tag)
                  {
                    case "error":
                      var local_162 = x161.data;
                      return ignoreError(local_162);
                    case "success":
                      var local_163 = x161.data;
                      return __return(toArray(map({stream: group({stream: fromArray(sort({stream: map({stream: fromArray(local_163.__data)
                                                                                                      ,mapping: function (row) {
                                                                                                         return {teacher: {name: item1({index: 2.0
                                                                                                                                       ,object: row})
                                                                                                                          ,id1: parseInt(item1({index: 0.0
                                                                                                                                               ,object: row}))}
                                                                                                                ,session: parseInt(item1({index: 1.0
                                                                                                                                         ,object: row}))};
                                                                                                      }})
                                                                                         ,_3c_1: function (local_164) {
                                                                                            return _3c_({infixl: local_164.infixl.session
                                                                                                        ,infixr: local_164.infixr.session});
                                                                                         }}))
                                                                 ,by: function (local_180) {
                                                                    return _3d__3d_({infixl: local_180.infixl.session
                                                                                    ,infixr: local_180.infixr.session});
                                                                 }})
                                                  ,mapping: function (local_198) {
                                                     return {value: toArray(map({stream: fromArray(local_198)
                                                                                ,mapping: function (local_199) {
                                                                                   return local_199.teacher;
                                                                                }}))
                                                            ,key: item1({index: 0.0
                                                                        ,object: local_198}).session};
                                                  }})));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_de80144d74df47438852d18bad3b3eaf"
                                                   ,"9800f3fc1326d8ea5b4af24b15b823d4");
                  }
               }});
};
var unwords = function (words) {
   return join({texts: words,seperator: rts.bytesFromAscii(" ")});
};
var dayNames = toArray(split({text: rts.bytesFromAscii("Mon Tue Wed Thu Fri Sat Sun")
                             ,seperator: rts.bytesFromAscii(" ")}));
var index4 = function (local_207) {
   var x = first({that: function (index5) {
                    return _3d__3d_({infixl: item1({index: index5
                                                   ,object: local_207.__array4})
                                    ,infixr: local_207.item});
                 }
                 ,stream: _2e__2e_({start: 0.0,stop: length1(local_207.__array4)})});
   switch (x.tag)
   {
     case "just":
       return id2(x.data);
     case "nothing":
       var local_208 = x.data;
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
   var parts2 = toArray(split({text: text1,seperator: rts.bytesFromAscii(" ")}));
   var item4 = function (local_203) { return item1({index: local_203,object: parts2});};
   var timeText = toArray(split({text: item4(4.0),seperator: rts.bytesFromAscii(":")}));
   var timeItem = function (local_204) {
      return parseInt(item1({index: local_204,object: timeText}));
   };
   return {time: {timezone: unwords(_3a__3a_({infixl: item4(5.0)
                                             ,infixr: function (local_205) {
                                                return _3a__3a_({infixl: item4(6.0)
                                                                ,infixr: function (local_206) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }}))
                 ,minute: timeItem(1.0)
                 ,second: timeItem(2.0)
                 ,hour: timeItem(0.0)}
          ,date: {weekDay: _2b_({infixl: index4({__array4: dayNames,item: item4(0.0)})
                                ,infixr: 1.0})
                 ,month: _2b_({infixl: index4({__array4: monthNames,item: item4(1.0)})
                              ,infixr: 1.0})
                 ,day: parseInt(item4(2.0))
                 ,year: parseInt(item4(3.0))}};
};
var _3e__3d__3c_ = function (local_211) {
   var x = _3d__3d_({infixl: local_211.__x1,infixr: local_211.y});
   switch (x.tag)
   {
     case "false":
       var local_212 = x.data;
       var x = _3c_({infixl: local_211.__x1,infixr: local_211.y});
       switch (x.tag)
       {
         case "false":
           var local_213 = x.data;
           return {tag: "_3e_1",data: {}};
         case "true":
           var local_214 = x.data;
           return {tag: "_3c_1",data: {}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_710304e7117b480ba76d20139b3980c1"
                                        ,"b36d82ac26521ea940b13add4c373a2c");
       }
     case "true":
       var local_215 = x.data;
       return {tag: "_3d__3d_1",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_710304e7117b480ba76d20139b3980c1"
                                    ,"508e7c4e652cf07b779c96cd2344172c");
   }
};
var _2f_ = rts.builtins.Prelude["/"];
var floor = function (local_219) {
   return _2d_({infixl: local_219,infixr: _25_({infixl: local_219,infixr: 1.0})});
};
var search1 = function (local_217) {
   var x = _2265_({infixl: local_217.start,infixr: local_217.stop});
   switch (x.tag)
   {
     case "false":
       var local_218 = x.data;
       var pivot1 = floor(_2f_({infixl: _2b_({infixl: local_217.start
                                             ,infixr: local_217.stop})
                               ,infixr: 2.0}));
       var x = local_217.compareTo(pivot1);
       switch (x.tag)
       {
         case "_3e_1":
           var local_220 = x.data;
           return search1({start: _2b_({infixl: pivot1,infixr: 1.0})
                          ,stop: local_217.stop
                          ,compareTo: local_217.compareTo});
         case "_3c_1":
           var local_221 = x.data;
           return search1({start: local_217.start
                          ,stop: pivot1
                          ,compareTo: local_217.compareTo});
         case "_3d__3d_1":
           var local_222 = x.data;
           return {tag: "just",data: pivot1};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                        ,"c6c8b9c428c0b8b42ffc038b0554d06b");
       }
     case "true":
       var local_223 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                    ,"c22774ac01ba95da7d4aa96a5694962d");
   }
};
var search = function (local_216) {
   return search1({start: 0.0
                  ,stop: length1(local_216.sorted)
                  ,compareTo: function (index6) {
                     return local_216.compareTo(item1({index: index6
                                                      ,object: local_216.sorted}));
                  }});
};
var lookup = function (local_209) {
   var x = search({compareTo: function (local_210) {
                     return _3e__3d__3c_({y: local_210.key,__x1: local_209.key});
                  }
                  ,sorted: local_209.sorted});
   switch (x.tag)
   {
     case "just":
       var index7 = x.data;
       return {tag: "just",data: item1({index: index7,object: local_209.sorted}).value};
     case "nothing":
       var local_224 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a4e4077b0c07428e86abf1bac4a10b4f"
                                    ,"037df5e76b157671e777748996e8ff72");
   }
};
var pestovalQuerySessions = function (local_102) {
   var teacherQuery = function () {
                         var x = local_102.teacher;
                         switch (x.tag)
                         {
                           case "just":
                             var local_103 = x.data;
                             return {where: _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("pestoval_session_teachers.teacher_id = ")
                                                                       ,b: showNum(local_103)})
                                                     ,infixr: function (local_104) {
                                                        return {tag: "empty",data: {}};
                                                     }})
                                    ,from: rts.bytesFromAscii("FROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_session ON pestoval_session_teachers.session_id = pestoval_session.id")};
                           case "nothing":
                             var local_105 = x.data;
                             return {where: {tag: "empty",data: {}}
                                    ,from: rts.bytesFromAscii("FROM pestoval_session")};
                           default:
                             throw rts.exceptions.LamduBug("Unhandled case"
                                                          ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                          ,"c83b0d9e623697d989e5a09fb1c59c4f");
                         }
                      }();
   return _3b_({infixl: query({database: local_102.database
                              ,object: pestovalQuerySessionsSql({where: join({texts: _2b__2b_2({infixl: teacherQuery.where
                                                                                               ,infixr: function (local_106) {
                                                                                                  var x =
                                                                                                  local_102.filter1;
                                                                                                  switch (x.tag)
                                                                                                  {
                                                                                                    case "just":
                                                                                                      var local_107 =
                                                                                                      x.data;
                                                                                                      return _3a__3a_({infixl: local_107
                                                                                                                      ,infixr: function (local_108) {
                                                                                                                         return {tag: "empty"
                                                                                                                                ,data: {}};
                                                                                                                      }});
                                                                                                    case "nothing":
                                                                                                      var local_109 =
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
                                                                ,language2: local_102.language2})})
               ,infixr: function (x157) {
                  switch (x157.tag)
                  {
                    case "error":
                      var local_158 = x157.data;
                      return ignoreError(local_158);
                    case "success":
                      var local_159 = x157.data;
                      return _3b_({infixl: pestovalQuerySessionTeachers({database: local_102.database
                                                                        ,language2: local_102.language2})
                                  ,infixr: function (teachers) {
                                     var field1 = function (local_200) {
                                        var x = first({that: function (index3) {
                                                         return _3d__3d_({infixl: item1({index: index3
                                                                                        ,object: local_159.fields})
                                                                         ,infixr: local_200});
                                                      }
                                                      ,stream: _2e__2e_({start: 0.0
                                                                        ,stop: length1(local_159.fields)})});
                                        switch (x.tag)
                                        {
                                          case "just":
                                            return id2(x.data);
                                          case "nothing":
                                            var local_201 = x.data;
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
                                     var start1 = field1(rts.bytesFromAscii("start"));
                                     var stop1 = field1(rts.bytesFromAscii("stop"));
                                     var name1 =
                                     field1(rts.bytesFromAscii("session_name"));
                                     var level =
                                     {name: field1(rts.bytesFromAscii("level_name"))
                                     ,color: field1(rts.bytesFromAscii("color"))};
                                     var place =
                                     {name: field1(rts.bytesFromAscii("location_name"))
                                     ,id1: field1(rts.bytesFromAscii("location_id"))};
                                     var description =
                                     field1(rts.bytesFromAscii("description"));
                                     var prereqs = field1(rts.bytesFromAscii("prereqs"));
                                     return __return(toArray(map({stream: fromArray(local_159.__data)
                                                                 ,mapping: function (row1) {
                                                                    var item3 =
                                                                    function (local_202) {
                                                                       return item1({index: local_202
                                                                                    ,object: row1});
                                                                    };
                                                                    var id3 =
                                                                    parseInt(item3(session1));
                                                                    return {prereqs1: item3(prereqs)
                                                                           ,name: item3(name1)
                                                                           ,start: parseDateTime(item3(start1))
                                                                           ,stop: parseDateTime(item3(stop1))
                                                                           ,place1: {name: item3(place.name)
                                                                                    ,id1: item3(place.id1)}
                                                                           ,description1: item3(description)
                                                                           ,teachers1: function () {
                                                                              var x =
                                                                              lookup({key: id3
                                                                                     ,sorted: teachers});
                                                                              switch (x.tag)
                                                                              {
                                                                                case "just":
                                                                                  return id2(x.data);
                                                                                case "nothing":
                                                                                  var local_225 =
                                                                                  x.data;
                                                                                  return [];
                                                                                default:
                                                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                               ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                                                               ,"4727001e8f10c93cea88012dc24e67a0");
                                                                              }
                                                                           }()
                                                                           ,id1: id3
                                                                           ,level1: {name: item3(level.name)
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
var getSession = function (local_91) {
   var filter = {tag: "just"
                ,data: _2b__2b_({a: rts.bytesFromAscii("pestoval_session.id = ")
                                ,b: showNum(local_91.id1)})};
   return _3b_({infixl: pestovalQuerySessions({database: local_91.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language2: {tag: "english",data: {}}
                                              ,filter1: filter})
               ,infixr: function (local_226) {
                  return _3b_({infixl: pestovalQuerySessions({database: local_91.database
                                                             ,teacher: {tag: "nothing"
                                                                       ,data: {}}
                                                             ,language2: {tag: "hebrew"
                                                                         ,data: {}}
                                                             ,filter1: filter})
                              ,infixr: function (local_227) {
                                 return __return(function () {
                                        var x =
                                        _26__26_({infixl: _3d__3d_({infixl: length1(local_226)
                                                                   ,infixr: 1.0})
                                                 ,infixr: function (local_228) {
                                                    return _3d__3d_({infixl: length1(local_227)
                                                                    ,infixr: 1.0});
                                                 }});
                                        switch (x.tag)
                                        {
                                          case "false":
                                            var local_229 = x.data;
                                            return {tag: "nothing",data: {}};
                                          case "true":
                                            var local_230 = x.data;
                                            var english1 = item1({index: 0.0
                                                                 ,object: local_226});
                                            var hebrew1 = item1({index: 0.0
                                                                ,object: local_227});
                                            return {tag: "just"
                                                   ,data: {prereqs1: {english: english1.prereqs1
                                                                     ,hebrew: function () {
                                                                        var x =
                                                                        _3d__3d_({infixl: hebrew1.prereqs1
                                                                                 ,infixr: english1.prereqs1});
                                                                        switch (x.tag)
                                                                        {
                                                                          case "false":
                                                                            var local_231 =
                                                                            x.data;
                                                                            return hebrew1.prereqs1;
                                                                          case "true":
                                                                            var local_232 =
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
                                                                        var local_233 =
                                                                        x.data;
                                                                        return hebrew1.name;
                                                                      case "true":
                                                                        var local_234 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("");
                                                                      default:
                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                     ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                     ,"2182d2a13ee677d6f08e74aba25b59cb");
                                                                    }
                                                                 }()}
                                                          ,start: english1.start
                                                          ,stop: english1.stop
                                                          ,place1: english1.place1
                                                          ,description1: {english: english1.description1
                                                                         ,hebrew: function () {
                                                                            var x =
                                                                            _3d__3d_({infixl: hebrew1.description1
                                                                                     ,infixr: english1.description1});
                                                                            switch (x.tag)
                                                                            {
                                                                              case "false":
                                                                                var local_235 =
                                                                                x.data;
                                                                                return hebrew1.description1;
                                                                              case "true":
                                                                                var local_236 =
                                                                                x.data;
                                                                                return rts.bytesFromAscii("");
                                                                              default:
                                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                             ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                             ,"e3d09b66fde49642215bacd53e5f9ffc");
                                                                            }
                                                                         }()}
                                                          ,teachers1: english1.teachers1
                                                          ,id1: english1.id1
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
var _7c__7c_ = function (local_246) {
   var x = local_246.infixl;
   switch (x.tag)
   {
     case "false":
       return local_246.infixr(x.data);
     case "true":
       var local_247 = x.data;
       return {tag: "true",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_dff4e86e63c54fab8b58ab3fe7e440ad"
                                    ,"cc82dca9551140c9af0084b786718cc5");
   }
};
var anyOf = function (local_243) {
   return foldLazy({stream: local_243.stream
                   ,initial: function (local_244) {
                      return {tag: "false",data: {}};
                   }
                   ,binop: function (local_245) {
                      return _7c__7c_({infixl: local_243.satisfy(local_245.item)
                                      ,infixr: local_245.rest});
                   }});
};
var pestovalAuth = function (local_238) {
   return _3b_({infixl: query({database: local_238.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT pestoval_teacher.id, pestoval_teacher.is_admin\nFROM pestoval_teacher\nWHERE pestoval_teacher.password = \'")
                                                             ,b: local_238.password})
                                                ,b: rts.bytesFromAscii("\'")})})
               ,infixr: function (x239) {
                  switch (x239.tag)
                  {
                    case "error":
                      var local_240 = x239.data;
                      return ignoreError(local_240);
                    case "success":
                      var local_241 = x239.data;
                      return __return(function () {
                             var x = anyOf({stream: fromArray(local_241.__data)
                                           ,satisfy: function (local_242) {
                                              return _3d__3d_({infixl: item1({index: 1.0
                                                                             ,object: local_242})
                                                              ,infixr: rts.bytesFromAscii("true")});
                                           }});
                             switch (x.tag)
                             {
                               case "false":
                                 var local_248 = x.data;
                                 var x = anyOf({stream: fromArray(local_241.__data)
                                               ,satisfy: function (local_249) {
                                                  var teacher1 =
                                                  parseInt(item1({index: 0.0
                                                                 ,object: local_249}));
                                                  return anyOf({stream: fromArray(local_238.teachers1)
                                                               ,satisfy: function (local_250) {
                                                                  return _3d__3d_({infixl: local_250.id1
                                                                                  ,infixr: teacher1});
                                                               }});
                                               }});
                                 switch (x.tag)
                                 {
                                   case "false":
                                     var local_251 = x.data;
                                     return {tag: "unauthorized",data: {}};
                                   case "true":
                                     var local_252 = x.data;
                                     return {tag: "teacher",data: {}};
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                                  ,"63099f6a8ec233abc1896a5e6518eaf6");
                                 }
                               case "true":
                                 var local_253 = x.data;
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
var pestovalUnauthorized = {content: {__data: rts.bytesFromAscii("Not authorized to edit")
                                     ,mimeType: rts.bytesFromAscii("text/plain")}
                           ,status: {message: rts.bytesFromAscii("Unauthorized")
                                    ,code: 403.0}};
var _22f2_ = function (local_258) {
   return {root: local_258.infixl,subTrees: local_258.infixr};
};
var leaf = function (local_257) { return _22f2_({infixl: local_257,infixr: []});};
var singleton = function (local_259) { return [local_259];};
var htmlParagraph = function (text2) {
   return _22f2_({infixl: rts.bytesFromAscii("<p>"),infixr: singleton(leaf(text2))});
};
var pestovalSessionSummary = function (session3) {
   return concat(map({stream: _3a__3a_({infixl: {name: rts.bytesFromAscii("Teachers")
                                                ,value: join({texts: map({stream: fromArray(session3.teachers1)
                                                                         ,mapping: function (local_265) {
                                                                            return local_265.name;
                                                                         }})
                                                             ,seperator: rts.bytesFromAscii(" & ")})}
                                       ,infixr: function (local_266) {
                                          return _3a__3a_({infixl: {name: rts.bytesFromAscii("Where")
                                                                   ,value: session3.place1.name}
                                                          ,infixr: function (local_267) {
                                                             return _3a__3a_({infixl: {name: rts.bytesFromAscii("What")
                                                                                      ,value: session3.name}
                                                                             ,infixr: function (local_268) {
                                                                                return _3a__3a_({infixl: {name: rts.bytesFromAscii("Level")
                                                                                                         ,value: session3.level1.name}
                                                                                                ,infixr: function (local_269) {
                                                                                                   return {tag: "empty"
                                                                                                          ,data: {}};
                                                                                                }});
                                                                             }});
                                                          }});
                                       }})
                     ,mapping: function (local_270) {
                        return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h4>")
                                                        ,infixr: singleton(leaf(local_270.name))})
                                        ,infixr: function (local_271) {
                                           return _3a__3a_({infixl: leaf(local_270.value)
                                                           ,infixr: function (local_272) {
                                                              return {tag: "empty"
                                                                     ,data: {}};
                                                           }});
                                        }});
                     }}));
};
var isPrefixOf = function (local_294) {
   var lw = length(local_294.whole);
   var lp = length(local_294.prefix);
   return _26__26_({infixl: _2265_({infixl: lw,infixr: lp})
                   ,infixr: function (local_295) {
                      return _3d__3d_({infixl: slice1({object: local_294.whole
                                                      ,start: 0.0
                                                      ,stop: lp})
                                      ,infixr: local_294.prefix});
                   }});
};
var has = function (local_293) {
   return isPrefixOf({whole: local_293.text,prefix: local_293.prefix});
};
var isSuffixOf = function (local_298) {
   var lw1 = length(local_298.whole);
   var ls = length(local_298.suffix);
   return _26__26_({infixl: _2265_({infixl: lw1,infixr: ls})
                   ,infixr: function (local_299) {
                      return _3d__3d_({infixl: slice1({object: local_298.whole
                                                      ,start: _2d_({infixl: lw1
                                                                   ,infixr: ls})
                                                      ,stop: lw1})
                                      ,infixr: local_298.suffix});
                   }});
};
var has1 = function (local_297) {
   return isSuffixOf({suffix: local_297.suffix,whole: local_297.text});
};
var not = function (local_300) {
   var x = local_300;
   switch (x.tag)
   {
     case "false":
       var local_301 = x.data;
       return {tag: "true",data: {}};
     case "true":
       var local_302 = x.data;
       return {tag: "false",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_414bf66f7dd84da7881a390b2f34ef76"
                                    ,"b298b3233fa94db5b07f79925bfdbb19");
   }
};
var renderHtml = function (tree) {
   var local_290 = tree.root;
   return join({texts: _3a__3a_({infixl: local_290
                                ,infixr: function (local_291) {
                                   return _2b__2b_2({infixl: map({stream: fromArray(tree.subTrees)
                                                                 ,mapping: renderHtml})
                                                    ,infixr: function (local_292) {
                                                       var x =
                                                       _26__26_({infixl: has({text: local_290
                                                                             ,prefix: rts.bytesFromAscii("<")})
                                                                ,infixr: function (local_296) {
                                                                   return not(has1({text: local_290
                                                                                   ,suffix: rts.bytesFromAscii("/>")}));
                                                                }});
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_303 = x.data;
                                                           return {tag: "empty",data: {}};
                                                         case "true":
                                                           var local_304 = x.data;
                                                           return _3a__3a_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("</")
                                                                                                          ,infixr: function (local_305) {
                                                                                                             return _3a__3a_({infixl: toBytes(toArray(take({stream: drop({stream: fromBytes(local_290)
                                                                                                                                                                         ,count: 1.0})
                                                                                                                                                           ,__while: function (local_306) {
                                                                                                                                                              return _26__26_({infixl: _2260_({infixl: local_306
                                                                                                                                                                                              ,infixr: 32.0})
                                                                                                                                                                              ,infixr: function (local_307) {
                                                                                                                                                                                 return _2260_({infixl: local_306
                                                                                                                                                                                               ,infixr: 62.0});
                                                                                                                                                                              }});
                                                                                                                                                           }})))
                                                                                                                             ,infixr: function (local_308) {
                                                                                                                                return _3a__3a_({infixl: rts.bytesFromAscii(">")
                                                                                                                                                ,infixr: function (local_309) {
                                                                                                                                                   return {tag: "empty"
                                                                                                                                                          ,data: {}};
                                                                                                                                                }});
                                                                                                                             }});
                                                                                                          }})
                                                                                         ,seperator: rts.bytesFromAscii("")})
                                                                           ,infixr: function (local_310) {
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
var pestovalPage = function (local_285) {
   return {content: {__data: _2b__2b_({a: rts.bytesFromAscii("<!DOCTYPE html>\n")
                                      ,b: renderHtml(_22f2_({infixl: rts.bytesFromAscii("<html>")
                                                            ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<head>")
                                                                             ,infixr: [leaf(rts.bytesFromAscii("<meta charset=\"utf-8\" />"))
                                                                                      ,_22f2_({infixl: rts.bytesFromAscii("<title>")
                                                                                              ,infixr: singleton(leaf(local_285.title))})
                                                                                      ,_22f2_({infixl: rts.bytesFromAscii("<body>")
                                                                                              ,infixr: local_285.body})]})]}))})
                    ,mimeType: rts.bytesFromAscii("text/html")}
          ,status: httpOk200};
};
var replace = function (local_315) {
   return join({texts: split({text: local_315.text,seperator: local_315.from})
               ,seperator: local_315.to});
};
var parseHex = function (text4) {
   var digitVal = function (local_321) {
      var x = _2264_({infixl: local_321,infixr: 57.0});
      switch (x.tag)
      {
        case "false":
          var local_322 = x.data;
          var x = _2264_({infixl: local_321,infixr: 70.0});
          switch (x.tag)
          {
            case "false":
              var local_323 = x.data;
              var x = _26__26_({infixl: _2264_({infixl: 97.0,infixr: local_321})
                               ,infixr: function (local_324) {
                                  return _2264_({infixl: local_321,infixr: 102.0});
                               }});
              switch (x.tag)
              {
                case "false":
                  var local_325 = x.data;
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"6361c631c359bf491a698736b910c593");
                case "true":
                  var local_326 = x.data;
                  return _2d_({infixl: local_321,infixr: 87.0});
                default:
                  throw rts.exceptions.LamduBug("Unhandled case"
                                               ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                               ,"5a1355193393bda93a2c8e331b53d26c");
              }
            case "true":
              var local_327 = x.data;
              var x = _2264_({infixl: 65.0,infixr: local_321});
              switch (x.tag)
              {
                case "false":
                  var local_328 = x.data;
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"d856f42600765d7302f46b291563ca8f");
                case "true":
                  var local_329 = x.data;
                  return _2d_({infixl: local_321,infixr: 55.0});
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
          var local_330 = x.data;
          var x = _2264_({infixl: 48.0,infixr: local_321});
          switch (x.tag)
          {
            case "false":
              var local_331 = x.data;
              throw rts.exceptions.ReachedHole("Reached a hole"
                                              ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                              ,"c930879571c8b455c7030f716fce3db8");
            case "true":
              var local_332 = x.data;
              return _2d_({infixl: local_321,infixr: 48.0});
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
   return fold({stream: fromBytes(text4)
               ,initial: 0.0
               ,binop: function (local_333) {
                  return _2b_({infixl: _2a_({infixl: local_333.acc,infixr: 16.0})
                              ,infixr: digitVal(local_333.item)});
               }});
};
var decodeUrl = function (text3) {
   return concat1(function () {
          var x = split({text: replace({text: text3
                                       ,from: rts.bytesFromAscii("+")
                                       ,to: rts.bytesFromAscii(" ")})
                        ,seperator: rts.bytesFromAscii("%")});
          switch (x.tag)
          {
            case "nonEmpty":
              var local_316 = x.data;
              return _3a__3a_({infixl: local_316.head
                              ,infixr: function (local_317) {
                                 return map({stream: local_316.tail({})
                                            ,mapping: function (local_318) {
                                               var x = _2265_({infixl: length(local_318)
                                                              ,infixr: 2.0});
                                               switch (x.tag)
                                               {
                                                 case "false":
                                                   var local_319 = x.data;
                                                   throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                   ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                   ,"dc688712fae3cce5d326448fdfdec2a5");
                                                 case "true":
                                                   var local_320 = x.data;
                                                   return _2b__2b_({a: toBytes(singleton(parseHex(slice1({object: local_318
                                                                                                         ,start: 0.0
                                                                                                         ,stop: 2.0}))))
                                                                   ,b: slice1({object: local_318
                                                                              ,start: 2.0
                                                                              ,stop: length(local_318)})});
                                                 default:
                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                ,"3d161b85ea84c55ce4d08379f720f0c6");
                                               }
                                            }});
                              }});
            case "empty":
              var local_334 = x.data;
              return {tag: "empty",data: {}};
            default:
              throw rts.exceptions.LamduBug("Unhandled case"
                                           ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                           ,"a27f7e5bb742b4c492509cfb987f05dd");
          }
       }());
};
var parsePostBody = function (body2) {
   return map({stream: split({text: body2,seperator: rts.bytesFromAscii("&")})
              ,mapping: function (field2) {
                 var parts3 = toArray(split({text: field2
                                            ,seperator: rts.bytesFromAscii("=")}));
                 var x = _3d__3d_({infixl: length1(parts3),infixr: 2.0});
                 switch (x.tag)
                 {
                   case "false":
                     var local_313 = x.data;
                     return ignoreError(function () {
                            throw rts.exceptions.ReachedHole("Reached a hole"
                                                            ,"DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                            ,"c4215356d194f30cdd17797a99d63ff1");
                         }());
                   case "true":
                     var local_314 = x.data;
                     return {value: decodeUrl(item1({index: 1.0,object: parts3}))
                            ,key: item1({index: 0.0,object: parts3})};
                   default:
                     throw rts.exceptions.LamduBug("Unhandled case"
                                                  ,"DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                  ,"611148533b9174ce687e759e68987e1b");
                 }
              }});
};
var postgresEncodeText = function (text5) {
   return _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("E\'")
                                ,b: concat1(map({stream: fromBytes(text5)
                                                ,mapping: function (local_336) {
                                                   var x = _3d__3d_({infixl: local_336
                                                                    ,infixr: 10.0});
                                                   switch (x.tag)
                                                   {
                                                     case "false":
                                                       var local_337 = x.data;
                                                       var x = _3d__3d_({infixl: local_336
                                                                        ,infixr: 13.0});
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_338 = x.data;
                                                           var x =
                                                           _3d__3d_({infixl: local_336
                                                                    ,infixr: 39.0});
                                                           switch (x.tag)
                                                           {
                                                             case "false":
                                                               var local_339 = x.data;
                                                               var x =
                                                               _3d__3d_({infixl: local_336
                                                                        ,infixr: 92.0});
                                                               switch (x.tag)
                                                               {
                                                                 case "false":
                                                                   var local_340 = x.data;
                                                                   return toBytes(singleton(local_336));
                                                                 case "true":
                                                                   var local_341 = x.data;
                                                                   return rts.bytesFromAscii("\\\\");
                                                                 default:
                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                                ,"db1c255f9dc88b1c4474ccb94732b223");
                                                               }
                                                             case "true":
                                                               var local_342 = x.data;
                                                               return rts.bytesFromAscii("\\\'");
                                                             default:
                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                            ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                            ,"c5163200e2f7d7f5292c38e34f78058d");
                                                           }
                                                         case "true":
                                                           var local_343 = x.data;
                                                           return rts.bytesFromAscii("\\r");
                                                         default:
                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                        ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                        ,"af75122f296de089cbe121bebb73e3af");
                                                       }
                                                     case "true":
                                                       var local_344 = x.data;
                                                       return rts.bytesFromAscii("\\n");
                                                     default:
                                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                                    ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                    ,"6e996a4b5e8af95a3b4a4fcb8897103c");
                                                   }
                                                }}))})
                   ,b: rts.bytesFromAscii("\'")});
};
var pestovalUpdate = function (local_312) {
   var x = local_312.request1.body;
   switch (x.tag)
   {
     case "just":
       var body1 = x.data;
       return _3b_({infixl: query({database: local_312.database
                                  ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET ")
                                                                              ,b: join({texts: map({stream: parsePostBody(body1)
                                                                                                   ,mapping: function (local_335) {
                                                                                                      return _2b__2b_({a: _2b__2b_({a: local_335.key
                                                                                                                                   ,b: rts.bytesFromAscii(" = ")})
                                                                                                                      ,b: postgresEncodeText(local_335.value)});
                                                                                                   }})
                                                                                       ,seperator: rts.bytesFromAscii(", ")})})
                                                                 ,b: rts.bytesFromAscii("\nWHERE pestoval_session.id = ")})
                                                    ,b: showNum(local_312.session)})})
                   ,infixr: function (x345) {
                      switch (x345.tag)
                      {
                        case "error":
                          var local_346 = x345.data;
                          return ignoreError(local_346);
                        case "success":
                          var local_347 = x345.data;
                          return __return({content: {__data: rts.bytesFromAscii("Update successful, refresh")
                                                    ,mimeType: rts.bytesFromAscii("text/plain")}
                                          ,status: {message: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: ")
                                                                      ,b: local_312.request1.path})
                                                   ,code: 303.0}});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                       ,"601e113ccba88e0bf9ac1fe558419963");
                      }
                   }});
     case "nothing":
       var local_348 = x.data;
       return __return({content: {__data: rts.bytesFromAscii("POST with no body")
                                 ,mimeType: rts.bytesFromAscii("text/plain")}
                       ,status: {message: rts.bytesFromAscii("Forbidden"),code: 403.0}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                    ,"7155adc9c6327a297327ec4e1f1a8007");
   }
};
var pestovalEditPage = function (local_90) {
   var parts1 = toArray(split({text: local_90.request1.path
                              ,seperator: rts.bytesFromAscii("/")}));
   var id = parseInt(item1({index: 3.0,object: parts1}));
   var password1 = item1({index: 4.0,object: parts1});
   return _3b_({infixl: getSession({database: local_90.database,id1: id})
               ,infixr: function (local_237) {
                  var x = local_237;
                  switch (x.tag)
                  {
                    case "just":
                      var session2 = x.data;
                      return _3b_({infixl: pestovalAuth({database: local_90.database
                                                        ,password: password1
                                                        ,teachers1: session2.teachers1})
                                  ,infixr: function (x254) {
                                     switch (x254.tag)
                                     {
                                       case "unauthorized":
                                         var local_255 = x254.data;
                                         return __return(pestovalUnauthorized);
                                       default:
                                         var authorization = x254;
                                         var x =
                                         _3d__3d_({infixl: local_90.request1.method
                                                  ,infixr: rts.bytesFromAscii("POST")});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_256 = x.data;
                                             return __return(pestovalPage({title: rts.bytesFromAscii("Edit Session")
                                                                          ,body: [_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                         ,infixr: singleton(leaf(rts.bytesFromAscii("Edit Session")))})
                                                                                 ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"")
                                                                                                                        ,b: local_90.request1.path})
                                                                                                           ,b: rts.bytesFromAscii("\">")})
                                                                                         ,infixr: toArray(_2b__2b_2({infixl: function () {
                                                                                                                       var x =
                                                                                                                       authorization;
                                                                                                                       switch (x.tag)
                                                                                                                       {
                                                                                                                         case "admin":
                                                                                                                           var local_262 =
                                                                                                                           x.data;
                                                                                                                           return _3a__3a_({infixl: htmlParagraph(rts.bytesFromAscii("TODO"))
                                                                                                                                           ,infixr: function (local_263) {
                                                                                                                                              return {tag: "empty"
                                                                                                                                                     ,data: {}};
                                                                                                                                           }});
                                                                                                                         case "teacher":
                                                                                                                           var local_264 =
                                                                                                                           x.data;
                                                                                                                           return pestovalSessionSummary({name: session2.name.english
                                                                                                                                                         ,place1: session2.place1
                                                                                                                                                         ,teachers1: session2.teachers1
                                                                                                                                                         ,level1: session2.level1});
                                                                                                                         default:
                                                                                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                        ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                                                                                                        ,"51101d04f9fe7ce01c9a8a10e2124c7f");
                                                                                                                       }
                                                                                                                    }()
                                                                                                                    ,infixr: function (local_273) {
                                                                                                                       return _2b__2b_2({infixl: concat(map({stream: _3a__3a_({infixl: {name: rts.bytesFromAscii("Description")
                                                                                                                                                                                       ,value: session2.description1.english
                                                                                                                                                                                       ,key: rts.bytesFromAscii("description")}
                                                                                                                                                                              ,infixr: function (local_274) {
                                                                                                                                                                                 return _3a__3a_({infixl: {name: rts.bytesFromAscii("Pre-reqs")
                                                                                                                                                                                                          ,value: session2.prereqs1.english
                                                                                                                                                                                                          ,key: rts.bytesFromAscii("prereqs")}
                                                                                                                                                                                                 ,infixr: function (local_275) {
                                                                                                                                                                                                    return _3a__3a_({infixl: {name: rts.bytesFromAscii("Description (Hebrew)")
                                                                                                                                                                                                                             ,value: session2.description1.hebrew
                                                                                                                                                                                                                             ,key: rts.bytesFromAscii("description_hebrew")}
                                                                                                                                                                                                                    ,infixr: function (local_276) {
                                                                                                                                                                                                                       return _3a__3a_({infixl: {name: rts.bytesFromAscii("Pre-reqs (Hebrew)")
                                                                                                                                                                                                                                                ,value: session2.prereqs1.hebrew
                                                                                                                                                                                                                                                ,key: rts.bytesFromAscii("prereqs_hebrew")}
                                                                                                                                                                                                                                       ,infixr: function (local_277) {
                                                                                                                                                                                                                                          return {tag: "empty"
                                                                                                                                                                                                                                                 ,data: {}};
                                                                                                                                                                                                                                       }});
                                                                                                                                                                                                                    }});
                                                                                                                                                                                                 }});
                                                                                                                                                                              }})
                                                                                                                                                            ,mapping: function (local_278) {
                                                                                                                                                               var local_279 =
                                                                                                                                                               local_278.name;
                                                                                                                                                               return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<label for=\"")
                                                                                                                                                                                                                              ,b: local_278.key})
                                                                                                                                                                                                                 ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                                                               ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                                                         ,infixr: singleton(leaf(_2b__2b_({a: local_279
                                                                                                                                                                                                                                                          ,b: rts.bytesFromAscii(":")})))}))})
                                                                                                                                                                               ,infixr: function (local_280) {
                                                                                                                                                                                  return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<textarea rows=10 cols=80 id=\"")
                                                                                                                                                                                                                                                                           ,b: local_278.key})
                                                                                                                                                                                                                                                              ,b: rts.bytesFromAscii("\" name=\"")})
                                                                                                                                                                                                                                                 ,b: local_278.key})
                                                                                                                                                                                                                                    ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                                                                                  ,infixr: singleton(leaf(local_278.value))})
                                                                                                                                                                                                  ,infixr: function (local_281) {
                                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                                  }});
                                                                                                                                                                               }});
                                                                                                                                                            }}))
                                                                                                                                        ,infixr: function (local_282) {
                                                                                                                                           return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                                                                                                           ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                                                     ,infixr: singleton(leaf(rts.bytesFromAscii("Update")))}))})
                                                                                                                                                           ,infixr: function (local_283) {
                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                     ,data: {}};
                                                                                                                                                           }});
                                                                                                                                        }});
                                                                                                                    }}))})]}));
                                           case "true":
                                             var local_311 = x.data;
                                             return pestovalUpdate({request1: local_90.request1
                                                                   ,database: local_90.database
                                                                   ,session: session2.id1});
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                          ,"649431586e8fa4f8144892306470de2e");
                                         }
                                     }
                                  }});
                    case "nothing":
                      var local_349 = x.data;
                      return __return(httpNotFound404(local_90.request1.path));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                   ,"08ce1c8a7d9560da25879978070222da");
                  }
               }});
};
var overlaysCss = _22f2_({infixl: rts.bytesFromAscii("<style type=\"text/css\">")
                         ,infixr: singleton(leaf(rts.bytesFromAscii("/* Thanks https://eichefam.net/2011/12/21/popup-windows-without-javascript/ */\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0,0,0,0.5);\n  transition: opacity 200ms;\n  visibility: hidden;\n  opacity: 0;\n}\n.overlay:target {\n  visibility: visible;\n  opacity: 1;\n}\n.cancel {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  cursor: default;\n}\n.popup {\n  margin: 50px auto;\n  padding: 20px;\n  background: #fff;\n  border: 1px solid #666;\n  width: 70%;\n  box-shadow: 0 0 50px rgba(0,0,0,0.5);\n  position: relative;\n}")))});
var filter2 = function (local_362) {
   var x = local_362.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_363 = x.data;
       var rest1 = function (local_364) {
          return filter2({stream: local_363.tail({}),keep: local_362.keep});
       };
       var x = local_362.keep(local_363.head);
       switch (x.tag)
       {
         case "false":
           var local_365 = x.data;
           return rest1({});
         case "true":
           var local_366 = x.data;
           return {tag: "nonEmpty",data: {head: local_363.head,tail: rest1}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                        ,"fbe0954bea2f4c248cb91ac61e7821ba");
       }
     case "empty":
       var local_367 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                    ,"2cb5f2574b8b4e3d8e5510fee403db44");
   }
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
var replicate = function (local_390) {
   var x = _2264_({infixl: local_390.count,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_391 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_390.item
                     ,tail: function (local_392) {
                        return replicate({count: _2d_({infixl: local_390.count
                                                      ,infixr: 1.0})
                                         ,item: local_390.item});
                     }}};
     case "true":
       var local_393 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_70f79762f05c41ccb9677f7a60746680"
                                    ,"3b53ee6d875f49f4acdb9a2e8b33fb2d");
   }
};
var rightJustify = function (local_388) {
   var count1 = _2d_({infixl: local_388.length5,infixr: length(local_388.text)});
   var x = _2264_({infixl: count1,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_389 = x.data;
       return _2b__2b_({a: toBytes(toArray(replicate({count: count1
                                                     ,item: local_388.character})))
                       ,b: local_388.text});
     case "true":
       var local_394 = x.data;
       return local_388.text;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_c96ce62be72e4d1e85d07af16867169d"
                                    ,"ea6106b4e471dead7c7d3638866db4a1");
   }
};
var showTime = function (local_384) {
   return join({texts: map({stream: _3a__3a_({infixl: local_384.hour
                                             ,infixr: function (local_385) {
                                                return _3a__3a_({infixl: local_384.minute
                                                                ,infixr: function (local_386) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }})
                           ,mapping: function (local_387) {
                              return rightJustify({length5: 2.0
                                                  ,text: showNum(local_387)
                                                  ,character: 48.0});
                           }})
               ,seperator: rts.bytesFromAscii(":")});
};
var formatTimeSlot = function (local_380) {
   return join({texts: _3a__3a_({infixl: item1({index: _2d_({infixl: local_380.timeSlot.start.date.weekDay
                                                            ,infixr: 1.0})
                                               ,object: function () {
                                                  var x = local_380.language2;
                                                  switch (x.tag)
                                                  {
                                                    case "english":
                                                      var local_381 = x.data;
                                                      return dayNames;
                                                    case "hebrew":
                                                      var local_382 = x.data;
                                                      return dayNamesHebrew;
                                                    default:
                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                   ,"DEF_4fed722dd3634c0db388c78e255c1429"
                                                                                   ,"5582218e01f5831eae7835c315a758c0");
                                                  }
                                               }()})
                                ,infixr: function (local_383) {
                                   return _3a__3a_({infixl: showTime(local_380.timeSlot.start.time)
                                                   ,infixr: function (local_395) {
                                                      return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                      ,infixr: function (local_396) {
                                                                         return _3a__3a_({infixl: showTime(local_380.timeSlot.stop.time)
                                                                                         ,infixr: function (local_397) {
                                                                                            return {tag: "empty"
                                                                                                   ,data: {}};
                                                                                         }});
                                                                      }});
                                                   }});
                                }})
               ,seperator: rts.bytesFromAscii(" ")});
};
var pestovalSessionInfo = function (local_417) {
   var line = function (local_418) {
      return _22f2_({infixl: rts.bytesFromAscii("<p>")
                    ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<b>")
                                     ,infixr: singleton(leaf(local_418.key))})
                             ,leaf(local_418.value)]});
   };
   var teacher3 = function (local_421) {
      return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/")
                                              ,infixr: function (local_422) {
                                                 return _3a__3a_({infixl: function () {
                                                                    var x =
                                                                    local_417.language2;
                                                                    switch (x.tag)
                                                                    {
                                                                      case "english":
                                                                        var local_423 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("eng");
                                                                      case "hebrew":
                                                                        var local_424 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("heb");
                                                                      default:
                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                     ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                     ,"25c06dfd8f7a82ef041d5e079e02e218");
                                                                    }
                                                                 }()
                                                                 ,infixr: function (local_425) {
                                                                    return _3a__3a_({infixl: rts.bytesFromAscii("/teacher/")
                                                                                    ,infixr: function (local_426) {
                                                                                       return _3a__3a_({infixl: showNum(local_421.id1)
                                                                                                       ,infixr: function (local_427) {
                                                                                                          return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                          ,infixr: function (local_428) {
                                                                                                                             return {tag: "empty"
                                                                                                                                    ,data: {}};
                                                                                                                          }});
                                                                                                       }});
                                                                                    }});
                                                                 }});
                                              }}))
                    ,infixr: singleton(leaf(local_421.name))});
   };
   return toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                           ,infixr: function () {
                                              var x =
                                              fromArray(local_417.session.teachers1);
                                              switch (x.tag)
                                              {
                                                case "nonEmpty":
                                                  var local_429 = x.data;
                                                  return toArray(_3a__3a_({infixl: teacher3(local_429.head)
                                                                          ,infixr: function (local_430) {
                                                                             return _2b__2b_2({infixl: concat(map({stream: local_429.tail({})
                                                                                                                  ,mapping: function (local_431) {
                                                                                                                     return _3a__3a_({infixl: leaf(function () {
                                                                                                                                        var x =
                                                                                                                                        local_417.language2;
                                                                                                                                        switch (x.tag)
                                                                                                                                        {
                                                                                                                                          case "english":
                                                                                                                                            var local_432 =
                                                                                                                                            x.data;
                                                                                                                                            return rts.bytesFromAscii(" & ");
                                                                                                                                          case "hebrew":
                                                                                                                                            var local_433 =
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
                                                                                                                                     ,infixr: function (local_434) {
                                                                                                                                        return _3a__3a_({infixl: teacher3(local_431)
                                                                                                                                                        ,infixr: function (local_435) {
                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                  ,data: {}};
                                                                                                                                                        }});
                                                                                                                                     }});
                                                                                                                  }}))
                                                                                              ,infixr: function (local_436) {
                                                                                                 return _3a__3a_({infixl: leaf(_2b__2b_({a: rts.bytesFromAscii(": ")
                                                                                                                                        ,b: local_417.session.name}))
                                                                                                                 ,infixr: function (local_437) {
                                                                                                                    return {tag: "empty"
                                                                                                                           ,data: {}};
                                                                                                                 }});
                                                                                              }});
                                                                          }}));
                                                case "empty":
                                                  var local_438 = x.data;
                                                  return singleton(leaf(local_417.session.name));
                                                default:
                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                               ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                               ,"ed7be6bad9f71095a62be6746bf728a3");
                                              }
                                           }()})
                           ,infixr: function (local_439) {
                              return _2b__2b_2({infixl: function () {
                                                  var x = local_417.password;
                                                  switch (x.tag)
                                                  {
                                                    case "just":
                                                      var local_440 = x.data;
                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                      ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/eng/edit/")
                                                                                                                                               ,infixr: function (local_441) {
                                                                                                                                                  return _3a__3a_({infixl: showNum(local_417.session.id1)
                                                                                                                                                                  ,infixr: function (local_442) {
                                                                                                                                                                     return _3a__3a_({infixl: rts.bytesFromAscii("/")
                                                                                                                                                                                     ,infixr: function (local_443) {
                                                                                                                                                                                        return _3a__3a_({infixl: local_440
                                                                                                                                                                                                        ,infixr: function (local_444) {
                                                                                                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                                                                                                                           ,infixr: function (local_445) {
                                                                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                                                                           }});
                                                                                                                                                                                                        }});
                                                                                                                                                                                     }});
                                                                                                                                                                  }});
                                                                                                                                               }})
                                                                                                                              ,seperator: rts.bytesFromAscii("")})
                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("Edit details")))}))})
                                                                      ,infixr: function (local_446) {
                                                                         return {tag: "empty"
                                                                                ,data: {}};
                                                                      }});
                                                    case "nothing":
                                                      var local_447 = x.data;
                                                      return {tag: "empty",data: {}};
                                                    default:
                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                   ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                   ,"fad3e2035a95ac24b0214f741995983a");
                                                  }
                                               }()
                                               ,infixr: function (local_448) {
                                                  return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<b>")
                                                                                  ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_417.session
                                                                                                                         ,language2: local_417.language2})))})
                                                                  ,infixr: function (local_449) {
                                                                     return _3a__3a_({infixl: line({value: local_417.session.place1.name
                                                                                                   ,key: function () {
                                                                                                      var x =
                                                                                                      local_417.language2;
                                                                                                      switch (x.tag)
                                                                                                      {
                                                                                                        case "english":
                                                                                                          var local_450 =
                                                                                                          x.data;
                                                                                                          return rts.bytesFromAscii("Where: ");
                                                                                                        case "hebrew":
                                                                                                          var local_451 =
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
                                                                                     ,infixr: function (local_452) {
                                                                                        return _3a__3a_({infixl: line({value: local_417.session.level1.name
                                                                                                                      ,key: function () {
                                                                                                                         var x =
                                                                                                                         local_417.language2;
                                                                                                                         switch (x.tag)
                                                                                                                         {
                                                                                                                           case "english":
                                                                                                                             var local_453 =
                                                                                                                             x.data;
                                                                                                                             return rts.bytesFromAscii("Who: ");
                                                                                                                           case "hebrew":
                                                                                                                             var local_454 =
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
                                                                                                        ,infixr: function (local_455) {
                                                                                                           return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                           ,infixr: singleton(leaf(function () {
                                                                                                                                              var x =
                                                                                                                                              local_417.language2;
                                                                                                                                              switch (x.tag)
                                                                                                                                              {
                                                                                                                                                case "english":
                                                                                                                                                  var local_456 =
                                                                                                                                                  x.data;
                                                                                                                                                  return rts.bytesFromAscii("Description:");
                                                                                                                                                case "hebrew":
                                                                                                                                                  var local_457 =
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
                                                                                                                           ,infixr: function (local_458) {
                                                                                                                              var escapeLines =
                                                                                                                              function (text6) {
                                                                                                                                 return replace({text: text6
                                                                                                                                                ,from: rts.bytesFromAscii("\n")
                                                                                                                                                ,to: rts.bytesFromAscii("<br/>\n")});
                                                                                                                              };
                                                                                                                              return _3a__3a_({infixl: htmlParagraph(escapeLines(local_417.session.description1))
                                                                                                                                              ,infixr: function (local_459) {
                                                                                                                                                 return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                 ,infixr: singleton(leaf(function () {
                                                                                                                                                                                    var x =
                                                                                                                                                                                    local_417.language2;
                                                                                                                                                                                    switch (x.tag)
                                                                                                                                                                                    {
                                                                                                                                                                                      case "english":
                                                                                                                                                                                        var local_460 =
                                                                                                                                                                                        x.data;
                                                                                                                                                                                        return rts.bytesFromAscii("Prereqs:");
                                                                                                                                                                                      case "hebrew":
                                                                                                                                                                                        var local_461 =
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
                                                                                                                                                                 ,infixr: function (local_462) {
                                                                                                                                                                    return _3a__3a_({infixl: htmlParagraph(escapeLines(local_417.session.prereqs1))
                                                                                                                                                                                    ,infixr: function (local_463) {
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
var htmlPopup = function (local_464) {
   return _22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<div id=\"")
                                                ,infixr: function (local_465) {
                                                   return _3a__3a_({infixl: local_464.id1
                                                                   ,infixr: function (local_466) {
                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("\" class=\"overlay\">")
                                                                                      ,infixr: function (local_467) {
                                                                                         return {tag: "empty"
                                                                                                ,data: {}};
                                                                                      }});
                                                                   }});
                                                }})
                               ,seperator: rts.bytesFromAscii("")})
                 ,infixr: [leaf(rts.bytesFromAscii("<a class=\"cancel\" href=\"javascript:history.back()\">"))
                          ,_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<div class=\"popup\" style=\"background-color:")
                                                                 ,infixr: function (local_469) {
                                                                    return _3a__3a_({infixl: local_464.color
                                                                                    ,infixr: function (local_470) {
                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\">")
                                                                                                       ,infixr: function (local_471) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                    }});
                                                                 }})
                                                ,seperator: rts.bytesFromAscii("")})
                                  ,infixr: local_464.content})]});
};
var pestovalSessionCell = function (local_402) {
   var popup = _2b__2b_({a: rts.bytesFromAscii("popup-")
                        ,b: showNum(local_402.session.id1)});
   var local_403 = htmlParagraph(local_402.session.place1.name);
   return _22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td style=\"background-color:")
                                                ,infixr: function (local_404) {
                                                   var color1 =
                                                   local_402.session.level1.color;
                                                   return _3a__3a_({infixl: function () {
                                                                      var x =
                                                                      _3d__3d_({infixl: color1
                                                                               ,infixr: rts.bytesFromAscii("null")});
                                                                      switch (x.tag)
                                                                      {
                                                                        case "false":
                                                                          var local_405 =
                                                                          x.data;
                                                                          return color1;
                                                                        case "true":
                                                                          var local_406 =
                                                                          x.data;
                                                                          return rts.bytesFromAscii("#eee");
                                                                        default:
                                                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                       ,"DEF_9020eea8542142a09c1a8813ef9990af"
                                                                                                       ,"8af192079f77d68114daa54992f28614");
                                                                      }
                                                                   }()
                                                                   ,infixr: function (local_407) {
                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(";")
                                                                                      ,infixr: function (local_408) {
                                                                                         return _3a__3a_({infixl: local_402.style
                                                                                                         ,infixr: function (local_409) {
                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii("\" ")
                                                                                                                            ,infixr: function (local_410) {
                                                                                                                               return _3a__3a_({infixl: local_402.attributes
                                                                                                                                               ,infixr: function (local_411) {
                                                                                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(">")
                                                                                                                                                                  ,infixr: function (local_412) {
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
                                                                 ,infixr: function (local_413) {
                                                                    return _3a__3a_({infixl: popup
                                                                                    ,infixr: function (local_414) {
                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\" style=\"text-decoration: none; color: black;\">")
                                                                                                       ,infixr: function (local_415) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                    }});
                                                                 }})
                                                ,seperator: rts.bytesFromAscii("")})
                                  ,infixr: local_402.content})
                          ,htmlPopup({content: pestovalSessionInfo({password: local_402.password
                                                                   ,language2: local_402.language2
                                                                   ,session: local_402.session})
                                     ,id1: popup
                                     ,color: local_402.session.level1.color})]});
};
var htmlTable = function (local_474) {
   return _22f2_({infixl: _2b__2b_({a: rts.bytesFromAscii("<table width=\"100%\"")
                                   ,b: function () {
                                      var x = local_474.language2;
                                      switch (x.tag)
                                      {
                                        case "english":
                                          var local_475 = x.data;
                                          return rts.bytesFromAscii(">");
                                        case "hebrew":
                                          var local_476 = x.data;
                                          return rts.bytesFromAscii(" dir=\"rtl\">");
                                        default:
                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                       ,"DEF_c270fb6c0aee498e865b7bf936941c16"
                                                                       ,"3593d20a3691e4acedfdfbe5a1b33cdf");
                                      }
                                   }()})
                 ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<tbody>")
                                           ,infixr: local_474.body}))});
};
var pestovalTeacherPage = function (local_351) {
   var teacher2 = parseInt(item1({index: 0.0,object: local_351.path}));
   return _3b_({infixl: query({database: local_351.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT ")
                                                                          ,b: queryFieldLang(local_351.language2)({table: rts.bytesFromAscii("pestoval_teacher")
                                                                                                                  ,field: rts.bytesFromAscii("name")
                                                                                                                  ,as: {tag: "nothing"
                                                                                                                       ,data: {}}})})
                                                             ,b: rts.bytesFromAscii(", pestoval_teacher.password\nFROM pestoval_teacher\nWHERE pestoval_teacher.id =")})
                                                ,b: showNum(teacher2)})})
               ,infixr: function (x352) {
                  switch (x352.tag)
                  {
                    case "error":
                      var local_353 = x352.data;
                      return ignoreError(local_353);
                    case "success":
                      var local_354 = x352.data;
                      var password2 = function (value1) {
                                         var x =
                                         _26__26_({infixl: _3e_({infixl: length1(local_351.path)
                                                                ,infixr: 1.0})
                                                  ,infixr: function (local_355) {
                                                     return _3d__3d_({infixl: item1({index: 1.0
                                                                                    ,object: local_351.path})
                                                                     ,infixr: value1});
                                                  }});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_356 = x.data;
                                             return {tag: "nothing",data: {}};
                                           case "true":
                                             var local_357 = x.data;
                                             return {tag: "just",data: value1};
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_50938aa1a135407c826989b9e1339047"
                                                                          ,"91cc4c8b5af33ae92f94375e3a666b89");
                                         }
                                      }(item1({index: 1.0
                                              ,object: item1({index: 0.0
                                                             ,object: local_354.__data})}));
                      var title1 = item1({index: 0.0
                                         ,object: item1({index: 0.0
                                                        ,object: local_354.__data})});
                      return _3b_({infixl: pestovalQuerySessions({database: local_351.database
                                                                 ,teacher: {tag: "just"
                                                                           ,data: teacher2}
                                                                 ,language2: local_351.language2
                                                                 ,filter1: {tag: "nothing"
                                                                           ,data: {}}})
                                  ,infixr: function (sessions) {
                                     return __return(pestovalPage({title: title1
                                                                  ,body: [overlaysCss
                                                                         ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                            ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                                      ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                                                ,infixr: singleton(leaf(title1))}))}))})
                                                                                                            ,infixr: function (local_359) {
                                                                                                               return map({stream: fromArray(sessions)
                                                                                                                          ,mapping: function (session4) {
                                                                                                                             var info =
                                                                                                                             join({texts: _3a__3a_({infixl: session4.name
                                                                                                                                                   ,infixr: function (local_360) {
                                                                                                                                                      var x =
                                                                                                                                                      filter2({stream: fromArray(session4.teachers1)
                                                                                                                                                              ,keep: function (local_361) {
                                                                                                                                                                 return _2260_({infixl: local_361.id1
                                                                                                                                                                               ,infixr: teacher2});
                                                                                                                                                              }});
                                                                                                                                                      switch (x.tag)
                                                                                                                                                      {
                                                                                                                                                        case "nonEmpty":
                                                                                                                                                          var local_368 =
                                                                                                                                                          x.data;
                                                                                                                                                          return _3a__3a_({infixl: concat1(_3a__3a_({infixl: function () {
                                                                                                                                                                                                       var x =
                                                                                                                                                                                                       local_351.language2;
                                                                                                                                                                                                       switch (x.tag)
                                                                                                                                                                                                       {
                                                                                                                                                                                                         case "english":
                                                                                                                                                                                                           var local_369 =
                                                                                                                                                                                                           x.data;
                                                                                                                                                                                                           return rts.bytesFromAscii("(With ");
                                                                                                                                                                                                         case "hebrew":
                                                                                                                                                                                                           var local_370 =
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
                                                                                                                                                                                                    ,infixr: function (local_371) {
                                                                                                                                                                                                       return _3a__3a_({infixl: local_368.head.name
                                                                                                                                                                                                                       ,infixr: function (local_372) {
                                                                                                                                                                                                                          return _3a__3a_({infixl: join({texts: map({stream: local_368.tail({})
                                                                                                                                                                                                                                                                    ,mapping: function (local_373) {
                                                                                                                                                                                                                                                                       return _2b__2b_({a: function () {
                                                                                                                                                                                                                                                                                          var x =
                                                                                                                                                                                                                                                                                          local_351.language2;
                                                                                                                                                                                                                                                                                          switch (x.tag)
                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                            case "english":
                                                                                                                                                                                                                                                                                              var local_374 =
                                                                                                                                                                                                                                                                                              x.data;
                                                                                                                                                                                                                                                                                              return rts.bytesFromAscii(" & ");
                                                                                                                                                                                                                                                                                            case "hebrew":
                                                                                                                                                                                                                                                                                              var local_375 =
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
                                                                                                                                                                                                                                                                                       ,b: local_373.name});
                                                                                                                                                                                                                                                                    }})
                                                                                                                                                                                                                                                        ,seperator: rts.bytesFromAscii("")})
                                                                                                                                                                                                                                          ,infixr: function (local_376) {
                                                                                                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(")")
                                                                                                                                                                                                                                                             ,infixr: function (local_377) {
                                                                                                                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                                                                                                                       ,data: {}};
                                                                                                                                                                                                                                                             }});
                                                                                                                                                                                                                                          }});
                                                                                                                                                                                                                       }});
                                                                                                                                                                                                    }}))
                                                                                                                                                                          ,infixr: function (local_378) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                        case "empty":
                                                                                                                                                          var local_379 =
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
                                                                                                                                           ,infixr: singleton(pestovalSessionCell({password: password2
                                                                                                                                                                                  ,content: [_22f2_({infixl: rts.bytesFromAscii("<p style=\"font-weight=bold\">")
                                                                                                                                                                                                    ,infixr: singleton(leaf(join({texts: _3a__3a_({infixl: formatTimeSlot({timeSlot: session4
                                                                                                                                                                                                                                                                          ,language2: local_351.language2})
                                                                                                                                                                                                                                                  ,infixr: function (local_398) {
                                                                                                                                                                                                                                                     return _3a__3a_({infixl: session4.place1.name
                                                                                                                                                                                                                                                                     ,infixr: function (local_399) {
                                                                                                                                                                                                                                                                        return {tag: "empty"
                                                                                                                                                                                                                                                                               ,data: {}};
                                                                                                                                                                                                                                                                     }});
                                                                                                                                                                                                                                                  }})
                                                                                                                                                                                                                                 ,seperator: rts.bytesFromAscii(" / ")})))})
                                                                                                                                                                                            ,htmlParagraph(info)]
                                                                                                                                                                                  ,style: rts.bytesFromAscii("")
                                                                                                                                                                                  ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                  ,language2: local_351.language2
                                                                                                                                                                                  ,session: session4}))});
                                                                                                                          }});
                                                                                                            }}))
                                                                                    ,language2: local_351.language2})]}));
                                  }});
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_50938aa1a135407c826989b9e1339047"
                                                   ,"fc81fe2932d91417e79f74d97a2f2ad5");
                  }
               }});
};
var maximum2 = function (local_499) {
   var x = _2265_({infixl: local_499.__x1,infixr: local_499.y});
   switch (x.tag)
   {
     case "false":
       var local_500 = x.data;
       return local_499.y;
     case "true":
       var local_501 = x.data;
       return local_499.__x1;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_19e923b820b04266a9811a6b34fe7b37"
                                    ,"a5d0a997c71340b2b9d148187aeb6d00");
   }
};
var nonEmptyFold = function (local_502) {
   var x = local_502.stream;
   switch (x.tag)
   {
     case "nonEmpty":
       var local_503 = x.data;
       return {tag: "just"
              ,data: fold({stream: local_503.tail({})
                          ,initial: local_503.head
                          ,binop: local_502.binop})};
     case "empty":
       var local_504 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_05d859467ac547cc890fea33e3ff4642"
                                    ,"eb3e9576545c4cc390019d2c5a8d9ce4");
   }
};
var maximum1 = function (stream8) {
   return nonEmptyFold({stream: stream8
                       ,binop: function (local_498) {
                          return maximum2({y: local_498.item,__x1: local_498.acc});
                       }});
};
var gcd = function (local_507) {
   var x = _3d__3d_({infixl: local_507.__x1,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_508 = x.data;
       return gcd({y: local_507.__x1
                  ,__x1: _25_({infixl: local_507.y,infixr: local_507.__x1})});
     case "true":
       var local_509 = x.data;
       return local_507.y;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_493da5cfecea49b89fd9a10c42df9e12"
                                    ,"426c0882a83d8df5efe64ca0e57098af");
   }
};
var lcm = function (local_506) {
   return _2f_({infixl: _2a_({infixl: local_506.__x1,infixr: local_506.y})
               ,infixr: gcd({y: local_506.y,__x1: local_506.__x1})});
};
var timeSlotRow = function (local_512) {
   return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                 ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td colspan=")
                                                                          ,infixr: function (local_513) {
                                                                             return _3a__3a_({infixl: showNum(local_512.numColumns1)
                                                                                             ,infixr: function (local_514) {
                                                                                                return _3a__3a_({infixl: rts.bytesFromAscii(" style=\"font-size:150%; border-top:3pt solid black;\">")
                                                                                                                ,infixr: function (local_515) {
                                                                                                                   return {tag: "empty"
                                                                                                                          ,data: {}};
                                                                                                                }});
                                                                                             }});
                                                                          }})
                                                         ,seperator: rts.bytesFromAscii("")})
                                           ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_512.timeSlot
                                                                                  ,language2: local_512.language2})))}))});
};
var formatTeachers = function (local_518) {
   return htmlParagraph(_2b__2b_({a: join({texts: map({stream: fromArray(local_518.teachers1)
                                                      ,mapping: function (local_519) {
                                                         return local_519.name;
                                                      }})
                                          ,seperator: function () {
                                             var x = local_518.language2;
                                             switch (x.tag)
                                             {
                                               case "english":
                                                 var local_520 = x.data;
                                                 return rts.bytesFromAscii(" & ");
                                               case "hebrew":
                                                 var local_521 = x.data;
                                                 return rts.bytes([32,215,149]);
                                               default:
                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                              ,"DEF_b343578f80c84dbf8532d81d3be7c414"
                                                                              ,"5501c290d329fa41da6be2be94a5f4d0");
                                             }
                                          }()})
                                 ,b: rts.bytesFromAscii(":")}));
};
var pestovalLevelsPage = function (local_479) {
   var minimum = parseInt(item1({index: 0.0,object: local_479.path}));
   var maximum = function () {
                    var x = _3e_({infixl: length1(local_479.path),infixr: 1.0});
                    switch (x.tag)
                    {
                      case "false":
                        var local_480 = x.data;
                        return minimum;
                      case "true":
                        var local_481 = x.data;
                        return parseInt(item1({index: 1.0,object: local_479.path}));
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
                            var local_482 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_479.language2;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_483 = x.data;
                                                   return rts.bytesFromAscii("Levels");
                                                 case "hebrew":
                                                   var local_484 = x.data;
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
                                            ,infixr: function (local_485) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_486) {
                                                                  return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                                  ,infixr: function (local_487) {
                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                     ,infixr: function (local_488) {
                                                                                                        return {tag: "empty"
                                                                                                               ,data: {}};
                                                                                                     }});
                                                                                  }});
                                                               }});
                                            }});
                          case "true":
                            var local_489 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_479.language2;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_490 = x.data;
                                                   return rts.bytesFromAscii("Level");
                                                 case "hebrew":
                                                   var local_491 = x.data;
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
                                            ,infixr: function (local_492) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_493) {
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
   return _3b_({infixl: pestovalQuerySessions({database: local_479.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language2: local_479.language2
                                              ,filter1: {tag: "just"
                                                        ,data: join({texts: _3a__3a_({infixl: showNum(minimum)
                                                                                     ,infixr: function (local_494) {
                                                                                        return _3a__3a_({infixl: rts.bytesFromAscii(" <= pestoval_level.as_number AND pestoval_level.as_number <= ")
                                                                                                        ,infixr: function (local_495) {
                                                                                                           return _3a__3a_({infixl: showNum(maximum)
                                                                                                                           ,infixr: function (local_496) {
                                                                                                                              return {tag: "empty"
                                                                                                                                     ,data: {}};
                                                                                                                           }});
                                                                                                        }});
                                                                                     }})
                                                                    ,seperator: rts.bytesFromAscii("")})}})
               ,infixr: function (sessions1) {
                  var groups = toArray(group({stream: fromArray(sessions1)
                                             ,by: function (local_497) {
                                                return _3d__3d_({infixl: local_497.infixl.start
                                                                ,infixr: local_497.infixr.start});
                                             }}));
                  var maxRow = maybe({object: maximum1(map({stream: fromArray(groups)
                                                           ,mapping: length1}))
                                     ,or: 0.0});
                  var numColumns = fold({stream: _2e__2e_({start: 1.0
                                                          ,stop: _2b_({infixl: maxRow
                                                                      ,infixr: 1.0})})
                                        ,initial: 1.0
                                        ,binop: function (local_505) {
                                           return lcm({y: local_505.item
                                                      ,__x1: local_505.acc});
                                        }});
                  return __return(pestovalPage({title: title2
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                         ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                             ,infixr: singleton(leaf(title2))}))}))})
                                                                                         ,infixr: function (local_511) {
                                                                                            return concat(map({stream: fromArray(groups)
                                                                                                              ,mapping: function (group1) {
                                                                                                                 return _3a__3a_({infixl: timeSlotRow({numColumns1: numColumns
                                                                                                                                                      ,timeSlot: item1({index: 0.0
                                                                                                                                                                       ,object: group1})
                                                                                                                                                      ,language2: local_479.language2})
                                                                                                                                 ,infixr: function (local_516) {
                                                                                                                                    var attributes1 =
                                                                                                                                    function (local_517) {
                                                                                                                                       return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("colspan=")
                                                                                                                                                                                              ,b: showNum(_2f_({infixl: numColumns
                                                                                                                                                                                                               ,infixr: local_517}))})
                                                                                                                                                                                 ,b: rts.bytesFromAscii(" width=\"")})
                                                                                                                                                                    ,b: showNum(_2f__2f_({infixl: 100.0
                                                                                                                                                                                         ,infixr: local_517}))})
                                                                                                                                                       ,b: rts.bytesFromAscii("%\"")});
                                                                                                                                    }(length1(group1));
                                                                                                                                    return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                                    ,infixr: toArray(map({stream: fromArray(group1)
                                                                                                                                                                                         ,mapping: function (session5) {
                                                                                                                                                                                            return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                                                                  ,data: {}}
                                                                                                                                                                                                                       ,content: singleton(_22f2_({infixl: rts.bytesFromAscii("<div style=\"font-size:110%\">")
                                                                                                                                                                                                                                                  ,infixr: [formatTeachers({teachers1: session5.teachers1
                                                                                                                                                                                                                                                                           ,language2: local_479.language2})
                                                                                                                                                                                                                                                           ,htmlParagraph(session5.name)
                                                                                                                                                                                                                                                           ,htmlParagraph(session5.place1.name)]}))
                                                                                                                                                                                                                       ,style: rts.bytesFromAscii("border-left: 1pt solid black")
                                                                                                                                                                                                                       ,attributes: attributes1
                                                                                                                                                                                                                       ,language2: local_479.language2
                                                                                                                                                                                                                       ,session: session5});
                                                                                                                                                                                         }}))})
                                                                                                                                                    ,infixr: function (local_525) {
                                                                                                                                                       return {tag: "empty"
                                                                                                                                                              ,data: {}};
                                                                                                                                                    }});
                                                                                                                                 }});
                                                                                                              }}));
                                                                                         }}))
                                                                 ,language2: local_479.language2})]}));
               }});
};
var dedup = function (local_531) {
   return toArray(map({stream: group({stream: local_531,by: _3d__3d_})
                      ,mapping: function (local_532) {
                         return item1({index: 0.0,object: local_532});
                      }}));
};
var placesRow = function (places1) {
   var __tag = join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<th width=\"")
                                     ,infixr: function (local_534) {
                                        return _3a__3a_({infixl: showNum(_2f_({infixl: 100.0
                                                                              ,infixr: length1(places1)}))
                                                        ,infixr: function (local_535) {
                                                           return _3a__3a_({infixl: rts.bytesFromAscii("%\">")
                                                                           ,infixr: function (local_536) {
                                                                              return {tag: "empty"
                                                                                     ,data: {}};
                                                                           }});
                                                        }});
                                     }})
                    ,seperator: rts.bytesFromAscii("")});
   return _22f2_({infixl: rts.bytesFromAscii("<tr style=\"background-color:#eee\">")
                 ,infixr: toArray(map({stream: fromArray(places1)
                                      ,mapping: function (local_537) {
                                         return _22f2_({infixl: __tag
                                                       ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/places/")
                                                                                                                ,infixr: function (local_538) {
                                                                                                                   return _3a__3a_({infixl: local_537.id1
                                                                                                                                   ,infixr: function (local_539) {
                                                                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("/\"> ")
                                                                                                                                                      ,infixr: function (local_540) {
                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                ,data: {}};
                                                                                                                                                      }});
                                                                                                                                   }});
                                                                                                                }})
                                                                                               ,seperator: rts.bytesFromAscii("")})
                                                                                 ,infixr: singleton(leaf(local_537.name))}))});
                                      }}))});
};
var toArray1 = function (local_546) {
   return runMutArray(_3b_({infixl: newMutArray1(replicate({count: local_546.size
                                                           ,item: {tag: "nothing"
                                                                  ,data: {}}}))
                           ,infixr: function (__array5) {
                              return _3b_({infixl: sequence__(map({stream: local_546.stream
                                                                  ,mapping: function (local_547) {
                                                                     return writeMutArray({index: local_546.index(local_547)
                                                                                          ,object: __array5
                                                                                          ,value: {tag: "just"
                                                                                                  ,data: local_547}});
                                                                  }}))
                                          ,infixr: function (local_548) {
                                             return __return(__array5);
                                          }});
                           }}));
};
var pestovalSessionsTable = function (local_528) {
   return _3b_({infixl: pestovalQuerySessions({database: local_528.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language2: local_528.language2
                                              ,filter1: {tag: "nothing",data: {}}})
               ,infixr: function (sessions2) {
                  var places =
                  dedup(fromArray(sort({stream: map({stream: fromArray(sessions2)
                                                    ,mapping: function (local_529) {
                                                       return local_529.place1;
                                                    }})
                                       ,_3c_1: function (local_530) {
                                          return _3c_({infixl: local_530.infixl.id1
                                                      ,infixr: local_530.infixr.id1});
                                       }})));
                  var numColumns2 = length1(places);
                  return __return(pestovalPage({title: rts.bytesFromAscii("All Sessions")
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(_3a__3a_({infixl: placesRow(places)
                                                                                         ,infixr: function (local_541) {
                                                                                            return concat(map({stream: group({stream: fromArray(sessions2)
                                                                                                                             ,by: function (local_542) {
                                                                                                                                return _3d__3d_({infixl: local_542.infixl.start
                                                                                                                                                ,infixr: local_542.infixr.start});
                                                                                                                             }})
                                                                                                              ,mapping: function (local_543) {
                                                                                                                 return _3a__3a_({infixl: timeSlotRow({numColumns1: numColumns2
                                                                                                                                                      ,timeSlot: item1({index: 0.0
                                                                                                                                                                       ,object: local_543})
                                                                                                                                                      ,language2: local_528.language2})
                                                                                                                                 ,infixr: function (local_544) {
                                                                                                                                    return map({stream: fromArray(toArray1({stream: fromArray(local_543)
                                                                                                                                                                           ,index: function (local_545) {
                                                                                                                                                                              return index4({__array4: places
                                                                                                                                                                                            ,item: local_545.place1});
                                                                                                                                                                           }
                                                                                                                                                                           ,size: numColumns2}))
                                                                                                                                               ,mapping: function (local_549) {
                                                                                                                                                  var x =
                                                                                                                                                  local_549;
                                                                                                                                                  switch (x.tag)
                                                                                                                                                  {
                                                                                                                                                    case "just":
                                                                                                                                                      var session6 =
                                                                                                                                                      x.data;
                                                                                                                                                      return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                            ,data: {}}
                                                                                                                                                                                 ,content: [formatTeachers({teachers1: session6.teachers1
                                                                                                                                                                                                           ,language2: local_528.language2})
                                                                                                                                                                                           ,htmlParagraph(session6.name)]
                                                                                                                                                                                 ,style: rts.bytesFromAscii("")
                                                                                                                                                                                 ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                 ,language2: local_528.language2
                                                                                                                                                                                 ,session: session6});
                                                                                                                                                    case "nothing":
                                                                                                                                                      var local_552 =
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
                                                                 ,language2: local_528.language2})]}));
               }});
};
var readFile = rts.builtins.IO.file["readFile"];
var pestovalIndex = _3b_({infixl: readFile(rts.bytesFromAscii("index.html"))
                         ,infixr: function (local_555) {
                            return __return({content: {__data: local_555
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
                       return __return(httpNotFound404(local_67.request1.path));
                     case "true":
                       var local_89 = x.data;
                       return pestovalEditPage({request1: local_67.request1
                                               ,database: local_67.database});
                     default:
                       throw rts.exceptions.LamduBug("Unhandled case"
                                                    ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                    ,"3904128e0f229aab0f559b8c4efd7e8c");
                   }
                 case "true":
                   var local_350 = x.data;
                   return pestovalTeacherPage({path: path1
                                              ,database: local_67.database
                                              ,language2: language1});
                 default:
                   throw rts.exceptions.LamduBug("Unhandled case"
                                                ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                ,"1efb5179a530efb5cf0ea0f292813e32");
               }
             case "true":
               var local_478 = x.data;
               return pestovalLevelsPage({path: path1
                                         ,database: local_67.database
                                         ,language2: language1});
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                            ,"3725e3e3e238c36942a62af16a116f25");
           }
         case "true":
           var local_527 = x.data;
           return pestovalSessionsTable({database: local_67.database
                                        ,language2: language1});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                        ,"0e90da8443f9aff3c55edb7f8fef28fc");
       }
     case "true":
       var local_554 = x.data;
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
                      var local_568 = x.data;
                      return __return({tag: "nothing",data: {}});
                    case "true":
                      var local_569 = x.data;
                      return _3b_({infixl: readMutArray({index: _2d_({infixl: length6
                                                                     ,infixr: 1.0})
                                                        ,object: __array6})
                                  ,infixr: function (result) {
                                     return _3b_({infixl: truncateMutArray({object: __array6
                                                                           ,stop: _2d_({infixl: length6
                                                                                       ,infixr: 1.0})})
                                                 ,infixr: function (local_570) {
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
var sequence = function (stream9) {
   return foldLazy({stream: stream9
                   ,initial: function (local_578) {
                      return __return({tag: "empty",data: {}});
                   }
                   ,binop: function (local_579) {
                      return _3b_({infixl: local_579.item
                                  ,infixr: function (local_580) {
                                     return _3b_({infixl: local_579.rest({})
                                                 ,infixr: function (local_581) {
                                                    return __return({tag: "nonEmpty"
                                                                    ,data: {head: local_580
                                                                           ,tail: function (local_582) {
                                                                              return local_581;
                                                                           }}});
                                                 }});
                                  }});
                   }});
};
var find1 = function (local_594) {
   return first({that: function (local_595) {
                   return _3d__3d_({infixl: byteAt({index: local_595
                                                   ,object: local_594.__bytes})
                                   ,infixr: local_594.byte});
                }
                ,stream: _2e__2e_({start: local_594.start
                                  ,stop: length(local_594.__bytes)})});
};
var unsuffixed = function (local_601) {
   var x = isSuffixOf({suffix: local_601.suffix,whole: local_601.whole});
   switch (x.tag)
   {
     case "false":
       var local_602 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_603 = x.data;
       return {tag: "just"
              ,data: slice1({object: local_601.whole
                            ,start: 0.0
                            ,stop: _2d_({infixl: length(local_601.whole)
                                        ,infixr: length(local_601.suffix)})})};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6c2d206c45c348b3b8e2bbfdae7bde35"
                                    ,"7d90a0e076a149c4443b780b21470ef3");
   }
};
var removeSuffix = function (local_600) {
   var x = unsuffixed({suffix: local_600.suffix,whole: local_600.whole});
   switch (x.tag)
   {
     case "just":
       return id2(x.data);
     case "nothing":
       var local_604 = x.data;
       return local_600.whole;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8c9d00ae73ab41ca903aa34ee4c6601a"
                                    ,"97a63e2f16bd481c6e64fd0c8a6d92fa");
   }
};
var packetsEndWith = function (local_608) {
   var x = _3d__3d_({infixl: local_608.stop,infixr: 0.0});
   switch (x.tag)
   {
     case "false":
       var local_609 = x.data;
       return _3b_({infixl: readMutArray({index: _2d_({infixl: local_608.stop
                                                      ,infixr: 1.0})
                                         ,object: local_608.packets1})
                   ,infixr: function (packet1) {
                      var x = isSuffixOf({suffix: local_608.suffix,whole: packet1});
                      switch (x.tag)
                      {
                        case "false":
                          var local_610 = x.data;
                          var x = unsuffixed({suffix: packet1,whole: local_608.suffix});
                          switch (x.tag)
                          {
                            case "just":
                              var remain1 = x.data;
                              return packetsEndWith({suffix: remain1
                                                    ,stop: _2d_({infixl: local_608.stop
                                                                ,infixr: 1.0})
                                                    ,packets1: local_608.packets1});
                            case "nothing":
                              var local_611 = x.data;
                              return __return({tag: "false",data: {}});
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                           ,"0d0804c08ad23d9eed424fc83122d6dc");
                          }
                        case "true":
                          var local_612 = x.data;
                          return __return({tag: "true",data: {}});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                       ,"49052b2836be0b25cb20bc95d00972ca");
                      }
                   }});
     case "true":
       var local_613 = x.data;
       return __return({tag: "false",data: {}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a2f069d7413941fdafe42795f6970175"
                                    ,"ae670587961cb7d305eef1133a3bbc18");
   }
};
var parseHttpHeaderPacket = function (local_593) {
   var x = find1({start: local_593.start,__bytes: local_593.newPacket,byte: 10.0});
   switch (x.tag)
   {
     case "just":
       var lfPos = x.data;
       var after = _2b_({infixl: lfPos,infixr: 1.0});
       return _3b_({infixl: length4(local_593.packets1)
                   ,infixr: function (packetIdx) {
                      var done1 = function (local_596) {
                         return _3b_({infixl: sequence(map({stream: _2e__2e_({start: 0.0
                                                                             ,stop: packetIdx})
                                                           ,mapping: function (i) {
                                                              return readMutArray({index: i
                                                                                  ,object: local_593.packets1});
                                                           }}))
                                     ,infixr: function (local_597) {
                                        var headerBytes =
                                        concat2(_2b__2b_2({infixl: local_597
                                                          ,infixr: function (local_598) {
                                                             return _3a__3a_({infixl: slice1({object: local_593.newPacket
                                                                                             ,start: 0.0
                                                                                             ,stop: lfPos})
                                                                             ,infixr: function (local_599) {
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
                                        return _3b_({infixl: truncateMutArray({object: local_593.packets1
                                                                              ,stop: 0.0})
                                                    ,infixr: function (local_605) {
                                                       return _3b_({infixl: appendMutArray({object: local_593.packets1
                                                                                           ,value: slice1({object: local_593.newPacket
                                                                                                          ,start: after
                                                                                                          ,stop: length(local_593.newPacket)})})
                                                                   ,infixr: function (local_606) {
                                                                      return __return({tag: "just"
                                                                                      ,data: headerLines});
                                                                   }});
                                                    }});
                                     }});
                      };
                      var prevEndsWith = function (local_607) {
                         return packetsEndWith({suffix: local_607
                                               ,stop: packetIdx
                                               ,packets1: local_593.packets1});
                      };
                      var next1 = function (local_614) {
                         return parseHttpHeaderPacket({start: after
                                                      ,newPacket: local_593.newPacket
                                                      ,packets1: local_593.packets1});
                      };
                      var x = _3d__3d_({infixl: lfPos,infixr: 0.0});
                      switch (x.tag)
                      {
                        case "false":
                          var local_615 = x.data;
                          var prevByte = byteAt({index: _2d_({infixl: lfPos,infixr: 1.0})
                                                ,object: local_593.newPacket});
                          var x = _3d__3d_({infixl: prevByte,infixr: 10.0});
                          switch (x.tag)
                          {
                            case "false":
                              var local_616 = x.data;
                              var x = _3d__3d_({infixl: prevByte,infixr: 13.0});
                              switch (x.tag)
                              {
                                case "false":
                                  return next1(x.data);
                                case "true":
                                  var local_617 = x.data;
                                  var x = _3d__3d_({infixl: lfPos,infixr: 1.0});
                                  switch (x.tag)
                                  {
                                    case "false":
                                      var local_618 = x.data;
                                      var x =
                                      _3d__3d_({infixl: byteAt({index: _2d_({infixl: lfPos
                                                                            ,infixr: 2.0})
                                                               ,object: local_593.newPacket})
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
                                      var local_619 = x.data;
                                      return _3b_({infixl: prevEndsWith(rts.bytes([10]))
                                                  ,infixr: function (local_620) {
                                                     var x = local_620;
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
                          var local_621 = x.data;
                          return _3b_({infixl: prevEndsWith(rts.bytes([10]))
                                      ,infixr: function (local_622) {
                                         var x = local_622;
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_623 = x.data;
                                             return _3b_({infixl: prevEndsWith(rts.bytes([10
                                                                                         ,13]))
                                                         ,infixr: function (local_624) {
                                                            var x = local_624;
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
       var local_625 = x.data;
       return _3b_({infixl: appendMutArray({object: local_593.packets1
                                           ,value: local_593.newPacket})
                   ,infixr: function (local_626) {
                      return __return({tag: "nothing",data: {}});
                   }});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                    ,"a641e1eefdb6d290e8f5e30eb99ae939");
   }
};
var requestHeaderIndex = function (x629) {
   switch (x629.tag)
   {
     case "referer":
       var local_630 = x629.data;
       return 9.0;
     case "range":
       var local_631 = x629.data;
       return 4.0;
     case "contentLength":
       var local_632 = x629.data;
       return 0.0;
     case "connection":
       var local_633 = x629.data;
       return 3.0;
     case "host":
       var local_634 = x629.data;
       return 5.0;
     case "userAgent":
       var local_635 = x629.data;
       return 10.0;
     case "ifModifiedSince":
       var local_636 = x629.data;
       return 6.0;
     case "ifRange":
       var local_637 = x629.data;
       return 8.0;
     case "count":
       var local_638 = x629.data;
       return 11.0;
     case "transferEncoding":
       var local_639 = x629.data;
       return 1.0;
     case "expect":
       var local_640 = x629.data;
       return 2.0;
     case "ifUnmodifiedSince":
       var local_641 = x629.data;
       return 7.0;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_1b4c5f4e650b40db91d34fcbb46eedcc"
                                    ,"2d1d3f6c02b34a16b1ecc9cff08b339e");
   }
};
var toLower8 = function (local_644) {
   var x = _7c__7c_({infixl: _26__26_({infixl: _2264_({infixl: 65.0,infixr: local_644})
                                      ,infixr: function (local_645) {
                                         return _2264_({infixl: local_644,infixr: 90.0});
                                      }})
                    ,infixr: function (local_646) {
                       return _26__26_({infixl: _2264_({infixl: 192.0,infixr: local_644})
                                       ,infixr: function (local_647) {
                                          return _26__26_({infixl: _2264_({infixl: local_644
                                                                          ,infixr: 222.0})
                                                          ,infixr: function (local_648) {
                                                             return _2260_({infixl: local_644
                                                                           ,infixr: 215.0});
                                                          }});
                                       }});
                    }});
   switch (x.tag)
   {
     case "false":
       var local_649 = x.data;
       return local_644;
     case "true":
       var local_650 = x.data;
       return _2b_({infixl: local_644,infixr: 32.0});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d53402309e2246e0acda443ccc6735f8"
                                    ,"26914d49ae6cd50363dc7b55bd37d4d5");
   }
};
var numHeadItems = function (local_654) {
   return foldLazy({stream: local_654.stream
                   ,initial: function (local_655) {
                      return id2;
                   }
                   ,binop: function (local_656) {
                      return function (local_657) {
                             var x = local_654.that(local_656.item);
                             switch (x.tag)
                             {
                               case "false":
                                 var local_658 = x.data;
                                 return local_657;
                               case "true":
                                 var local_659 = x.data;
                                 return local_656.rest({})(_2b_({infixl: local_657
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
   var withLower = function (local_643) {
      return {headerNameOrig: local_643
             ,headerNameLower: toBytes(toArray(map({stream: fromBytes(local_643)
                                                   ,mapping: toLower8})))};
   };
   var x = find1({start: 0.0,__bytes: line2,byte: 58.0});
   switch (x.tag)
   {
     case "just":
       var local_651 = x.data;
       var x = Object.assign({__data: function (local_652) {
                               return slice1({object: line2
                                             ,start: _2b_({infixl: _2b_({infixl: local_651
                                                                        ,infixr: 1.0})
                                                          ,infixr: numHeadItems({that: function (c) {
                                                                                   return _7c__7c_({infixl: _3d__3d_({infixl: c
                                                                                                                     ,infixr: 32.0})
                                                                                                   ,infixr: function (local_653) {
                                                                                                      return _3d__3d_({infixl: c
                                                                                                                      ,infixr: 9.0});
                                                                                                   }});
                                                                                }
                                                                                ,stream: fromBytes(slice1({object: line2
                                                                                                          ,start: _2b_({infixl: local_651
                                                                                                                       ,infixr: 1.0})
                                                                                                          ,stop: local_652}))})})
                                             ,stop: local_652});
                            }(length(line2))}
                            ,withLower(slice1({object: line2
                                              ,start: 0.0
                                              ,stop: local_651})));
       delete x.cacheId;
       return x;
     case "nothing":
       var local_660 = x.data;
       var x = Object.assign({__data: rts.bytesFromAscii("")},withLower(line2));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_24c62861bfb940e4addebcc337a003f8"
                                    ,"2fd2696b8bb145a1f8ea35cf6754cfb8");
   }
};
var requestHeaderIndexFromText = function (local_662) {
   var local_663 = length(local_662);
   var test = function (local_664) {
      var x = _3d__3d_({infixl: local_662,infixr: local_664.text});
      switch (x.tag)
      {
        case "false":
          var local_665 = x.data;
          return {tag: "nothing",data: {}};
        case "true":
          var local_666 = x.data;
          return {tag: "just",data: requestHeaderIndex(local_664.value)};
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                       ,"dc1fada55c8b610b4ec39d131179bc92");
      }
   };
   var x = _3d__3d_({infixl: local_663,infixr: 4.0});
   switch (x.tag)
   {
     case "false":
       var local_667 = x.data;
       var x = _3d__3d_({infixl: local_663,infixr: 5.0});
       switch (x.tag)
       {
         case "false":
           var local_668 = x.data;
           var x = _3d__3d_({infixl: local_663,infixr: 6.0});
           switch (x.tag)
           {
             case "false":
               var local_669 = x.data;
               var x = _3d__3d_({infixl: local_663,infixr: 7.0});
               switch (x.tag)
               {
                 case "false":
                   var local_670 = x.data;
                   var x = _3d__3d_({infixl: local_663,infixr: 8.0});
                   switch (x.tag)
                   {
                     case "false":
                       var local_671 = x.data;
                       var x = _3d__3d_({infixl: local_663,infixr: 10.0});
                       switch (x.tag)
                       {
                         case "false":
                           var local_672 = x.data;
                           var x = _3d__3d_({infixl: local_663,infixr: 14.0});
                           switch (x.tag)
                           {
                             case "false":
                               var local_673 = x.data;
                               var x = _3d__3d_({infixl: local_663,infixr: 17.0});
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_674 = x.data;
                                   var x = _3d__3d_({infixl: local_663,infixr: 19.0});
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_675 = x.data;
                                       return {tag: "nothing",data: {}};
                                     case "true":
                                       var local_676 = x.data;
                                       return test({text: rts.bytesFromAscii("if-unmodified-since")
                                                   ,value: {tag: "ifUnmodifiedSince"
                                                           ,data: {}}});
                                     default:
                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                    ,"f8cf9e99c6ebab86468dac6f079e1d43");
                                   }
                                 case "true":
                                   var local_677 = x.data;
                                   var x = _3d__3d_({infixl: local_662
                                                    ,infixr: rts.bytesFromAscii("transfer-encoding")});
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_678 = x.data;
                                       var x = _3d__3d_({infixl: local_662
                                                        ,infixr: rts.bytesFromAscii("if-modified-since")});
                                       switch (x.tag)
                                       {
                                         case "false":
                                           var local_679 = x.data;
                                           return {tag: "nothing",data: {}};
                                         case "true":
                                           var local_680 = x.data;
                                           return {tag: "just"
                                                  ,data: requestHeaderIndex({tag: "ifModifiedSince"
                                                                            ,data: {}})};
                                         default:
                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                        ,"5c9b7e120cfcbfe66378a56aa55e1554");
                                       }
                                     case "true":
                                       var local_681 = x.data;
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
                               var local_682 = x.data;
                               return test({text: rts.bytesFromAscii("content-length")
                                           ,value: {tag: "contentLength",data: {}}});
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                            ,"316352807090bd4b8e1627c428b18ad0");
                           }
                         case "true":
                           var local_683 = x.data;
                           var x = _3d__3d_({infixl: local_662
                                            ,infixr: rts.bytesFromAscii("user-agent")});
                           switch (x.tag)
                           {
                             case "false":
                               var local_684 = x.data;
                               var x = _3d__3d_({infixl: local_662
                                                ,infixr: rts.bytesFromAscii("connection")});
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_685 = x.data;
                                   return {tag: "nothing",data: {}};
                                 case "true":
                                   var local_686 = x.data;
                                   return {tag: "just"
                                          ,data: requestHeaderIndex({tag: "connection"
                                                                    ,data: {}})};
                                 default:
                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                ,"0a18521fa15139803614889d5ac640f3");
                               }
                             case "true":
                               var local_687 = x.data;
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
                       var local_688 = x.data;
                       return test({text: rts.bytesFromAscii("if-range")
                                   ,value: {tag: "ifRange",data: {}}});
                     default:
                       throw rts.exceptions.LamduBug("Unhandled case"
                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                    ,"0c12468dbe34d1382d0b97b93b5cab94");
                   }
                 case "true":
                   var local_689 = x.data;
                   return test({text: rts.bytesFromAscii("referer")
                               ,value: {tag: "referer",data: {}}});
                 default:
                   throw rts.exceptions.LamduBug("Unhandled case"
                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                ,"13eb12f71c41a5c676528975f4cd2d8f");
               }
             case "true":
               var local_690 = x.data;
               return test({text: rts.bytesFromAscii("expect")
                           ,value: {tag: "expect",data: {}}});
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                            ,"a709b7964f58d9b479a336260545d465");
           }
         case "true":
           var local_691 = x.data;
           return test({text: rts.bytesFromAscii("range")
                       ,value: {tag: "range",data: {}}});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                        ,"1d20a17a150e74e964a7731e9e75cc90");
       }
     case "true":
       var local_692 = x.data;
       return test({text: rts.bytesFromAscii("host"),value: {tag: "host",data: {}}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                    ,"b082b30c0d03c8abd35416fd055c4e65");
   }
};
var parseHeaders = function (local_628) {
   var headersArr1 = runMutArray(_3b_({infixl: newMutArray
                                      ,infixr: function (headersArr) {
                                         return _3b_({infixl: sequence__(replicate({count: requestHeaderIndex({tag: "count"
                                                                                                              ,data: {}})
                                                                                   ,item: appendMutArray({object: headersArr
                                                                                                         ,value: {tag: "nothing"
                                                                                                                 ,data: {}}})}))
                                                     ,infixr: function (local_642) {
                                                        return _3b_({infixl: sequence__(map({stream: _2e__2e_({start: 1.0
                                                                                                              ,stop: length1(local_628)})
                                                                                            ,mapping: function (i1) {
                                                                                               var local_661 =
                                                                                               parseHeader(item1({index: i1
                                                                                                                 ,object: local_628}));
                                                                                               var mIdx =
                                                                                               requestHeaderIndexFromText(local_661.headerNameLower);
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
                                                                                                                      var local_693 =
                                                                                                                      x.data;
                                                                                                                      throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                                                                                      ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                      ,"0ba4efe1ab9b937a5c4c329950c130eb");
                                                                                                                    case "nothing":
                                                                                                                      var local_694 =
                                                                                                                      x.data;
                                                                                                                      return writeMutArray({index: index8
                                                                                                                                           ,object: headersArr
                                                                                                                                           ,value: {tag: "just"
                                                                                                                                                   ,data: local_661.__data}});
                                                                                                                    default:
                                                                                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                   ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                   ,"46e58c07915691b0449b51e2c57e8c26");
                                                                                                                  }
                                                                                                               }});
                                                                                                 case "nothing":
                                                                                                   var local_695 =
                                                                                                   x.data;
                                                                                                   return __return({});
                                                                                                 default:
                                                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                ,"96d7c2e4942aa324705674b28c8d8892");
                                                                                               }
                                                                                            }}))
                                                                    ,infixr: function (local_696) {
                                                                       return __return(headersArr);
                                                                    }});
                                                     }});
                                      }}));
   var value2 = function (hdr) {
      return item1({index: requestHeaderIndex(hdr),object: headersArr1});
   };
   return {referer: value2({tag: "referer",data: {}})
          ,range: value2({tag: "range",data: {}})
          ,contentLength: value2({tag: "contentLength",data: {}})
          ,connection: value2({tag: "connection",data: {}})
          ,host: value2({tag: "host",data: {}})
          ,userAgent: value2({tag: "userAgent",data: {}})
          ,ifModifiedSince: value2({tag: "ifModifiedSince",data: {}})
          ,ifRange: value2({tag: "ifRange",data: {}})
          ,transferEncoding: value2({tag: "transferEncoding",data: {}})
          ,expect: value2({tag: "expect",data: {}})
          ,ifUnmodifiedSince: value2({tag: "ifUnmodifiedSince",data: {}})};
};
var parseHttpVersion = function (local_700) {
   var x = _26__26_({infixl: _3d__3d_({infixl: slice1({object: local_700
                                                      ,start: 0.0
                                                      ,stop: 5.0})
                                      ,infixr: rts.bytesFromAscii("HTTP/")})
                    ,infixr: function (local_701) {
                       return _26__26_({infixl: _3d__3d_({infixl: slice1({object: local_700
                                                                         ,start: 6.0
                                                                         ,stop: 7.0})
                                                         ,infixr: rts.bytesFromAscii(".")})
                                       ,infixr: function (local_702) {
                                          return _2265_({infixl: length(local_700)
                                                        ,infixr: 8.0});
                                       }});
                    }});
   switch (x.tag)
   {
     case "false":
       var local_703 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                       ,"d4d438d8b8c3035dd13c03c182e694f8");
     case "true":
       var local_704 = x.data;
       var majByte = byteAt({index: 5.0,object: local_700});
       var minByte = byteAt({index: 7.0,object: local_700});
       var x = _3d__3d_({infixl: majByte,infixr: 49.0});
       switch (x.tag)
       {
         case "false":
           var local_705 = x.data;
           var x = _26__26_({infixl: _3d__3d_({infixl: majByte,infixr: 50.0})
                            ,infixr: function (local_706) {
                               return _3d__3d_({infixl: minByte,infixr: 48.0});
                            }});
           switch (x.tag)
           {
             case "false":
               var local_707 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_708 = x.data;
               return {minor: 0.0,major: 2.0};
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                            ,"6d72ed51030c146e142824d8c5608502");
           }
         case "true":
           var local_709 = x.data;
           var x = _3d__3d_({infixl: minByte,infixr: 49.0});
           switch (x.tag)
           {
             case "false":
               var local_710 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_711 = x.data;
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
var parseHttpPathAndQuery = function (local_712) {
   var x = find1({start: 0.0,__bytes: local_712,byte: 63.0});
   switch (x.tag)
   {
     case "just":
       var queryStart = x.data;
       return {path: slice1({object: local_712,start: 0.0,stop: queryStart})
              ,query1: slice1({object: local_712
                              ,start: queryStart
                              ,stop: length(local_712)})};
     case "nothing":
       var local_713 = x.data;
       return {path: local_712,query1: rts.bytesFromAscii("")};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_e1ddf2e103fc4a77ba877761b12b0489"
                                    ,"7b5454e4261c24d201d9384e83ca385c");
   }
};
var parseRequestLine = function (local_697) {
   var parts4 = toArray(split({text: local_697,seperator: rts.bytesFromAscii(" ")}));
   var x = _3d__3d_({infixl: length1(parts4),infixr: 3.0});
   switch (x.tag)
   {
     case "false":
       var local_698 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                       ,"a7de8d96fb5e1479e6bb2a3ddb6eeaaa");
     case "true":
       var local_699 = x.data;
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
var unprefixed = function (local_720) {
   var x = isPrefixOf({whole: local_720.whole,prefix: local_720.prefix});
   switch (x.tag)
   {
     case "false":
       var local_721 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_722 = x.data;
       return {tag: "just"
              ,data: slice1({object: local_720.whole
                            ,start: length(local_720.prefix)
                            ,stop: length(local_720.whole)})};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_1d18b3f94ac64cc39b8dc131624a5e9f"
                                    ,"2de3ba5a8affabb154216378ec3580e6");
   }
};
var httpAddLocalPath = function (r) {
   var p = r.path;
   var nonEmpty1 = function (local_714) {
      var x = _3d__3d_({infixl: local_714,infixr: rts.bytesFromAscii("")});
      switch (x.tag)
      {
        case "false":
          var local_715 = x.data;
          return local_714;
        case "true":
          var local_716 = x.data;
          return rts.bytesFromAscii("/");
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_97b5de980c3149218877e33920fb5729"
                                       ,"5ae9e78cf85c5d6952c38eb479596553");
      }
   };
   var afterSlash = function (local_717) {
      return nonEmpty1(function () {
             var x = find1({start: 0.0,__bytes: local_717,byte: 47.0});
             switch (x.tag)
             {
               case "just":
                 var local_718 = x.data;
                 return slice1({object: local_717
                               ,start: local_718
                               ,stop: length(local_717)});
               case "nothing":
                 var local_719 = x.data;
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
                               var local_723 = x.data;
                               var x = unprefixed({whole: p
                                                  ,prefix: rts.bytesFromAscii("https://")});
                               switch (x.tag)
                               {
                                 case "just":
                                   return afterSlash(x.data);
                                 case "nothing":
                                   var local_724 = x.data;
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
var httpContinueMessage = function (local_727) {
   return concat2(_3a__3a_({infixl: function () {
                              var x = _3d__3d_({infixl: local_727
                                               ,infixr: {minor: 1.0,major: 1.0}});
                              switch (x.tag)
                              {
                                case "false":
                                  var local_728 = x.data;
                                  return rts.bytesFromAscii("HTTP/1.0");
                                case "true":
                                  var local_729 = x.data;
                                  return rts.bytesFromAscii("HTTP/1.1");
                                default:
                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                               ,"DEF_28b20b49b76041158f817cb6f1ae7069"
                                                               ,"7a33dc1474f28318b0a1a21410017295");
                              }
                           }()
                           ,infixr: function (local_730) {
                              return _3a__3a_({infixl: rts.bytesFromAscii(" 100 Continue")
                                              ,infixr: function (local_731) {
                                                 return _3a__3a_({infixl: rts.bytes([13
                                                                                    ,10
                                                                                    ,13
                                                                                    ,10])
                                                                 ,infixr: function (local_732) {
                                                                    return {tag: "empty"
                                                                           ,data: {}};
                                                                 }});
                                              }});
                           }}));
};
var parseHttpRequestPacket = function (local_567) {
   var parseRemain = _3b_({infixl: popLastMutArray(local_567.unparsedPackets1)
                          ,infixr: function (local_571) {
                             var x = local_571;
                             switch (x.tag)
                             {
                               case "just":
                                 var local_572 = x.data;
                                 return parseHttpRequestPacket({socket: local_567.socket
                                                               ,unparsedPackets1: local_567.unparsedPackets1
                                                               ,newPacket: local_572
                                                               ,stateRef1: local_567.stateRef1
                                                               ,handler: local_567.handler});
                               case "nothing":
                                 var local_573 = x.data;
                                 return __return({});
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                              ,"a71ca59bb3302212a2d667ac7d89c4e8");
                             }
                          }});
   return _3b_({infixl: readMutRef(local_567.stateRef1)
               ,infixr: function (x574) {
                  switch (x574.tag)
                  {
                    case "body":
                      var local_575 = x574.data;
                      var plen = length(local_567.newPacket);
                      var x = _3c_({infixl: plen,infixr: local_575.remain});
                      switch (x.tag)
                      {
                        case "false":
                          var local_576 = x.data;
                          return _3b_({infixl: length4(local_567.unparsedPackets1)
                                      ,infixr: function (numPackets) {
                                         return _3b_({infixl: sequence(map({stream: _2e__2e_({start: 0.0
                                                                                             ,stop: numPackets})
                                                                           ,mapping: function (local_577) {
                                                                              return readMutArray({index: local_577
                                                                                                  ,object: local_567.unparsedPackets1});
                                                                           }}))
                                                     ,infixr: function (packets) {
                                                        return _3b_({infixl: _3b_({infixl: truncateMutArray({object: local_567.unparsedPackets1
                                                                                                            ,stop: 0.0})
                                                                                  ,infixr: function (local_583) {
                                                                                     return local_567.handler({request1: function () {
                                                                                                                 var x =
                                                                                                                 Object.assign({body: {tag: "just"
                                                                                                                                      ,data: concat2(_2b__2b_2({infixl: packets
                                                                                                                                                               ,infixr: function (local_584) {
                                                                                                                                                                  return _3a__3a_({infixl: slice1({object: local_567.newPacket
                                                                                                                                                                                                  ,start: 0.0
                                                                                                                                                                                                  ,stop: local_575.remain})
                                                                                                                                                                                  ,infixr: function (local_585) {
                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                  }});
                                                                                                                                                               }}))}}
                                                                                                                              ,local_575.request1);
                                                                                                                 delete x.cacheId;
                                                                                                                 return x;
                                                                                                              }()
                                                                                                              ,socket: local_567.socket});
                                                                                  }})
                                                                    ,infixr: function (local_586) {
                                                                       return _3b_({infixl: writeMutRef({object: local_567.stateRef1
                                                                                                        ,value: {tag: "header"
                                                                                                                ,data: {}}})
                                                                                   ,infixr: function (local_587) {
                                                                                      var x =
                                                                                      _3c_({infixl: local_575.remain
                                                                                           ,infixr: plen});
                                                                                      switch (x.tag)
                                                                                      {
                                                                                        case "false":
                                                                                          var local_588 =
                                                                                          x.data;
                                                                                          return __return({});
                                                                                        case "true":
                                                                                          var local_589 =
                                                                                          x.data;
                                                                                          return parseHttpRequestPacket({socket: local_567.socket
                                                                                                                        ,unparsedPackets1: local_567.unparsedPackets1
                                                                                                                        ,newPacket: slice1({object: local_567.newPacket
                                                                                                                                           ,start: local_575.remain
                                                                                                                                           ,stop: plen})
                                                                                                                        ,stateRef1: local_567.stateRef1
                                                                                                                        ,handler: local_567.handler});
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
                          var local_590 = x.data;
                          return _3b_({infixl: appendMutArray({object: local_567.unparsedPackets1
                                                              ,value: local_567.newPacket})
                                      ,infixr: function (local_591) {
                                         return writeMutRef({object: local_567.stateRef1
                                                            ,value: {tag: "body"
                                                                    ,data: {request1: local_575.request1
                                                                           ,remain: _2d_({infixl: local_575.remain
                                                                                         ,infixr: plen})}}});
                                      }});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                       ,"4a7857b1e6dc15eee111f928eef30ceb");
                      }
                    case "header":
                      var local_592 = x574.data;
                      return _3b_({infixl: parseHttpHeaderPacket({start: 0.0
                                                                 ,newPacket: local_567.newPacket
                                                                 ,packets1: local_567.unparsedPackets1})
                                  ,infixr: function (local_627) {
                                     var x = local_627;
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
                                                            var local_725 = x.data;
                                                            return __return({});
                                                          case "true":
                                                            var local_726 = x.data;
                                                            return send({__data: httpContinueMessage(request2.httpVersion)
                                                                        ,socket: local_567.socket});
                                                          default:
                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                         ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                         ,"0010e59778d59572282a2dab5b43c99f");
                                                        }
                                                     }()
                                                     ,infixr: function (local_733) {
                                                        return _3b_({infixl: function () {
                                                                       var x =
                                                                       request2.headers.contentLength;
                                                                       switch (x.tag)
                                                                       {
                                                                         case "just":
                                                                           var lenText =
                                                                           x.data;
                                                                           return writeMutRef({object: local_567.stateRef1
                                                                                              ,value: {tag: "body"
                                                                                                      ,data: {request1: request2
                                                                                                             ,remain: parseInt(lenText)}}});
                                                                         case "nothing":
                                                                           var local_734 =
                                                                           x.data;
                                                                           return local_567.handler({request1: function () {
                                                                                                       var x =
                                                                                                       Object.assign({body: {tag: "nothing"
                                                                                                                            ,data: {}}}
                                                                                                                    ,request2);
                                                                                                       delete x.cacheId;
                                                                                                       return x;
                                                                                                    }()
                                                                                                    ,socket: local_567.socket});
                                                                         default:
                                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                        ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                        ,"c91c5cea0890a94419165f2c0e413659");
                                                                       }
                                                                    }()
                                                                    ,infixr: function (local_735) {
                                                                       return parseRemain;
                                                                    }});
                                                     }});
                                       case "nothing":
                                         var local_736 = x.data;
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
var parseHttpRequests = function (local_566) {
   return _3b_({infixl: newMutRef({tag: "header",data: {}})
               ,infixr: function (stateRef) {
                  return _3b_({infixl: newMutArray
                              ,infixr: function (unparsedPackets) {
                                 return __return(function (packet) {
                                        return parseHttpRequestPacket({socket: local_566.socket
                                                                      ,unparsedPackets1: unparsedPackets
                                                                      ,newPacket: packet
                                                                      ,stateRef1: stateRef
                                                                      ,handler: local_566.handler});
                                     });
                              }});
               }});
};
var openTcpServer = rts.builtins.IO.network["openTcpServer"];
var httpServer = function (local_556) {
   return openTcpServer({connectionHandler: function (socket) {
                           return parseHttpRequests({socket: socket
                                                    ,handler: function (local_557) {
                                                       return _3b_({infixl: local_556.handler(local_557.request1)
                                                                   ,infixr: function (response) {
                                                                      return send({__data: _2b__2b_1({a: join({texts: _3a__3a_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("HTTP/1.1")
                                                                                                                                                              ,infixr: function (local_558) {
                                                                                                                                                                 return _3a__3a_({infixl: showNum(response.status.code)
                                                                                                                                                                                 ,infixr: function (local_559) {
                                                                                                                                                                                    return _3a__3a_({infixl: response.status.message
                                                                                                                                                                                                    ,infixr: function (local_560) {
                                                                                                                                                                                                       return {tag: "empty"
                                                                                                                                                                                                              ,data: {}};
                                                                                                                                                                                                    }});
                                                                                                                                                                                 }});
                                                                                                                                                              }})
                                                                                                                                             ,seperator: rts.bytesFromAscii(" ")})
                                                                                                                               ,infixr: function (local_561) {
                                                                                                                                  return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Type: ")
                                                                                                                                                                    ,b: response.content.mimeType})
                                                                                                                                                  ,infixr: function (local_562) {
                                                                                                                                                     return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Length: ")
                                                                                                                                                                                       ,b: showNum(length(response.content.__data))})
                                                                                                                                                                     ,infixr: function (local_563) {
                                                                                                                                                                        return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                        ,infixr: function (local_564) {
                                                                                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                                           ,infixr: function (local_565) {
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
                        ,host: local_556.host
                        ,port: local_556.port});
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
