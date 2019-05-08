"use strict";
var rts = require("rts.js");
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
           throw rts.exceptions.UnhandledCase("DEF_ef15e9ece99a44fc9a41740a570f3fc9"
                                             ,"388ac081138d4b3bb98f2c7c6c5674d6");
       }
     case "empty":
       var local_29 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_ef15e9ece99a44fc9a41740a570f3fc9"
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
                      throw rts.exceptions.UnhandledCase("DEF_976e4af994d74546b61bfcdc6bf2c950"
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
           throw rts.exceptions.UnhandledCase("DEF_8a1642b8d2ef4d669df333f01821017e"
                                             ,"dc5bff2c6387486ea6f4d43193feaf06");
       }
     case "empty":
       var local_36 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_8a1642b8d2ef4d669df333f01821017e"
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
       throw rts.exceptions.UnhandledCase("DEF_b21053ea92ed45029fa78a5121bf6e3a"
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
       throw rts.exceptions.UnhandledCase("DEF_a2dc21b7c3b04474a4cd67135dd74e65"
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
       throw rts.exceptions.UnhandledCase("DEF_e75aed3cb68c4fd395ce0c5c287eadba"
                                         ,"b49d483abc72480a838ef25795ee9758");
   }
};
var ignoreError = function (local_64) {
   throw rts.exceptions.ReachedHole("DEF_157261c59c9a44f1867b85e4d1b49818"
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
       throw rts.exceptions.UnhandledCase("DEF_d742e997601e4a6f9fab3277d9fb50d5"
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
              throw rts.exceptions.ReachedHole("DEF_5e281136bf384c60bf0fda3ed9d59365"
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
                  throw rts.exceptions.ReachedHole("DEF_5e281136bf384c60bf0fda3ed9d59365"
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
               throw rts.exceptions.ReachedHole("DEF_5e281136bf384c60bf0fda3ed9d59365"
                                               ,"5f05f8b37b1c7b3e9433533043cfce0c");
             case "true":
               var local_73 = x.data;
               return {database: item({index: 3.0,object: local_56})
                      ,host: item({index: 1.0,object: local_70})
                      ,password: item({index: 0.0,object: local_70})
                      ,port: parseInt(item({index: 2.0,object: local_66}))
                      ,user: item({index: 0.0,object: local_66})};
             default:
               throw rts.exceptions.UnhandledCase("DEF_5e281136bf384c60bf0fda3ed9d59365"
                                                 ,"0fef265c92877b87a9625a41bc75d47e");
           }
         default:
           throw rts.exceptions.UnhandledCase("DEF_5e281136bf384c60bf0fda3ed9d59365"
                                             ,"36c2c6bc2ac853ecdad25882e9dff9b3");
       }
     default:
       throw rts.exceptions.UnhandledCase("DEF_5e281136bf384c60bf0fda3ed9d59365"
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
                                    throw rts.exceptions.UnhandledCase("DEF_310093b260fa4b6cb5bea69115ecdcd7"
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
           throw rts.exceptions.UnhandledCase("DEF_efdcd00625534eb5b480c13776995953"
                                             ,"3484afddcc5745189195b1b977bc31a4");
       }
     case "true":
       var local_103 = x.data;
       return local_97.list;
     default:
       throw rts.exceptions.UnhandledCase("DEF_efdcd00625534eb5b480c13776995953"
                                         ,"f4402d1f89754f369b736a668f8d2784");
   }
};
var _2b__2b_2 = function (local_125) {
   return foldLazy({list: local_125.infixl
                   ,initial: local_125.infixr
                   ,binop: function (local_126) {
                      return {tag: "nonEmpty"
                             ,data: {head: local_126.item,tail: local_126.rest}};
                   }});
};
var toBytes = rts.builtins.Bytes["fromArray"];
var _2b__2b_1 = function (local_123) {
   return toBytes(toArray(_2b__2b_2({infixl: fromBytes(local_123.a)
                                    ,infixr: function (local_124) {
                                       return fromBytes(local_123.b);
                                    }})));
};
var _2b__2b_ = function (local_120) {
   return _2b__2b_1({a: function (x121) {
                       return x121;
                    }(local_120.a)
                    ,b: function (x122) {
                       return x122;
                    }(local_120.b)});
};
var httpNotFound404 = function (local_119) {
   return {content: {__data: function (x127) {
                       return x127;
                    }(_2b__2b_({a: rts.bytesFromAscii("Not found: "),b: local_119}))
                    ,mimeType: rts.bytesFromAscii("text/plain")}
          ,status: {message: rts.bytesFromAscii("Not Found"),code: 404.0}};
};
var query = rts.builtins.IO.database.postgres["query"];
var _7c__7c_ = function (local_138) {
   var x = function (x139) { return x139;}(local_138.infixl);
   switch (x.tag)
   {
     case "false":
       return local_138.infixr(x.data);
     case "true":
       var local_140 = x.data;
       return {tag: "true",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_dff4e86e63c54fab8b58ab3fe7e440ad"
                                         ,"cc82dca9551140c9af0084b786718cc5");
   }
};
var anyOf = function (local_135) {
   return foldLazy({list: local_135.list
                   ,initial: function (local_136) {
                      return {tag: "false",data: {}};
                   }
                   ,binop: function (local_137) {
                      return _7c__7c_({infixl: local_135.satisfy(local_137.item)
                                      ,infixr: local_137.rest});
                   }});
};
var pestovalAuth = function (local_130) {
   return _3b_({infixl: query({database: local_130.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT pestoval_teacher.id, pestoval_teacher.is_admin\nFROM pestoval_teacher\nWHERE pestoval_teacher.password = \'")
                                                             ,b: local_130.password})
                                                ,b: rts.bytesFromAscii("\'")})})
               ,infixr: function (x131) {
                  switch (x131.tag)
                  {
                    case "error":
                      var local_132 = x131.data;
                      return ignoreError(local_132);
                    case "success":
                      var local_133 = x131.data;
                      return __return(function () {
                             var x = function (x141) {
                                        return x141;
                                     }(anyOf({list: fromArray(local_133.__data)
                                             ,satisfy: function (local_134) {
                                                return _3d__3d_({infixl: item({index: 1.0
                                                                              ,object: local_134})
                                                                ,infixr: rts.bytesFromAscii("true")});
                                             }}));
                             switch (x.tag)
                             {
                               case "false":
                                 var local_142 = x.data;
                                 var x = function (x145) {
                                            return x145;
                                         }(anyOf({list: fromArray(local_133.__data)
                                                 ,satisfy: function (local_143) {
                                                    var teacher =
                                                    parseInt(item({index: 0.0
                                                                  ,object: local_143}));
                                                    return anyOf({list: fromArray(local_130.teachers)
                                                                 ,satisfy: function (local_144) {
                                                                    return _3d__3d_({infixl: local_144.id
                                                                                    ,infixr: teacher});
                                                                 }});
                                                 }}));
                                 switch (x.tag)
                                 {
                                   case "false":
                                     var local_146 = x.data;
                                     return {tag: "unauthorized",data: {}};
                                   case "true":
                                     var local_147 = x.data;
                                     return {tag: "teacher",data: {}};
                                   default:
                                     throw rts.exceptions.UnhandledCase("DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                                       ,"63099f6a8ec233abc1896a5e6518eaf6");
                                 }
                               case "true":
                                 var local_148 = x.data;
                                 return {tag: "admin",data: {}};
                               default:
                                 throw rts.exceptions.UnhandledCase("DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                                   ,"b84d758acd2ea6369ce2cf3b7a5967f8");
                             }
                          }());
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                        ,"1f18689701297d125d3c9c40f71dabaf");
                  }
               }});
};
var concat = function (list2) {
   return foldLazy({list: list2
                   ,initial: function (local_166) {
                      return {tag: "empty",data: {}};
                   }
                   ,binop: function (local_167) {
                      return _2b__2b_2({infixl: local_167.item,infixr: local_167.rest});
                   }});
};
var intersperse = function (local_159) {
   var x = function (x160) { return x160;}(local_159.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_161 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_161.head
                     ,tail: function (local_162) {
                        return concat(map({list: local_161.tail({})
                                          ,mapping: function (local_163) {
                                             return {tag: "nonEmpty"
                                                    ,data: {head: local_159.item
                                                           ,tail: function (local_164) {
                                                              return {tag: "nonEmpty"
                                                                     ,data: {head: local_163
                                                                            ,tail: function (local_165) {
                                                                               return {tag: "empty"
                                                                                      ,data: {}};
                                                                            }}};
                                                           }}};
                                          }}));
                     }}};
     case "empty":
       var local_168 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_579c35851cfc4b5aa7495fd3f68d64f9"
                                         ,"7e436409026e4dd49fb7d2389f2caa1d");
   }
};
var concat2 = function (list4) {
   return toBytes(toArray(concat(map({list: list4,mapping: fromBytes}))));
};
var concat1 = concat2;
var join = function (local_158) {
   return concat1(intersperse({list: local_158.texts,item: local_158.seperator}));
};
var replace = function (local_157) {
   return join({texts: split({text: local_157.text,seperator: local_157.from})
               ,seperator: local_157.to});
};
var _2265_ = rts.builtins.Prelude[">="];
var parseHex = function (text1) {
   var local_198 = function (local_181) {
      var x = function (x182) { return x182;}(_2264_({infixl: local_181,infixr: 57.0}));
      switch (x.tag)
      {
        case "false":
          var local_183 = x.data;
          var x = function (x184) {
                     return x184;
                  }(_2264_({infixl: local_181,infixr: 70.0}));
          switch (x.tag)
          {
            case "false":
              var local_185 = x.data;
              var x = function (x187) {
                         return x187;
                      }(_26__26_({infixl: _2264_({infixl: 97.0,infixr: local_181})
                                 ,infixr: function (local_186) {
                                    return _2264_({infixl: local_181,infixr: 102.0});
                                 }}));
              switch (x.tag)
              {
                case "false":
                  var local_188 = x.data;
                  throw rts.exceptions.ReachedHole("DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"6361c631c359bf491a698736b910c593");
                case "true":
                  var local_189 = x.data;
                  return _2d_({infixl: local_181,infixr: 87.0});
                default:
                  throw rts.exceptions.UnhandledCase("DEF_4f118917db8f441092ec9e2d00784d9e"
                                                    ,"5a1355193393bda93a2c8e331b53d26c");
              }
            case "true":
              var local_190 = x.data;
              var x = function (x191) {
                         return x191;
                      }(_2264_({infixl: 65.0,infixr: local_181}));
              switch (x.tag)
              {
                case "false":
                  var local_192 = x.data;
                  throw rts.exceptions.ReachedHole("DEF_4f118917db8f441092ec9e2d00784d9e"
                                                  ,"d856f42600765d7302f46b291563ca8f");
                case "true":
                  var local_193 = x.data;
                  return _2d_({infixl: local_181,infixr: 55.0});
                default:
                  throw rts.exceptions.UnhandledCase("DEF_4f118917db8f441092ec9e2d00784d9e"
                                                    ,"55268330b464548c2a0a1fadd767c020");
              }
            default:
              throw rts.exceptions.UnhandledCase("DEF_4f118917db8f441092ec9e2d00784d9e"
                                                ,"38523be8c44a3cbcb9944c83067688a3");
          }
        case "true":
          var local_194 = x.data;
          var x = function (x195) {
                     return x195;
                  }(_2264_({infixl: 48.0,infixr: local_181}));
          switch (x.tag)
          {
            case "false":
              var local_196 = x.data;
              throw rts.exceptions.ReachedHole("DEF_4f118917db8f441092ec9e2d00784d9e"
                                              ,"c930879571c8b455c7030f716fce3db8");
            case "true":
              var local_197 = x.data;
              return _2d_({infixl: local_181,infixr: 48.0});
            default:
              throw rts.exceptions.UnhandledCase("DEF_4f118917db8f441092ec9e2d00784d9e"
                                                ,"1b5c2c85846fb25efd189742c382cd3f");
          }
        default:
          throw rts.exceptions.UnhandledCase("DEF_4f118917db8f441092ec9e2d00784d9e"
                                            ,"e97ad8b1282bfa2bad0ce76b4c4be651");
      }
   };
   return fold({list: fromBytes(function (x199) {
                  return x199;
               }(text1))
               ,initial: 0.0
               ,binop: function (local_200) {
                  return _2b_({infixl: _2a_({infixl: local_200.acc,infixr: 16.0})
                              ,infixr: local_198(local_200.item)});
               }});
};
var singleton = function (local_201) { return [local_201];};
var decodeUrl = function (text) {
   return concat1(function () {
          var x = function (x172) {
                     return x172;
                  }(split({text: replace({text: text
                                         ,from: rts.bytesFromAscii("+")
                                         ,to: rts.bytesFromAscii(" ")})
                          ,seperator: rts.bytesFromAscii("%")}));
          switch (x.tag)
          {
            case "nonEmpty":
              var local_173 = x.data;
              return _3a__3a_({infixl: local_173.head
                              ,infixr: function (local_174) {
                                 return map({list: local_173.tail({})
                                            ,mapping: function (local_175) {
                                               var x = function (x177) {
                                                          return x177;
                                                       }(_2265_({infixl: length(function (x176) {
                                                                   return x176;
                                                                }(local_175))
                                                                ,infixr: 2.0}));
                                               switch (x.tag)
                                               {
                                                 case "false":
                                                   var local_178 = x.data;
                                                   throw rts.exceptions.ReachedHole("DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                   ,"dc688712fae3cce5d326448fdfdec2a5");
                                                 case "true":
                                                   var local_179 = x.data;
                                                   return _2b__2b_({a: toBytes(singleton(parseHex(slice({object: function (x180) {
                                                                                                           return x180;
                                                                                                        }(local_175)
                                                                                                        ,start: 0.0
                                                                                                        ,stop: 2.0}))))
                                                                   ,b: slice({object: function (x203) {
                                                                                return x203;
                                                                             }(local_175)
                                                                             ,start: 2.0
                                                                             ,stop: length(function (x204) {
                                                                                return x204;
                                                                             }(local_175))})});
                                                 default:
                                                   throw rts.exceptions.UnhandledCase("DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                                                     ,"3d161b85ea84c55ce4d08379f720f0c6");
                                               }
                                            }});
                              }});
            case "empty":
              var local_205 = x.data;
              return {tag: "empty",data: {}};
            default:
              throw rts.exceptions.UnhandledCase("DEF_70b3c006524d443aaa9ff90bed5a839f"
                                                ,"a27f7e5bb742b4c492509cfb987f05dd");
          }
       }());
};
var parsePostBody = function (body) {
   return map({list: split({text: body,seperator: rts.bytesFromAscii("&")})
              ,mapping: function (field) {
                 var local_153 = toArray(split({text: field
                                               ,seperator: rts.bytesFromAscii("=")}));
                 var x = function (x154) {
                            return x154;
                         }(_3d__3d_({infixl: length1(local_153),infixr: 2.0}));
                 switch (x.tag)
                 {
                   case "false":
                     var local_155 = x.data;
                     return ignoreError(function () {
                            throw rts.exceptions.ReachedHole("DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                            ,"c4215356d194f30cdd17797a99d63ff1");
                         }());
                   case "true":
                     var local_156 = x.data;
                     return {value: decodeUrl(item({index: 1.0,object: local_153}))
                            ,key: item({index: 0.0,object: local_153})};
                   default:
                     throw rts.exceptions.UnhandledCase("DEF_d69dc68a4259450eacc868e09b96f1f4"
                                                       ,"611148533b9174ce687e759e68987e1b");
                 }
              }});
};
var pestovalUnauthorized = {content: {__data: function (x209) {
                                        return x209;
                                     }(rts.bytesFromAscii("Not authorized to edit"))
                                     ,mimeType: rts.bytesFromAscii("text/plain")}
                           ,status: {message: rts.bytesFromAscii("Unauthorized")
                                    ,code: 403.0}};
var _2f__2f_ = rts.builtins.Prelude["div"];
var _2260_ = rts.builtins.Prelude["/="];
var _25_ = rts.builtins.Prelude["mod"];
var digitsLittleEndian = function (local_214) {
   return map({list: take({list: iterate({initial: local_214.__number
                                         ,next: function (local_215) {
                                            return _2f__2f_({infixl: local_215
                                                            ,infixr: local_214.base});
                                         }})
                          ,__while: function (local_216) {
                             return _2260_({infixl: local_216,infixr: 0.0});
                          }})
              ,mapping: function (local_217) {
                 return _25_({infixl: local_217,infixr: local_214.base});
              }});
};
var reverse = function (list5) {
   return fold({list: list5
               ,initial: {tag: "empty",data: {}}
               ,binop: function (local_218) {
                  return {tag: "nonEmpty"
                         ,data: {head: local_218.item
                                ,tail: function (local_219) {
                                   return local_218.acc;
                                }}};
               }});
};
var showNum = function (local_211) {
   var x = function (x212) { return x212;}(_3d__3d_({infixl: local_211,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_213 = x.data;
       return toBytes(toArray(map({list: reverse(digitsLittleEndian({__number: local_211
                                                                    ,base: 10.0}))
                                  ,mapping: function (local_220) {
                                     return _2b_({infixl: 48.0,infixr: local_220});
                                  }})));
     case "true":
       var local_221 = x.data;
       return rts.bytesFromAscii("0");
     default:
       throw rts.exceptions.UnhandledCase("DEF_8dc07f8cc25f46b2bd345789b6a59f4d"
                                         ,"39f9fdd2b9889a256be50861539f39e5");
   }
};
var pestovalDeleteSession = function (local_129) {
   var path1 = toArray(split({text: local_129.request.path
                             ,seperator: rts.bytesFromAscii("/")}));
   var password = item({index: 4.0,object: path1});
   var session = parseInt(item({index: 3.0,object: path1}));
   return _3b_({infixl: pestovalAuth({database: local_129.database
                                     ,password: password
                                     ,teachers: []})
               ,infixr: function (x149) {
                  switch (x149.tag)
                  {
                    case "admin":
                      var local_150 = x149.data;
                      var x = function (x151) { return x151;}(local_129.request.body);
                      switch (x.tag)
                      {
                        case "just":
                          var local_152 = x.data;
                          var body1 = toArray(parsePostBody(local_152));
                          var x = function (x207) {
                                     return x207;
                                  }(_26__26_({infixl: _3d__3d_({infixl: local_129.request.method
                                                               ,infixr: rts.bytesFromAscii("POST")})
                                             ,infixr: function (local_206) {
                                                return _3d__3d_({infixl: item({index: 0.0
                                                                              ,object: body1}).value
                                                                ,infixr: rts.bytesFromAscii("open sesame")});
                                             }}));
                          switch (x.tag)
                          {
                            case "false":
                              var local_208 = x.data;
                              return __return(pestovalUnauthorized);
                            case "true":
                              var local_210 = x.data;
                              return _3b_({infixl: query({database: local_129.database
                                                         ,object: _2b__2b_({a: rts.bytesFromAscii("DELETE FROM pestoval_session\nWHERE id=")
                                                                           ,b: showNum(session)})})
                                          ,infixr: function (x222) {
                                             switch (x222.tag)
                                             {
                                               case "error":
                                                 var local_223 = x222.data;
                                                 return __return(pestovalUnauthorized);
                                               case "success":
                                                 var local_224 = x222.data;
                                                 return __return({content: {__data: function (x225) {
                                                                              return x225;
                                                                           }(rts.bytesFromAscii("Session deleted! Resume"))
                                                                           ,mimeType: rts.bytesFromAscii("text/plain")}
                                                                 ,status: {message: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: /eng/manage/")
                                                                                             ,b: password})
                                                                          ,code: 303.0}});
                                               default:
                                                 throw rts.exceptions.UnhandledCase("DEF_6bb633bd9c72488582545c4af930c476"
                                                                                   ,"9c002baaf1d4b04c97b6e56a890b5ab8");
                                             }
                                          }});
                            default:
                              throw rts.exceptions.UnhandledCase("DEF_6bb633bd9c72488582545c4af930c476"
                                                                ,"80004ae7165f47e6c299ac0d201b2bab");
                          }
                        case "nothing":
                          var local_226 = x.data;
                          return __return(pestovalUnauthorized);
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_6bb633bd9c72488582545c4af930c476"
                                                            ,"64bb29b33753dc518ea54680c017a36d");
                      }
                    default:
                      var local_227 = x149;
                      return __return(pestovalUnauthorized);
                  }
               }});
};
var pestovalNewSession = function (local_229) {
   var path2 = toArray(split({text: local_229.request.path
                             ,seperator: rts.bytesFromAscii("/")}));
   var password1 = function () {
                      var x = function (x230) {
                                 return x230;
                              }(_3c_({infixl: length1(path2),infixr: 4.0}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_231 = x.data;
                          return item({index: 3.0,object: path2});
                        case "true":
                          var local_232 = x.data;
                          return rts.bytesFromAscii("");
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_58b862440b544a868611e6c34623ba8d"
                                                            ,"62283a5c2242313ef39e1a8069cf8e6a");
                      }
                   }();
   return _3b_({infixl: pestovalAuth({database: local_229.database
                                     ,password: password1
                                     ,teachers: []})
               ,infixr: function (x233) {
                  switch (x233.tag)
                  {
                    case "admin":
                      var local_234 = x233.data;
                      var language2 = item({index: 1.0,object: path2});
                      var x = function (x235) {
                                 return x235;
                              }(_3d__3d_({infixl: local_229.request.method
                                         ,infixr: rts.bytesFromAscii("POST")}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_236 = x.data;
                          return __return(pestovalUnauthorized);
                        case "true":
                          var local_237 = x.data;
                          return _3b_({infixl: query({database: local_229.database
                                                     ,object: rts.bytesFromAscii("INSERT INTO pestoval_session\n(name, level_id, when_id, description, prereqs, name_hebrew, description_hebrew, prereqs_hebrew)\nVALUES (\'new\', 1, 28, \'\', \'\', \'\', \'\', \'\')")})
                                      ,infixr: function (x238) {
                                         switch (x238.tag)
                                         {
                                           case "error":
                                             var local_239 = x238.data;
                                             return ignoreError(local_239);
                                           case "success":
                                             var local_240 = x238.data;
                                             return __return({content: {__data: function (x241) {
                                                                          return x241;
                                                                       }(rts.bytesFromAscii("New session created, refresh"))
                                                                       ,mimeType: rts.bytesFromAscii("text/plain")}
                                                             ,status: {message: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: /eng/manage/")
                                                                                         ,b: password1})
                                                                      ,code: 303.0}});
                                           default:
                                             throw rts.exceptions.UnhandledCase("DEF_58b862440b544a868611e6c34623ba8d"
                                                                               ,"134e9d9888a88d205a9623cfaebda279");
                                         }
                                      }});
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_58b862440b544a868611e6c34623ba8d"
                                                            ,"2383e009c016ca319ccb1d423f4f9f53");
                      }
                    default:
                      var local_242 = x233;
                      return __return(pestovalUnauthorized);
                  }
               }});
};
var id = function (__x) { return __x;};
var maybe = function (local_277) {
   var x = function (x278) { return x278;}(local_277.object);
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_279 = x.data;
       return local_277.or;
     default:
       throw rts.exceptions.UnhandledCase("DEF_6c78a9bb4dc7418b9c6fcbcdd77f4088"
                                         ,"df8546f58bdc08635e9f6ff7be4f4953");
   }
};
var queryFieldLang = function (language3) {
   var x = language3;
   switch (x.tag)
   {
     case "english":
       var local_269 = x.data;
       return function (local_270) {
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: local_270.table
                                                        ,b: rts.bytesFromAscii(".")})
                                           ,b: local_270.field})
                              ,b: function () {
                                 var x = function (x271) { return x271;}(local_270.as);
                                 switch (x.tag)
                                 {
                                   case "just":
                                     var local_272 = x.data;
                                     return _2b__2b_({a: rts.bytesFromAscii(" AS ")
                                                     ,b: local_272});
                                   case "nothing":
                                     var local_273 = x.data;
                                     return rts.bytesFromAscii("");
                                   default:
                                     throw rts.exceptions.UnhandledCase("DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                                                       ,"601b6d53f526392df53d629ee0c2ad71");
                                 }
                              }()});
           };
     case "hebrew":
       var local_274 = x.data;
       return function (local_275) {
              var local_276 = _2b__2b_({a: _2b__2b_({a: local_275.table
                                                    ,b: rts.bytesFromAscii(".")})
                                       ,b: local_275.field});
              return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("COALESCE(NULLIF(")
                                                                                  ,b: local_276})
                                                                     ,b: rts.bytesFromAscii("_hebrew, \'\'), ")})
                                                        ,b: local_276})
                                           ,b: rts.bytesFromAscii(") AS ")})
                              ,b: maybe({object: local_275.as,or: local_275.field})});
           };
     default:
       throw rts.exceptions.UnhandledCase("DEF_20f5f7933f1a478c88b982b963bdfe5f"
                                         ,"77f1ffdc76bae5c4dbaf326aa2ff70a2");
   }
};
var pestovalQuerySessionsSql = function (local_262) {
   return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id,\n  pestoval_timeslot.id AS timeslot_id, pestoval_timeslot.start, pestoval_timeslot.stop,\n  pestoval_location.id AS location_id, pestoval_location.ordering AS location_ordering,\n  pestoval_level.id AS level_id, pestoval_level.color,")
                                ,infixr: function (local_263) {
                                   return _3a__3a_({infixl: join({texts: map({list: _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                      ,field: rts.bytesFromAscii("name")
                                                                                                      ,as: {tag: "just"
                                                                                                           ,data: rts.bytesFromAscii("session_name")}}
                                                                                             ,infixr: function (local_264) {
                                                                                                return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                         ,field: rts.bytesFromAscii("description")
                                                                                                                         ,as: {tag: "nothing"
                                                                                                                              ,data: {}}}
                                                                                                                ,infixr: function (local_265) {
                                                                                                                   return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_session")
                                                                                                                                            ,field: rts.bytesFromAscii("prereqs")
                                                                                                                                            ,as: {tag: "nothing"
                                                                                                                                                 ,data: {}}}
                                                                                                                                   ,infixr: function (local_266) {
                                                                                                                                      return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_location")
                                                                                                                                                               ,field: rts.bytesFromAscii("name")
                                                                                                                                                               ,as: {tag: "just"
                                                                                                                                                                    ,data: rts.bytesFromAscii("location_name")}}
                                                                                                                                                      ,infixr: function (local_267) {
                                                                                                                                                         return _3a__3a_({infixl: {table: rts.bytesFromAscii("pestoval_level")
                                                                                                                                                                                  ,field: rts.bytesFromAscii("name")
                                                                                                                                                                                  ,as: {tag: "just"
                                                                                                                                                                                       ,data: rts.bytesFromAscii("level_name")}}
                                                                                                                                                                         ,infixr: function (local_268) {
                                                                                                                                                                            return {tag: "empty"
                                                                                                                                                                                   ,data: {}};
                                                                                                                                                                         }});
                                                                                                                                                      }});
                                                                                                                                   }});
                                                                                                                }});
                                                                                             }})
                                                                             ,mapping: queryFieldLang(local_262.language)})
                                                                 ,seperator: rts.bytesFromAscii(", ")})
                                                   ,infixr: function (local_280) {
                                                      return _3a__3a_({infixl: local_262.from
                                                                      ,infixr: function (local_281) {
                                                                         return _2b__2b_2({infixl: map({list: _3a__3a_({infixl: {key: rts.bytesFromAscii("when_id")
                                                                                                                                ,table: rts.bytesFromAscii("pestoval_timeslot")}
                                                                                                                       ,infixr: function (local_282) {
                                                                                                                          return _3a__3a_({infixl: {key: rts.bytesFromAscii("location_id")
                                                                                                                                                   ,table: rts.bytesFromAscii("pestoval_location")}
                                                                                                                                          ,infixr: function (local_283) {
                                                                                                                                             return _3a__3a_({infixl: {key: rts.bytesFromAscii("level_id")
                                                                                                                                                                      ,table: rts.bytesFromAscii("pestoval_level")}
                                                                                                                                                             ,infixr: function (local_284) {
                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                       ,data: {}};
                                                                                                                                                             }});
                                                                                                                                          }});
                                                                                                                       }})
                                                                                                       ,mapping: function (local_285) {
                                                                                                          return join({texts: _3a__3a_({infixl: rts.bytesFromAscii("LEFT OUTER JOIN ")
                                                                                                                                       ,infixr: function (local_286) {
                                                                                                                                          return _3a__3a_({infixl: local_285.table
                                                                                                                                                          ,infixr: function (local_287) {
                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(" ON pestoval_session.")
                                                                                                                                                                             ,infixr: function (local_288) {
                                                                                                                                                                                return _3a__3a_({infixl: local_285.key
                                                                                                                                                                                                ,infixr: function (local_289) {
                                                                                                                                                                                                   return _3a__3a_({infixl: rts.bytesFromAscii(" = ")
                                                                                                                                                                                                                   ,infixr: function (local_290) {
                                                                                                                                                                                                                      return _3a__3a_({infixl: local_285.table
                                                                                                                                                                                                                                      ,infixr: function (local_291) {
                                                                                                                                                                                                                                         return _3a__3a_({infixl: rts.bytesFromAscii(".id")
                                                                                                                                                                                                                                                         ,infixr: function (local_292) {
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
                                                                                          ,infixr: function (local_293) {
                                                                                             return _2b__2b_2({infixl: function () {
                                                                                                                 var x =
                                                                                                                 function (x294) {
                                                                                                                    return x294;
                                                                                                                 }(_3d__3d_({infixl: local_262.where
                                                                                                                            ,infixr: rts.bytesFromAscii("")}));
                                                                                                                 switch (x.tag)
                                                                                                                 {
                                                                                                                   case "false":
                                                                                                                     var local_295 =
                                                                                                                     x.data;
                                                                                                                     return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("WHERE ")
                                                                                                                                                       ,b: local_262.where})
                                                                                                                                     ,infixr: function (local_296) {
                                                                                                                                        return {tag: "empty"
                                                                                                                                               ,data: {}};
                                                                                                                                     }});
                                                                                                                   case "true":
                                                                                                                     var local_297 =
                                                                                                                     x.data;
                                                                                                                     return {tag: "empty"
                                                                                                                            ,data: {}};
                                                                                                                   default:
                                                                                                                     throw rts.exceptions.UnhandledCase("DEF_140efbae773e4fea9f554e346c7b58e8"
                                                                                                                                                       ,"f573ad31abd803e9dda9e82ec3ef4df2");
                                                                                                                 }
                                                                                                              }()
                                                                                                              ,infixr: function (local_298) {
                                                                                                                 return _3a__3a_({infixl: rts.bytesFromAscii("ORDER BY pestoval_timeslot.start, pestoval_location.ordering")
                                                                                                                                 ,infixr: function (local_299) {
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
                              ,infixr: function (local_310) {
                                 return __return(__array2);
                              }});
               }});
};
var length4 = rts.builtins.Mut.Array["length"];
var readMutArray = rts.builtins.Mut.Array["read"];
var newMutRef = rts.builtins.Mut.Ref["new"];
var readMutRef = rts.builtins.Mut.Ref["read"];
var writeMutArray = rts.builtins.Mut.Array["write"];
var writeMutRef = rts.builtins.Mut.Ref["write"];
var sort1 = function (local_312) {
   var x = function (x313) {
              return x313;
           }(_2265_({infixl: _2b_({infixl: local_312.start,infixr: 1.0})
                    ,infixr: local_312.stop}));
   switch (x.tag)
   {
     case "false":
       var local_314 = x.data;
       return _3b_({infixl: readMutArray({index: local_312.start
                                         ,object: local_312.__array})
                   ,infixr: function (pivot) {
                      return _3b_({infixl: newMutRef(local_312.start)
                                  ,infixr: function (pivotPosRef) {
                                     return _3b_({infixl: sequence__(map({list: _2e__2e_({start: _2b_({infixl: local_312.start
                                                                                                      ,infixr: 1.0})
                                                                                         ,stop: local_312.stop})
                                                                         ,mapping: function (index) {
                                                                            return _3b_({infixl: readMutArray({index: index
                                                                                                              ,object: local_312.__array})
                                                                                        ,infixr: function (object) {
                                                                                           var x =
                                                                                           function (x315) {
                                                                                              return x315;
                                                                                           }(local_312._3c_({infixl: object
                                                                                                            ,infixr: pivot}));
                                                                                           switch (x.tag)
                                                                                           {
                                                                                             case "false":
                                                                                               var local_316 =
                                                                                               x.data;
                                                                                               return __return({});
                                                                                             case "true":
                                                                                               var local_317 =
                                                                                               x.data;
                                                                                               return _3b_({infixl: readMutRef(pivotPosRef)
                                                                                                           ,infixr: function (pivotPos) {
                                                                                                              return _3b_({infixl: writeMutArray({index: pivotPos
                                                                                                                                                 ,object: local_312.__array
                                                                                                                                                 ,value: object})
                                                                                                                          ,infixr: function (local_318) {
                                                                                                                             var newPivotPos =
                                                                                                                             _2b_({infixl: pivotPos
                                                                                                                                  ,infixr: 1.0});
                                                                                                                             return _3b_({infixl: writeMutRef({object: pivotPosRef
                                                                                                                                                              ,value: newPivotPos})
                                                                                                                                         ,infixr: function (local_319) {
                                                                                                                                            return _3b_({infixl: readMutArray({index: newPivotPos
                                                                                                                                                                              ,object: local_312.__array})
                                                                                                                                                        ,infixr: function (local_320) {
                                                                                                                                                           return writeMutArray({index: index
                                                                                                                                                                                ,object: local_312.__array
                                                                                                                                                                                ,value: local_320});
                                                                                                                                                        }});
                                                                                                                                         }});
                                                                                                                          }});
                                                                                                           }});
                                                                                             default:
                                                                                               throw rts.exceptions.UnhandledCase("DEF_7dc48073b9e642f0921b10b11676f38b"
                                                                                                                                 ,"20ca215bae629c3b4189e451c898fa54");
                                                                                           }
                                                                                        }});
                                                                         }}))
                                                 ,infixr: function (local_321) {
                                                    return _3b_({infixl: readMutRef(pivotPosRef)
                                                                ,infixr: function (index1) {
                                                                   return _3b_({infixl: writeMutArray({index: index1
                                                                                                      ,object: local_312.__array
                                                                                                      ,value: pivot})
                                                                               ,infixr: function (local_322) {
                                                                                  return _3b_({infixl: sort1({start: local_312.start
                                                                                                             ,stop: index1
                                                                                                             ,_3c_: local_312._3c_
                                                                                                             ,__array: local_312.__array})
                                                                                              ,infixr: function (local_323) {
                                                                                                 return sort1({start: _2b_({infixl: index1
                                                                                                                           ,infixr: 1.0})
                                                                                                              ,stop: local_312.stop
                                                                                                              ,_3c_: local_312._3c_
                                                                                                              ,__array: local_312.__array});
                                                                                              }});
                                                                               }});
                                                                }});
                                                 }});
                                  }});
                   }});
     case "true":
       var local_324 = x.data;
       return __return({});
     default:
       throw rts.exceptions.UnhandledCase("DEF_7dc48073b9e642f0921b10b11676f38b"
                                         ,"767c3133b4f8a61071c98bc4f445f9a6");
   }
};
var sort = function (local_309) {
   return runMutArray(_3b_({infixl: newMutArray1(local_309.list)
                           ,infixr: function (__array3) {
                              return _3b_({infixl: length4(__array3)
                                          ,infixr: function (local_311) {
                                             return _3b_({infixl: sort1({start: 0.0
                                                                        ,stop: local_311
                                                                        ,_3c_: local_309._3c_
                                                                        ,__array: __array3})
                                                         ,infixr: function (local_325) {
                                                            return __return(__array3);
                                                         }});
                                          }});
                           }}));
};
var foldLazy1 = function (local_344) {
   return foldLazy({list: local_344.list
                   ,initial: function (local_345) {
                      return local_344.done;
                   }
                   ,binop: function (local_346) {
                      return function (state) {
                             return local_344.step({state: state
                                                   ,rest: local_346.rest
                                                   ,item: local_346.item});
                          };
                   }})(local_344.initialState);
};
var group = function (local_327) {
   return foldLazy1({list: local_327.list
                    ,initialState: {tag: "empty",data: {}}
                    ,step: function (local_328) {
                       var x = function (x329) { return x329;}(local_328.state);
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_330 = x.data;
                           var x = function (x331) {
                                      return x331;
                                   }(local_327.by({infixl: local_330.head
                                                  ,infixr: local_328.item}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_332 = x.data;
                               return _3a__3a_({infixl: toArray(reverse(local_328.state))
                                               ,infixr: function (local_333) {
                                                  return local_328.rest({})(_3a__3a_({infixl: local_328.item
                                                                                     ,infixr: function (local_334) {
                                                                                        return {tag: "empty"
                                                                                               ,data: {}};
                                                                                     }}));
                                               }});
                             case "true":
                               var local_335 = x.data;
                               return local_328.rest({})(_3a__3a_({infixl: local_328.item
                                                                  ,infixr: function (local_336) {
                                                                     return local_328.state;
                                                                  }}));
                             default:
                               throw rts.exceptions.UnhandledCase("DEF_b1e58c7062114583b9357d62e817d1c6"
                                                                 ,"80c64c4a3e825d563e72c3ff848be12a");
                           }
                         case "empty":
                           var local_337 = x.data;
                           return local_328.rest({})(_3a__3a_({infixl: local_328.item
                                                              ,infixr: function (local_338) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }}));
                         default:
                           throw rts.exceptions.UnhandledCase("DEF_b1e58c7062114583b9357d62e817d1c6"
                                                             ,"74a01a012e28a30393aafbb0e69c22f4");
                       }
                    }
                    ,done: function (local_339) {
                       var x = function (x340) { return x340;}(local_339);
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_341 = x.data;
                           return _3a__3a_({infixl: toArray(reverse(local_339))
                                           ,infixr: function (local_342) {
                                              return {tag: "empty",data: {}};
                                           }});
                         case "empty":
                           var local_343 = x.data;
                           return {tag: "empty",data: {}};
                         default:
                           throw rts.exceptions.UnhandledCase("DEF_b1e58c7062114583b9357d62e817d1c6"
                                                             ,"44a912bc33ec9c258e1ba58d8731bdd8");
                       }
                    }});
};
var pestovalQuerySessionTeachers = function (local_303) {
   return _3b_({infixl: query({database: local_303.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_session_teachers.teacher_id, pestoval_session_teachers.session_id,\n  ")
                                                             ,b: queryFieldLang(local_303.language)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_teacher ON pestoval_session_teachers.teacher_id = pestoval_teacher.id")})})
               ,infixr: function (x304) {
                  switch (x304.tag)
                  {
                    case "error":
                      var local_305 = x304.data;
                      return ignoreError(local_305);
                    case "success":
                      var local_306 = x304.data;
                      return __return(toArray(map({list: group({list: fromArray(sort({list: map({list: fromArray(local_306.__data)
                                                                                                ,mapping: function (local_307) {
                                                                                                   return {teacher: {name: item({index: 2.0
                                                                                                                                ,object: local_307})
                                                                                                                    ,id: parseInt(item({index: 0.0
                                                                                                                                       ,object: local_307}))}
                                                                                                          ,session: parseInt(item({index: 1.0
                                                                                                                                  ,object: local_307}))};
                                                                                                }})
                                                                                     ,_3c_: function (local_308) {
                                                                                        return _3c_({infixl: local_308.infixl.session
                                                                                                    ,infixr: local_308.infixr.session});
                                                                                     }}))
                                                               ,by: function (local_326) {
                                                                  return _3d__3d_({infixl: local_326.infixl.session
                                                                                  ,infixr: local_326.infixr.session});
                                                               }})
                                                  ,mapping: function (local_347) {
                                                     return {value: toArray(map({list: fromArray(local_347)
                                                                                ,mapping: function (local_348) {
                                                                                   return local_348.teacher;
                                                                                }}))
                                                            ,key: item({index: 0.0
                                                                       ,object: local_347}).session};
                                                  }})));
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_de80144d74df47438852d18bad3b3eaf"
                                                        ,"9800f3fc1326d8ea5b4af24b15b823d4");
                  }
               }});
};
var _3e__3d__3c_ = function (local_356) {
   var x = function (x357) {
              return x357;
           }(_3d__3d_({infixl: local_356.__x,infixr: local_356.y}));
   switch (x.tag)
   {
     case "false":
       var local_358 = x.data;
       var x = function (x359) {
                  return x359;
               }(_3c_({infixl: local_356.__x,infixr: local_356.y}));
       switch (x.tag)
       {
         case "false":
           var local_360 = x.data;
           return {tag: "_3e_",data: {}};
         case "true":
           var local_361 = x.data;
           return {tag: "_3c_",data: {}};
         default:
           throw rts.exceptions.UnhandledCase("DEF_710304e7117b480ba76d20139b3980c1"
                                             ,"b36d82ac26521ea940b13add4c373a2c");
       }
     case "true":
       var local_362 = x.data;
       return {tag: "_3d__3d_",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_710304e7117b480ba76d20139b3980c1"
                                         ,"508e7c4e652cf07b779c96cd2344172c");
   }
};
var _2f_ = rts.builtins.Prelude["/"];
var floor = function (local_367) {
   return _2d_({infixl: local_367,infixr: _25_({infixl: local_367,infixr: 1.0})});
};
var search1 = function (local_364) {
   var x = function (x365) {
              return x365;
           }(_2265_({infixl: local_364.start,infixr: local_364.stop}));
   switch (x.tag)
   {
     case "false":
       var local_366 = x.data;
       var pivot1 = floor(_2f_({infixl: _2b_({infixl: local_364.start
                                             ,infixr: local_364.stop})
                               ,infixr: 2.0}));
       var x = local_364.compareTo(pivot1);
       switch (x.tag)
       {
         case "_3e_":
           var local_368 = x.data;
           return search1({start: _2b_({infixl: pivot1,infixr: 1.0})
                          ,stop: local_364.stop
                          ,compareTo: local_364.compareTo});
         case "_3c_":
           var local_369 = x.data;
           return search1({start: local_364.start
                          ,stop: pivot1
                          ,compareTo: local_364.compareTo});
         case "_3d__3d_":
           var local_370 = x.data;
           return {tag: "just",data: pivot1};
         default:
           throw rts.exceptions.UnhandledCase("DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                             ,"c6c8b9c428c0b8b42ffc038b0554d06b");
       }
     case "true":
       var local_371 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                         ,"c22774ac01ba95da7d4aa96a5694962d");
   }
};
var search = function (local_363) {
   return search1({start: 0.0
                  ,stop: length1(local_363.sorted)
                  ,compareTo: function (index3) {
                     return local_363.compareTo(item({index: index3
                                                     ,object: local_363.sorted}));
                  }});
};
var lookup = function (local_354) {
   var x = function (x372) {
              return x372;
           }(search({compareTo: function (local_355) {
                       return _3e__3d__3c_({y: local_355.key,__x: local_354.key});
                    }
                    ,sorted: local_354.sorted}));
   switch (x.tag)
   {
     case "just":
       var index4 = x.data;
       return {tag: "just",data: item({index: index4,object: local_354.sorted}).value};
     case "nothing":
       var local_373 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_a4e4077b0c07428e86abf1bac4a10b4f"
                                         ,"037df5e76b157671e777748996e8ff72");
   }
};
var unwords = function (words) {
   return join({texts: words,seperator: rts.bytesFromAscii(" ")});
};
var dayNames = toArray(split({text: rts.bytesFromAscii("Mon Tue Wed Thu Fri Sat Sun")
                             ,seperator: rts.bytesFromAscii(" ")}));
var index5 = function (local_383) {
   var x = function (x384) {
              return x384;
           }(first({that: function (index6) {
                      return _3d__3d_({infixl: item({index: index6
                                                    ,object: local_383.__array})
                                      ,infixr: local_383.item});
                   }
                   ,list: _2e__2e_({start: 0.0,stop: length1(local_383.__array)})}));
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_385 = x.data;
       throw rts.exceptions.ReachedHole("DEF_bb1f3635a22340e9b8036656619efdc1"
                                       ,"d0062c09c4ee2abcd4b0cc313b84fc5d");
     default:
       throw rts.exceptions.UnhandledCase("DEF_bb1f3635a22340e9b8036656619efdc1"
                                         ,"eafac946fbbd2eb5e94b628a7f5d6613");
   }
};
var monthNames =
toArray(split({text: rts.bytesFromAscii("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec")
              ,seperator: rts.bytesFromAscii(" ")}));
var parseDateTime = function (text2) {
   var local_376 = toArray(split({text: text2,seperator: rts.bytesFromAscii(" ")}));
   var item3 = function (local_377) { return item({index: local_377,object: local_376});};
   var local_378 = toArray(split({text: item3(4.0),seperator: rts.bytesFromAscii(":")}));
   var local_380 = function (local_379) {
      return parseInt(item({index: local_379,object: local_378}));
   };
   return {time: {timezone: unwords(_3a__3a_({infixl: item3(5.0)
                                             ,infixr: function (local_381) {
                                                return _3a__3a_({infixl: item3(6.0)
                                                                ,infixr: function (local_382) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }}))
                 ,minute: local_380(1.0)
                 ,second: local_380(2.0)
                 ,hour: local_380(0.0)}
          ,date: {weekDay: _2b_({infixl: index5({__array: dayNames,item: item3(0.0)})
                                ,infixr: 1.0})
                 ,month: _2b_({infixl: index5({__array: monthNames,item: item3(1.0)})
                              ,infixr: 1.0})
                 ,day: parseInt(item3(2.0))
                 ,year: parseInt(item3(3.0))}};
};
var pestovalQuerySessions = function (local_251) {
   var local_256 = function () {
                      var x = function (x252) { return x252;}(local_251.teacher);
                      switch (x.tag)
                      {
                        case "just":
                          var local_253 = x.data;
                          return {where: _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("pestoval_session_teachers.teacher_id = ")
                                                                    ,b: showNum(local_253)})
                                                  ,infixr: function (local_254) {
                                                     return {tag: "empty",data: {}};
                                                  }})
                                 ,from: rts.bytesFromAscii("FROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_session ON pestoval_session_teachers.session_id = pestoval_session.id")};
                        case "nothing":
                          var local_255 = x.data;
                          return {where: {tag: "empty",data: {}}
                                 ,from: rts.bytesFromAscii("FROM pestoval_session")};
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                            ,"c83b0d9e623697d989e5a09fb1c59c4f");
                      }
                   }();
   return _3b_({infixl: query({database: local_251.database
                              ,object: pestovalQuerySessionsSql({where: join({texts: _2b__2b_2({infixl: local_256.where
                                                                                               ,infixr: function (local_257) {
                                                                                                  var x =
                                                                                                  function (x258) {
                                                                                                     return x258;
                                                                                                  }(local_251.filter);
                                                                                                  switch (x.tag)
                                                                                                  {
                                                                                                    case "just":
                                                                                                      var local_259 =
                                                                                                      x.data;
                                                                                                      return _3a__3a_({infixl: local_259
                                                                                                                      ,infixr: function (local_260) {
                                                                                                                         return {tag: "empty"
                                                                                                                                ,data: {}};
                                                                                                                      }});
                                                                                                    case "nothing":
                                                                                                      var local_261 =
                                                                                                      x.data;
                                                                                                      return {tag: "empty"
                                                                                                             ,data: {}};
                                                                                                    default:
                                                                                                      throw rts.exceptions.UnhandledCase("DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                                                                                        ,"b9b460a647ac4021e5d0ace3826c3537");
                                                                                                  }
                                                                                               }})
                                                                             ,seperator: rts.bytesFromAscii(" AND ")})
                                                                ,from: local_256.from
                                                                ,language: local_251.language})})
               ,infixr: function (x300) {
                  switch (x300.tag)
                  {
                    case "error":
                      var local_301 = x300.data;
                      return ignoreError(local_301);
                    case "success":
                      var local_302 = x300.data;
                      return _3b_({infixl: pestovalQuerySessionTeachers({database: local_251.database
                                                                        ,language: local_251.language})
                                  ,infixr: function (teachers) {
                                     var field1 = function (local_349) {
                                        var x = function (x350) {
                                                   return x350;
                                                }(first({that: function (index2) {
                                                           return _3d__3d_({infixl: item({index: index2
                                                                                         ,object: local_302.fields})
                                                                           ,infixr: local_349});
                                                        }
                                                        ,list: _2e__2e_({start: 0.0
                                                                        ,stop: length1(local_302.fields)})}));
                                        switch (x.tag)
                                        {
                                          case "just":
                                            return id(x.data);
                                          case "nothing":
                                            var local_351 = x.data;
                                            throw rts.exceptions.ReachedHole("DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                            ,"a8dea6e428906f6970698acdd1c10cbd");
                                          default:
                                            throw rts.exceptions.UnhandledCase("DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                              ,"ca9c646dae236b23539d3c03280dc8af");
                                        }
                                     };
                                     var session1 = field1(rts.bytesFromAscii("id"));
                                     var when =
                                     {start: field1(rts.bytesFromAscii("start"))
                                     ,stop: field1(rts.bytesFromAscii("stop"))
                                     ,id: field1(rts.bytesFromAscii("timeslot_id"))};
                                     var name =
                                     field1(rts.bytesFromAscii("session_name"));
                                     var level =
                                     {name: field1(rts.bytesFromAscii("level_name"))
                                     ,id: field1(rts.bytesFromAscii("level_id"))
                                     ,color: field1(rts.bytesFromAscii("color"))};
                                     var place =
                                     {name: field1(rts.bytesFromAscii("location_name"))
                                     ,id: field1(rts.bytesFromAscii("location_id"))
                                     ,order: field1(rts.bytesFromAscii("location_ordering"))};
                                     var description =
                                     field1(rts.bytesFromAscii("description"));
                                     var prereqs = field1(rts.bytesFromAscii("prereqs"));
                                     return __return(toArray(map({list: fromArray(local_302.__data)
                                                                 ,mapping: function (local_352) {
                                                                    var item2 =
                                                                    function (local_353) {
                                                                       return item({index: local_353
                                                                                   ,object: local_352});
                                                                    };
                                                                    var id1 =
                                                                    parseInt(item2(session1));
                                                                    return {prereqs: item2(prereqs)
                                                                           ,name: item2(name)
                                                                           ,place: {name: item2(place.name)
                                                                                   ,id: parseInt(item2(place.id))
                                                                                   ,order: parseInt(item2(place.order))}
                                                                           ,description: item2(description)
                                                                           ,teachers: function () {
                                                                              var x =
                                                                              function (x374) {
                                                                                 return x374;
                                                                              }(lookup({key: id1
                                                                                       ,sorted: teachers}));
                                                                              switch (x.tag)
                                                                              {
                                                                                case "just":
                                                                                  return id(x.data);
                                                                                case "nothing":
                                                                                  var local_375 =
                                                                                  x.data;
                                                                                  return [];
                                                                                default:
                                                                                  throw rts.exceptions.UnhandledCase("DEF_e5c6245d56b44014a6cc92cf5ff83de4"
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
                      throw rts.exceptions.UnhandledCase("DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                        ,"b7f232d070f067bfe76ad6b4679cb4aa");
                  }
               }});
};
var _22f2_ = function (local_390) {
   return {root: local_390.infixl,subTrees: local_390.infixr};
};
var leaf = function (local_389) { return _22f2_({infixl: local_389,infixr: []});};
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
var replicate = function (local_466) {
   var x = function (x467) { return x467;}(_2264_({infixl: local_466.count,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_468 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_466.item
                     ,tail: function (local_469) {
                        return replicate({count: _2d_({infixl: local_466.count
                                                      ,infixr: 1.0})
                                         ,item: local_466.item});
                     }}};
     case "true":
       var local_470 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_70f79762f05c41ccb9677f7a60746680"
                                         ,"3b53ee6d875f49f4acdb9a2e8b33fb2d");
   }
};
var rightJustify = function (local_462) {
   var count = _2d_({infixl: local_462.length
                    ,infixr: length(function (x463) {
                       return x463;
                    }(local_462.text))});
   var x = function (x464) { return x464;}(_2264_({infixl: count,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_465 = x.data;
       return _2b__2b_({a: toBytes(toArray(replicate({count: count
                                                     ,item: local_462.character})))
                       ,b: local_462.text});
     case "true":
       var local_471 = x.data;
       return local_462.text;
     default:
       throw rts.exceptions.UnhandledCase("DEF_c96ce62be72e4d1e85d07af16867169d"
                                         ,"ea6106b4e471dead7c7d3638866db4a1");
   }
};
var showTime = function (local_456) {
   return join({texts: map({list: _3a__3a_({infixl: function (x457) {
                                              return x457;
                                           }(local_456).hour
                                           ,infixr: function (local_458) {
                                              return _3a__3a_({infixl: function (x459) {
                                                                 return x459;
                                                              }(local_456).minute
                                                              ,infixr: function (local_460) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }})
                           ,mapping: function (local_461) {
                              return rightJustify({length: 2.0
                                                  ,text: showNum(local_461)
                                                  ,character: 48.0});
                           }})
               ,seperator: rts.bytesFromAscii(":")});
};
var formatTimeSlot = function (local_451) {
   return join({texts: _3a__3a_({infixl: item({index: _2d_({infixl: function (x452) {
                                                              return x452;
                                                           }(local_451.timeSlot.start.date).weekDay
                                                           ,infixr: 1.0})
                                              ,object: function () {
                                                 var x = local_451.language;
                                                 switch (x.tag)
                                                 {
                                                   case "english":
                                                     var local_453 = x.data;
                                                     return dayNames;
                                                   case "hebrew":
                                                     var local_454 = x.data;
                                                     return dayNamesHebrew;
                                                   default:
                                                     throw rts.exceptions.UnhandledCase("DEF_4fed722dd3634c0db388c78e255c1429"
                                                                                       ,"5582218e01f5831eae7835c315a758c0");
                                                 }
                                              }()})
                                ,infixr: function (local_455) {
                                   return _3a__3a_({infixl: showTime(local_451.timeSlot.start.time)
                                                   ,infixr: function (local_472) {
                                                      return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                      ,infixr: function (local_473) {
                                                                         return _3a__3a_({infixl: showTime(local_451.timeSlot.stop.time)
                                                                                         ,infixr: function (local_474) {
                                                                                            return {tag: "empty"
                                                                                                   ,data: {}};
                                                                                         }});
                                                                      }});
                                                   }});
                                }})
               ,seperator: rts.bytesFromAscii(" ")});
};
var htmlParagraph = function (text4) {
   return _22f2_({infixl: rts.bytesFromAscii("<p>"),infixr: singleton(leaf(text4))});
};
var pestovalSessionInfo = function (local_416) {
   var local_420 = function (local_417) {
      return _22f2_({infixl: rts.bytesFromAscii("<p>")
                    ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<b>")
                                     ,infixr: singleton(leaf(local_417.key))})
                             ,leaf(local_417.value)]});
   };
   var teacher1 = function (local_421) {
      return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/")
                                              ,infixr: function (local_422) {
                                                 return _3a__3a_({infixl: function () {
                                                                    var x =
                                                                    local_416.language;
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
                                                                        throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                          ,"25c06dfd8f7a82ef041d5e079e02e218");
                                                                    }
                                                                 }()
                                                                 ,infixr: function (local_425) {
                                                                    return _3a__3a_({infixl: rts.bytesFromAscii("/teacher/")
                                                                                    ,infixr: function (local_426) {
                                                                                       return _3a__3a_({infixl: showNum(local_421.id)
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
                                              var x = function (x429) {
                                                         return x429;
                                                      }(fromArray(local_416.session.teachers));
                                              switch (x.tag)
                                              {
                                                case "nonEmpty":
                                                  var local_430 = x.data;
                                                  return toArray(_3a__3a_({infixl: teacher1(local_430.head)
                                                                          ,infixr: function (local_431) {
                                                                             return _2b__2b_2({infixl: concat(map({list: local_430.tail({})
                                                                                                                  ,mapping: function (local_432) {
                                                                                                                     return _3a__3a_({infixl: leaf(function () {
                                                                                                                                        var x =
                                                                                                                                        local_416.language;
                                                                                                                                        switch (x.tag)
                                                                                                                                        {
                                                                                                                                          case "english":
                                                                                                                                            var local_433 =
                                                                                                                                            x.data;
                                                                                                                                            return rts.bytesFromAscii(" & ");
                                                                                                                                          case "hebrew":
                                                                                                                                            var local_434 =
                                                                                                                                            x.data;
                                                                                                                                            return rts.bytes([32
                                                                                                                                                             ,215
                                                                                                                                                             ,149]);
                                                                                                                                          default:
                                                                                                                                            throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                                                              ,"9750a7059a5af134d0eb3dcae276f1a7");
                                                                                                                                        }
                                                                                                                                     }())
                                                                                                                                     ,infixr: function (local_435) {
                                                                                                                                        return _3a__3a_({infixl: teacher1(local_432)
                                                                                                                                                        ,infixr: function (local_436) {
                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                  ,data: {}};
                                                                                                                                                        }});
                                                                                                                                     }});
                                                                                                                  }}))
                                                                                              ,infixr: function (local_437) {
                                                                                                 return _3a__3a_({infixl: leaf(_2b__2b_({a: rts.bytesFromAscii(": ")
                                                                                                                                        ,b: local_416.session.name}))
                                                                                                                 ,infixr: function (local_438) {
                                                                                                                    return {tag: "empty"
                                                                                                                           ,data: {}};
                                                                                                                 }});
                                                                                              }});
                                                                          }}));
                                                case "empty":
                                                  var local_439 = x.data;
                                                  return singleton(leaf(local_416.session.name));
                                                default:
                                                  throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                    ,"ed7be6bad9f71095a62be6746bf728a3");
                                              }
                                           }()})
                           ,infixr: function (local_440) {
                              return _2b__2b_2({infixl: function () {
                                                  var x = function (x441) {
                                                             return x441;
                                                          }(local_416.password);
                                                  switch (x.tag)
                                                  {
                                                    case "just":
                                                      var local_442 = x.data;
                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                      ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/eng/edit/")
                                                                                                                                               ,infixr: function (local_443) {
                                                                                                                                                  return _3a__3a_({infixl: showNum(local_416.session.id)
                                                                                                                                                                  ,infixr: function (local_444) {
                                                                                                                                                                     return _3a__3a_({infixl: rts.bytesFromAscii("/")
                                                                                                                                                                                     ,infixr: function (local_445) {
                                                                                                                                                                                        return _3a__3a_({infixl: local_442
                                                                                                                                                                                                        ,infixr: function (local_446) {
                                                                                                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                                                                                                                           ,infixr: function (local_447) {
                                                                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                                                                           }});
                                                                                                                                                                                                        }});
                                                                                                                                                                                     }});
                                                                                                                                                                  }});
                                                                                                                                               }})
                                                                                                                              ,seperator: rts.bytesFromAscii("")})
                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("Edit details")))}))})
                                                                      ,infixr: function (local_448) {
                                                                         return {tag: "empty"
                                                                                ,data: {}};
                                                                      }});
                                                    case "nothing":
                                                      var local_449 = x.data;
                                                      return {tag: "empty",data: {}};
                                                    default:
                                                      throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                        ,"fad3e2035a95ac24b0214f741995983a");
                                                  }
                                               }()
                                               ,infixr: function (local_450) {
                                                  return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<b>")
                                                                                  ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_416.session.when
                                                                                                                         ,language: local_416.language})))})
                                                                  ,infixr: function (local_475) {
                                                                     return _3a__3a_({infixl: local_420({value: local_416.session.place.name
                                                                                                        ,key: function () {
                                                                                                           var x =
                                                                                                           local_416.language;
                                                                                                           switch (x.tag)
                                                                                                           {
                                                                                                             case "english":
                                                                                                               var local_476 =
                                                                                                               x.data;
                                                                                                               return rts.bytesFromAscii("Where: ");
                                                                                                             case "hebrew":
                                                                                                               var local_477 =
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
                                                                                                               throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                                 ,"179cde6923eb73cf24940af0561913a7");
                                                                                                           }
                                                                                                        }()})
                                                                                     ,infixr: function (local_478) {
                                                                                        return _3a__3a_({infixl: local_420({value: local_416.session.level.name
                                                                                                                           ,key: function () {
                                                                                                                              var x =
                                                                                                                              local_416.language;
                                                                                                                              switch (x.tag)
                                                                                                                              {
                                                                                                                                case "english":
                                                                                                                                  var local_479 =
                                                                                                                                  x.data;
                                                                                                                                  return rts.bytesFromAscii("Who: ");
                                                                                                                                case "hebrew":
                                                                                                                                  var local_480 =
                                                                                                                                  x.data;
                                                                                                                                  return rts.bytes([215
                                                                                                                                                   ,158
                                                                                                                                                   ,215
                                                                                                                                                   ,153
                                                                                                                                                   ,58
                                                                                                                                                   ,32]);
                                                                                                                                default:
                                                                                                                                  throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                                                    ,"a86a0d0f193b3a5704ba058160976419");
                                                                                                                              }
                                                                                                                           }()})
                                                                                                        ,infixr: function (local_481) {
                                                                                                           return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                           ,infixr: singleton(leaf(function () {
                                                                                                                                              var x =
                                                                                                                                              local_416.language;
                                                                                                                                              switch (x.tag)
                                                                                                                                              {
                                                                                                                                                case "english":
                                                                                                                                                  var local_482 =
                                                                                                                                                  x.data;
                                                                                                                                                  return rts.bytesFromAscii("Description:");
                                                                                                                                                case "hebrew":
                                                                                                                                                  var local_483 =
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
                                                                                                                                                  throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                                                                    ,"9be0f6a7af77ef5ae10c6cc37838cf70");
                                                                                                                                              }
                                                                                                                                           }()))})
                                                                                                                           ,infixr: function (local_484) {
                                                                                                                              var local_485 =
                                                                                                                              function (text3) {
                                                                                                                                 return replace({text: text3
                                                                                                                                                ,from: rts.bytesFromAscii("\n")
                                                                                                                                                ,to: rts.bytesFromAscii("<br/>\n")});
                                                                                                                              };
                                                                                                                              return _3a__3a_({infixl: htmlParagraph(local_485(local_416.session.description))
                                                                                                                                              ,infixr: function (local_486) {
                                                                                                                                                 return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                 ,infixr: singleton(leaf(function () {
                                                                                                                                                                                    var x =
                                                                                                                                                                                    local_416.language;
                                                                                                                                                                                    switch (x.tag)
                                                                                                                                                                                    {
                                                                                                                                                                                      case "english":
                                                                                                                                                                                        var local_487 =
                                                                                                                                                                                        x.data;
                                                                                                                                                                                        return rts.bytesFromAscii("Prereqs:");
                                                                                                                                                                                      case "hebrew":
                                                                                                                                                                                        var local_488 =
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
                                                                                                                                                                                        throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                                                                                                          ,"2b42a6de4a3edaa1b093b42c3a22ec18");
                                                                                                                                                                                    }
                                                                                                                                                                                 }()))})
                                                                                                                                                                 ,infixr: function (local_489) {
                                                                                                                                                                    return _3a__3a_({infixl: htmlParagraph(local_485(local_416.session.prereqs))
                                                                                                                                                                                    ,infixr: function (local_490) {
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
var htmlPopup = function (local_491) {
   return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<div id=\"")
                                           ,infixr: function (local_492) {
                                              return _3a__3a_({infixl: local_491.id
                                                              ,infixr: function (local_493) {
                                                                 return _3a__3a_({infixl: rts.bytesFromAscii("\" class=\"overlay\">")
                                                                                 ,infixr: function (local_494) {
                                                                                    return {tag: "empty"
                                                                                           ,data: {}};
                                                                                 }});
                                                              }});
                                           }}))
                 ,infixr: [_22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<div class=\"popup\" style=\"background-color:")
                                                            ,infixr: function (local_495) {
                                                               return _3a__3a_({infixl: local_491.color
                                                                               ,infixr: function (local_496) {
                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii("\">")
                                                                                                  ,infixr: function (local_497) {
                                                                                                     return {tag: "empty"
                                                                                                            ,data: {}};
                                                                                                  }});
                                                                               }});
                                                            }}))
                                  ,infixr: local_491.content})]});
};
var pestovalSessionCell = function (local_392) {
   var local_393 = _2b__2b_({a: rts.bytesFromAscii("popup-")
                            ,b: showNum(local_392.session.id)});
   return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<td style=\"border:2pt solid white; text-align:center; background-color:")
                                           ,infixr: function (local_394) {
                                              var color = local_392.session.level.color;
                                              return _3a__3a_({infixl: function () {
                                                                 var x = function (x395) {
                                                                            return x395;
                                                                         }(_3d__3d_({infixl: color
                                                                                    ,infixr: rts.bytesFromAscii("null")}));
                                                                 switch (x.tag)
                                                                 {
                                                                   case "false":
                                                                     var local_396 =
                                                                     x.data;
                                                                     return color;
                                                                   case "true":
                                                                     var local_397 =
                                                                     x.data;
                                                                     return rts.bytesFromAscii("#eee");
                                                                   default:
                                                                     throw rts.exceptions.UnhandledCase("DEF_9020eea8542142a09c1a8813ef9990af"
                                                                                                       ,"8af192079f77d68114daa54992f28614");
                                                                 }
                                                              }()
                                                              ,infixr: function (local_398) {
                                                                 return _3a__3a_({infixl: rts.bytesFromAscii(";")
                                                                                 ,infixr: function (local_399) {
                                                                                    return _3a__3a_({infixl: local_392.style
                                                                                                    ,infixr: function (local_400) {
                                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\" ")
                                                                                                                       ,infixr: function (local_401) {
                                                                                                                          return _3a__3a_({infixl: local_392.attributes
                                                                                                                                          ,infixr: function (local_402) {
                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(">")
                                                                                                                                                             ,infixr: function (local_403) {
                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                       ,data: {}};
                                                                                                                                                             }});
                                                                                                                                          }});
                                                                                                                       }});
                                                                                                    }});
                                                                                 }});
                                                              }});
                                           }}))
                 ,infixr: toArray(function () {
                    var x = function (x406) {
                               return x406;
                            }(_26__26_({infixl: _3d__3d_({infixl: local_392.session.description
                                                         ,infixr: rts.bytesFromAscii("")})
                                       ,infixr: function (local_404) {
                                          return _26__26_({infixl: _3d__3d_({infixl: local_392.session.prereqs
                                                                            ,infixr: rts.bytesFromAscii("")})
                                                          ,infixr: function (local_405) {
                                                             return _3d__3d_({infixl: local_392.password
                                                                             ,infixr: {tag: "nothing"
                                                                                      ,data: {}}});
                                                          }});
                                       }}));
                    switch (x.tag)
                    {
                      case "false":
                        var local_407 = x.data;
                        return _3a__3a_({infixl: leaf(concat1(_3a__3a_({infixl: rts.bytesFromAscii("<input type=\"checkbox\" id=\"")
                                                                       ,infixr: function (local_408) {
                                                                          return _3a__3a_({infixl: local_393
                                                                                          ,infixr: function (local_409) {
                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii("\" style=\"display: none;\"/>")
                                                                                                             ,infixr: function (local_410) {
                                                                                                                return {tag: "empty"
                                                                                                                       ,data: {}};
                                                                                                             }});
                                                                                          }});
                                                                       }})))
                                        ,infixr: function (local_411) {
                                           return _3a__3a_({infixl: _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<label for=\"")
                                                                                                     ,infixr: function (local_412) {
                                                                                                        return _3a__3a_({infixl: local_393
                                                                                                                        ,infixr: function (local_413) {
                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("\">")
                                                                                                                                           ,infixr: function (local_414) {
                                                                                                                                              return {tag: "empty"
                                                                                                                                                     ,data: {}};
                                                                                                                                           }});
                                                                                                                        }});
                                                                                                     }}))
                                                                           ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<div style=\"text-decoration:underline\">")
                                                                                            ,infixr: toArray(local_392.content)})
                                                                                    ,htmlPopup({content: pestovalSessionInfo({password: local_392.password
                                                                                                                             ,language: local_392.language
                                                                                                                             ,session: local_392.session})
                                                                                               ,id: local_393
                                                                                               ,color: local_392.session.level.color})]})
                                                           ,infixr: function (local_500) {
                                                              return {tag: "empty"
                                                                     ,data: {}};
                                                           }});
                                        }});
                      case "true":
                        var local_501 = x.data;
                        return local_392.content;
                      default:
                        throw rts.exceptions.UnhandledCase("DEF_9020eea8542142a09c1a8813ef9990af"
                                                          ,"ca251d05869f9c09e61c190e8fb9840b");
                    }
                 }())});
};
var htmlTable = function (local_502) {
   return _22f2_({infixl: _2b__2b_({a: rts.bytesFromAscii("<table width=\"100%\" style=\"table-layout:fixed; border-collapse:collapse\"")
                                   ,b: function () {
                                      var x = local_502.language;
                                      switch (x.tag)
                                      {
                                        case "english":
                                          var local_503 = x.data;
                                          return rts.bytesFromAscii(">");
                                        case "hebrew":
                                          var local_504 = x.data;
                                          return rts.bytesFromAscii(" dir=\"rtl\">");
                                        default:
                                          throw rts.exceptions.UnhandledCase("DEF_c270fb6c0aee498e865b7bf936941c16"
                                                                            ,"3593d20a3691e4acedfdfbe5a1b33cdf");
                                      }
                                   }()})
                 ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<tbody>")
                                           ,infixr: local_502.body}))});
};
var pestovalManageFloating = function (local_250) {
   return _3b_({infixl: pestovalQuerySessions({database: local_250.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: {tag: "english",data: {}}
                                              ,filter: {tag: "just"
                                                       ,data: rts.bytesFromAscii("pestoval_session.location_id IS NULL")}})
               ,infixr: function (local_386) {
                  return __return(function () {
                         var x = function (x387) {
                                    return x387;
                                 }(_3d__3d_({infixl: length1(local_386),infixr: 0.0}));
                         switch (x.tag)
                         {
                           case "false":
                             var local_388 = x.data;
                             return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Floating Sessions")))})
                                             ,infixr: function (local_391) {
                                                return _3a__3a_({infixl: htmlTable({body: toArray(map({list: fromArray(local_386)
                                                                                                      ,mapping: function (session2) {
                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                       ,infixr: singleton(pestovalSessionCell({password: {tag: "just"
                                                                                                                                                                         ,data: local_250.password}
                                                                                                                                                              ,content: {tag: "empty"
                                                                                                                                                                        ,data: {}}
                                                                                                                                                              ,style: rts.bytesFromAscii("")
                                                                                                                                                              ,attributes: rts.bytesFromAscii("")
                                                                                                                                                              ,language: {tag: "english"
                                                                                                                                                                         ,data: {}}
                                                                                                                                                              ,session: session2}))});
                                                                                                      }}))
                                                                                   ,language: {tag: "english"
                                                                                              ,data: {}}})
                                                                ,infixr: function (local_505) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }});
                           case "true":
                             var local_506 = x.data;
                             return {tag: "empty",data: {}};
                           default:
                             throw rts.exceptions.UnhandledCase("DEF_d40cade7acd3445089af06cfb0ca8c08"
                                                               ,"3aeafeb193f3926d38156605e21596e9");
                         }
                      }());
               }});
};
var pestovalQueryTeachers = function (local_509) {
   return _3b_({infixl: query({database: local_509.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_teacher.id, ")
                                                             ,b: queryFieldLang(local_509.language)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii(", pestoval_teacher.password\n\nFROM pestoval_teacher\nORDER BY name")})})
               ,infixr: function (x510) {
                  switch (x510.tag)
                  {
                    case "error":
                      var local_511 = x510.data;
                      return ignoreError(local_511);
                    case "success":
                      var local_512 = x510.data;
                      return __return(toArray(map({list: fromArray(local_512.__data)
                                                  ,mapping: function (local_513) {
                                                     return {name: item({index: 1.0
                                                                        ,object: local_513})
                                                            ,password: item({index: 2.0
                                                                            ,object: local_513})
                                                            ,id: parseInt(item({index: 0.0
                                                                               ,object: local_513}))};
                                                  }})));
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_41c05c33b7354982a8a4a555048c1eb3"
                                                        ,"9ddd75e6d73b06295a0c649ed6da5f00");
                  }
               }});
};
var pestovalManageTeachers = function (local_508) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_508.database
                                              ,language: {tag: "english",data: {}}})
               ,infixr: function (teachers1) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_514) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(map({list: fromArray(teachers1)
                                                                                                   ,mapping: function (local_515) {
                                                                                                      var local_517 =
                                                                                                      function (local_516) {
                                                                                                         return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<a href=\"/eng/teacher/")
                                                                                                                                                                ,b: showNum(local_515.id)})
                                                                                                                                                   ,b: rts.bytesFromAscii("/")})
                                                                                                                                      ,b: local_516})
                                                                                                                         ,b: rts.bytesFromAscii("/\">")});
                                                                                                      };
                                                                                                      return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                    ,infixr: [_22f2_({infixl: local_517(local_508.password)
                                                                                                                                     ,infixr: singleton(leaf(local_515.name))})
                                                                                                                             ,leaf(rts.bytesFromAscii(" "))
                                                                                                                             ,_22f2_({infixl: local_517(local_515.password)
                                                                                                                                     ,infixr: singleton(leaf(rts.bytesFromAscii("(personal link)")))})]});
                                                                                                   }}))})
                                                              ,infixr: function (local_521) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var sequence = function (list7) {
   return foldLazy({list: list7
                   ,initial: function (local_525) {
                      return __return({tag: "empty",data: {}});
                   }
                   ,binop: function (local_526) {
                      return _3b_({infixl: local_526.item
                                  ,infixr: function (local_527) {
                                     return _3b_({infixl: local_526.rest({})
                                                 ,infixr: function (local_528) {
                                                    return __return({tag: "nonEmpty"
                                                                    ,data: {head: local_527
                                                                           ,tail: function (local_529) {
                                                                              return local_528;
                                                                           }}});
                                                 }});
                                  }});
                   }});
};
var renderHtml = rts.builtins.Optimized["renderHtml"];
var httpOk200 = {message: rts.bytesFromAscii("OK"),code: 200.0};
var pestovalPage = function (local_531) {
   return {content: {__data: function (x536) {
                       return x536;
                    }(_2b__2b_({a: rts.bytesFromAscii("<!DOCTYPE html>\n")
                               ,b: renderHtml(_22f2_({infixl: rts.bytesFromAscii("<html>")
                                                     ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<head>")
                                                                      ,infixr: [leaf(rts.bytesFromAscii("<meta charset=\"utf-8\" />"))
                                                                               ,_22f2_({infixl: rts.bytesFromAscii("<title>")
                                                                                       ,infixr: singleton(leaf(local_531.title))})]})
                                                              ,_22f2_({infixl: rts.bytesFromAscii("<body>")
                                                                      ,infixr: local_531.body})]}))}))
                    ,mimeType: rts.bytesFromAscii("text/html")}
          ,status: httpOk200};
};
var pestovalManage = function (local_244) {
   var password2 = function () {
                      var x = function (x245) {
                                 return x245;
                              }(_3d__3d_({infixl: length1(local_244.path),infixr: 0.0}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_246 = x.data;
                          return item({index: 0.0,object: local_244.path});
                        case "true":
                          var local_247 = x.data;
                          return rts.bytesFromAscii("");
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_e7b481c7abf74eb892737b8de024fc75"
                                                            ,"87f1806be8d1cfa4cad909539a3a312d");
                      }
                   }();
   return _3b_({infixl: pestovalAuth({database: local_244.database
                                     ,password: password2
                                     ,teachers: []})
               ,infixr: function (x248) {
                  switch (x248.tag)
                  {
                    case "admin":
                      var local_249 = x248.data;
                      return _3b_({infixl: sequence(_3a__3a_({infixl: pestovalManageFloating({database: local_244.database
                                                                                             ,password: password2})
                                                             ,infixr: function (local_507) {
                                                                return _3a__3a_({infixl: pestovalManageTeachers({database: local_244.database
                                                                                                                ,password: password2})
                                                                                ,infixr: function (local_522) {
                                                                                   return _3a__3a_({infixl: __return(_3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"/eng/new/")
                                                                                                                                                                             ,b: password2})
                                                                                                                                                                ,b: rts.bytesFromAscii("\">")})
                                                                                                                                              ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Add new session")))}))})
                                                                                                                              ,infixr: function (local_523) {
                                                                                                                                 return {tag: "empty"
                                                                                                                                        ,data: {}};
                                                                                                                              }}))
                                                                                                   ,infixr: function (local_524) {
                                                                                                      return {tag: "empty"
                                                                                                             ,data: {}};
                                                                                                   }});
                                                                                }});
                                                             }}))
                                  ,infixr: function (local_530) {
                                     return __return(pestovalPage({title: rts.bytesFromAscii("Manage")
                                                                  ,body: toArray(concat(local_530))}));
                                  }});
                    default:
                      var local_537 = x248;
                      return __return(pestovalUnauthorized);
                  }
               }});
};
var getSession = function (local_541) {
   var filter = {tag: "just"
                ,data: _2b__2b_({a: rts.bytesFromAscii("pestoval_session.id = ")
                                ,b: showNum(local_541.id)})};
   return _3b_({infixl: pestovalQuerySessions({database: local_541.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: {tag: "english",data: {}}
                                              ,filter: filter})
               ,infixr: function (local_542) {
                  return _3b_({infixl: pestovalQuerySessions({database: local_541.database
                                                             ,teacher: {tag: "nothing"
                                                                       ,data: {}}
                                                             ,language: {tag: "hebrew"
                                                                        ,data: {}}
                                                             ,filter: filter})
                              ,infixr: function (local_543) {
                                 return __return(function () {
                                        var x = function (x545) {
                                                   return x545;
                                                }(_26__26_({infixl: _3d__3d_({infixl: length1(local_542)
                                                                             ,infixr: 1.0})
                                                           ,infixr: function (local_544) {
                                                              return _3d__3d_({infixl: length1(local_543)
                                                                              ,infixr: 1.0});
                                                           }}));
                                        switch (x.tag)
                                        {
                                          case "false":
                                            var local_546 = x.data;
                                            return {tag: "nothing",data: {}};
                                          case "true":
                                            var local_547 = x.data;
                                            var english = item({index: 0.0
                                                               ,object: local_542});
                                            var hebrew = item({index: 0.0
                                                              ,object: local_543});
                                            return {tag: "just"
                                                   ,data: {prereqs: {english: english.prereqs
                                                                    ,hebrew: function () {
                                                                       var x =
                                                                       function (x548) {
                                                                          return x548;
                                                                       }(_3d__3d_({infixl: hebrew.prereqs
                                                                                  ,infixr: english.prereqs}));
                                                                       switch (x.tag)
                                                                       {
                                                                         case "false":
                                                                           var local_549 =
                                                                           x.data;
                                                                           return hebrew.prereqs;
                                                                         case "true":
                                                                           var local_550 =
                                                                           x.data;
                                                                           return rts.bytesFromAscii("");
                                                                         default:
                                                                           throw rts.exceptions.UnhandledCase("DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                             ,"66008b68b7f09f3bc6eb8f888fcedd0f");
                                                                       }
                                                                    }()}
                                                          ,name: {english: english.name
                                                                 ,hebrew: function () {
                                                                    var x =
                                                                    function (x551) {
                                                                       return x551;
                                                                    }(_3d__3d_({infixl: hebrew.name
                                                                               ,infixr: english.name}));
                                                                    switch (x.tag)
                                                                    {
                                                                      case "false":
                                                                        var local_552 =
                                                                        x.data;
                                                                        return hebrew.name;
                                                                      case "true":
                                                                        var local_553 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("");
                                                                      default:
                                                                        throw rts.exceptions.UnhandledCase("DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                          ,"2182d2a13ee677d6f08e74aba25b59cb");
                                                                    }
                                                                 }()}
                                                          ,place: english.place
                                                          ,description: {english: english.description
                                                                        ,hebrew: function () {
                                                                           var x =
                                                                           function (x554) {
                                                                              return x554;
                                                                           }(_3d__3d_({infixl: hebrew.description
                                                                                      ,infixr: english.description}));
                                                                           switch (x.tag)
                                                                           {
                                                                             case "false":
                                                                               var local_555 =
                                                                               x.data;
                                                                               return hebrew.description;
                                                                             case "true":
                                                                               var local_556 =
                                                                               x.data;
                                                                               return rts.bytesFromAscii("");
                                                                             default:
                                                                               throw rts.exceptions.UnhandledCase("DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                                                 ,"e3d09b66fde49642215bacd53e5f9ffc");
                                                                           }
                                                                        }()}
                                                          ,teachers: english.teachers
                                                          ,id: english.id
                                                          ,when: english.when
                                                          ,level: english.level}};
                                          default:
                                            throw rts.exceptions.UnhandledCase("DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                              ,"282e1ffc1e2c4271d86489b39185d0e0");
                                        }
                                     }());
                              }});
               }});
};
var allOf = function (local_581) {
   return foldLazy({list: local_581.list
                   ,initial: function (local_582) {
                      return {tag: "true",data: {}};
                   }
                   ,binop: function (local_583) {
                      return _26__26_({infixl: local_581.satisfy(local_583.item)
                                      ,infixr: local_583.rest});
                   }});
};
var filter1 = function (local_584) {
   var x = function (x585) { return x585;}(local_584.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_586 = x.data;
       var rest = function (local_587) {
          return filter1({list: local_586.tail({}),keep: local_584.keep});
       };
       var x = function (x588) { return x588;}(local_584.keep(local_586.head));
       switch (x.tag)
       {
         case "false":
           var local_589 = x.data;
           return rest({});
         case "true":
           var local_590 = x.data;
           return {tag: "nonEmpty",data: {head: local_586.head,tail: rest}};
         default:
           throw rts.exceptions.UnhandledCase("DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                             ,"fbe0954bea2f4c248cb91ac61e7821ba");
       }
     case "empty":
       var local_591 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                         ,"2cb5f2574b8b4e3d8e5510fee403db44");
   }
};
var teachersEditForm = function (local_570) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_570.database
                                              ,language: {tag: "english",data: {}}})
               ,infixr: function (local_571) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_572) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(_2b__2b_2({infixl: map({list: fromArray(local_570.teachers)
                                                                                                                      ,mapping: function (local_573) {
                                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                       ,infixr: [leaf(local_573.name)
                                                                                                                                                ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<button type=\"submit\" name=\"remove_teacher\" value=\"")
                                                                                                                                                                                       ,b: showNum(local_573.id)})
                                                                                                                                                                          ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Remove")))})]});
                                                                                                                      }})
                                                                                                         ,infixr: function (local_576) {
                                                                                                            return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                            ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<label for=\"add_teacher\">")
                                                                                                                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Add:")))})
                                                                                                                                                     ,_22f2_({infixl: rts.bytesFromAscii("<select id=\"add_teacher\" name=\"add_teacher\">")
                                                                                                                                                             ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                                                                                                       ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                                                                                                       ,infixr: function (local_578) {
                                                                                                                                                                                          return map({list: filter1({list: fromArray(local_571)
                                                                                                                                                                                                                    ,keep: function (local_579) {
                                                                                                                                                                                                                       return allOf({list: fromArray(local_570.teachers)
                                                                                                                                                                                                                                    ,satisfy: function (local_580) {
                                                                                                                                                                                                                                       return _2260_({infixl: local_579.id
                                                                                                                                                                                                                                                     ,infixr: local_580.id});
                                                                                                                                                                                                                                    }});
                                                                                                                                                                                                                    }})
                                                                                                                                                                                                     ,mapping: function (local_592) {
                                                                                                                                                                                                        return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                                                                                                     ,b: showNum(local_592.id)})
                                                                                                                                                                                                                                        ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                                                                                      ,infixr: singleton(leaf(local_592.name))});
                                                                                                                                                                                                     }});
                                                                                                                                                                                       }}))})]})
                                                                                                                            ,infixr: function (local_594) {
                                                                                                                               return {tag: "empty"
                                                                                                                                      ,data: {}};
                                                                                                                            }});
                                                                                                         }}))})
                                                              ,infixr: function (local_595) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var processSimpleQuery = function (x598) {
   switch (x598.tag)
   {
     case "error":
       var local_599 = x598.data;
       return ignoreError(local_599);
     case "success":
       var local_600 = x598.data;
       return __return(toArray(map({list: fromArray(local_600.__data)
                                   ,mapping: function (local_601) {
                                      return {name: item({index: 1.0,object: local_601})
                                             ,id: parseInt(item({index: 0.0
                                                                ,object: local_601}))};
                                   }})));
     default:
       throw rts.exceptions.UnhandledCase("DEF_a0f0234c060c4086a39fffe55fe3f9a9"
                                         ,"bc83e03aa2977cc46406e062c7e1acaa");
   }
};
var pestovalQueryLevels = function (database1) {
   return _3b_({infixl: query({database: database1
                              ,object: rts.bytesFromAscii("SELECT\n  pestoval_level.id, pestoval_level.name\nFROM pestoval_level\nORDER BY pestoval_level.as_number")})
               ,infixr: processSimpleQuery});
};
var levelEditForm = function (local_597) {
   return _3b_({infixl: pestovalQueryLevels(local_597.database)
               ,infixr: function (local_602) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Level")))})
                                           ,infixr: function (local_603) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"level\" name=\"level\">")
                                                                              ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                        ,infixr: function (local_604) {
                                                                                                           return map({list: fromArray(local_602)
                                                                                                                      ,mapping: function (local_605) {
                                                                                                                         return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                      ,b: showNum(local_605.id)})
                                                                                                                                                         ,b: function () {
                                                                                                                                                            var x =
                                                                                                                                                            function (x606) {
                                                                                                                                                               return x606;
                                                                                                                                                            }(_3d__3d_({infixl: local_605.id
                                                                                                                                                                       ,infixr: local_597.level.id}));
                                                                                                                                                            switch (x.tag)
                                                                                                                                                            {
                                                                                                                                                              case "false":
                                                                                                                                                                var local_607 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\">");
                                                                                                                                                              case "true":
                                                                                                                                                                var local_608 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\" selected>");
                                                                                                                                                              default:
                                                                                                                                                                throw rts.exceptions.UnhandledCase("DEF_a5e4925095a54ec393e6e4d5942a5dec"
                                                                                                                                                                                                  ,"9a49b8f7220edcf647eba821ecf8b91a");
                                                                                                                                                            }
                                                                                                                                                         }()})
                                                                                                                                       ,infixr: singleton(leaf(local_605.name))});
                                                                                                                      }});
                                                                                                        }}))})
                                                              ,infixr: function (local_609) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var locationEditForm = function (local_611) {
   return _3b_({infixl: _3b_({infixl: query({database: local_611.database
                                            ,object: rts.bytesFromAscii("SELECT pestoval_location.id, pestoval_location.name FROM pestoval_location")})
                             ,infixr: processSimpleQuery})
               ,infixr: function (local_612) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Where")))})
                                           ,infixr: function (local_613) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"location\" name=\"location\">")
                                                                              ,infixr: toArray(map({list: fromArray(local_612)
                                                                                                   ,mapping: function (local_614) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_614.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         function (x615) {
                                                                                                                                            return x615;
                                                                                                                                         }(_3d__3d_({infixl: local_614.id
                                                                                                                                                    ,infixr: local_611.where.id}));
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_616 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_617 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.UnhandledCase("DEF_937ecfd7a5fb4cd6800d072419740277"
                                                                                                                                                                               ,"ae5dc56c181ace2274e213d24cf032c6");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(local_614.name))});
                                                                                                   }}))})
                                                              ,infixr: function (local_618) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalQueryTimeSlots = function (database2) {
   return _3b_({infixl: query({database: database2
                              ,object: rts.bytesFromAscii("SELECT\n  pestoval_timeslot.id, pestoval_timeslot.start, pestoval_timeslot.stop\nFROM pestoval_timeslot\nORDER BY pestoval_timeslot.start")})
               ,infixr: function (x621) {
                  switch (x621.tag)
                  {
                    case "error":
                      var local_622 = x621.data;
                      return ignoreError(local_622);
                    case "success":
                      var local_623 = x621.data;
                      return __return(toArray(map({list: fromArray(local_623.__data)
                                                  ,mapping: function (local_624) {
                                                     return {start: parseDateTime(item({index: 1.0
                                                                                       ,object: local_624}))
                                                            ,stop: parseDateTime(item({index: 2.0
                                                                                      ,object: local_624}))
                                                            ,id: parseInt(item({index: 0.0
                                                                               ,object: local_624}))};
                                                  }})));
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_e253b6e9f37d40d099b39de266d912c9"
                                                        ,"37d0edcc32ab5606822a8107f66ced58");
                  }
               }});
};
var timeSlotEditForm = function (local_620) {
   return _3b_({infixl: pestovalQueryTimeSlots(local_620.database)
               ,infixr: function (local_625) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("When")))})
                                           ,infixr: function (local_626) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"when\" name=\"when\">")
                                                                              ,infixr: toArray(map({list: fromArray(local_625)
                                                                                                   ,mapping: function (local_627) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_627.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         function (x628) {
                                                                                                                                            return x628;
                                                                                                                                         }(_3d__3d_({infixl: local_627.id
                                                                                                                                                    ,infixr: local_620.when.id}));
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_629 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_630 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.UnhandledCase("DEF_3860ce434c144382b8c11631e28ab02f"
                                                                                                                                                                               ,"11873d6a08b91a78c3a93a526e65434f");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_627
                                                                                                                                                           ,language: {tag: "english"
                                                                                                                                                                      ,data: {}}})))});
                                                                                                   }}))})
                                                              ,infixr: function (local_631) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalSessionSummary = function (session4) {
   return concat(map({list: _3a__3a_({infixl: {name: rts.bytesFromAscii("Teachers")
                                              ,value: join({texts: map({list: fromArray(session4.teachers)
                                                                       ,mapping: function (local_635) {
                                                                          return local_635.name;
                                                                       }})
                                                           ,seperator: rts.bytesFromAscii(" & ")})}
                                     ,infixr: function (local_636) {
                                        return _3a__3a_({infixl: {name: rts.bytesFromAscii("Where")
                                                                 ,value: session4.place.name}
                                                        ,infixr: function (local_637) {
                                                           return _3a__3a_({infixl: {name: rts.bytesFromAscii("When")
                                                                                    ,value: formatTimeSlot({timeSlot: session4.when
                                                                                                           ,language: {tag: "english"
                                                                                                                      ,data: {}}})}
                                                                           ,infixr: function (local_638) {
                                                                              return _3a__3a_({infixl: {name: rts.bytesFromAscii("Level")
                                                                                                       ,value: session4.level.name}
                                                                                              ,infixr: function (local_639) {
                                                                                                 return {tag: "empty"
                                                                                                        ,data: {}};
                                                                                              }});
                                                                           }});
                                                        }});
                                     }})
                     ,mapping: function (local_640) {
                        return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h4>")
                                                        ,infixr: singleton(leaf(local_640.name))})
                                        ,infixr: function (local_641) {
                                           return _3a__3a_({infixl: leaf(local_640.value)
                                                           ,infixr: function (local_642) {
                                                              return {tag: "empty"
                                                                     ,data: {}};
                                                           }});
                                        }});
                     }}));
};
var pestovalEditField = function (local_646) {
   return _3a__3a_({infixl: {name: local_646.name
                            ,value: local_646.value.english
                            ,key: local_646.key}
                   ,infixr: function (local_647) {
                      return _3a__3a_({infixl: {name: _2b__2b_({a: local_646.name
                                                               ,b: rts.bytesFromAscii(" (Hebrew)")})
                                               ,value: local_646.value.hebrew
                                               ,key: _2b__2b_({a: local_646.key
                                                              ,b: rts.bytesFromAscii("_hebrew")})}
                                      ,infixr: function (local_648) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var pestovalEditFields = function (local_650) {
   return _2b__2b_2({infixl: pestovalEditField({name: rts.bytesFromAscii("Description")
                                               ,value: local_650.description
                                               ,key: rts.bytesFromAscii("description")})
                    ,infixr: function (local_651) {
                       return pestovalEditField({name: rts.bytesFromAscii("Pre-reqs")
                                                ,value: local_650.prereqs
                                                ,key: rts.bytesFromAscii("prereqs")});
                    }});
};
var formTextArea = function (local_652) {
   return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<label for=\"")
                                                                  ,b: local_652.key})
                                                     ,b: rts.bytesFromAscii("\">")})
                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                             ,infixr: singleton(leaf(_2b__2b_({a: local_652.name
                                                                                              ,b: rts.bytesFromAscii(":")})))}))})
                   ,infixr: function (local_653) {
                      return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<textarea rows=10 cols=80 id=\"")
                                                                                                               ,b: local_652.key})
                                                                                                  ,b: rts.bytesFromAscii("\" name=\"")})
                                                                                     ,b: local_652.key})
                                                                        ,b: rts.bytesFromAscii("\">")})
                                                      ,infixr: singleton(leaf(local_652.value))})
                                      ,infixr: function (local_654) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var postgresEncodeText = function (text5) {
   return _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("E\'")
                                ,b: concat1(map({list: fromBytes(function (x674) {
                                                   return x674;
                                                }(text5))
                                                ,mapping: function (local_675) {
                                                   var x = function (x676) {
                                                              return x676;
                                                           }(_3d__3d_({infixl: local_675
                                                                      ,infixr: 10.0}));
                                                   switch (x.tag)
                                                   {
                                                     case "false":
                                                       var local_677 = x.data;
                                                       var x = function (x678) {
                                                                  return x678;
                                                               }(_3d__3d_({infixl: local_675
                                                                          ,infixr: 13.0}));
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_679 = x.data;
                                                           var x = function (x680) {
                                                                      return x680;
                                                                   }(_3d__3d_({infixl: local_675
                                                                              ,infixr: 39.0}));
                                                           switch (x.tag)
                                                           {
                                                             case "false":
                                                               var local_681 = x.data;
                                                               var x = function (x682) {
                                                                          return x682;
                                                                       }(_3d__3d_({infixl: local_675
                                                                                  ,infixr: 92.0}));
                                                               switch (x.tag)
                                                               {
                                                                 case "false":
                                                                   var local_683 = x.data;
                                                                   return toBytes(singleton(local_675));
                                                                 case "true":
                                                                   var local_684 = x.data;
                                                                   return rts.bytesFromAscii("\\\\");
                                                                 default:
                                                                   throw rts.exceptions.UnhandledCase("DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                                     ,"db1c255f9dc88b1c4474ccb94732b223");
                                                               }
                                                             case "true":
                                                               var local_685 = x.data;
                                                               return rts.bytesFromAscii("\\\'");
                                                             default:
                                                               throw rts.exceptions.UnhandledCase("DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                                 ,"c5163200e2f7d7f5292c38e34f78058d");
                                                           }
                                                         case "true":
                                                           var local_686 = x.data;
                                                           return rts.bytesFromAscii("\\r");
                                                         default:
                                                           throw rts.exceptions.UnhandledCase("DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                             ,"af75122f296de089cbe121bebb73e3af");
                                                       }
                                                     case "true":
                                                       var local_687 = x.data;
                                                       return rts.bytesFromAscii("\\n");
                                                     default:
                                                       throw rts.exceptions.UnhandledCase("DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                         ,"6e996a4b5e8af95a3b4a4fcb8897103c");
                                                   }
                                                }}))})
                   ,b: rts.bytesFromAscii("\'")});
};
var head = function (list8) {
   var x = function (x699) { return x699;}(list8);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_700 = x.data;
       return {tag: "just",data: local_700.head};
     case "empty":
       var local_701 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_6ed761736e084d6c97cf57a406116d35"
                                         ,"f3442eac4d4349a99cafaa88a24c4a7a");
   }
};
var mapMaybe = function (local_702) {
   var x = function (x703) { return x703;}(local_702.maybe);
   switch (x.tag)
   {
     case "just":
       var local_704 = x.data;
       return {tag: "just",data: local_702.mapping(local_704)};
     case "nothing":
       var local_705 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_2e9eb864b9154a2594c46dbc34021fab"
                                         ,"5ed58bf5b9734ee5b4f4dc26197f7885");
   }
};
var lookup1 = function (local_695) {
   return mapMaybe({mapping: function (local_696) {
                      return local_696.value;
                   }
                   ,maybe: head(filter1({list: local_695.assocs
                                        ,keep: function (local_697) {
                                           var dummy1 = function (local_698) {
                                              return _3d__3d_({infixl: {value: function () {
                                                                          throw rts.exceptions.ReachedHole("DEF_0d310f73ee5345e9a1903f10b0b0a466"
                                                                                                          ,"64902637b1ad4b65b6c193bd6db7b954");
                                                                       }()
                                                                       ,key: function () {
                                                                          throw rts.exceptions.ReachedHole("DEF_0d310f73ee5345e9a1903f10b0b0a466"
                                                                                                          ,"94bfce1915d64b2eada80360aefe376a");
                                                                       }()}
                                                              ,infixr: local_697});
                                           };
                                           return _3d__3d_({infixl: local_697.key
                                                           ,infixr: local_695.key});
                                        }}))});
};
var updateSessionRow = function (local_665) {
   return _3b_({infixl: query({database: local_665.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET ")
                                                                          ,b: join({texts: concat(map({list: fromArray(local_665.body)
                                                                                                      ,mapping: function (local_666) {
                                                                                                         var x =
                                                                                                         function (x669) {
                                                                                                            return x669;
                                                                                                         }(_7c__7c_({infixl: _3d__3d_({infixl: local_666.key
                                                                                                                                      ,infixr: rts.bytesFromAscii("level")})
                                                                                                                    ,infixr: function (local_667) {
                                                                                                                       return _7c__7c_({infixl: _3d__3d_({infixl: local_666.key
                                                                                                                                                         ,infixr: rts.bytesFromAscii("location")})
                                                                                                                                       ,infixr: function (local_668) {
                                                                                                                                          return _3d__3d_({infixl: local_666.key
                                                                                                                                                          ,infixr: rts.bytesFromAscii("when")});
                                                                                                                                       }});
                                                                                                                    }}));
                                                                                                         switch (x.tag)
                                                                                                         {
                                                                                                           case "false":
                                                                                                             var local_670 =
                                                                                                             x.data;
                                                                                                             var x =
                                                                                                             function (x672) {
                                                                                                                return x672;
                                                                                                             }(_7c__7c_({infixl: _3d__3d_({infixl: local_666.key
                                                                                                                                          ,infixr: rts.bytesFromAscii("add_teacher")})
                                                                                                                        ,infixr: function (local_671) {
                                                                                                                           return _3d__3d_({infixl: local_666.key
                                                                                                                                           ,infixr: rts.bytesFromAscii("remove_teacher")});
                                                                                                                        }}));
                                                                                                             switch (x.tag)
                                                                                                             {
                                                                                                               case "false":
                                                                                                                 var local_673 =
                                                                                                                 x.data;
                                                                                                                 return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_666.key
                                                                                                                                                                ,b: rts.bytesFromAscii(" = ")})
                                                                                                                                                   ,b: postgresEncodeText(local_666.value)})
                                                                                                                                 ,infixr: function (local_688) {
                                                                                                                                    return {tag: "empty"
                                                                                                                                           ,data: {}};
                                                                                                                                 }});
                                                                                                               case "true":
                                                                                                                 var local_689 =
                                                                                                                 x.data;
                                                                                                                 return {tag: "empty"
                                                                                                                        ,data: {}};
                                                                                                               default:
                                                                                                                 throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                                                                                   ,"267a2077130878c293cf4285fc1e3f96");
                                                                                                             }
                                                                                                           case "true":
                                                                                                             var local_690 =
                                                                                                             x.data;
                                                                                                             return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_666.key
                                                                                                                                                            ,b: rts.bytesFromAscii("_id = ")})
                                                                                                                                               ,b: local_666.value})
                                                                                                                             ,infixr: function (local_691) {
                                                                                                                                return {tag: "empty"
                                                                                                                                       ,data: {}};
                                                                                                                             }});
                                                                                                           default:
                                                                                                             throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                                                                               ,"aa9a84aaaa93dd43099d75a1165bfc4b");
                                                                                                         }
                                                                                                      }}))
                                                                                   ,seperator: rts.bytesFromAscii(", ")})})
                                                             ,b: rts.bytesFromAscii("\nWHERE pestoval_session.id = ")})
                                                ,b: showNum(local_665.session)})})
               ,infixr: function (local_692) {
                  var x = local_692;
                  switch (x.tag)
                  {
                    case "error":
                      var local_693 = x.data;
                      return __return({tag: "error",data: local_693});
                    case "success":
                      var local_694 = x.data;
                      return _3b_({infixl: function () {
                                     var x = function (x706) {
                                                return x706;
                                             }(lookup1({assocs: fromArray(local_665.body)
                                                       ,key: rts.bytesFromAscii("add_teacher")}));
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_707 = x.data;
                                         var x = function (x708) {
                                                    return x708;
                                                 }(_3d__3d_({infixl: local_707
                                                            ,infixr: rts.bytesFromAscii("")}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_709 = x.data;
                                             return _3b_({infixl: query({database: local_665.database
                                                                        ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("INSERT INTO pestoval_session_teachers (session_id, teacher_id)\nVALUES (")
                                                                                                                                 ,b: showNum(local_665.session)})
                                                                                                                    ,b: rts.bytesFromAscii(", ")})
                                                                                                       ,b: local_707})
                                                                                          ,b: rts.bytesFromAscii(")")})})
                                                         ,infixr: function (x710) {
                                                            switch (x710.tag)
                                                            {
                                                              case "error":
                                                                var local_711 = x710.data;
                                                                return ignoreError(local_711);
                                                              case "success":
                                                                var local_712 = x710.data;
                                                                return __return({});
                                                              default:
                                                                throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                                  ,"3ad72f38b50bc1b5cc297ad16d68f28c");
                                                            }
                                                         }});
                                           case "true":
                                             var local_713 = x.data;
                                             return __return({});
                                           default:
                                             throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                               ,"138352fb50e0b842a35b65e5440d4cbb");
                                         }
                                       case "nothing":
                                         var local_714 = x.data;
                                         return __return({});
                                       default:
                                         throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                           ,"b7e3310f75aa51661dd00a4d961cbe7d");
                                     }
                                  }()
                                  ,infixr: function (local_715) {
                                     var x = function (x716) {
                                                return x716;
                                             }(lookup1({assocs: fromArray(local_665.body)
                                                       ,key: rts.bytesFromAscii("remove_teacher")}));
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_717 = x.data;
                                         return _3b_({infixl: query({database: local_665.database
                                                                    ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("DELETE FROM pestoval_session_teachers\nWHERE pestoval_session_teachers.session_id = ")
                                                                                                                ,b: showNum(local_665.session)})
                                                                                                   ,b: rts.bytesFromAscii(" AND pestoval_session_teachers.teacher_id = ")})
                                                                                      ,b: local_717})})
                                                     ,infixr: function (x718) {
                                                        switch (x718.tag)
                                                        {
                                                          case "error":
                                                            var local_719 = x718.data;
                                                            return __return({tag: "error"
                                                                            ,data: local_719});
                                                          case "success":
                                                            var local_720 = x718.data;
                                                            return __return({tag: "success"
                                                                            ,data: {}});
                                                          default:
                                                            throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                              ,"c22e107f85c6554bb3a7ef4080f8f72a");
                                                        }
                                                     }});
                                       case "nothing":
                                         var local_721 = x.data;
                                         return __return({tag: "success",data: {}});
                                       default:
                                         throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                           ,"9197400a83d728f8f268d101f14ab082");
                                     }
                                  }});
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                        ,"d4b370854f718e2abd9dba9dd71706db");
                  }
               }});
};
var tryQuery = function (local_724) {
   return function (x725) {
          switch (x725.tag)
          {
            case "error":
              var local_726 = x725.data;
              return __return({content: {__data: function (x727) {
                                           return x727;
                                        }(_2b__2b_({a: rts.bytesFromAscii("Database error: ")
                                                   ,b: local_726}))
                                        ,mimeType: rts.bytesFromAscii("text/plain")}
                              ,status: {message: rts.bytesFromAscii("Internal Server Error")
                                       ,code: 500.0}});
            case "success":
              return local_724(x725.data);
            default:
              throw rts.exceptions.UnhandledCase("DEF_6ab93b1ac8a248c0a946996efdd08c5f"
                                                ,"601e113ccba88e0bf9ac1fe558419963");
          }
       };
};
var pestovalVerifyUpdate = function (local_729) {
   var x = function (x730) {
              return x730;
           }(lookup1({assocs: fromArray(local_729.body)
                     ,key: rts.bytesFromAscii("when")}));
   switch (x.tag)
   {
     case "just":
       var when1 = x.data;
       var x = function (x731) {
                  return x731;
               }(lookup1({assocs: fromArray(local_729.body)
                         ,key: rts.bytesFromAscii("location")}));
       switch (x.tag)
       {
         case "just":
           var where = x.data;
           return _3b_({infixl: query({database: local_729.database
                                      ,object: concat1(_3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id\nFROM pestoval_session\nWHERE pestoval_session.id <> ")
                                                                ,infixr: function (local_732) {
                                                                   return _3a__3a_({infixl: showNum(local_729.session)
                                                                                   ,infixr: function (local_733) {
                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.location_id = ")
                                                                                                      ,infixr: function (local_734) {
                                                                                                         return _3a__3a_({infixl: where
                                                                                                                         ,infixr: function (local_735) {
                                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.when_id = ")
                                                                                                                                            ,infixr: function (local_736) {
                                                                                                                                               return _3a__3a_({infixl: when1
                                                                                                                                                               ,infixr: function (local_737) {
                                                                                                                                                                  return {tag: "empty"
                                                                                                                                                                         ,data: {}};
                                                                                                                                                               }});
                                                                                                                                            }});
                                                                                                                         }});
                                                                                                      }});
                                                                                   }});
                                                                }}))})
                       ,infixr: function (x738) {
                          switch (x738.tag)
                          {
                            case "error":
                              var local_739 = x738.data;
                              return ignoreError(local_739);
                            case "success":
                              var local_740 = x738.data;
                              return __return(function () {
                                     var x = function (x741) {
                                                return x741;
                                             }(_3d__3d_({infixl: length1(local_740.__data)
                                                        ,infixr: 0.0}));
                                     switch (x.tag)
                                     {
                                       case "false":
                                         var local_742 = x.data;
                                         return {tag: "conflicts"
                                                ,data: toArray(map({list: fromArray(local_740.__data)
                                                                   ,mapping: function (local_743) {
                                                                      return parseInt(item({index: 0.0
                                                                                           ,object: local_743}));
                                                                   }}))};
                                       case "true":
                                         var local_744 = x.data;
                                         return {tag: "good",data: {}};
                                       default:
                                         throw rts.exceptions.UnhandledCase("DEF_bcca348b043a42949aaf89fb2eccfc72"
                                                                           ,"339aed393d698704b76bee68659a072f");
                                     }
                                  }());
                            default:
                              throw rts.exceptions.UnhandledCase("DEF_bcca348b043a42949aaf89fb2eccfc72"
                                                                ,"e1483df25f0a7b6a9f320e64ab515a71");
                          }
                       }});
         case "nothing":
           var local_745 = x.data;
           return ignoreError({});
         default:
           throw rts.exceptions.UnhandledCase("DEF_bcca348b043a42949aaf89fb2eccfc72"
                                             ,"7aa622f233fd592d4ac16d681620a799");
       }
     case "nothing":
       var local_746 = x.data;
       return __return({tag: "good",data: {}});
     default:
       throw rts.exceptions.UnhandledCase("DEF_bcca348b043a42949aaf89fb2eccfc72"
                                         ,"814512c476a997315cd8f86c31cf843c");
   }
};
var pestovalUpdate = function (local_661) {
   var x = function (x662) { return x662;}(local_661.request.body);
   switch (x.tag)
   {
     case "just":
       var local_663 = x.data;
       var body2 = toArray(parsePostBody(local_663));
       var local_728 = function (local_664) {
          return _3b_({infixl: updateSessionRow({body: body2
                                                ,database: local_661.database
                                                ,session: local_661.session})
                      ,infixr: tryQuery(function (local_722) {
                         return __return({content: {__data: function (x723) {
                                                      return x723;
                                                   }(rts.bytesFromAscii("Update successful, refresh"))
                                                   ,mimeType: rts.bytesFromAscii("text/plain")}
                                         ,status: {message: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: ")
                                                                     ,b: local_664})
                                                  ,code: 303.0}});
                      })});
       };
       return _3b_({infixl: pestovalVerifyUpdate({body: body2
                                                 ,database: local_661.database
                                                 ,session: local_661.session})
                   ,infixr: function (x747) {
                      switch (x747.tag)
                      {
                        case "conflicts":
                          var conflicts = x747.data;
                          return _3b_({infixl: query({database: local_661.database
                                                     ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET location_id = NULL\nWHERE pestoval_session.id IN (")
                                                                                    ,b: join({texts: map({list: fromArray(conflicts)
                                                                                                         ,mapping: showNum})
                                                                                             ,seperator: rts.bytesFromAscii(", ")})})
                                                                       ,b: rts.bytesFromAscii(")")})})
                                      ,infixr: tryQuery(function (local_748) {
                                         return local_728(_2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("/eng/manage/")
                                                                                ,b: local_661.password})
                                                                   ,b: rts.bytesFromAscii("/")}));
                                      })});
                        case "good":
                          var local_749 = x747.data;
                          return local_728(local_661.request.path);
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                            ,"7605757a63256d30d9c89a9804c8dd00");
                      }
                   }});
     case "nothing":
       var local_750 = x.data;
       return __return({content: {__data: function (x751) {
                                    return x751;
                                 }(rts.bytesFromAscii("POST with no body"))
                                 ,mimeType: rts.bytesFromAscii("text/plain")}
                       ,status: {message: rts.bytesFromAscii("Forbidden"),code: 403.0}});
     default:
       throw rts.exceptions.UnhandledCase("DEF_7fbd3bd4533a428eb08b679d36605be0"
                                         ,"7155adc9c6327a297327ec4e1f1a8007");
   }
};
var pestovalEditPage = function (local_539) {
   var local_540 = toArray(split({text: local_539.request.path
                                 ,seperator: rts.bytesFromAscii("/")}));
   var id2 = parseInt(item({index: 3.0,object: local_540}));
   var password3 = item({index: 4.0,object: local_540});
   return _3b_({infixl: getSession({database: local_539.database,id: id2})
               ,infixr: function (local_557) {
                  var x = function (x558) { return x558;}(local_557);
                  switch (x.tag)
                  {
                    case "just":
                      var session3 = x.data;
                      return _3b_({infixl: pestovalAuth({database: local_539.database
                                                        ,password: password3
                                                        ,teachers: session3.teachers})
                                  ,infixr: function (x559) {
                                     switch (x559.tag)
                                     {
                                       case "unauthorized":
                                         var local_560 = x559.data;
                                         return __return(pestovalUnauthorized);
                                       default:
                                         var local_561 = x559;
                                         var x = function (x562) {
                                                    return x562;
                                                 }(_3d__3d_({infixl: local_539.request.method
                                                            ,infixr: rts.bytesFromAscii("POST")}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_563 = x.data;
                                             var local_568 =
                                             _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                      ,infixr: singleton(leaf(rts.bytesFromAscii("Delete Session")))})
                                                      ,infixr: function (local_564) {
                                                         return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"/eng/delete/")
                                                                                                                                                  ,b: showNum(id2)})
                                                                                                                                     ,b: rts.bytesFromAscii("/")})
                                                                                                                        ,b: password3})
                                                                                                           ,b: rts.bytesFromAscii("\">")})
                                                                                         ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<textarea rows=1 cols=80 id=\"cmd\" name=\"cmd\">")
                                                                                                          ,infixr: singleton(leaf(rts.bytesFromAscii("Really delete?!?")))})
                                                                                                  ,_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                          ,infixr: singleton(leaf(rts.bytesFromAscii("Delete!!!")))})]})
                                                                         ,infixr: function (local_567) {
                                                                            return {tag: "empty"
                                                                                   ,data: {}};
                                                                         }});
                                                      }});
                                             return _3b_({infixl: function () {
                                                            var x = local_561;
                                                            switch (x.tag)
                                                            {
                                                              case "admin":
                                                                var local_569 = x.data;
                                                                return _3b_({infixl: sequence(_3a__3a_({infixl: teachersEditForm({database: local_539.database
                                                                                                                                 ,teachers: session3.teachers})
                                                                                                       ,infixr: function (local_596) {
                                                                                                          return _3a__3a_({infixl: levelEditForm({database: local_539.database
                                                                                                                                                 ,level: session3.level})
                                                                                                                          ,infixr: function (local_610) {
                                                                                                                             return _3a__3a_({infixl: locationEditForm({where: session3.place
                                                                                                                                                                       ,database: local_539.database})
                                                                                                                                             ,infixr: function (local_619) {
                                                                                                                                                return _3a__3a_({infixl: timeSlotEditForm({database: local_539.database
                                                                                                                                                                                          ,when: session3.when})
                                                                                                                                                                ,infixr: function (local_632) {
                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                          ,data: {}};
                                                                                                                                                                }});
                                                                                                                                             }});
                                                                                                                          }});
                                                                                                       }}))
                                                                            ,infixr: function (local_633) {
                                                                               return __return(concat(local_633));
                                                                            }});
                                                              case "teacher":
                                                                var local_634 = x.data;
                                                                return __return(pestovalSessionSummary({place: session3.place
                                                                                                       ,teachers: session3.teachers
                                                                                                       ,when: session3.when
                                                                                                       ,level: session3.level}));
                                                              default:
                                                                throw rts.exceptions.UnhandledCase("DEF_3c898249b1784b72beed36db3fa87518"
                                                                                                  ,"51101d04f9fe7ce01c9a8a10e2124c7f");
                                                            }
                                                         }()
                                                         ,infixr: function (local_643) {
                                                            return __return(pestovalPage({title: rts.bytesFromAscii("Edit Session")
                                                                                         ,body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                 ,infixr: singleton(leaf(rts.bytesFromAscii("Edit Session")))})
                                                                                                                 ,infixr: function (local_644) {
                                                                                                                    return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"")
                                                                                                                                                                                   ,b: local_539.request.path})
                                                                                                                                                                      ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                    ,infixr: toArray(_2b__2b_2({infixl: local_643
                                                                                                                                                                               ,infixr: function (local_645) {
                                                                                                                                                                                  return _2b__2b_2({infixl: concat(map({list: _2b__2b_2({infixl: pestovalEditField({name: rts.bytesFromAscii("Name")
                                                                                                                                                                                                                                                                   ,value: session3.name
                                                                                                                                                                                                                                                                   ,key: rts.bytesFromAscii("name")})
                                                                                                                                                                                                                                        ,infixr: function (local_649) {
                                                                                                                                                                                                                                           return pestovalEditFields(session3);
                                                                                                                                                                                                                                        }})
                                                                                                                                                                                                                       ,mapping: formTextArea}))
                                                                                                                                                                                                   ,infixr: function (local_655) {
                                                                                                                                                                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                                                                                                                                                                      ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("Update")))}))})
                                                                                                                                                                                                                      ,infixr: function (local_656) {
                                                                                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                                                                                ,data: {}};
                                                                                                                                                                                                                      }});
                                                                                                                                                                                                   }});
                                                                                                                                                                               }}))})
                                                                                                                                    ,infixr: function (local_657) {
                                                                                                                                       var x =
                                                                                                                                       local_561;
                                                                                                                                       switch (x.tag)
                                                                                                                                       {
                                                                                                                                         case "admin":
                                                                                                                                           var local_658 =
                                                                                                                                           x.data;
                                                                                                                                           return local_568;
                                                                                                                                         case "teacher":
                                                                                                                                           var local_659 =
                                                                                                                                           x.data;
                                                                                                                                           return {tag: "empty"
                                                                                                                                                  ,data: {}};
                                                                                                                                         default:
                                                                                                                                           throw rts.exceptions.UnhandledCase("DEF_3c898249b1784b72beed36db3fa87518"
                                                                                                                                                                             ,"e8cba634c254c8821745f7316805d098");
                                                                                                                                       }
                                                                                                                                    }});
                                                                                                                 }}))}));
                                                         }});
                                           case "true":
                                             var local_660 = x.data;
                                             return pestovalUpdate({request: local_539.request
                                                                   ,database: local_539.database
                                                                   ,password: password3
                                                                   ,session: session3.id});
                                           default:
                                             throw rts.exceptions.UnhandledCase("DEF_3c898249b1784b72beed36db3fa87518"
                                                                               ,"649431586e8fa4f8144892306470de2e");
                                         }
                                     }
                                  }});
                    case "nothing":
                      var local_752 = x.data;
                      return __return(httpNotFound404(local_539.request.path));
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_3c898249b1784b72beed36db3fa87518"
                                                        ,"08ce1c8a7d9560da25879978070222da");
                  }
               }});
};
var overlaysCss = _22f2_({infixl: rts.bytesFromAscii("<style type=\"text/css\">")
                         ,infixr: singleton(leaf(rts.bytesFromAscii("/* Thanks https://eichefam.net/2011/12/21/popup-windows-without-javascript/ */\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  transition: opacity 200ms;\n  visibility: hidden;\n  opacity: 0;\n}\n\ninput:checked + label > div.overlay {\n  visibility: visible;\n  opacity: 1;\n}\n\n.popup {\n  margin: 50px auto;\n  padding: 20px;\n  background: #fff;\n  border: 1px solid #666;\n  width: 70%;\n  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);\n  position: relative;\n}")))});
