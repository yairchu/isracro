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
var _2b__2b_2 = function (local_121) {
   return foldLazy({list: local_121.infixl
                   ,initial: local_121.infixr
                   ,binop: function (local_122) {
                      return {tag: "nonEmpty"
                             ,data: {head: local_122.item,tail: local_122.rest}};
                   }});
};
var toBytes = rts.builtins.Bytes["fromArray"];
var _2b__2b_1 = function (local_119) {
   return toBytes(toArray(_2b__2b_2({infixl: fromBytes(local_119.a)
                                    ,infixr: function (local_120) {
                                       return fromBytes(local_119.b);
                                    }})));
};
var _2b__2b_ = function (local_116) {
   return _2b__2b_1({a: function (x117) {
                       return x117;
                    }(local_116.a)
                    ,b: function (x118) {
                       return x118;
                    }(local_116.b)});
};
var httpNotFound404 = function (local_115) {
   return {content: {__data: function (x123) {
                       return x123;
                    }(_2b__2b_({a: rts.bytesFromAscii("Not found: "),b: local_115}))
                    ,mimeType: rts.bytesFromAscii("text/plain")}
          ,status: {message: rts.bytesFromAscii("Not Found"),code: 404.0}};
};
var query = rts.builtins.IO.database.postgres["query"];
var _7c__7c_ = function (local_137) {
   var x = function (x138) { return x138;}(local_137.infixl);
   switch (x.tag)
   {
     case "false":
       return local_137.infixr(x.data);
     case "true":
       var local_139 = x.data;
       return {tag: "true",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_dff4e86e63c54fab8b58ab3fe7e440ad"
                                    ,"cc82dca9551140c9af0084b786718cc5");
   }
};
var anyOf = function (local_134) {
   return foldLazy({list: local_134.list
                   ,initial: function (local_135) {
                      return {tag: "false",data: {}};
                   }
                   ,binop: function (local_136) {
                      return _7c__7c_({infixl: local_134.satisfy(local_136.item)
                                      ,infixr: local_136.rest});
                   }});
};
var pestovalAuth = function (local_129) {
   return _3b_({infixl: query({database: local_129.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT pestoval_teacher.id, pestoval_teacher.is_admin\nFROM pestoval_teacher\nWHERE pestoval_teacher.password = \'")
                                                             ,b: local_129.password})
                                                ,b: rts.bytesFromAscii("\'")})})
               ,infixr: function (x130) {
                  switch (x130.tag)
                  {
                    case "error":
                      var local_131 = x130.data;
                      return ignoreError(local_131);
                    case "success":
                      var local_132 = x130.data;
                      return __return(function () {
                             var x = function (x140) {
                                        return x140;
                                     }(anyOf({list: fromArray(local_132.__data)
                                             ,satisfy: function (local_133) {
                                                return _3d__3d_({infixl: item({index: 1.0
                                                                              ,object: local_133})
                                                                ,infixr: rts.bytesFromAscii("true")});
                                             }}));
                             switch (x.tag)
                             {
                               case "false":
                                 var local_141 = x.data;
                                 var x = function (x144) {
                                            return x144;
                                         }(anyOf({list: fromArray(local_132.__data)
                                                 ,satisfy: function (local_142) {
                                                    var teacher =
                                                    parseInt(item({index: 0.0
                                                                  ,object: local_142}));
                                                    return anyOf({list: fromArray(local_129.teachers)
                                                                 ,satisfy: function (local_143) {
                                                                    return _3d__3d_({infixl: local_143.id
                                                                                    ,infixr: teacher});
                                                                 }});
                                                 }}));
                                 switch (x.tag)
                                 {
                                   case "false":
                                     var local_145 = x.data;
                                     return {tag: "unauthorized",data: {}};
                                   case "true":
                                     var local_146 = x.data;
                                     return {tag: "teacher",data: {}};
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                                  ,"63099f6a8ec233abc1896a5e6518eaf6");
                                 }
                               case "true":
                                 var local_147 = x.data;
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
var digitsLittleEndian = function (local_157) {
   return map({list: take({list: iterate({initial: local_157.__number
                                         ,next: function (local_158) {
                                            return _2f__2f_({infixl: local_158
                                                            ,infixr: local_157.base});
                                         }})
                          ,__while: function (local_159) {
                             return _2260_({infixl: local_159,infixr: 0.0});
                          }})
              ,mapping: function (local_160) {
                 return _25_({infixl: local_160,infixr: local_157.base});
              }});
};
var reverse = function (list2) {
   return fold({list: list2
               ,initial: {tag: "empty",data: {}}
               ,binop: function (local_161) {
                  return {tag: "nonEmpty"
                         ,data: {head: local_161.item
                                ,tail: function (local_162) {
                                   return local_161.acc;
                                }}};
               }});
};
var showNum = function (local_154) {
   var x = function (x155) { return x155;}(_3d__3d_({infixl: local_154,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_156 = x.data;
       return toBytes(toArray(map({list: reverse(digitsLittleEndian({__number: local_154
                                                                    ,base: 10.0}))
                                  ,mapping: function (local_163) {
                                     return _2b_({infixl: 48.0,infixr: local_163});
                                  }})));
     case "true":
       var local_164 = x.data;
       return rts.bytesFromAscii("0");
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8dc07f8cc25f46b2bd345789b6a59f4d"
                                    ,"39f9fdd2b9889a256be50861539f39e5");
   }
};
var concat = function (list3) {
   return foldLazy({list: list3
                   ,initial: function (local_181) {
                      return {tag: "empty",data: {}};
                   }
                   ,binop: function (local_182) {
                      return _2b__2b_2({infixl: local_182.item,infixr: local_182.rest});
                   }});
};
var intersperse = function (local_174) {
   var x = function (x175) { return x175;}(local_174.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_176 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_176.head
                     ,tail: function (local_177) {
                        return concat(map({list: local_176.tail({})
                                          ,mapping: function (local_178) {
                                             return {tag: "nonEmpty"
                                                    ,data: {head: local_174.item
                                                           ,tail: function (local_179) {
                                                              return {tag: "nonEmpty"
                                                                     ,data: {head: local_178
                                                                            ,tail: function (local_180) {
                                                                               return {tag: "empty"
                                                                                      ,data: {}};
                                                                            }}};
                                                           }}};
                                          }}));
                     }}};
     case "empty":
       var local_183 = x.data;
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
var join = function (local_173) {
   return concat1(intersperse({list: local_173.texts,item: local_173.seperator}));
};
var id = function (__x) { return __x;};
var maybe = function (local_202) {
   var x = function (x203) { return x203;}(local_202.object);
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_204 = x.data;
       return local_202.or;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6c78a9bb4dc7418b9c6fcbcdd77f4088"
                                    ,"df8546f58bdc08635e9f6ff7be4f4953");
   }
};
var queryFieldLang = function (language2) {
   var x = language2;
   switch (x.tag)
   {
     case "english":
       var local_194 = x.data;
       return function (local_195) {
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: local_195.table
                                                        ,b: rts.bytesFromAscii(".")})
                                           ,b: local_195.field})
                              ,b: function () {
                                 var x = function (x196) { return x196;}(local_195.as);
                                 switch (x.tag)
                                 {
                                   case "just":
                                     var local_197 = x.data;
                                     return _2b__2b_({a: rts.bytesFromAscii(" AS ")
                                                     ,b: local_197});
                                   case "nothing":
                                     var local_198 = x.data;
                                     return rts.bytesFromAscii("");
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                                                  ,"601b6d53f526392df53d629ee0c2ad71");
                                 }
                              }()});
           };
     case "hebrew":
       var local_199 = x.data;
       return function (local_200) {
              var local_201 = _2b__2b_({a: _2b__2b_({a: local_200.table
                                                    ,b: rts.bytesFromAscii(".")})
                                       ,b: local_200.field});
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("COALESCE(NULLIF(")
                                                                                  ,b: local_201})
                                                                     ,b: rts.bytesFromAscii("_hebrew, \'\'), ")})
                                                        ,b: local_201})
                                           ,b: rts.bytesFromAscii(") AS ")})
                              ,b: maybe({object: local_200.as,or: local_200.field})});
           };
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                    ,"77f1ffdc76bae5c4dbaf326aa2ff70a2");
   }
};
var pestovalQuerySessionsSql = function (local_187) {
   return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id,\n  pestoval_timeslot.id AS timeslot_id, pestoval_timeslot.start, pestoval_timeslot.stop,\n  pestoval_location.id AS location_id,\n  pestoval_level.id AS level_id, pestoval_level.color,")
                                ,infixr: function (local_188) {
                                   return _3a__3a_({infixl: join({texts: map({list: _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                      ,field: rts.bytesFromAscii("name")
                                                                                                      ,as: {tag: "just"
                                                                                                           ,data: rts.bytesFromAscii("session_name")}}
                                                                                             ,infixr: function (local_189) {
                                                                                                return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                         ,field: rts.bytesFromAscii("description")
                                                                                                                         ,as: {tag: "nothing"
                                                                                                                              ,data: {}}}
                                                                                                                ,infixr: function (local_190) {
                                                                                                                   return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                                            ,field: rts.bytesFromAscii("prereqs")
                                                                                                                                            ,as: {tag: "nothing"
                                                                                                                                                 ,data: {}}}
                                                                                                                                   ,infixr: function (local_191) {
                                                                                                                                      return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_location")
                                                                                                                                                               ,field: rts.bytesFromAscii("name")
                                                                                                                                                               ,as: {tag: "just"
                                                                                                                                                                    ,data: rts.bytesFromAscii("location_name")}}
                                                                                                                                                      ,infixr: function (local_192) {
                                                                                                                                                         return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_level")
                                                                                                                                                                                  ,field: rts.bytesFromAscii("name")
                                                                                                                                                                                  ,as: {tag: "just"
                                                                                                                                                                                       ,data: rts.bytesFromAscii("level_name")}}
                                                                                                                                                                         ,infixr: function (local_193) {
                                                                                                                                                                            return {tag: "empty"
                                                                                                                                                                                   ,data: {}};
                                                                                                                                                                         }});
                                                                                                                                                      }});
                                                                                                                                   }});
                                                                                                                }});
                                                                                             }})
                                                                             ,mapping: queryFieldLang(local_187.language)})
                                                                 ,seperator: rts.bytesFromAscii(", ")})
                                                   ,infixr: function (local_205) {
                                                      return _3a__3a_({infixl: local_187.from
                                                                      ,infixr: function (local_206) {
                                                                         return _2b__2b_2({infixl: map({list: _3a__3a_({infixl: {key: rts.bytesFromAscii("when_id")
                                                                                                                                ,table: rts.bytesFromAscii("pestoval_timeslot")}
                                                                                                                       ,infixr: function (local_207) {
                                                                                                                          return _3a__3a_({infixl: {key: rts.bytesFromAscii("location_id")
                                                                                                                                                   ,table: rts.bytesFromAscii("pestoval_location")}
                                                                                                                                          ,infixr: function (local_208) {
                                                                                                                                             return _3a__3a_({infixl: {key: rts.bytesFromAscii("level_id")
                                                                                                                                                                      ,table: rts.bytesFromAscii("pestoval_level")}
                                                                                                                                                             ,infixr: function (local_209) {
                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                       ,data: {}};
                                                                                                                                                             }});
                                                                                                                                          }});
                                                                                                                       }})
                                                                                                       ,mapping: function (local_210) {
                                                                                                          return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("LEFT OUTER JOIN ")
                                                                                                                                       ,infixr: function (local_211) {
                                                                                                                                          return _3a__3a_({infixl: local_210.table
                                                                                                                                                          ,infixr: function (local_212) {
                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(" ON pestoval_session.")
                                                                                                                                                                             ,infixr: function (local_213) {
                                                                                                                                                                                return _3a__3a_({infixl: local_210.key
                                                                                                                                                                                                ,infixr: function (local_214) {
                                                                                                                                                                                                   return _3a__3a_({infixl: rts.bytesFromAscii(" = ")
                                                                                                                                                                                                                   ,infixr: function (local_215) {
                                                                                                                                                                                                                      return _3a__3a_({infixl: local_210.table
                                                                                                                                                                                                                                      ,infixr: function (local_216) {
                                                                                                                                                                                                                                         return _3a__3a_({infixl: rts.bytesFromAscii(".id")
                                                                                                                                                                                                                                                         ,infixr: function (local_217) {
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
                                                                                          ,infixr: function (local_218) {
                                                                                             return _2b__2b_2({infixl: function () {
                                                                                                                 var x =
                                                                                                                 function (x219) {
                                                                                                                    return x219;
                                                                                                                 }(_3d__3d_({infixl: local_187.where
                                                                                                                            ,infixr: rts.bytesFromAscii("")}));
                                                                                                                 switch (x.tag)
                                                                                                                 {
                                                                                                                   case "false":
                                                                                                                     var local_220 =
                                                                                                                     x.data;
                                                                                                                     return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("WHERE ")
                                                                                                                                                       ,b: local_187.where})
                                                                                                                                     ,infixr: function (local_221) {
                                                                                                                                        return {tag: "empty"
                                                                                                                                               ,data: {}};
                                                                                                                                     }});
                                                                                                                   case "true":
                                                                                                                     var local_222 =
                                                                                                                     x.data;
                                                                                                                     return {tag: "empty"
                                                                                                                            ,data: {}};
                                                                                                                   default:
                                                                                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                  ,"DEF_140efbae773e4fea9f554e346c7b58e8"
                                                                                                                                                  ,"f573ad31abd803e9dda9e82ec3ef4df2");
                                                                                                                 }
                                                                                                              }()
                                                                                                              ,infixr: function (local_223) {
                                                                                                                 return _3a__3a_({infixl: rts.bytesFromAscii("ORDER BY pestoval_timeslot.start, pestoval_location.id")
                                                                                                                                 ,infixr: function (local_224) {
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
                              ,infixr: function (local_235) {
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
var sort1 = function (local_237) {
   var x = function (x238) {
              return x238;
           }(_2265_({infixl: _2b_({infixl: local_237.start,infixr: 1.0})
                    ,infixr: local_237.stop}));
   switch (x.tag)
   {
     case "false":
       var local_239 = x.data;
       return _3b_({infixl: readMutArray({index: local_237.start
                                         ,object: local_237.__array})
                   ,infixr: function (pivot) {
                      return _3b_({infixl: newMutRef(local_237.start)
                                  ,infixr: function (pivotPosRef) {
                                     return _3b_({infixl: sequence__(map({list: _2e__2e_({start: _2b_({infixl: local_237.start
                                                                                                      ,infixr: 1.0})
                                                                                         ,stop: local_237.stop})
                                                                         ,mapping: function (index) {
                                                                            return _3b_({infixl: readMutArray({index: index
                                                                                                              ,object: local_237.__array})
                                                                                        ,infixr: function (object) {
                                                                                           var x =
                                                                                           function (x240) {
                                                                                              return x240;
                                                                                           }(local_237._3c_({infixl: object
                                                                                                            ,infixr: pivot}));
                                                                                           switch (x.tag)
                                                                                           {
                                                                                             case "false":
                                                                                               var local_241 =
                                                                                               x.data;
                                                                                               return __return({});
                                                                                             case "true":
                                                                                               var local_242 =
                                                                                               x.data;
                                                                                               return _3b_({infixl: readMutRef(pivotPosRef)
                                                                                                           ,infixr: function (pivotPos) {
                                                                                                              return _3b_({infixl: writeMutArray({index: pivotPos
                                                                                                                                                 ,object: local_237.__array
                                                                                                                                                 ,value: object})
                                                                                                                          ,infixr: function (local_243) {
                                                                                                                             var newPivotPos =
                                                                                                                             _2b_({infixl: pivotPos
                                                                                                                                  ,infixr: 1.0});
                                                                                                                             return _3b_({infixl: writeMutRef({object: pivotPosRef
                                                                                                                                                              ,value: newPivotPos})
                                                                                                                                         ,infixr: function (local_244) {
                                                                                                                                            return _3b_({infixl: readMutArray({index: newPivotPos
                                                                                                                                                                              ,object: local_237.__array})
                                                                                                                                                        ,infixr: function (local_245) {
                                                                                                                                                           return writeMutArray({index: index
                                                                                                                                                                                ,object: local_237.__array
                                                                                                                                                                                ,value: local_245});
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
                                                 ,infixr: function (local_246) {
                                                    return _3b_({infixl: readMutRef(pivotPosRef)
                                                                ,infixr: function (index1) {
                                                                   return _3b_({infixl: writeMutArray({index: index1
                                                                                                      ,object: local_237.__array
                                                                                                      ,value: pivot})
                                                                               ,infixr: function (local_247) {
                                                                                  return _3b_({infixl: sort1({start: local_237.start
                                                                                                             ,stop: index1
                                                                                                             ,_3c_: local_237._3c_
                                                                                                             ,__array: local_237.__array})
                                                                                              ,infixr: function (local_248) {
                                                                                                 return sort1({start: _2b_({infixl: index1
                                                                                                                           ,infixr: 1.0})
                                                                                                              ,stop: local_237.stop
                                                                                                              ,_3c_: local_237._3c_
                                                                                                              ,__array: local_237.__array});
                                                                                              }});
                                                                               }});
                                                                }});
                                                 }});
                                  }});
                   }});
     case "true":
       var local_249 = x.data;
       return __return({});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_7dc48073b9e642f0921b10b11676f38b"
                                    ,"767c3133b4f8a61071c98bc4f445f9a6");
   }
};
var sort = function (local_234) {
   return runMutArray(_3b_({infixl: newMutArray1(local_234.list)
                           ,infixr: function (__array3) {
                              return _3b_({infixl: length4(__array3)
                                          ,infixr: function (local_236) {
                                             return _3b_({infixl: sort1({start: 0.0
                                                                        ,stop: local_236
                                                                        ,_3c_: local_234._3c_
                                                                        ,__array: __array3})
                                                         ,infixr: function (local_250) {
                                                            return __return(__array3);
                                                         }});
                                          }});
                           }}));
};
var foldLazy1 = function (local_269) {
   return foldLazy({list: local_269.list
                   ,initial: function (local_270) {
                      return local_269.done;
                   }
                   ,binop: function (local_271) {
                      return function (state) {
                             return local_269.step({state: state
                                                   ,rest: local_271.rest
                                                   ,item: local_271.item});
                          };
                   }})(local_269.initialState);
};
var group = function (local_252) {
   return foldLazy1({list: local_252.list
                    ,initialState: {tag: "empty",data: {}}
                    ,step: function (local_253) {
                       var x = function (x254) { return x254;}(local_253.state);
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_255 = x.data;
                           var x = function (x256) {
                                      return x256;
                                   }(local_252.by({infixl: local_255.head
                                                  ,infixr: local_253.item}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_257 = x.data;
                               return _3a__3a_({infixl: toArray(reverse(local_253.state))
                                               ,infixr: function (local_258) {
                                                  return local_253.rest({})(_3a__3a_({infixl: local_253.item
                                                                                     ,infixr: function (local_259) {
                                                                                        return {tag: "empty"
                                                                                               ,data: {}};
                                                                                     }}));
                                               }});
                             case "true":
                               var local_260 = x.data;
                               return local_253.rest({})(_3a__3a_({infixl: local_253.item
                                                                  ,infixr: function (local_261) {
                                                                     return local_253.state;
                                                                  }}));
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                            ,"80c64c4a3e825d563e72c3ff848be12a");
                           }
                         case "empty":
                           var local_262 = x.data;
                           return local_253.rest({})(_3a__3a_({infixl: local_253.item
                                                              ,infixr: function (local_263) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }}));
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                        ,"74a01a012e28a30393aafbb0e69c22f4");
                       }
                    }
                    ,done: function (local_264) {
                       var x = function (x265) { return x265;}(local_264);
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_266 = x.data;
                           return _3a__3a_({infixl: toArray(reverse(local_264))
                                           ,infixr: function (local_267) {
                                              return {tag: "empty",data: {}};
                                           }});
                         case "empty":
                           var local_268 = x.data;
                           return {tag: "empty",data: {}};
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                        ,"44a912bc33ec9c258e1ba58d8731bdd8");
                       }
                    }});
};
var pestovalQuerySessionTeachers = function (local_228) {
   return _3b_({infixl: query({database: local_228.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_session_teachers.teacher_id, pestoval_session_teachers.session_id,\n  ")
                                                             ,b: queryFieldLang(local_228.language)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_teacher ON pestoval_session_teachers.teacher_id = pestoval_teacher.id")})})
               ,infixr: function (x229) {
                  switch (x229.tag)
                  {
                    case "error":
                      var local_230 = x229.data;
                      return ignoreError(local_230);
                    case "success":
                      var local_231 = x229.data;
                      return __return(toArray(map({list: group({list: fromArray(sort({list: map({list: fromArray(local_231.__data)
                                                                                                ,mapping: function (local_232) {
                                                                                                   return {teacher: {name: item({index: 2.0
                                                                                                                                ,object: local_232})
                                                                                                                    ,id: parseInt(item({index: 0.0
                                                                                                                                       ,object: local_232}))}
                                                                                                          ,session: parseInt(item({index: 1.0
                                                                                                                                  ,object: local_232}))};
                                                                                                }})
                                                                                     ,_3c_: function (local_233) {
                                                                                        return _3c_({infixl: local_233.infixl.session
                                                                                                    ,infixr: local_233.infixr.session});
                                                                                     }}))
                                                               ,by: function (local_251) {
                                                                  return _3d__3d_({infixl: local_251.infixl.session
                                                                                  ,infixr: local_251.infixr.session});
                                                               }})
                                                  ,mapping: function (local_272) {
                                                     return {value: toArray(map({list: fromArray(local_272)
                                                                                ,mapping: function (local_273) {
                                                                                   return local_273.teacher;
                                                                                }}))
                                                            ,key: item({index: 0.0
                                                                       ,object: local_272}).session};
                                                  }})));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_de80144d74df47438852d18bad3b3eaf"
                                                   ,"9800f3fc1326d8ea5b4af24b15b823d4");
                  }
               }});
};
var _3e__3d__3c_ = function (local_281) {
   var x = function (x282) {
              return x282;
           }(_3d__3d_({infixl: local_281.__x,infixr: local_281.y}));
   switch (x.tag)
   {
     case "false":
       var local_283 = x.data;
       var x = function (x284) {
                  return x284;
               }(_3c_({infixl: local_281.__x,infixr: local_281.y}));
       switch (x.tag)
       {
         case "false":
           var local_285 = x.data;
           return {tag: "_3e_",data: {}};
         case "true":
           var local_286 = x.data;
           return {tag: "_3c_",data: {}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_710304e7117b480ba76d20139b3980c1"
                                        ,"b36d82ac26521ea940b13add4c373a2c");
       }
     case "true":
       var local_287 = x.data;
       return {tag: "_3d__3d_",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_710304e7117b480ba76d20139b3980c1"
                                    ,"508e7c4e652cf07b779c96cd2344172c");
   }
};
var _2f_ = rts.builtins.Prelude["/"];
var floor = function (local_292) {
   return _2d_({infixl: local_292,infixr: _25_({infixl: local_292,infixr: 1.0})});
};
var search1 = function (local_289) {
   var x = function (x290) {
              return x290;
           }(_2265_({infixl: local_289.start,infixr: local_289.stop}));
   switch (x.tag)
   {
     case "false":
       var local_291 = x.data;
       var pivot1 = floor(_2f_({infixl: _2b_({infixl: local_289.start
                                             ,infixr: local_289.stop})
                               ,infixr: 2.0}));
       var x = local_289.compareTo(pivot1);
       switch (x.tag)
       {
         case "_3e_":
           var local_293 = x.data;
           return search1({start: _2b_({infixl: pivot1,infixr: 1.0})
                          ,stop: local_289.stop
                          ,compareTo: local_289.compareTo});
         case "_3c_":
           var local_294 = x.data;
           return search1({start: local_289.start
                          ,stop: pivot1
                          ,compareTo: local_289.compareTo});
         case "_3d__3d_":
           var local_295 = x.data;
           return {tag: "just",data: pivot1};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                        ,"c6c8b9c428c0b8b42ffc038b0554d06b");
       }
     case "true":
       var local_296 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                    ,"c22774ac01ba95da7d4aa96a5694962d");
   }
};
var search = function (local_288) {
   return search1({start: 0.0
                  ,stop: length1(local_288.sorted)
                  ,compareTo: function (index3) {
                     return local_288.compareTo(item({index: index3
                                                     ,object: local_288.sorted}));
                  }});
};
var lookup = function (local_279) {
   var x = function (x297) {
              return x297;
           }(search({compareTo: function (local_280) {
                       return _3e__3d__3c_({y: local_280.key,__x: local_279.key});
                    }
                    ,sorted: local_279.sorted}));
   switch (x.tag)
   {
     case "just":
       var index4 = x.data;
       return {tag: "just",data: item({index: index4,object: local_279.sorted}).value};
     case "nothing":
       var local_298 = x.data;
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
var index5 = function (local_308) {
   var x = function (x309) {
              return x309;
           }(first({that: function (index6) {
                      return _3d__3d_({infixl: item({index: index6
                                                    ,object: local_308.__array})
                                      ,infixr: local_308.item});
                   }
                   ,list: _2e__2e_({start: 0.0,stop: length1(local_308.__array)})}));
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_310 = x.data;
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
   var local_301 = toArray(split({text: text,seperator: rts.bytesFromAscii(" ")}));
   var item3 = function (local_302) { return item({index: local_302,object: local_301});};
   var local_303 = toArray(split({text: item3(4.0),seperator: rts.bytesFromAscii(":")}));
   var local_305 = function (local_304) {
      return parseInt(item({index: local_304,object: local_303}));
   };
   return {time: {timezone: unwords(_3a__3a_({infixl: item3(5.0)
                                             ,infixr: function (local_306) {
                                                return _3a__3a_({infixl: item3(6.0)
                                                                ,infixr: function (local_307) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }}))
                 ,minute: local_305(1.0)
                 ,second: local_305(2.0)
                 ,hour: local_305(0.0)}
          ,date: {weekDay: _2b_({infixl: index5({__array: dayNames,item: item3(0.0)})
                                ,infixr: 1.0})
                 ,month: _2b_({infixl: index5({__array: monthNames,item: item3(1.0)})
                              ,infixr: 1.0})
                 ,day: parseInt(item3(2.0))
                 ,year: parseInt(item3(3.0))}};
};
var pestovalQuerySessions = function (local_151) {
   var local_167 = function () {
                      var x = function (x152) { return x152;}(local_151.teacher);
                      switch (x.tag)
                      {
                        case "just":
                          var local_153 = x.data;
                          return {where: _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("pestoval_session_teachers.teacher_id = ")
                                                                    ,b: showNum(local_153)})
                                                  ,infixr: function (local_165) {
                                                     return {tag: "empty",data: {}};
                                                  }})
                                 ,from: rts.bytesFromAscii("FROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_session ON pestoval_session_teachers.session_id = pestoval_session.id")};
                        case "nothing":
                          var local_166 = x.data;
                          return {where: {tag: "empty",data: {}}
                                 ,from: rts.bytesFromAscii("FROM pestoval_session")};
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                       ,"c83b0d9e623697d989e5a09fb1c59c4f");
                      }
                   }();
   return _3b_({infixl: query({database: local_151.database
                              ,object: pestovalQuerySessionsSql({where: join({texts: _2b__2b_2({infixl: local_167.where
                                                                                               ,infixr: function (local_168) {
                                                                                                  var x =
                                                                                                  function (x169) {
                                                                                                     return x169;
                                                                                                  }(local_151.filter);
                                                                                                  switch (x.tag)
                                                                                                  {
                                                                                                    case "just":
                                                                                                      var local_170 =
                                                                                                      x.data;
                                                                                                      return _3a__3a_({infixl: local_170
                                                                                                                      ,infixr: function (local_171) {
                                                                                                                         return {tag: "empty"
                                                                                                                                ,data: {}};
                                                                                                                      }});
                                                                                                    case "nothing":
                                                                                                      var local_172 =
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
                                                                ,from: local_167.from
                                                                ,language: local_151.language})})
               ,infixr: function (x225) {
                  switch (x225.tag)
                  {
                    case "error":
                      var local_226 = x225.data;
                      return ignoreError(local_226);
                    case "success":
                      var local_227 = x225.data;
                      return _3b_({infixl: pestovalQuerySessionTeachers({database: local_151.database
                                                                        ,language: local_151.language})
                                  ,infixr: function (teachers) {
                                     var field = function (local_274) {
                                        var x = function (x275) {
                                                   return x275;
                                                }(first({that: function (index2) {
                                                           return _3d__3d_({infixl: item({index: index2
                                                                                         ,object: local_227.fields})
                                                                           ,infixr: local_274});
                                                        }
                                                        ,list: _2e__2e_({start: 0.0
                                                                        ,stop: length1(local_227.fields)})}));
                                        switch (x.tag)
                                        {
                                          case "just":
                                            return id(x.data);
                                          case "nothing":
                                            var local_276 = x.data;
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
                                     return __return(toArray(map({list: fromArray(local_227.__data)
                                                                 ,mapping: function (local_277) {
                                                                    var item2 =
                                                                    function (local_278) {
                                                                       return item({index: local_278
                                                                                   ,object: local_277});
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
                                                                              function (x299) {
                                                                                 return x299;
                                                                              }(lookup({key: id1
                                                                                       ,sorted: teachers}));
                                                                              switch (x.tag)
                                                                              {
                                                                                case "just":
                                                                                  return id(x.data);
                                                                                case "nothing":
                                                                                  var local_300 =
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
var _22f2_ = function (local_315) {
   return {root: local_315.infixl,subTrees: local_315.infixr};
};
var leaf = function (local_314) { return _22f2_({infixl: local_314,infixr: []});};
var singleton = function (local_316) { return [local_316];};
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
var replicate = function (local_386) {
   var x = function (x387) { return x387;}(_2264_({infixl: local_386.count,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_388 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_386.item
                     ,tail: function (local_389) {
                        return replicate({count: _2d_({infixl: local_386.count
                                                      ,infixr: 1.0})
                                         ,item: local_386.item});
                     }}};
     case "true":
       var local_390 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_70f79762f05c41ccb9677f7a60746680"
                                    ,"3b53ee6d875f49f4acdb9a2e8b33fb2d");
   }
};
var rightJustify = function (local_382) {
   var count = _2d_({infixl: local_382.length
                    ,infixr: length(function (x383) {
                       return x383;
                    }(local_382.text))});
   var x = function (x384) { return x384;}(_2264_({infixl: count,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_385 = x.data;
       return _2b__2b_({a: toBytes(toArray(replicate({count: count
                                                     ,item: local_382.character})))
                       ,b: local_382.text});
     case "true":
       var local_391 = x.data;
       return local_382.text;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_c96ce62be72e4d1e85d07af16867169d"
                                    ,"ea6106b4e471dead7c7d3638866db4a1");
   }
};
var showTime = function (local_376) {
   return join({texts: map({list: _3a__3a_({infixl: function (x377) {
                                              return x377;
                                           }(local_376).hour
                                           ,infixr: function (local_378) {
                                              return _3a__3a_({infixl: function (x379) {
                                                                 return x379;
                                                              }(local_376).minute
                                                              ,infixr: function (local_380) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }})
                           ,mapping: function (local_381) {
                              return rightJustify({length: 2.0
                                                  ,text: showNum(local_381)
                                                  ,character: 48.0});
                           }})
               ,seperator: rts.bytesFromAscii(":")});
};
var formatTimeSlot = function (local_371) {
   return join({texts: _3a__3a_({infixl: item({index: _2d_({infixl: function (x372) {
                                                              return x372;
                                                           }(local_371.timeSlot.start.date).weekDay
                                                           ,infixr: 1.0})
                                              ,object: function () {
                                                 var x = local_371.language;
                                                 switch (x.tag)
                                                 {
                                                   case "english":
                                                     var local_373 = x.data;
                                                     return dayNames;
                                                   case "hebrew":
                                                     var local_374 = x.data;
                                                     return dayNamesHebrew;
                                                   default:
                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                  ,"DEF_4fed722dd3634c0db388c78e255c1429"
                                                                                  ,"5582218e01f5831eae7835c315a758c0");
                                                 }
                                              }()})
                                ,infixr: function (local_375) {
                                   return _3a__3a_({infixl: showTime(local_371.timeSlot.start.time)
                                                   ,infixr: function (local_392) {
                                                      return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                      ,infixr: function (local_393) {
                                                                         return _3a__3a_({infixl: showTime(local_371.timeSlot.stop.time)
                                                                                         ,infixr: function (local_394) {
                                                                                            return {tag: "empty"
                                                                                                   ,data: {}};
                                                                                         }});
                                                                      }});
                                                   }});
                                }})
               ,seperator: rts.bytesFromAscii(" ")});
};
var replace = function (local_405) {
   return join({texts: split({text: local_405.text,seperator: local_405.from})
               ,seperator: local_405.to});
};
var pestovalSessionInfo = function (local_336) {
   var local_340 = function (local_337) {
      return _22f2_({infixl: rts.bytesFromAscii("<p>")
                    ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<b>")
                                     ,infixr: singleton(leaf(local_337.key))})
                             ,leaf(local_337.value)]});
   };
   var teacher1 = function (local_341) {
      return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/")
                                              ,infixr: function (local_342) {
                                                 return _3a__3a_({infixl: function () {
                                                                    var x =
                                                                    local_336.language;
                                                                    switch (x.tag)
                                                                    {
                                                                      case "english":
                                                                        var local_343 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("eng");
                                                                      case "hebrew":
                                                                        var local_344 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("heb");
                                                                      default:
                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                     ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                     ,"25c06dfd8f7a82ef041d5e079e02e218");
                                                                    }
                                                                 }()
                                                                 ,infixr: function (local_345) {
                                                                    return _3a__3a_({infixl: rts.bytesFromAscii("/teacher/")
                                                                                    ,infixr: function (local_346) {
                                                                                       return _3a__3a_({infixl: showNum(local_341.id)
                                                                                                       ,infixr: function (local_347) {
                                                                                                          return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                          ,infixr: function (local_348) {
                                                                                                                             return {tag: "empty"
                                                                                                                                    ,data: {}};
                                                                                                                          }});
                                                                                                       }});
                                                                                    }});
                                                                 }});
                                              }}))
                    ,infixr: singleton(leaf(local_341.name))});
   };
   return toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                           ,infixr: function () {
                                              var x = function (x349) {
                                                         return x349;
                                                      }(fromArray(local_336.session.teachers));
                                              switch (x.tag)
                                              {
                                                case "nonEmpty":
                                                  var local_350 = x.data;
                                                  return toArray(_3a__3a_({infixl: teacher1(local_350.head)
                                                                          ,infixr: function (local_351) {
                                                                             return _2b__2b_2({infixl: concat(map({list: local_350.tail({})
                                                                                                                  ,mapping: function (local_352) {
                                                                                                                     return _3a__3a_({infixl: leaf(function () {
                                                                                                                                        var x =
                                                                                                                                        local_336.language;
                                                                                                                                        switch (x.tag)
                                                                                                                                        {
                                                                                                                                          case "english":
                                                                                                                                            var local_353 =
                                                                                                                                            x.data;
                                                                                                                                            return rts.bytesFromAscii(" & ");
                                                                                                                                          case "hebrew":
                                                                                                                                            var local_354 =
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
                                                                                                                                     ,infixr: function (local_355) {
                                                                                                                                        return _3a__3a_({infixl: teacher1(local_352)
                                                                                                                                                        ,infixr: function (local_356) {
                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                  ,data: {}};
                                                                                                                                                        }});
                                                                                                                                     }});
                                                                                                                  }}))
                                                                                              ,infixr: function (local_357) {
                                                                                                 return _3a__3a_({infixl: leaf(_2b__2b_({a: rts.bytesFromAscii(": ")
                                                                                                                                        ,b: local_336.session.name}))
                                                                                                                 ,infixr: function (local_358) {
                                                                                                                    return {tag: "empty"
                                                                                                                           ,data: {}};
                                                                                                                 }});
                                                                                              }});
                                                                          }}));
                                                case "empty":
                                                  var local_359 = x.data;
                                                  return singleton(leaf(local_336.session.name));
                                                default:
                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                               ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                               ,"ed7be6bad9f71095a62be6746bf728a3");
                                              }
                                           }()})
                           ,infixr: function (local_360) {
                              return _2b__2b_2({infixl: function () {
                                                  var x = function (x361) {
                                                             return x361;
                                                          }(local_336.password);
                                                  switch (x.tag)
                                                  {
                                                    case "just":
                                                      var local_362 = x.data;
                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                      ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/eng/edit/")
                                                                                                                                               ,infixr: function (local_363) {
                                                                                                                                                  return _3a__3a_({infixl: showNum(local_336.session.id)
                                                                                                                                                                  ,infixr: function (local_364) {
                                                                                                                                                                     return _3a__3a_({infixl: rts.bytesFromAscii("/")
                                                                                                                                                                                     ,infixr: function (local_365) {
                                                                                                                                                                                        return _3a__3a_({infixl: local_362
                                                                                                                                                                                                        ,infixr: function (local_366) {
                                                                                                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                                                                                                                           ,infixr: function (local_367) {
                                                                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                                                                           }});
                                                                                                                                                                                                        }});
                                                                                                                                                                                     }});
                                                                                                                                                                  }});
                                                                                                                                               }})
                                                                                                                              ,seperator: rts.bytesFromAscii("")})
                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("Edit details")))}))})
                                                                      ,infixr: function (local_368) {
                                                                         return {tag: "empty"
                                                                                ,data: {}};
                                                                      }});
                                                    case "nothing":
                                                      var local_369 = x.data;
                                                      return {tag: "empty",data: {}};
                                                    default:
                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                   ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                   ,"fad3e2035a95ac24b0214f741995983a");
                                                  }
                                               }()
                                               ,infixr: function (local_370) {
                                                  return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<b>")
                                                                                  ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_336.session.when
                                                                                                                         ,language: local_336.language})))})
                                                                  ,infixr: function (local_395) {
                                                                     return _3a__3a_({infixl: local_340({value: local_336.session.place.name
                                                                                                        ,key: function () {
                                                                                                           var x =
                                                                                                           local_336.language;
                                                                                                           switch (x.tag)
                                                                                                           {
                                                                                                             case "english":
                                                                                                               var local_396 =
                                                                                                               x.data;
                                                                                                               return rts.bytesFromAscii("Where: ");
                                                                                                             case "hebrew":
                                                                                                               var local_397 =
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
                                                                                     ,infixr: function (local_398) {
                                                                                        return _3a__3a_({infixl: local_340({value: local_336.session.level.name
                                                                                                                           ,key: function () {
                                                                                                                              var x =
                                                                                                                              local_336.language;
                                                                                                                              switch (x.tag)
                                                                                                                              {
                                                                                                                                case "english":
                                                                                                                                  var local_399 =
                                                                                                                                  x.data;
                                                                                                                                  return rts.bytesFromAscii("Who: ");
                                                                                                                                case "hebrew":
                                                                                                                                  var local_400 =
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
                                                                                                        ,infixr: function (local_401) {
                                                                                                           return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                           ,infixr: singleton(leaf(function () {
                                                                                                                                              var x =
                                                                                                                                              local_336.language;
                                                                                                                                              switch (x.tag)
                                                                                                                                              {
                                                                                                                                                case "english":
                                                                                                                                                  var local_402 =
                                                                                                                                                  x.data;
                                                                                                                                                  return rts.bytesFromAscii("Description:");
                                                                                                                                                case "hebrew":
                                                                                                                                                  var local_403 =
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
                                                                                                                           ,infixr: function (local_404) {
                                                                                                                              var local_406 =
                                                                                                                              function (text2) {
                                                                                                                                 return replace({text: text2
                                                                                                                                                ,from: rts.bytesFromAscii("\n")
                                                                                                                                                ,to: rts.bytesFromAscii("<br/>\n")});
                                                                                                                              };
                                                                                                                              return _3a__3a_({infixl: htmlParagraph(local_406(local_336.session.description))
                                                                                                                                              ,infixr: function (local_407) {
                                                                                                                                                 return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                 ,infixr: singleton(leaf(function () {
                                                                                                                                                                                    var x =
                                                                                                                                                                                    local_336.language;
                                                                                                                                                                                    switch (x.tag)
                                                                                                                                                                                    {
                                                                                                                                                                                      case "english":
                                                                                                                                                                                        var local_408 =
                                                                                                                                                                                        x.data;
                                                                                                                                                                                        return rts.bytesFromAscii("Prereqs:");
                                                                                                                                                                                      case "hebrew":
                                                                                                                                                                                        var local_409 =
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
                                                                                                                                                                 ,infixr: function (local_410) {
                                                                                                                                                                    return _3a__3a_({infixl: htmlParagraph(local_406(local_336.session.prereqs))
                                                                                                                                                                                    ,infixr: function (local_411) {
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
var htmlPopup = function (local_412) {
   return _22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<div id=\"")
                                                ,infixr: function (local_413) {
                                                   return _3a__3a_({infixl: local_412.id
                                                                   ,infixr: function (local_414) {
                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("\" class=\"overlay\">")
                                                                                      ,infixr: function (local_415) {
                                                                                         return {tag: "empty"
                                                                                                ,data: {}};
                                                                                      }});
                                                                   }});
                                                }})
                               ,seperator: rts.bytesFromAscii("")})
                 ,infixr: [leaf(rts.bytesFromAscii("<a class=\"cancel\" href=\"javascript:history.back()\">"))
                          ,_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<div class=\"popup\" style=\"background-color:")
                                                                 ,infixr: function (local_417) {
                                                                    return _3a__3a_({infixl: local_412.color
                                                                                    ,infixr: function (local_418) {
                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\">")
                                                                                                       ,infixr: function (local_419) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                    }});
                                                                 }})
                                                ,seperator: rts.bytesFromAscii("")})
                                  ,infixr: local_412.content})]});
};
var pestovalSessionCell = function (local_319) {
   var local_320 = _2b__2b_({a: rts.bytesFromAscii("popup-")
                            ,b: showNum(local_319.session.id)});
   var local_321 = htmlParagraph(local_319.session.place.name);
   return _22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td style=\"background-color:")
                                                ,infixr: function (local_322) {
                                                   var color =
                                                   local_319.session.level.color;
                                                   return _3a__3a_({infixl: function () {
                                                                      var x =
                                                                      function (x323) {
                                                                         return x323;
                                                                      }(_3d__3d_({infixl: color
                                                                                 ,infixr: rts.bytesFromAscii("null")}));
                                                                      switch (x.tag)
                                                                      {
                                                                        case "false":
                                                                          var local_324 =
                                                                          x.data;
                                                                          return color;
                                                                        case "true":
                                                                          var local_325 =
                                                                          x.data;
                                                                          return rts.bytesFromAscii("#eee");
                                                                        default:
                                                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                       ,"DEF_9020eea8542142a09c1a8813ef9990af"
                                                                                                       ,"8af192079f77d68114daa54992f28614");
                                                                      }
                                                                   }()
                                                                   ,infixr: function (local_326) {
                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(";")
                                                                                      ,infixr: function (local_327) {
                                                                                         return _3a__3a_({infixl: local_319.style
                                                                                                         ,infixr: function (local_328) {
                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii("\" ")
                                                                                                                            ,infixr: function (local_329) {
                                                                                                                               return _3a__3a_({infixl: local_319.attributes
                                                                                                                                               ,infixr: function (local_330) {
                                                                                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(">")
                                                                                                                                                                  ,infixr: function (local_331) {
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
                                                                 ,infixr: function (local_332) {
                                                                    return _3a__3a_({infixl: local_320
                                                                                    ,infixr: function (local_333) {
                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\" style=\"text-decoration: none; color: black;\">")
                                                                                                       ,infixr: function (local_334) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                    }});
                                                                 }})
                                                ,seperator: rts.bytesFromAscii("")})
                                  ,infixr: local_319.content})
                          ,htmlPopup({content: pestovalSessionInfo({password: local_319.password
                                                                   ,language: local_319.language
                                                                   ,session: local_319.session})
                                     ,id: local_320
                                     ,color: local_319.session.level.color})]});
};
var htmlTable = function (local_422) {
   return _22f2_({infixl: _2b__2b_({a: rts.bytesFromAscii("<table width=\"100%\"")
                                   ,b: function () {
                                      var x = local_422.language;
                                      switch (x.tag)
                                      {
                                        case "english":
                                          var local_423 = x.data;
                                          return rts.bytesFromAscii(">");
                                        case "hebrew":
                                          var local_424 = x.data;
                                          return rts.bytesFromAscii(" dir=\"rtl\">");
                                        default:
                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                       ,"DEF_c270fb6c0aee498e865b7bf936941c16"
                                                                       ,"3593d20a3691e4acedfdfbe5a1b33cdf");
                                      }
                                   }()})
                 ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<tbody>")
                                           ,infixr: local_422.body}))});
};
var pestovalManageFloating = function (local_150) {
   return _3b_({infixl: pestovalQuerySessions({database: local_150.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: {tag: "english",data: {}}
                                              ,filter: {tag: "just"
                                                       ,data: rts.bytesFromAscii("pestoval_session.location_id IS NULL")}})
               ,infixr: function (local_311) {
                  return __return(function () {
                         var x = function (x312) {
                                    return x312;
                                 }(_3d__3d_({infixl: length1(local_311),infixr: 0.0}));
                         switch (x.tag)
                         {
                           case "false":
                             var local_313 = x.data;
                             return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Floating Sessions")))})
                                             ,infixr: function (local_318) {
                                                return _3a__3a_({infixl: htmlTable({body: toArray(map({list: fromArray(local_311)
                                                                                                      ,mapping: function (session1) {
                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                       ,infixr: singleton(pestovalSessionCell({password: {tag: "just"
                                                                                                                                                                         ,data: local_150.password}
                                                                                                                                                              ,content: []
                                                                                                                                                              ,style: rts.bytesFromAscii("")
                                                                                                                                                              ,attributes: rts.bytesFromAscii("")
                                                                                                                                                              ,language: {tag: "english"
                                                                                                                                                                         ,data: {}}
                                                                                                                                                              ,session: session1}))});
                                                                                                      }}))
                                                                                   ,language: {tag: "english"
                                                                                              ,data: {}}})
                                                                ,infixr: function (local_425) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }});
                           case "true":
                             var local_426 = x.data;
                             return {tag: "empty",data: {}};
                           default:
                             throw rts.exceptions.LamduBug("Unhandled case"
                                                          ,"DEF_d40cade7acd3445089af06cfb0ca8c08"
                                                          ,"3aeafeb193f3926d38156605e21596e9");
                         }
                      }());
               }});
};
var processSimpleQuery = function (x430) {
   switch (x430.tag)
   {
     case "error":
       var local_431 = x430.data;
       return ignoreError(local_431);
     case "success":
       var local_432 = x430.data;
       return __return(toArray(map({list: fromArray(local_432.__data)
                                   ,mapping: function (local_433) {
                                      return {name: item({index: 1.0,object: local_433})
                                             ,id: parseInt(item({index: 0.0
                                                                ,object: local_433}))};
                                   }})));
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a0f0234c060c4086a39fffe55fe3f9a9"
                                    ,"bc83e03aa2977cc46406e062c7e1acaa");
   }
};
var pestovalQueryTeachers = function (local_429) {
   return _3b_({infixl: query({database: local_429.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_teacher.id, ")
                                                             ,b: queryFieldLang(local_429.language)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_teacher\nORDER BY name")})})
               ,infixr: processSimpleQuery});
};
var pestovalManageTeachers = function (local_428) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_428.database
                                              ,language: {tag: "english",data: {}}})
               ,infixr: function (teachers1) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_434) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(map({list: fromArray(teachers1)
                                                                                                   ,mapping: function (local_435) {
                                                                                                      return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                    ,infixr: singleton(_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<a href=\"/eng/teacher/")
                                                                                                                                                                                                       ,b: showNum(local_435.id)})
                                                                                                                                                                                          ,b: rts.bytesFromAscii("/")})
                                                                                                                                                                             ,b: local_428.password})
                                                                                                                                                                ,b: rts.bytesFromAscii("/\">")})
                                                                                                                                              ,infixr: singleton(leaf(local_435.name))}))});
                                                                                                   }}))})
                                                              ,infixr: function (local_436) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var sequence = function (list7) {
   return foldLazy({list: list7
                   ,initial: function (local_438) {
                      return __return({tag: "empty",data: {}});
                   }
                   ,binop: function (local_439) {
                      return _3b_({infixl: local_439.item
                                  ,infixr: function (local_440) {
                                     return _3b_({infixl: local_439.rest({})
                                                 ,infixr: function (local_441) {
                                                    return __return({tag: "nonEmpty"
                                                                    ,data: {head: local_440
                                                                           ,tail: function (local_442) {
                                                                              return local_441;
                                                                           }}});
                                                 }});
                                  }});
                   }});
};
var renderHtml = rts.builtins.Optimized["renderHtml"];
var httpOk200 = {message: rts.bytesFromAscii("OK"),code: 200.0};
var pestovalPage = function (local_444) {
   return {content: {__data: function (x449) {
                       return x449;
                    }(_2b__2b_({a: rts.bytesFromAscii("<!DOCTYPE html>\n")
                               ,b: renderHtml(_22f2_({infixl: rts.bytesFromAscii("<html>")
                                                     ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<head>")
                                                                      ,infixr: [leaf(rts.bytesFromAscii("<meta charset=\"utf-8\" />"))
                                                                               ,_22f2_({infixl: rts.bytesFromAscii("<title>")
                                                                                       ,infixr: singleton(leaf(local_444.title))})
                                                                               ,_22f2_({infixl: rts.bytesFromAscii("<body>")
                                                                                       ,infixr: local_444.body})]})]}))}))
                    ,mimeType: rts.bytesFromAscii("text/html")}
          ,status: httpOk200};
};
var pestovalUnauthorized = {content: {__data: function (x451) {
                                        return x451;
                                     }(rts.bytesFromAscii("Not authorized to edit"))
                                     ,mimeType: rts.bytesFromAscii("text/plain")}
                           ,status: {message: rts.bytesFromAscii("Unauthorized")
                                    ,code: 403.0}};
var pestovalManage = function (local_125) {
   var password = function () {
                     var x = function (x126) {
                                return x126;
                             }(_3d__3d_({infixl: length1(local_125.path),infixr: 0.0}));
                     switch (x.tag)
                     {
                       case "false":
                         var local_127 = x.data;
                         return item({index: 0.0,object: local_125.path});
                       case "true":
                         var local_128 = x.data;
                         return rts.bytesFromAscii("");
                       default:
                         throw rts.exceptions.LamduBug("Unhandled case"
                                                      ,"DEF_e7b481c7abf74eb892737b8de024fc75"
                                                      ,"87f1806be8d1cfa4cad909539a3a312d");
                     }
                  }();
   return _3b_({infixl: pestovalAuth({database: local_125.database
                                     ,password: password
                                     ,teachers: []})
               ,infixr: function (x148) {
                  switch (x148.tag)
                  {
                    case "admin":
                      var local_149 = x148.data;
                      return _3b_({infixl: sequence(_3a__3a_({infixl: pestovalManageFloating({database: local_125.database
                                                                                             ,password: password})
                                                             ,infixr: function (local_427) {
                                                                return _3a__3a_({infixl: pestovalManageTeachers({database: local_125.database
                                                                                                                ,password: password})
                                                                                ,infixr: function (local_437) {
                                                                                   return {tag: "empty"
                                                                                          ,data: {}};
                                                                                }});
                                                             }}))
                                  ,infixr: function (local_443) {
                                     return __return(pestovalPage({title: rts.bytesFromAscii("Manage")
                                                                  ,body: toArray(concat(local_443))}));
                                  }});
                    default:
                      var local_450 = x148;
                      return __return(pestovalUnauthorized);
                  }
               }});
};
var getSession = function (local_455) {
   var filter = {tag: "just"
                ,data: _2b__2b_({a: rts.bytesFromAscii("pestoval_session.id = ")
                                ,b: showNum(local_455.id)})};
   return _3b_({infixl: pestovalQuerySessions({database: local_455.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: {tag: "english",data: {}}
                                              ,filter: filter})
               ,infixr: function (local_456) {
                  return _3b_({infixl: pestovalQuerySessions({database: local_455.database
                                                             ,teacher: {tag: "nothing"
                                                                       ,data: {}}
                                                             ,language: {tag: "hebrew"
                                                                        ,data: {}}
                                                             ,filter: filter})
                              ,infixr: function (local_457) {
                                 return __return(function () {
                                        var x = function (x459) {
                                                   return x459;
                                                }(_26__26_({infixl: _3d__3d_({infixl: length1(local_456)
                                                                             ,infixr: 1.0})
                                                           ,infixr: function (local_458) {
                                                              return _3d__3d_({infixl: length1(local_457)
                                                                              ,infixr: 1.0});
                                                           }}));
                                        switch (x.tag)
                                        {
                                          case "false":
                                            var local_460 = x.data;
                                            return {tag: "nothing",data: {}};
                                          case "true":
                                            var local_461 = x.data;
                                            var english = item({index: 0.0
                                                               ,object: local_456});
                                            var hebrew = item({index: 0.0
                                                              ,object: local_457});
                                            return {tag: "just"
                                                   ,data: {prereqs: {english: english.prereqs
                                                                    ,hebrew: function () {
                                                                       var x =
                                                                       function (x462) {
                                                                          return x462;
                                                                       }(_3d__3d_({infixl: hebrew.prereqs
                                                                                  ,infixr: english.prereqs}));
                                                                       switch (x.tag)
                                                                       {
                                                                         case "false":
                                                                           var local_463 =
                                                                           x.data;
                                                                           return hebrew.prereqs;
                                                                         case "true":
                                                                           var local_464 =
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
                                                                    function (x465) {
                                                                       return x465;
                                                                    }(_3d__3d_({infixl: hebrew.name
                                                                               ,infixr: english.name}));
                                                                    switch (x.tag)
                                                                    {
                                                                      case "false":
                                                                        var local_466 =
                                                                        x.data;
                                                                        return hebrew.name;
                                                                      case "true":
                                                                        var local_467 =
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
                                                                           function (x468) {
                                                                              return x468;
                                                                           }(_3d__3d_({infixl: hebrew.description
                                                                                      ,infixr: english.description}));
                                                                           switch (x.tag)
                                                                           {
                                                                             case "false":
                                                                               var local_469 =
                                                                               x.data;
                                                                               return hebrew.description;
                                                                             case "true":
                                                                               var local_470 =
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
var allOf = function (local_490) {
   return foldLazy({list: local_490.list
                   ,initial: function (local_491) {
                      return {tag: "true",data: {}};
                   }
                   ,binop: function (local_492) {
                      return _26__26_({infixl: local_490.satisfy(local_492.item)
                                      ,infixr: local_492.rest});
                   }});
};
var filter1 = function (local_493) {
   var x = function (x494) { return x494;}(local_493.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_495 = x.data;
       var rest = function (local_496) {
          return filter1({list: local_495.tail({}),keep: local_493.keep});
       };
       var x = function (x497) { return x497;}(local_493.keep(local_495.head));
       switch (x.tag)
       {
         case "false":
           var local_498 = x.data;
           return rest({});
         case "true":
           var local_499 = x.data;
           return {tag: "nonEmpty",data: {head: local_495.head,tail: rest}};
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                        ,"fbe0954bea2f4c248cb91ac61e7821ba");
       }
     case "empty":
       var local_500 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                    ,"2cb5f2574b8b4e3d8e5510fee403db44");
   }
};
var teachersEditForm = function (local_479) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_479.database
                                              ,language: {tag: "english",data: {}}})
               ,infixr: function (local_480) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_481) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(_2b__2b_2({infixl: map({list: fromArray(local_479.teachers)
                                                                                                                      ,mapping: function (local_482) {
                                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                       ,infixr: [leaf(local_482.name)
                                                                                                                                                ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<button type=\"submit\" name=\"remove_teacher\" value=\"")
                                                                                                                                                                                       ,b: showNum(local_482.id)})
                                                                                                                                                                          ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Remove")))})]});
                                                                                                                      }})
                                                                                                         ,infixr: function (local_485) {
                                                                                                            return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                            ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<label for=\"add_teacher\">")
                                                                                                                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Add:")))})
                                                                                                                                                     ,_22f2_({infixl: rts.bytesFromAscii("<select id=\"add_teacher\" name=\"add_teacher\">")
                                                                                                                                                             ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                                                                                                       ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                                                                                                       ,infixr: function (local_487) {
                                                                                                                                                                                          return map({list: filter1({list: fromArray(local_480)
                                                                                                                                                                                                                    ,keep: function (local_488) {
                                                                                                                                                                                                                       return allOf({list: fromArray(local_479.teachers)
                                                                                                                                                                                                                                    ,satisfy: function (local_489) {
                                                                                                                                                                                                                                       return _2260_({infixl: local_488.id
                                                                                                                                                                                                                                                     ,infixr: local_489.id});
                                                                                                                                                                                                                                    }});
                                                                                                                                                                                                                    }})
                                                                                                                                                                                                     ,mapping: function (local_501) {
                                                                                                                                                                                                        return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                                                                                                     ,b: showNum(local_501.id)})
                                                                                                                                                                                                                                        ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                                                                                      ,infixr: singleton(leaf(local_501.name))});
                                                                                                                                                                                                     }});
                                                                                                                                                                                       }}))})]})
                                                                                                                            ,infixr: function (local_503) {
                                                                                                                               return {tag: "empty"
                                                                                                                                      ,data: {}};
                                                                                                                            }});
                                                                                                         }}))})
                                                              ,infixr: function (local_504) {
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
var levelEditForm = function (local_506) {
   return _3b_({infixl: pestovalQueryLevels(local_506.database)
               ,infixr: function (local_507) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Level")))})
                                           ,infixr: function (local_508) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"level\" name=\"level\">")
                                                                              ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                        ,infixr: function (local_509) {
                                                                                                           return map({list: fromArray(local_507)
                                                                                                                      ,mapping: function (local_510) {
                                                                                                                         return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                      ,b: showNum(local_510.id)})
                                                                                                                                                         ,b: function () {
                                                                                                                                                            var x =
                                                                                                                                                            function (x511) {
                                                                                                                                                               return x511;
                                                                                                                                                            }(_3d__3d_({infixl: local_510.id
                                                                                                                                                                       ,infixr: local_506.level.id}));
                                                                                                                                                            switch (x.tag)
                                                                                                                                                            {
                                                                                                                                                              case "false":
                                                                                                                                                                var local_512 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\">");
                                                                                                                                                              case "true":
                                                                                                                                                                var local_513 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\" selected>");
                                                                                                                                                              default:
                                                                                                                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                             ,"DEF_a5e4925095a54ec393e6e4d5942a5dec"
                                                                                                                                                                                             ,"9a49b8f7220edcf647eba821ecf8b91a");
                                                                                                                                                            }
                                                                                                                                                         }()})
                                                                                                                                       ,infixr: singleton(leaf(local_510.name))});
                                                                                                                      }});
                                                                                                        }}))})
                                                              ,infixr: function (local_514) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var locationEditForm = function (local_516) {
   return _3b_({infixl: _3b_({infixl: query({database: local_516.database
                                            ,object: rts.bytesFromAscii("SELECT pestoval_location.id, pestoval_location.name FROM pestoval_location")})
                             ,infixr: processSimpleQuery})
               ,infixr: function (local_517) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Where")))})
                                           ,infixr: function (local_518) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"location\" name=\"location\">")
                                                                              ,infixr: toArray(map({list: fromArray(local_517)
                                                                                                   ,mapping: function (local_519) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_519.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         function (x520) {
                                                                                                                                            return x520;
                                                                                                                                         }(_3d__3d_({infixl: local_519.id
                                                                                                                                                    ,infixr: local_516.where.id}));
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_521 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_522 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                          ,"DEF_937ecfd7a5fb4cd6800d072419740277"
                                                                                                                                                                          ,"ae5dc56c181ace2274e213d24cf032c6");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(local_519.name))});
                                                                                                   }}))})
                                                              ,infixr: function (local_523) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalQueryTimeSlots = function (database2) {
   return _3b_({infixl: query({database: database2
                              ,object: rts.bytesFromAscii("SELECT\n  pestoval_timeslot.id, pestoval_timeslot.start, pestoval_timeslot.stop\nFROM pestoval_timeslot\nORDER BY pestoval_timeslot.start")})
               ,infixr: function (x526) {
                  switch (x526.tag)
                  {
                    case "error":
                      var local_527 = x526.data;
                      return ignoreError(local_527);
                    case "success":
                      var local_528 = x526.data;
                      return __return(toArray(map({list: fromArray(local_528.__data)
                                                  ,mapping: function (local_529) {
                                                     return {start: parseDateTime(item({index: 1.0
                                                                                       ,object: local_529}))
                                                            ,stop: parseDateTime(item({index: 2.0
                                                                                      ,object: local_529}))
                                                            ,id: parseInt(item({index: 0.0
                                                                               ,object: local_529}))};
                                                  }})));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_e253b6e9f37d40d099b39de266d912c9"
                                                   ,"37d0edcc32ab5606822a8107f66ced58");
                  }
               }});
};
var timeSlotEditForm = function (local_525) {
   return _3b_({infixl: pestovalQueryTimeSlots(local_525.database)
               ,infixr: function (local_530) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("When")))})
                                           ,infixr: function (local_531) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"when\" name=\"when\">")
                                                                              ,infixr: toArray(map({list: fromArray(local_530)
                                                                                                   ,mapping: function (local_532) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_532.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         function (x533) {
                                                                                                                                            return x533;
                                                                                                                                         }(_3d__3d_({infixl: local_532.id
                                                                                                                                                    ,infixr: local_525.when.id}));
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_534 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_535 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                          ,"DEF_3860ce434c144382b8c11631e28ab02f"
                                                                                                                                                                          ,"11873d6a08b91a78c3a93a526e65434f");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_532
                                                                                                                                                           ,language: {tag: "english"
                                                                                                                                                                      ,data: {}}})))});
                                                                                                   }}))})
                                                              ,infixr: function (local_536) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalSessionSummary = function (session3) {
   return concat(map({list: _3a__3a_({infixl: {name: rts.bytesFromAscii("Teachers")
                                              ,value: join({texts: map({list: fromArray(session3.teachers)
                                                                       ,mapping: function (local_540) {
                                                                          return local_540.name;
                                                                       }})
                                                           ,seperator: rts.bytesFromAscii(" & ")})}
                                     ,infixr: function (local_541) {
                                        return _3a__3a_({infixl: {name: rts.bytesFromAscii("Where")
                                                                 ,value: session3.place.name}
                                                        ,infixr: function (local_542) {
                                                           return _3a__3a_({infixl: {name: rts.bytesFromAscii("When")
                                                                                    ,value: formatTimeSlot({timeSlot: session3.when
                                                                                                           ,language: {tag: "english"
                                                                                                                      ,data: {}}})}
                                                                           ,infixr: function (local_543) {
                                                                              return _3a__3a_({infixl: {name: rts.bytesFromAscii("What")
                                                                                                       ,value: session3.name}
                                                                                              ,infixr: function (local_544) {
                                                                                                 return _3a__3a_({infixl: {name: rts.bytesFromAscii("Level")
                                                                                                                          ,value: session3.level.name}
                                                                                                                 ,infixr: function (local_545) {
                                                                                                                    return {tag: "empty"
                                                                                                                           ,data: {}};
                                                                                                                 }});
                                                                                              }});
                                                                           }});
                                                        }});
                                     }})
                     ,mapping: function (local_546) {
                        return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h4>")
                                                        ,infixr: singleton(leaf(local_546.name))})
                                        ,infixr: function (local_547) {
                                           return _3a__3a_({infixl: leaf(local_546.value)
                                                           ,infixr: function (local_548) {
                                                              return {tag: "empty"
                                                                     ,data: {}};
                                                           }});
                                        }});
                     }}));
};
var pestovalEditField = function (local_553) {
   return _3a__3a_({infixl: {name: local_553.name
                            ,value: local_553.value.english
                            ,key: local_553.key}
                   ,infixr: function (local_554) {
                      return _3a__3a_({infixl: {name: _2b__2b_({a: local_553.name
                                                               ,b: rts.bytesFromAscii(" (Hebrew)")})
                                               ,value: local_553.value.hebrew
                                               ,key: _2b__2b_({a: local_553.key
                                                              ,b: rts.bytesFromAscii("_hebrew")})}
                                      ,infixr: function (local_555) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var pestovalEditFields = function (local_558) {
   return _2b__2b_2({infixl: pestovalEditField({name: rts.bytesFromAscii("Description")
                                               ,value: local_558.description
                                               ,key: rts.bytesFromAscii("description")})
                    ,infixr: function (local_559) {
                       return pestovalEditField({name: rts.bytesFromAscii("Pre-reqs")
                                                ,value: local_558.prereqs
                                                ,key: rts.bytesFromAscii("prereqs")});
                    }});
};
var formTextArea = function (local_560) {
   return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<label for=\"")
                                                                  ,b: local_560.key})
                                                     ,b: rts.bytesFromAscii("\">")})
                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                             ,infixr: singleton(leaf(_2b__2b_({a: local_560.name
                                                                                              ,b: rts.bytesFromAscii(":")})))}))})
                   ,infixr: function (local_561) {
                      return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<textarea rows=10 cols=80 id=\"")
                                                                                                               ,b: local_560.key})
                                                                                                  ,b: rts.bytesFromAscii("\" name=\"")})
                                                                                     ,b: local_560.key})
                                                                        ,b: rts.bytesFromAscii("\">")})
                                                      ,infixr: singleton(leaf(local_560.value))})
                                      ,infixr: function (local_562) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var parseHex = function (text4) {
   var local_600 = function (local_583) {
      var x = function (x584) { return x584;}(_2264_({infixl: local_583,infixr: 57.0}));
      switch (x.tag)
      {
        case "false":
          var local_585 = x.data;
          var x = function (x586) {
                     return x586;
                  }(_2264_({infixl: local_583,infixr: 70.0}));
          switch (x.tag)
          {
            case "false":
              var local_587 = x.data;
              var x = function (x589) {
                         return x589;
                      }(_26__26_({infixl: _2264_({infixl: 97.0,infixr: local_583})
                                 ,infixr: function (local_588) {
                                    return _2264_({infixl: local_583,infixr: 102.0});
                                 }}));
              switch (x.tag)
              {
                case "false":
                  var local_590 = x.data;
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"6361c631c359bf491a698736b910c593");
                case "true":
                  var local_591 = x.data;
                  return _2d_({infixl: local_583,infixr: 87.0});
                default:
                  throw rts.exceptions.LamduBug("Unhandled case"
                                               ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                               ,"5a1355193393bda93a2c8e331b53d26c");
              }
            case "true":
              var local_592 = x.data;
              var x = function (x593) {
                         return x593;
                      }(_2264_({infixl: 65.0,infixr: local_583}));
              switch (x.tag)
              {
                case "false":
                  var local_594 = x.data;
                  throw rts.exceptions.ReachedHole("Reached a hole"
                                                  ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"d856f42600765d7302f46b291563ca8f");
                case "true":
                  var local_595 = x.data;
                  return _2d_({infixl: local_583,infixr: 55.0});
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
          var local_596 = x.data;
          var x = function (x597) {
                     return x597;
                  }(_2264_({infixl: 48.0,infixr: local_583}));
          switch (x.tag)
          {
            case "false":
              var local_598 = x.data;
              throw rts.exceptions.ReachedHole("Reached a hole"
                                              ,"DEF_4f118917db8f441092ec9e2d00784d9e"
                                              ,"c930879571c8b455c7030f716fce3db8");
            case "true":
              var local_599 = x.data;
              return _2d_({infixl: local_583,infixr: 48.0});
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
   return fold({list: fromBytes(function (x601) {
                  return x601;
               }(text4))
               ,initial: 0.0
               ,binop: function (local_602) {
                  return _2b_({infixl: _2a_({infixl: local_602.acc,infixr: 16.0})
                              ,infixr: local_600(local_602.item)});
               }});
};
var decodeUrl = function (text3) {
   return concat1(function () {
          var x = function (x574) {
                     return x574;
                  }(split({text: replace({text: text3
                                         ,from: rts.bytesFromAscii("+")
                                         ,to: rts.bytesFromAscii(" ")})
                          ,seperator: rts.bytesFromAscii("%")}));
          switch (x.tag)
          {
            case "nonEmpty":
              var local_575 = x.data;
              return _3a__3a_({infixl: local_575.head
                              ,infixr: function (local_576) {
                                 return map({list: local_575.tail({})
                                            ,mapping: function (local_577) {
                                               var x = function (x579) {
                                                          return x579;
                                                       }(_2265_({infixl: length(function (x578) {
                                                                   return x578;
                                                                }(local_577))
                                                                ,infixr: 2.0}));
                                               switch (x.tag)
                                               {
                                                 case "false":
                                                   var local_580 = x.data;
                                                   throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                   ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                   ,"dc688712fae3cce5d326448fdfdec2a5");
                                                 case "true":
                                                   var local_581 = x.data;
                                                   return _2b__2b_({a: toBytes(singleton(parseHex(slice({object: function (x582) {
                                                                                                           return x582;
                                                                                                        }(local_577)
                                                                                                        ,start: 0.0
                                                                                                        ,stop: 2.0}))))
                                                                   ,b: slice({object: function (x603) {
                                                                                return x603;
                                                                             }(local_577)
                                                                             ,start: 2.0
                                                                             ,stop: length(function (x604) {
                                                                                return x604;
                                                                             }(local_577))})});
                                                 default:
                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                ,"3d161b85ea84c55ce4d08379f720f0c6");
                                               }
                                            }});
                              }});
            case "empty":
              var local_605 = x.data;
              return {tag: "empty",data: {}};
            default:
              throw rts.exceptions.LamduBug("Unhandled case"
                                           ,"DEF_70b3c006524d443aaa9ff90bed5a839f"
                                           ,"a27f7e5bb742b4c492509cfb987f05dd");
          }
       }());
};
var parsePostBody = function (body) {
   return map({list: split({text: body,seperator: rts.bytesFromAscii("&")})
              ,mapping: function (field1) {
                 var local_570 = toArray(split({text: field1
                                               ,seperator: rts.bytesFromAscii("=")}));
                 var x = function (x571) {
                            return x571;
                         }(_3d__3d_({infixl: length1(local_570),infixr: 2.0}));
                 switch (x.tag)
                 {
                   case "false":
                     var local_572 = x.data;
                     return ignoreError(function () {
                            throw rts.exceptions.ReachedHole("Reached a hole"
                                                            ,"DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                            ,"c4215356d194f30cdd17797a99d63ff1");
                         }());
                   case "true":
                     var local_573 = x.data;
                     return {value: decodeUrl(item({index: 1.0,object: local_570}))
                            ,key: item({index: 0.0,object: local_570})};
                   default:
                     throw rts.exceptions.LamduBug("Unhandled case"
                                                  ,"DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                  ,"611148533b9174ce687e759e68987e1b");
                 }
              }});
};
var postgresEncodeText = function (text5) {
   return _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("E\'")
                                ,b: concat1(map({list: fromBytes(function (x616) {
                                                   return x616;
                                                }(text5))
                                                ,mapping: function (local_617) {
                                                   var x = function (x618) {
                                                              return x618;
                                                           }(_3d__3d_({infixl: local_617
                                                                      ,infixr: 10.0}));
                                                   switch (x.tag)
                                                   {
                                                     case "false":
                                                       var local_619 = x.data;
                                                       var x = function (x620) {
                                                                  return x620;
                                                               }(_3d__3d_({infixl: local_617
                                                                          ,infixr: 13.0}));
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_621 = x.data;
                                                           var x = function (x622) {
                                                                      return x622;
                                                                   }(_3d__3d_({infixl: local_617
                                                                              ,infixr: 39.0}));
                                                           switch (x.tag)
                                                           {
                                                             case "false":
                                                               var local_623 = x.data;
                                                               var x = function (x624) {
                                                                          return x624;
                                                                       }(_3d__3d_({infixl: local_617
                                                                                  ,infixr: 92.0}));
                                                               switch (x.tag)
                                                               {
                                                                 case "false":
                                                                   var local_625 = x.data;
                                                                   return toBytes(singleton(local_617));
                                                                 case "true":
                                                                   var local_626 = x.data;
                                                                   return rts.bytesFromAscii("\\\\");
                                                                 default:
                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                                ,"db1c255f9dc88b1c4474ccb94732b223");
                                                               }
                                                             case "true":
                                                               var local_627 = x.data;
                                                               return rts.bytesFromAscii("\\\'");
                                                             default:
                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                            ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                            ,"c5163200e2f7d7f5292c38e34f78058d");
                                                           }
                                                         case "true":
                                                           var local_628 = x.data;
                                                           return rts.bytesFromAscii("\\r");
                                                         default:
                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                        ,"DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                        ,"af75122f296de089cbe121bebb73e3af");
                                                       }
                                                     case "true":
                                                       var local_629 = x.data;
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
   var x = function (x641) { return x641;}(list8);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_642 = x.data;
       return {tag: "just",data: local_642.head};
     case "empty":
       var local_643 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6ed761736e084d6c97cf57a406116d35"
                                    ,"f3442eac4d4349a99cafaa88a24c4a7a");
   }
};
var mapMaybe = function (local_644) {
   var x = function (x645) { return x645;}(local_644.maybe);
   switch (x.tag)
   {
     case "just":
       var local_646 = x.data;
       return {tag: "just",data: local_644.mapping(local_646)};
     case "nothing":
       var local_647 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_2e9eb864b9154a2594c46dbc34021fab"
                                    ,"5ed58bf5b9734ee5b4f4dc26197f7885");
   }
};
var lookup1 = function (local_637) {
   return mapMaybe({mapping: function (local_638) {
                      return local_638.value;
                   }
                   ,maybe: head(filter1({list: local_637.assocs
                                        ,keep: function (local_639) {
                                           var dummy1 = function (local_640) {
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
                                                              ,infixr: local_639});
                                           };
                                           return _3d__3d_({infixl: local_639.key
                                                           ,infixr: local_637.key});
                                        }}))});
};
var updateSessionRow = function (local_607) {
   return _3b_({infixl: query({database: local_607.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET ")
                                                                          ,b: join({texts: concat(map({list: fromArray(local_607.body)
                                                                                                      ,mapping: function (local_608) {
                                                                                                         var x =
                                                                                                         function (x611) {
                                                                                                            return x611;
                                                                                                         }(_7c__7c_({infixl: _3d__3d_({infixl: local_608.key
                                                                                                                                      ,infixr: rts.bytesFromAscii("level")})
                                                                                                                    ,infixr: function (local_609) {
                                                                                                                       return _7c__7c_({infixl: _3d__3d_({infixl: local_608.key
                                                                                                                                                         ,infixr: rts.bytesFromAscii("location")})
                                                                                                                                       ,infixr: function (local_610) {
                                                                                                                                          return _3d__3d_({infixl: local_608.key
                                                                                                                                                          ,infixr: rts.bytesFromAscii("when")});
                                                                                                                                       }});
                                                                                                                    }}));
                                                                                                         switch (x.tag)
                                                                                                         {
                                                                                                           case "false":
                                                                                                             var local_612 =
                                                                                                             x.data;
                                                                                                             var x =
                                                                                                             function (x614) {
                                                                                                                return x614;
                                                                                                             }(_7c__7c_({infixl: _3d__3d_({infixl: local_608.key
                                                                                                                                          ,infixr: rts.bytesFromAscii("add_teacher")})
                                                                                                                        ,infixr: function (local_613) {
                                                                                                                           return _3d__3d_({infixl: local_608.key
                                                                                                                                           ,infixr: rts.bytesFromAscii("remove_teacher")});
                                                                                                                        }}));
                                                                                                             switch (x.tag)
                                                                                                             {
                                                                                                               case "false":
                                                                                                                 var local_615 =
                                                                                                                 x.data;
                                                                                                                 return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_608.key
                                                                                                                                                                ,b: rts.bytesFromAscii(" = ")})
                                                                                                                                                   ,b: postgresEncodeText(local_608.value)})
                                                                                                                                 ,infixr: function (local_630) {
                                                                                                                                    return {tag: "empty"
                                                                                                                                           ,data: {}};
                                                                                                                                 }});
                                                                                                               case "true":
                                                                                                                 var local_631 =
                                                                                                                 x.data;
                                                                                                                 return {tag: "empty"
                                                                                                                        ,data: {}};
                                                                                                               default:
                                                                                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                              ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                                                                              ,"267a2077130878c293cf4285fc1e3f96");
                                                                                                             }
                                                                                                           case "true":
                                                                                                             var local_632 =
                                                                                                             x.data;
                                                                                                             return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_608.key
                                                                                                                                                            ,b: rts.bytesFromAscii("_id = ")})
                                                                                                                                               ,b: local_608.value})
                                                                                                                             ,infixr: function (local_633) {
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
                                                ,b: showNum(local_607.session)})})
               ,infixr: function (local_634) {
                  var x = local_634;
                  switch (x.tag)
                  {
                    case "error":
                      var local_635 = x.data;
                      return __return({tag: "error",data: local_635});
                    case "success":
                      var local_636 = x.data;
                      return _3b_({infixl: function () {
                                     var x = function (x648) {
                                                return x648;
                                             }(lookup1({assocs: fromArray(local_607.body)
                                                       ,key: rts.bytesFromAscii("add_teacher")}));
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_649 = x.data;
                                         var x = function (x650) {
                                                    return x650;
                                                 }(_3d__3d_({infixl: local_649
                                                            ,infixr: rts.bytesFromAscii("")}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_651 = x.data;
                                             return _3b_({infixl: query({database: local_607.database
                                                                        ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("INSERT INTO pestoval_session_teachers (session_id, teacher_id)\nVALUES (")
                                                                                                                                 ,b: showNum(local_607.session)})
                                                                                                                    ,b: rts.bytesFromAscii(", ")})
                                                                                                       ,b: local_649})
                                                                                          ,b: rts.bytesFromAscii(")")})})
                                                         ,infixr: function (x652) {
                                                            switch (x652.tag)
                                                            {
                                                              case "error":
                                                                var local_653 = x652.data;
                                                                return ignoreError(local_653);
                                                              case "success":
                                                                var local_654 = x652.data;
                                                                return __return({});
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                             ,"3ad72f38b50bc1b5cc297ad16d68f28c");
                                                            }
                                                         }});
                                           case "true":
                                             var local_655 = x.data;
                                             return __return({});
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                          ,"138352fb50e0b842a35b65e5440d4cbb");
                                         }
                                       case "nothing":
                                         var local_656 = x.data;
                                         return __return({});
                                       default:
                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                      ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                      ,"b7e3310f75aa51661dd00a4d961cbe7d");
                                     }
                                  }()
                                  ,infixr: function (local_657) {
                                     var x = function (x658) {
                                                return x658;
                                             }(lookup1({assocs: fromArray(local_607.body)
                                                       ,key: rts.bytesFromAscii("remove_teacher")}));
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_659 = x.data;
                                         return _3b_({infixl: query({database: local_607.database
                                                                    ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("DELETE FROM pestoval_session_teachers\nWHERE pestoval_session_teachers.session_id = ")
                                                                                                                ,b: showNum(local_607.session)})
                                                                                                   ,b: rts.bytesFromAscii(" AND pestoval_session_teachers.teacher_id = ")})
                                                                                      ,b: local_659})})
                                                     ,infixr: function (x660) {
                                                        switch (x660.tag)
                                                        {
                                                          case "error":
                                                            var local_661 = x660.data;
                                                            return __return({tag: "error"
                                                                            ,data: local_661});
                                                          case "success":
                                                            var local_662 = x660.data;
                                                            return __return({tag: "success"
                                                                            ,data: {}});
                                                          default:
                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                         ,"DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                         ,"c22e107f85c6554bb3a7ef4080f8f72a");
                                                        }
                                                     }});
                                       case "nothing":
                                         var local_663 = x.data;
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
var tryQuery = function (local_666) {
   return function (x667) {
          switch (x667.tag)
          {
            case "error":
              var local_668 = x667.data;
              return __return({content: {__data: function (x669) {
                                           return x669;
                                        }(_2b__2b_({a: rts.bytesFromAscii("Database error: ")
                                                   ,b: local_668}))
                                        ,mimeType: rts.bytesFromAscii("text/plain")}
                              ,status: {message: rts.bytesFromAscii("Internal Server Error")
                                       ,code: 500.0}});
            case "success":
              return local_666(x667.data);
            default:
              throw rts.exceptions.LamduBug("Unhandled case"
                                           ,"DEF_6ab93b1ac8a248c0a946996efdd08c5f"
                                           ,"601e113ccba88e0bf9ac1fe558419963");
          }
       };
};
var pestovalVerifyUpdate = function (local_671) {
   var x = function (x672) {
              return x672;
           }(lookup1({assocs: fromArray(local_671.body)
                     ,key: rts.bytesFromAscii("when")}));
   switch (x.tag)
   {
     case "just":
       var when1 = x.data;
       var x = function (x673) {
                  return x673;
               }(lookup1({assocs: fromArray(local_671.body)
                         ,key: rts.bytesFromAscii("location")}));
       switch (x.tag)
       {
         case "just":
           var where = x.data;
           return _3b_({infixl: query({database: local_671.database
                                      ,object: concat1(_3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id\nFROM pestoval_session\nWHERE pestoval_session.id <> ")
                                                                ,infixr: function (local_674) {
                                                                   return _3a__3a_({infixl: showNum(local_671.session)
                                                                                   ,infixr: function (local_675) {
                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.location_id = ")
                                                                                                      ,infixr: function (local_676) {
                                                                                                         return _3a__3a_({infixl: where
                                                                                                                         ,infixr: function (local_677) {
                                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.when_id = ")
                                                                                                                                            ,infixr: function (local_678) {
                                                                                                                                               return _3a__3a_({infixl: when1
                                                                                                                                                               ,infixr: function (local_679) {
                                                                                                                                                                  return {tag: "empty"
                                                                                                                                                                         ,data: {}};
                                                                                                                                                               }});
                                                                                                                                            }});
                                                                                                                         }});
                                                                                                      }});
                                                                                   }});
                                                                }}))})
                       ,infixr: function (x680) {
                          switch (x680.tag)
                          {
                            case "error":
                              var local_681 = x680.data;
                              return ignoreError(local_681);
                            case "success":
                              var local_682 = x680.data;
                              return __return(function () {
                                     var x = function (x683) {
                                                return x683;
                                             }(_3d__3d_({infixl: length1(local_682.__data)
                                                        ,infixr: 0.0}));
                                     switch (x.tag)
                                     {
                                       case "false":
                                         var local_684 = x.data;
                                         return {tag: "conflicts"
                                                ,data: toArray(map({list: fromArray(local_682.__data)
                                                                   ,mapping: function (local_685) {
                                                                      return parseInt(item({index: 0.0
                                                                                           ,object: local_685}));
                                                                   }}))};
                                       case "true":
                                         var local_686 = x.data;
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
           var local_687 = x.data;
           return ignoreError({});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_bcca348b043a42949aaf89fb2eccfc72"
                                        ,"7aa622f233fd592d4ac16d681620a799");
       }
     case "nothing":
       var local_688 = x.data;
       return __return({tag: "good",data: {}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_bcca348b043a42949aaf89fb2eccfc72"
                                    ,"814512c476a997315cd8f86c31cf843c");
   }
};
var pestovalUpdate = function (local_567) {
   var x = function (x568) { return x568;}(local_567.request.body);
   switch (x.tag)
   {
     case "just":
       var local_569 = x.data;
       var body1 = toArray(parsePostBody(local_569));
       var local_670 = function (local_606) {
          return _3b_({infixl: updateSessionRow({body: body1
                                                ,database: local_567.database
                                                ,session: local_567.session})
                      ,infixr: tryQuery(function (local_664) {
                         return __return({content: {__data: function (x665) {
                                                      return x665;
                                                   }(rts.bytesFromAscii("Update successful, refresh"))
                                                   ,mimeType: rts.bytesFromAscii("text/plain")}
                                         ,status: {message: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: ")
                                                                     ,b: local_606})
                                                  ,code: 303.0}});
                      })});
       };
       return _3b_({infixl: pestovalVerifyUpdate({body: body1
                                                 ,database: local_567.database
                                                 ,session: local_567.session})
                   ,infixr: function (x689) {
                      switch (x689.tag)
                      {
                        case "conflicts":
                          var conflicts = x689.data;
                          return _3b_({infixl: query({database: local_567.database
                                                     ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET location_id = NULL\nWHERE pestoval_session.id IN (")
                                                                                    ,b: join({texts: map({list: fromArray(conflicts)
                                                                                                         ,mapping: showNum})
                                                                                             ,seperator: rts.bytesFromAscii(", ")})})
                                                                       ,b: rts.bytesFromAscii(")")})})
                                      ,infixr: tryQuery(function (local_690) {
                                         return local_670(_2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("/eng/manage/")
                                                                                ,b: local_567.password})
                                                                   ,b: rts.bytesFromAscii("/")}));
                                      })});
                        case "good":
                          var local_691 = x689.data;
                          return local_670(local_567.request.path);
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                       ,"7605757a63256d30d9c89a9804c8dd00");
                      }
                   }});
     case "nothing":
       var local_692 = x.data;
       return __return({content: {__data: function (x693) {
                                    return x693;
                                 }(rts.bytesFromAscii("POST with no body"))
                                 ,mimeType: rts.bytesFromAscii("text/plain")}
                       ,status: {message: rts.bytesFromAscii("Forbidden"),code: 403.0}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                    ,"7155adc9c6327a297327ec4e1f1a8007");
   }
};
var pestovalEditPage = function (local_453) {
   var local_454 = toArray(split({text: local_453.request.path
                                 ,seperator: rts.bytesFromAscii("/")}));
   var id2 = parseInt(item({index: 3.0,object: local_454}));
   var password1 = item({index: 4.0,object: local_454});
   return _3b_({infixl: getSession({database: local_453.database,id: id2})
               ,infixr: function (local_471) {
                  var x = function (x472) { return x472;}(local_471);
                  switch (x.tag)
                  {
                    case "just":
                      var session2 = x.data;
                      return _3b_({infixl: pestovalAuth({database: local_453.database
                                                        ,password: password1
                                                        ,teachers: session2.teachers})
                                  ,infixr: function (x473) {
                                     switch (x473.tag)
                                     {
                                       case "unauthorized":
                                         var local_474 = x473.data;
                                         return __return(pestovalUnauthorized);
                                       default:
                                         var local_475 = x473;
                                         var x = function (x476) {
                                                    return x476;
                                                 }(_3d__3d_({infixl: local_453.request.method
                                                            ,infixr: rts.bytesFromAscii("POST")}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_477 = x.data;
                                             return _3b_({infixl: function () {
                                                            var x = local_475;
                                                            switch (x.tag)
                                                            {
                                                              case "admin":
                                                                var local_478 = x.data;
                                                                return _3b_({infixl: sequence(_3a__3a_({infixl: teachersEditForm({database: local_453.database
                                                                                                                                 ,teachers: session2.teachers})
                                                                                                       ,infixr: function (local_505) {
                                                                                                          return _3a__3a_({infixl: levelEditForm({database: local_453.database
                                                                                                                                                 ,level: session2.level})
                                                                                                                          ,infixr: function (local_515) {
                                                                                                                             return _3a__3a_({infixl: locationEditForm({where: session2.place
                                                                                                                                                                       ,database: local_453.database})
                                                                                                                                             ,infixr: function (local_524) {
                                                                                                                                                return _3a__3a_({infixl: timeSlotEditForm({database: local_453.database
                                                                                                                                                                                          ,when: session2.when})
                                                                                                                                                                ,infixr: function (local_537) {
                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                          ,data: {}};
                                                                                                                                                                }});
                                                                                                                                             }});
                                                                                                                          }});
                                                                                                       }}))
                                                                            ,infixr: function (local_538) {
                                                                               return __return(concat(local_538));
                                                                            }});
                                                              case "teacher":
                                                                var local_539 = x.data;
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
                                                         ,infixr: function (local_549) {
                                                            return __return(pestovalPage({title: rts.bytesFromAscii("Edit Session")
                                                                                         ,body: [_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Edit Session")))})
                                                                                                ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"")
                                                                                                                                       ,b: local_453.request.path})
                                                                                                                          ,b: rts.bytesFromAscii("\">")})
                                                                                                        ,infixr: toArray(_2b__2b_2({infixl: local_549
                                                                                                                                   ,infixr: function (local_551) {
                                                                                                                                      return _2b__2b_2({infixl: concat(map({list: _2b__2b_2({infixl: function () {
                                                                                                                                                                                               var x =
                                                                                                                                                                                               local_475;
                                                                                                                                                                                               switch (x.tag)
                                                                                                                                                                                               {
                                                                                                                                                                                                 case "admin":
                                                                                                                                                                                                   var local_552 =
                                                                                                                                                                                                   x.data;
                                                                                                                                                                                                   return pestovalEditField({name: rts.bytesFromAscii("Name")
                                                                                                                                                                                                                            ,value: session2.name
                                                                                                                                                                                                                            ,key: rts.bytesFromAscii("name")});
                                                                                                                                                                                                 case "teacher":
                                                                                                                                                                                                   var local_556 =
                                                                                                                                                                                                   x.data;
                                                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                                                          ,data: {}};
                                                                                                                                                                                                 default:
                                                                                                                                                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                                                                ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                                                                                                                                                                                ,"b24e7f87522990052299e7d83ddb641c");
                                                                                                                                                                                               }
                                                                                                                                                                                            }()
                                                                                                                                                                                            ,infixr: function (local_557) {
                                                                                                                                                                                               return pestovalEditFields(session2);
                                                                                                                                                                                            }})
                                                                                                                                                                           ,mapping: formTextArea}))
                                                                                                                                                       ,infixr: function (local_563) {
                                                                                                                                                          return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                                                                                                                          ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                                                                    ,infixr: singleton(leaf(rts.bytesFromAscii("Update")))}))})
                                                                                                                                                                          ,infixr: function (local_564) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                       }});
                                                                                                                                   }}))})]}));
                                                         }});
                                           case "true":
                                             var local_566 = x.data;
                                             return pestovalUpdate({request: local_453.request
                                                                   ,database: local_453.database
                                                                   ,password: password1
                                                                   ,session: session2.id});
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                          ,"649431586e8fa4f8144892306470de2e");
                                         }
                                     }
                                  }});
                    case "nothing":
                      var local_694 = x.data;
                      return __return(httpNotFound404(local_453.request.path));
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                   ,"08ce1c8a7d9560da25879978070222da");
                  }
               }});
};
var overlaysCss = _22f2_({infixl: rts.bytesFromAscii("<style type=\"text/css\">")
                         ,infixr: singleton(leaf(rts.bytesFromAscii("/* Thanks https://eichefam.net/2011/12/21/popup-windows-without-javascript/ */\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0,0,0,0.5);\n  transition: opacity 200ms;\n  visibility: hidden;\n  opacity: 0;\n}\n.overlay:target {\n  visibility: visible;\n  opacity: 1;\n}\n.cancel {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  cursor: default;\n}\n.popup {\n  margin: 50px auto;\n  padding: 20px;\n  background: #fff;\n  border: 1px solid #666;\n  width: 70%;\n  box-shadow: 0 0 50px rgba(0,0,0,0.5);\n  position: relative;\n}")))});
