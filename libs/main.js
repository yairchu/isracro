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
              ,mapping: function (local_94) {
                 return item({index: local_94,object: __array1});
              }});
};
var _2264_ = rts.builtins.Prelude["<="];
var drop = function (local_95) {
   var x = function (x96) { return x96;}(_2264_({infixl: local_95.count,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_97 = x.data;
       var x = function (x98) { return x98;}(local_95.list);
       switch (x.tag)
       {
         case "nonEmpty":
           var local_99 = x.data;
           return drop({list: local_99.tail({})
                       ,count: _2d_({infixl: local_95.count,infixr: 1.0})});
         case "empty":
           var local_100 = x.data;
           return {tag: "empty",data: {}};
         default:
           throw rts.exceptions.UnhandledCase("DEF_efdcd00625534eb5b480c13776995953"
                                             ,"3484afddcc5745189195b1b977bc31a4");
       }
     case "true":
       var local_101 = x.data;
       return local_95.list;
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
                                                                       }(rts.bytesFromAscii("New session created"))
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
                              ,infixr: function (local_311) {
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
var sort1 = function (local_313) {
   var x = function (x314) {
              return x314;
           }(_2265_({infixl: _2b_({infixl: local_313.start,infixr: 1.0})
                    ,infixr: local_313.stop}));
   switch (x.tag)
   {
     case "false":
       var local_315 = x.data;
       return _3b_({infixl: readMutArray({index: local_313.start
                                         ,object: local_313.__array})
                   ,infixr: function (pivot) {
                      return _3b_({infixl: newMutRef(local_313.start)
                                  ,infixr: function (pivotPosRef) {
                                     return _3b_({infixl: sequence__(map({list: _2e__2e_({start: _2b_({infixl: local_313.start
                                                                                                      ,infixr: 1.0})
                                                                                         ,stop: local_313.stop})
                                                                         ,mapping: function (index) {
                                                                            return _3b_({infixl: readMutArray({index: index
                                                                                                              ,object: local_313.__array})
                                                                                        ,infixr: function (object) {
                                                                                           var x =
                                                                                           function (x316) {
                                                                                              return x316;
                                                                                           }(local_313._3c_({infixl: object
                                                                                                            ,infixr: pivot}));
                                                                                           switch (x.tag)
                                                                                           {
                                                                                             case "false":
                                                                                               var local_317 =
                                                                                               x.data;
                                                                                               return __return({});
                                                                                             case "true":
                                                                                               var local_318 =
                                                                                               x.data;
                                                                                               return _3b_({infixl: readMutRef(pivotPosRef)
                                                                                                           ,infixr: function (pivotPos) {
                                                                                                              return _3b_({infixl: writeMutArray({index: pivotPos
                                                                                                                                                 ,object: local_313.__array
                                                                                                                                                 ,value: object})
                                                                                                                          ,infixr: function (local_319) {
                                                                                                                             var newPivotPos =
                                                                                                                             _2b_({infixl: pivotPos
                                                                                                                                  ,infixr: 1.0});
                                                                                                                             return _3b_({infixl: writeMutRef({object: pivotPosRef
                                                                                                                                                              ,value: newPivotPos})
                                                                                                                                         ,infixr: function (local_320) {
                                                                                                                                            return _3b_({infixl: readMutArray({index: newPivotPos
                                                                                                                                                                              ,object: local_313.__array})
                                                                                                                                                        ,infixr: function (local_321) {
                                                                                                                                                           return writeMutArray({index: index
                                                                                                                                                                                ,object: local_313.__array
                                                                                                                                                                                ,value: local_321});
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
                                                 ,infixr: function (local_322) {
                                                    return _3b_({infixl: readMutRef(pivotPosRef)
                                                                ,infixr: function (index1) {
                                                                   return _3b_({infixl: writeMutArray({index: index1
                                                                                                      ,object: local_313.__array
                                                                                                      ,value: pivot})
                                                                               ,infixr: function (local_323) {
                                                                                  return _3b_({infixl: sort1({start: local_313.start
                                                                                                             ,stop: index1
                                                                                                             ,_3c_: local_313._3c_
                                                                                                             ,__array: local_313.__array})
                                                                                              ,infixr: function (local_324) {
                                                                                                 return sort1({start: _2b_({infixl: index1
                                                                                                                           ,infixr: 1.0})
                                                                                                              ,stop: local_313.stop
                                                                                                              ,_3c_: local_313._3c_
                                                                                                              ,__array: local_313.__array});
                                                                                              }});
                                                                               }});
                                                                }});
                                                 }});
                                  }});
                   }});
     case "true":
       var local_325 = x.data;
       return __return({});
     default:
       throw rts.exceptions.UnhandledCase("DEF_7dc48073b9e642f0921b10b11676f38b"
                                         ,"767c3133b4f8a61071c98bc4f445f9a6");
   }
};
var sort = function (local_310) {
   return runMutArray(_3b_({infixl: newMutArray1(local_310.list)
                           ,infixr: function (__array3) {
                              return _3b_({infixl: length4(__array3)
                                          ,infixr: function (local_312) {
                                             return _3b_({infixl: sort1({start: 0.0
                                                                        ,stop: local_312
                                                                        ,_3c_: local_310._3c_
                                                                        ,__array: __array3})
                                                         ,infixr: function (local_326) {
                                                            return __return(__array3);
                                                         }});
                                          }});
                           }}));
};
var foldLazy1 = function (local_345) {
   return foldLazy({list: local_345.list
                   ,initial: function (local_346) {
                      return local_345.done;
                   }
                   ,binop: function (local_347) {
                      return function (state) {
                             return local_345.step({state: state
                                                   ,rest: local_347.rest
                                                   ,item: local_347.item});
                          };
                   }})(local_345.initialState);
};
var group = function (local_328) {
   return foldLazy1({list: local_328.list
                    ,initialState: {tag: "empty",data: {}}
                    ,step: function (local_329) {
                       var x = function (x330) { return x330;}(local_329.state);
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_331 = x.data;
                           var x = function (x332) {
                                      return x332;
                                   }(local_328.by({infixl: local_331.head
                                                  ,infixr: local_329.item}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_333 = x.data;
                               return _3a__3a_({infixl: toArray(reverse(local_329.state))
                                               ,infixr: function (local_334) {
                                                  return local_329.rest({})(_3a__3a_({infixl: local_329.item
                                                                                     ,infixr: function (local_335) {
                                                                                        return {tag: "empty"
                                                                                               ,data: {}};
                                                                                     }}));
                                               }});
                             case "true":
                               var local_336 = x.data;
                               return local_329.rest({})(_3a__3a_({infixl: local_329.item
                                                                  ,infixr: function (local_337) {
                                                                     return local_329.state;
                                                                  }}));
                             default:
                               throw rts.exceptions.UnhandledCase("DEF_b1e58c7062114583b9357d62e817d1c6"
                                                                 ,"80c64c4a3e825d563e72c3ff848be12a");
                           }
                         case "empty":
                           var local_338 = x.data;
                           return local_329.rest({})(_3a__3a_({infixl: local_329.item
                                                              ,infixr: function (local_339) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }}));
                         default:
                           throw rts.exceptions.UnhandledCase("DEF_b1e58c7062114583b9357d62e817d1c6"
                                                             ,"74a01a012e28a30393aafbb0e69c22f4");
                       }
                    }
                    ,done: function (local_340) {
                       var x = function (x341) { return x341;}(local_340);
                       switch (x.tag)
                       {
                         case "nonEmpty":
                           var local_342 = x.data;
                           return _3a__3a_({infixl: toArray(reverse(local_340))
                                           ,infixr: function (local_343) {
                                              return {tag: "empty",data: {}};
                                           }});
                         case "empty":
                           var local_344 = x.data;
                           return {tag: "empty",data: {}};
                         default:
                           throw rts.exceptions.UnhandledCase("DEF_b1e58c7062114583b9357d62e817d1c6"
                                                             ,"44a912bc33ec9c258e1ba58d8731bdd8");
                       }
                    }});
};
var pestovalQuerySessionTeachers = function (local_304) {
   return _3b_({infixl: query({database: local_304.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_session_teachers.teacher_id, pestoval_session_teachers.session_id,\n  ")
                                                             ,b: queryFieldLang(local_304.language)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii("\nFROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_teacher ON pestoval_session_teachers.teacher_id = pestoval_teacher.id")})})
               ,infixr: function (x305) {
                  switch (x305.tag)
                  {
                    case "error":
                      var local_306 = x305.data;
                      return ignoreError(local_306);
                    case "success":
                      var local_307 = x305.data;
                      return __return(toArray(map({list: group({list: fromArray(sort({list: map({list: fromArray(local_307.__data)
                                                                                                ,mapping: function (local_308) {
                                                                                                   return {teacher: {name: item({index: 2.0
                                                                                                                                ,object: local_308})
                                                                                                                    ,id: parseInt(item({index: 0.0
                                                                                                                                       ,object: local_308}))}
                                                                                                          ,session: parseInt(item({index: 1.0
                                                                                                                                  ,object: local_308}))};
                                                                                                }})
                                                                                     ,_3c_: function (local_309) {
                                                                                        return _3c_({infixl: local_309.infixl.session
                                                                                                    ,infixr: local_309.infixr.session});
                                                                                     }}))
                                                               ,by: function (local_327) {
                                                                  return _3d__3d_({infixl: local_327.infixl.session
                                                                                  ,infixr: local_327.infixr.session});
                                                               }})
                                                  ,mapping: function (local_348) {
                                                     return {value: toArray(map({list: fromArray(local_348)
                                                                                ,mapping: function (local_349) {
                                                                                   return local_349.teacher;
                                                                                }}))
                                                            ,key: item({index: 0.0
                                                                       ,object: local_348}).session};
                                                  }})));
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_de80144d74df47438852d18bad3b3eaf"
                                                        ,"9800f3fc1326d8ea5b4af24b15b823d4");
                  }
               }});
};
var _3e__3d__3c_ = function (local_357) {
   var x = function (x358) {
              return x358;
           }(_3d__3d_({infixl: local_357.__x,infixr: local_357.y}));
   switch (x.tag)
   {
     case "false":
       var local_359 = x.data;
       var x = function (x360) {
                  return x360;
               }(_3c_({infixl: local_357.__x,infixr: local_357.y}));
       switch (x.tag)
       {
         case "false":
           var local_361 = x.data;
           return {tag: "_3e_",data: {}};
         case "true":
           var local_362 = x.data;
           return {tag: "_3c_",data: {}};
         default:
           throw rts.exceptions.UnhandledCase("DEF_710304e7117b480ba76d20139b3980c1"
                                             ,"b36d82ac26521ea940b13add4c373a2c");
       }
     case "true":
       var local_363 = x.data;
       return {tag: "_3d__3d_",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_710304e7117b480ba76d20139b3980c1"
                                         ,"508e7c4e652cf07b779c96cd2344172c");
   }
};
var _2f_ = rts.builtins.Prelude["/"];
var floor = function (local_368) {
   return _2d_({infixl: local_368,infixr: _25_({infixl: local_368,infixr: 1.0})});
};
var search1 = function (local_365) {
   var x = function (x366) {
              return x366;
           }(_2265_({infixl: local_365.start,infixr: local_365.stop}));
   switch (x.tag)
   {
     case "false":
       var local_367 = x.data;
       var pivot1 = floor(_2f_({infixl: _2b_({infixl: local_365.start
                                             ,infixr: local_365.stop})
                               ,infixr: 2.0}));
       var x = local_365.compareTo(pivot1);
       switch (x.tag)
       {
         case "_3e_":
           var local_369 = x.data;
           return search1({start: _2b_({infixl: pivot1,infixr: 1.0})
                          ,stop: local_365.stop
                          ,compareTo: local_365.compareTo});
         case "_3c_":
           var local_370 = x.data;
           return search1({start: local_365.start
                          ,stop: pivot1
                          ,compareTo: local_365.compareTo});
         case "_3d__3d_":
           var local_371 = x.data;
           return {tag: "just",data: pivot1};
         default:
           throw rts.exceptions.UnhandledCase("DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                             ,"c6c8b9c428c0b8b42ffc038b0554d06b");
       }
     case "true":
       var local_372 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                         ,"c22774ac01ba95da7d4aa96a5694962d");
   }
};
var search = function (local_364) {
   return search1({start: 0.0
                  ,stop: length1(local_364.sorted)
                  ,compareTo: function (index3) {
                     return local_364.compareTo(item({index: index3
                                                     ,object: local_364.sorted}));
                  }});
};
var lookup = function (local_355) {
   var x = function (x373) {
              return x373;
           }(search({compareTo: function (local_356) {
                       return _3e__3d__3c_({y: local_356.key,__x: local_355.key});
                    }
                    ,sorted: local_355.sorted}));
   switch (x.tag)
   {
     case "just":
       var index4 = x.data;
       return {tag: "just",data: item({index: index4,object: local_355.sorted}).value};
     case "nothing":
       var local_374 = x.data;
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
var index5 = function (local_384) {
   var x = function (x385) {
              return x385;
           }(first({that: function (index6) {
                      return _3d__3d_({infixl: item({index: index6
                                                    ,object: local_384.__array})
                                      ,infixr: local_384.item});
                   }
                   ,list: _2e__2e_({start: 0.0,stop: length1(local_384.__array)})}));
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_386 = x.data;
       throw rts.exceptions.ReachedHole("DEF_bb1f3635a22340e9b8036656619efdc1"
                                       ,"a094b56eeb4c432e8222c2c5cdf9737b");
     default:
       throw rts.exceptions.UnhandledCase("DEF_bb1f3635a22340e9b8036656619efdc1"
                                         ,"eafac946fbbd2eb5e94b628a7f5d6613");
   }
};
var monthNames =
toArray(split({text: rts.bytesFromAscii("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec")
              ,seperator: rts.bytesFromAscii(" ")}));
var parseDateTime = function (text2) {
   var local_377 = toArray(split({text: text2,seperator: rts.bytesFromAscii(" ")}));
   var item3 = function (local_378) { return item({index: local_378,object: local_377});};
   var local_379 = toArray(split({text: item3(4.0),seperator: rts.bytesFromAscii(":")}));
   var local_381 = function (local_380) {
      return parseInt(item({index: local_380,object: local_379}));
   };
   return {time: {timezone: unwords(_3a__3a_({infixl: item3(5.0)
                                             ,infixr: function (local_382) {
                                                return _3a__3a_({infixl: item3(6.0)
                                                                ,infixr: function (local_383) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }}))
                 ,minute: local_381(1.0)
                 ,second: local_381(2.0)
                 ,hour: local_381(0.0)}
          ,date: {weekDay: _2b_({infixl: index5({__array: dayNames,item: item3(0.0)})
                                ,infixr: 1.0})
                 ,month: _2b_({infixl: index5({__array: monthNames,item: item3(1.0)})
                              ,infixr: 1.0})
                 ,day: parseInt(item3(2.0))
                 ,year: parseInt(item3(3.0))}};
};
var pestovalParseSessions = function (local_303) {
   return _3b_({infixl: pestovalQuerySessionTeachers({database: local_303.database
                                                     ,language: local_303.language})
               ,infixr: function (teachers) {
                  var field1 = function (local_350) {
                     var x = function (x351) {
                                return x351;
                             }(first({that: function (index2) {
                                        return _3d__3d_({infixl: item({index: index2
                                                                      ,object: local_303.fields})
                                                        ,infixr: local_350});
                                     }
                                     ,list: _2e__2e_({start: 0.0
                                                     ,stop: length1(local_303.fields)})}));
                     switch (x.tag)
                     {
                       case "just":
                         return id(x.data);
                       case "nothing":
                         var local_352 = x.data;
                         throw rts.exceptions.ReachedHole("DEF_0d80200b94eb4fae821b1fc737bf4136"
                                                         ,"a8dea6e428906f6970698acdd1c10cbd");
                       default:
                         throw rts.exceptions.UnhandledCase("DEF_0d80200b94eb4fae821b1fc737bf4136"
                                                           ,"ca9c646dae236b23539d3c03280dc8af");
                     }
                  };
                  var session1 = field1(rts.bytesFromAscii("id"));
                  var when = {start: field1(rts.bytesFromAscii("start"))
                             ,stop: field1(rts.bytesFromAscii("stop"))
                             ,id: field1(rts.bytesFromAscii("timeslot_id"))};
                  var name = field1(rts.bytesFromAscii("session_name"));
                  var level = {name: field1(rts.bytesFromAscii("level_name"))
                              ,id: field1(rts.bytesFromAscii("level_id"))
                              ,color: field1(rts.bytesFromAscii("color"))};
                  var place = {name: field1(rts.bytesFromAscii("location_name"))
                              ,id: field1(rts.bytesFromAscii("location_id"))
                              ,order: field1(rts.bytesFromAscii("location_ordering"))};
                  var description = field1(rts.bytesFromAscii("description"));
                  var prereqs = field1(rts.bytesFromAscii("prereqs"));
                  return __return(toArray(map({list: fromArray(local_303.__data)
                                              ,mapping: function (local_353) {
                                                 var item2 = function (local_354) {
                                                    return item({index: local_354
                                                                ,object: local_353});
                                                 };
                                                 var id1 = parseInt(item2(session1));
                                                 return {prereqs: item2(prereqs)
                                                        ,name: item2(name)
                                                        ,place: {name: item2(place.name)
                                                                ,id: parseInt(item2(place.id))
                                                                ,order: parseInt(item2(place.order))}
                                                        ,description: item2(description)
                                                        ,teachers: function () {
                                                           var x = function (x375) {
                                                                      return x375;
                                                                   }(lookup({key: id1
                                                                            ,sorted: teachers}));
                                                           switch (x.tag)
                                                           {
                                                             case "just":
                                                               return id(x.data);
                                                             case "nothing":
                                                               var local_376 = x.data;
                                                               return [];
                                                             default:
                                                               throw rts.exceptions.UnhandledCase("DEF_0d80200b94eb4fae821b1fc737bf4136"
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
                      return pestovalParseSessions({__data: local_302.__data
                                                   ,database: local_251.database
                                                   ,fields: local_302.fields
                                                   ,language: local_251.language});
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                        ,"b7f232d070f067bfe76ad6b4679cb4aa");
                  }
               }});
};
var _22f2_ = function (local_391) {
   return {root: local_391.infixl,subTrees: local_391.infixr};
};
var leaf = function (local_390) { return _22f2_({infixl: local_390,infixr: []});};
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
var replicate = function (local_467) {
   var x = function (x468) { return x468;}(_2264_({infixl: local_467.count,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_469 = x.data;
       return {tag: "nonEmpty"
              ,data: {head: local_467.item
                     ,tail: function (local_470) {
                        return replicate({count: _2d_({infixl: local_467.count
                                                      ,infixr: 1.0})
                                         ,item: local_467.item});
                     }}};
     case "true":
       var local_471 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_70f79762f05c41ccb9677f7a60746680"
                                         ,"3b53ee6d875f49f4acdb9a2e8b33fb2d");
   }
};
var rightJustify = function (local_463) {
   var count = _2d_({infixl: local_463.length
                    ,infixr: length(function (x464) {
                       return x464;
                    }(local_463.text))});
   var x = function (x465) { return x465;}(_2264_({infixl: count,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_466 = x.data;
       return _2b__2b_({a: toBytes(toArray(replicate({count: count
                                                     ,item: local_463.character})))
                       ,b: local_463.text});
     case "true":
       var local_472 = x.data;
       return local_463.text;
     default:
       throw rts.exceptions.UnhandledCase("DEF_c96ce62be72e4d1e85d07af16867169d"
                                         ,"ea6106b4e471dead7c7d3638866db4a1");
   }
};
var showTime = function (local_457) {
   return join({texts: map({list: _3a__3a_({infixl: function (x458) {
                                              return x458;
                                           }(local_457).hour
                                           ,infixr: function (local_459) {
                                              return _3a__3a_({infixl: function (x460) {
                                                                 return x460;
                                                              }(local_457).minute
                                                              ,infixr: function (local_461) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }})
                           ,mapping: function (local_462) {
                              return rightJustify({length: 2.0
                                                  ,text: showNum(local_462)
                                                  ,character: 48.0});
                           }})
               ,seperator: rts.bytesFromAscii(":")});
};
var formatTimeSlot = function (local_452) {
   return join({texts: _3a__3a_({infixl: item({index: _2d_({infixl: function (x453) {
                                                              return x453;
                                                           }(local_452.timeSlot.start.date).weekDay
                                                           ,infixr: 1.0})
                                              ,object: function () {
                                                 var x = local_452.language;
                                                 switch (x.tag)
                                                 {
                                                   case "english":
                                                     var local_454 = x.data;
                                                     return dayNames;
                                                   case "hebrew":
                                                     var local_455 = x.data;
                                                     return dayNamesHebrew;
                                                   default:
                                                     throw rts.exceptions.UnhandledCase("DEF_4fed722dd3634c0db388c78e255c1429"
                                                                                       ,"5582218e01f5831eae7835c315a758c0");
                                                 }
                                              }()})
                                ,infixr: function (local_456) {
                                   return _3a__3a_({infixl: showTime(local_452.timeSlot.start.time)
                                                   ,infixr: function (local_473) {
                                                      return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                      ,infixr: function (local_474) {
                                                                         return _3a__3a_({infixl: showTime(local_452.timeSlot.stop.time)
                                                                                         ,infixr: function (local_475) {
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
var pestovalSessionInfo = function (local_417) {
   var local_421 = function (local_418) {
      return _22f2_({infixl: rts.bytesFromAscii("<p>")
                    ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<b>")
                                     ,infixr: singleton(leaf(local_418.key))})
                             ,leaf(local_418.value)]});
   };
   var teacher1 = function (local_422) {
      return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/")
                                              ,infixr: function (local_423) {
                                                 return _3a__3a_({infixl: function () {
                                                                    var x =
                                                                    local_417.language;
                                                                    switch (x.tag)
                                                                    {
                                                                      case "english":
                                                                        var local_424 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("eng");
                                                                      case "hebrew":
                                                                        var local_425 =
                                                                        x.data;
                                                                        return rts.bytesFromAscii("heb");
                                                                      default:
                                                                        throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                          ,"25c06dfd8f7a82ef041d5e079e02e218");
                                                                    }
                                                                 }()
                                                                 ,infixr: function (local_426) {
                                                                    return _3a__3a_({infixl: rts.bytesFromAscii("/teacher/")
                                                                                    ,infixr: function (local_427) {
                                                                                       return _3a__3a_({infixl: showNum(local_422.id)
                                                                                                       ,infixr: function (local_428) {
                                                                                                          return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                          ,infixr: function (local_429) {
                                                                                                                             return {tag: "empty"
                                                                                                                                    ,data: {}};
                                                                                                                          }});
                                                                                                       }});
                                                                                    }});
                                                                 }});
                                              }}))
                    ,infixr: singleton(leaf(local_422.name))});
   };
   return toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                           ,infixr: function () {
                                              var x = function (x430) {
                                                         return x430;
                                                      }(fromArray(local_417.session.teachers));
                                              switch (x.tag)
                                              {
                                                case "nonEmpty":
                                                  var local_431 = x.data;
                                                  return toArray(_3a__3a_({infixl: teacher1(local_431.head)
                                                                          ,infixr: function (local_432) {
                                                                             return _2b__2b_2({infixl: concat(map({list: local_431.tail({})
                                                                                                                  ,mapping: function (local_433) {
                                                                                                                     return _3a__3a_({infixl: leaf(function () {
                                                                                                                                        var x =
                                                                                                                                        local_417.language;
                                                                                                                                        switch (x.tag)
                                                                                                                                        {
                                                                                                                                          case "english":
                                                                                                                                            var local_434 =
                                                                                                                                            x.data;
                                                                                                                                            return rts.bytesFromAscii(" & ");
                                                                                                                                          case "hebrew":
                                                                                                                                            var local_435 =
                                                                                                                                            x.data;
                                                                                                                                            return rts.bytes([32
                                                                                                                                                             ,215
                                                                                                                                                             ,149]);
                                                                                                                                          default:
                                                                                                                                            throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                                                                              ,"9750a7059a5af134d0eb3dcae276f1a7");
                                                                                                                                        }
                                                                                                                                     }())
                                                                                                                                     ,infixr: function (local_436) {
                                                                                                                                        return _3a__3a_({infixl: teacher1(local_433)
                                                                                                                                                        ,infixr: function (local_437) {
                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                  ,data: {}};
                                                                                                                                                        }});
                                                                                                                                     }});
                                                                                                                  }}))
                                                                                              ,infixr: function (local_438) {
                                                                                                 return _3a__3a_({infixl: leaf(_2b__2b_({a: rts.bytesFromAscii(": ")
                                                                                                                                        ,b: local_417.session.name}))
                                                                                                                 ,infixr: function (local_439) {
                                                                                                                    return {tag: "empty"
                                                                                                                           ,data: {}};
                                                                                                                 }});
                                                                                              }});
                                                                          }}));
                                                case "empty":
                                                  var local_440 = x.data;
                                                  return singleton(leaf(local_417.session.name));
                                                default:
                                                  throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                    ,"ed7be6bad9f71095a62be6746bf728a3");
                                              }
                                           }()})
                           ,infixr: function (local_441) {
                              return _2b__2b_2({infixl: function () {
                                                  var x = function (x442) {
                                                             return x442;
                                                          }(local_417.password);
                                                  switch (x.tag)
                                                  {
                                                    case "just":
                                                      var local_443 = x.data;
                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                      ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<a href=\"/eng/edit/")
                                                                                                                                               ,infixr: function (local_444) {
                                                                                                                                                  return _3a__3a_({infixl: showNum(local_417.session.id)
                                                                                                                                                                  ,infixr: function (local_445) {
                                                                                                                                                                     return _3a__3a_({infixl: rts.bytesFromAscii("/")
                                                                                                                                                                                     ,infixr: function (local_446) {
                                                                                                                                                                                        return _3a__3a_({infixl: local_443
                                                                                                                                                                                                        ,infixr: function (local_447) {
                                                                                                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("/\">")
                                                                                                                                                                                                                           ,infixr: function (local_448) {
                                                                                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                                                                           }});
                                                                                                                                                                                                        }});
                                                                                                                                                                                     }});
                                                                                                                                                                  }});
                                                                                                                                               }})
                                                                                                                              ,seperator: rts.bytesFromAscii("")})
                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("Edit details")))}))})
                                                                      ,infixr: function (local_449) {
                                                                         return {tag: "empty"
                                                                                ,data: {}};
                                                                      }});
                                                    case "nothing":
                                                      var local_450 = x.data;
                                                      return {tag: "empty",data: {}};
                                                    default:
                                                      throw rts.exceptions.UnhandledCase("DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                        ,"fad3e2035a95ac24b0214f741995983a");
                                                  }
                                               }()
                                               ,infixr: function (local_451) {
                                                  return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<b>")
                                                                                  ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_417.session.when
                                                                                                                         ,language: local_417.language})))})
                                                                  ,infixr: function (local_476) {
                                                                     return _3a__3a_({infixl: local_421({value: local_417.session.place.name
                                                                                                        ,key: function () {
                                                                                                           var x =
                                                                                                           local_417.language;
                                                                                                           switch (x.tag)
                                                                                                           {
                                                                                                             case "english":
                                                                                                               var local_477 =
                                                                                                               x.data;
                                                                                                               return rts.bytesFromAscii("Where: ");
                                                                                                             case "hebrew":
                                                                                                               var local_478 =
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
                                                                                     ,infixr: function (local_479) {
                                                                                        return _3a__3a_({infixl: local_421({value: local_417.session.level.name
                                                                                                                           ,key: function () {
                                                                                                                              var x =
                                                                                                                              local_417.language;
                                                                                                                              switch (x.tag)
                                                                                                                              {
                                                                                                                                case "english":
                                                                                                                                  var local_480 =
                                                                                                                                  x.data;
                                                                                                                                  return rts.bytesFromAscii("Who: ");
                                                                                                                                case "hebrew":
                                                                                                                                  var local_481 =
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
                                                                                                        ,infixr: function (local_482) {
                                                                                                           return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                           ,infixr: singleton(leaf(function () {
                                                                                                                                              var x =
                                                                                                                                              local_417.language;
                                                                                                                                              switch (x.tag)
                                                                                                                                              {
                                                                                                                                                case "english":
                                                                                                                                                  var local_483 =
                                                                                                                                                  x.data;
                                                                                                                                                  return rts.bytesFromAscii("Description:");
                                                                                                                                                case "hebrew":
                                                                                                                                                  var local_484 =
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
                                                                                                                           ,infixr: function (local_485) {
                                                                                                                              var local_486 =
                                                                                                                              function (text3) {
                                                                                                                                 return replace({text: text3
                                                                                                                                                ,from: rts.bytesFromAscii("\n")
                                                                                                                                                ,to: rts.bytesFromAscii("<br/>\n")});
                                                                                                                              };
                                                                                                                              return _3a__3a_({infixl: htmlParagraph(local_486(local_417.session.description))
                                                                                                                                              ,infixr: function (local_487) {
                                                                                                                                                 return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                 ,infixr: singleton(leaf(function () {
                                                                                                                                                                                    var x =
                                                                                                                                                                                    local_417.language;
                                                                                                                                                                                    switch (x.tag)
                                                                                                                                                                                    {
                                                                                                                                                                                      case "english":
                                                                                                                                                                                        var local_488 =
                                                                                                                                                                                        x.data;
                                                                                                                                                                                        return rts.bytesFromAscii("Prereqs:");
                                                                                                                                                                                      case "hebrew":
                                                                                                                                                                                        var local_489 =
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
                                                                                                                                                                 ,infixr: function (local_490) {
                                                                                                                                                                    return _3a__3a_({infixl: htmlParagraph(local_486(local_417.session.prereqs))
                                                                                                                                                                                    ,infixr: function (local_491) {
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
var htmlPopup = function (local_492) {
   return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<div id=\"")
                                           ,infixr: function (local_493) {
                                              return _3a__3a_({infixl: local_492.id
                                                              ,infixr: function (local_494) {
                                                                 return _3a__3a_({infixl: rts.bytesFromAscii("\" class=\"overlay\">")
                                                                                 ,infixr: function (local_495) {
                                                                                    return {tag: "empty"
                                                                                           ,data: {}};
                                                                                 }});
                                                              }});
                                           }}))
                 ,infixr: [_22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<div class=\"popup\" style=\"background-color:")
                                                            ,infixr: function (local_496) {
                                                               return _3a__3a_({infixl: local_492.color
                                                                               ,infixr: function (local_497) {
                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii("\">")
                                                                                                  ,infixr: function (local_498) {
                                                                                                     return {tag: "empty"
                                                                                                            ,data: {}};
                                                                                                  }});
                                                                               }});
                                                            }}))
                                  ,infixr: local_492.content})]});
};
var pestovalSessionCell = function (local_393) {
   var local_394 = _2b__2b_({a: rts.bytesFromAscii("popup-")
                            ,b: showNum(local_393.session.id)});
   return _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<td style=\"border:2pt solid white; text-align:center; background-color:")
                                           ,infixr: function (local_395) {
                                              var color = local_393.session.level.color;
                                              return _3a__3a_({infixl: function () {
                                                                 var x = function (x396) {
                                                                            return x396;
                                                                         }(_3d__3d_({infixl: color
                                                                                    ,infixr: rts.bytesFromAscii("null")}));
                                                                 switch (x.tag)
                                                                 {
                                                                   case "false":
                                                                     var local_397 =
                                                                     x.data;
                                                                     return color;
                                                                   case "true":
                                                                     var local_398 =
                                                                     x.data;
                                                                     return rts.bytesFromAscii("#eee");
                                                                   default:
                                                                     throw rts.exceptions.UnhandledCase("DEF_9020eea8542142a09c1a8813ef9990af"
                                                                                                       ,"8af192079f77d68114daa54992f28614");
                                                                 }
                                                              }()
                                                              ,infixr: function (local_399) {
                                                                 return _3a__3a_({infixl: rts.bytesFromAscii(";")
                                                                                 ,infixr: function (local_400) {
                                                                                    return _3a__3a_({infixl: local_393.style
                                                                                                    ,infixr: function (local_401) {
                                                                                                       return _3a__3a_({infixl: rts.bytesFromAscii("\" ")
                                                                                                                       ,infixr: function (local_402) {
                                                                                                                          return _3a__3a_({infixl: local_393.attributes
                                                                                                                                          ,infixr: function (local_403) {
                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(">")
                                                                                                                                                             ,infixr: function (local_404) {
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
                    var x = function (x407) {
                               return x407;
                            }(_26__26_({infixl: _3d__3d_({infixl: local_393.session.description
                                                         ,infixr: rts.bytesFromAscii("")})
                                       ,infixr: function (local_405) {
                                          return _26__26_({infixl: _3d__3d_({infixl: local_393.session.prereqs
                                                                            ,infixr: rts.bytesFromAscii("")})
                                                          ,infixr: function (local_406) {
                                                             return _3d__3d_({infixl: local_393.password
                                                                             ,infixr: {tag: "nothing"
                                                                                      ,data: {}}});
                                                          }});
                                       }}));
                    switch (x.tag)
                    {
                      case "false":
                        var local_408 = x.data;
                        return _3a__3a_({infixl: leaf(concat1(_3a__3a_({infixl: rts.bytesFromAscii("<input type=\"checkbox\" id=\"")
                                                                       ,infixr: function (local_409) {
                                                                          return _3a__3a_({infixl: local_394
                                                                                          ,infixr: function (local_410) {
                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii("\" style=\"display: none;\"/>")
                                                                                                             ,infixr: function (local_411) {
                                                                                                                return {tag: "empty"
                                                                                                                       ,data: {}};
                                                                                                             }});
                                                                                          }});
                                                                       }})))
                                        ,infixr: function (local_412) {
                                           return _3a__3a_({infixl: _22f2_({infixl: concat1(_3a__3a_({infixl: rts.bytesFromAscii("<label for=\"")
                                                                                                     ,infixr: function (local_413) {
                                                                                                        return _3a__3a_({infixl: local_394
                                                                                                                        ,infixr: function (local_414) {
                                                                                                                           return _3a__3a_({infixl: rts.bytesFromAscii("\">")
                                                                                                                                           ,infixr: function (local_415) {
                                                                                                                                              return {tag: "empty"
                                                                                                                                                     ,data: {}};
                                                                                                                                           }});
                                                                                                                        }});
                                                                                                     }}))
                                                                           ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<div style=\"text-decoration:underline\">")
                                                                                            ,infixr: toArray(local_393.content)})
                                                                                    ,htmlPopup({content: pestovalSessionInfo({password: local_393.password
                                                                                                                             ,language: local_393.language
                                                                                                                             ,session: local_393.session})
                                                                                               ,id: local_394
                                                                                               ,color: local_393.session.level.color})]})
                                                           ,infixr: function (local_501) {
                                                              return {tag: "empty"
                                                                     ,data: {}};
                                                           }});
                                        }});
                      case "true":
                        var local_502 = x.data;
                        return local_393.content;
                      default:
                        throw rts.exceptions.UnhandledCase("DEF_9020eea8542142a09c1a8813ef9990af"
                                                          ,"ca251d05869f9c09e61c190e8fb9840b");
                    }
                 }())});
};
var htmlTable = function (local_503) {
   return _22f2_({infixl: _2b__2b_({a: rts.bytesFromAscii("<table width=\"100%\" style=\"table-layout:fixed; border-collapse:collapse\"")
                                   ,b: function () {
                                      var x = local_503.language;
                                      switch (x.tag)
                                      {
                                        case "english":
                                          var local_504 = x.data;
                                          return rts.bytesFromAscii(">");
                                        case "hebrew":
                                          var local_505 = x.data;
                                          return rts.bytesFromAscii(" dir=\"rtl\">");
                                        default:
                                          throw rts.exceptions.UnhandledCase("DEF_c270fb6c0aee498e865b7bf936941c16"
                                                                            ,"3593d20a3691e4acedfdfbe5a1b33cdf");
                                      }
                                   }()})
                 ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<tbody>")
                                           ,infixr: local_503.body}))});
};
var pestovalManageFloating = function (local_250) {
   return _3b_({infixl: pestovalQuerySessions({database: local_250.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: {tag: "english",data: {}}
                                              ,filter: {tag: "just"
                                                       ,data: rts.bytesFromAscii("pestoval_session.location_id IS NULL")}})
               ,infixr: function (local_387) {
                  return __return(function () {
                         var x = function (x388) {
                                    return x388;
                                 }(_3d__3d_({infixl: length1(local_387),infixr: 0.0}));
                         switch (x.tag)
                         {
                           case "false":
                             var local_389 = x.data;
                             return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Floating Sessions")))})
                                             ,infixr: function (local_392) {
                                                return _3a__3a_({infixl: htmlTable({body: toArray(map({list: fromArray(local_387)
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
                                                                ,infixr: function (local_506) {
                                                                   return {tag: "empty"
                                                                          ,data: {}};
                                                                }});
                                             }});
                           case "true":
                             var local_507 = x.data;
                             return {tag: "empty",data: {}};
                           default:
                             throw rts.exceptions.UnhandledCase("DEF_d40cade7acd3445089af06cfb0ca8c08"
                                                               ,"3aeafeb193f3926d38156605e21596e9");
                         }
                      }());
               }});
};
var pestovalQueryTeachers = function (local_510) {
   return _3b_({infixl: query({database: local_510.database
                              ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT\n  pestoval_teacher.id, ")
                                                             ,b: queryFieldLang(local_510.language)(pestovalTeacherName)})
                                                ,b: rts.bytesFromAscii(", pestoval_teacher.password\n\nFROM pestoval_teacher\nORDER BY name")})})
               ,infixr: function (x511) {
                  switch (x511.tag)
                  {
                    case "error":
                      var local_512 = x511.data;
                      return ignoreError(local_512);
                    case "success":
                      var local_513 = x511.data;
                      return __return(toArray(map({list: fromArray(local_513.__data)
                                                  ,mapping: function (local_514) {
                                                     return {name: item({index: 1.0
                                                                        ,object: local_514})
                                                            ,password: item({index: 2.0
                                                                            ,object: local_514})
                                                            ,id: parseInt(item({index: 0.0
                                                                               ,object: local_514}))};
                                                  }})));
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_41c05c33b7354982a8a4a555048c1eb3"
                                                        ,"9ddd75e6d73b06295a0c649ed6da5f00");
                  }
               }});
};
var pestovalManageTeachers = function (local_509) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_509.database
                                              ,language: {tag: "english",data: {}}})
               ,infixr: function (teachers1) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_515) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(map({list: fromArray(teachers1)
                                                                                                   ,mapping: function (local_516) {
                                                                                                      var local_518 =
                                                                                                      function (local_517) {
                                                                                                         return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<a href=\"/eng/teacher/")
                                                                                                                                                                ,b: showNum(local_516.id)})
                                                                                                                                                   ,b: rts.bytesFromAscii("/")})
                                                                                                                                      ,b: local_517})
                                                                                                                         ,b: rts.bytesFromAscii("/\">")});
                                                                                                      };
                                                                                                      return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                    ,infixr: [_22f2_({infixl: local_518(local_509.password)
                                                                                                                                     ,infixr: singleton(leaf(local_516.name))})
                                                                                                                             ,leaf(rts.bytesFromAscii(" "))
                                                                                                                             ,_22f2_({infixl: local_518(local_516.password)
                                                                                                                                     ,infixr: singleton(leaf(rts.bytesFromAscii("(personal link)")))})]});
                                                                                                   }}))})
                                                              ,infixr: function (local_522) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var sequence = function (list7) {
   return foldLazy({list: list7
                   ,initial: function (local_526) {
                      return __return({tag: "empty",data: {}});
                   }
                   ,binop: function (local_527) {
                      return _3b_({infixl: local_527.item
                                  ,infixr: function (local_528) {
                                     return _3b_({infixl: local_527.rest({})
                                                 ,infixr: function (local_529) {
                                                    return __return({tag: "nonEmpty"
                                                                    ,data: {head: local_528
                                                                           ,tail: function (local_530) {
                                                                              return local_529;
                                                                           }}});
                                                 }});
                                  }});
                   }});
};
var renderHtml = rts.builtins.Optimized["renderHtml"];
var httpOk200 = {message: rts.bytesFromAscii("OK"),code: 200.0};
var pestovalPage = function (local_532) {
   return {content: {__data: function (x538) {
                       return x538;
                    }(_2b__2b_({a: rts.bytesFromAscii("<!DOCTYPE html>\n")
                               ,b: renderHtml(_22f2_({infixl: rts.bytesFromAscii("<html>")
                                                     ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<head>")
                                                                      ,infixr: [leaf(rts.bytesFromAscii("<meta charset=\"utf-8\" />"))
                                                                               ,_22f2_({infixl: rts.bytesFromAscii("<title>")
                                                                                       ,infixr: singleton(leaf(local_532.title))})
                                                                               ,_22f2_({infixl: rts.bytesFromAscii("<script>")
                                                                                       ,infixr: singleton(leaf(rts.bytesFromAscii("(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\nm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n})(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\');\n\nga(\'create\', \'UA-97731165-1\', \'auto\');\nga(\'send\', \'pageview\');")))})]})
                                                              ,_22f2_({infixl: rts.bytesFromAscii("<body>")
                                                                      ,infixr: local_532.body})]}))}))
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
                                                             ,infixr: function (local_508) {
                                                                return _3a__3a_({infixl: pestovalManageTeachers({database: local_244.database
                                                                                                                ,password: password2})
                                                                                ,infixr: function (local_523) {
                                                                                   return _3a__3a_({infixl: __return(_3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"/eng/new/")
                                                                                                                                                                             ,b: password2})
                                                                                                                                                                ,b: rts.bytesFromAscii("\">")})
                                                                                                                                              ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Add new session")))}))})
                                                                                                                              ,infixr: function (local_524) {
                                                                                                                                 return {tag: "empty"
                                                                                                                                        ,data: {}};
                                                                                                                              }}))
                                                                                                   ,infixr: function (local_525) {
                                                                                                      return {tag: "empty"
                                                                                                             ,data: {}};
                                                                                                   }});
                                                                                }});
                                                             }}))
                                  ,infixr: function (local_531) {
                                     return __return(pestovalPage({title: rts.bytesFromAscii("Manage")
                                                                  ,body: toArray(concat(local_531))}));
                                  }});
                    default:
                      var local_539 = x248;
                      return __return(pestovalUnauthorized);
                  }
               }});
};
var getSession = function (local_543) {
   var filter = {tag: "just"
                ,data: _2b__2b_({a: rts.bytesFromAscii("pestoval_session.id = ")
                                ,b: showNum(local_543.id)})};
   return _3b_({infixl: pestovalQuerySessions({database: local_543.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: {tag: "english",data: {}}
                                              ,filter: filter})
               ,infixr: function (local_544) {
                  return _3b_({infixl: pestovalQuerySessions({database: local_543.database
                                                             ,teacher: {tag: "nothing"
                                                                       ,data: {}}
                                                             ,language: {tag: "hebrew"
                                                                        ,data: {}}
                                                             ,filter: filter})
                              ,infixr: function (local_545) {
                                 return __return(function () {
                                        var x = function (x547) {
                                                   return x547;
                                                }(_26__26_({infixl: _3d__3d_({infixl: length1(local_544)
                                                                             ,infixr: 1.0})
                                                           ,infixr: function (local_546) {
                                                              return _3d__3d_({infixl: length1(local_545)
                                                                              ,infixr: 1.0});
                                                           }}));
                                        switch (x.tag)
                                        {
                                          case "false":
                                            var local_548 = x.data;
                                            return {tag: "nothing",data: {}};
                                          case "true":
                                            var local_549 = x.data;
                                            var english = item({index: 0.0
                                                               ,object: local_544});
                                            var hebrew = item({index: 0.0
                                                              ,object: local_545});
                                            return {tag: "just"
                                                   ,data: {prereqs: {english: english.prereqs
                                                                    ,hebrew: function () {
                                                                       var x =
                                                                       function (x550) {
                                                                          return x550;
                                                                       }(_3d__3d_({infixl: hebrew.prereqs
                                                                                  ,infixr: english.prereqs}));
                                                                       switch (x.tag)
                                                                       {
                                                                         case "false":
                                                                           var local_551 =
                                                                           x.data;
                                                                           return hebrew.prereqs;
                                                                         case "true":
                                                                           var local_552 =
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
                                                                    function (x553) {
                                                                       return x553;
                                                                    }(_3d__3d_({infixl: hebrew.name
                                                                               ,infixr: english.name}));
                                                                    switch (x.tag)
                                                                    {
                                                                      case "false":
                                                                        var local_554 =
                                                                        x.data;
                                                                        return hebrew.name;
                                                                      case "true":
                                                                        var local_555 =
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
                                                                           function (x556) {
                                                                              return x556;
                                                                           }(_3d__3d_({infixl: hebrew.description
                                                                                      ,infixr: english.description}));
                                                                           switch (x.tag)
                                                                           {
                                                                             case "false":
                                                                               var local_557 =
                                                                               x.data;
                                                                               return hebrew.description;
                                                                             case "true":
                                                                               var local_558 =
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
var allOf = function (local_583) {
   return foldLazy({list: local_583.list
                   ,initial: function (local_584) {
                      return {tag: "true",data: {}};
                   }
                   ,binop: function (local_585) {
                      return _26__26_({infixl: local_583.satisfy(local_585.item)
                                      ,infixr: local_585.rest});
                   }});
};
var filter1 = function (local_586) {
   var x = function (x587) { return x587;}(local_586.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_588 = x.data;
       var rest = function (local_589) {
          return filter1({list: local_588.tail({}),keep: local_586.keep});
       };
       var x = function (x590) { return x590;}(local_586.keep(local_588.head));
       switch (x.tag)
       {
         case "false":
           var local_591 = x.data;
           return rest({});
         case "true":
           var local_592 = x.data;
           return {tag: "nonEmpty",data: {head: local_588.head,tail: rest}};
         default:
           throw rts.exceptions.UnhandledCase("DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                             ,"fbe0954bea2f4c248cb91ac61e7821ba");
       }
     case "empty":
       var local_593 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                         ,"2cb5f2574b8b4e3d8e5510fee403db44");
   }
};
var teachersEditForm = function (local_572) {
   return _3b_({infixl: pestovalQueryTeachers({database: local_572.database
                                              ,language: {tag: "english",data: {}}})
               ,infixr: function (local_573) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Teachers")))})
                                           ,infixr: function (local_574) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<ul>")
                                                                              ,infixr: toArray(_2b__2b_2({infixl: map({list: fromArray(local_572.teachers)
                                                                                                                      ,mapping: function (local_575) {
                                                                                                                         return _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                       ,infixr: [leaf(local_575.name)
                                                                                                                                                ,_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<button type=\"submit\" name=\"remove_teacher\" value=\"")
                                                                                                                                                                                       ,b: showNum(local_575.id)})
                                                                                                                                                                          ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Remove")))})]});
                                                                                                                      }})
                                                                                                         ,infixr: function (local_578) {
                                                                                                            return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<li>")
                                                                                                                                            ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<label for=\"add_teacher\">")
                                                                                                                                                             ,infixr: singleton(leaf(rts.bytesFromAscii("Add:")))})
                                                                                                                                                     ,_22f2_({infixl: rts.bytesFromAscii("<select id=\"add_teacher\" name=\"add_teacher\">")
                                                                                                                                                             ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                                                                                                       ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                                                                                                       ,infixr: function (local_580) {
                                                                                                                                                                                          return map({list: filter1({list: fromArray(local_573)
                                                                                                                                                                                                                    ,keep: function (local_581) {
                                                                                                                                                                                                                       return allOf({list: fromArray(local_572.teachers)
                                                                                                                                                                                                                                    ,satisfy: function (local_582) {
                                                                                                                                                                                                                                       return _2260_({infixl: local_581.id
                                                                                                                                                                                                                                                     ,infixr: local_582.id});
                                                                                                                                                                                                                                    }});
                                                                                                                                                                                                                    }})
                                                                                                                                                                                                     ,mapping: function (local_594) {
                                                                                                                                                                                                        return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                                                                                                     ,b: showNum(local_594.id)})
                                                                                                                                                                                                                                        ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                                                                                      ,infixr: singleton(leaf(local_594.name))});
                                                                                                                                                                                                     }});
                                                                                                                                                                                       }}))})]})
                                                                                                                            ,infixr: function (local_596) {
                                                                                                                               return {tag: "empty"
                                                                                                                                      ,data: {}};
                                                                                                                            }});
                                                                                                         }}))})
                                                              ,infixr: function (local_597) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var processSimpleQuery = function (x600) {
   switch (x600.tag)
   {
     case "error":
       var local_601 = x600.data;
       return ignoreError(local_601);
     case "success":
       var local_602 = x600.data;
       return __return(toArray(map({list: fromArray(local_602.__data)
                                   ,mapping: function (local_603) {
                                      return {name: item({index: 1.0,object: local_603})
                                             ,id: parseInt(item({index: 0.0
                                                                ,object: local_603}))};
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
var levelEditForm = function (local_599) {
   return _3b_({infixl: pestovalQueryLevels(local_599.database)
               ,infixr: function (local_604) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Level")))})
                                           ,infixr: function (local_605) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"level\" name=\"level\">")
                                                                              ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<option value=\"\">")
                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("-")))})
                                                                                                        ,infixr: function (local_606) {
                                                                                                           return map({list: fromArray(local_604)
                                                                                                                      ,mapping: function (local_607) {
                                                                                                                         return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                                      ,b: showNum(local_607.id)})
                                                                                                                                                         ,b: function () {
                                                                                                                                                            var x =
                                                                                                                                                            function (x608) {
                                                                                                                                                               return x608;
                                                                                                                                                            }(_3d__3d_({infixl: local_607.id
                                                                                                                                                                       ,infixr: local_599.level.id}));
                                                                                                                                                            switch (x.tag)
                                                                                                                                                            {
                                                                                                                                                              case "false":
                                                                                                                                                                var local_609 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\">");
                                                                                                                                                              case "true":
                                                                                                                                                                var local_610 =
                                                                                                                                                                x.data;
                                                                                                                                                                return rts.bytesFromAscii("\" selected>");
                                                                                                                                                              default:
                                                                                                                                                                throw rts.exceptions.UnhandledCase("DEF_a5e4925095a54ec393e6e4d5942a5dec"
                                                                                                                                                                                                  ,"9a49b8f7220edcf647eba821ecf8b91a");
                                                                                                                                                            }
                                                                                                                                                         }()})
                                                                                                                                       ,infixr: singleton(leaf(local_607.name))});
                                                                                                                      }});
                                                                                                        }}))})
                                                              ,infixr: function (local_611) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var locationEditForm = function (local_613) {
   return _3b_({infixl: _3b_({infixl: query({database: local_613.database
                                            ,object: rts.bytesFromAscii("SELECT pestoval_location.id, pestoval_location.name FROM pestoval_location")})
                             ,infixr: processSimpleQuery})
               ,infixr: function (local_614) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("Where")))})
                                           ,infixr: function (local_615) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"location\" name=\"location\">")
                                                                              ,infixr: toArray(map({list: fromArray(local_614)
                                                                                                   ,mapping: function (local_616) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_616.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         function (x617) {
                                                                                                                                            return x617;
                                                                                                                                         }(_3d__3d_({infixl: local_616.id
                                                                                                                                                    ,infixr: local_613.where.id}));
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_618 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_619 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.UnhandledCase("DEF_937ecfd7a5fb4cd6800d072419740277"
                                                                                                                                                                               ,"ae5dc56c181ace2274e213d24cf032c6");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(local_616.name))});
                                                                                                   }}))})
                                                              ,infixr: function (local_620) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalQueryTimeSlots = function (database2) {
   return _3b_({infixl: query({database: database2
                              ,object: rts.bytesFromAscii("SELECT\n  pestoval_timeslot.id, pestoval_timeslot.start, pestoval_timeslot.stop\nFROM pestoval_timeslot\nORDER BY pestoval_timeslot.start")})
               ,infixr: function (x623) {
                  switch (x623.tag)
                  {
                    case "error":
                      var local_624 = x623.data;
                      return ignoreError(local_624);
                    case "success":
                      var local_625 = x623.data;
                      return __return(toArray(map({list: fromArray(local_625.__data)
                                                  ,mapping: function (local_626) {
                                                     return {start: parseDateTime(item({index: 1.0
                                                                                       ,object: local_626}))
                                                            ,stop: parseDateTime(item({index: 2.0
                                                                                      ,object: local_626}))
                                                            ,id: parseInt(item({index: 0.0
                                                                               ,object: local_626}))};
                                                  }})));
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_e253b6e9f37d40d099b39de266d912c9"
                                                        ,"37d0edcc32ab5606822a8107f66ced58");
                  }
               }});
};
var timeSlotEditForm = function (local_622) {
   return _3b_({infixl: pestovalQueryTimeSlots(local_622.database)
               ,infixr: function (local_627) {
                  return __return(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                           ,infixr: singleton(leaf(rts.bytesFromAscii("When")))})
                                           ,infixr: function (local_628) {
                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<select id=\"when\" name=\"when\">")
                                                                              ,infixr: toArray(map({list: fromArray(local_627)
                                                                                                   ,mapping: function (local_629) {
                                                                                                      return _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<option value=\"")
                                                                                                                                                   ,b: showNum(local_629.id)})
                                                                                                                                      ,b: function () {
                                                                                                                                         var x =
                                                                                                                                         function (x630) {
                                                                                                                                            return x630;
                                                                                                                                         }(_3d__3d_({infixl: local_629.id
                                                                                                                                                    ,infixr: local_622.when.id}));
                                                                                                                                         switch (x.tag)
                                                                                                                                         {
                                                                                                                                           case "false":
                                                                                                                                             var local_631 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\">");
                                                                                                                                           case "true":
                                                                                                                                             var local_632 =
                                                                                                                                             x.data;
                                                                                                                                             return rts.bytesFromAscii("\" selected>");
                                                                                                                                           default:
                                                                                                                                             throw rts.exceptions.UnhandledCase("DEF_3860ce434c144382b8c11631e28ab02f"
                                                                                                                                                                               ,"11873d6a08b91a78c3a93a526e65434f");
                                                                                                                                         }
                                                                                                                                      }()})
                                                                                                                    ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_629
                                                                                                                                                           ,language: {tag: "english"
                                                                                                                                                                      ,data: {}}})))});
                                                                                                   }}))})
                                                              ,infixr: function (local_633) {
                                                                 return {tag: "empty"
                                                                        ,data: {}};
                                                              }});
                                           }}));
               }});
};
var pestovalSessionSummary = function (session4) {
   return concat(map({list: _3a__3a_({infixl: {name: rts.bytesFromAscii("Teachers")
                                              ,value: join({texts: map({list: fromArray(session4.teachers)
                                                                       ,mapping: function (local_637) {
                                                                          return local_637.name;
                                                                       }})
                                                           ,seperator: rts.bytesFromAscii(" & ")})}
                                     ,infixr: function (local_638) {
                                        return _3a__3a_({infixl: {name: rts.bytesFromAscii("Where")
                                                                 ,value: session4.place.name}
                                                        ,infixr: function (local_639) {
                                                           return _3a__3a_({infixl: {name: rts.bytesFromAscii("When")
                                                                                    ,value: formatTimeSlot({timeSlot: session4.when
                                                                                                           ,language: {tag: "english"
                                                                                                                      ,data: {}}})}
                                                                           ,infixr: function (local_640) {
                                                                              return _3a__3a_({infixl: {name: rts.bytesFromAscii("Level")
                                                                                                       ,value: session4.level.name}
                                                                                              ,infixr: function (local_641) {
                                                                                                 return {tag: "empty"
                                                                                                        ,data: {}};
                                                                                              }});
                                                                           }});
                                                        }});
                                     }})
                     ,mapping: function (local_642) {
                        return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h4>")
                                                        ,infixr: singleton(leaf(local_642.name))})
                                        ,infixr: function (local_643) {
                                           return _3a__3a_({infixl: leaf(local_642.value)
                                                           ,infixr: function (local_644) {
                                                              return {tag: "empty"
                                                                     ,data: {}};
                                                           }});
                                        }});
                     }}));
};
var pestovalEditField = function (local_648) {
   return _3a__3a_({infixl: {name: local_648.name
                            ,value: local_648.value.english
                            ,key: local_648.key}
                   ,infixr: function (local_649) {
                      return _3a__3a_({infixl: {name: _2b__2b_({a: local_648.name
                                                               ,b: rts.bytesFromAscii(" (Hebrew)")})
                                               ,value: local_648.value.hebrew
                                               ,key: _2b__2b_({a: local_648.key
                                                              ,b: rts.bytesFromAscii("_hebrew")})}
                                      ,infixr: function (local_650) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var pestovalEditFields = function (local_652) {
   return _2b__2b_2({infixl: pestovalEditField({name: rts.bytesFromAscii("Description")
                                               ,value: local_652.description
                                               ,key: rts.bytesFromAscii("description")})
                    ,infixr: function (local_653) {
                       return pestovalEditField({name: rts.bytesFromAscii("Pre-reqs")
                                                ,value: local_652.prereqs
                                                ,key: rts.bytesFromAscii("prereqs")});
                    }});
};
var formTextArea = function (local_654) {
   return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<label for=\"")
                                                                  ,b: local_654.key})
                                                     ,b: rts.bytesFromAscii("\">")})
                                   ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h3>")
                                                             ,infixr: singleton(leaf(_2b__2b_({a: local_654.name
                                                                                              ,b: rts.bytesFromAscii(":")})))}))})
                   ,infixr: function (local_655) {
                      return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<textarea rows=10 cols=80 id=\"")
                                                                                                               ,b: local_654.key})
                                                                                                  ,b: rts.bytesFromAscii("\" name=\"")})
                                                                                     ,b: local_654.key})
                                                                        ,b: rts.bytesFromAscii("\">")})
                                                      ,infixr: singleton(leaf(local_654.value))})
                                      ,infixr: function (local_656) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var postgresEncodeText = function (text5) {
   return _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("E\'")
                                ,b: concat1(map({list: fromBytes(function (x676) {
                                                   return x676;
                                                }(text5))
                                                ,mapping: function (local_677) {
                                                   var x = function (x678) {
                                                              return x678;
                                                           }(_3d__3d_({infixl: local_677
                                                                      ,infixr: 10.0}));
                                                   switch (x.tag)
                                                   {
                                                     case "false":
                                                       var local_679 = x.data;
                                                       var x = function (x680) {
                                                                  return x680;
                                                               }(_3d__3d_({infixl: local_677
                                                                          ,infixr: 13.0}));
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_681 = x.data;
                                                           var x = function (x682) {
                                                                      return x682;
                                                                   }(_3d__3d_({infixl: local_677
                                                                              ,infixr: 39.0}));
                                                           switch (x.tag)
                                                           {
                                                             case "false":
                                                               var local_683 = x.data;
                                                               var x = function (x684) {
                                                                          return x684;
                                                                       }(_3d__3d_({infixl: local_677
                                                                                  ,infixr: 92.0}));
                                                               switch (x.tag)
                                                               {
                                                                 case "false":
                                                                   var local_685 = x.data;
                                                                   return toBytes(singleton(local_677));
                                                                 case "true":
                                                                   var local_686 = x.data;
                                                                   return rts.bytesFromAscii("\\\\");
                                                                 default:
                                                                   throw rts.exceptions.UnhandledCase("DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                                     ,"db1c255f9dc88b1c4474ccb94732b223");
                                                               }
                                                             case "true":
                                                               var local_687 = x.data;
                                                               return rts.bytesFromAscii("\\\'");
                                                             default:
                                                               throw rts.exceptions.UnhandledCase("DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                                 ,"c5163200e2f7d7f5292c38e34f78058d");
                                                           }
                                                         case "true":
                                                           var local_688 = x.data;
                                                           return rts.bytesFromAscii("\\r");
                                                         default:
                                                           throw rts.exceptions.UnhandledCase("DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                             ,"af75122f296de089cbe121bebb73e3af");
                                                       }
                                                     case "true":
                                                       var local_689 = x.data;
                                                       return rts.bytesFromAscii("\\n");
                                                     default:
                                                       throw rts.exceptions.UnhandledCase("DEF_667b666b27af4a00b75bfdb974a7ce12"
                                                                                         ,"6e996a4b5e8af95a3b4a4fcb8897103c");
                                                   }
                                                }}))})
                   ,b: rts.bytesFromAscii("\'")});
};
var head = function (list8) {
   var x = function (x701) { return x701;}(list8);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_702 = x.data;
       return {tag: "just",data: local_702.head};
     case "empty":
       var local_703 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_6ed761736e084d6c97cf57a406116d35"
                                         ,"f3442eac4d4349a99cafaa88a24c4a7a");
   }
};
var mapMaybe = function (local_704) {
   var x = function (x705) { return x705;}(local_704.maybe);
   switch (x.tag)
   {
     case "just":
       var local_706 = x.data;
       return {tag: "just",data: local_704.mapping(local_706)};
     case "nothing":
       var local_707 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_2e9eb864b9154a2594c46dbc34021fab"
                                         ,"5ed58bf5b9734ee5b4f4dc26197f7885");
   }
};
var lookup1 = function (local_697) {
   return mapMaybe({mapping: function (local_698) {
                      return local_698.value;
                   }
                   ,maybe: head(filter1({list: local_697.assocs
                                        ,keep: function (local_699) {
                                           var dummy1 = function (local_700) {
                                              return _3d__3d_({infixl: {value: function () {
                                                                          throw rts.exceptions.ReachedHole("DEF_0d310f73ee5345e9a1903f10b0b0a466"
                                                                                                          ,"64902637b1ad4b65b6c193bd6db7b954");
                                                                       }()
                                                                       ,key: function () {
                                                                          throw rts.exceptions.ReachedHole("DEF_0d310f73ee5345e9a1903f10b0b0a466"
                                                                                                          ,"94bfce1915d64b2eada80360aefe376a");
                                                                       }()}
                                                              ,infixr: local_699});
                                           };
                                           return _3d__3d_({infixl: local_699.key
                                                           ,infixr: local_697.key});
                                        }}))});
};
var updateSessionRow = function (local_667) {
   return _3b_({infixl: query({database: local_667.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET ")
                                                                          ,b: join({texts: concat(map({list: fromArray(local_667.body)
                                                                                                      ,mapping: function (local_668) {
                                                                                                         var x =
                                                                                                         function (x671) {
                                                                                                            return x671;
                                                                                                         }(_7c__7c_({infixl: _3d__3d_({infixl: local_668.key
                                                                                                                                      ,infixr: rts.bytesFromAscii("level")})
                                                                                                                    ,infixr: function (local_669) {
                                                                                                                       return _7c__7c_({infixl: _3d__3d_({infixl: local_668.key
                                                                                                                                                         ,infixr: rts.bytesFromAscii("location")})
                                                                                                                                       ,infixr: function (local_670) {
                                                                                                                                          return _3d__3d_({infixl: local_668.key
                                                                                                                                                          ,infixr: rts.bytesFromAscii("when")});
                                                                                                                                       }});
                                                                                                                    }}));
                                                                                                         switch (x.tag)
                                                                                                         {
                                                                                                           case "false":
                                                                                                             var local_672 =
                                                                                                             x.data;
                                                                                                             var x =
                                                                                                             function (x674) {
                                                                                                                return x674;
                                                                                                             }(_7c__7c_({infixl: _3d__3d_({infixl: local_668.key
                                                                                                                                          ,infixr: rts.bytesFromAscii("add_teacher")})
                                                                                                                        ,infixr: function (local_673) {
                                                                                                                           return _3d__3d_({infixl: local_668.key
                                                                                                                                           ,infixr: rts.bytesFromAscii("remove_teacher")});
                                                                                                                        }}));
                                                                                                             switch (x.tag)
                                                                                                             {
                                                                                                               case "false":
                                                                                                                 var local_675 =
                                                                                                                 x.data;
                                                                                                                 return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_668.key
                                                                                                                                                                ,b: rts.bytesFromAscii(" = ")})
                                                                                                                                                   ,b: postgresEncodeText(local_668.value)})
                                                                                                                                 ,infixr: function (local_690) {
                                                                                                                                    return {tag: "empty"
                                                                                                                                           ,data: {}};
                                                                                                                                 }});
                                                                                                               case "true":
                                                                                                                 var local_691 =
                                                                                                                 x.data;
                                                                                                                 return {tag: "empty"
                                                                                                                        ,data: {}};
                                                                                                               default:
                                                                                                                 throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                                                                                   ,"267a2077130878c293cf4285fc1e3f96");
                                                                                                             }
                                                                                                           case "true":
                                                                                                             var local_692 =
                                                                                                             x.data;
                                                                                                             return _3a__3a_({infixl: _2b__2b_({a: _2b__2b_({a: local_668.key
                                                                                                                                                            ,b: rts.bytesFromAscii("_id = ")})
                                                                                                                                               ,b: local_668.value})
                                                                                                                             ,infixr: function (local_693) {
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
                                                ,b: showNum(local_667.session)})})
               ,infixr: function (local_694) {
                  var x = local_694;
                  switch (x.tag)
                  {
                    case "error":
                      var local_695 = x.data;
                      return __return({tag: "error",data: local_695});
                    case "success":
                      var local_696 = x.data;
                      return _3b_({infixl: function () {
                                     var x = function (x708) {
                                                return x708;
                                             }(lookup1({assocs: fromArray(local_667.body)
                                                       ,key: rts.bytesFromAscii("add_teacher")}));
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_709 = x.data;
                                         var x = function (x710) {
                                                    return x710;
                                                 }(_3d__3d_({infixl: local_709
                                                            ,infixr: rts.bytesFromAscii("")}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_711 = x.data;
                                             return _3b_({infixl: query({database: local_667.database
                                                                        ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("INSERT INTO pestoval_session_teachers (session_id, teacher_id)\nVALUES (")
                                                                                                                                 ,b: showNum(local_667.session)})
                                                                                                                    ,b: rts.bytesFromAscii(", ")})
                                                                                                       ,b: local_709})
                                                                                          ,b: rts.bytesFromAscii(")")})})
                                                         ,infixr: function (x712) {
                                                            switch (x712.tag)
                                                            {
                                                              case "error":
                                                                var local_713 = x712.data;
                                                                return ignoreError(local_713);
                                                              case "success":
                                                                var local_714 = x712.data;
                                                                return __return({});
                                                              default:
                                                                throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                                  ,"3ad72f38b50bc1b5cc297ad16d68f28c");
                                                            }
                                                         }});
                                           case "true":
                                             var local_715 = x.data;
                                             return __return({});
                                           default:
                                             throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                               ,"138352fb50e0b842a35b65e5440d4cbb");
                                         }
                                       case "nothing":
                                         var local_716 = x.data;
                                         return __return({});
                                       default:
                                         throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                           ,"b7e3310f75aa51661dd00a4d961cbe7d");
                                     }
                                  }()
                                  ,infixr: function (local_717) {
                                     var x = function (x718) {
                                                return x718;
                                             }(lookup1({assocs: fromArray(local_667.body)
                                                       ,key: rts.bytesFromAscii("remove_teacher")}));
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_719 = x.data;
                                         return _3b_({infixl: query({database: local_667.database
                                                                    ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("DELETE FROM pestoval_session_teachers\nWHERE pestoval_session_teachers.session_id = ")
                                                                                                                ,b: showNum(local_667.session)})
                                                                                                   ,b: rts.bytesFromAscii(" AND pestoval_session_teachers.teacher_id = ")})
                                                                                      ,b: local_719})})
                                                     ,infixr: function (x720) {
                                                        switch (x720.tag)
                                                        {
                                                          case "error":
                                                            var local_721 = x720.data;
                                                            return __return({tag: "error"
                                                                            ,data: local_721});
                                                          case "success":
                                                            var local_722 = x720.data;
                                                            return __return({tag: "success"
                                                                            ,data: {}});
                                                          default:
                                                            throw rts.exceptions.UnhandledCase("DEF_d2e570281b824063b3de48e372e3ba51"
                                                                                              ,"c22e107f85c6554bb3a7ef4080f8f72a");
                                                        }
                                                     }});
                                       case "nothing":
                                         var local_723 = x.data;
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
var tryQuery = function (local_726) {
   return function (x727) {
          switch (x727.tag)
          {
            case "error":
              var local_728 = x727.data;
              return __return({content: {__data: function (x729) {
                                           return x729;
                                        }(_2b__2b_({a: rts.bytesFromAscii("Database error: ")
                                                   ,b: local_728}))
                                        ,mimeType: rts.bytesFromAscii("text/plain")}
                              ,status: {message: rts.bytesFromAscii("Internal Server Error")
                                       ,code: 500.0}});
            case "success":
              return local_726(x727.data);
            default:
              throw rts.exceptions.UnhandledCase("DEF_6ab93b1ac8a248c0a946996efdd08c5f"
                                                ,"601e113ccba88e0bf9ac1fe558419963");
          }
       };
};
var pestovalVerifyUpdate = function (local_731) {
   var x = function (x732) {
              return x732;
           }(lookup1({assocs: fromArray(local_731.body)
                     ,key: rts.bytesFromAscii("when")}));
   switch (x.tag)
   {
     case "just":
       var when1 = x.data;
       var x = function (x733) {
                  return x733;
               }(lookup1({assocs: fromArray(local_731.body)
                         ,key: rts.bytesFromAscii("location")}));
       switch (x.tag)
       {
         case "just":
           var where = x.data;
           return _3b_({infixl: query({database: local_731.database
                                      ,object: concat1(_3a__3a_({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id\nFROM pestoval_session\nWHERE pestoval_session.id <> ")
                                                                ,infixr: function (local_734) {
                                                                   return _3a__3a_({infixl: showNum(local_731.session)
                                                                                   ,infixr: function (local_735) {
                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.location_id = ")
                                                                                                      ,infixr: function (local_736) {
                                                                                                         return _3a__3a_({infixl: where
                                                                                                                         ,infixr: function (local_737) {
                                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii(" AND pestoval_session.when_id = ")
                                                                                                                                            ,infixr: function (local_738) {
                                                                                                                                               return _3a__3a_({infixl: when1
                                                                                                                                                               ,infixr: function (local_739) {
                                                                                                                                                                  return {tag: "empty"
                                                                                                                                                                         ,data: {}};
                                                                                                                                                               }});
                                                                                                                                            }});
                                                                                                                         }});
                                                                                                      }});
                                                                                   }});
                                                                }}))})
                       ,infixr: function (x740) {
                          switch (x740.tag)
                          {
                            case "error":
                              var local_741 = x740.data;
                              return ignoreError(local_741);
                            case "success":
                              var local_742 = x740.data;
                              return __return(function () {
                                     var x = function (x743) {
                                                return x743;
                                             }(_3d__3d_({infixl: length1(local_742.__data)
                                                        ,infixr: 0.0}));
                                     switch (x.tag)
                                     {
                                       case "false":
                                         var local_744 = x.data;
                                         return {tag: "conflicts"
                                                ,data: toArray(map({list: fromArray(local_742.__data)
                                                                   ,mapping: function (local_745) {
                                                                      return parseInt(item({index: 0.0
                                                                                           ,object: local_745}));
                                                                   }}))};
                                       case "true":
                                         var local_746 = x.data;
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
           var local_747 = x.data;
           return ignoreError({});
         default:
           throw rts.exceptions.UnhandledCase("DEF_bcca348b043a42949aaf89fb2eccfc72"
                                             ,"7aa622f233fd592d4ac16d681620a799");
       }
     case "nothing":
       var local_748 = x.data;
       return __return({tag: "good",data: {}});
     default:
       throw rts.exceptions.UnhandledCase("DEF_bcca348b043a42949aaf89fb2eccfc72"
                                         ,"814512c476a997315cd8f86c31cf843c");
   }
};
var pestovalUpdate = function (local_663) {
   var x = function (x664) { return x664;}(local_663.request.body);
   switch (x.tag)
   {
     case "just":
       var local_665 = x.data;
       var body2 = toArray(parsePostBody(local_665));
       var local_730 = function (local_666) {
          return _3b_({infixl: updateSessionRow({body: body2
                                                ,database: local_663.database
                                                ,session: local_663.session})
                      ,infixr: tryQuery(function (local_724) {
                         return __return({content: {__data: function (x725) {
                                                      return x725;
                                                   }(rts.bytesFromAscii("Update successful, refresh"))
                                                   ,mimeType: rts.bytesFromAscii("text/plain")}
                                         ,status: {message: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: ")
                                                                     ,b: local_666})
                                                  ,code: 303.0}});
                      })});
       };
       return _3b_({infixl: pestovalVerifyUpdate({body: body2
                                                 ,database: local_663.database
                                                 ,session: local_663.session})
                   ,infixr: function (x749) {
                      switch (x749.tag)
                      {
                        case "conflicts":
                          var conflicts = x749.data;
                          return _3b_({infixl: query({database: local_663.database
                                                     ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET location_id = NULL\nWHERE pestoval_session.id IN (")
                                                                                    ,b: join({texts: map({list: fromArray(conflicts)
                                                                                                         ,mapping: showNum})
                                                                                             ,seperator: rts.bytesFromAscii(", ")})})
                                                                       ,b: rts.bytesFromAscii(")")})})
                                      ,infixr: tryQuery(function (local_750) {
                                         return local_730(_2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("/eng/manage/")
                                                                                ,b: local_663.password})
                                                                   ,b: rts.bytesFromAscii("/")}));
                                      })});
                        case "good":
                          var local_751 = x749.data;
                          return local_730(local_663.request.path);
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                            ,"7605757a63256d30d9c89a9804c8dd00");
                      }
                   }});
     case "nothing":
       var local_752 = x.data;
       return __return({content: {__data: function (x753) {
                                    return x753;
                                 }(rts.bytesFromAscii("POST with no body"))
                                 ,mimeType: rts.bytesFromAscii("text/plain")}
                       ,status: {message: rts.bytesFromAscii("Forbidden"),code: 403.0}});
     default:
       throw rts.exceptions.UnhandledCase("DEF_7fbd3bd4533a428eb08b679d36605be0"
                                         ,"7155adc9c6327a297327ec4e1f1a8007");
   }
};
var pestovalEditPage = function (local_541) {
   var local_542 = toArray(split({text: local_541.request.path
                                 ,seperator: rts.bytesFromAscii("/")}));
   var id2 = parseInt(item({index: 3.0,object: local_542}));
   var password3 = item({index: 4.0,object: local_542});
   return _3b_({infixl: getSession({database: local_541.database,id: id2})
               ,infixr: function (local_559) {
                  var x = function (x560) { return x560;}(local_559);
                  switch (x.tag)
                  {
                    case "just":
                      var session3 = x.data;
                      return _3b_({infixl: pestovalAuth({database: local_541.database
                                                        ,password: password3
                                                        ,teachers: session3.teachers})
                                  ,infixr: function (x561) {
                                     switch (x561.tag)
                                     {
                                       case "unauthorized":
                                         var local_562 = x561.data;
                                         return __return(pestovalUnauthorized);
                                       default:
                                         var local_563 = x561;
                                         var x = function (x564) {
                                                    return x564;
                                                 }(_3d__3d_({infixl: local_541.request.method
                                                            ,infixr: rts.bytesFromAscii("POST")}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_565 = x.data;
                                             var local_570 =
                                             _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                      ,infixr: singleton(leaf(rts.bytesFromAscii("Delete Session")))})
                                                      ,infixr: function (local_566) {
                                                         return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"/eng/delete/")
                                                                                                                                                  ,b: showNum(id2)})
                                                                                                                                     ,b: rts.bytesFromAscii("/")})
                                                                                                                        ,b: password3})
                                                                                                           ,b: rts.bytesFromAscii("\">")})
                                                                                         ,infixr: [_22f2_({infixl: rts.bytesFromAscii("<textarea rows=1 cols=80 id=\"cmd\" name=\"cmd\">")
                                                                                                          ,infixr: singleton(leaf(rts.bytesFromAscii("Really delete?!?")))})
                                                                                                  ,_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                          ,infixr: singleton(leaf(rts.bytesFromAscii("Delete!!!")))})]})
                                                                         ,infixr: function (local_569) {
                                                                            return {tag: "empty"
                                                                                   ,data: {}};
                                                                         }});
                                                      }});
                                             return _3b_({infixl: function () {
                                                            var x = local_563;
                                                            switch (x.tag)
                                                            {
                                                              case "admin":
                                                                var local_571 = x.data;
                                                                return _3b_({infixl: sequence(_3a__3a_({infixl: teachersEditForm({database: local_541.database
                                                                                                                                 ,teachers: session3.teachers})
                                                                                                       ,infixr: function (local_598) {
                                                                                                          return _3a__3a_({infixl: levelEditForm({database: local_541.database
                                                                                                                                                 ,level: session3.level})
                                                                                                                          ,infixr: function (local_612) {
                                                                                                                             return _3a__3a_({infixl: locationEditForm({where: session3.place
                                                                                                                                                                       ,database: local_541.database})
                                                                                                                                             ,infixr: function (local_621) {
                                                                                                                                                return _3a__3a_({infixl: timeSlotEditForm({database: local_541.database
                                                                                                                                                                                          ,when: session3.when})
                                                                                                                                                                ,infixr: function (local_634) {
                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                          ,data: {}};
                                                                                                                                                                }});
                                                                                                                                             }});
                                                                                                                          }});
                                                                                                       }}))
                                                                            ,infixr: function (local_635) {
                                                                               return __return(concat(local_635));
                                                                            }});
                                                              case "teacher":
                                                                var local_636 = x.data;
                                                                return __return(pestovalSessionSummary({place: session3.place
                                                                                                       ,teachers: session3.teachers
                                                                                                       ,when: session3.when
                                                                                                       ,level: session3.level}));
                                                              default:
                                                                throw rts.exceptions.UnhandledCase("DEF_3c898249b1784b72beed36db3fa87518"
                                                                                                  ,"51101d04f9fe7ce01c9a8a10e2124c7f");
                                                            }
                                                         }()
                                                         ,infixr: function (local_645) {
                                                            return __return(pestovalPage({title: rts.bytesFromAscii("Edit Session")
                                                                                         ,body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                 ,infixr: singleton(leaf(rts.bytesFromAscii("Edit Session")))})
                                                                                                                 ,infixr: function (local_646) {
                                                                                                                    return _3a__3a_({infixl: _22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form method=\"POST\" action=\"")
                                                                                                                                                                                   ,b: local_541.request.path})
                                                                                                                                                                      ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                    ,infixr: toArray(_2b__2b_2({infixl: local_645
                                                                                                                                                                               ,infixr: function (local_647) {
                                                                                                                                                                                  return _2b__2b_2({infixl: concat(map({list: _2b__2b_2({infixl: pestovalEditField({name: rts.bytesFromAscii("Name")
                                                                                                                                                                                                                                                                   ,value: session3.name
                                                                                                                                                                                                                                                                   ,key: rts.bytesFromAscii("name")})
                                                                                                                                                                                                                                        ,infixr: function (local_651) {
                                                                                                                                                                                                                                           return pestovalEditFields(session3);
                                                                                                                                                                                                                                        }})
                                                                                                                                                                                                                       ,mapping: formTextArea}))
                                                                                                                                                                                                   ,infixr: function (local_657) {
                                                                                                                                                                                                      return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                                                                                                                                                                      ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("Update")))}))})
                                                                                                                                                                                                                      ,infixr: function (local_658) {
                                                                                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                                                                                ,data: {}};
                                                                                                                                                                                                                      }});
                                                                                                                                                                                                   }});
                                                                                                                                                                               }}))})
                                                                                                                                    ,infixr: function (local_659) {
                                                                                                                                       var x =
                                                                                                                                       local_563;
                                                                                                                                       switch (x.tag)
                                                                                                                                       {
                                                                                                                                         case "admin":
                                                                                                                                           var local_660 =
                                                                                                                                           x.data;
                                                                                                                                           return local_570;
                                                                                                                                         case "teacher":
                                                                                                                                           var local_661 =
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
                                             var local_662 = x.data;
                                             return pestovalUpdate({request: local_541.request
                                                                   ,database: local_541.database
                                                                   ,password: password3
                                                                   ,session: session3.id});
                                           default:
                                             throw rts.exceptions.UnhandledCase("DEF_3c898249b1784b72beed36db3fa87518"
                                                                               ,"649431586e8fa4f8144892306470de2e");
                                         }
                                     }
                                  }});
                    case "nothing":
                      var local_754 = x.data;
                      return __return(httpNotFound404(local_541.request.path));
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_3c898249b1784b72beed36db3fa87518"
                                                        ,"08ce1c8a7d9560da25879978070222da");
                  }
               }});
};
var contains = function (local_777) {
   return anyOf({list: local_777.list
                ,satisfy: function (local_778) {
                   return _3d__3d_({infixl: local_778,infixr: local_777.item});
                }});
};
var formatTeachers = function (local_785) {
   var x = function (x786) {
              return x786;
           }(_3d__3d_({infixl: length1(local_785.teachers),infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_787 = x.data;
       return _3a__3a_({infixl: htmlParagraph(_2b__2b_({a: join({texts: map({list: fromArray(local_785.teachers)
                                                                            ,mapping: function (local_788) {
                                                                               return local_788.name;
                                                                            }})
                                                                ,seperator: function () {
                                                                   var x =
                                                                   local_785.language;
                                                                   switch (x.tag)
                                                                   {
                                                                     case "english":
                                                                       var local_789 =
                                                                       x.data;
                                                                       return rts.bytesFromAscii(" & ");
                                                                     case "hebrew":
                                                                       var local_790 =
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
                       ,infixr: function (local_791) {
                          return {tag: "empty",data: {}};
                       }});
     case "true":
       var local_792 = x.data;
       return {tag: "empty",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_b343578f80c84dbf8532d81d3be7c414"
                                         ,"44f287325a63d1ff6d71c03d058570a3");
   }
};
var sessionCellContents = function (local_784) {
   return _2b__2b_2({infixl: formatTeachers({teachers: local_784.session.teachers
                                            ,language: local_784.language})
                    ,infixr: function (local_793) {
                       return _3a__3a_({infixl: htmlParagraph(local_784.session.name)
                                       ,infixr: function (local_794) {
                                          return {tag: "empty",data: {}};
                                       }});
                    }});
};
var dedup = function (local_798) {
   return toArray(map({list: group({list: local_798,by: _3d__3d_})
                      ,mapping: function (local_799) {
                         return item({index: 0.0,object: local_799});
                      }}));
};
var overlaysCss = _22f2_({infixl: rts.bytesFromAscii("<style type=\"text/css\">")
                         ,infixr: singleton(leaf(rts.bytesFromAscii("/* Thanks https://eichefam.net/2011/12/21/popup-windows-without-javascript/ */\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0, 0, 0, 0.5);\n  transition: opacity 200ms;\n  visibility: hidden;\n  opacity: 0;\n}\n\ninput:checked + label > div.overlay {\n  visibility: visible;\n  opacity: 1;\n}\n\n.popup {\n  margin: 50px auto;\n  padding: 20px;\n  background: #fff;\n  border: 1px solid #666;\n  width: 70%;\n  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);\n  position: relative;\n}")))});
var dayNamesFull =
toArray(split({text: rts.bytesFromAscii("Monday Tuesday Wednesday Thursday Friday Saturday Sunday")
              ,seperator: rts.bytesFromAscii(" ")}));
var placesRow = function (local_805) {
   return _22f2_({infixl: rts.bytesFromAscii("<tr style=\"background-color:#ddd; border-top: 3pt solid black\">")
                 ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<th style=\"font-size:150%\">")
                                                           ,infixr: singleton(leaf(local_805.day))})
                                           ,infixr: function (local_806) {
                                              return map({list: fromArray(local_805.places)
                                                         ,mapping: function (local_807) {
                                                            return _22f2_({infixl: rts.bytesFromAscii("<th>")
                                                                          ,infixr: singleton(leaf(local_807.name))});
                                                         }});
                                           }}))});
};
var toArray1 = function (local_814) {
   return runMutArray(_3b_({infixl: newMutArray1(replicate({count: local_814.size
                                                           ,item: {tag: "nothing"
                                                                  ,data: {}}}))
                           ,infixr: function (__array4) {
                              return _3b_({infixl: sequence__(map({list: local_814.list
                                                                  ,mapping: function (local_815) {
                                                                     return writeMutArray({index: local_814.index(local_815)
                                                                                          ,object: __array4
                                                                                          ,value: {tag: "just"
                                                                                                  ,data: local_815}});
                                                                  }}))
                                          ,infixr: function (local_816) {
                                             return __return(__array4);
                                          }});
                           }}));
};
var makeSessionsTable = function (local_795) {
   var places = dedup(fromArray(sort({list: map({list: fromArray(local_795.sessions)
                                                ,mapping: function (local_796) {
                                                   return local_796.place;
                                                }})
                                     ,_3c_: function (local_797) {
                                        return _3c_({infixl: local_797.infixl.order
                                                    ,infixr: local_797.infixr.order});
                                     }})));
   var numColumns = length1(places);
   return _3a__3a_({infixl: overlaysCss
                   ,infixr: function (local_800) {
                      return _3a__3a_({infixl: htmlTable({body: toArray(concat(map({list: group({list: fromArray(local_795.sessions)
                                                                                                ,by: function (local_801) {
                                                                                                   return _3d__3d_({infixl: local_801.infixl.when.start.date
                                                                                                                   ,infixr: local_801.infixr.when.start.date});
                                                                                                }})
                                                                                   ,mapping: function (rows) {
                                                                                      return _3a__3a_({infixl: placesRow({places: places
                                                                                                                         ,day: item({index: _2d_({infixl: function (x802) {
                                                                                                                                                    return x802;
                                                                                                                                                 }(item({index: 0.0
                                                                                                                                                        ,object: rows}).when.start.date).weekDay
                                                                                                                                                 ,infixr: 1.0})
                                                                                                                                    ,object: function () {
                                                                                                                                       var x =
                                                                                                                                       local_795.language;
                                                                                                                                       switch (x.tag)
                                                                                                                                       {
                                                                                                                                         case "english":
                                                                                                                                           var local_803 =
                                                                                                                                           x.data;
                                                                                                                                           return dayNamesFull;
                                                                                                                                         case "hebrew":
                                                                                                                                           var local_804 =
                                                                                                                                           x.data;
                                                                                                                                           return dayNamesHebrew;
                                                                                                                                         default:
                                                                                                                                           throw rts.exceptions.UnhandledCase("DEF_5a28c893390b47b89efa5b572983181b"
                                                                                                                                                                             ,"617b9b9cd85a5c2e2919df2135ab6272");
                                                                                                                                       }
                                                                                                                                    }()})})
                                                                                                      ,infixr: function (local_808) {
                                                                                                         return concat(map({list: group({list: fromArray(rows)
                                                                                                                                        ,by: function (local_809) {
                                                                                                                                           return _3d__3d_({infixl: local_809.infixl.when.id
                                                                                                                                                           ,infixr: local_809.infixr.when.id});
                                                                                                                                        }})
                                                                                                                           ,mapping: function (local_810) {
                                                                                                                              var when2 =
                                                                                                                              function (local_811) {
                                                                                                                                 return _2b__2b_({a: _2b__2b_({a: showTime(local_811.when.start.time)
                                                                                                                                                              ,b: rts.bytesFromAscii(" - ")})
                                                                                                                                                 ,b: showTime(local_811.when.stop.time)});
                                                                                                                              }(item({index: 0.0
                                                                                                                                     ,object: local_810}));
                                                                                                                              return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                              ,infixr: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<th style=\"font-size:120%; background-color:#ddd\">")
                                                                                                                                                                                                        ,infixr: singleton(leaf(when2))})
                                                                                                                                                                                        ,infixr: function (local_812) {
                                                                                                                                                                                           return map({list: fromArray(toArray1({list: fromArray(local_810)
                                                                                                                                                                                                                                ,index: function (local_813) {
                                                                                                                                                                                                                                   return index5({__array: places
                                                                                                                                                                                                                                                 ,item: local_813.place});
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                ,size: numColumns}))
                                                                                                                                                                                                      ,mapping: function (local_817) {
                                                                                                                                                                                                         var x =
                                                                                                                                                                                                         function (x818) {
                                                                                                                                                                                                            return x818;
                                                                                                                                                                                                         }(local_817);
                                                                                                                                                                                                         switch (x.tag)
                                                                                                                                                                                                         {
                                                                                                                                                                                                           case "just":
                                                                                                                                                                                                             var session6 =
                                                                                                                                                                                                             x.data;
                                                                                                                                                                                                             return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                                                                                   ,data: {}}
                                                                                                                                                                                                                                        ,content: local_795.sessionCellContents(session6)
                                                                                                                                                                                                                                        ,style: rts.bytesFromAscii("")
                                                                                                                                                                                                                                        ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                                                                        ,language: local_795.language
                                                                                                                                                                                                                                        ,session: session6});
                                                                                                                                                                                                           case "nothing":
                                                                                                                                                                                                             var local_819 =
                                                                                                                                                                                                             x.data;
                                                                                                                                                                                                             return leaf(rts.bytesFromAscii("<td style=\"background-color:#f8f8f8\">"));
                                                                                                                                                                                                           default:
                                                                                                                                                                                                             throw rts.exceptions.UnhandledCase("DEF_5a28c893390b47b89efa5b572983181b"
                                                                                                                                                                                                                                               ,"e22df53d1ea1be33327cca9a5f4067a5");
                                                                                                                                                                                                         }
                                                                                                                                                                                                      }});
                                                                                                                                                                                        }}))})
                                                                                                                                              ,infixr: function (local_820) {
                                                                                                                                                 return {tag: "empty"
                                                                                                                                                        ,data: {}};
                                                                                                                                              }});
                                                                                                                           }}));
                                                                                                      }});
                                                                                   }})))
                                                         ,language: local_795.language})
                                      ,infixr: function (local_821) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var pestovalEditPlanPage = function (local_770) {
   var planIdStr = showNum(local_770.planId);
   return _3b_({infixl: query({database: local_770.database
                              ,object: _2b__2b_({a: rts.bytesFromAscii("SELECT session_id FROM pestoval_plan_sessions WHERE plan_id=")
                                                ,b: planIdStr})})
               ,infixr: function (x771) {
                  switch (x771.tag)
                  {
                    case "error":
                      var local_772 = x771.data;
                      return ignoreError(local_772);
                    case "success":
                      var local_773 = x771.data;
                      var plan = toArray(map({list: fromArray(local_773.__data)
                                             ,mapping: function (local_774) {
                                                return parseInt(item({index: 0.0
                                                                     ,object: local_774}));
                                             }}));
                      return _3b_({infixl: pestovalQuerySessions({database: local_770.database
                                                                 ,teacher: {tag: "nothing"
                                                                           ,data: {}}
                                                                 ,language: {tag: "english"
                                                                            ,data: {}}
                                                                 ,filter: {tag: "nothing"
                                                                          ,data: {}}})
                                  ,infixr: function (sessions) {
                                     return __return(pestovalPage({title: rts.bytesFromAscii("Update Plan")
                                                                  ,body: singleton(_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<form action=\"/eng/plan/")
                                                                                                                                                   ,b: planIdStr})
                                                                                                                                      ,b: rts.bytesFromAscii("/")})
                                                                                                                         ,b: local_770.password})
                                                                                                            ,b: rts.bytesFromAscii("/\" method=\"post\">")})
                                                                                          ,infixr: toArray(_2b__2b_2({infixl: makeSessionsTable({language: {tag: "english"
                                                                                                                                                           ,data: {}}
                                                                                                                                                ,sessionCellContents: function (session5) {
                                                                                                                                                   return _3a__3a_({infixl: leaf(concat1(_3a__3a_({infixl: rts.bytesFromAscii("<input type=\"checkbox\" name=\"go-")
                                                                                                                                                                                                  ,infixr: function (local_775) {
                                                                                                                                                                                                     return _3a__3a_({infixl: showNum(session5.id)
                                                                                                                                                                                                                     ,infixr: function (local_776) {
                                                                                                                                                                                                                        return _3a__3a_({infixl: function () {
                                                                                                                                                                                                                                           var x =
                                                                                                                                                                                                                                           function (x779) {
                                                                                                                                                                                                                                              return x779;
                                                                                                                                                                                                                                           }(contains({list: fromArray(plan)
                                                                                                                                                                                                                                                      ,item: session5.id}));
                                                                                                                                                                                                                                           switch (x.tag)
                                                                                                                                                                                                                                           {
                                                                                                                                                                                                                                             case "false":
                                                                                                                                                                                                                                               var local_780 =
                                                                                                                                                                                                                                               x.data;
                                                                                                                                                                                                                                               return rts.bytesFromAscii("\" />");
                                                                                                                                                                                                                                             case "true":
                                                                                                                                                                                                                                               var local_781 =
                                                                                                                                                                                                                                               x.data;
                                                                                                                                                                                                                                               return rts.bytesFromAscii("\" checked />");
                                                                                                                                                                                                                                             default:
                                                                                                                                                                                                                                               throw rts.exceptions.UnhandledCase("DEF_e87b1519dda046b4b174c5381b753bd0"
                                                                                                                                                                                                                                                                                 ,"21c0de8b359e4cb3096da539800ac79d");
                                                                                                                                                                                                                                           }
                                                                                                                                                                                                                                        }()
                                                                                                                                                                                                                                        ,infixr: function (local_782) {
                                                                                                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                                                                                                  ,data: {}};
                                                                                                                                                                                                                                        }});
                                                                                                                                                                                                                     }});
                                                                                                                                                                                                  }})))
                                                                                                                                                                   ,infixr: function (local_783) {
                                                                                                                                                                      return sessionCellContents({language: {tag: "english"
                                                                                                                                                                                                            ,data: {}}
                                                                                                                                                                                                 ,session: session5});
                                                                                                                                                                   }});
                                                                                                                                                }
                                                                                                                                                ,sessions: sessions})
                                                                                                                     ,infixr: function (local_822) {
                                                                                                                        return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                        ,infixr: singleton(leaf(rts.bytesFromAscii("Update plan")))})
                                                                                                                                        ,infixr: function (local_823) {
                                                                                                                                           return {tag: "empty"
                                                                                                                                                  ,data: {}};
                                                                                                                                        }});
                                                                                                                     }}))}))}));
                                  }});
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_e87b1519dda046b4b174c5381b753bd0"
                                                        ,"15415fa6337962a8f5f1e3d67bec9351");
                  }
               }});
};
var pestovalUpdatePlan = function (local_831) {
   var sessions1 = map({list: parsePostBody(local_831.rawBody)
                       ,mapping: function (local_832) {
                          return item({index: 1.0
                                      ,object: toArray(split({text: local_832.key
                                                             ,seperator: rts.bytesFromAscii("-")}))});
                       }});
   var planIdStr1 = showNum(local_831.planId);
   var prefix = _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("("),b: planIdStr1})
                         ,b: rts.bytesFromAscii(", ")});
   return _3b_({infixl: query({database: local_831.database
                              ,object: concat1(_3a__3a_({infixl: rts.bytesFromAscii("DELETE FROM pestoval_plan_sessions\nWHERE plan_id=")
                                                        ,infixr: function (local_833) {
                                                           return _3a__3a_({infixl: planIdStr1
                                                                           ,infixr: function (local_834) {
                                                                              return _3a__3a_({infixl: rts.bytesFromAscii(" AND session_id NOT IN (")
                                                                                              ,infixr: function (local_835) {
                                                                                                 return _3a__3a_({infixl: join({texts: sessions1
                                                                                                                               ,seperator: rts.bytesFromAscii(",")})
                                                                                                                 ,infixr: function (local_836) {
                                                                                                                    return _3a__3a_({infixl: rts.bytesFromAscii("); INSERT INTO pestoval_plan_sessions\n(plan_id, session_id)\nVALUES\n")
                                                                                                                                    ,infixr: function (local_837) {
                                                                                                                                       return _3a__3a_({infixl: join({texts: map({list: sessions1
                                                                                                                                                                                 ,mapping: function (local_838) {
                                                                                                                                                                                    return _2b__2b_({a: _2b__2b_({a: prefix
                                                                                                                                                                                                                 ,b: local_838})
                                                                                                                                                                                                    ,b: rts.bytesFromAscii(")")});
                                                                                                                                                                                 }})
                                                                                                                                                                     ,seperator: rts.bytesFromAscii(", ")})
                                                                                                                                                       ,infixr: function (local_839) {
                                                                                                                                                          return _3a__3a_({infixl: rts.bytesFromAscii("\nON CONFLICT DO NOTHING")
                                                                                                                                                                          ,infixr: function (local_840) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                       }});
                                                                                                                                    }});
                                                                                                                 }});
                                                                                              }});
                                                                           }});
                                                        }}))})
               ,infixr: function (x841) {
                  switch (x841.tag)
                  {
                    case "error":
                      var local_842 = x841.data;
                      return ignoreError(local_842);
                    case "success":
                      var local_843 = x841.data;
                      return __return({content: {__data: function (x844) {
                                                   return x844;
                                                }(rts.bytesFromAscii("Plan updated"))
                                                ,mimeType: rts.bytesFromAscii("text/plain")}
                                      ,status: {message: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: /eng/plan/")
                                                                                            ,b: planIdStr1})
                                                                               ,b: rts.bytesFromAscii("/")})
                                                                  ,b: local_831.password})
                                               ,code: 303.0}});
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_3d3e275941ca40df9e6244441e26e3f3"
                                                        ,"09facac58adca5480b8eec34e6c96e4f");
                  }
               }});
};
var maximum1 = function (local_855) {
   var x = function (x856) {
              return x856;
           }(_2265_({infixl: local_855.__x,infixr: local_855.y}));
   switch (x.tag)
   {
     case "false":
       var local_857 = x.data;
       return local_855.y;
     case "true":
       var local_858 = x.data;
       return local_855.__x;
     default:
       throw rts.exceptions.UnhandledCase("DEF_19e923b820b04266a9811a6b34fe7b37"
                                         ,"a5d0a997c71340b2b9d148187aeb6d00");
   }
};
var nonEmptyFold = function (local_859) {
   var x = function (x860) { return x860;}(local_859.list);
   switch (x.tag)
   {
     case "nonEmpty":
       var local_861 = x.data;
       return {tag: "just"
              ,data: fold({list: local_861.tail({})
                          ,initial: local_861.head
                          ,binop: local_859.binop})};
     case "empty":
       var local_862 = x.data;
       return {tag: "nothing",data: {}};
     default:
       throw rts.exceptions.UnhandledCase("DEF_05d859467ac547cc890fea33e3ff4642"
                                         ,"eb3e9576545c4cc390019d2c5a8d9ce4");
   }
};
var maximum = function (list9) {
   return nonEmptyFold({list: list9
                       ,binop: function (local_854) {
                          return maximum1({y: local_854.item,__x: local_854.acc});
                       }});
};
var gcd = function (local_865) {
   var x = function (x866) { return x866;}(_3d__3d_({infixl: local_865.__x,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_867 = x.data;
       return gcd({y: local_865.__x
                  ,__x: _25_({infixl: local_865.y,infixr: local_865.__x})});
     case "true":
       var local_868 = x.data;
       return local_865.y;
     default:
       throw rts.exceptions.UnhandledCase("DEF_493da5cfecea49b89fd9a10c42df9e12"
                                         ,"426c0882a83d8df5efe64ca0e57098af");
   }
};
var lcm = function (local_864) {
   return _2f_({infixl: _2a_({infixl: local_864.__x,infixr: local_864.y})
               ,infixr: gcd({y: local_864.y,__x: local_864.__x})});
};
var timeSlotRow = function (local_871) {
   return _22f2_({infixl: rts.bytesFromAscii("<tr>")
                 ,infixr: singleton(_22f2_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("<td colspan=")
                                                                          ,infixr: function (local_872) {
                                                                             return _3a__3a_({infixl: showNum(local_871.numColumns)
                                                                                             ,infixr: function (local_873) {
                                                                                                return _3a__3a_({infixl: rts.bytesFromAscii(" style=\"font-size:150%; border-top:3pt solid black;\">")
                                                                                                                ,infixr: function (local_874) {
                                                                                                                   return {tag: "empty"
                                                                                                                          ,data: {}};
                                                                                                                }});
                                                                                             }});
                                                                          }})
                                                         ,seperator: rts.bytesFromAscii("")})
                                           ,infixr: singleton(leaf(formatTimeSlot({timeSlot: local_871.timeSlot
                                                                                  ,language: local_871.language})))}))});
};
var detailedSessionInfo = function (local_877) {
   return toArray(_2b__2b_2({infixl: formatTeachers({teachers: local_877.session.teachers
                                                    ,language: local_877.language})
                            ,infixr: function (local_878) {
                               return _3a__3a_({infixl: htmlParagraph(local_877.session.name)
                                               ,infixr: function (local_879) {
                                                  return _3a__3a_({infixl: htmlParagraph(local_877.session.place.name)
                                                                  ,infixr: function (local_880) {
                                                                     return {tag: "empty"
                                                                            ,data: {}};
                                                                  }});
                                               }});
                            }}));
};
var makeSessionsTable1 = function (local_852) {
   var rows1 = toArray(group({list: fromArray(local_852.sessions)
                             ,by: function (local_853) {
                                return _3d__3d_({infixl: local_853.infixl.when.id
                                                ,infixr: local_853.infixr.when.id});
                             }}));
   var numColumns1 = fold({list: _2e__2e_({start: 1.0
                                          ,stop: _2b_({infixl: maybe({object: maximum(map({list: fromArray(rows1)
                                                                                          ,mapping: length1}))
                                                                     ,or: 0.0})
                                                      ,infixr: 1.0})})
                          ,initial: 1.0
                          ,binop: function (local_863) {
                             return lcm({y: local_863.item,__x: local_863.acc});
                          }});
   return _3a__3a_({infixl: overlaysCss
                   ,infixr: function (local_869) {
                      return _3a__3a_({infixl: htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                 ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                           ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                     ,infixr: singleton(leaf(local_852.title))}))}))})
                                                                                 ,infixr: function (local_870) {
                                                                                    return concat(map({list: fromArray(rows1)
                                                                                                      ,mapping: function (group1) {
                                                                                                         return _3a__3a_({infixl: timeSlotRow({numColumns: numColumns1
                                                                                                                                              ,timeSlot: item({index: 0.0
                                                                                                                                                              ,object: group1}).when
                                                                                                                                              ,language: local_852.language})
                                                                                                                         ,infixr: function (local_875) {
                                                                                                                            var attributes =
                                                                                                                            function (local_876) {
                                                                                                                               return _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("colspan=")
                                                                                                                                                                                      ,b: showNum(_2f_({infixl: numColumns1
                                                                                                                                                                                                       ,infixr: local_876}))})
                                                                                                                                                                         ,b: rts.bytesFromAscii(" width=\"")})
                                                                                                                                                            ,b: showNum(_2f__2f_({infixl: 100.0
                                                                                                                                                                                 ,infixr: local_876}))})
                                                                                                                                               ,b: rts.bytesFromAscii("%\"")});
                                                                                                                            }(length1(group1));
                                                                                                                            return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                            ,infixr: toArray(map({list: fromArray(group1)
                                                                                                                                                                                 ,mapping: function (session7) {
                                                                                                                                                                                    return pestovalSessionCell({password: {tag: "nothing"
                                                                                                                                                                                                                          ,data: {}}
                                                                                                                                                                                                               ,content: _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<div style=\"font-size:110%\">")
                                                                                                                                                                                                                                                  ,infixr: detailedSessionInfo({language: local_852.language
                                                                                                                                                                                                                                                                               ,session: session7})})
                                                                                                                                                                                                                                  ,infixr: function (local_881) {
                                                                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                                                                  }})
                                                                                                                                                                                                               ,style: rts.bytesFromAscii("")
                                                                                                                                                                                                               ,attributes: attributes
                                                                                                                                                                                                               ,language: local_852.language
                                                                                                                                                                                                               ,session: session7});
                                                                                                                                                                                 }}))})
                                                                                                                                            ,infixr: function (local_882) {
                                                                                                                                               return {tag: "empty"
                                                                                                                                                      ,data: {}};
                                                                                                                                            }});
                                                                                                                         }});
                                                                                                      }}));
                                                                                 }}))
                                                         ,language: local_852.language})
                                      ,infixr: function (local_883) {
                                         return {tag: "empty",data: {}};
                                      }});
                   }});
};
var pestovalPlanPage = function (local_848) {
   return _3b_({infixl: query({database: local_848.database
                              ,object: pestovalQuerySessionsSql({where: _2b__2b_({a: rts.bytesFromAscii("pestoval_plan_sessions.plan_id = ")
                                                                                 ,b: showNum(local_848.planId)})
                                                                ,from: rts.bytesFromAscii("FROM pestoval_plan_sessions\nLEFT OUTER JOIN pestoval_session ON pestoval_plan_sessions.session_id = pestoval_session.id")
                                                                ,language: local_848.language})})
               ,infixr: function (x849) {
                  switch (x849.tag)
                  {
                    case "error":
                      var local_850 = x849.data;
                      return ignoreError(local_850);
                    case "success":
                      var local_851 = x849.data;
                      return _3b_({infixl: pestovalParseSessions({__data: local_851.__data
                                                                 ,database: local_848.database
                                                                 ,fields: local_851.fields
                                                                 ,language: local_848.language})
                                  ,infixr: function (sessions2) {
                                     return __return(pestovalPage({title: rts.bytesFromAscii("Personal Plan")
                                                                  ,body: toArray(makeSessionsTable1({title: rts.bytesFromAscii("Personal Plan")
                                                                                                    ,language: local_848.language
                                                                                                    ,sessions: sessions2}))}));
                                  }});
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_1878ab450f864398b93513f799bc4634"
                                                        ,"db76f642858cf0961502b26c5746baa0");
                  }
               }});
};
var pestovalMakePlanPage = function (local_887) {
   return _3b_({infixl: pestovalQuerySessions({database: local_887.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: local_887.language
                                              ,filter: {tag: "nothing",data: {}}})
               ,infixr: function (sessions3) {
                  return __return(pestovalPage({title: rts.bytesFromAscii("Create Plan")
                                               ,body: [htmlParagraph(rts.bytesFromAscii("Choose the sessions in your personalized plan and when done, click the button at the bottom of the page:"))
                                                      ,_22f2_({infixl: rts.bytesFromAscii("<form action=\"/eng/plan/\" method=\"post\">")
                                                              ,infixr: toArray(_2b__2b_2({infixl: makeSessionsTable({language: local_887.language
                                                                                                                    ,sessionCellContents: function (session8) {
                                                                                                                       return _3a__3a_({infixl: leaf(concat1(_3a__3a_({infixl: rts.bytesFromAscii("<input type=\"checkbox\" name=\"go-")
                                                                                                                                                                      ,infixr: function (local_889) {
                                                                                                                                                                         return _3a__3a_({infixl: showNum(session8.id)
                                                                                                                                                                                         ,infixr: function (local_890) {
                                                                                                                                                                                            return _3a__3a_({infixl: rts.bytesFromAscii("\" />")
                                                                                                                                                                                                            ,infixr: function (local_891) {
                                                                                                                                                                                                               return {tag: "empty"
                                                                                                                                                                                                                      ,data: {}};
                                                                                                                                                                                                            }});
                                                                                                                                                                                         }});
                                                                                                                                                                      }})))
                                                                                                                                       ,infixr: function (local_892) {
                                                                                                                                          return sessionCellContents({language: local_887.language
                                                                                                                                                                     ,session: session8});
                                                                                                                                       }});
                                                                                                                    }
                                                                                                                    ,sessions: sessions3})
                                                                                         ,infixr: function (local_893) {
                                                                                            return _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                            ,infixr: singleton(leaf(rts.bytesFromAscii("Create plan")))})
                                                                                                            ,infixr: function (local_894) {
                                                                                                               return {tag: "empty"
                                                                                                                      ,data: {}};
                                                                                                            }});
                                                                                         }}))})]}));
               }});
};
var random = rts.builtins.IO["random"];
var makeRandomPassword = function (length5) {
   return _3b_({infixl: sequence(replicate({count: length5,item: random}))
               ,infixr: function (local_899) {
                  return __return(toBytes(toArray(map({list: local_899
                                                      ,mapping: function (local_900) {
                                                         var local_901 =
                                                         floor(_2a_({infixl: local_900
                                                                    ,infixr: 52.0}));
                                                         var x = function (x902) {
                                                                    return x902;
                                                                 }(_3c_({infixl: local_901
                                                                        ,infixr: 10.0}));
                                                         switch (x.tag)
                                                         {
                                                           case "false":
                                                             var local_903 = x.data;
                                                             var local_904 =
                                                             _2d_({infixl: local_901
                                                                  ,infixr: 10.0});
                                                             var x = function (x905) {
                                                                        return x905;
                                                                     }(_3c_({infixl: local_904
                                                                            ,infixr: 26.0}));
                                                             switch (x.tag)
                                                             {
                                                               case "false":
                                                                 var local_906 = x.data;
                                                                 return _2d_({infixl: _2b_({infixl: 97.0
                                                                                           ,infixr: local_904})
                                                                             ,infixr: 26.0});
                                                               case "true":
                                                                 var local_907 = x.data;
                                                                 return _2b_({infixl: 65.0
                                                                             ,infixr: local_904});
                                                               default:
                                                                 throw rts.exceptions.UnhandledCase("DEF_183aba10d23f44989810f5ce94469c03"
                                                                                                   ,"7caf2877fb033a748d92889c044544dc");
                                                             }
                                                           case "true":
                                                             var local_908 = x.data;
                                                             return _2b_({infixl: 48.0
                                                                         ,infixr: local_901});
                                                           default:
                                                             throw rts.exceptions.UnhandledCase("DEF_183aba10d23f44989810f5ce94469c03"
                                                                                               ,"bc36014a8ff8754dc2e2447b5f646b20");
                                                         }
                                                      }}))));
               }});
};
var pestovalCreateNewPlan = function (local_898) {
   var body3 = toArray(parsePostBody(local_898.rawBody));
   return _3b_({infixl: makeRandomPassword(10.0)
               ,infixr: function (password5) {
                  return _3b_({infixl: query({database: local_898.database
                                             ,object: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("INSERT INTO pestoval_plan\n(password)\nVALUES (\'")
                                                                            ,b: password5})
                                                               ,b: rts.bytesFromAscii("\')\nRETURNING id")})})
                              ,infixr: function (x909) {
                                 switch (x909.tag)
                                 {
                                   case "error":
                                     var local_910 = x909.data;
                                     return ignoreError(local_910);
                                   case "success":
                                     var local_911 = x909.data;
                                     var id3 = parseInt(item({index: 0.0
                                                             ,object: item({index: 0.0
                                                                           ,object: local_911.__data})}));
                                     var idText = showNum(id3);
                                     return _3b_({infixl: query({database: local_898.database
                                                                ,object: concat1(_3a__3a_({infixl: rts.bytesFromAscii("INSERT INTO pestoval_plan_sessions\n(plan_id, session_id)\nVALUES ")
                                                                                          ,infixr: function (local_912) {
                                                                                             var prefix1 =
                                                                                             _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("(")
                                                                                                                   ,b: idText})
                                                                                                      ,b: rts.bytesFromAscii(", ")});
                                                                                             return _3a__3a_({infixl: join({texts: map({list: fromArray(body3)
                                                                                                                                       ,mapping: function (local_913) {
                                                                                                                                          var local_914 =
                                                                                                                                          toArray(split({text: local_913.key
                                                                                                                                                        ,seperator: rts.bytesFromAscii("-")}));
                                                                                                                                          return _2b__2b_({a: _2b__2b_({a: prefix1
                                                                                                                                                                       ,b: item({index: 1.0
                                                                                                                                                                                ,object: local_914})})
                                                                                                                                                          ,b: rts.bytesFromAscii(")")});
                                                                                                                                       }})
                                                                                                                           ,seperator: rts.bytesFromAscii(", ")})
                                                                                                             ,infixr: function (local_915) {
                                                                                                                return {tag: "empty"
                                                                                                                       ,data: {}};
                                                                                                             }});
                                                                                          }}))})
                                                 ,infixr: function (x916) {
                                                    switch (x916.tag)
                                                    {
                                                      case "error":
                                                        var local_917 = x916.data;
                                                        return ignoreError(local_917);
                                                      case "success":
                                                        var local_918 = x916.data;
                                                        return __return({content: {__data: function (x919) {
                                                                                     return x919;
                                                                                  }(rts.bytesFromAscii("New plan created"))
                                                                                  ,mimeType: rts.bytesFromAscii("text/plain")}
                                                                        ,status: {message: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("See Other\r\nLocation: /eng/plan/")
                                                                                                                              ,b: idText})
                                                                                                                 ,b: rts.bytesFromAscii("/")})
                                                                                                    ,b: password5})
                                                                                 ,code: 303.0}});
                                                      default:
                                                        throw rts.exceptions.UnhandledCase("DEF_aa70290e5cc04e82acda5801b57ef892"
                                                                                          ,"558b6a07b6d8cd04082ec35e0b01055f");
                                                    }
                                                 }});
                                   default:
                                     throw rts.exceptions.UnhandledCase("DEF_aa70290e5cc04e82acda5801b57ef892"
                                                                       ,"3e5410049da8ae95776d49679dd3d096");
                                 }
                              }});
               }});
};
var pestovalPlan = function (local_756) {
   var parts1 = toArray(filter1({list: split({text: local_756.request.path
                                             ,seperator: rts.bytesFromAscii("/")})
                                ,keep: function (local_757) {
                                   return _2260_({infixl: local_757
                                                 ,infixr: rts.bytesFromAscii("")});
                                }}));
   var isPost = _3d__3d_({infixl: local_756.request.method
                         ,infixr: rts.bytesFromAscii("POST")});
   var x = function (x758) { return x758;}(_3c_({infixl: length1(parts1),infixr: 3.0}));
   switch (x.tag)
   {
     case "false":
       var local_759 = x.data;
       var planId = parseInt(item({index: 2.0,object: parts1}));
       var x = function (x760) {
                  return x760;
               }(_3d__3d_({infixl: length1(parts1),infixr: 3.0}));
       switch (x.tag)
       {
         case "false":
           var local_761 = x.data;
           var password4 = item({index: 3.0,object: parts1});
           return _3b_({infixl: query({database: local_756.database
                                      ,object: _2b__2b_({a: rts.bytesFromAscii("SELECT password FROM pestoval_plan WHERE id=")
                                                        ,b: showNum(planId)})})
                       ,infixr: function (x762) {
                          switch (x762.tag)
                          {
                            case "error":
                              var local_763 = x762.data;
                              return __return(pestovalUnauthorized);
                            case "success":
                              var local_764 = x762.data;
                              var x = function (x766) {
                                         return x766;
                                      }(_7c__7c_({infixl: _3c_({infixl: length1(local_764.__data)
                                                               ,infixr: 1.0})
                                                 ,infixr: function (local_765) {
                                                    return _2260_({infixl: item({index: 0.0
                                                                                ,object: item({index: 0.0
                                                                                              ,object: local_764.__data})})
                                                                  ,infixr: password4});
                                                 }}));
                              switch (x.tag)
                              {
                                case "false":
                                  var local_767 = x.data;
                                  var x = function (x768) {
                                             return x768;
                                          }(_3d__3d_({infixl: length1(parts1)
                                                     ,infixr: 4.0}));
                                  switch (x.tag)
                                  {
                                    case "false":
                                      var local_769 = x.data;
                                      return pestovalEditPlanPage({database: local_756.database
                                                                  ,password: password4
                                                                  ,planId: planId});
                                    case "true":
                                      var local_824 = x.data;
                                      var x = function (x825) { return x825;}(isPost);
                                      switch (x.tag)
                                      {
                                        case "false":
                                          var local_826 = x.data;
                                          return __return(pestovalPage({title: rts.bytesFromAscii("Personal Plan")
                                                                       ,body: [_22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                      ,infixr: singleton(_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<a href=\"/eng/plan/")
                                                                                                                                               ,b: showNum(planId)})
                                                                                                                                  ,b: rts.bytesFromAscii("/\">")})
                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("View plan")))}))})
                                                                              ,_22f2_({infixl: rts.bytesFromAscii("<p>")
                                                                                      ,infixr: singleton(_22f2_({infixl: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("<a href=\"")
                                                                                                                                               ,b: local_756.request.path})
                                                                                                                                  ,b: rts.bytesFromAscii("/edit/\">")})
                                                                                                                ,infixr: singleton(leaf(rts.bytesFromAscii("Continue editing plan")))}))})]}));
                                        case "true":
                                          var local_829 = x.data;
                                          var x = function (x830) {
                                                     return x830;
                                                  }(local_756.request.body);
                                          switch (x.tag)
                                          {
                                            case "just":
                                              var rawBody = x.data;
                                              return pestovalUpdatePlan({database: local_756.database
                                                                        ,password: password4
                                                                        ,rawBody: rawBody
                                                                        ,planId: planId});
                                            case "nothing":
                                              var local_845 = x.data;
                                              return ignoreError({});
                                            default:
                                              throw rts.exceptions.UnhandledCase("DEF_b8e0b71f867a4cd888c035c83ce44c7d"
                                                                                ,"bd3441443feba23d0ef527ac449078bf");
                                          }
                                        default:
                                          throw rts.exceptions.UnhandledCase("DEF_b8e0b71f867a4cd888c035c83ce44c7d"
                                                                            ,"a361727b4c5f7bca506c67eb54d6b718");
                                      }
                                    default:
                                      throw rts.exceptions.UnhandledCase("DEF_b8e0b71f867a4cd888c035c83ce44c7d"
                                                                        ,"5f257603e7cd1b2c522ffc1edcb8404e");
                                  }
                                case "true":
                                  var local_846 = x.data;
                                  return __return(pestovalUnauthorized);
                                default:
                                  throw rts.exceptions.UnhandledCase("DEF_b8e0b71f867a4cd888c035c83ce44c7d"
                                                                    ,"5e5d9daf58fd868c9d2b3a2ee593cb30");
                              }
                            default:
                              throw rts.exceptions.UnhandledCase("DEF_b8e0b71f867a4cd888c035c83ce44c7d"
                                                                ,"b11092f596b8d30810853a8b356799ae");
                          }
                       }});
         case "true":
           var local_847 = x.data;
           return pestovalPlanPage({database: local_756.database
                                   ,planId: planId
                                   ,language: local_756.language});
         default:
           throw rts.exceptions.UnhandledCase("DEF_b8e0b71f867a4cd888c035c83ce44c7d"
                                             ,"01c7a24d1b92727a2e8bcca4de07e712");
       }
     case "true":
       var local_884 = x.data;
       var x = function (x885) { return x885;}(isPost);
       switch (x.tag)
       {
         case "false":
           var local_886 = x.data;
           return pestovalMakePlanPage({database: local_756.database
                                       ,language: local_756.language});
         case "true":
           var local_896 = x.data;
           var x = function (x897) { return x897;}(local_756.request.body);
           switch (x.tag)
           {
             case "just":
               var rawBody1 = x.data;
               return pestovalCreateNewPlan({database: local_756.database
                                            ,rawBody: rawBody1});
             case "nothing":
               var local_920 = x.data;
               return ignoreError({});
             default:
               throw rts.exceptions.UnhandledCase("DEF_b8e0b71f867a4cd888c035c83ce44c7d"
                                                 ,"62e12fca960d20d8b82c6e2d707fd138");
           }
         default:
           throw rts.exceptions.UnhandledCase("DEF_b8e0b71f867a4cd888c035c83ce44c7d"
                                             ,"c7361a052e8fe9ea0c29eb25fbbef053");
       }
     default:
       throw rts.exceptions.UnhandledCase("DEF_b8e0b71f867a4cd888c035c83ce44c7d"
                                         ,"7bae135e153b3b86445e591aea9a7ad2");
   }
};
var pestovalTeacherPage = function (local_922) {
   var teacher2 = parseInt(item({index: 0.0,object: local_922.path}));
   return _3b_({infixl: query({database: local_922.database
                              ,object: _2b__2b_({a: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("SELECT ")
                                                                          ,b: queryFieldLang(local_922.language)({table: rts.bytesFromAscii("pestoval_teacher")
                                                                                                                 ,field: rts.bytesFromAscii("name")
                                                                                                                 ,as: {tag: "nothing"
                                                                                                                      ,data: {}}})})
                                                             ,b: rts.bytesFromAscii(", pestoval_teacher.password\nFROM pestoval_teacher\nWHERE pestoval_teacher.id =")})
                                                ,b: showNum(teacher2)})})
               ,infixr: function (x923) {
                  switch (x923.tag)
                  {
                    case "error":
                      var local_924 = x923.data;
                      return ignoreError(local_924);
                    case "success":
                      var local_925 = x923.data;
                      var password6 = function () {
                                         var x = function (x927) {
                                                    return x927;
                                                 }(_26__26_({infixl: _3e_({infixl: length1(local_922.path)
                                                                          ,infixr: 1.0})
                                                            ,infixr: function (local_926) {
                                                               return _2260_({infixl: item({index: 1.0
                                                                                           ,object: local_922.path})
                                                                             ,infixr: rts.bytesFromAscii("")});
                                                            }}));
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_928 = x.data;
                                             return {tag: "nothing",data: {}};
                                           case "true":
                                             var local_929 = x.data;
                                             return {tag: "just"
                                                    ,data: item({index: 1.0
                                                                ,object: local_922.path})};
                                           default:
                                             throw rts.exceptions.UnhandledCase("DEF_50938aa1a135407c826989b9e1339047"
                                                                               ,"91cc4c8b5af33ae92f94375e3a666b89");
                                         }
                                      }();
                      var title = item({index: 0.0
                                       ,object: item({index: 0.0
                                                     ,object: local_925.__data})});
                      return _3b_({infixl: pestovalQuerySessions({database: local_922.database
                                                                 ,teacher: {tag: "just"
                                                                           ,data: teacher2}
                                                                 ,language: local_922.language
                                                                 ,filter: {tag: "nothing"
                                                                          ,data: {}}})
                                  ,infixr: function (local_930) {
                                     return __return(pestovalPage({title: title
                                                                  ,body: [overlaysCss
                                                                         ,htmlTable({body: toArray(_3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                            ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<td>")
                                                                                                                                                      ,infixr: singleton(_22f2_({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                                                ,infixr: singleton(leaf(title))}))}))})
                                                                                                            ,infixr: function (local_932) {
                                                                                                               return map({list: fromArray(local_930)
                                                                                                                          ,mapping: function (session9) {
                                                                                                                             var local_948 =
                                                                                                                             join({texts: _3a__3a_({infixl: session9.name
                                                                                                                                                   ,infixr: function (local_933) {
                                                                                                                                                      var x =
                                                                                                                                                      function (x935) {
                                                                                                                                                         return x935;
                                                                                                                                                      }(filter1({list: fromArray(session9.teachers)
                                                                                                                                                                ,keep: function (local_934) {
                                                                                                                                                                   return _2260_({infixl: local_934.id
                                                                                                                                                                                 ,infixr: teacher2});
                                                                                                                                                                }}));
                                                                                                                                                      switch (x.tag)
                                                                                                                                                      {
                                                                                                                                                        case "nonEmpty":
                                                                                                                                                          var local_936 =
                                                                                                                                                          x.data;
                                                                                                                                                          return _3a__3a_({infixl: concat1(_3a__3a_({infixl: function () {
                                                                                                                                                                                                       var x =
                                                                                                                                                                                                       local_922.language;
                                                                                                                                                                                                       switch (x.tag)
                                                                                                                                                                                                       {
                                                                                                                                                                                                         case "english":
                                                                                                                                                                                                           var local_937 =
                                                                                                                                                                                                           x.data;
                                                                                                                                                                                                           return rts.bytesFromAscii("(With ");
                                                                                                                                                                                                         case "hebrew":
                                                                                                                                                                                                           var local_938 =
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
                                                                                                                                                                                                    ,infixr: function (local_939) {
                                                                                                                                                                                                       return _3a__3a_({infixl: local_936.head.name
                                                                                                                                                                                                                       ,infixr: function (local_940) {
                                                                                                                                                                                                                          return _3a__3a_({infixl: join({texts: map({list: local_936.tail({})
                                                                                                                                                                                                                                                                    ,mapping: function (local_941) {
                                                                                                                                                                                                                                                                       return _2b__2b_({a: function () {
                                                                                                                                                                                                                                                                                          var x =
                                                                                                                                                                                                                                                                                          local_922.language;
                                                                                                                                                                                                                                                                                          switch (x.tag)
                                                                                                                                                                                                                                                                                          {
                                                                                                                                                                                                                                                                                            case "english":
                                                                                                                                                                                                                                                                                              var local_942 =
                                                                                                                                                                                                                                                                                              x.data;
                                                                                                                                                                                                                                                                                              return rts.bytesFromAscii(" & ");
                                                                                                                                                                                                                                                                                            case "hebrew":
                                                                                                                                                                                                                                                                                              var local_943 =
                                                                                                                                                                                                                                                                                              x.data;
                                                                                                                                                                                                                                                                                              return rts.bytes([32
                                                                                                                                                                                                                                                                                                               ,215
                                                                                                                                                                                                                                                                                                               ,149]);
                                                                                                                                                                                                                                                                                            default:
                                                                                                                                                                                                                                                                                              throw rts.exceptions.UnhandledCase("DEF_50938aa1a135407c826989b9e1339047"
                                                                                                                                                                                                                                                                                                                                ,"b71998601b16ac26e10ab6485ff6b405");
                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                       }()
                                                                                                                                                                                                                                                                                       ,b: local_941.name});
                                                                                                                                                                                                                                                                    }})
                                                                                                                                                                                                                                                        ,seperator: rts.bytesFromAscii("")})
                                                                                                                                                                                                                                          ,infixr: function (local_944) {
                                                                                                                                                                                                                                             return _3a__3a_({infixl: rts.bytesFromAscii(")")
                                                                                                                                                                                                                                                             ,infixr: function (local_945) {
                                                                                                                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                                                                                                                       ,data: {}};
                                                                                                                                                                                                                                                             }});
                                                                                                                                                                                                                                          }});
                                                                                                                                                                                                                       }});
                                                                                                                                                                                                    }}))
                                                                                                                                                                          ,infixr: function (local_946) {
                                                                                                                                                                             return {tag: "empty"
                                                                                                                                                                                    ,data: {}};
                                                                                                                                                                          }});
                                                                                                                                                        case "empty":
                                                                                                                                                          var local_947 =
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
                                                                                                                                           ,infixr: singleton(pestovalSessionCell({password: password6
                                                                                                                                                                                  ,content: _3a__3a_({infixl: _22f2_({infixl: rts.bytesFromAscii("<p style=\"font-weight=bold\">")
                                                                                                                                                                                                                     ,infixr: singleton(leaf(join({texts: _3a__3a_({infixl: formatTimeSlot({timeSlot: session9.when
                                                                                                                                                                                                                                                                                           ,language: local_922.language})
                                                                                                                                                                                                                                                                   ,infixr: function (local_949) {
                                                                                                                                                                                                                                                                      return _3a__3a_({infixl: session9.place.name
                                                                                                                                                                                                                                                                                      ,infixr: function (local_950) {
                                                                                                                                                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                                                                                                                                                ,data: {}};
                                                                                                                                                                                                                                                                                      }});
                                                                                                                                                                                                                                                                   }})
                                                                                                                                                                                                                                                  ,seperator: rts.bytesFromAscii(" / ")})))})
                                                                                                                                                                                                     ,infixr: function (local_951) {
                                                                                                                                                                                                        return _3a__3a_({infixl: htmlParagraph(local_948)
                                                                                                                                                                                                                        ,infixr: function (local_952) {
                                                                                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                                                                                  ,data: {}};
                                                                                                                                                                                                                        }});
                                                                                                                                                                                                     }})
                                                                                                                                                                                  ,style: rts.bytesFromAscii("")
                                                                                                                                                                                  ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                  ,language: local_922.language
                                                                                                                                                                                  ,session: session9}))});
                                                                                                                          }});
                                                                                                            }}))
                                                                                    ,language: local_922.language})]}));
                                  }});
                    default:
                      throw rts.exceptions.UnhandledCase("DEF_50938aa1a135407c826989b9e1339047"
                                                        ,"fc81fe2932d91417e79f74d97a2f2ad5");
                  }
               }});
};
var pestovalLevelsPage = function (local_955) {
   var minimum = parseInt(item({index: 0.0,object: local_955.path}));
   var maximum2 = function () {
                     var x = function (x956) {
                                return x956;
                             }(_3e_({infixl: length1(local_955.path),infixr: 1.0}));
                     switch (x.tag)
                     {
                       case "false":
                         var local_957 = x.data;
                         return minimum;
                       case "true":
                         var local_958 = x.data;
                         return parseInt(item({index: 1.0,object: local_955.path}));
                       default:
                         throw rts.exceptions.UnhandledCase("DEF_a358e35c87a74404b2c606eb39bddad1"
                                                           ,"4c173067c4670de5fcb231cf53d90418");
                     }
                  }();
   var title1 = join({texts: function () {
                        var x = function (x959) {
                                   return x959;
                                }(_3d__3d_({infixl: minimum,infixr: maximum2}));
                        switch (x.tag)
                        {
                          case "false":
                            var local_960 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_955.language;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_961 = x.data;
                                                   return rts.bytesFromAscii("Levels");
                                                 case "hebrew":
                                                   var local_962 = x.data;
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
                                            ,infixr: function (local_963) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_964) {
                                                                  return _3a__3a_({infixl: rts.bytesFromAscii("-")
                                                                                  ,infixr: function (local_965) {
                                                                                     return _3a__3a_({infixl: showNum(maximum2)
                                                                                                     ,infixr: function (local_966) {
                                                                                                        return {tag: "empty"
                                                                                                               ,data: {}};
                                                                                                     }});
                                                                                  }});
                                                               }});
                                            }});
                          case "true":
                            var local_967 = x.data;
                            return _3a__3a_({infixl: function () {
                                               var x = local_955.language;
                                               switch (x.tag)
                                               {
                                                 case "english":
                                                   var local_968 = x.data;
                                                   return rts.bytesFromAscii("Level");
                                                 case "hebrew":
                                                   var local_969 = x.data;
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
                                            ,infixr: function (local_970) {
                                               return _3a__3a_({infixl: showNum(minimum)
                                                               ,infixr: function (local_971) {
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
   return _3b_({infixl: pestovalQuerySessions({database: local_955.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: local_955.language
                                              ,filter: {tag: "just"
                                                       ,data: concat1(_3a__3a_({infixl: showNum(minimum)
                                                                               ,infixr: function (local_972) {
                                                                                  return _3a__3a_({infixl: rts.bytesFromAscii(" <= pestoval_level.as_number AND pestoval_level.as_number <= ")
                                                                                                  ,infixr: function (local_973) {
                                                                                                     return _3a__3a_({infixl: showNum(maximum2)
                                                                                                                     ,infixr: function (local_974) {
                                                                                                                        return {tag: "empty"
                                                                                                                               ,data: {}};
                                                                                                                     }});
                                                                                                  }});
                                                                               }}))}})
               ,infixr: function (sessions4) {
                  return __return(pestovalPage({title: title1
                                               ,body: toArray(makeSessionsTable1({title: title1
                                                                                 ,language: local_955.language
                                                                                 ,sessions: sessions4}))}));
               }});
};
var pestovalSessionsTable = function (local_976) {
   return _3b_({infixl: pestovalQuerySessions({database: local_976.database
                                              ,teacher: {tag: "nothing",data: {}}
                                              ,language: local_976.language
                                              ,filter: {tag: "nothing",data: {}}})
               ,infixr: function (sessions5) {
                  return __return(pestovalPage({title: rts.bytesFromAscii("All Sessions")
                                               ,body: toArray(makeSessionsTable({language: local_976.language
                                                                                ,sessionCellContents: function (session10) {
                                                                                   return sessionCellContents({language: local_976.language
                                                                                                              ,session: session10});
                                                                                }
                                                                                ,sessions: sessions5}))}));
               }});
};
var readFile = rts.builtins.IO.file["readFile"];
var pestovalIndex = _3b_({infixl: readFile(function (x978) {
                            return x978;
                         }(rts.bytesFromAscii("index.html")))
                         ,infixr: function (local_979) {
                            return __return({content: {__data: local_979
                                                      ,mimeType: rts.bytesFromAscii("text/html")}
                                            ,status: httpOk200});
                         }});
var pestovalHandler = function (local_87) {
   var parts = toArray(split({text: local_87.request.path
                             ,seperator: rts.bytesFromAscii("/")}));
   var language = item({index: 1.0,object: parts});
   var x = function (x89) {
              return x89;
           }(_26__26_({infixl: _3d__3d_({infixl: length1(parts),infixr: 2.0})
                      ,infixr: function (local_88) {
                         return _3d__3d_({infixl: language
                                         ,infixr: rts.bytesFromAscii("")});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_90 = x.data;
       var language1 = function () {
                          var x = function (x91) {
                                     return x91;
                                  }(_3d__3d_({infixl: language
                                             ,infixr: rts.bytesFromAscii("heb")}));
                          switch (x.tag)
                          {
                            case "false":
                              var local_92 = x.data;
                              return {tag: "english",data: {}};
                            case "true":
                              var local_93 = x.data;
                              return {tag: "hebrew",data: {}};
                            default:
                              throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                                ,"a7d7d7d9e5191fb58b9d7aeb67e660b8");
                          }
                       }();
       var page = item({index: 2.0,object: parts});
       var path = toArray(drop({list: fromArray(parts),count: 3.0}));
       var x = function (x103) {
                  return x103;
               }(_26__26_({infixl: _3d__3d_({infixl: length1(parts),infixr: 3.0})
                          ,infixr: function (local_102) {
                             return _3d__3d_({infixl: page
                                             ,infixr: rts.bytesFromAscii("")});
                          }}));
       switch (x.tag)
       {
         case "false":
           var local_104 = x.data;
           var x = function (x105) {
                      return x105;
                   }(_3d__3d_({infixl: page,infixr: rts.bytesFromAscii("levels")}));
           switch (x.tag)
           {
             case "false":
               var local_106 = x.data;
               var x = function (x107) {
                          return x107;
                       }(_3d__3d_({infixl: page,infixr: rts.bytesFromAscii("teacher")}));
               switch (x.tag)
               {
                 case "false":
                   var local_108 = x.data;
                   var x = function (x109) {
                              return x109;
                           }(_3d__3d_({infixl: page,infixr: rts.bytesFromAscii("plan")}));
                   switch (x.tag)
                   {
                     case "false":
                       var local_110 = x.data;
                       var x = function (x111) {
                                  return x111;
                               }(_3d__3d_({infixl: page
                                          ,infixr: rts.bytesFromAscii("edit")}));
                       switch (x.tag)
                       {
                         case "false":
                           var local_112 = x.data;
                           var x = function (x113) {
                                      return x113;
                                   }(_3d__3d_({infixl: page
                                              ,infixr: rts.bytesFromAscii("manage")}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_114 = x.data;
                               var x = function (x115) {
                                          return x115;
                                       }(_3d__3d_({infixl: page
                                                  ,infixr: rts.bytesFromAscii("new")}));
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_116 = x.data;
                                   var x = function (x117) {
                                              return x117;
                                           }(_3d__3d_({infixl: page
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
                           var local_540 = x.data;
                           return pestovalEditPage({request: local_87.request
                                                   ,database: local_87.database});
                         default:
                           throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                             ,"3904128e0f229aab0f559b8c4efd7e8c");
                       }
                     case "true":
                       var local_755 = x.data;
                       return pestovalPlan({request: local_87.request
                                           ,database: local_87.database
                                           ,language: language1});
                     default:
                       throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                         ,"3f2ea6c571152a461dd77a0d0ab40337");
                   }
                 case "true":
                   var local_921 = x.data;
                   return pestovalTeacherPage({path: path
                                              ,database: local_87.database
                                              ,language: language1});
                 default:
                   throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                     ,"1efb5179a530efb5cf0ea0f292813e32");
               }
             case "true":
               var local_954 = x.data;
               return pestovalLevelsPage({path: path
                                         ,database: local_87.database
                                         ,language: language1});
             default:
               throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                 ,"3725e3e3e238c36942a62af16a116f25");
           }
         case "true":
           var local_975 = x.data;
           return pestovalSessionsTable({database: local_87.database
                                        ,language: language1});
         default:
           throw rts.exceptions.UnhandledCase("DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                             ,"0e90da8443f9aff3c55edb7f8fef28fc");
       }
     case "true":
       var local_977 = x.data;
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
               ,infixr: function (length6) {
                  var x = function (x995) {
                             return x995;
                          }(_3e_({infixl: length6,infixr: 0.0}));
                  switch (x.tag)
                  {
                    case "false":
                      var local_996 = x.data;
                      return __return({tag: "nothing",data: {}});
                    case "true":
                      var local_997 = x.data;
                      return _3b_({infixl: readMutArray({index: _2d_({infixl: length6
                                                                     ,infixr: 1.0})
                                                        ,object: __array5})
                                  ,infixr: function (result) {
                                     return _3b_({infixl: truncateMutArray({object: __array5
                                                                           ,stop: _2d_({infixl: length6
                                                                                       ,infixr: 1.0})})
                                                 ,infixr: function (local_998) {
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
var find1 = function (local_1023) {
   return first({that: function (local_1024) {
                   return _3d__3d_({infixl: byteAt({index: local_1024
                                                   ,object: local_1023.__bytes})
                                   ,infixr: local_1023.byte});
                }
                ,list: _2e__2e_({start: local_1023.start
                                ,stop: length(local_1023.__bytes)})});
};
var isSuffixOf = function (local_1038) {
   var local_1039 = length(local_1038.whole);
   var local_1040 = length(local_1038.suffix);
   return _26__26_({infixl: _2265_({infixl: local_1039,infixr: local_1040})
                   ,infixr: function (local_1041) {
                      return _3d__3d_({infixl: slice({object: local_1038.whole
                                                     ,start: _2d_({infixl: local_1039
                                                                  ,infixr: local_1040})
                                                     ,stop: local_1039})
                                      ,infixr: local_1038.suffix});
                   }});
};
var unsuffixed = function (local_1037) {
   var x = function (x1042) {
              return x1042;
           }(isSuffixOf({suffix: local_1037.suffix,whole: local_1037.whole}));
   switch (x.tag)
   {
     case "false":
       var local_1043 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_1044 = x.data;
       return {tag: "just"
              ,data: slice({object: local_1037.whole
                           ,start: 0.0
                           ,stop: _2d_({infixl: length(local_1037.whole)
                                       ,infixr: length(local_1037.suffix)})})};
     default:
       throw rts.exceptions.UnhandledCase("DEF_6c2d206c45c348b3b8e2bbfdae7bde35"
                                         ,"7d90a0e076a149c4443b780b21470ef3");
   }
};
var removeSuffix = function (local_1036) {
   var x = function (x1045) {
              return x1045;
           }(unsuffixed({suffix: local_1036.suffix,whole: local_1036.whole}));
   switch (x.tag)
   {
     case "just":
       return id(x.data);
     case "nothing":
       var local_1046 = x.data;
       return local_1036.whole;
     default:
       throw rts.exceptions.UnhandledCase("DEF_8c9d00ae73ab41ca903aa34ee4c6601a"
                                         ,"97a63e2f16bd481c6e64fd0c8a6d92fa");
   }
};
var packetsEndWith = function (local_1051) {
   var x = function (x1052) {
              return x1052;
           }(_3d__3d_({infixl: local_1051.stop,infixr: 0.0}));
   switch (x.tag)
   {
     case "false":
       var local_1053 = x.data;
       return _3b_({infixl: readMutArray({index: _2d_({infixl: local_1051.stop
                                                      ,infixr: 1.0})
                                         ,object: local_1051.packets})
                   ,infixr: function (local_1054) {
                      var x = function (x1055) {
                                 return x1055;
                              }(isSuffixOf({suffix: local_1051.suffix
                                           ,whole: local_1054}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_1056 = x.data;
                          var x = function (x1057) {
                                     return x1057;
                                  }(unsuffixed({suffix: local_1054
                                               ,whole: local_1051.suffix}));
                          switch (x.tag)
                          {
                            case "just":
                              var remain = x.data;
                              return packetsEndWith({suffix: remain
                                                    ,stop: _2d_({infixl: local_1051.stop
                                                                ,infixr: 1.0})
                                                    ,packets: local_1051.packets});
                            case "nothing":
                              var local_1058 = x.data;
                              return __return({tag: "false",data: {}});
                            default:
                              throw rts.exceptions.UnhandledCase("DEF_a2f069d7413941fdafe42795f6970175"
                                                                ,"0d0804c08ad23d9eed424fc83122d6dc");
                          }
                        case "true":
                          var local_1059 = x.data;
                          return __return({tag: "true",data: {}});
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_a2f069d7413941fdafe42795f6970175"
                                                            ,"49052b2836be0b25cb20bc95d00972ca");
                      }
                   }});
     case "true":
       var local_1060 = x.data;
       return __return({tag: "false",data: {}});
     default:
       throw rts.exceptions.UnhandledCase("DEF_a2f069d7413941fdafe42795f6970175"
                                         ,"ae670587961cb7d305eef1133a3bbc18");
   }
};
var parseHttpHeaderPacket = function (local_1022) {
   var x = function (x1025) {
              return x1025;
           }(find1({start: local_1022.start,__bytes: local_1022.newPacket,byte: 10.0}));
   switch (x.tag)
   {
     case "just":
       var local_1026 = x.data;
       var local_1027 = _2b_({infixl: local_1026,infixr: 1.0});
       return _3b_({infixl: length4(local_1022.packets)
                   ,infixr: function (local_1028) {
                      var done = function (local_1029) {
                         return _3b_({infixl: sequence(map({list: _2e__2e_({start: 0.0
                                                                           ,stop: local_1028})
                                                           ,mapping: function (local_1030) {
                                                              return readMutArray({index: local_1030
                                                                                  ,object: local_1022.packets});
                                                           }}))
                                     ,infixr: function (local_1031) {
                                        var local_1034 =
                                        concat2(_2b__2b_2({infixl: local_1031
                                                          ,infixr: function (local_1032) {
                                                             return _3a__3a_({infixl: slice({object: local_1022.newPacket
                                                                                            ,start: 0.0
                                                                                            ,stop: local_1026})
                                                                             ,infixr: function (local_1033) {
                                                                                return {tag: "empty"
                                                                                       ,data: {}};
                                                                             }});
                                                          }}));
                                        var local_1047 =
                                        toArray(map({list: split1({__bytes: local_1034
                                                                  ,seperator: rts.bytes([10])})
                                                    ,mapping: function (local_1035) {
                                                       return removeSuffix({suffix: rts.bytes([13])
                                                                           ,whole: local_1035});
                                                    }}));
                                        return _3b_({infixl: truncateMutArray({object: local_1022.packets
                                                                              ,stop: 0.0})
                                                    ,infixr: function (local_1048) {
                                                       return _3b_({infixl: appendMutArray({object: local_1022.packets
                                                                                           ,value: slice({object: local_1022.newPacket
                                                                                                         ,start: local_1027
                                                                                                         ,stop: length(local_1022.newPacket)})})
                                                                   ,infixr: function (local_1049) {
                                                                      return __return({tag: "just"
                                                                                      ,data: local_1047});
                                                                   }});
                                                    }});
                                     }});
                      };
                      var local_1061 = function (local_1050) {
                         return packetsEndWith({suffix: local_1050
                                               ,stop: local_1028
                                               ,packets: local_1022.packets});
                      };
                      var next = function (local_1062) {
                         return parseHttpHeaderPacket({start: local_1027
                                                      ,newPacket: local_1022.newPacket
                                                      ,packets: local_1022.packets});
                      };
                      var x = function (x1063) {
                                 return x1063;
                              }(_3d__3d_({infixl: local_1026,infixr: 0.0}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_1064 = x.data;
                          var local_1065 = byteAt({index: _2d_({infixl: local_1026
                                                               ,infixr: 1.0})
                                                  ,object: local_1022.newPacket});
                          var x = function (x1066) {
                                     return x1066;
                                  }(_3d__3d_({infixl: local_1065,infixr: 10.0}));
                          switch (x.tag)
                          {
                            case "false":
                              var local_1067 = x.data;
                              var x = function (x1068) {
                                         return x1068;
                                      }(_3d__3d_({infixl: local_1065,infixr: 13.0}));
                              switch (x.tag)
                              {
                                case "false":
                                  return next(x.data);
                                case "true":
                                  var local_1069 = x.data;
                                  var x = function (x1070) {
                                             return x1070;
                                          }(_3d__3d_({infixl: local_1026,infixr: 1.0}));
                                  switch (x.tag)
                                  {
                                    case "false":
                                      var local_1071 = x.data;
                                      var x = function (x1072) {
                                                 return x1072;
                                              }(_3d__3d_({infixl: byteAt({index: _2d_({infixl: local_1026
                                                                                      ,infixr: 2.0})
                                                                         ,object: local_1022.newPacket})
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
                                      var local_1073 = x.data;
                                      return _3b_({infixl: local_1061(rts.bytes([10]))
                                                  ,infixr: function (local_1074) {
                                                     var x = function (x1075) {
                                                                return x1075;
                                                             }(local_1074);
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
                          var local_1076 = x.data;
                          return _3b_({infixl: local_1061(rts.bytes([10]))
                                      ,infixr: function (local_1077) {
                                         var x = function (x1078) {
                                                    return x1078;
                                                 }(local_1077);
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_1079 = x.data;
                                             return _3b_({infixl: local_1061(rts.bytes([10
                                                                                       ,13]))
                                                         ,infixr: function (local_1080) {
                                                            var x = function (x1081) {
                                                                       return x1081;
                                                                    }(local_1080);
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
       var local_1082 = x.data;
       return _3b_({infixl: appendMutArray({object: local_1022.packets
                                           ,value: local_1022.newPacket})
                   ,infixr: function (local_1083) {
                      return __return({tag: "nothing",data: {}});
                   }});
     default:
       throw rts.exceptions.UnhandledCase("DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                         ,"a641e1eefdb6d290e8f5e30eb99ae939");
   }
};
var requestHeaderIndex = function (x1089) {
   switch (x1089.tag)
   {
     case "referer":
       var local_1090 = x1089.data;
       return 9.0;
     case "range":
       var local_1091 = x1089.data;
       return 4.0;
     case "contentLength":
       var local_1092 = x1089.data;
       return 0.0;
     case "connection":
       var local_1093 = x1089.data;
       return 3.0;
     case "host":
       var local_1094 = x1089.data;
       return 5.0;
     case "userAgent":
       var local_1095 = x1089.data;
       return 10.0;
     case "ifModifiedSince":
       var local_1096 = x1089.data;
       return 6.0;
     case "ifRange":
       var local_1097 = x1089.data;
       return 8.0;
     case "count":
       var local_1098 = x1089.data;
       return 11.0;
     case "transferEncoding":
       var local_1099 = x1089.data;
       return 1.0;
     case "expect":
       var local_1100 = x1089.data;
       return 2.0;
     case "ifUnmodifiedSince":
       var local_1101 = x1089.data;
       return 7.0;
     default:
       throw rts.exceptions.UnhandledCase("DEF_1b4c5f4e650b40db91d34fcbb46eedcc"
                                         ,"2d1d3f6c02b34a16b1ecc9cff08b339e");
   }
};
var toLower8 = function (local_1107) {
   var x = function (x1112) {
              return x1112;
           }(_7c__7c_({infixl: _26__26_({infixl: _2264_({infixl: 65.0,infixr: local_1107})
                                        ,infixr: function (local_1108) {
                                           return _2264_({infixl: local_1107
                                                         ,infixr: 90.0});
                                        }})
                      ,infixr: function (local_1109) {
                         return _26__26_({infixl: _2264_({infixl: 192.0
                                                         ,infixr: local_1107})
                                         ,infixr: function (local_1110) {
                                            return _26__26_({infixl: _2264_({infixl: local_1107
                                                                            ,infixr: 222.0})
                                                            ,infixr: function (local_1111) {
                                                               return _2260_({infixl: local_1107
                                                                             ,infixr: 215.0});
                                                            }});
                                         }});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_1113 = x.data;
       return local_1107;
     case "true":
       var local_1114 = x.data;
       return _2b_({infixl: local_1107,infixr: 32.0});
     default:
       throw rts.exceptions.UnhandledCase("DEF_d53402309e2246e0acda443ccc6735f8"
                                         ,"26914d49ae6cd50363dc7b55bd37d4d5");
   }
};
var numHeadItems = function (local_1125) {
   return foldLazy({list: local_1125.list
                   ,initial: function (local_1126) {
                      return id;
                   }
                   ,binop: function (local_1127) {
                      return function (local_1128) {
                             var x = function (x1129) {
                                        return x1129;
                                     }(local_1125.that(local_1127.item));
                             switch (x.tag)
                             {
                               case "false":
                                 var local_1130 = x.data;
                                 return local_1128;
                               case "true":
                                 var local_1131 = x.data;
                                 return local_1127.rest({})(_2b_({infixl: local_1128
                                                                 ,infixr: 1.0}));
                               default:
                                 throw rts.exceptions.UnhandledCase("DEF_8e2a63199d5c4946ae51e428c77e2587"
                                                                   ,"b73a61d07547543acce9e5aa2b53f447");
                             }
                          };
                   }})(0.0);
};
var parseHeader = function (local_1104) {
   var local_1115 = function (local_1105) {
      return {headerNameOrig: local_1105
             ,headerNameLower: toBytes(toArray(map({list: fromBytes(function (x1106) {
                                                      return x1106;
                                                   }(local_1105))
                                                   ,mapping: toLower8})))};
   };
   var x = function (x1117) {
              return x1117;
           }(find1({start: 0.0
                   ,__bytes: function (x1116) {
                      return x1116;
                   }(local_1104)
                   ,byte: 58.0}));
   switch (x.tag)
   {
     case "just":
       var local_1118 = x.data;
       var x = Object.assign({__data: function (local_1120) {
                               return slice({object: function (x1121) {
                                               return x1121;
                                            }(local_1104)
                                            ,start: _2b_({infixl: _2b_({infixl: local_1118
                                                                       ,infixr: 1.0})
                                                         ,infixr: numHeadItems({that: function (local_1122) {
                                                                                  return _7c__7c_({infixl: _3d__3d_({infixl: local_1122
                                                                                                                    ,infixr: 32.0})
                                                                                                  ,infixr: function (local_1123) {
                                                                                                     return _3d__3d_({infixl: local_1122
                                                                                                                     ,infixr: 9.0});
                                                                                                  }});
                                                                               }
                                                                               ,list: fromBytes(slice({object: function (x1124) {
                                                                                                         return x1124;
                                                                                                      }(local_1104)
                                                                                                      ,start: _2b_({infixl: local_1118
                                                                                                                   ,infixr: 1.0})
                                                                                                      ,stop: local_1120}))})})
                                            ,stop: local_1120});
                            }(length(function (x1119) {
                               return x1119;
                            }(local_1104)))}
                            ,local_1115(slice({object: function (x1132) {
                                                 return x1132;
                                              }(local_1104)
                                              ,start: 0.0
                                              ,stop: local_1118})));
       delete x.cacheId;
       return x;
     case "nothing":
       var local_1133 = x.data;
       var x = Object.assign({__data: rts.bytesFromAscii("")},local_1115(local_1104));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.UnhandledCase("DEF_24c62861bfb940e4addebcc337a003f8"
                                         ,"2fd2696b8bb145a1f8ea35cf6754cfb8");
   }
};
var requestHeaderIndexFromText = function (local_1135) {
   var local_1137 = length(function (x1136) { return x1136;}(local_1135));
   var local_1142 = function (local_1138) {
      var x = function (x1139) {
                 return x1139;
              }(_3d__3d_({infixl: local_1135,infixr: local_1138.text}));
      switch (x.tag)
      {
        case "false":
          var local_1140 = x.data;
          return {tag: "nothing",data: {}};
        case "true":
          var local_1141 = x.data;
          return {tag: "just",data: requestHeaderIndex(local_1138.value)};
        default:
          throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                            ,"dc1fada55c8b610b4ec39d131179bc92");
      }
   };
   var x = function (x1143) { return x1143;}(_3d__3d_({infixl: local_1137,infixr: 4.0}));
   switch (x.tag)
   {
     case "false":
       var local_1144 = x.data;
       var x = function (x1145) {
                  return x1145;
               }(_3d__3d_({infixl: local_1137,infixr: 5.0}));
       switch (x.tag)
       {
         case "false":
           var local_1146 = x.data;
           var x = function (x1147) {
                      return x1147;
                   }(_3d__3d_({infixl: local_1137,infixr: 6.0}));
           switch (x.tag)
           {
             case "false":
               var local_1148 = x.data;
               var x = function (x1149) {
                          return x1149;
                       }(_3d__3d_({infixl: local_1137,infixr: 7.0}));
               switch (x.tag)
               {
                 case "false":
                   var local_1150 = x.data;
                   var x = function (x1151) {
                              return x1151;
                           }(_3d__3d_({infixl: local_1137,infixr: 8.0}));
                   switch (x.tag)
                   {
                     case "false":
                       var local_1152 = x.data;
                       var x = function (x1153) {
                                  return x1153;
                               }(_3d__3d_({infixl: local_1137,infixr: 10.0}));
                       switch (x.tag)
                       {
                         case "false":
                           var local_1154 = x.data;
                           var x = function (x1155) {
                                      return x1155;
                                   }(_3d__3d_({infixl: local_1137,infixr: 14.0}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_1156 = x.data;
                               var x = function (x1157) {
                                          return x1157;
                                       }(_3d__3d_({infixl: local_1137,infixr: 17.0}));
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_1158 = x.data;
                                   var x = function (x1159) {
                                              return x1159;
                                           }(_3d__3d_({infixl: local_1137,infixr: 19.0}));
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_1160 = x.data;
                                       return {tag: "nothing",data: {}};
                                     case "true":
                                       var local_1161 = x.data;
                                       return local_1142({text: rts.bytesFromAscii("if-unmodified-since")
                                                         ,value: {tag: "ifUnmodifiedSince"
                                                                 ,data: {}}});
                                     default:
                                       throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                         ,"f8cf9e99c6ebab86468dac6f079e1d43");
                                   }
                                 case "true":
                                   var local_1162 = x.data;
                                   var x = function (x1163) {
                                              return x1163;
                                           }(_3d__3d_({infixl: local_1135
                                                      ,infixr: rts.bytesFromAscii("transfer-encoding")}));
                                   switch (x.tag)
                                   {
                                     case "false":
                                       var local_1164 = x.data;
                                       var x = function (x1165) {
                                                  return x1165;
                                               }(_3d__3d_({infixl: local_1135
                                                          ,infixr: rts.bytesFromAscii("if-modified-since")}));
                                       switch (x.tag)
                                       {
                                         case "false":
                                           var local_1166 = x.data;
                                           return {tag: "nothing",data: {}};
                                         case "true":
                                           var local_1167 = x.data;
                                           return {tag: "just"
                                                  ,data: requestHeaderIndex({tag: "ifModifiedSince"
                                                                            ,data: {}})};
                                         default:
                                           throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                             ,"5c9b7e120cfcbfe66378a56aa55e1554");
                                       }
                                     case "true":
                                       var local_1168 = x.data;
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
                               var local_1169 = x.data;
                               return local_1142({text: rts.bytesFromAscii("content-length")
                                                 ,value: {tag: "contentLength"
                                                         ,data: {}}});
                             default:
                               throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                 ,"316352807090bd4b8e1627c428b18ad0");
                           }
                         case "true":
                           var local_1170 = x.data;
                           var x = function (x1171) {
                                      return x1171;
                                   }(_3d__3d_({infixl: local_1135
                                              ,infixr: rts.bytesFromAscii("user-agent")}));
                           switch (x.tag)
                           {
                             case "false":
                               var local_1172 = x.data;
                               var x = function (x1173) {
                                          return x1173;
                                       }(_3d__3d_({infixl: local_1135
                                                  ,infixr: rts.bytesFromAscii("connection")}));
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_1174 = x.data;
                                   return {tag: "nothing",data: {}};
                                 case "true":
                                   var local_1175 = x.data;
                                   return {tag: "just"
                                          ,data: requestHeaderIndex({tag: "connection"
                                                                    ,data: {}})};
                                 default:
                                   throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                     ,"0a18521fa15139803614889d5ac640f3");
                               }
                             case "true":
                               var local_1176 = x.data;
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
                       var local_1177 = x.data;
                       return local_1142({text: rts.bytesFromAscii("if-range")
                                         ,value: {tag: "ifRange",data: {}}});
                     default:
                       throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                         ,"0c12468dbe34d1382d0b97b93b5cab94");
                   }
                 case "true":
                   var local_1178 = x.data;
                   return local_1142({text: rts.bytesFromAscii("referer")
                                     ,value: {tag: "referer",data: {}}});
                 default:
                   throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                     ,"13eb12f71c41a5c676528975f4cd2d8f");
               }
             case "true":
               var local_1179 = x.data;
               return local_1142({text: rts.bytesFromAscii("expect")
                                 ,value: {tag: "expect",data: {}}});
             default:
               throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                 ,"a709b7964f58d9b479a336260545d465");
           }
         case "true":
           var local_1180 = x.data;
           return local_1142({text: rts.bytesFromAscii("range")
                             ,value: {tag: "range",data: {}}});
         default:
           throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                             ,"1d20a17a150e74e964a7731e9e75cc90");
       }
     case "true":
       var local_1181 = x.data;
       return local_1142({text: rts.bytesFromAscii("host")
                         ,value: {tag: "host",data: {}}});
     default:
       throw rts.exceptions.UnhandledCase("DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                         ,"b082b30c0d03c8abd35416fd055c4e65");
   }
};
var parseHeaders = function (local_1087) {
   var local_1190 = runMutArray(_3b_({infixl: newMutArray
                                     ,infixr: function (local_1088) {
                                        return _3b_({infixl: sequence__(replicate({count: requestHeaderIndex({tag: "count"
                                                                                                             ,data: {}})
                                                                                  ,item: appendMutArray({object: local_1088
                                                                                                        ,value: {tag: "nothing"
                                                                                                                ,data: {}}})}))
                                                    ,infixr: function (local_1102) {
                                                       return _3b_({infixl: sequence__(map({list: _2e__2e_({start: 1.0
                                                                                                           ,stop: length1(local_1087)})
                                                                                           ,mapping: function (local_1103) {
                                                                                              var local_1134 =
                                                                                              parseHeader(item({index: local_1103
                                                                                                               ,object: local_1087}));
                                                                                              var local_1182 =
                                                                                              requestHeaderIndexFromText(local_1134.headerNameLower);
                                                                                              var x =
                                                                                              function (x1183) {
                                                                                                 return x1183;
                                                                                              }(local_1182);
                                                                                              switch (x.tag)
                                                                                              {
                                                                                                case "just":
                                                                                                  var index7 =
                                                                                                  x.data;
                                                                                                  return _3b_({infixl: readMutArray({index: index7
                                                                                                                                    ,object: local_1088})
                                                                                                              ,infixr: function (local_1184) {
                                                                                                                 var x =
                                                                                                                 function (x1185) {
                                                                                                                    return x1185;
                                                                                                                 }(local_1184);
                                                                                                                 switch (x.tag)
                                                                                                                 {
                                                                                                                   case "just":
                                                                                                                     var local_1186 =
                                                                                                                     x.data;
                                                                                                                     throw rts.exceptions.ReachedHole("DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                     ,"0ba4efe1ab9b937a5c4c329950c130eb");
                                                                                                                   case "nothing":
                                                                                                                     var local_1187 =
                                                                                                                     x.data;
                                                                                                                     return writeMutArray({index: index7
                                                                                                                                          ,object: local_1088
                                                                                                                                          ,value: {tag: "just"
                                                                                                                                                  ,data: local_1134.__data}});
                                                                                                                   default:
                                                                                                                     throw rts.exceptions.UnhandledCase("DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                       ,"46e58c07915691b0449b51e2c57e8c26");
                                                                                                                 }
                                                                                                              }});
                                                                                                case "nothing":
                                                                                                  var local_1188 =
                                                                                                  x.data;
                                                                                                  return __return({});
                                                                                                default:
                                                                                                  throw rts.exceptions.UnhandledCase("DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                    ,"96d7c2e4942aa324705674b28c8d8892");
                                                                                              }
                                                                                           }}))
                                                                   ,infixr: function (local_1189) {
                                                                      return __return(local_1088);
                                                                   }});
                                                    }});
                                     }}));
   var value = function (local_1191) {
      return item({index: requestHeaderIndex(local_1191),object: local_1190});
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
var parseHttpVersion = function (local_1197) {
   var x = function (x1203) {
              return x1203;
           }(_26__26_({infixl: _3d__3d_({infixl: slice({object: function (x1198) {
                                                          return x1198;
                                                       }(local_1197)
                                                       ,start: 0.0
                                                       ,stop: 5.0})
                                        ,infixr: rts.bytesFromAscii("HTTP/")})
                      ,infixr: function (local_1199) {
                         return _26__26_({infixl: _3d__3d_({infixl: slice({object: function (x1200) {
                                                                             return x1200;
                                                                          }(local_1197)
                                                                          ,start: 6.0
                                                                          ,stop: 7.0})
                                                           ,infixr: rts.bytesFromAscii(".")})
                                         ,infixr: function (local_1201) {
                                            return _2265_({infixl: length(function (x1202) {
                                                             return x1202;
                                                          }(local_1197))
                                                          ,infixr: 8.0});
                                         }});
                      }}));
   switch (x.tag)
   {
     case "false":
       var local_1204 = x.data;
       throw rts.exceptions.ReachedHole("DEF_cdde9ce31af346e5879cd20194adf297"
                                       ,"d4d438d8b8c3035dd13c03c182e694f8");
     case "true":
       var local_1205 = x.data;
       var local_1207 = byteAt({index: 5.0
                               ,object: function (x1206) {
                                  return x1206;
                               }(local_1197)});
       var local_1209 = byteAt({index: 7.0
                               ,object: function (x1208) {
                                  return x1208;
                               }(local_1197)});
       var x = function (x1210) {
                  return x1210;
               }(_3d__3d_({infixl: local_1207,infixr: 49.0}));
       switch (x.tag)
       {
         case "false":
           var local_1211 = x.data;
           var x = function (x1213) {
                      return x1213;
                   }(_26__26_({infixl: _3d__3d_({infixl: local_1207,infixr: 50.0})
                              ,infixr: function (local_1212) {
                                 return _3d__3d_({infixl: local_1209,infixr: 48.0});
                              }}));
           switch (x.tag)
           {
             case "false":
               var local_1214 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_1215 = x.data;
               return {minor: 0.0,major: 2.0};
             default:
               throw rts.exceptions.UnhandledCase("DEF_cdde9ce31af346e5879cd20194adf297"
                                                 ,"6d72ed51030c146e142824d8c5608502");
           }
         case "true":
           var local_1216 = x.data;
           var x = function (x1217) {
                      return x1217;
                   }(_3d__3d_({infixl: local_1209,infixr: 49.0}));
           switch (x.tag)
           {
             case "false":
               var local_1218 = x.data;
               return {minor: 0.0,major: 1.0};
             case "true":
               var local_1219 = x.data;
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
var parseHttpPathAndQuery = function (local_1220) {
   var x = function (x1222) {
              return x1222;
           }(find1({start: 0.0
                   ,__bytes: function (x1221) {
                      return x1221;
                   }(local_1220)
                   ,byte: 63.0}));
   switch (x.tag)
   {
     case "just":
       var local_1223 = x.data;
       return {path: slice({object: function (x1224) {
                              return x1224;
                           }(local_1220)
                           ,start: 0.0
                           ,stop: local_1223})
              ,query: slice({object: function (x1225) {
                               return x1225;
                            }(local_1220)
                            ,start: local_1223
                            ,stop: length(function (x1226) {
                               return x1226;
                            }(local_1220))})};
     case "nothing":
       var local_1227 = x.data;
       return {path: local_1220,query: rts.bytesFromAscii("")};
     default:
       throw rts.exceptions.UnhandledCase("DEF_e1ddf2e103fc4a77ba877761b12b0489"
                                         ,"7b5454e4261c24d201d9384e83ca385c");
   }
};
var parseRequestLine = function (local_1192) {
   var local_1193 = toArray(split({text: local_1192,seperator: rts.bytesFromAscii(" ")}));
   var x = function (x1194) {
              return x1194;
           }(_3d__3d_({infixl: length1(local_1193),infixr: 3.0}));
   switch (x.tag)
   {
     case "false":
       var local_1195 = x.data;
       throw rts.exceptions.ReachedHole("DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                       ,"a7de8d96fb5e1479e6bb2a3ddb6eeaaa");
     case "true":
       var local_1196 = x.data;
       var x = Object.assign({httpVersion: parseHttpVersion(item({index: 2.0
                                                                 ,object: local_1193}))
                             ,method: item({index: 0.0,object: local_1193})}
                            ,parseHttpPathAndQuery(item({index: 1.0
                                                        ,object: local_1193})));
       delete x.cacheId;
       return x;
     default:
       throw rts.exceptions.UnhandledCase("DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                         ,"1a29dea7dd98168ceba76256560b374b");
   }
};
var isPrefixOf = function (local_1242) {
   var local_1243 = length(local_1242.whole);
   var local_1244 = length(local_1242.prefix);
   return _26__26_({infixl: _2265_({infixl: local_1243,infixr: local_1244})
                   ,infixr: function (local_1245) {
                      return _3d__3d_({infixl: slice({object: local_1242.whole
                                                     ,start: 0.0
                                                     ,stop: local_1244})
                                      ,infixr: local_1242.prefix});
                   }});
};
var unprefixed = function (local_1241) {
   var x = function (x1246) {
              return x1246;
           }(isPrefixOf({whole: local_1241.whole,prefix: local_1241.prefix}));
   switch (x.tag)
   {
     case "false":
       var local_1247 = x.data;
       return {tag: "nothing",data: {}};
     case "true":
       var local_1248 = x.data;
       return {tag: "just"
              ,data: slice({object: local_1241.whole
                           ,start: length(local_1241.prefix)
                           ,stop: length(local_1241.whole)})};
     default:
       throw rts.exceptions.UnhandledCase("DEF_1d18b3f94ac64cc39b8dc131624a5e9f"
                                         ,"2de3ba5a8affabb154216378ec3580e6");
   }
};
var httpAddLocalPath = function (local_1228) {
   var local_1229 = local_1228.path;
   var nonEmpty = function (local_1230) {
      var x = function (x1231) {
                 return x1231;
              }(_3d__3d_({infixl: local_1230,infixr: rts.bytesFromAscii("")}));
      switch (x.tag)
      {
        case "false":
          var local_1232 = x.data;
          return local_1230;
        case "true":
          var local_1233 = x.data;
          return rts.bytesFromAscii("/");
        default:
          throw rts.exceptions.UnhandledCase("DEF_97b5de980c3149218877e33920fb5729"
                                            ,"5ae9e78cf85c5d6952c38eb479596553");
      }
   };
   var local_1238 = function (local_1234) {
      return nonEmpty(function () {
             var x = function (x1235) {
                        return x1235;
                     }(find1({start: 0.0,__bytes: local_1234,byte: 47.0}));
             switch (x.tag)
             {
               case "just":
                 var local_1236 = x.data;
                 return slice({object: local_1234
                              ,start: local_1236
                              ,stop: length(local_1234)});
               case "nothing":
                 var local_1237 = x.data;
                 return rts.bytesFromAscii("");
               default:
                 throw rts.exceptions.UnhandledCase("DEF_97b5de980c3149218877e33920fb5729"
                                                   ,"8d9250a6123ff265d7652592a88c96a8");
             }
          }());
   };
   var x = Object.assign({localPath: function () {
                           var x = function (x1249) {
                                      return x1249;
                                   }(unprefixed({whole: function (x1239) {
                                                   return x1239;
                                                }(local_1229)
                                                ,prefix: function (x1240) {
                                                   return x1240;
                                                }(rts.bytesFromAscii("http://"))}));
                           switch (x.tag)
                           {
                             case "just":
                               return local_1238(x.data);
                             case "nothing":
                               var local_1250 = x.data;
                               var x = function (x1253) {
                                          return x1253;
                                       }(unprefixed({whole: function (x1251) {
                                                       return x1251;
                                                    }(local_1229)
                                                    ,prefix: function (x1252) {
                                                       return x1252;
                                                    }(rts.bytesFromAscii("https://"))}));
                               switch (x.tag)
                               {
                                 case "just":
                                   return local_1238(x.data);
                                 case "nothing":
                                   var local_1254 = x.data;
                                   return nonEmpty(local_1229);
                                 default:
                                   throw rts.exceptions.UnhandledCase("DEF_97b5de980c3149218877e33920fb5729"
                                                                     ,"c0dd43e18ed983b36e5c60602a58a1ca");
                               }
                             default:
                               throw rts.exceptions.UnhandledCase("DEF_97b5de980c3149218877e33920fb5729"
                                                                 ,"fe5bc8fad7ae34a3fea4792464e3f2d9");
                           }
                        }()}
                        ,local_1228);
   delete x.cacheId;
   return x;
};
var httpContinueMessage = function (local_1258) {
   return concat2(_3a__3a_({infixl: function () {
                              var x = function (x1259) {
                                         return x1259;
                                      }(_3d__3d_({infixl: local_1258
                                                 ,infixr: {minor: 1.0,major: 1.0}}));
                              switch (x.tag)
                              {
                                case "false":
                                  var local_1260 = x.data;
                                  return function (x1261) {
                                         return x1261;
                                      }(rts.bytesFromAscii("HTTP/1.0"));
                                case "true":
                                  var local_1262 = x.data;
                                  return function (x1263) {
                                         return x1263;
                                      }(rts.bytesFromAscii("HTTP/1.1"));
                                default:
                                  throw rts.exceptions.UnhandledCase("DEF_28b20b49b76041158f817cb6f1ae7069"
                                                                    ,"7a33dc1474f28318b0a1a21410017295");
                              }
                           }()
                           ,infixr: function (local_1264) {
                              return _3a__3a_({infixl: function (x1265) {
                                                 return x1265;
                                              }(rts.bytesFromAscii(" 100 Continue"))
                                              ,infixr: function (local_1266) {
                                                 return _3a__3a_({infixl: rts.bytes([13
                                                                                    ,10
                                                                                    ,13
                                                                                    ,10])
                                                                 ,infixr: function (local_1267) {
                                                                    return {tag: "empty"
                                                                           ,data: {}};
                                                                 }});
                                              }});
                           }}));
};
var parseHttpRequestPacket = function (local_994) {
   var local_1003 = _3b_({infixl: popLastMutArray(local_994.unparsedPackets)
                         ,infixr: function (local_999) {
                            var x = function (x1000) { return x1000;}(local_999);
                            switch (x.tag)
                            {
                              case "just":
                                var local_1001 = x.data;
                                return parseHttpRequestPacket({socket: local_994.socket
                                                              ,unparsedPackets: local_994.unparsedPackets
                                                              ,newPacket: local_1001
                                                              ,stateRef: local_994.stateRef
                                                              ,handler: local_994.handler});
                              case "nothing":
                                var local_1002 = x.data;
                                return __return({});
                              default:
                                throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                  ,"a71ca59bb3302212a2d667ac7d89c4e8");
                            }
                         }});
   return _3b_({infixl: readMutRef(local_994.stateRef)
               ,infixr: function (x1004) {
                  switch (x1004.tag)
                  {
                    case "body":
                      var local_1005 = x1004.data;
                      var local_1006 = length(local_994.newPacket);
                      var x = function (x1007) {
                                 return x1007;
                              }(_3c_({infixl: local_1006,infixr: local_1005.remain}));
                      switch (x.tag)
                      {
                        case "false":
                          var local_1008 = x.data;
                          return _3b_({infixl: length4(local_994.unparsedPackets)
                                      ,infixr: function (local_1009) {
                                         return _3b_({infixl: sequence(map({list: _2e__2e_({start: 0.0
                                                                                           ,stop: local_1009})
                                                                           ,mapping: function (local_1010) {
                                                                              return readMutArray({index: local_1010
                                                                                                  ,object: local_994.unparsedPackets});
                                                                           }}))
                                                     ,infixr: function (packets) {
                                                        return _3b_({infixl: _3b_({infixl: truncateMutArray({object: local_994.unparsedPackets
                                                                                                            ,stop: 0.0})
                                                                                  ,infixr: function (local_1011) {
                                                                                     return local_994.handler({request: function () {
                                                                                                                 var x =
                                                                                                                 Object.assign({body: {tag: "just"
                                                                                                                                      ,data: concat2(_2b__2b_2({infixl: packets
                                                                                                                                                               ,infixr: function (local_1012) {
                                                                                                                                                                  return _3a__3a_({infixl: slice({object: local_994.newPacket
                                                                                                                                                                                                 ,start: 0.0
                                                                                                                                                                                                 ,stop: local_1005.remain})
                                                                                                                                                                                  ,infixr: function (local_1013) {
                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                  }});
                                                                                                                                                               }}))}}
                                                                                                                              ,local_1005.request);
                                                                                                                 delete x.cacheId;
                                                                                                                 return x;
                                                                                                              }()
                                                                                                              ,socket: local_994.socket});
                                                                                  }})
                                                                    ,infixr: function (local_1014) {
                                                                       return _3b_({infixl: writeMutRef({object: local_994.stateRef
                                                                                                        ,value: {tag: "header"
                                                                                                                ,data: {}}})
                                                                                   ,infixr: function (local_1015) {
                                                                                      var x =
                                                                                      function (x1016) {
                                                                                         return x1016;
                                                                                      }(_3c_({infixl: local_1005.remain
                                                                                             ,infixr: local_1006}));
                                                                                      switch (x.tag)
                                                                                      {
                                                                                        case "false":
                                                                                          var local_1017 =
                                                                                          x.data;
                                                                                          return __return({});
                                                                                        case "true":
                                                                                          var local_1018 =
                                                                                          x.data;
                                                                                          return parseHttpRequestPacket({socket: local_994.socket
                                                                                                                        ,unparsedPackets: local_994.unparsedPackets
                                                                                                                        ,newPacket: slice({object: local_994.newPacket
                                                                                                                                          ,start: local_1005.remain
                                                                                                                                          ,stop: local_1006})
                                                                                                                        ,stateRef: local_994.stateRef
                                                                                                                        ,handler: local_994.handler});
                                                                                        default:
                                                                                          throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                                            ,"648f5244207bc3a94b77db16bd2ed183");
                                                                                      }
                                                                                   }});
                                                                    }});
                                                     }});
                                      }});
                        case "true":
                          var local_1019 = x.data;
                          return _3b_({infixl: appendMutArray({object: local_994.unparsedPackets
                                                              ,value: local_994.newPacket})
                                      ,infixr: function (local_1020) {
                                         return writeMutRef({object: local_994.stateRef
                                                            ,value: {tag: "body"
                                                                    ,data: {request: local_1005.request
                                                                           ,remain: _2d_({infixl: local_1005.remain
                                                                                         ,infixr: local_1006})}}});
                                      }});
                        default:
                          throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                            ,"4a7857b1e6dc15eee111f928eef30ceb");
                      }
                    case "header":
                      var local_1021 = x1004.data;
                      return _3b_({infixl: parseHttpHeaderPacket({start: 0.0
                                                                 ,newPacket: local_994.newPacket
                                                                 ,packets: local_994.unparsedPackets})
                                  ,infixr: function (local_1084) {
                                     var x = function (x1085) {
                                                return x1085;
                                             }(local_1084);
                                     switch (x.tag)
                                     {
                                       case "just":
                                         var local_1086 = x.data;
                                         var request1 = function () {
                                                           var x =
                                                           Object.assign({headers: parseHeaders(local_1086)}
                                                                        ,httpAddLocalPath(parseRequestLine(item({index: 0.0
                                                                                                                ,object: local_1086}))));
                                                           delete x.cacheId;
                                                           return x;
                                                        }();
                                         return _3b_({infixl: function () {
                                                        var x = function (x1255) {
                                                                   return x1255;
                                                                }(_3d__3d_({infixl: request1.headers.expect
                                                                           ,infixr: {tag: "just"
                                                                                    ,data: rts.bytesFromAscii("100-continue")}}));
                                                        switch (x.tag)
                                                        {
                                                          case "false":
                                                            var local_1256 = x.data;
                                                            return __return({});
                                                          case "true":
                                                            var local_1257 = x.data;
                                                            return send({__data: httpContinueMessage(request1.httpVersion)
                                                                        ,socket: local_994.socket});
                                                          default:
                                                            throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                              ,"0010e59778d59572282a2dab5b43c99f");
                                                        }
                                                     }()
                                                     ,infixr: function (local_1268) {
                                                        return _3b_({infixl: function () {
                                                                       var x =
                                                                       function (x1269) {
                                                                          return x1269;
                                                                       }(request1.headers.contentLength);
                                                                       switch (x.tag)
                                                                       {
                                                                         case "just":
                                                                           var local_1270 =
                                                                           x.data;
                                                                           return writeMutRef({object: local_994.stateRef
                                                                                              ,value: {tag: "body"
                                                                                                      ,data: {request: request1
                                                                                                             ,remain: parseInt(local_1270)}}});
                                                                         case "nothing":
                                                                           var local_1271 =
                                                                           x.data;
                                                                           return local_994.handler({request: function () {
                                                                                                       var x =
                                                                                                       Object.assign({body: {tag: "nothing"
                                                                                                                            ,data: {}}}
                                                                                                                    ,request1);
                                                                                                       delete x.cacheId;
                                                                                                       return x;
                                                                                                    }()
                                                                                                    ,socket: local_994.socket});
                                                                         default:
                                                                           throw rts.exceptions.UnhandledCase("DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                             ,"c91c5cea0890a94419165f2c0e413659");
                                                                       }
                                                                    }()
                                                                    ,infixr: function (local_1272) {
                                                                       return local_1003;
                                                                    }});
                                                     }});
                                       case "nothing":
                                         var local_1273 = x.data;
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
var parseHttpRequests = function (local_992) {
   return _3b_({infixl: newMutRef({tag: "header",data: {}})
               ,infixr: function (stateRef) {
                  return _3b_({infixl: newMutArray
                              ,infixr: function (unparsedPackets) {
                                 return __return(function (local_993) {
                                        return parseHttpRequestPacket({socket: local_992.socket
                                                                      ,unparsedPackets: unparsedPackets
                                                                      ,newPacket: local_993
                                                                      ,stateRef: stateRef
                                                                      ,handler: local_992.handler});
                                     });
                              }});
               }});
};
var openTcpServer = rts.builtins.IO.network["openTcpServer"];
var httpServer = function (local_980) {
   return openTcpServer({connectionHandler: function (socket) {
                           return parseHttpRequests({socket: socket
                                                    ,handler: function (local_981) {
                                                       return _3b_({infixl: local_980.handler(local_981.request)
                                                                   ,infixr: function (local_982) {
                                                                      return send({__data: _2b__2b_1({a: function (x991) {
                                                                                                        return x991;
                                                                                                     }(join({texts: _3a__3a_({infixl: join({texts: _3a__3a_({infixl: rts.bytesFromAscii("HTTP/1.1")
                                                                                                                                                            ,infixr: function (local_983) {
                                                                                                                                                               return _3a__3a_({infixl: showNum(local_982.status.code)
                                                                                                                                                                               ,infixr: function (local_984) {
                                                                                                                                                                                  return _3a__3a_({infixl: local_982.status.message
                                                                                                                                                                                                  ,infixr: function (local_985) {
                                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                                  }});
                                                                                                                                                                               }});
                                                                                                                                                            }})
                                                                                                                                           ,seperator: rts.bytesFromAscii(" ")})
                                                                                                                             ,infixr: function (local_986) {
                                                                                                                                return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Type: ")
                                                                                                                                                                  ,b: local_982.content.mimeType})
                                                                                                                                                ,infixr: function (local_987) {
                                                                                                                                                   return _3a__3a_({infixl: _2b__2b_({a: rts.bytesFromAscii("Content-Length: ")
                                                                                                                                                                                     ,b: showNum(length(local_982.content.__data))})
                                                                                                                                                                   ,infixr: function (local_988) {
                                                                                                                                                                      return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                      ,infixr: function (local_989) {
                                                                                                                                                                                         return _3a__3a_({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                                         ,infixr: function (local_990) {
                                                                                                                                                                                                            return {tag: "empty"
                                                                                                                                                                                                                   ,data: {}};
                                                                                                                                                                                                         }});
                                                                                                                                                                                      }});
                                                                                                                                                                   }});
                                                                                                                                                }});
                                                                                                                             }})
                                                                                                            ,seperator: rts.bytesFromAscii("\r\n")}))
                                                                                                     ,b: local_982.content.__data})
                                                                                  ,socket: socket});
                                                                   }});
                                                    }});
                        }
                        ,exclusive: {tag: "false",data: {}}
                        ,host: local_980.host
                        ,port: local_980.port});
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