var pestovalTeacherPage = function (local_754) {
   var teacher2 = parseInt(item({index: 0.0,object: local_754.path}));
   return _3b_({infixl: query({database: local_754.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT ")
                                                                          ,b: queryFieldLang(local_754.language)({table: rts.bytesFromAscii("pestoval_teacher")
                                                                                                                 ,field: rts.bytesFromAscii("name")
                                                                                                                 ,as: {tag: "nothing"
                                                                                                                      ,data: {}}})})
                                                             ,b: rts.bytesFromAscii(", pestoval_teacher.password\nFROM pestoval_teacher\nWHERE pestoval_teacher.id =")})
                                                ,b: showNum(teacher2)})})
               ,infixr: function (x755) {
                  switch (x755.tag)
                  {
                    case "error":
                      var local_756 = x755.data;
                      return ignoreError(local_756);
                    case "success":
                      var local_757 = x755.data;
                      var password4 = function () {
                                         var x = function (x759) {
                                                    return x759;
                                                 }(_26__26_({infixl: _3e_({infixl: length1(local_754.path)
                                                                          ,infixr: 1.0})
                                                            ,infixr: function (local_758) {
                                                               return _2260_({infixl: item({index: 1.0
                                                                                           ,object: local_754.path})
                                                                             ,infixr: rts.bytesFromAscii("")});
                                                            }}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_760 = x.data;
                                             return {tag: "nothing",data: {}};
                                           case "true":
                                             var local_761 = x.data;
                                             return {tag: "just"
                                                    ,data: item({index: 1.0
                                                                ,object: local_754.path})};
                                           default:
                                             throw rts.exceptions.UnhandledCase("DEF_50938aa1a135407c826989b9e1339047"
                                                                               ,"91cc4c8b5af33ae92f94375e3a666b89");
                                         }
                                      }();
                      var title = item({index: 0.0
                                       ,object: item({index: 0.0
                                                     ,object: local_757.__data})});
                      return _3b_({infixl: pestovalQuerySessions({database: local_754.database
                                                                 ,teacher: {tag: "just"
                                                                           ,data: teacher2}
                                                                 ,language: local_754.language
                                                                 ,filter: {tag: "nothing"
                                                                          ,data: {}}})
                                  ,infixr: function (local_762) {
                                     return __return(pestovalPage({title: title
                                                                  ,body: [overlaysCss
                                                                         ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                            ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                                      ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                                                ,infixr: singleton(leaf(title))}))}))})
                                                                                                            ,infixr: function (local_764) {
                                                                                                               return map({list: fromArray(local_762)
                                                                                                                          ,mapping: function (session5) {
                                                                                                                             var local_780 =
                                                                                                                             join({texts: _3a__3a_({infixl: session5.name
                                                                                                                                                   ,infixr: function (local_765) {
                                                                                                                                                      var x =
                                                                                                                                                      function (x767) {
                                                                                                                                                         return x767;
                                                                                                                                                      }(filter1({list: fromArray(session5.teachers)
                                                                                                                                                                ,keep: function (local_766) {
                                                                                                                                                                   return _2260_({infixl: local_766.id
                                                                                                                                                                                 ,infixr: teacher2});
                                                                                                                                                                }}));
                                                                                                                                                      switch (x.tag)
                                                                                                                                                      {
                                                                                                                                                        case "nonEmpty":
                                                                                                                                                          var local_768 =
                                                                                                                                                          x.data;
                                                                                                                                                          return _3a__3a_({infixl: concat1(_3a__3a_({infixl: function () {
                                                                                                                                                                                                       var x =
                                                                                                                                                                                                       local_754.language;
                                                                                                                                                                                                       switch (x.tag)
                                                                                                                                                                                                       {
                                                                                                                                                                                                         case "english":
                                                                                                                                                                                                           var local_769 =
                                                                                                                                                                                                           x.data;
                                                                                                                                                                                                           return rts.bytesFromAscii("(With ");
                                                                                                                                                                                                         case "hebrew":
                                                                                                                                                                                                           var local_770 =
                                                                                                                                                                                                           x.data;
                                                                                                                                                                                                           return rts.bytes([40
                                                                                                                                                                                                                            ,215
                                                                                                                                                                                                                            ,162
                                                                                                                                                                                                                            ,215
                                                                                                                                                                                                                            ,157
                                                                                                                                                                                                                            ,32]);
                                                                                                                                                                                                         default:
                                                                                                                                                                                                           throw rts.exceptions.UnhandledCase("DEF_50938aa1a135407c826989b9e1339047"
                                                                                                                                                                                                                                             ,"a16f24536631cbaf81384fa985a3da71");
                                                                                                                                                                                                       }
                                                                                                                                                                                                    }()
                                                                                                                                                                                                    ,infixr: function (local_771) {
                                                                                                                                                                                                       return _3a__3a_({infixl: local_768.head.name
                                                                                                                                                                                                                       ,infixr: function (local_772) {
                                                                                                                                                                                                                          return _3a__3a_({infixl: join({texts: map({list: local_768.tail({})
                                                                                                                                                                                                                                                                    ,mapping: function (local_773) {
                                                                                                                                                                                                                                                                       return _2b__2b_({a: function () {
                                                                                                                                                                                                                                                                                          var x =
                                                                                                                                                                                                                                                                                          local_754.language;
                                                                                                                                                                                                                                                                                          switch (x.tag)
                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                            case "english":
                                                                                                                                                                                                                                                                                              var local_774 =
                                                                                                                                                                                                                                                                                              x.data;
                                                                                                                                                                                                                                                                                              return rts.bytesFromAscii(" & ");
                                                                                                                                                                                                                                                                                            case "hebrew":
                                                                                                                                                                                                                                                                                              var local_775 =
                                                                                                                                                                                                                                                                                              x.data;
                                                                                                                                                                                                                                                                                              return rts.bytes([32
                                                                                                                                                                                                                                                                                                               ,215
                                                                                                                                                                                                                                                                                                               ,149]);
                                                                                                                                                                                                                                                                                            default:
                                                                                                                                                                                                                                                                                              throw rts.exceptions.UnhandledCase("DEF_50938aa1a135407c826989b9e1339047"
                                                                                                                                                                                                                                                                                                                                ,"b71998601b16ac26e10ab6485ff6b405");
                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                       }()
                                                                                                                                                                                                                                                                                       ,b: local_773.name});
                                                                                                                                                                                                                                                                    }})
                                                                                                                                                                                                                                                        ,seperator: rts.bytesFromAscii("")})
                                                                                                                                                                                                                                          ,infixr: function (local_776) {
                                                                                                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(")")
                                                                                                                                                                                                                                                             ,infixr: function (local_777) {
                                                                                                                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                                                                                                                       ,data: {}};
                                                                                                                                                                                                                                                             }});
                                                                                                                                                                                                                                          }});
                                                                                                                                                                                                                       }});
                                                                                                                                                                                                    }}))
                                                                                                                                                                          ,infixr: function (local_778) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                        case "empty":
                                                                                                                                                          var local_779 =
                                                                                                                                                          x.data;
                                                                                                                                                          return {tag: "empty"
                                                                                                                                                                 ,data: {}};
                                                                                                                                                        default:
                                                                                                                                                          throw rts.exceptions.UnhandledCase("DEF_50938aa1a135407c826989b9e1339047"
                                                                                                                                                                                            ,"0407d054d66f60bcf424f79da4b936ac");
                                                                                                                                                      }
                                                                                                                                                   }})
                                                                                                                                  ,seperator: rts.bytesFromAscii(" ")});
                                                                                                                             return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                           ,infixr: singleton(pestovalSessionCell({password: password4
                                                                                                                                                                                  ,content: _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p style=\"font-weight=bold\">")
                                                                                                                                                                                                                     ,infixr: singleton(leaf(join({texts: _3a__3a_({infixl: formatTimeSlot({timeSlot: session5.when
                                                                                                                                                                                                                                                                                           ,language: local_754.language})
                                                                                                                                                                                                                                                                   ,infixr: function (local_781) {
                                                                                                                                                                                                                                                                      return _3a__3a_({infixl: session5.place.name
                                                                                                                                                                                                                                                                                      ,infixr: function (local_782) {
                                                                                                                                                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                                                                                                                                                ,data: {}};
                                                                                                                                                                                                                                                                                      }});
                                                                                                                                                                                                                                                                   }})
                                                                                                                                                                                                                                                  ,seperator: rts.bytesFromAscii(" / ")})))})
                                                                                                                                                                                                     ,infixr: function (local_783) {
                                                                                                                                                                                                        return _3a__3a_({infixl: htmlParagraph(local_780)
                                                                                                                                                                                                                        ,infixr: function (local_784) {
                                                                                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                                                                                  ,data: {}};
                                                                                                                                                                                                                        }});
                                                                                                                                                                                                     }})
                                                                                                                                                                                  ,style: rts.bytesFromAscii("")
                                                                                                                                                                                  ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                  ,language: local_754.language
                                                                                                                                                                                  ,session: session5}))});
                                                                                                                          }});
                                                                                                            }}))
                                                                                    ,language: local_754.language})]}));
                                  }});
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_50938aa1a135407c826989b9e1339047"
                                                        ,"fc81fe2932d91417e79f74d97a2f2ad5");
                  }
               }});
};
var maximum2 = function (local_811) {
   var x = function (x812) {
              return x812;
           }(_2265_({infixl: local_811.__x,infixr: local_811.y}));
   switch (x.tag)
   {
     case "false":
       var local_813 = x.data;
       return local_811.y;
     case "true":
       var local_814 = x.data;
       return local_811.__x;
     default:
       throw rts.exceptions.UnhandledCase("DEF_19e923b820b04266a9811a6b34fe7b37"
                                         ,"a5d0a997c71340b2b9d148187aeb6d00");
   }
};
var nonEmptyFold = function (local_815) {
   var x = function (x816) { return x816;}(local_815.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_817 = x.data;
       return {tag: "just"
              ,data: fold({list: local_817.tail({})
                          ,initial: local_817.head
                          ,binop: local_815.binop})};
     case "empty":
       var local_818 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_05d859467ac547cc890fea33e3ff4642"
                                         ,"eb3e9576545c4cc390019d2c5a8d9ce4");
   }
};
var maximum1 = function (list9) {
   return nonEmptyFold({list: list9
                       ,binop: function (local_810) {
                          return maximum2({y: local_810.item,__x: local_810.acc});
                       }});
};
var gcd = function (local_822) {
   var x = function (x823) { return x823;}(_3d__3d_({infixl: local_822.__x,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_824 = x.data;
       return gcd({y: local_822.__x
                  ,__x: _25_({infixl: local_822.y,infixr: local_822.__x})});
     case "true":
       var local_825 = x.data;
       return local_822.y;
     default:
       throw rts.exceptions.UnhandledCase("DEF_493da5cfecea49b89fd9a10c42df9e12"
                                         ,"426c0882a83d8df5efe64ca0e57098af");
   }
};
var lcm = function (local_821) {
   return _2f_({infixl: _2a_({infixl: local_821.__x,infixr: local_821.y})
               ,infixr: gcd({y: local_821.y,__x: local_821.__x})});
};
var timeSlotRow = function (local_828) {
   return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                 ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td colspan=")
                                                                          ,infixr: function (local_829) {
                                                                             return _3a__3a_({infixl: showNum(local_828.numColumns)
                                                                                             ,infixr: function (local_830) {
                                                                                                return _3a__3a_({infixl: rts.bytesFromAscii(" style=\"font-size:150%; border-top:3pt solid black;\">")
                                                                                                                ,infixr: function (local_831) {
                                                                                                                   return {tag: "empty"
                                                                                                                          ,data: {}};
                                                                                                                }});
                                                                                             }});
                                                                          }})
                                                         ,seperator: rts.bytesFromAscii("")})
                                           ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_828.timeSlot
                                                                                  ,language: local_828.language})))}))});
};
var formatTeachers = function (local_835) {
   var x = function (x836) {
              return x836;
           }(_3d__3d_({infixl: length1(local_835.teachers),infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_837 = x.data;
       return _3a__3a_({infixl: htmlParagraph(_2b__2b_({a: join({texts: map({list: fromArray(local_835.teachers)
                                                                            ,mapping: function (local_838) {
                                                                               return local_838.name;
                                                                            }})
                                                                ,seperator: function () {
                                                                   var x =
                                                                   local_835.language;
                                                                   switch (x.tag)
                                                                   {
                                                                     case "english":
                                                                       var local_839 =
                                                                       x.data;
                                                                       return rts.bytesFromAscii(" & ");
                                                                     case "hebrew":
                                                                       var local_840 =
                                                                       x.data;
                                                                       return rts.bytes([32
                                                                                        ,215
                                                                                        ,149]);
                                                                     default:
                                                                       throw rts.exceptions.UnhandledCase("DEF_b343578f80c84dbf8532d81d3be7c414"
                                                                                                         ,"5501c290d329fa41da6be2be94a5f4d0");
                                                                   }
                                                                }()})
                                                       ,b: rts.bytesFromAscii(":")}))
                       ,infixr: function (local_841) {
                          return {tag: "empty",data: {}};
                       }});
     case "true":
       var local_842 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_b343578f80c84dbf8532d81d3be7c414"
                                         ,"44f287325a63d1ff6d71c03d058570a3");
   }
};
var detailedSessionInfo = function (local_834) {
   return toArray(_2b__2b_2({infixl: formatTeachers({teachers: local_834.session.teachers
                                                    ,language: local_834.language})
                            ,infixr: function (local_843) {
                               return _3a__3a_({infixl: htmlParagraph(local_834.session.name)
                                               ,infixr: function (local_844) {
                                                  return _3a__3a_({infixl: htmlParagraph(local_834.session.place.name)
                                                                  ,infixr: function (local_845) {
                                                                     return {tag: "empty"
                                                                            ,data: {}};
                                                                  }});
                                               }});
                            }}));
};
var pestovalLevelsPage = function (local_787) {
   var minimum = parseInt(item({index: 0.0,object: local_787.path}));
   var maximum = function () {
                    var x = function (x788) {
                               return x788;
                            }(_3e_({infixl: length1(local_787.path),infixr: 1.0}));
                    switch (x.tag)
                    {
                      case "false":
                        var local_789 = x.data;
                        return minimum;
                      case "true":
                        var local_790 = x.data;
                        return parseInt(item({index: 1.0,object: local_787.path}));
                      default:
                        throw rts.exceptions.UnhandledCase("DEF_a358e35c87a74404b2c606eb39bddad1"
                                                          ,"4c173067c4670de5fcb231cf53d90418");
                    }
                 }();
   var title1 = join({texts: function () {
                        var x = function (x791) {
                                   return x791;
                                }(_3d__3d_({infixl: minimum,infixr: maximum}));
                        switch (x.tag)
                        {
                          case "false":
                            var local_792 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_787.language;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_793 = x.data;
                                                   return rts.bytesFromAscii("Levels");
                                                 case "hebrew":
                                                   var local_794 = x.data;
                                                   return rts.bytes([215
                                                                    ,168
                                                                    ,215
                                                                    ,158
                                                                    ,215
                                                                    ,149
                                                                    ,215
                                                                    ,170]);
                                                 default:
                                                   throw rts.exceptions.UnhandledCase("DEF_a358e35c87a74404b2c606eb39bddad1"
                                                                                     ,"08963304800bfcf7f4d88ceecad9ee10");
                                               }
                                            }()
                                            ,infixr: function (local_795) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_796) {
                                                                  return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                                  ,infixr: function (local_797) {
                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                     ,infixr: function (local_798) {
                                                                                                        return {tag: "empty"
                                                                                                               ,data: {}};
                                                                                                     }});
                                                                                  }});
                                                               }});
                                            }});
                          case "true":
                            var local_799 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_787.language;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_800 = x.data;
                                                   return rts.bytesFromAscii("Level");
                                                 case "hebrew":
                                                   var local_801 = x.data;
                                                   return rts.bytes([215
                                                                    ,168
                                                                    ,215
                                                                    ,158
                                                                    ,215
                                                                    ,148]);
                                                 default:
                                                   throw rts.exceptions.UnhandledCase("DEF_a358e35c87a74404b2c606eb39bddad1"
                                                                                     ,"1d45559be5d78c9d31f75b33fb547a08");
                                               }
                                            }()
                                            ,infixr: function (local_802) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_803) {
                                                                  return {tag: "empty"
                                                                         ,data: {}};
                                                               }});
                                            }});
                          default:
                            throw rts.exceptions.UnhandledCase("DEF_a358e35c87a74404b2c606eb39bddad1"
                                                              ,"058f4ae99fed9bb25e90ccf28bf6fa21");
                        }
                     }()
                     ,seperator: rts.bytesFromAscii(" ")});
   return _3b_({infixl: pestovalQuerySessions({database: local_787.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: local_787.language
                                              ,filter: {tag: "just"
                                                       ,data: concat1(_3a__3a_({infixl: showNum(minimum)
                                                                               ,infixr: function (local_804) {
                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(" <= pestoval_level.as_number AND pestoval_level.as_number <= ")
                                                                                                  ,infixr: function (local_805) {
                                                                                                     return _3a__3a_({infixl: showNum(maximum)
                                                                                                                     ,infixr: function (local_806) {
                                                                                                                        return {tag: "empty"
                                                                                                                               ,data: {}};
                                                                                                                     }});
                                                                                                  }});
                                                                               }}))}})
               ,infixr: function (local_807) {
                  var local_809 = toArray(group({list: fromArray(local_807)
                                                ,by: function (local_808) {
                                                   return _3d__3d_({infixl: local_808.infixl.when.id
                                                                   ,infixr: local_808.infixr.when.id});
                                                }}));
                  var local_819 = maybe({object: maximum1(map({list: fromArray(local_809)
                                                              ,mapping: length1}))
                                        ,or: 0.0});
                  var numColumns = fold({list: _2e__2e_({start: 1.0
                                                        ,stop: _2b_({infixl: local_819
                                                                    ,infixr: 1.0})})
                                        ,initial: 1.0
                                        ,binop: function (local_820) {
                                           return lcm({y: local_820.item
                                                      ,__x: local_820.acc});
                                        }});
                  return __return(pestovalPage({title: title1
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                         ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                             ,infixr: singleton(leaf(title1))}))}))})
                                                                                         ,infixr: function (local_827) {
                                                                                            return concat(map({list: fromArray(local_809)
                                                                                                              ,mapping: function (group1) {
                                                                                                                 return _3a__3a_({infixl: timeSlotRow({numColumns: numColumns
                                                                                                                                                      ,timeSlot: item({index: 0.0
                                                                                                                                                                      ,object: group1}).when
                                                                                                                                                      ,language: local_787.language})
                                                                                                                                 ,infixr: function (local_832) {
                                                                                                                                    var attributes =
                                                                                                                                    function (local_833) {
                                                                                                                                       return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("colspan=")
                                                                                                                                                                                              ,b: showNum(_2f_({infixl: numColumns
                                                                                                                                                                                                               ,infixr: local_833}))})
                                                                                                                                                                                 ,b: rts.bytesFromAscii(" width=\"")})
                                                                                                                                                                    ,b: showNum(_2f__2f_({infixl: 100.0
                                                                                                                                                                                         ,infixr: local_833}))})
                                                                                                                                                       ,b: rts.bytesFromAscii("%\"")});
                                                                                                                                    }(length1(group1));
                                                                                                                                    return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                                    ,infixr: toArray(map({list: fromArray(group1)
                                                                                                                                                                                         ,mapping: function (session6) {
                                                                                                                                                                                            return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                                                                  ,data: {}}
                                                                                                                                                                                                                       ,content: _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<div style=\"font-size:110%\">")
                                                                                                                                                                                                                                                          ,infixr: detailedSessionInfo({language: local_787.language
                                                                                                                                                                                                                                                                                       ,session: session6})})
                                                                                                                                                                                                                                          ,infixr: function (local_846) {
                                                                                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                                                                                          }})
                                                                                                                                                                                                                       ,style: rts.bytesFromAscii("")
                                                                                                                                                                                                                       ,attributes: attributes
                                                                                                                                                                                                                       ,language: local_787.language
                                                                                                                                                                                                                       ,session: session6});
                                                                                                                                                                                         }}))})
                                                                                                                                                    ,infixr: function (local_847) {
                                                                                                                                                       return {tag: "empty"
                                                                                                                                                              ,data: {}};
                                                                                                                                                    }});
                                                                                                                                 }});
                                                                                                              }}));
                                                                                         }}))
                                                                 ,language: local_787.language})]}));
               }});
};
var dedup = function (local_854) {
   return toArray(map({list: group({list: local_854,by: _3d__3d_})
                      ,mapping: function (local_855) {
                         return item({index: 0.0,object: local_855});
                      }}));
};
var dayNamesFull =
toArray(split({text: rts.bytesFromAscii("Monday Tuesday Wednesday Thursday Friday Saturday Sunday")
              ,seperator: rts.bytesFromAscii(" ")}));