var pestovalTeacherPage = function (local_696) {
   var teacher2 = parseInt(item({index: 0.0,object: local_696.path}));
   return _3b_({infixl: query({database: local_696.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT ")
                                                                          ,b: queryFieldLang(local_696.language)({table: rts.bytesFromAscii("pestoval_teacher")
                                                                                                                 ,field: rts.bytesFromAscii("name")
                                                                                                                 ,as: {tag: "nothing"
                                                                                                                      ,data: {}}})})
                                                             ,b: rts.bytesFromAscii(", pestoval_teacher.password\nFROM pestoval_teacher\nWHERE pestoval_teacher.id =")})
                                                ,b: showNum(teacher2)})})
               ,infixr: function (x697) {
                  switch (x697.tag)
                  {
                    case "error":
                      var local_698 = x697.data;
                      return ignoreError(local_698);
                    case "success":
                      var local_699 = x697.data;
                      var password2 = function () {
                                         var x = function (x701) {
                                                    return x701;
                                                 }(_26__26_({infixl: _3e_({infixl: length1(local_696.path)
                                                                          ,infixr: 1.0})
                                                            ,infixr: function (local_700) {
                                                               return _2260_({infixl: item({index: 1.0
                                                                                           ,object: local_696.path})
                                                                             ,infixr: rts.bytesFromAscii("")});
                                                            }}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_702 = x.data;
                                             return {tag: "nothing",data: {}};
                                           case "true":
                                             var local_703 = x.data;
                                             return {tag: "just"
                                                    ,data: item({index: 1.0
                                                                ,object: local_696.path})};
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_50938aa1a135407c826989b9e1339047"
                                                                          ,"91cc4c8b5af33ae92f94375e3a666b89");
                                         }
                                      }();
                      var title = item({index: 0.0
                                       ,object: item({index: 0.0
                                                     ,object: local_699.__data})});
                      return _3b_({infixl: pestovalQuerySessions({database: local_696.database
                                                                 ,teacher: {tag: "just"
                                                                           ,data: teacher2}
                                                                 ,language: local_696.language
                                                                 ,filter: {tag: "nothing"
                                                                          ,data: {}}})
                                  ,infixr: function (local_704) {
                                     return __return(pestovalPage({title: title
                                                                  ,body: [overlaysCss
                                                                         ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                            ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                                      ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                                                ,infixr: singleton(leaf(title))}))}))})
                                                                                                            ,infixr: function (local_706) {
                                                                                                               return map({list: fromArray(local_704)
                                                                                                                          ,mapping: function (session4) {
                                                                                                                             var local_722 =
                                                                                                                             join({texts: _3a__3a_({infixl: session4.name
                                                                                                                                                   ,infixr: function (local_707) {
                                                                                                                                                      var x =
                                                                                                                                                      function (x709) {
                                                                                                                                                         return x709;
                                                                                                                                                      }(filter1({list: fromArray(session4.teachers)
                                                                                                                                                                ,keep: function (local_708) {
                                                                                                                                                                   return _2260_({infixl: local_708.id
                                                                                                                                                                                 ,infixr: teacher2});
                                                                                                                                                                }}));
                                                                                                                                                      switch (x.tag)
                                                                                                                                                      {
                                                                                                                                                        case "nonEmpty":
                                                                                                                                                          var local_710 =
                                                                                                                                                          x.data;
                                                                                                                                                          return _3a__3a_({infixl: concat1(_3a__3a_({infixl: function () {
                                                                                                                                                                                                       var x =
                                                                                                                                                                                                       local_696.language;
                                                                                                                                                                                                       switch (x.tag)
                                                                                                                                                                                                       {
                                                                                                                                                                                                         case "english":
                                                                                                                                                                                                           var local_711 =
                                                                                                                                                                                                           x.data;
                                                                                                                                                                                                           return rts.bytesFromAscii("(With ");
                                                                                                                                                                                                         case "hebrew":
                                                                                                                                                                                                           var local_712 =
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
                                                                                                                                                                                                    ,infixr: function (local_713) {
                                                                                                                                                                                                       return _3a__3a_({infixl: local_710.head.name
                                                                                                                                                                                                                       ,infixr: function (local_714) {
                                                                                                                                                                                                                          return _3a__3a_({infixl: join({texts: map({list: local_710.tail({})
                                                                                                                                                                                                                                                                    ,mapping: function (local_715) {
                                                                                                                                                                                                                                                                       return _2b__2b_({a: function () {
                                                                                                                                                                                                                                                                                          var x =
                                                                                                                                                                                                                                                                                          local_696.language;
                                                                                                                                                                                                                                                                                          switch (x.tag)
                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                            case "english":
                                                                                                                                                                                                                                                                                              var local_716 =
                                                                                                                                                                                                                                                                                              x.data;
                                                                                                                                                                                                                                                                                              return rts.bytesFromAscii(" & ");
                                                                                                                                                                                                                                                                                            case "hebrew":
                                                                                                                                                                                                                                                                                              var local_717 =
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
                                                                                                                                                                                                                                                                                       ,b: local_715.name});
                                                                                                                                                                                                                                                                    }})
                                                                                                                                                                                                                                                        ,seperator: rts.bytesFromAscii("")})
                                                                                                                                                                                                                                          ,infixr: function (local_718) {
                                                                                                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(")")
                                                                                                                                                                                                                                                             ,infixr: function (local_719) {
                                                                                                                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                                                                                                                       ,data: {}};
                                                                                                                                                                                                                                                             }});
                                                                                                                                                                                                                                          }});
                                                                                                                                                                                                                       }});
                                                                                                                                                                                                    }}))
                                                                                                                                                                          ,infixr: function (local_720) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                        case "empty":
                                                                                                                                                          var local_721 =
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
                                                                                                                                                                                                    ,infixr: singleton(leaf(join({texts: _3a__3a_({infixl: formatTimeSlot({timeSlot: session4.when
                                                                                                                                                                                                                                                                          ,language: local_696.language})
                                                                                                                                                                                                                                                  ,infixr: function (local_723) {
                                                                                                                                                                                                                                                     return _3a__3a_({infixl: session4.place.name
                                                                                                                                                                                                                                                                     ,infixr: function (local_724) {
                                                                                                                                                                                                                                                                        return {tag: "empty"
                                                                                                                                                                                                                                                                               ,data: {}};
                                                                                                                                                                                                                                                                     }});
                                                                                                                                                                                                                                                  }})
                                                                                                                                                                                                                                 ,seperator: rts.bytesFromAscii(" / ")})))})
                                                                                                                                                                                            ,htmlParagraph(local_722)]
                                                                                                                                                                                  ,style: rts.bytesFromAscii("")
                                                                                                                                                                                  ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                  ,language: local_696.language
                                                                                                                                                                                  ,session: session4}))});
                                                                                                                          }});
                                                                                                            }}))
                                                                                    ,language: local_696.language})]}));
                                  }});
                    default:
                      throw rts.exceptions.LamduBug("Unhandled case"
                                                   ,"DEF_50938aa1a135407c826989b9e1339047"
                                                   ,"fc81fe2932d91417e79f74d97a2f2ad5");
                  }
               }});
};
var maximum2 = function (local_753) {
   var x = function (x754) {
              return x754;
           }(_2265_({infixl: local_753.__x,infixr: local_753.y}));
   switch (x.tag)
   {
     case "false":
       var local_755 = x.data;
       return local_753.y;
     case "true":
       var local_756 = x.data;
       return local_753.__x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_19e923b820b04266a9811a6b34fe7b37"
                                    ,"a5d0a997c71340b2b9d148187aeb6d00");
   }
};
var nonEmptyFold = function (local_757) {
   var x = function (x758) { return x758;}(local_757.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_759 = x.data;
       return {tag: "just"
              ,data: fold({list: local_759.tail({})
                          ,initial: local_759.head
                          ,binop: local_757.binop})};
     case "empty":
       var local_760 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_05d859467ac547cc890fea33e3ff4642"
                                    ,"eb3e9576545c4cc390019d2c5a8d9ce4");
   }
};
var maximum1 = function (list9) {
   return nonEmptyFold({list: list9
                       ,binop: function (local_752) {
                          return maximum2({y: local_752.item,__x: local_752.acc});
                       }});
};
var gcd = function (local_764) {
   var x = function (x765) { return x765;}(_3d__3d_({infixl: local_764.__x,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_766 = x.data;
       return gcd({y: local_764.__x
                  ,__x: _25_({infixl: local_764.y,infixr: local_764.__x})});
     case "true":
       var local_767 = x.data;
       return local_764.y;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_493da5cfecea49b89fd9a10c42df9e12"
                                    ,"426c0882a83d8df5efe64ca0e57098af");
   }
};
var lcm = function (local_763) {
   return _2f_({infixl: _2a_({infixl: local_763.__x,infixr: local_763.y})
               ,infixr: gcd({y: local_763.y,__x: local_763.__x})});
};
var timeSlotRow = function (local_770) {
   return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                 ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td colspan=")
                                                                          ,infixr: function (local_771) {
                                                                             return _3a__3a_({infixl: showNum(local_770.numColumns)
                                                                                             ,infixr: function (local_772) {
                                                                                                return _3a__3a_({infixl: rts.bytesFromAscii(" style=\"font-size:150%; border-top:3pt solid black;\">")
                                                                                                                ,infixr: function (local_773) {
                                                                                                                   return {tag: "empty"
                                                                                                                          ,data: {}};
                                                                                                                }});
                                                                                             }});
                                                                          }})
                                                         ,seperator: rts.bytesFromAscii("")})
                                           ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_770.timeSlot
                                                                                  ,language: local_770.language})))}))});
};
var formatTeachers = function (local_777) {
   return htmlParagraph(_2b__2b_({a: join({texts: map({list: fromArray(local_777.teachers)
                                                      ,mapping: function (local_778) {
                                                         return local_778.name;
                                                      }})
                                          ,seperator: function () {
                                             var x = local_777.language;
                                             switch (x.tag)
                                             {
                                               case "english":
                                                 var local_779 = x.data;
                                                 return rts.bytesFromAscii(" & ");
                                               case "hebrew":
                                                 var local_780 = x.data;
                                                 return rts.bytes([32,215,149]);
                                               default:
                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                              ,"DEF_b343578f80c84dbf8532d81d3be7c414"
                                                                              ,"5501c290d329fa41da6be2be94a5f4d0");
                                             }
                                          }()})
                                 ,b: rts.bytesFromAscii(":")}));
};
var detailedSessionInfo = function (local_776) {
   return [formatTeachers({teachers: local_776.session.teachers
                          ,language: local_776.language})
          ,htmlParagraph(local_776.session.name)
          ,htmlParagraph(local_776.session.place.name)];
};
var pestovalLevelsPage = function (local_729) {
   var minimum = parseInt(item({index: 0.0,object: local_729.path}));
   var maximum = function () {
                    var x = function (x730) {
                               return x730;
                            }(_3e_({infixl: length1(local_729.path),infixr: 1.0}));
                    switch (x.tag)
                    {
                      case "false":
                        var local_731 = x.data;
                        return minimum;
                      case "true":
                        var local_732 = x.data;
                        return parseInt(item({index: 1.0,object: local_729.path}));
                      default:
                        throw rts.exceptions.LamduBug("Unhandled case"
                                                     ,"DEF_a358e35c87a74404b2c606eb39bddad1"
                                                     ,"4c173067c4670de5fcb231cf53d90418");
                    }
                 }();
   var title1 = join({texts: function () {
                        var x = function (x733) {
                                   return x733;
                                }(_3d__3d_({infixl: minimum,infixr: maximum}));
                        switch (x.tag)
                        {
                          case "false":
                            var local_734 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_729.language;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_735 = x.data;
                                                   return rts.bytesFromAscii("Levels");
                                                 case "hebrew":
                                                   var local_736 = x.data;
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
                                            ,infixr: function (local_737) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_738) {
                                                                  return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                                  ,infixr: function (local_739) {
                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                     ,infixr: function (local_740) {
                                                                                                        return {tag: "empty"
                                                                                                               ,data: {}};
                                                                                                     }});
                                                                                  }});
                                                               }});
                                            }});
                          case "true":
                            var local_741 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_729.language;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_742 = x.data;
                                                   return rts.bytesFromAscii("Level");
                                                 case "hebrew":
                                                   var local_743 = x.data;
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
                                            ,infixr: function (local_744) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_745) {
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
   return _3b_({infixl: pestovalQuerySessions({database: local_729.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: local_729.language
                                              ,filter: {tag: "just"
                                                       ,data: concat1(_3a__3a_({infixl: showNum(minimum)
                                                                               ,infixr: function (local_746) {
                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(" <= pestoval_level.as_number AND pestoval_level.as_number <= ")
                                                                                                  ,infixr: function (local_747) {
                                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                                     ,infixr: function (local_748) {
                                                                                                                        return {tag: "empty"
                                                                                                                               ,data: {}};
                                                                                                                     }});
                                                                                                  }});
                                                                               }}))}})
               ,infixr: function (local_749) {
                  var local_751 = toArray(group({list: fromArray(local_749)
                                                ,by: function (local_750) {
                                                   return _3d__3d_({infixl: local_750.infixl.when.id
                                                                   ,infixr: local_750.infixr.when.id});
                                                }}));
                  var local_761 = maybe({object: maximum1(map({list: fromArray(local_751)
                                                              ,mapping: length1}))
                                        ,or: 0.0});
                  var numColumns = fold({list: _2e__2e_({start: 1.0
                                                        ,stop: _2b_({infixl: local_761
                                                                    ,infixr: 1.0})})
                                        ,initial: 1.0
                                        ,binop: function (local_762) {
                                           return lcm({y: local_762.item
                                                      ,__x: local_762.acc});
                                        }});
                  return __return(pestovalPage({title: title1
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                         ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                             ,infixr: singleton(leaf(title1))}))}))})
                                                                                         ,infixr: function (local_769) {
                                                                                            return concat(map({list: fromArray(local_751)
                                                                                                              ,mapping: function (group1) {
                                                                                                                 return _3a__3a_({infixl: timeSlotRow({numColumns: numColumns
                                                                                                                                                      ,timeSlot: item({index: 0.0
                                                                                                                                                                      ,object: group1}).when
                                                                                                                                                      ,language: local_729.language})
                                                                                                                                 ,infixr: function (local_774) {
                                                                                                                                    var attributes =
                                                                                                                                    function (local_775) {
                                                                                                                                       return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("colspan=")
                                                                                                                                                                                              ,b: showNum(_2f_({infixl: numColumns
                                                                                                                                                                                                               ,infixr: local_775}))})
                                                                                                                                                                                 ,b: rts.bytesFromAscii(" width=\"")})
                                                                                                                                                                    ,b: showNum(_2f__2f_({infixl: 100.0
                                                                                                                                                                                         ,infixr: local_775}))})
                                                                                                                                                       ,b: rts.bytesFromAscii("%\"")});
                                                                                                                                    }(length1(group1));
                                                                                                                                    return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                                    ,infixr: toArray(map({list: fromArray(group1)
                                                                                                                                                                                         ,mapping: function (session5) {
                                                                                                                                                                                            return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                                                                  ,data: {}}
                                                                                                                                                                                                                       ,content: singleton(_22f2_({infixl: rts.bytesFromAscii("<div style=\"font-size:110%\">")
                                                                                                                                                                                                                                                  ,infixr: detailedSessionInfo({language: local_729.language
                                                                                                                                                                                                                                                                               ,session: session5})}))
                                                                                                                                                                                                                       ,style: rts.bytesFromAscii("border-left: 1pt solid black")
                                                                                                                                                                                                                       ,attributes: attributes
                                                                                                                                                                                                                       ,language: local_729.language
                                                                                                                                                                                                                       ,session: session5});
                                                                                                                                                                                         }}))})
                                                                                                                                                    ,infixr: function (local_784) {
                                                                                                                                                       return {tag: "empty"
                                                                                                                                                              ,data: {}};
                                                                                                                                                    }});
                                                                                                                                 }});
                                                                                                              }}));
                                                                                         }}))
                                                                 ,language: local_729.language})]}));
               }});
};
var dedup = function (local_791) {
   return toArray(map({list: group({list: local_791,by: _3d__3d_})
                      ,mapping: function (local_792) {
                         return item({index: 0.0,object: local_792});
                      }}));
};
var placesRow = function (local_795) {
   var local_799 = join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<th width=\"")
                                         ,infixr: function (local_796) {
                                            return _3a__3a_({infixl: showNum(_2f_({infixl: 100.0
                                                                                  ,infixr: length1(local_795)}))
                                                            ,infixr: function (local_797) {
                                                               return _3a__3a_({infixl: rts.bytesFromAscii("%\">")
                                                                               ,infixr: function (local_798) {
                                                                                  return {tag: "empty"
                                                                                         ,data: {}};
                                                                               }});
                                                            }});
                                         }})
                        ,seperator: rts.bytesFromAscii("")});
   return _22f2_({infixl: rts.bytesFromAscii("<tr style=\"background-color:#eee\">")
                 ,infixr: toArray(map({list: fromArray(local_795)
                                      ,mapping: function (local_800) {
                                         return _22f2_({infixl: local_799
                                                       ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/places/")
                                                                                                                ,infixr: function (local_801) {
                                                                                                                   return _3a__3a_({infixl: showNum(local_800.id)
                                                                                                                                   ,infixr: function (local_802) {
                                                                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("/\"> ")
                                                                                                                                                      ,infixr: function (local_803) {
                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                ,data: {}};
                                                                                                                                                      }});
                                                                                                                                   }});
                                                                                                                }})
                                                                                               ,seperator: rts.bytesFromAscii("")})
                                                                                 ,infixr: singleton(leaf(local_800.name))}))});
                                      }}))});
};
var toArray1 = function (local_809) {
   return runMutArray(_3b_({infixl: newMutArray1(replicate({count: local_809.size
                                                           ,item: {tag: "nothing"
                                                                  ,data: {}}}))
                           ,infixr: function (__array4) {
                              return _3b_({infixl: sequence__(map({list: local_809.list
                                                                  ,mapping: function (local_810) {
                                                                     return writeMutArray({index: local_809.index(local_810)
                                                                                          ,object: __array4
                                                                                          ,value: {tag: "just"
                                                                                                  ,data: local_810}});
                                                                  }}))
                                          ,infixr: function (local_811) {
                                             return __return(__array4);
                                          }});
                           }}));
};
var pestovalSessionsTable = function (local_787) {
   return _3b_({infixl: pestovalQuerySessions({database: local_787.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: local_787.language
                                              ,filter: {tag: "nothing",data: {}}})
               ,infixr: function (local_788) {
                  var local_793 =
                  dedup(fromArray(sort({list: map({list: fromArray(local_788)
                                                  ,mapping: function (local_789) {
                                                     return local_789.place;
                                                  }})
                                       ,_3c_: function (local_790) {
                                          return _3c_({infixl: local_790.infixl.id
                                                      ,infixr: local_790.infixr.id});
                                       }})));
                  var numColumns1 = length1(local_793);
                  return __return(pestovalPage({title: rts.bytesFromAscii("All Sessions")
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(_3a__3a_({infixl: placesRow(local_793)
                                                                                         ,infixr: function (local_804) {
                                                                                            return concat(map({list: group({list: fromArray(local_788)
                                                                                                                           ,by: function (local_805) {
                                                                                                                              return _3d__3d_({infixl: local_805.infixl.when.id
                                                                                                                                              ,infixr: local_805.infixr.when.id});
                                                                                                                           }})
                                                                                                              ,mapping: function (local_806) {
                                                                                                                 return _3a__3a_({infixl: timeSlotRow({numColumns: numColumns1
                                                                                                                                                      ,timeSlot: item({index: 0.0
                                                                                                                                                                      ,object: local_806}).when
                                                                                                                                                      ,language: local_787.language})
                                                                                                                                 ,infixr: function (local_807) {
                                                                                                                                    return map({list: fromArray(toArray1({list: fromArray(local_806)
                                                                                                                                                                         ,index: function (local_808) {
                                                                                                                                                                            return index5({__array: local_793
                                                                                                                                                                                          ,item: local_808.place});
                                                                                                                                                                         }
                                                                                                                                                                         ,size: numColumns1}))
                                                                                                                                               ,mapping: function (local_812) {
                                                                                                                                                  var x =
                                                                                                                                                  function (x813) {
                                                                                                                                                     return x813;
                                                                                                                                                  }(local_812);
                                                                                                                                                  switch (x.tag)
                                                                                                                                                  {
                                                                                                                                                    case "just":
                                                                                                                                                      var session6 =
                                                                                                                                                      x.data;
                                                                                                                                                      return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                            ,data: {}}
                                                                                                                                                                                 ,content: [formatTeachers({teachers: session6.teachers
                                                                                                                                                                                                           ,language: local_787.language})
                                                                                                                                                                                           ,htmlParagraph(session6.name)]
                                                                                                                                                                                 ,style: rts.bytesFromAscii("")
                                                                                                                                                                                 ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                 ,language: local_787.language
                                                                                                                                                                                 ,session: session6});
                                                                                                                                                    case "nothing":
                                                                                                                                                      var local_816 =
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
                                                                 ,language: local_787.language})]}));
               }});
};
var readFile = rts.builtins.IO.file["readFile"];
var pestovalIndex = _3b_({infixl: readFile(function (x819) {
                            return x819;
                         }(rts.bytesFromAscii("index.html")))
                         ,infixr: function (local_820) {
                            return __return({content: {__data: local_820
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
                           return __return(httpNotFound404(local_87.request.path));
                         case "true":
                           var local_124 = x.data;
                           return pestovalManage({path: path
                                                 ,database: local_87.database});
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                        ,"3042fc773313a781882df94a14ec3bb3");
                       }
                     case "true":
                       var local_452 = x.data;
                       return pestovalEditPage({request: local_87.request
                                               ,database: local_87.database});
                     default:
                       throw rts.exceptions.LamduBug("Unhandled case"
                                                    ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                    ,"3904128e0f229aab0f559b8c4efd7e8c");
                   }
                 case "true":
                   var local_695 = x.data;
                   return pestovalTeacherPage({path: path
                                              ,database: local_87.database
                                              ,language: language1});
                 default:
                   throw rts.exceptions.LamduBug("Unhandled case"
                                                ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                ,"1efb5179a530efb5cf0ea0f292813e32");
               }
             case "true":
               var local_728 = x.data;
               return pestovalLevelsPage({path: path
                                         ,database: local_87.database
                                         ,language: language1});
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                            ,"3725e3e3e238c36942a62af16a116f25");
           }
         case "true":
           var local_786 = x.data;
           return pestovalSessionsTable({database: local_87.database
                                        ,language: language1});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                        ,"0e90da8443f9aff3c55edb7f8fef28fc");
       }
     case "true":
       var local_818 = x.data;
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
                  var x = function (x836) {
                             return x836;
                          }(_3e_({infixl: length5,infixr: 0.0}));
                  switch (x.tag)
                  {
                    case "false":
                      var local_837 = x.data;
                      return __return({tag: "nothing",data: {}});
                    case "true":
                      var local_838 = x.data;
                      return _3b_({infixl: readMutArray({index: _2d_({infixl: length5
                                                                     ,infixr: 1.0})
                                                        ,object: __array5})
                                  ,infixr: function (result) {
                                     return _3b_({infixl: truncateMutArray({object: __array5
                                                                           ,stop: _2d_({infixl: length5
                                                                                       ,infixr: 1.0})})
                                                 ,infixr: function (local_839) {
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
var find1 = function (local_864) {
   return first({that: function (local_865) {
                   return _3d__3d_({infixl: byteAt({index: local_865
                                                   ,object: local_864.__bytes})
                                   ,infixr: local_864.byte});
                }
                ,list: _2e__2e_({start: local_864.start
                                ,stop: length(local_864.__bytes)})});
};
var isSuffixOf = function (local_879) {
   var local_880 = length(local_879.whole);
   var local_881 = length(local_879.suffix);
   return _26__26_({infixl: _2265_({infixl: local_880,infixr: local_881})
                   ,infixr: function (local_882) {
                      return _3d__3d_({infixl: slice({object: local_879.whole
                                                     ,start: _2d_({infixl: local_880
                                                                  ,infixr: local_881})
                                                     ,stop: local_880})
                                      ,infixr: local_879.suffix});
                   }});
};
var unsuffixed = function (local_878) {
   var x = function (x883) {
              return x883;
           }(isSuffixOf({suffix: local_878.suffix,whole: local_878.whole}));
   switch (x.tag)
   {
     case "false":
       var local_884 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_885 = x.data;
       return {tag: "just"
              ,data: slice({object: local_878.whole
                           ,start: 0.0
                           ,stop: _2d_({infixl: length(local_878.whole)
                                       ,infixr: length(local_878.suffix)})})};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_6c2d206c45c348b3b8e2bbfdae7bde35"
                                    ,"7d90a0e076a149c4443b780b21470ef3");
   }
};
var removeSuffix = function (local_877) {
   var x = function (x886) {
              return x886;
           }(unsuffixed({suffix: local_877.suffix,whole: local_877.whole}));
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_887 = x.data;
       return local_877.whole;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_8c9d00ae73ab41ca903aa34ee4c6601a"
                                    ,"97a63e2f16bd481c6e64fd0c8a6d92fa");
   }
};
var packetsEndWith = function (local_892) {
   var x = function (x893) {
              return x893;
           }(_3d__3d_({infixl: local_892.stop,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_894 = x.data;
       return _3b_({infixl: readMutArray({index: _2d_({infixl: local_892.stop
                                                      ,infixr: 1.0})
                                         ,object: local_892.packets})
                   ,infixr: function (local_895) {
                      var x = function (x896) {
                                 return x896;
                              }(isSuffixOf({suffix: local_892.suffix,whole: local_895}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_897 = x.data;
                          var x = function (x898) {
                                     return x898;
                                  }(unsuffixed({suffix: local_895
                                               ,whole: local_892.suffix}));
                          switch (x.tag)
                          {
                            case "just":
                              var remain = x.data;
                              return packetsEndWith({suffix: remain
                                                    ,stop: _2d_({infixl: local_892.stop
                                                                ,infixr: 1.0})
                                                    ,packets: local_892.packets});
                            case "nothing":
                              var local_899 = x.data;
                              return __return({tag: "false",data: {}});
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                           ,"0d0804c08ad23d9eed424fc83122d6dc");
                          }
                        case "true":
                          var local_900 = x.data;
                          return __return({tag: "true",data: {}});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                       ,"49052b2836be0b25cb20bc95d00972ca");
                      }
                   }});
     case "true":
       var local_901 = x.data;
       return __return({tag: "false",data: {}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a2f069d7413941fdafe42795f6970175"
                                    ,"ae670587961cb7d305eef1133a3bbc18");
   }
};
var parseHttpHeaderPacket = function (local_863) {
   var x = function (x866) {
              return x866;
           }(find1({start: local_863.start,__bytes: local_863.newPacket,byte: 10.0}));
   switch (x.tag)
   {
     case "just":
       var local_867 = x.data;
       var local_868 = _2b_({infixl: local_867,infixr: 1.0});
       return _3b_({infixl: length4(local_863.packets)
                   ,infixr: function (local_869) {
                      var done = function (local_870) {
                         return _3b_({infixl: sequence(map({list: _2e__2e_({start: 0.0
                                                                           ,stop: local_869})
                                                           ,mapping: function (local_871) {
                                                              return readMutArray({index: local_871
                                                                                  ,object: local_863.packets});
                                                           }}))
                                     ,infixr: function (local_872) {
                                        var local_875 =
                                        concat2(_2b__2b_2({infixl: local_872
                                                          ,infixr: function (local_873) {
                                                             return _3a__3a_({infixl: slice({object: local_863.newPacket
                                                                                            ,start: 0.0
                                                                                            ,stop: local_867})
                                                                             ,infixr: function (local_874) {
                                                                                return {tag: "empty"
                                                                                       ,data: {}};
                                                                             }});
                                                          }}));
                                        var local_888 =
                                        toArray(map({list: split1({__bytes: local_875
                                                                  ,seperator: rts.bytes([10])})
                                                    ,mapping: function (local_876) {
                                                       return removeSuffix({suffix: rts.bytes([13])
                                                                           ,whole: local_876});
                                                    }}));
                                        return _3b_({infixl: truncateMutArray({object: local_863.packets
                                                                              ,stop: 0.0})
                                                    ,infixr: function (local_889) {
                                                       return _3b_({infixl: appendMutArray({object: local_863.packets
                                                                                           ,value: slice({object: local_863.newPacket
                                                                                                         ,start: local_868
                                                                                                         ,stop: length(local_863.newPacket)})})
                                                                   ,infixr: function (local_890) {
                                                                      return __return({tag: "just"
                                                                                      ,data: local_888});
                                                                   }});
                                                    }});
                                     }});
                      };
                      var local_902 = function (local_891) {
                         return packetsEndWith({suffix: local_891
                                               ,stop: local_869
                                               ,packets: local_863.packets});
                      };
                      var next = function (local_903) {
                         return parseHttpHeaderPacket({start: local_868
                                                      ,newPacket: local_863.newPacket
                                                      ,packets: local_863.packets});
                      };
                      var x = function (x904) {
                                 return x904;
                              }(_3d__3d_({infixl: local_867,infixr: 0.0}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_905 = x.data;
                          var local_906 = byteAt({index: _2d_({infixl: local_867
                                                              ,infixr: 1.0})
                                                 ,object: local_863.newPacket});
                          var x = function (x907) {
                                     return x907;
                                  }(_3d__3d_({infixl: local_906,infixr: 10.0}));
                          switch (x.tag)
                          {
                            case "false":
                              var local_908 = x.data;
                              var x = function (x909) {
                                         return x909;
                                      }(_3d__3d_({infixl: local_906,infixr: 13.0}));
                              switch (x.tag)
                              {
                                case "false":
                                  return next(x.data);
                                case "true":
                                  var local_910 = x.data;
                                  var x = function (x911) {
                                             return x911;
                                          }(_3d__3d_({infixl: local_867,infixr: 1.0}));
                                  switch (x.tag)
                                  {
                                    case "false":
                                      var local_912 = x.data;
                                      var x = function (x913) {
                                                 return x913;
                                              }(_3d__3d_({infixl: byteAt({index: _2d_({infixl: local_867
                                                                                      ,infixr: 2.0})
                                                                         ,object: local_863.newPacket})
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
                                      var local_914 = x.data;
                                      return _3b_({infixl: local_902(rts.bytes([10]))
                                                  ,infixr: function (local_915) {
                                                     var x = function (x916) {
                                                                return x916;
                                                             }(local_915);
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
                          var local_917 = x.data;
                          return _3b_({infixl: local_902(rts.bytes([10]))
                                      ,infixr: function (local_918) {
                                         var x = function (x919) {
                                                    return x919;
                                                 }(local_918);
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_920 = x.data;
                                             return _3b_({infixl: local_902(rts.bytes([10
                                                                                      ,13]))
                                                         ,infixr: function (local_921) {
                                                            var x = function (x922) {
                                                                       return x922;
                                                                    }(local_921);
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
       var local_923 = x.data;
       return _3b_({infixl: appendMutArray({object: local_863.packets
                                           ,value: local_863.newPacket})
                   ,infixr: function (local_924) {
                      return __return({tag: "nothing",data: {}});
                   }});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                    ,"a641e1eefdb6d290e8f5e30eb99ae939");
   }
};
var requestHeaderIndex = function (x930) {
   switch (x930.tag)
   {
     case "referer":
       var local_931 = x930.data;
       return 9.0;
     case "range":
       var local_932 = x930.data;
       return 4.0;
     case "contentLength":
       var local_933 = x930.data;
       return 0.0;
     case "connection":
       var local_934 = x930.data;
       return 3.0;
     case "host":
       var local_935 = x930.data;
       return 5.0;
     case "userAgent":
       var local_936 = x930.data;
       return 10.0;
     case "ifModifiedSince":
       var local_937 = x930.data;
       return 6.0;
     case "ifRange":
       var local_938 = x930.data;
       return 8.0;
     case "count":
       var local_939 = x930.data;
       return 11.0;
     case "transferEncoding":
       var local_940 = x930.data;
       return 1.0;
     case "expect":
       var local_941 = x930.data;
       return 2.0;
     case "ifUnmodifiedSince":
       var local_942 = x930.data;
       return 7.0;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_1b4c5f4e650b40db91d34fcbb46eedcc"
                                    ,"2d1d3f6c02b34a16b1ecc9cff08b339e");
   }
};
var toLower8 = function (local_948) {
   var x = function (x953) {
              return x953;
           }(_7c__7c_({infixl: _26__26_({infixl: _2264_({infixl: 65.0,infixr: local_948})
                                        ,infixr: function (local_949) {
                                           return _2264_({infixl: local_948
                                                         ,infixr: 90.0});
                                        }})
                      ,infixr: function (local_950) {
                         return _26__26_({infixl: _2264_({infixl: 192.0
                                                         ,infixr: local_948})
                                         ,infixr: function (local_951) {
                                            return _26__26_({infixl: _2264_({infixl: local_948
                                                                            ,infixr: 222.0})
                                                            ,infixr: function (local_952) {
                                                               return _2260_({infixl: local_948
                                                                             ,infixr: 215.0});
                                                            }});
                                         }});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_954 = x.data;
       return local_948;
     case "true":
       var local_955 = x.data;
       return _2b_({infixl: local_948,infixr: 32.0});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_d53402309e2246e0acda443ccc6735f8"
                                    ,"26914d49ae6cd50363dc7b55bd37d4d5");
   }
};
var numHeadItems = function (local_966) {
   return foldLazy({list: local_966.list
                   ,initial: function (local_967) {
                      return id;
                   }
                   ,binop: function (local_968) {
                      return function (local_969) {
                             var x = function (x970) {
                                        return x970;
                                     }(local_966.that(local_968.item));
                             switch (x.tag)
                             {
                               case "false":
                                 var local_971 = x.data;
                                 return local_969;
                               case "true":
                                 var local_972 = x.data;
                                 return local_968.rest({})(_2b_({infixl: local_969
                                                                ,infixr: 1.0}));
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_8e2a63199d5c4946ae51e428c77e2587"
                                                              ,"b73a61d07547543acce9e5aa2b53f447");
                             }
                          };
                   }})(0.0);
};
var parseHeader = function (local_945) {
   var local_956 = function (local_946) {
      return {headerNameOrig: local_946
             ,headerNameLower: toBytes(toArray(map({list: fromBytes(function (x947) {
                                                      return x947;
                                                   }(local_946))
                                                   ,mapping: toLower8})))};
   };
   var x = function (x958) {
              return x958;
           }(find1({start: 0.0
                   ,__bytes: function (x957) {
                      return x957;
                   }(local_945)
                   ,byte: 58.0}));
   switch (x.tag)
   {
     case "just":
       var local_959 = x.data;
       var x = Object.assign({__data: function (local_961) {
                               return slice({object: function (x962) {
                                               return x962;
                                            }(local_945)
                                            ,start: _2b_({infixl: _2b_({infixl: local_959
                                                                       ,infixr: 1.0})
                                                         ,infixr: numHeadItems({that: function (local_963) {
                                                                                  return _7c__7c_({infixl: _3d__3d_({infixl: local_963
                                                                                                                    ,infixr: 32.0})
                                                                                                  ,infixr: function (local_964) {
                                                                                                     return _3d__3d_({infixl: local_963
                                                                                                                     ,infixr: 9.0});
                                                                                                  }});
                                                                               }
                                                                               ,list: fromBytes(slice({object: function (x965) {
                                                                                                         return x965;
                                                                                                      }(local_945)
                                                                                                      ,start: _2b_({infixl: local_959
                                                                                                                   ,infixr: 1.0})
                                                                                                      ,stop: local_961}))})})
                                            ,stop: local_961});
                            }(length(function (x960) {
                               return x960;
                            }(local_945)))}
                            ,local_956(slice({object: function (x973) {
                                                return x973;
                                             }(local_945)
                                             ,start: 0.0
                                             ,stop: local_959})));
       delete x.cacheId;
       return x;
     case "nothing":
       var local_974 = x.data;
       var x = Object.assign({__data: rts.bytesFromAscii("")},local_956(local_945));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_24c62861bfb940e4addebcc337a003f8"
                                    ,"2fd2696b8bb145a1f8ea35cf6754cfb8");
   }
};
var requestHeaderIndexFromText = function (local_976) {
   var local_978 = length(function (x977) { return x977;}(local_976));
   var local_983 = function (local_979) {
      var x = function (x980) {
                 return x980;
              }(_3d__3d_({infixl: local_976,infixr: local_979.text}));
      switch (x.tag)
      {
        case "false":
          var local_981 = x.data;
          return {tag: "nothing",data: {}};
        case "true":
          var local_982 = x.data;
          return {tag: "just",data: requestHeaderIndex(local_979.value)};
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                       ,"dc1fada55c8b610b4ec39d131179bc92");
      }
   };
   var x = function (x984) { return x984;}(_3d__3d_({infixl: local_978,infixr: 4.0}));
   switch (x.tag)
   {
     case "false":
       var local_985 = x.data;
       var x = function (x986) { return x986;}(_3d__3d_({infixl: local_978,infixr: 5.0}));
       switch (x.tag)
       {
         case "false":
           var local_987 = x.data;
           var x = function (x988) {
                      return x988;
                   }(_3d__3d_({infixl: local_978,infixr: 6.0}));
           switch (x.tag)
           {
             case "false":
               var local_989 = x.data;
               var x = function (x990) {
                          return x990;
                       }(_3d__3d_({infixl: local_978,infixr: 7.0}));
               switch (x.tag)
               {
                 case "false":
                   var local_991 = x.data;
                   var x = function (x992) {
                              return x992;
                           }(_3d__3d_({infixl: local_978,infixr: 8.0}));
                   switch (x.tag)
                   {
                     case "false":
                       var local_993 = x.data;
                       var x = function (x994) {
                                  return x994;
                               }(_3d__3d_({infixl: local_978,infixr: 10.0}));
                       switch (x.tag)
                       {
                         case "false":
                           var local_995 = x.data;
                           var x = function (x996) {
                                      return x996;
                                   }(_3d__3d_({infixl: local_978,infixr: 14.0}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_997 = x.data;
                               var x = function (x998) {
                                          return x998;
                                       }(_3d__3d_({infixl: local_978,infixr: 17.0}));
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_999 = x.data;
                                   var x = function (x1000) {
                                              return x1000;
                                           }(_3d__3d_({infixl: local_978,infixr: 19.0}));
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_1001 = x.data;
                                       return {tag: "nothing",data: {}};
                                     case "true":
                                       var local_1002 = x.data;
                                       return local_983({text: rts.bytesFromAscii("if-unmodified-since")
                                                        ,value: {tag: "ifUnmodifiedSince"
                                                                ,data: {}}});
                                     default:
                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                    ,"f8cf9e99c6ebab86468dac6f079e1d43");
                                   }
                                 case "true":
                                   var local_1003 = x.data;
                                   var x = function (x1004) {
                                              return x1004;
                                           }(_3d__3d_({infixl: local_976
                                                      ,infixr: rts.bytesFromAscii("transfer-encoding")}));
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_1005 = x.data;
                                       var x = function (x1006) {
                                                  return x1006;
                                               }(_3d__3d_({infixl: local_976
                                                          ,infixr: rts.bytesFromAscii("if-modified-since")}));
                                       switch (x.tag)
                                       {
                                         case "false":
                                           var local_1007 = x.data;
                                           return {tag: "nothing",data: {}};
                                         case "true":
                                           var local_1008 = x.data;
                                           return {tag: "just"
                                                  ,data: requestHeaderIndex({tag: "ifModifiedSince"
                                                                            ,data: {}})};
                                         default:
                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                        ,"5c9b7e120cfcbfe66378a56aa55e1554");
                                       }
                                     case "true":
                                       var local_1009 = x.data;
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
                               var local_1010 = x.data;
                               return local_983({text: rts.bytesFromAscii("content-length")
                                                ,value: {tag: "contentLength",data: {}}});
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                            ,"316352807090bd4b8e1627c428b18ad0");
                           }
                         case "true":
                           var local_1011 = x.data;
                           var x = function (x1012) {
                                      return x1012;
                                   }(_3d__3d_({infixl: local_976
                                              ,infixr: rts.bytesFromAscii("user-agent")}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_1013 = x.data;
                               var x = function (x1014) {
                                          return x1014;
                                       }(_3d__3d_({infixl: local_976
                                                  ,infixr: rts.bytesFromAscii("connection")}));
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_1015 = x.data;
                                   return {tag: "nothing",data: {}};
                                 case "true":
                                   var local_1016 = x.data;
                                   return {tag: "just"
                                          ,data: requestHeaderIndex({tag: "connection"
                                                                    ,data: {}})};
                                 default:
                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                ,"0a18521fa15139803614889d5ac640f3");
                               }
                             case "true":
                               var local_1017 = x.data;
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
                       var local_1018 = x.data;
                       return local_983({text: rts.bytesFromAscii("if-range")
                                        ,value: {tag: "ifRange",data: {}}});
                     default:
                       throw rts.exceptions.LamduBug("Unhandled case"
                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                    ,"0c12468dbe34d1382d0b97b93b5cab94");
                   }
                 case "true":
                   var local_1019 = x.data;
                   return local_983({text: rts.bytesFromAscii("referer")
                                    ,value: {tag: "referer",data: {}}});
                 default:
                   throw rts.exceptions.LamduBug("Unhandled case"
                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                ,"13eb12f71c41a5c676528975f4cd2d8f");
               }
             case "true":
               var local_1020 = x.data;
               return local_983({text: rts.bytesFromAscii("expect")
                                ,value: {tag: "expect",data: {}}});
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                            ,"a709b7964f58d9b479a336260545d465");
           }
         case "true":
           var local_1021 = x.data;
           return local_983({text: rts.bytesFromAscii("range")
                            ,value: {tag: "range",data: {}}});
         default:
           throw rts.exceptions.LamduBug("Unhandled case"
                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                        ,"1d20a17a150e74e964a7731e9e75cc90");
       }
     case "true":
       var local_1022 = x.data;
       return local_983({text: rts.bytesFromAscii("host"),value: {tag: "host",data: {}}});
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                    ,"b082b30c0d03c8abd35416fd055c4e65");
   }
};
var parseHeaders = function (local_928) {
   var local_1031 = runMutArray(_3b_({infixl: newMutArray
                                     ,infixr: function (local_929) {
                                        return _3b_({infixl: sequence__(replicate({count: requestHeaderIndex({tag: "count"
                                                                                                             ,data: {}})
                                                                                  ,item: appendMutArray({object: local_929
                                                                                                        ,value: {tag: "nothing"
                                                                                                                ,data: {}}})}))
                                                    ,infixr: function (local_943) {
                                                       return _3b_({infixl: sequence__(map({list: _2e__2e_({start: 1.0
                                                                                                           ,stop: length1(local_928)})
                                                                                           ,mapping: function (local_944) {
                                                                                              var local_975 =
                                                                                              parseHeader(item({index: local_944
                                                                                                               ,object: local_928}));
                                                                                              var local_1023 =
                                                                                              requestHeaderIndexFromText(local_975.headerNameLower);
                                                                                              var x =
                                                                                              function (x1024) {
                                                                                                 return x1024;
                                                                                              }(local_1023);
                                                                                              switch (x.tag)
                                                                                              {
                                                                                                case "just":
                                                                                                  var index7 =
                                                                                                  x.data;
                                                                                                  return _3b_({infixl: readMutArray({index: index7
                                                                                                                                    ,object: local_929})
                                                                                                              ,infixr: function (local_1025) {
                                                                                                                 var x =
                                                                                                                 function (x1026) {
                                                                                                                    return x1026;
                                                                                                                 }(local_1025);
                                                                                                                 switch (x.tag)
                                                                                                                 {
                                                                                                                   case "just":
                                                                                                                     var local_1027 =
                                                                                                                     x.data;
                                                                                                                     throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                                                                                     ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                     ,"0ba4efe1ab9b937a5c4c329950c130eb");
                                                                                                                   case "nothing":
                                                                                                                     var local_1028 =
                                                                                                                     x.data;
                                                                                                                     return writeMutArray({index: index7
                                                                                                                                          ,object: local_929
                                                                                                                                          ,value: {tag: "just"
                                                                                                                                                  ,data: local_975.__data}});
                                                                                                                   default:
                                                                                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                  ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                  ,"46e58c07915691b0449b51e2c57e8c26");
                                                                                                                 }
                                                                                                              }});
                                                                                                case "nothing":
                                                                                                  var local_1029 =
                                                                                                  x.data;
                                                                                                  return __return({});
                                                                                                default:
                                                                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                               ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                               ,"96d7c2e4942aa324705674b28c8d8892");
                                                                                              }
                                                                                           }}))
                                                                   ,infixr: function (local_1030) {
                                                                      return __return(local_929);
                                                                   }});
                                                    }});
                                     }}));
   var value = function (local_1032) {
      return item({index: requestHeaderIndex(local_1032),object: local_1031});
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
var parseHttpVersion = function (local_1038) {
   var x = function (x1044) {
              return x1044;
           }(_26__26_({infixl: _3d__3d_({infixl: slice({object: function (x1039) {
                                                          return x1039;
                                                       }(local_1038)
                                                       ,start: 0.0
                                                       ,stop: 5.0})
                                        ,infixr: rts.bytesFromAscii("HTTP/")})
                      ,infixr: function (local_1040) {
                         return _26__26_({infixl: _3d__3d_({infixl: slice({object: function (x1041) {
                                                                             return x1041;
                                                                          }(local_1038)
                                                                          ,start: 6.0
                                                                          ,stop: 7.0})
                                                           ,infixr: rts.bytesFromAscii(".")})
                                         ,infixr: function (local_1042) {
                                            return _2265_({infixl: length(function (x1043) {
                                                             return x1043;
                                                          }(local_1038))
                                                          ,infixr: 8.0});
                                         }});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_1045 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                       ,"d4d438d8b8c3035dd13c03c182e694f8");
     case "true":
       var local_1046 = x.data;
       var local_1048 = byteAt({index: 5.0
                               ,object: function (x1047) {
                                  return x1047;
                               }(local_1038)});
       var local_1050 = byteAt({index: 7.0
                               ,object: function (x1049) {
                                  return x1049;
                               }(local_1038)});
       var x = function (x1051) {
                  return x1051;
               }(_3d__3d_({infixl: local_1048,infixr: 49.0}));
       switch (x.tag)
       {
         case "false":
           var local_1052 = x.data;
           var x = function (x1054) {
                      return x1054;
                   }(_26__26_({infixl: _3d__3d_({infixl: local_1048,infixr: 50.0})
                              ,infixr: function (local_1053) {
                                 return _3d__3d_({infixl: local_1050,infixr: 48.0});
                              }}));
           switch (x.tag)
           {
             case "false":
               var local_1055 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_1056 = x.data;
               return {minor: 0.0,major: 2.0};
             default:
               throw rts.exceptions.LamduBug("Unhandled case"
                                            ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                            ,"6d72ed51030c146e142824d8c5608502");
           }
         case "true":
           var local_1057 = x.data;
           var x = function (x1058) {
                      return x1058;
                   }(_3d__3d_({infixl: local_1050,infixr: 49.0}));
           switch (x.tag)
           {
             case "false":
               var local_1059 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_1060 = x.data;
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
var parseHttpPathAndQuery = function (local_1061) {
   var x = function (x1063) {
              return x1063;
           }(find1({start: 0.0
                   ,__bytes: function (x1062) {
                      return x1062;
                   }(local_1061)
                   ,byte: 63.0}));
   switch (x.tag)
   {
     case "just":
       var local_1064 = x.data;
       return {path: slice({object: function (x1065) {
                              return x1065;
                           }(local_1061)
                           ,start: 0.0
                           ,stop: local_1064})
              ,query: slice({object: function (x1066) {
                               return x1066;
                            }(local_1061)
                            ,start: local_1064
                            ,stop: length(function (x1067) {
                               return x1067;
                            }(local_1061))})};
     case "nothing":
       var local_1068 = x.data;
       return {path: local_1061,query: rts.bytesFromAscii("")};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_e1ddf2e103fc4a77ba877761b12b0489"
                                    ,"7b5454e4261c24d201d9384e83ca385c");
   }
};
var parseRequestLine = function (local_1033) {
   var local_1034 = toArray(split({text: local_1033,seperator: rts.bytesFromAscii(" ")}));
   var x = function (x1035) {
              return x1035;
           }(_3d__3d_({infixl: length1(local_1034),infixr: 3.0}));
   switch (x.tag)
   {
     case "false":
       var local_1036 = x.data;
       throw rts.exceptions.ReachedHole("Reached a hole"
                                       ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                       ,"a7de8d96fb5e1479e6bb2a3ddb6eeaaa");
     case "true":
       var local_1037 = x.data;
       var x = Object.assign({httpVersion: parseHttpVersion(item({index: 2.0
                                                                 ,object: local_1034}))
                             ,method: item({index: 0.0,object: local_1034})}
                            ,parseHttpPathAndQuery(item({index: 1.0
                                                        ,object: local_1034})));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                    ,"1a29dea7dd98168ceba76256560b374b");
   }
};
var isPrefixOf = function (local_1083) {
   var local_1084 = length(local_1083.whole);
   var local_1085 = length(local_1083.prefix);
   return _26__26_({infixl: _2265_({infixl: local_1084,infixr: local_1085})
                   ,infixr: function (local_1086) {
                      return _3d__3d_({infixl: slice({object: local_1083.whole
                                                     ,start: 0.0
                                                     ,stop: local_1085})
                                      ,infixr: local_1083.prefix});
                   }});
};
var unprefixed = function (local_1082) {
   var x = function (x1087) {
              return x1087;
           }(isPrefixOf({whole: local_1082.whole,prefix: local_1082.prefix}));
   switch (x.tag)
   {
     case "false":
       var local_1088 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_1089 = x.data;
       return {tag: "just"
              ,data: slice({object: local_1082.whole
                           ,start: length(local_1082.prefix)
                           ,stop: length(local_1082.whole)})};
     default:
       throw rts.exceptions.LamduBug("Unhandled case"
                                    ,"DEF_1d18b3f94ac64cc39b8dc131624a5e9f"
                                    ,"2de3ba5a8affabb154216378ec3580e6");
   }
};
var httpAddLocalPath = function (local_1069) {
   var local_1070 = local_1069.path;
   var nonEmpty = function (local_1071) {
      var x = function (x1072) {
                 return x1072;
              }(_3d__3d_({infixl: local_1071,infixr: rts.bytesFromAscii("")}));
      switch (x.tag)
      {
        case "false":
          var local_1073 = x.data;
          return local_1071;
        case "true":
          var local_1074 = x.data;
          return rts.bytesFromAscii("/");
        default:
          throw rts.exceptions.LamduBug("Unhandled case"
                                       ,"DEF_97b5de980c3149218877e33920fb5729"
                                       ,"5ae9e78cf85c5d6952c38eb479596553");
      }
   };
   var local_1079 = function (local_1075) {
      return nonEmpty(function () {
             var x = function (x1076) {
                        return x1076;
                     }(find1({start: 0.0,__bytes: local_1075,byte: 47.0}));
             switch (x.tag)
             {
               case "just":
                 var local_1077 = x.data;
                 return slice({object: local_1075
                              ,start: local_1077
                              ,stop: length(local_1075)});
               case "nothing":
                 var local_1078 = x.data;
                 return rts.bytesFromAscii("");
               default:
                 throw rts.exceptions.LamduBug("Unhandled case"
                                              ,"DEF_97b5de980c3149218877e33920fb5729"
                                              ,"8d9250a6123ff265d7652592a88c96a8");
             }
          }());
   };
   var x = Object.assign({localPath: function () {
                           var x = function (x1090) {
                                      return x1090;
                                   }(unprefixed({whole: function (x1080) {
                                                   return x1080;
                                                }(local_1070)
                                                ,prefix: function (x1081) {
                                                   return x1081;
                                                }(rts.bytesFromAscii("http://"))}));
                           switch (x.tag)
                           {
                             case "just":
                               return local_1079(x.data);
                             case "nothing":
                               var local_1091 = x.data;
                               var x = function (x1094) {
                                          return x1094;
                                       }(unprefixed({whole: function (x1092) {
                                                       return x1092;
                                                    }(local_1070)
                                                    ,prefix: function (x1093) {
                                                       return x1093;
                                                    }(rts.bytesFromAscii("https://"))}));
                               switch (x.tag)
                               {
                                 case "just":
                                   return local_1079(x.data);
                                 case "nothing":
                                   var local_1095 = x.data;
                                   return nonEmpty(local_1070);
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
                        ,local_1069);
   delete x.cacheId;
   return x;
};
var httpContinueMessage = function (local_1099) {
   return concat2(_3a__3a_({infixl: function () {
                              var x = function (x1100) {
                                         return x1100;
                                      }(_3d__3d_({infixl: local_1099
                                                 ,infixr: {minor: 1.0,major: 1.0}}));
                              switch (x.tag)
                              {
                                case "false":
                                  var local_1101 = x.data;
                                  return function (x1102) {
                                         return x1102;
                                      }(rts.bytesFromAscii("HTTP/1.0"));
                                case "true":
                                  var local_1103 = x.data;
                                  return function (x1104) {
                                         return x1104;
                                      }(rts.bytesFromAscii("HTTP/1.1"));
                                default:
                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                               ,"DEF_28b20b49b76041158f817cb6f1ae7069"
                                                               ,"7a33dc1474f28318b0a1a21410017295");
                              }
                           }()
                           ,infixr: function (local_1105) {
                              return _3a__3a_({infixl: function (x1106) {
                                                 return x1106;
                                              }(rts.bytesFromAscii(" 100 Continue"))
                                              ,infixr: function (local_1107) {
                                                 return _3a__3a_({infixl: rts.bytes([13
                                                                                    ,10
                                                                                    ,13
                                                                                    ,10])
                                                                 ,infixr: function (local_1108) {
                                                                    return {tag: "empty"
                                                                           ,data: {}};
                                                                 }});
                                              }});
                           }}));
};
var parseHttpRequestPacket = function (local_835) {
   var local_844 = _3b_({infixl: popLastMutArray(local_835.unparsedPackets)
                        ,infixr: function (local_840) {
                           var x = function (x841) { return x841;}(local_840);
                           switch (x.tag)
                           {
                             case "just":
                               var local_842 = x.data;
                               return parseHttpRequestPacket({socket: local_835.socket
                                                             ,unparsedPackets: local_835.unparsedPackets
                                                             ,newPacket: local_842
                                                             ,stateRef: local_835.stateRef
                                                             ,handler: local_835.handler});
                             case "nothing":
                               var local_843 = x.data;
                               return __return({});
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                            ,"a71ca59bb3302212a2d667ac7d89c4e8");
                           }
                        }});
   return _3b_({infixl: readMutRef(local_835.stateRef)
               ,infixr: function (x845) {
                  switch (x845.tag)
                  {
                    case "body":
                      var local_846 = x845.data;
                      var local_847 = length(local_835.newPacket);
                      var x = function (x848) {
                                 return x848;
                              }(_3c_({infixl: local_847,infixr: local_846.remain}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_849 = x.data;
                          return _3b_({infixl: length4(local_835.unparsedPackets)
                                      ,infixr: function (local_850) {
                                         return _3b_({infixl: sequence(map({list: _2e__2e_({start: 0.0
                                                                                           ,stop: local_850})
                                                                           ,mapping: function (local_851) {
                                                                              return readMutArray({index: local_851
                                                                                                  ,object: local_835.unparsedPackets});
                                                                           }}))
                                                     ,infixr: function (packets) {
                                                        return _3b_({infixl: _3b_({infixl: truncateMutArray({object: local_835.unparsedPackets
                                                                                                            ,stop: 0.0})
                                                                                  ,infixr: function (local_852) {
                                                                                     return local_835.handler({request: function () {
                                                                                                                 var x =
                                                                                                                 Object.assign({body: {tag: "just"
                                                                                                                                      ,data: concat2(_2b__2b_2({infixl: packets
                                                                                                                                                               ,infixr: function (local_853) {
                                                                                                                                                                  return _3a__3a_({infixl: slice({object: local_835.newPacket
                                                                                                                                                                                                 ,start: 0.0
                                                                                                                                                                                                 ,stop: local_846.remain})
                                                                                                                                                                                  ,infixr: function (local_854) {
                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                  }});
                                                                                                                                                               }}))}}
                                                                                                                              ,local_846.request);
                                                                                                                 delete x.cacheId;
                                                                                                                 return x;
                                                                                                              }()
                                                                                                              ,socket: local_835.socket});
                                                                                  }})
                                                                    ,infixr: function (local_855) {
                                                                       return _3b_({infixl: writeMutRef({object: local_835.stateRef
                                                                                                        ,value: {tag: "header"
                                                                                                                ,data: {}}})
                                                                                   ,infixr: function (local_856) {
                                                                                      var x =
                                                                                      function (x857) {
                                                                                         return x857;
                                                                                      }(_3c_({infixl: local_846.remain
                                                                                             ,infixr: local_847}));
                                                                                      switch (x.tag)
                                                                                      {
                                                                                        case "false":
                                                                                          var local_858 =
                                                                                          x.data;
                                                                                          return __return({});
                                                                                        case "true":
                                                                                          var local_859 =
                                                                                          x.data;
                                                                                          return parseHttpRequestPacket({socket: local_835.socket
                                                                                                                        ,unparsedPackets: local_835.unparsedPackets
                                                                                                                        ,newPacket: slice({object: local_835.newPacket
                                                                                                                                          ,start: local_846.remain
                                                                                                                                          ,stop: local_847})
                                                                                                                        ,stateRef: local_835.stateRef
                                                                                                                        ,handler: local_835.handler});
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
                          var local_860 = x.data;
                          return _3b_({infixl: appendMutArray({object: local_835.unparsedPackets
                                                              ,value: local_835.newPacket})
                                      ,infixr: function (local_861) {
                                         return writeMutRef({object: local_835.stateRef
                                                            ,value: {tag: "body"
                                                                    ,data: {request: local_846.request
                                                                           ,remain: _2d_({infixl: local_846.remain
                                                                                         ,infixr: local_847})}}});
                                      }});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                       ,"4a7857b1e6dc15eee111f928eef30ceb");
                      }
                    case "header":
                      var local_862 = x845.data;
                      return _3b_({infixl: parseHttpHeaderPacket({start: 0.0
                                                                 ,newPacket: local_835.newPacket
                                                                 ,packets: local_835.unparsedPackets})
                                  ,infixr: function (local_925) {
                                     var x = function (x926) { return x926;}(local_925);
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_927 = x.data;
                                         var request1 = function () {
                                                           var x =
                                                           Object.assign({headers: parseHeaders(local_927)}
                                                                        ,httpAddLocalPath(parseRequestLine(item({index: 0.0
                                                                                                                ,object: local_927}))));
                                                           delete x.cacheId;
                                                           return x;
                                                        }();
                                         return _3b_({infixl: function () {
                                                        var x = function (x1096) {
                                                                   return x1096;
                                                                }(_3d__3d_({infixl: request1.headers.expect
                                                                           ,infixr: {tag: "just"
                                                                                    ,data: rts.bytesFromAscii("100-continue")}}));
                                                        switch (x.tag)
                                                        {
                                                          case "false":
                                                            var local_1097 = x.data;
                                                            return __return({});
                                                          case "true":
                                                            var local_1098 = x.data;
                                                            return send({__data: httpContinueMessage(request1.httpVersion)
                                                                        ,socket: local_835.socket});
                                                          default:
                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                         ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                         ,"0010e59778d59572282a2dab5b43c99f");
                                                        }
                                                     }()
                                                     ,infixr: function (local_1109) {
                                                        return _3b_({infixl: function () {
                                                                       var x =
                                                                       function (x1110) {
                                                                          return x1110;
                                                                       }(request1.headers.contentLength);
                                                                       switch (x.tag)
                                                                       {
                                                                         case "just":
                                                                           var local_1111 =
                                                                           x.data;
                                                                           return writeMutRef({object: local_835.stateRef
                                                                                              ,value: {tag: "body"
                                                                                                      ,data: {request: request1
                                                                                                             ,remain: parseInt(local_1111)}}});
                                                                         case "nothing":
                                                                           var local_1112 =
                                                                           x.data;
                                                                           return local_835.handler({request: function () {
                                                                                                       var x =
                                                                                                       Object.assign({body: {tag: "nothing"
                                                                                                                            ,data: {}}}
                                                                                                                    ,request1);
                                                                                                       delete x.cacheId;
                                                                                                       return x;
                                                                                                    }()
                                                                                                    ,socket: local_835.socket});
                                                                         default:
                                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                        ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                        ,"c91c5cea0890a94419165f2c0e413659");
                                                                       }
                                                                    }()
                                                                    ,infixr: function (local_1113) {
                                                                       return local_844;
                                                                    }});
                                                     }});
                                       case "nothing":
                                         var local_1114 = x.data;
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
var parseHttpRequests = function (local_833) {
   return _3b_({infixl: newMutRef({tag: "header",data: {}})
               ,infixr: function (stateRef) {
                  return _3b_({infixl: newMutArray
                              ,infixr: function (unparsedPackets) {
                                 return __return(function (local_834) {
                                        return parseHttpRequestPacket({socket: local_833.socket
                                                                      ,unparsedPackets: unparsedPackets
                                                                      ,newPacket: local_834
                                                                      ,stateRef: stateRef
                                                                      ,handler: local_833.handler});
                                     });
                              }});
               }});
};
var openTcpServer = rts.builtins.IO.network["openTcpServer"];
var httpServer = function (local_821) {
   return openTcpServer({connectionHandler: function (socket) {
                           return parseHttpRequests({socket: socket
                                                    ,handler: function (local_822) {
                                                       return _3b_({infixl: local_821.handler(local_822.request)
                                                                   ,infixr: function (local_823) {
                                                                      return send({__data: _2b__2b_1({a: function (x832) {
                                                                                                        return x832;
                                                                                                     }(join({texts: _3a__3a_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("HTTP/1.1")
                                                                                                                                                            ,infixr: function (local_824) {
                                                                                                                                                               return _3a__3a_({infixl: showNum(local_823.status.code)
                                                                                                                                                                               ,infixr: function (local_825) {
                                                                                                                                                                                  return _3a__3a_({infixl: local_823.status.message
                                                                                                                                                                                                  ,infixr: function (local_826) {
                                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                                  }});
                                                                                                                                                                               }});
                                                                                                                                                            }})
                                                                                                                                           ,seperator: rts.bytesFromAscii(" ")})
                                                                                                                             ,infixr: function (local_827) {
                                                                                                                                return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Type: ")
                                                                                                                                                                  ,b: local_823.content.mimeType})
                                                                                                                                                ,infixr: function (local_828) {
                                                                                                                                                   return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Length: ")
                                                                                                                                                                                     ,b: showNum(length(local_823.content.__data))})
                                                                                                                                                                   ,infixr: function (local_829) {
                                                                                                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                      ,infixr: function (local_830) {
                                                                                                                                                                                         return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                                         ,infixr: function (local_831) {
                                                                                                                                                                                                            return {tag: "empty"
                                                                                                                                                                                                                   ,data: {}};
                                                                                                                                                                                                         }});
                                                                                                                                                                                      }});
                                                                                                                                                                   }});
                                                                                                                                                }});
                                                                                                                             }})
                                                                                                            ,seperator: rts.bytesFromAscii("\r\n")}))
                                                                                                     ,b: local_823.content.__data})
                                                                                  ,socket: socket});
                                                                   }});
                                                    }});
                        }
                        ,exclusive: {tag: "false",data: {}}
                        ,host: local_821.host
                        ,port: local_821.port});
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