var placesRow = function (local_862) {
   return _22f2_({infixl: rts.bytesFromAscii("<tr style=\"background-color:#ddd; border-top: 3pt solid black\">")
                 ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<th style=\"font-size:150%\">")
                                                           ,infixr: singleton(leaf(local_862.day))})
                                           ,infixr: function (local_863) {
                                              return map({list: fromArray(local_862.places)
                                                         ,mapping: function (local_864) {
                                                            return _22f2_({infixl: rts.bytesFromAscii("<th>")
                                                                          ,infixr: singleton(leaf(local_864.name))});
                                                         }});
                                           }}))});
};
var toArray1 = function (local_877) {
   return runMutArray(_3b_({infixl: newMutArray1(replicate({count: local_877.size
                                                           ,item: {tag: "nothing"
                                                                  ,data: {}}}))
                           ,infixr: function (__array4) {
                              return _3b_({infixl: sequence__(map({list: local_877.list
                                                                  ,mapping: function (local_878) {
                                                                     return writeMutArray({index: local_877.index(local_878)
                                                                                          ,object: __array4
                                                                                          ,value: {tag: "just"
                                                                                                  ,data: local_878}});
                                                                  }}))
                                          ,infixr: function (local_879) {
                                             return __return(__array4);
                                          }});
                           }}));
};
var pestovalSessionsTable = function (local_850) {
   return _3b_({infixl: pestovalQuerySessions({database: local_850.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: local_850.language
                                              ,filter: {tag: "nothing",data: {}}})
               ,infixr: function (local_851) {
                  var places = dedup(fromArray(sort({list: map({list: fromArray(local_851)
                                                               ,mapping: function (local_852) {
                                                                  return local_852.place;
                                                               }})
                                                    ,_3c_: function (local_853) {
                                                       return _3c_({infixl: local_853.infixl.order
                                                                   ,infixr: local_853.infixr.order});
                                                    }})));
                  var numColumns1 = length1(places);
                  return __return(pestovalPage({title: rts.bytesFromAscii("All Sessions")
                                               ,body: [overlaysCss
                                                      ,htmlTable({body: toArray(concat(map({list: group({list: fromArray(local_851)
                                                                                                        ,by: function (local_857) {
                                                                                                           return _3d__3d_({infixl: local_857.infixl.when.start.date
                                                                                                                           ,infixr: local_857.infixr.when.start.date});
                                                                                                        }})
                                                                                           ,mapping: function (local_858) {
                                                                                              return _3a__3a_({infixl: placesRow({places: places
                                                                                                                                 ,day: item({index: _2d_({infixl: function (x859) {
                                                                                                                                                            return x859;
                                                                                                                                                         }(item({index: 0.0
                                                                                                                                                                ,object: local_858}).when.start.date).weekDay
                                                                                                                                                         ,infixr: 1.0})
                                                                                                                                            ,object: function () {
                                                                                                                                               var x =
                                                                                                                                               local_850.language;
                                                                                                                                               switch (x.tag)
                                                                                                                                               {
                                                                                                                                                 case "english":
                                                                                                                                                   var local_860 =
                                                                                                                                                   x.data;
                                                                                                                                                   return dayNamesFull;
                                                                                                                                                 case "hebrew":
                                                                                                                                                   var local_861 =
                                                                                                                                                   x.data;
                                                                                                                                                   return dayNamesHebrew;
                                                                                                                                                 default:
                                                                                                                                                   throw rts.exceptions.UnhandledCase("DEF_753a440ceaa64a519d4334364c39d50b"
                                                                                                                                                                                     ,"617b9b9cd85a5c2e2919df2135ab6272");
                                                                                                                                               }
                                                                                                                                            }()})})
                                                                                                              ,infixr: function (local_865) {
                                                                                                                 return concat(map({list: group({list: fromArray(local_858)
                                                                                                                                                ,by: function (local_866) {
                                                                                                                                                   return _3d__3d_({infixl: local_866.infixl.when.id
                                                                                                                                                                   ,infixr: local_866.infixr.when.id});
                                                                                                                                                }})
                                                                                                                                   ,mapping: function (local_867) {
                                                                                                                                      var local_868 =
                                                                                                                                      item({index: 0.0
                                                                                                                                           ,object: local_867});
                                                                                                                                      var local_874 =
                                                                                                                                      function (local_869) {
                                                                                                                                         var x =
                                                                                                                                         function (x870) {
                                                                                                                                            return x870;
                                                                                                                                         }(local_869);
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "just":
                                                                                                                                             var session7 =
                                                                                                                                             x.data;
                                                                                                                                             return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                   ,data: {}}
                                                                                                                                                                        ,content: _2b__2b_2({infixl: formatTeachers({teachers: session7.teachers
                                                                                                                                                                                                                    ,language: local_850.language})
                                                                                                                                                                                            ,infixr: function (local_871) {
                                                                                                                                                                                               return _3a__3a_({infixl: htmlParagraph(session7.name)
                                                                                                                                                                                                               ,infixr: function (local_872) {
                                                                                                                                                                                                                  return {tag: "empty"
                                                                                                                                                                                                                         ,data: {}};
                                                                                                                                                                                                               }});
                                                                                                                                                                                            }})
                                                                                                                                                                        ,style: rts.bytesFromAscii("")
                                                                                                                                                                        ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                        ,language: local_850.language
                                                                                                                                                                        ,session: session7});
                                                                                                                                           case "nothing":
                                                                                                                                             var local_873 =
                                                                                                                                             x.data;
                                                                                                                                             return leaf(rts.bytesFromAscii("<td style=\"background-color:#f8f8f8\">"));
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.UnhandledCase("DEF_753a440ceaa64a519d4334364c39d50b"
                                                                                                                                                                               ,"e22df53d1ea1be33327cca9a5f4067a5");
                                                                                                                                         }
                                                                                                                                      };
                                                                                                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                                      ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<th style=\"font-size:120%; background-color:#ddd\">")
                                                                                                                                                                                                                ,infixr: singleton(leaf(_2b__2b_({a: _2b__2b_({a: showTime(local_868.when.start.time)
                                                                                                                                                                                                                                                              ,b: rts.bytesFromAscii(" - ")})
                                                                                                                                                                                                                                                 ,b: showTime(local_868.when.stop.time)})))})
                                                                                                                                                                                                ,infixr: function (local_875) {
                                                                                                                                                                                                   return map({list: fromArray(toArray1({list: fromArray(local_867)
                                                                                                                                                                                                                                        ,index: function (local_876) {
                                                                                                                                                                                                                                           return index5({__array: places
                                                                                                                                                                                                                                                         ,item: local_876.place});
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        ,size: numColumns1}))
                                                                                                                                                                                                              ,mapping: local_874});
                                                                                                                                                                                                }}))})
                                                                                                                                                      ,infixr: function (local_880) {
                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                ,data: {}};
                                                                                                                                                      }});
                                                                                                                                   }}));
                                                                                                              }});
                                                                                           }})))
                                                                 ,language: local_850.language})]}));
               }});
};
var readFile = rts.builtins.IO.file["readFile"];
var pestovalIndex = _3b_({infixl: readFile(function (x883) {
                            return x883;
                         }(rts.bytesFromAscii("index.html")))
                         ,infixr: function (local_884) {
                            return __return({content: {__data: local_884
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
                              throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
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
                               var x = function (x117) {
                                          return x117;
                                       }(_3d__3d_({infixl: local_95
                                                  ,infixr: rts.bytesFromAscii("delete")}));
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_118 = x.data;
                                   return __return(httpNotFound404(local_87.request.path));
                                 case "true":
                                   var local_128 = x.data;
                                   return pestovalDeleteSession({request: local_87.request
                                                                ,database: local_87.database});
                                 default:
                                   throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                                     ,"428436a6f656c9733e1bb6e77e9ef6f0");
                               }
                             case "true":
                               var local_228 = x.data;
                               return pestovalNewSession({request: local_87.request
                                                         ,database: local_87.database});
                             default:
                               throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                                 ,"bee63a6489f85dd8329b0439961b5e44");
                           }
                         case "true":
                           var local_243 = x.data;
                           return pestovalManage({path: path
                                                 ,database: local_87.database});
                         default:
                           throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                             ,"3042fc773313a781882df94a14ec3bb3");
                       }
                     case "true":
                       var local_538 = x.data;
                       return pestovalEditPage({request: local_87.request
                                               ,database: local_87.database});
                     default:
                       throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                         ,"3904128e0f229aab0f559b8c4efd7e8c");
                   }
                 case "true":
                   var local_753 = x.data;
                   return pestovalTeacherPage({path: path
                                              ,database: local_87.database
                                              ,language: language1});
                 default:
                   throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                     ,"1efb5179a530efb5cf0ea0f292813e32");
               }
             case "true":
               var local_786 = x.data;
               return pestovalLevelsPage({path: path
                                         ,database: local_87.database
                                         ,language: language1});
             default:
               throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                 ,"3725e3e3e238c36942a62af16a116f25");
           }
         case "true":
           var local_849 = x.data;
           return pestovalSessionsTable({database: local_87.database
                                        ,language: language1});
         default:
           throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                             ,"0e90da8443f9aff3c55edb7f8fef28fc");
       }
     case "true":
       var local_882 = x.data;
       return pestovalIndex;
     default:
       throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                         ,"56d9fbebaa75d3344238b42c2f66dbca");
   }
};
var send = rts.builtins.IO.network["socketSend"];
var truncateMutArray = rts.builtins.Mut.Array["truncate"];
var popLastMutArray = function (__array5) {
   return _3b_({infixl: length4(__array5)
               ,infixr: function (length5) {
                  var x = function (x900) {
                             return x900;
                          }(_3e_({infixl: length5,infixr: 0.0}));
                  switch (x.tag)
                  {
                    case "false":
                      var local_901 = x.data;
                      return __return({tag: "nothing",data: {}});
                    case "true":
                      var local_902 = x.data;
                      return _3b_({infixl: readMutArray({index: _2d_({infixl: length5
                                                                     ,infixr: 1.0})
                                                        ,object: __array5})
                                  ,infixr: function (result) {
                                     return _3b_({infixl: truncateMutArray({object: __array5
                                                                           ,stop: _2d_({infixl: length5
                                                                                       ,infixr: 1.0})})
                                                 ,infixr: function (local_903) {
                                                    return __return({tag: "just"
                                                                    ,data: result});
                                                 }});
                                  }});
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_e01662e48ef6e33c8390bb9b9237323b"
                                                        ,"31884079e791adac0b8961574383114f");
                  }
               }});
};
var find1 = function (local_928) {
   return first({that: function (local_929) {
                   return _3d__3d_({infixl: byteAt({index: local_929
                                                   ,object: local_928.__bytes})
                                   ,infixr: local_928.byte});
                }
                ,list: _2e__2e_({start: local_928.start
                                ,stop: length(local_928.__bytes)})});
};
var isSuffixOf = function (local_943) {
   var local_944 = length(local_943.whole);
   var local_945 = length(local_943.suffix);
   return _26__26_({infixl: _2265_({infixl: local_944,infixr: local_945})
                   ,infixr: function (local_946) {
                      return _3d__3d_({infixl: slice({object: local_943.whole
                                                     ,start: _2d_({infixl: local_944
                                                                  ,infixr: local_945})
                                                     ,stop: local_944})
                                      ,infixr: local_943.suffix});
                   }});
};
var unsuffixed = function (local_942) {
   var x = function (x947) {
              return x947;
           }(isSuffixOf({suffix: local_942.suffix,whole: local_942.whole}));
   switch (x.tag)
   {
     case "false":
       var local_948 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_949 = x.data;
       return {tag: "just"
              ,data: slice({object: local_942.whole
                           ,start: 0.0
                           ,stop: _2d_({infixl: length(local_942.whole)
                                       ,infixr: length(local_942.suffix)})})};
     default:
       throw rts.exceptions.UnhandledCase("DEF_6c2d206c45c348b3b8e2bbfdae7bde35"
                                         ,"7d90a0e076a149c4443b780b21470ef3");
   }
};
var removeSuffix = function (local_941) {
   var x = function (x950) {
              return x950;
           }(unsuffixed({suffix: local_941.suffix,whole: local_941.whole}));
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_951 = x.data;
       return local_941.whole;
     default:
       throw rts.exceptions.UnhandledCase("DEF_8c9d00ae73ab41ca903aa34ee4c6601a"
                                         ,"97a63e2f16bd481c6e64fd0c8a6d92fa");
   }
};
var packetsEndWith = function (local_956) {
   var x = function (x957) {
              return x957;
           }(_3d__3d_({infixl: local_956.stop,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_958 = x.data;
       return _3b_({infixl: readMutArray({index: _2d_({infixl: local_956.stop
                                                      ,infixr: 1.0})
                                         ,object: local_956.packets})
                   ,infixr: function (local_959) {
                      var x = function (x960) {
                                 return x960;
                              }(isSuffixOf({suffix: local_956.suffix,whole: local_959}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_961 = x.data;
                          var x = function (x962) {
                                     return x962;
                                  }(unsuffixed({suffix: local_959
                                               ,whole: local_956.suffix}));
                          switch (x.tag)
                          {
                            case "just":
                              var remain = x.data;
                              return packetsEndWith({suffix: remain
                                                    ,stop: _2d_({infixl: local_956.stop
                                                                ,infixr: 1.0})
                                                    ,packets: local_956.packets});
                            case "nothing":
                              var local_963 = x.data;
                              return __return({tag: "false",data: {}});
                            default:
                              throw rts.exceptions.UnhandledCase("DEF_a2f069d7413941fdafe42795f6970175"
                                                                ,"0d0804c08ad23d9eed424fc83122d6dc");
                          }
                        case "true":
                          var local_964 = x.data;
                          return __return({tag: "true",data: {}});
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_a2f069d7413941fdafe42795f6970175"
                                                            ,"49052b2836be0b25cb20bc95d00972ca");
                      }
                   }});
     case "true":
       var local_965 = x.data;
       return __return({tag: "false",data: {}});
     default:
       throw rts.exceptions.UnhandledCase("DEF_a2f069d7413941fdafe42795f6970175"
                                         ,"ae670587961cb7d305eef1133a3bbc18");
   }
};
var parseHttpHeaderPacket = function (local_927) {
   var x = function (x930) {
              return x930;
           }(find1({start: local_927.start,__bytes: local_927.newPacket,byte: 10.0}));
   switch (x.tag)
   {
     case "just":
       var local_931 = x.data;
       var local_932 = _2b_({infixl: local_931,infixr: 1.0});
       return _3b_({infixl: length4(local_927.packets)
                   ,infixr: function (local_933) {
                      var done = function (local_934) {
                         return _3b_({infixl: sequence(map({list: _2e__2e_({start: 0.0
                                                                           ,stop: local_933})
                                                           ,mapping: function (local_935) {
                                                              return readMutArray({index: local_935
                                                                                  ,object: local_927.packets});
                                                           }}))
                                     ,infixr: function (local_936) {
                                        var local_939 =
                                        concat2(_2b__2b_2({infixl: local_936
                                                          ,infixr: function (local_937) {
                                                             return _3a__3a_({infixl: slice({object: local_927.newPacket
                                                                                            ,start: 0.0
                                                                                            ,stop: local_931})
                                                                             ,infixr: function (local_938) {
                                                                                return {tag: "empty"
                                                                                       ,data: {}};
                                                                             }});
                                                          }}));
                                        var local_952 =
                                        toArray(map({list: split1({__bytes: local_939
                                                                  ,seperator: rts.bytes([10])})
                                                    ,mapping: function (local_940) {
                                                       return removeSuffix({suffix: rts.bytes([13])
                                                                           ,whole: local_940});
                                                    }}));
                                        return _3b_({infixl: truncateMutArray({object: local_927.packets
                                                                              ,stop: 0.0})
                                                    ,infixr: function (local_953) {
                                                       return _3b_({infixl: appendMutArray({object: local_927.packets
                                                                                           ,value: slice({object: local_927.newPacket
                                                                                                         ,start: local_932
                                                                                                         ,stop: length(local_927.newPacket)})})
                                                                   ,infixr: function (local_954) {
                                                                      return __return({tag: "just"
                                                                                      ,data: local_952});
                                                                   }});
                                                    }});
                                     }});
                      };
                      var local_966 = function (local_955) {
                         return packetsEndWith({suffix: local_955
                                               ,stop: local_933
                                               ,packets: local_927.packets});
                      };
                      var next = function (local_967) {
                         return parseHttpHeaderPacket({start: local_932
                                                      ,newPacket: local_927.newPacket
                                                      ,packets: local_927.packets});
                      };
                      var x = function (x968) {
                                 return x968;
                              }(_3d__3d_({infixl: local_931,infixr: 0.0}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_969 = x.data;
                          var local_970 = byteAt({index: _2d_({infixl: local_931
                                                              ,infixr: 1.0})
                                                 ,object: local_927.newPacket});
                          var x = function (x971) {
                                     return x971;
                                  }(_3d__3d_({infixl: local_970,infixr: 10.0}));
                          switch (x.tag)
                          {
                            case "false":
                              var local_972 = x.data;
                              var x = function (x973) {
                                         return x973;
                                      }(_3d__3d_({infixl: local_970,infixr: 13.0}));
                              switch (x.tag)
                              {
                                case "false":
                                  return next(x.data);
                                case "true":
                                  var local_974 = x.data;
                                  var x = function (x975) {
                                             return x975;
                                          }(_3d__3d_({infixl: local_931,infixr: 1.0}));
                                  switch (x.tag)
                                  {
                                    case "false":
                                      var local_976 = x.data;
                                      var x = function (x977) {
                                                 return x977;
                                              }(_3d__3d_({infixl: byteAt({index: _2d_({infixl: local_931
                                                                                      ,infixr: 2.0})
                                                                         ,object: local_927.newPacket})
                                                         ,infixr: 10.0}));
                                      switch (x.tag)
                                      {
                                        case "false":
                                          return next(x.data);
                                        case "true":
                                          return done(x.data);
                                        default:
                                          throw rts.exceptions.UnhandledCase("DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                            ,"2a6eda3fea34bfc4f50863f20c1e9ac2");
                                      }
                                    case "true":
                                      var local_978 = x.data;
                                      return _3b_({infixl: local_966(rts.bytes([10]))
                                                  ,infixr: function (local_979) {
                                                     var x = function (x980) {
                                                                return x980;
                                                             }(local_979);
                                                     switch (x.tag)
                                                     {
                                                       case "false":
                                                         return next(x.data);
                                                       case "true":
                                                         return done(x.data);
                                                       default:
                                                         throw rts.exceptions.UnhandledCase("DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                                           ,"5f1c238b6da7ee82f5363516372a617b");
                                                     }
                                                  }});
                                    default:
                                      throw rts.exceptions.UnhandledCase("DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                        ,"71aa132836b10c2273aec46a91adc29a");
                                  }
                                default:
                                  throw rts.exceptions.UnhandledCase("DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                    ,"8a544343e9f5f27b97c6979a45025f5e");
                              }
                            case "true":
                              return done(x.data);
                            default:
                              throw rts.exceptions.UnhandledCase("DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                ,"2acaafd2775505f6a280aa18fe3c0e44");
                          }
                        case "true":
                          var local_981 = x.data;
                          return _3b_({infixl: local_966(rts.bytes([10]))
                                      ,infixr: function (local_982) {
                                         var x = function (x983) {
                                                    return x983;
                                                 }(local_982);
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_984 = x.data;
                                             return _3b_({infixl: local_966(rts.bytes([10
                                                                                      ,13]))
                                                         ,infixr: function (local_985) {
                                                            var x = function (x986) {
                                                                       return x986;
                                                                    }(local_985);
                                                            switch (x.tag)
                                                            {
                                                              case "false":
                                                                return next(x.data);
                                                              case "true":
                                                                return done(x.data);
                                                              default:
                                                                throw rts.exceptions.UnhandledCase("DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                                                  ,"c323f65fadb272703b7b6aa5fd90432a");
                                                            }
                                                         }});
                                           case "true":
                                             return done(x.data);
                                           default:
                                             throw rts.exceptions.UnhandledCase("DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                               ,"bd0b5ef73c2e50ad935a0466d30d1194");
                                         }
                                      }});
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                            ,"ffa5bec95e83b04b17273d5e67253950");
                      }
                   }});
     case "nothing":
       var local_987 = x.data;
       return _3b_({infixl: appendMutArray({object: local_927.packets
                                           ,value: local_927.newPacket})
                   ,infixr: function (local_988) {
                      return __return({tag: "nothing",data: {}});
                   }});
     default:
       throw rts.exceptions.UnhandledCase("DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                         ,"a641e1eefdb6d290e8f5e30eb99ae939");
   }
};
var requestHeaderIndex = function (x994) {
   switch (x994.tag)
   {
     case "referer":
       var local_995 = x994.data;
       return 9.0;
     case "range":
       var local_996 = x994.data;
       return 4.0;
     case "contentLength":
       var local_997 = x994.data;
       return 0.0;
     case "connection":
       var local_998 = x994.data;
       return 3.0;
     case "host":
       var local_999 = x994.data;
       return 5.0;
     case "userAgent":
       var local_1000 = x994.data;
       return 10.0;
     case "ifModifiedSince":
       var local_1001 = x994.data;
       return 6.0;
     case "ifRange":
       var local_1002 = x994.data;
       return 8.0;
     case "count":
       var local_1003 = x994.data;
       return 11.0;
     case "transferEncoding":
       var local_1004 = x994.data;
       return 1.0;
     case "expect":
       var local_1005 = x994.data;
       return 2.0;
     case "ifUnmodifiedSince":
       var local_1006 = x994.data;
       return 7.0;
     default:
       throw rts.exceptions.UnhandledCase("DEF_1b4c5f4e650b40db91d34fcbb46eedcc"
                                         ,"2d1d3f6c02b34a16b1ecc9cff08b339e");
   }
};
var toLower8 = function (local_1012) {
   var x = function (x1017) {
              return x1017;
           }(_7c__7c_({infixl: _26__26_({infixl: _2264_({infixl: 65.0,infixr: local_1012})
                                        ,infixr: function (local_1013) {
                                           return _2264_({infixl: local_1012
                                                         ,infixr: 90.0});
                                        }})
                      ,infixr: function (local_1014) {
                         return _26__26_({infixl: _2264_({infixl: 192.0
                                                         ,infixr: local_1012})
                                         ,infixr: function (local_1015) {
                                            return _26__26_({infixl: _2264_({infixl: local_1012
                                                                            ,infixr: 222.0})
                                                            ,infixr: function (local_1016) {
                                                               return _2260_({infixl: local_1012
                                                                             ,infixr: 215.0});
                                                            }});
                                         }});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_1018 = x.data;
       return local_1012;
     case "true":
       var local_1019 = x.data;
       return _2b_({infixl: local_1012,infixr: 32.0});
     default:
       throw rts.exceptions.UnhandledCase("DEF_d53402309e2246e0acda443ccc6735f8"
                                         ,"26914d49ae6cd50363dc7b55bd37d4d5");
   }
};
var numHeadItems = function (local_1030) {
   return foldLazy({list: local_1030.list
                   ,initial: function (local_1031) {
                      return id;
                   }
                   ,binop: function (local_1032) {
                      return function (local_1033) {
                             var x = function (x1034) {
                                        return x1034;
                                     }(local_1030.that(local_1032.item));
                             switch (x.tag)
                             {
                               case "false":
                                 var local_1035 = x.data;
                                 return local_1033;
                               case "true":
                                 var local_1036 = x.data;
                                 return local_1032.rest({})(_2b_({infixl: local_1033
                                                                 ,infixr: 1.0}));
                               default:
                                 throw rts.exceptions.UnhandledCase("DEF_8e2a63199d5c4946ae51e428c77e2587"
                                                                   ,"b73a61d07547543acce9e5aa2b53f447");
                             }
                          };
                   }})(0.0);
};
var parseHeader = function (local_1009) {
   var local_1020 = function (local_1010) {
      return {headerNameOrig: local_1010
             ,headerNameLower: toBytes(toArray(map({list: fromBytes(function (x1011) {
                                                      return x1011;
                                                   }(local_1010))
                                                   ,mapping: toLower8})))};
   };
   var x = function (x1022) {
              return x1022;
           }(find1({start: 0.0
                   ,__bytes: function (x1021) {
                      return x1021;
                   }(local_1009)
                   ,byte: 58.0}));
   switch (x.tag)
   {
     case "just":
       var local_1023 = x.data;
       var x = Object.assign({__data: function (local_1025) {
                               return slice({object: function (x1026) {
                                               return x1026;
                                            }(local_1009)
                                            ,start: _2b_({infixl: _2b_({infixl: local_1023
                                                                       ,infixr: 1.0})
                                                         ,infixr: numHeadItems({that: function (local_1027) {
                                                                                  return _7c__7c_({infixl: _3d__3d_({infixl: local_1027
                                                                                                                    ,infixr: 32.0})
                                                                                                  ,infixr: function (local_1028) {
                                                                                                     return _3d__3d_({infixl: local_1027
                                                                                                                     ,infixr: 9.0});
                                                                                                  }});
                                                                               }
                                                                               ,list: fromBytes(slice({object: function (x1029) {
                                                                                                         return x1029;
                                                                                                      }(local_1009)
                                                                                                      ,start: _2b_({infixl: local_1023
                                                                                                                   ,infixr: 1.0})
                                                                                                      ,stop: local_1025}))})})
                                            ,stop: local_1025});
                            }(length(function (x1024) {
                               return x1024;
                            }(local_1009)))}
                            ,local_1020(slice({object: function (x1037) {
                                                 return x1037;
                                              }(local_1009)
                                              ,start: 0.0
                                              ,stop: local_1023})));
       delete x.cacheId;
       return x;
     case "nothing":
       var local_1038 = x.data;
       var x = Object.assign({__data: rts.bytesFromAscii("")},local_1020(local_1009));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.UnhandledCase("DEF_24c62861bfb940e4addebcc337a003f8"
                                         ,"2fd2696b8bb145a1f8ea35cf6754cfb8");
   }
};
var requestHeaderIndexFromText = function (local_1040) {
   var local_1042 = length(function (x1041) { return x1041;}(local_1040));
   var local_1047 = function (local_1043) {
      var x = function (x1044) {
                 return x1044;
              }(_3d__3d_({infixl: local_1040,infixr: local_1043.text}));
      switch (x.tag)
      {
        case "false":
          var local_1045 = x.data;
          return {tag: "nothing",data: {}};
        case "true":
          var local_1046 = x.data;
          return {tag: "just",data: requestHeaderIndex(local_1043.value)};
        default:
          throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                            ,"dc1fada55c8b610b4ec39d131179bc92");
      }
   };
   var x = function (x1048) { return x1048;}(_3d__3d_({infixl: local_1042,infixr: 4.0}));
   switch (x.tag)
   {
     case "false":
       var local_1049 = x.data;
       var x = function (x1050) {
                  return x1050;
               }(_3d__3d_({infixl: local_1042,infixr: 5.0}));
       switch (x.tag)
       {
         case "false":
           var local_1051 = x.data;
           var x = function (x1052) {
                      return x1052;
                   }(_3d__3d_({infixl: local_1042,infixr: 6.0}));
           switch (x.tag)
           {
             case "false":
               var local_1053 = x.data;
               var x = function (x1054) {
                          return x1054;
                       }(_3d__3d_({infixl: local_1042,infixr: 7.0}));
               switch (x.tag)
               {
                 case "false":
                   var local_1055 = x.data;
                   var x = function (x1056) {
                              return x1056;
                           }(_3d__3d_({infixl: local_1042,infixr: 8.0}));
                   switch (x.tag)
                   {
                     case "false":
                       var local_1057 = x.data;
                       var x = function (x1058) {
                                  return x1058;
                               }(_3d__3d_({infixl: local_1042,infixr: 10.0}));
                       switch (x.tag)
                       {
                         case "false":
                           var local_1059 = x.data;
                           var x = function (x1060) {
                                      return x1060;
                                   }(_3d__3d_({infixl: local_1042,infixr: 14.0}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_1061 = x.data;
                               var x = function (x1062) {
                                          return x1062;
                                       }(_3d__3d_({infixl: local_1042,infixr: 17.0}));
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_1063 = x.data;
                                   var x = function (x1064) {
                                              return x1064;
                                           }(_3d__3d_({infixl: local_1042,infixr: 19.0}));
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_1065 = x.data;
                                       return {tag: "nothing",data: {}};
                                     case "true":
                                       var local_1066 = x.data;
                                       return local_1047({text: rts.bytesFromAscii("if-unmodified-since")
                                                         ,value: {tag: "ifUnmodifiedSince"
                                                                 ,data: {}}});
                                     default:
                                       throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                         ,"f8cf9e99c6ebab86468dac6f079e1d43");
                                   }
                                 case "true":
                                   var local_1067 = x.data;
                                   var x = function (x1068) {
                                              return x1068;
                                           }(_3d__3d_({infixl: local_1040
                                                      ,infixr: rts.bytesFromAscii("transfer-encoding")}));
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_1069 = x.data;
                                       var x = function (x1070) {
                                                  return x1070;
                                               }(_3d__3d_({infixl: local_1040
                                                          ,infixr: rts.bytesFromAscii("if-modified-since")}));
                                       switch (x.tag)
                                       {
                                         case "false":
                                           var local_1071 = x.data;
                                           return {tag: "nothing",data: {}};
                                         case "true":
                                           var local_1072 = x.data;
                                           return {tag: "just"
                                                  ,data: requestHeaderIndex({tag: "ifModifiedSince"
                                                                            ,data: {}})};
                                         default:
                                           throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                             ,"5c9b7e120cfcbfe66378a56aa55e1554");
                                       }
                                     case "true":
                                       var local_1073 = x.data;
                                       return {tag: "just"
                                              ,data: requestHeaderIndex({tag: "transferEncoding"
                                                                        ,data: {}})};
                                     default:
                                       throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                         ,"9ec381855af586ca5f7ac0406a96f0db");
                                   }
                                 default:
                                   throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                     ,"f7b8f18ab48287152b84f01302b0a1e9");
                               }
                             case "true":
                               var local_1074 = x.data;
                               return local_1047({text: rts.bytesFromAscii("content-length")
                                                 ,value: {tag: "contentLength"
                                                         ,data: {}}});
                             default:
                               throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                 ,"316352807090bd4b8e1627c428b18ad0");
                           }
                         case "true":
                           var local_1075 = x.data;
                           var x = function (x1076) {
                                      return x1076;
                                   }(_3d__3d_({infixl: local_1040
                                              ,infixr: rts.bytesFromAscii("user-agent")}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_1077 = x.data;
                               var x = function (x1078) {
                                          return x1078;
                                       }(_3d__3d_({infixl: local_1040
                                                  ,infixr: rts.bytesFromAscii("connection")}));
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_1079 = x.data;
                                   return {tag: "nothing",data: {}};
                                 case "true":
                                   var local_1080 = x.data;
                                   return {tag: "just"
                                          ,data: requestHeaderIndex({tag: "connection"
                                                                    ,data: {}})};
                                 default:
                                   throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                     ,"0a18521fa15139803614889d5ac640f3");
                               }
                             case "true":
                               var local_1081 = x.data;
                               return {tag: "just"
                                      ,data: requestHeaderIndex({tag: "userAgent"
                                                                ,data: {}})};
                             default:
                               throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                 ,"02a6caa9597123d66ac17c49dd5a37b6");
                           }
                         default:
                           throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                             ,"7b3222baa853ea34afcad794d9b346da");
                       }
                     case "true":
                       var local_1082 = x.data;
                       return local_1047({text: rts.bytesFromAscii("if-range")
                                         ,value: {tag: "ifRange",data: {}}});
                     default:
                       throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                         ,"0c12468dbe34d1382d0b97b93b5cab94");
                   }
                 case "true":
                   var local_1083 = x.data;
                   return local_1047({text: rts.bytesFromAscii("referer")
                                     ,value: {tag: "referer",data: {}}});
                 default:
                   throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                     ,"13eb12f71c41a5c676528975f4cd2d8f");
               }
             case "true":
               var local_1084 = x.data;
               return local_1047({text: rts.bytesFromAscii("expect")
                                 ,value: {tag: "expect",data: {}}});
             default:
               throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                 ,"a709b7964f58d9b479a336260545d465");
           }
         case "true":
           var local_1085 = x.data;
           return local_1047({text: rts.bytesFromAscii("range")
                             ,value: {tag: "range",data: {}}});
         default:
           throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                             ,"1d20a17a150e74e964a7731e9e75cc90");
       }
     case "true":
       var local_1086 = x.data;
       return local_1047({text: rts.bytesFromAscii("host")
                         ,value: {tag: "host",data: {}}});
     default:
       throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                         ,"b082b30c0d03c8abd35416fd055c4e65");
   }
};
var parseHeaders = function (local_992) {
   var local_1095 = runMutArray(_3b_({infixl: newMutArray
                                     ,infixr: function (local_993) {
                                        return _3b_({infixl: sequence__(replicate({count: requestHeaderIndex({tag: "count"
                                                                                                             ,data: {}})
                                                                                  ,item: appendMutArray({object: local_993
                                                                                                        ,value: {tag: "nothing"
                                                                                                                ,data: {}}})}))
                                                    ,infixr: function (local_1007) {
                                                       return _3b_({infixl: sequence__(map({list: _2e__2e_({start: 1.0
                                                                                                           ,stop: length1(local_992)})
                                                                                           ,mapping: function (local_1008) {
                                                                                              var local_1039 =
                                                                                              parseHeader(item({index: local_1008
                                                                                                               ,object: local_992}));
                                                                                              var local_1087 =
                                                                                              requestHeaderIndexFromText(local_1039.headerNameLower);
                                                                                              var x =
                                                                                              function (x1088) {
                                                                                                 return x1088;
                                                                                              }(local_1087);
                                                                                              switch (x.tag)
                                                                                              {
                                                                                                case "just":
                                                                                                  var index7 =
                                                                                                  x.data;
                                                                                                  return _3b_({infixl: readMutArray({index: index7
                                                                                                                                    ,object: local_993})
                                                                                                              ,infixr: function (local_1089) {
                                                                                                                 var x =
                                                                                                                 function (x1090) {
                                                                                                                    return x1090;
                                                                                                                 }(local_1089);
                                                                                                                 switch (x.tag)
                                                                                                                 {
                                                                                                                   case "just":
                                                                                                                     var local_1091 =
                                                                                                                     x.data;
                                                                                                                     throw rts.exceptions.ReachedHole("DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                     ,"0ba4efe1ab9b937a5c4c329950c130eb");
                                                                                                                   case "nothing":
                                                                                                                     var local_1092 =
                                                                                                                     x.data;
                                                                                                                     return writeMutArray({index: index7
                                                                                                                                          ,object: local_993
                                                                                                                                          ,value: {tag: "just"
                                                                                                                                                  ,data: local_1039.__data}});
                                                                                                                   default:
                                                                                                                     throw rts.exceptions.UnhandledCase("DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                       ,"46e58c07915691b0449b51e2c57e8c26");
                                                                                                                 }
                                                                                                              }});
                                                                                                case "nothing":
                                                                                                  var local_1093 =
                                                                                                  x.data;
                                                                                                  return __return({});
                                                                                                default:
                                                                                                  throw rts.exceptions.UnhandledCase("DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                    ,"96d7c2e4942aa324705674b28c8d8892");
                                                                                              }
                                                                                           }}))
                                                                   ,infixr: function (local_1094) {
                                                                      return __return(local_993);
                                                                   }});
                                                    }});
                                     }}));
   var value = function (local_1096) {
      return item({index: requestHeaderIndex(local_1096),object: local_1095});
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
var parseHttpVersion = function (local_1102) {
   var x = function (x1108) {
              return x1108;
           }(_26__26_({infixl: _3d__3d_({infixl: slice({object: function (x1103) {
                                                          return x1103;
                                                       }(local_1102)
                                                       ,start: 0.0
                                                       ,stop: 5.0})
                                        ,infixr: rts.bytesFromAscii("HTTP/")})
                      ,infixr: function (local_1104) {
                         return _26__26_({infixl: _3d__3d_({infixl: slice({object: function (x1105) {
                                                                             return x1105;
                                                                          }(local_1102)
                                                                          ,start: 6.0
                                                                          ,stop: 7.0})
                                                           ,infixr: rts.bytesFromAscii(".")})
                                         ,infixr: function (local_1106) {
                                            return _2265_({infixl: length(function (x1107) {
                                                             return x1107;
                                                          }(local_1102))
                                                          ,infixr: 8.0});
                                         }});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_1109 = x.data;
       throw rts.exceptions.ReachedHole("DEF_cdde9ce31af346e5879cd20194adf297"
                                       ,"d4d438d8b8c3035dd13c03c182e694f8");
     case "true":
       var local_1110 = x.data;
       var local_1112 = byteAt({index: 5.0
                               ,object: function (x1111) {
                                  return x1111;
                               }(local_1102)});
       var local_1114 = byteAt({index: 7.0
                               ,object: function (x1113) {
                                  return x1113;
                               }(local_1102)});
       var x = function (x1115) {
                  return x1115;
               }(_3d__3d_({infixl: local_1112,infixr: 49.0}));
       switch (x.tag)
       {
         case "false":
           var local_1116 = x.data;
           var x = function (x1118) {
                      return x1118;
                   }(_26__26_({infixl: _3d__3d_({infixl: local_1112,infixr: 50.0})
                              ,infixr: function (local_1117) {
                                 return _3d__3d_({infixl: local_1114,infixr: 48.0});
                              }}));
           switch (x.tag)
           {
             case "false":
               var local_1119 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_1120 = x.data;
               return {minor: 0.0,major: 2.0};
             default:
               throw rts.exceptions.UnhandledCase("DEF_cdde9ce31af346e5879cd20194adf297"
                                                 ,"6d72ed51030c146e142824d8c5608502");
           }
         case "true":
           var local_1121 = x.data;
           var x = function (x1122) {
                      return x1122;
                   }(_3d__3d_({infixl: local_1114,infixr: 49.0}));
           switch (x.tag)
           {
             case "false":
               var local_1123 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_1124 = x.data;
               return {minor: 1.0,major: 1.0};
             default:
               throw rts.exceptions.UnhandledCase("DEF_cdde9ce31af346e5879cd20194adf297"
                                                 ,"b80f6ac8b7a1b87599df15c30e4c6f7c");
           }
         default:
           throw rts.exceptions.UnhandledCase("DEF_cdde9ce31af346e5879cd20194adf297"
                                             ,"c98318a70f432213d8971ffbc44292ca");
       }
     default:
       throw rts.exceptions.UnhandledCase("DEF_cdde9ce31af346e5879cd20194adf297"
                                         ,"0a155af817e30618f126869341b69d73");
   }
};
var parseHttpPathAndQuery = function (local_1125) {
   var x = function (x1127) {
              return x1127;
           }(find1({start: 0.0
                   ,__bytes: function (x1126) {
                      return x1126;
                   }(local_1125)
                   ,byte: 63.0}));
   switch (x.tag)
   {
     case "just":
       var local_1128 = x.data;
       return {path: slice({object: function (x1129) {
                              return x1129;
                           }(local_1125)
                           ,start: 0.0
                           ,stop: local_1128})
              ,query: slice({object: function (x1130) {
                               return x1130;
                            }(local_1125)
                            ,start: local_1128
                            ,stop: length(function (x1131) {
                               return x1131;
                            }(local_1125))})};
     case "nothing":
       var local_1132 = x.data;
       return {path: local_1125,query: rts.bytesFromAscii("")};
     default:
       throw rts.exceptions.UnhandledCase("DEF_e1ddf2e103fc4a77ba877761b12b0489"
                                         ,"7b5454e4261c24d201d9384e83ca385c");
   }
};
var parseRequestLine = function (local_1097) {
   var local_1098 = toArray(split({text: local_1097,seperator: rts.bytesFromAscii(" ")}));
   var x = function (x1099) {
              return x1099;
           }(_3d__3d_({infixl: length1(local_1098),infixr: 3.0}));
   switch (x.tag)
   {
     case "false":
       var local_1100 = x.data;
       throw rts.exceptions.ReachedHole("DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                       ,"a7de8d96fb5e1479e6bb2a3ddb6eeaaa");
     case "true":
       var local_1101 = x.data;
       var x = Object.assign({httpVersion: parseHttpVersion(item({index: 2.0
                                                                 ,object: local_1098}))
                             ,method: item({index: 0.0,object: local_1098})}
                            ,parseHttpPathAndQuery(item({index: 1.0
                                                        ,object: local_1098})));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.UnhandledCase("DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                         ,"1a29dea7dd98168ceba76256560b374b");
   }
};
var isPrefixOf = function (local_1147) {
   var local_1148 = length(local_1147.whole);
   var local_1149 = length(local_1147.prefix);
   return _26__26_({infixl: _2265_({infixl: local_1148,infixr: local_1149})
                   ,infixr: function (local_1150) {
                      return _3d__3d_({infixl: slice({object: local_1147.whole
                                                     ,start: 0.0
                                                     ,stop: local_1149})
                                      ,infixr: local_1147.prefix});
                   }});
};
var unprefixed = function (local_1146) {
   var x = function (x1151) {
              return x1151;
           }(isPrefixOf({whole: local_1146.whole,prefix: local_1146.prefix}));
   switch (x.tag)
   {
     case "false":
       var local_1152 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_1153 = x.data;
       return {tag: "just"
              ,data: slice({object: local_1146.whole
                           ,start: length(local_1146.prefix)
                           ,stop: length(local_1146.whole)})};
     default:
       throw rts.exceptions.UnhandledCase("DEF_1d18b3f94ac64cc39b8dc131624a5e9f"
                                         ,"2de3ba5a8affabb154216378ec3580e6");
   }
};
var httpAddLocalPath = function (local_1133) {
   var local_1134 = local_1133.path;
   var nonEmpty = function (local_1135) {
      var x = function (x1136) {
                 return x1136;
              }(_3d__3d_({infixl: local_1135,infixr: rts.bytesFromAscii("")}));
      switch (x.tag)
      {
        case "false":
          var local_1137 = x.data;
          return local_1135;
        case "true":
          var local_1138 = x.data;
          return rts.bytesFromAscii("/");
        default:
          throw rts.exceptions.UnhandledCase("DEF_97b5de980c3149218877e33920fb5729"
                                            ,"5ae9e78cf85c5d6952c38eb479596553");
      }
   };
   var local_1143 = function (local_1139) {
      return nonEmpty(function () {
             var x = function (x1140) {
                        return x1140;
                     }(find1({start: 0.0,__bytes: local_1139,byte: 47.0}));
             switch (x.tag)
             {
               case "just":
                 var local_1141 = x.data;
                 return slice({object: local_1139
                              ,start: local_1141
                              ,stop: length(local_1139)});
               case "nothing":
                 var local_1142 = x.data;
                 return rts.bytesFromAscii("");
               default:
                 throw rts.exceptions.UnhandledCase("DEF_97b5de980c3149218877e33920fb5729"
                                                   ,"8d9250a6123ff265d7652592a88c96a8");
             }
          }());
   };
   var x = Object.assign({localPath: function () {
                           var x = function (x1154) {
                                      return x1154;
                                   }(unprefixed({whole: function (x1144) {
                                                   return x1144;
                                                }(local_1134)
                                                ,prefix: function (x1145) {
                                                   return x1145;
                                                }(rts.bytesFromAscii("http://"))}));
                           switch (x.tag)
                           {
                             case "just":
                               return local_1143(x.data);
                             case "nothing":
                               var local_1155 = x.data;
                               var x = function (x1158) {
                                          return x1158;
                                       }(unprefixed({whole: function (x1156) {
                                                       return x1156;
                                                    }(local_1134)
                                                    ,prefix: function (x1157) {
                                                       return x1157;
                                                    }(rts.bytesFromAscii("https://"))}));
                               switch (x.tag)
                               {
                                 case "just":
                                   return local_1143(x.data);
                                 case "nothing":
                                   var local_1159 = x.data;
                                   return nonEmpty(local_1134);
                                 default:
                                   throw rts.exceptions.UnhandledCase("DEF_97b5de980c3149218877e33920fb5729"
                                                                     ,"c0dd43e18ed983b36e5c60602a58a1ca");
                               }
                             default:
                               throw rts.exceptions.UnhandledCase("DEF_97b5de980c3149218877e33920fb5729"
                                                                 ,"fe5bc8fad7ae34a3fea4792464e3f2d9");
                           }
                        }()}
                        ,local_1133);
   delete x.cacheId;
   return x;
};
var httpContinueMessage = function (local_1163) {
   return concat2(_3a__3a_({infixl: function () {
                              var x = function (x1164) {
                                         return x1164;
                                      }(_3d__3d_({infixl: local_1163
                                                 ,infixr: {minor: 1.0,major: 1.0}}));
                              switch (x.tag)
                              {
                                case "false":
                                  var local_1165 = x.data;
                                  return function (x1166) {
                                         return x1166;
                                      }(rts.bytesFromAscii("HTTP/1.0"));
                                case "true":
                                  var local_1167 = x.data;
                                  return function (x1168) {
                                         return x1168;
                                      }(rts.bytesFromAscii("HTTP/1.1"));
                                default:
                                  throw rts.exceptions.UnhandledCase("DEF_28b20b49b76041158f817cb6f1ae7069"
                                                                    ,"7a33dc1474f28318b0a1a21410017295");
                              }
                           }()
                           ,infixr: function (local_1169) {
                              return _3a__3a_({infixl: function (x1170) {
                                                 return x1170;
                                              }(rts.bytesFromAscii(" 100 Continue"))
                                              ,infixr: function (local_1171) {
                                                 return _3a__3a_({infixl: rts.bytes([13
                                                                                    ,10
                                                                                    ,13
                                                                                    ,10])
                                                                 ,infixr: function (local_1172) {
                                                                    return {tag: "empty"
                                                                           ,data: {}};
                                                                 }});
                                              }});
                           }}));
};
var parseHttpRequestPacket = function (local_899) {
   var local_908 = _3b_({infixl: popLastMutArray(local_899.unparsedPackets)
                        ,infixr: function (local_904) {
                           var x = function (x905) { return x905;}(local_904);
                           switch (x.tag)
                           {
                             case "just":
                               var local_906 = x.data;
                               return parseHttpRequestPacket({socket: local_899.socket
                                                             ,unparsedPackets: local_899.unparsedPackets
                                                             ,newPacket: local_906
                                                             ,stateRef: local_899.stateRef
                                                             ,handler: local_899.handler});
                             case "nothing":
                               var local_907 = x.data;
                               return __return({});
                             default:
                               throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                 ,"a71ca59bb3302212a2d667ac7d89c4e8");
                           }
                        }});
   return _3b_({infixl: readMutRef(local_899.stateRef)
               ,infixr: function (x909) {
                  switch (x909.tag)
                  {
                    case "body":
                      var local_910 = x909.data;
                      var local_911 = length(local_899.newPacket);
                      var x = function (x912) {
                                 return x912;
                              }(_3c_({infixl: local_911,infixr: local_910.remain}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_913 = x.data;
                          return _3b_({infixl: length4(local_899.unparsedPackets)
                                      ,infixr: function (local_914) {
                                         return _3b_({infixl: sequence(map({list: _2e__2e_({start: 0.0
                                                                                           ,stop: local_914})
                                                                           ,mapping: function (local_915) {
                                                                              return readMutArray({index: local_915
                                                                                                  ,object: local_899.unparsedPackets});
                                                                           }}))
                                                     ,infixr: function (packets) {
                                                        return _3b_({infixl: _3b_({infixl: truncateMutArray({object: local_899.unparsedPackets
                                                                                                            ,stop: 0.0})
                                                                                  ,infixr: function (local_916) {
                                                                                     return local_899.handler({request: function () {
                                                                                                                 var x =
                                                                                                                 Object.assign({body: {tag: "just"
                                                                                                                                      ,data: concat2(_2b__2b_2({infixl: packets
                                                                                                                                                               ,infixr: function (local_917) {
                                                                                                                                                                  return _3a__3a_({infixl: slice({object: local_899.newPacket
                                                                                                                                                                                                 ,start: 0.0
                                                                                                                                                                                                 ,stop: local_910.remain})
                                                                                                                                                                                  ,infixr: function (local_918) {
                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                  }});
                                                                                                                                                               }}))}}
                                                                                                                              ,local_910.request);
                                                                                                                 delete x.cacheId;
                                                                                                                 return x;
                                                                                                              }()
                                                                                                              ,socket: local_899.socket});
                                                                                  }})
                                                                    ,infixr: function (local_919) {
                                                                       return _3b_({infixl: writeMutRef({object: local_899.stateRef
                                                                                                        ,value: {tag: "header"
                                                                                                                ,data: {}}})
                                                                                   ,infixr: function (local_920) {
                                                                                      var x =
                                                                                      function (x921) {
                                                                                         return x921;
                                                                                      }(_3c_({infixl: local_910.remain
                                                                                             ,infixr: local_911}));
                                                                                      switch (x.tag)
                                                                                      {
                                                                                        case "false":
                                                                                          var local_922 =
                                                                                          x.data;
                                                                                          return __return({});
                                                                                        case "true":
                                                                                          var local_923 =
                                                                                          x.data;
                                                                                          return parseHttpRequestPacket({socket: local_899.socket
                                                                                                                        ,unparsedPackets: local_899.unparsedPackets
                                                                                                                        ,newPacket: slice({object: local_899.newPacket
                                                                                                                                          ,start: local_910.remain
                                                                                                                                          ,stop: local_911})
                                                                                                                        ,stateRef: local_899.stateRef
                                                                                                                        ,handler: local_899.handler});
                                                                                        default:
                                                                                          throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                                            ,"648f5244207bc3a94b77db16bd2ed183");
                                                                                      }
                                                                                   }});
                                                                    }});
                                                     }});
                                      }});
                        case "true":
                          var local_924 = x.data;
                          return _3b_({infixl: appendMutArray({object: local_899.unparsedPackets
                                                              ,value: local_899.newPacket})
                                      ,infixr: function (local_925) {
                                         return writeMutRef({object: local_899.stateRef
                                                            ,value: {tag: "body"
                                                                    ,data: {request: local_910.request
                                                                           ,remain: _2d_({infixl: local_910.remain
                                                                                         ,infixr: local_911})}}});
                                      }});
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                            ,"4a7857b1e6dc15eee111f928eef30ceb");
                      }
                    case "header":
                      var local_926 = x909.data;
                      return _3b_({infixl: parseHttpHeaderPacket({start: 0.0
                                                                 ,newPacket: local_899.newPacket
                                                                 ,packets: local_899.unparsedPackets})
                                  ,infixr: function (local_989) {
                                     var x = function (x990) { return x990;}(local_989);
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_991 = x.data;
                                         var request1 = function () {
                                                           var x =
                                                           Object.assign({headers: parseHeaders(local_991)}
                                                                        ,httpAddLocalPath(parseRequestLine(item({index: 0.0
                                                                                                                ,object: local_991}))));
                                                           delete x.cacheId;
                                                           return x;
                                                        }();
                                         return _3b_({infixl: function () {
                                                        var x = function (x1160) {
                                                                   return x1160;
                                                                }(_3d__3d_({infixl: request1.headers.expect
                                                                           ,infixr: {tag: "just"
                                                                                    ,data: rts.bytesFromAscii("100-continue")}}));
                                                        switch (x.tag)
                                                        {
                                                          case "false":
                                                            var local_1161 = x.data;
                                                            return __return({});
                                                          case "true":
                                                            var local_1162 = x.data;
                                                            return send({__data: httpContinueMessage(request1.httpVersion)
                                                                        ,socket: local_899.socket});
                                                          default:
                                                            throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                              ,"0010e59778d59572282a2dab5b43c99f");
                                                        }
                                                     }()
                                                     ,infixr: function (local_1173) {
                                                        return _3b_({infixl: function () {
                                                                       var x =
                                                                       function (x1174) {
                                                                          return x1174;
                                                                       }(request1.headers.contentLength);
                                                                       switch (x.tag)
                                                                       {
                                                                         case "just":
                                                                           var local_1175 =
                                                                           x.data;
                                                                           return writeMutRef({object: local_899.stateRef
                                                                                              ,value: {tag: "body"
                                                                                                      ,data: {request: request1
                                                                                                             ,remain: parseInt(local_1175)}}});
                                                                         case "nothing":
                                                                           var local_1176 =
                                                                           x.data;
                                                                           return local_899.handler({request: function () {
                                                                                                       var x =
                                                                                                       Object.assign({body: {tag: "nothing"
                                                                                                                            ,data: {}}}
                                                                                                                    ,request1);
                                                                                                       delete x.cacheId;
                                                                                                       return x;
                                                                                                    }()
                                                                                                    ,socket: local_899.socket});
                                                                         default:
                                                                           throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                             ,"c91c5cea0890a94419165f2c0e413659");
                                                                       }
                                                                    }()
                                                                    ,infixr: function (local_1177) {
                                                                       return local_908;
                                                                    }});
                                                     }});
                                       case "nothing":
                                         var local_1178 = x.data;
                                         return __return({});
                                       default:
                                         throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                           ,"cef302b61f67cb881213fc7f4a6273d1");
                                     }
                                  }});
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                        ,"434367d98a0e9fd511b469733d2b51e0");
                  }
               }});
};
var parseHttpRequests = function (local_897) {
   return _3b_({infixl: newMutRef({tag: "header",data: {}})
               ,infixr: function (stateRef) {
                  return _3b_({infixl: newMutArray
                              ,infixr: function (unparsedPackets) {
                                 return __return(function (local_898) {
                                        return parseHttpRequestPacket({socket: local_897.socket
                                                                      ,unparsedPackets: unparsedPackets
                                                                      ,newPacket: local_898
                                                                      ,stateRef: stateRef
                                                                      ,handler: local_897.handler});
                                     });
                              }});
               }});
};
var openTcpServer = rts.builtins.IO.network["openTcpServer"];
var httpServer = function (local_885) {
   return openTcpServer({connectionHandler: function (socket) {
                           return parseHttpRequests({socket: socket
                                                    ,handler: function (local_886) {
                                                       return _3b_({infixl: local_885.handler(local_886.request)
                                                                   ,infixr: function (local_887) {
                                                                      return send({__data: _2b__2b_1({a: function (x896) {
                                                                                                        return x896;
                                                                                                     }(join({texts: _3a__3a_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("HTTP/1.1")
                                                                                                                                                            ,infixr: function (local_888) {
                                                                                                                                                               return _3a__3a_({infixl: showNum(local_887.status.code)
                                                                                                                                                                               ,infixr: function (local_889) {
                                                                                                                                                                                  return _3a__3a_({infixl: local_887.status.message
                                                                                                                                                                                                  ,infixr: function (local_890) {
                                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                                  }});
                                                                                                                                                                               }});
                                                                                                                                                            }})
                                                                                                                                           ,seperator: rts.bytesFromAscii(" ")})
                                                                                                                             ,infixr: function (local_891) {
                                                                                                                                return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Type: ")
                                                                                                                                                                  ,b: local_887.content.mimeType})
                                                                                                                                                ,infixr: function (local_892) {
                                                                                                                                                   return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Length: ")
                                                                                                                                                                                     ,b: showNum(length(local_887.content.__data))})
                                                                                                                                                                   ,infixr: function (local_893) {
                                                                                                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                      ,infixr: function (local_894) {
                                                                                                                                                                                         return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                                         ,infixr: function (local_895) {
                                                                                                                                                                                                            return {tag: "empty"
                                                                                                                                                                                                                   ,data: {}};
                                                                                                                                                                                                         }});
                                                                                                                                                                                      }});
                                                                                                                                                                   }});
                                                                                                                                                }});
                                                                                                                             }})
                                                                                                            ,seperator: rts.bytesFromAscii("\r\n")}))
                                                                                                     ,b: local_887.content.__data})
                                                                                  ,socket: socket});
                                                                   }});
                                                    }});
                        }
                        ,exclusive: {tag: "false",data: {}}
                        ,host: local_885.host
                        ,port: local_885.port});
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
                                                               throw rts.exceptions.UnhandledCase("DEF_03805ab8c62443a3b30436fe169288a2"
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
