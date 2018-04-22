"use strict";
var rts = require("./rts.js");
var environment = rts.memo(function () { return rts.builtins.IO.os["env"];});
var length = rts.memo(function () { return rts.builtins.Bytes["length"];});
var _2b_ = rts.memo(function () { return rts.builtins.Prelude["+"];});
var slice1 = rts.memo(function () { return rts.builtins.Bytes["slice"];});
var _3d__3d_ = rts.memo(function () { return rts.builtins.Prelude["=="];});
var _2d_ = rts.memo(function () { return rts.builtins.Prelude["-"];});
var iterate = rts.memo(function () {
                 return function (local_10) {
                        return {tag: "nonEmpty"
                               ,data: {head: local_10.initial
                                      ,tail: function (local_11) {
                                         return iterate()({initial: local_10.next(local_10.initial)
                                                          ,next: local_10.next});
                                      }}};
                     };
              });
var _3e_ = rts.memo(function () { return rts.builtins.Prelude[">"];});
var _3c_ = rts.memo(function () { return rts.builtins.Prelude["<"];});
var take = rts.memo(function () {
              return function (local_16) {
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
                                              return take()({stream: local_17.tail({})
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
           });
var _2e__2e_1 = rts.memo(function () {
                   return function (local_8) {
                          return take()({stream: iterate()({initial: local_8.start
                                                           ,next: function (local_9) {
                                                              return _2b_()({infixl: local_9
                                                                            ,infixr: local_8.step});
                                                           }})
                                        ,__while: function () {
                                           var x = _3e_()({infixl: local_8.step
                                                          ,infixr: 0.0});
                                           switch (x.tag)
                                           {
                                             case "false":
                                               var local_12 = x.data;
                                               return function (local_13) {
                                                      return _3e_()({infixl: local_13
                                                                    ,infixr: local_8.stop});
                                                   };
                                             case "true":
                                               var local_14 = x.data;
                                               return function (local_15) {
                                                      return _3c_()({infixl: local_15
                                                                    ,infixr: local_8.stop});
                                                   };
                                             default:
                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                            ,"DEF_976e4af994d74546b61bfcdc6bf2c950"
                                                                            ,"0cab2989e68742c6aedf4360d1ce05ae");
                                           }
                                        }()});
                       };
                });
var _2e__2e_ = rts.memo(function () {
                  return function (local_7) {
                         return _2e__2e_1()({step: 1.0
                                            ,start: local_7.start
                                            ,stop: local_7.stop});
                      };
               });
var first = rts.memo(function () {
               return function (local_22) {
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
                              return first()({that: local_22.that
                                             ,stream: local_23.tail({})});
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
            });
var find = rts.memo(function () {
              return function (local_5) {
                     var subLen = length()(local_5.slice);
                     return first()({that: function (local_6) {
                                       return _3d__3d_()({infixl: slice1()({object: local_5.__bytes
                                                                           ,start: local_6
                                                                           ,stop: _2b_()({infixl: local_6
                                                                                         ,infixr: subLen})})
                                                         ,infixr: local_5.slice});
                                    }
                                    ,stream: _2e__2e_()({start: 0.0
                                                        ,stop: _2b_()({infixl: _2d_()({infixl: length()(local_5.__bytes)
                                                                                      ,infixr: subLen})
                                                                      ,infixr: 1.0})})});
                  };
           });
var _3a__3a_ = rts.memo(function () {
                  return function (local_29) {
                         return {tag: "nonEmpty"
                                ,data: {head: local_29.infixl,tail: local_29.infixr}};
                      };
               });
var split1 = rts.memo(function () {
                return function (local_4) {
                       var x = find()({__bytes: local_4.__bytes
                                      ,slice: local_4.seperator});
                       switch (x.tag)
                       {
                         case "just":
                           var local_27 = x.data;
                           return _3a__3a_()({infixl: slice1()({object: local_4.__bytes
                                                               ,start: 0.0
                                                               ,stop: local_27})
                                             ,infixr: function (local_28) {
                                                return split1()({__bytes: slice1()({object: local_4.__bytes
                                                                                   ,start: _2b_()({infixl: local_27
                                                                                                  ,infixr: length()(local_4.seperator)})
                                                                                   ,stop: length()(local_4.__bytes)})
                                                                ,seperator: local_4.seperator});
                                             }});
                         case "nothing":
                           var local_30 = x.data;
                           return _3a__3a_()({infixl: local_4.__bytes
                                             ,infixr: function (local_31) {
                                                return {tag: "empty",data: {}};
                                             }});
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_b21053ea92ed45029fa78a5121bf6e3a"
                                                        ,"ff767a75261daa1e4a165bc04bb8c028");
                       }
                    };
             });
var foldLazy = rts.memo(function () {
                  return function (local_36) {
                         var x = local_36.stream;
                         switch (x.tag)
                         {
                           case "nonEmpty":
                             var local_37 = x.data;
                             return local_36.binop({rest: function (local_38) {
                                                      var dummy =
                                                      _3d__3d_()({infixl: local_38
                                                                 ,infixr: {}});
                                                      return foldLazy()({stream: local_37.tail({})
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
               });
var map = rts.memo(function () {
             return function (local_33) {
                    return foldLazy()({stream: local_33.stream
                                      ,initial: function (local_34) {
                                         return {tag: "empty",data: {}};
                                      }
                                      ,binop: function (local_35) {
                                         return {tag: "nonEmpty"
                                                ,data: {head: local_33.mapping(local_35.item)
                                                       ,tail: local_35.rest}};
                                      }});
                 };
          });
var split = rts.memo(function () {
               return function (local_3) {
                      return map()({stream: split1()({__bytes: local_3.text
                                                     ,seperator: local_3.seperator})
                                   ,mapping: function (local_32) {
                                      return local_32;
                                   }});
                   };
            });
var newMutArray = rts.memo(function () { return rts.builtins.Mut.Array["new"];});
var appendMutArray = rts.memo(function () { return rts.builtins.Mut.Array["append"];});
var __return = rts.memo(function () { return rts.builtins.Mut["return"];});
var _3b_ = rts.memo(function () { return rts.builtins.Mut["bind"];});
var sequence__ = rts.memo(function () {
                    return function (stream2) {
                           return foldLazy()({stream: stream2
                                             ,initial: function (local_40) {
                                                return __return()({});
                                             }
                                             ,binop: function (local_41) {
                                                return _3b_()({infixl: local_41.item
                                                              ,infixr: function (local_42) {
                                                                 return local_41.rest({});
                                                              }});
                                             }});
                        };
                 });
var runMutArray = rts.memo(function () { return rts.builtins.Mut.Array["run"];});
var toArray = rts.memo(function () {
                 return function (stream1) {
                        return runMutArray()(_3b_()({infixl: newMutArray()
                                                    ,infixr: function (__array) {
                                                       return _3b_()({infixl: sequence__()(map()({stream: stream1
                                                                                                 ,mapping: function (local_39) {
                                                                                                    return appendMutArray()({object: __array
                                                                                                                            ,value: local_39});
                                                                                                 }}))
                                                                     ,infixr: function (local_43) {
                                                                        return __return()(__array);
                                                                     }});
                                                    }}));
                     };
              });
var length1 = rts.memo(function () { return rts.builtins.Array["length"];});
var item1 = rts.memo(function () { return rts.builtins.Array["item"];});
var _26__26_ = rts.memo(function () {
                  return function (local_47) {
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
               });
var ignoreError = rts.memo(function () {
                     return function (local_50) {
                            throw rts.exceptions.ReachedHole("Reached a hole"
                                                            ,"DEF_157261c59c9a44f1867b85e4d1b49818"
                                                            ,"4c518e5b0faa46fe87f4941f1e0cbe54");
                         };
                  });
var byteAt = rts.memo(function () { return rts.builtins.Bytes["byteAt"];});
var fromBytes = rts.memo(function () {
                   return function (__bytes1) {
                          var length2 = length()(__bytes1);
                          return map()({stream: _2e__2e_()({start: 0.0,stop: length2})
                                       ,mapping: function (local_59) {
                                          return byteAt()({index: local_59
                                                          ,object: __bytes1});
                                       }});
                       };
                });
var _2a_ = rts.memo(function () { return rts.builtins.Prelude["*"];});
var fold = rts.memo(function () {
              return function (local_61) {
                     var x = local_61.stream;
                     switch (x.tag)
                     {
                       case "nonEmpty":
                         var local_62 = x.data;
                         return fold()({stream: local_62.tail({})
                                       ,initial: local_61.binop({acc: local_61.initial
                                                                ,item: local_62.head})
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
           });
var parseInt = rts.memo(function () {
                  return function (local_58) {
                         return fold()({stream: fromBytes()(local_58)
                                       ,initial: 0.0
                                       ,binop: function (local_60) {
                                          return _2d_()({infixl: _2b_()({infixl: _2a_()({infixl: local_60.acc
                                                                                        ,infixr: 10.0})
                                                                        ,infixr: local_60.item})
                                                        ,infixr: 48.0});
                                       }});
                      };
               });
var parseDatabaseUrl = rts.memo(function () {
                          return function (url) {
                                 var local_44 = toArray()(split()({text: url
                                                                  ,seperator: rts.bytesFromAscii("/")}));
                                 var x =
                                 _26__26_()({infixl: _3d__3d_()({infixl: length1()(local_44)
                                                                ,infixr: 4.0})
                                            ,infixr: function (local_45) {
                                               return _26__26_()({infixl: _3d__3d_()({infixl: item1()({index: 0.0
                                                                                                      ,object: local_44})
                                                                                     ,infixr: rts.bytesFromAscii("postgres:")})
                                                                 ,infixr: function (local_46) {
                                                                    return _3d__3d_()({infixl: item1()({index: 1.0
                                                                                                       ,object: local_44})
                                                                                      ,infixr: rts.bytesFromAscii("")});
                                                                 }});
                                            }});
                                 switch (x.tag)
                                 {
                                   case "false":
                                     var local_49 = x.data;
                                     return ignoreError()(function () {
                                            throw rts.exceptions.ReachedHole("Reached a hole"
                                                                            ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                                                            ,"5813e29d7943cb3b7293f7b5baf46584");
                                         }());
                                   case "true":
                                     var local_51 = x.data;
                                     var local_52 =
                                     toArray()(split()({text: item1()({index: 2.0
                                                                      ,object: local_44})
                                                       ,seperator: rts.bytesFromAscii(":")}));
                                     var x = _3d__3d_()({infixl: length1()(local_52)
                                                        ,infixr: 3.0});
                                     switch (x.tag)
                                     {
                                       case "false":
                                         var local_53 = x.data;
                                         return ignoreError()(function () {
                                                throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                                                                ,"0f3aa79fa902ac4dcfbe4ffb6cb00ace");
                                             }());
                                       case "true":
                                         var local_54 = x.data;
                                         var local_55 =
                                         toArray()(split()({text: item1()({index: 1.0
                                                                          ,object: local_52})
                                                           ,seperator: rts.bytesFromAscii("@")}));
                                         var x = _3d__3d_()({infixl: length1()(local_55)
                                                            ,infixr: 2.0});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_56 = x.data;
                                             throw rts.exceptions.ReachedHole("Reached a hole"
                                                                             ,"DEF_5e281136bf384c60bf0fda3ed9d59365"
                                                                             ,"5f05f8b37b1c7b3e9433533043cfce0c");
                                           case "true":
                                             var local_57 = x.data;
                                             return {database: item1()({index: 3.0
                                                                       ,object: local_44})
                                                    ,host: item1()({index: 1.0
                                                                   ,object: local_55})
                                                    ,password: item1()({index: 0.0
                                                                       ,object: local_55})
                                                    ,port: parseInt()(item1()({index: 2.0
                                                                              ,object: local_52}))
                                                    ,user: item1()({index: 0.0
                                                                   ,object: local_52})};
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
                       });
var connect = rts.memo(function () {
                 return rts.builtins.IO.database.postgres["connect"];
              });
var pestovalDb = rts.memo(function () {
                    return _3b_()({infixl: environment()(rts.bytesFromAscii("DATABASE_URL"))
                                  ,infixr: function (local_1) {
                                     return connect()(function () {
                                            var x = local_1;
                                            switch (x.tag)
                                            {
                                              case "just":
                                                var local_2 = x.data;
                                                return parseDatabaseUrl()(local_2);
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
                 });
var fromArray = rts.memo(function () {
                   return function (__array1) {
                          var length3 = length1()(__array1);
                          return map()({stream: _2e__2e_()({start: 0.0,stop: length3})
                                       ,mapping: function (local_70) {
                                          return item1()({index: local_70
                                                         ,object: __array1});
                                       }});
                       };
                });
var _2264_ = rts.memo(function () { return rts.builtins.Prelude["<="];});
var drop = rts.memo(function () {
              return function (local_71) {
                     var x = _2264_()({infixl: local_71.count,infixr: 0.0});
                     switch (x.tag)
                     {
                       case "false":
                         var local_72 = x.data;
                         var x = local_71.stream;
                         switch (x.tag)
                         {
                           case "nonEmpty":
                             var local_73 = x.data;
                             return drop()({stream: local_73.tail({})
                                           ,count: _2d_()({infixl: local_71.count
                                                          ,infixr: 1.0})});
                           case "empty":
                             var local_74 = x.data;
                             return {tag: "empty",data: {}};
                           default:
                             throw rts.exceptions.LamduBug("Unhandled case"
                                                          ,"DEF_efdcd00625534eb5b480c13776995953"
                                                          ,"3484afddcc5745189195b1b977bc31a4");
                         }
                       case "true":
                         var local_75 = x.data;
                         return local_71.stream;
                       default:
                         throw rts.exceptions.LamduBug("Unhandled case"
                                                      ,"DEF_efdcd00625534eb5b480c13776995953"
                                                      ,"f4402d1f89754f369b736a668f8d2784");
                     }
                  };
           });
var _2b__2b_2 = rts.memo(function () {
                   return function (local_85) {
                          return foldLazy()({stream: local_85.infixl
                                            ,initial: local_85.infixr
                                            ,binop: function (local_86) {
                                               return {tag: "nonEmpty"
                                                      ,data: {head: local_86.item
                                                             ,tail: local_86.rest}};
                                            }});
                       };
                });
var toBytes = rts.memo(function () { return rts.builtins.Bytes["fromArray"];});
var _2b__2b_1 = rts.memo(function () {
                   return function (local_83) {
                          return toBytes()(toArray()(_2b__2b_2()({infixl: fromBytes()(local_83.a)
                                                                 ,infixr: function (local_84) {
                                                                    return fromBytes()(local_83.b);
                                                                 }})));
                       };
                });
var _2b__2b_ = rts.memo(function () {
                  return function (local_82) {
                         return _2b__2b_1()({a: local_82.a,b: local_82.b});
                      };
               });
var httpNotFound404 = rts.memo(function () {
                         return function (local_81) {
                                return {content: {__data: _2b__2b_()({a: rts.bytesFromAscii("Not found: ")
                                                                     ,b: local_81})
                                                 ,mimeType: rts.bytesFromAscii("text/plain")}
                                       ,status: {message: rts.bytesFromAscii("Not Found")
                                                ,code: 404.0}};
                             };
                      });
var _2f__2f_ = rts.memo(function () { return rts.builtins.Prelude["div"];});
var _2260_ = rts.memo(function () { return rts.builtins.Prelude["/="];});
var _25_ = rts.memo(function () { return rts.builtins.Prelude["mod"];});
var digitsLittleEndian = rts.memo(function () {
                            return function (local_92) {
                                   return map()({stream: take()({stream: iterate()({initial: local_92.__number
                                                                                   ,next: function (local_93) {
                                                                                      return _2f__2f_()({infixl: local_93
                                                                                                        ,infixr: local_92.base});
                                                                                   }})
                                                                ,__while: function (local_94) {
                                                                   return _2260_()({infixl: local_94
                                                                                   ,infixr: 0.0});
                                                                }})
                                                ,mapping: function (local_95) {
                                                   return _25_()({infixl: local_95
                                                                 ,infixr: local_92.base});
                                                }});
                                };
                         });
var reverse = rts.memo(function () {
                 return function (stream3) {
                        return fold()({stream: stream3
                                      ,initial: {tag: "empty",data: {}}
                                      ,binop: function (local_96) {
                                         return {tag: "nonEmpty"
                                                ,data: {head: local_96.item
                                                       ,tail: function (local_97) {
                                                          return local_96.acc;
                                                       }}};
                                      }});
                     };
              });
var showNum = rts.memo(function () {
                 return function (local_90) {
                        var x = _3d__3d_()({infixl: local_90,infixr: 0.0});
                        switch (x.tag)
                        {
                          case "false":
                            var local_91 = x.data;
                            return toBytes()(toArray()(map()({stream: reverse()(digitsLittleEndian()({__number: local_90
                                                                                                     ,base: 10.0}))
                                                             ,mapping: function (local_98) {
                                                                return _2b_()({infixl: 48.0
                                                                              ,infixr: local_98});
                                                             }})));
                          case "true":
                            var local_99 = x.data;
                            return rts.bytesFromAscii("0");
                          default:
                            throw rts.exceptions.LamduBug("Unhandled case"
                                                         ,"DEF_8dc07f8cc25f46b2bd345789b6a59f4d"
                                                         ,"39f9fdd2b9889a256be50861539f39e5");
                        }
                     };
              });
var concat = rts.memo(function () {
                return function (stream4) {
                       return foldLazy()({stream: stream4
                                         ,initial: function (local_115) {
                                            return {tag: "empty",data: {}};
                                         }
                                         ,binop: function (local_116) {
                                            return _2b__2b_2()({infixl: local_116.item
                                                               ,infixr: local_116.rest});
                                         }});
                    };
             });
var intersperse = rts.memo(function () {
                     return function (local_109) {
                            var x = local_109.stream;
                            switch (x.tag)
                            {
                              case "nonEmpty":
                                var local_110 = x.data;
                                return {tag: "nonEmpty"
                                       ,data: {head: local_110.head
                                              ,tail: function (local_111) {
                                                 return concat()(map()({stream: local_110.tail({})
                                                                       ,mapping: function (local_112) {
                                                                          return {tag: "nonEmpty"
                                                                                 ,data: {head: local_109.item
                                                                                        ,tail: function (local_113) {
                                                                                           return {tag: "nonEmpty"
                                                                                                  ,data: {head: local_112
                                                                                                         ,tail: function (local_114) {
                                                                                                            return {tag: "empty"
                                                                                                                   ,data: {}};
                                                                                                         }}};
                                                                                        }}};
                                                                       }}));
                                              }}};
                              case "empty":
                                var local_117 = x.data;
                                return {tag: "empty",data: {}};
                              default:
                                throw rts.exceptions.LamduBug("Unhandled case"
                                                             ,"DEF_579c35851cfc4b5aa7495fd3f68d64f9"
                                                             ,"7e436409026e4dd49fb7d2389f2caa1d");
                            }
                         };
                  });
var concat2 = rts.memo(function () {
                 return function (stream6) {
                        return toBytes()(toArray()(concat()(map()({stream: stream6
                                                                  ,mapping: function (local_119) {
                                                                     return fromBytes()(local_119);
                                                                  }}))));
                     };
              });
var concat1 = rts.memo(function () {
                 return function (stream5) {
                        return concat2()(map()({stream: stream5
                                               ,mapping: function (local_118) {
                                                  return local_118;
                                               }}));
                     };
              });
var join = rts.memo(function () {
              return function (local_108) {
                     return concat1()(intersperse()({stream: local_108.texts
                                                    ,item: local_108.seperator}));
                  };
           });
var query = rts.memo(function () { return rts.builtins.IO.database.postgres["query"];});
var newMutArray1 = rts.memo(function () {
                      return function (stream7) {
                             return _3b_()({infixl: newMutArray()
                                           ,infixr: function (__array2) {
                                              return _3b_()({infixl: sequence__()(map()({stream: stream7
                                                                                        ,mapping: function (item2) {
                                                                                           return appendMutArray()({object: __array2
                                                                                                                   ,value: item2});
                                                                                        }}))
                                                            ,infixr: function (local_148) {
                                                               return __return()(__array2);
                                                            }});
                                           }});
                          };
                   });
var length4 = rts.memo(function () { return rts.builtins.Mut.Array["length"];});
var _2265_ = rts.memo(function () { return rts.builtins.Prelude[">="];});
var readMutArray = rts.memo(function () { return rts.builtins.Mut.Array["read"];});
var newMutRef = rts.memo(function () { return rts.builtins.Mut.Ref["new"];});
var readMutRef = rts.memo(function () { return rts.builtins.Mut.Ref["read"];});
var writeMutArray = rts.memo(function () { return rts.builtins.Mut.Array["write"];});
var writeMutRef = rts.memo(function () { return rts.builtins.Mut.Ref["write"];});
var sort1 = rts.memo(function () {
               return function (local_150) {
                      var x = _2265_()({infixl: _2b_()({infixl: local_150.start
                                                       ,infixr: 1.0})
                                       ,infixr: local_150.stop});
                      switch (x.tag)
                      {
                        case "false":
                          var local_151 = x.data;
                          return _3b_()({infixl: readMutArray()({index: local_150.start
                                                                ,object: local_150.__array4})
                                        ,infixr: function (pivot) {
                                           return _3b_()({infixl: newMutRef()(local_150.start)
                                                         ,infixr: function (pivotPosRef) {
                                                            return _3b_()({infixl: sequence__()(map()({stream: _2e__2e_()({start: _2b_()({infixl: local_150.start
                                                                                                                                         ,infixr: 1.0})
                                                                                                                          ,stop: local_150.stop})
                                                                                                      ,mapping: function (index1) {
                                                                                                         return _3b_()({infixl: readMutArray()({index: index1
                                                                                                                                               ,object: local_150.__array4})
                                                                                                                       ,infixr: function (object1) {
                                                                                                                          var x =
                                                                                                                          local_150._3c_1({infixl: object1
                                                                                                                                          ,infixr: pivot});
                                                                                                                          switch (x.tag)
                                                                                                                          {
                                                                                                                            case "false":
                                                                                                                              var local_152 =
                                                                                                                              x.data;
                                                                                                                              return __return()({});
                                                                                                                            case "true":
                                                                                                                              var local_153 =
                                                                                                                              x.data;
                                                                                                                              return _3b_()({infixl: readMutRef()(pivotPosRef)
                                                                                                                                            ,infixr: function (pivotPos) {
                                                                                                                                               return _3b_()({infixl: writeMutArray()({index: pivotPos
                                                                                                                                                                                      ,object: local_150.__array4
                                                                                                                                                                                      ,value: object1})
                                                                                                                                                             ,infixr: function (local_154) {
                                                                                                                                                                var newPivotPos =
                                                                                                                                                                _2b_()({infixl: pivotPos
                                                                                                                                                                       ,infixr: 1.0});
                                                                                                                                                                return _3b_()({infixl: writeMutRef()({object: pivotPosRef
                                                                                                                                                                                                     ,value: newPivotPos})
                                                                                                                                                                              ,infixr: function (local_155) {
                                                                                                                                                                                 return _3b_()({infixl: readMutArray()({index: newPivotPos
                                                                                                                                                                                                                       ,object: local_150.__array4})
                                                                                                                                                                                               ,infixr: function (local_156) {
                                                                                                                                                                                                  return writeMutArray()({index: index1
                                                                                                                                                                                                                         ,object: local_150.__array4
                                                                                                                                                                                                                         ,value: local_156});
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
                                                                          ,infixr: function (local_157) {
                                                                             return _3b_()({infixl: readMutRef()(pivotPosRef)
                                                                                           ,infixr: function (index2) {
                                                                                              return _3b_()({infixl: writeMutArray()({index: index2
                                                                                                                                     ,object: local_150.__array4
                                                                                                                                     ,value: pivot})
                                                                                                            ,infixr: function (local_158) {
                                                                                                               return _3b_()({infixl: sort1()({start: local_150.start
                                                                                                                                              ,stop: index2
                                                                                                                                              ,_3c_1: local_150._3c_1
                                                                                                                                              ,__array4: local_150.__array4})
                                                                                                                             ,infixr: function (local_159) {
                                                                                                                                return sort1()({start: _2b_()({infixl: index2
                                                                                                                                                              ,infixr: 1.0})
                                                                                                                                               ,stop: local_150.stop
                                                                                                                                               ,_3c_1: local_150._3c_1
                                                                                                                                               ,__array4: local_150.__array4});
                                                                                                                             }});
                                                                                                            }});
                                                                                           }});
                                                                          }});
                                                         }});
                                        }});
                        case "true":
                          var local_160 = x.data;
                          return __return()({});
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_7dc48073b9e642f0921b10b11676f38b"
                                                       ,"767c3133b4f8a61071c98bc4f445f9a6");
                      }
                   };
            });
var sort = rts.memo(function () {
              return function (local_147) {
                     return runMutArray()(_3b_()({infixl: newMutArray1()(local_147.stream)
                                                 ,infixr: function (__array3) {
                                                    return _3b_()({infixl: length4()(__array3)
                                                                  ,infixr: function (local_149) {
                                                                     return _3b_()({infixl: sort1()({start: 0.0
                                                                                                    ,stop: local_149
                                                                                                    ,_3c_1: local_147._3c_1
                                                                                                    ,__array4: __array3})
                                                                                   ,infixr: function (local_161) {
                                                                                      return __return()(__array3);
                                                                                   }});
                                                                  }});
                                                 }}));
                  };
           });
var foldLazy1 = rts.memo(function () {
                   return function (local_177) {
                          return foldLazy()({stream: local_177.stream
                                            ,initial: function (local_178) {
                                               return local_177.done;
                                            }
                                            ,binop: function (local_179) {
                                               return function (state1) {
                                                      return local_177.step({state: state1
                                                                            ,rest: local_179.rest
                                                                            ,item: local_179.item});
                                                   };
                                            }})(local_177.initialState);
                       };
                });
var group = rts.memo(function () {
               return function (local_163) {
                      return foldLazy1()({stream: local_163.stream
                                         ,initialState: {tag: "empty",data: {}}
                                         ,step: function (local_164) {
                                            var x = local_164.state;
                                            switch (x.tag)
                                            {
                                              case "nonEmpty":
                                                var local_165 = x.data;
                                                var x =
                                                local_163.by({infixl: local_165.head
                                                             ,infixr: local_164.item});
                                                switch (x.tag)
                                                {
                                                  case "false":
                                                    var local_166 = x.data;
                                                    return _3a__3a_()({infixl: toArray()(reverse()(local_164.state))
                                                                      ,infixr: function (local_167) {
                                                                         return local_164.rest({})(_3a__3a_()({infixl: local_164.item
                                                                                                              ,infixr: function (local_168) {
                                                                                                                 return {tag: "empty"
                                                                                                                        ,data: {}};
                                                                                                              }}));
                                                                      }});
                                                  case "true":
                                                    var local_169 = x.data;
                                                    return local_164.rest({})(_3a__3a_()({infixl: local_164.item
                                                                                         ,infixr: function (local_170) {
                                                                                            return local_164.state;
                                                                                         }}));
                                                  default:
                                                    throw rts.exceptions.LamduBug("Unhandled case"
                                                                                 ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                                                 ,"80c64c4a3e825d563e72c3ff848be12a");
                                                }
                                              case "empty":
                                                var local_171 = x.data;
                                                return local_164.rest({})(_3a__3a_()({infixl: local_164.item
                                                                                     ,infixr: function (local_172) {
                                                                                        return {tag: "empty"
                                                                                               ,data: {}};
                                                                                     }}));
                                              default:
                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                             ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                                             ,"74a01a012e28a30393aafbb0e69c22f4");
                                            }
                                         }
                                         ,done: function (local_173) {
                                            var x = local_173;
                                            switch (x.tag)
                                            {
                                              case "nonEmpty":
                                                var local_174 = x.data;
                                                return _3a__3a_()({infixl: toArray()(reverse()(local_173))
                                                                  ,infixr: function (local_175) {
                                                                     return {tag: "empty"
                                                                            ,data: {}};
                                                                  }});
                                              case "empty":
                                                var local_176 = x.data;
                                                return {tag: "empty",data: {}};
                                              default:
                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                             ,"DEF_b1e58c7062114583b9357d62e817d1c6"
                                                                             ,"44a912bc33ec9c258e1ba58d8731bdd8");
                                            }
                                         }});
                   };
            });
var pestovalQuerySessionTeachers = rts.memo(function () {
                                      return function (local_142) {
                                             return _3b_()({infixl: query()({database: local_142
                                                                            ,object: rts.bytesFromAscii("SELECT\n  pestoval_teacher.name, pestoval_session_teachers.teacher_id, pestoval_session_teachers.session_id\nFROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_teacher ON pestoval_session_teachers.teacher_id = pestoval_teacher.id")})
                                                           ,infixr: function (x143) {
                                                              switch (x143.tag)
                                                              {
                                                                case "error":
                                                                  var local_144 =
                                                                  x143.data;
                                                                  return ignoreError()(local_144);
                                                                case "success":
                                                                  var local_145 =
                                                                  x143.data;
                                                                  return __return()(toArray()(map()({stream: group()({stream: fromArray()(sort()({stream: map()({stream: fromArray()(local_145.__data)
                                                                                                                                                                ,mapping: function (row) {
                                                                                                                                                                   return {teacher: {name: item1()({index: 0.0
                                                                                                                                                                                                   ,object: row})
                                                                                                                                                                                    ,id1: parseInt()(item1()({index: 1.0
                                                                                                                                                                                                             ,object: row}))}
                                                                                                                                                                          ,session: parseInt()(item1()({index: 2.0
                                                                                                                                                                                                       ,object: row}))};
                                                                                                                                                                }})
                                                                                                                                                 ,_3c_1: function (local_146) {
                                                                                                                                                    return _3c_()({infixl: local_146.infixl.session
                                                                                                                                                                  ,infixr: local_146.infixr.session});
                                                                                                                                                 }}))
                                                                                                                     ,by: function (local_162) {
                                                                                                                        return _3d__3d_()({infixl: local_162.infixl.session
                                                                                                                                          ,infixr: local_162.infixr.session});
                                                                                                                     }})
                                                                                                    ,mapping: function (local_180) {
                                                                                                       return {value: toArray()(map()({stream: fromArray()(local_180)
                                                                                                                                      ,mapping: function (local_181) {
                                                                                                                                         return local_181.teacher;
                                                                                                                                      }}))
                                                                                                              ,key: item1()({index: 0.0
                                                                                                                            ,object: local_180}).session};
                                                                                                    }})));
                                                                default:
                                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                                               ,"DEF_de80144d74df47438852d18bad3b3eaf"
                                                                                               ,"9800f3fc1326d8ea5b4af24b15b823d4");
                                                              }
                                                           }});
                                          };
                                   });
var id2 = rts.memo(function () { return function (__x) { return __x;};});
var unwords = rts.memo(function () {
                 return function (words) {
                        return join()({texts: words,seperator: rts.bytesFromAscii(" ")});
                     };
              });
var dayNames = rts.memo(function () {
                  return toArray()(split()({text: rts.bytesFromAscii("Mon Tue Wed Thu Fri Sat Sun")
                                           ,seperator: rts.bytesFromAscii(" ")}));
               });
var index4 = rts.memo(function () {
                return function (local_189) {
                       var x = first()({that: function (index5) {
                                          return _3d__3d_()({infixl: item1()({index: index5
                                                                             ,object: local_189.__array4})
                                                            ,infixr: local_189.item});
                                       }
                                       ,stream: _2e__2e_()({start: 0.0
                                                           ,stop: length1()(local_189.__array4)})});
                       switch (x.tag)
                       {
                         case "just":
                           return id2()(x.data);
                         case "nothing":
                           var local_190 = x.data;
                           throw rts.exceptions.ReachedHole("Reached a hole"
                                                           ,"DEF_bb1f3635a22340e9b8036656619efdc1"
                                                           ,"d0062c09c4ee2abcd4b0cc313b84fc5d");
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_bb1f3635a22340e9b8036656619efdc1"
                                                        ,"eafac946fbbd2eb5e94b628a7f5d6613");
                       }
                    };
             });
var monthNames = rts.memo(function () {
                    return toArray()(split()({text: rts.bytesFromAscii("Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec")
                                             ,seperator: rts.bytesFromAscii(" ")}));
                 });
var parseDateTime = rts.memo(function () {
                       return function (text1) {
                              var parts2 = toArray()(split()({text: text1
                                                             ,seperator: rts.bytesFromAscii(" ")}));
                              var item4 = function (local_185) {
                                 return item1()({index: local_185,object: parts2});
                              };
                              var timeText = toArray()(split()({text: item4(4.0)
                                                               ,seperator: rts.bytesFromAscii(":")}));
                              var timeItem = function (local_186) {
                                 return parseInt()(item1()({index: local_186
                                                           ,object: timeText}));
                              };
                              return {time: {timezone: unwords()(_3a__3a_()({infixl: item4(5.0)
                                                                            ,infixr: function (local_187) {
                                                                               return _3a__3a_()({infixl: item4(6.0)
                                                                                                 ,infixr: function (local_188) {
                                                                                                    return {tag: "empty"
                                                                                                           ,data: {}};
                                                                                                 }});
                                                                            }}))
                                            ,minute: timeItem(1.0)
                                            ,second: timeItem(2.0)
                                            ,hour: timeItem(0.0)}
                                     ,date: {weekDay: _2b_()({infixl: index4()({__array4: dayNames()
                                                                               ,item: item4(0.0)})
                                                             ,infixr: 1.0})
                                            ,month: _2b_()({infixl: index4()({__array4: monthNames()
                                                                             ,item: item4(1.0)})
                                                           ,infixr: 1.0})
                                            ,day: parseInt()(item4(2.0))
                                            ,year: parseInt()(item4(3.0))}};
                           };
                    });
var _3e__3d__3c_ = rts.memo(function () {
                      return function (local_193) {
                             var x = _3d__3d_()({infixl: local_193.__x1
                                                ,infixr: local_193.y});
                             switch (x.tag)
                             {
                               case "false":
                                 var local_194 = x.data;
                                 var x = _3c_()({infixl: local_193.__x1
                                                ,infixr: local_193.y});
                                 switch (x.tag)
                                 {
                                   case "false":
                                     var local_195 = x.data;
                                     return {tag: "_3e_1",data: {}};
                                   case "true":
                                     var local_196 = x.data;
                                     return {tag: "_3c_1",data: {}};
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_710304e7117b480ba76d20139b3980c1"
                                                                  ,"b36d82ac26521ea940b13add4c373a2c");
                                 }
                               case "true":
                                 var local_197 = x.data;
                                 return {tag: "_3d__3d_1",data: {}};
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_710304e7117b480ba76d20139b3980c1"
                                                              ,"508e7c4e652cf07b779c96cd2344172c");
                             }
                          };
                   });
var _2f_ = rts.memo(function () { return rts.builtins.Prelude["/"];});
var floor = rts.memo(function () {
               return function (local_201) {
                      return _2d_()({infixl: local_201
                                    ,infixr: _25_()({infixl: local_201,infixr: 1.0})});
                   };
            });
var search1 = rts.memo(function () {
                 return function (local_199) {
                        var x = _2265_()({infixl: local_199.start
                                         ,infixr: local_199.stop});
                        switch (x.tag)
                        {
                          case "false":
                            var local_200 = x.data;
                            var pivot1 =
                            floor()(_2f_()({infixl: _2b_()({infixl: local_199.start
                                                           ,infixr: local_199.stop})
                                           ,infixr: 2.0}));
                            var x = local_199.compareTo(pivot1);
                            switch (x.tag)
                            {
                              case "_3e_1":
                                var local_202 = x.data;
                                return search1()({start: _2b_()({infixl: pivot1
                                                                ,infixr: 1.0})
                                                 ,stop: local_199.stop
                                                 ,compareTo: local_199.compareTo});
                              case "_3c_1":
                                var local_203 = x.data;
                                return search1()({start: local_199.start
                                                 ,stop: pivot1
                                                 ,compareTo: local_199.compareTo});
                              case "_3d__3d_1":
                                var local_204 = x.data;
                                return {tag: "just",data: pivot1};
                              default:
                                throw rts.exceptions.LamduBug("Unhandled case"
                                                             ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                                             ,"c6c8b9c428c0b8b42ffc038b0554d06b");
                            }
                          case "true":
                            var local_205 = x.data;
                            return {tag: "nothing",data: {}};
                          default:
                            throw rts.exceptions.LamduBug("Unhandled case"
                                                         ,"DEF_c7979a19eff24c4fa65e8524e84ebfef"
                                                         ,"c22774ac01ba95da7d4aa96a5694962d");
                        }
                     };
              });
var search = rts.memo(function () {
                return function (local_198) {
                       return search1()({start: 0.0
                                        ,stop: length1()(local_198.sorted)
                                        ,compareTo: function (index6) {
                                           return local_198.compareTo(item1()({index: index6
                                                                              ,object: local_198.sorted}));
                                        }});
                    };
             });
var lookup = rts.memo(function () {
                return function (local_191) {
                       var x = search()({compareTo: function (local_192) {
                                           return _3e__3d__3c_()({y: local_192.key
                                                                 ,__x1: local_191.key});
                                        }
                                        ,sorted: local_191.sorted});
                       switch (x.tag)
                       {
                         case "just":
                           var index7 = x.data;
                           return {tag: "just"
                                  ,data: item1()({index: index7
                                                 ,object: local_191.sorted}).value};
                         case "nothing":
                           var local_206 = x.data;
                           return {tag: "nothing",data: {}};
                         default:
                           throw rts.exceptions.LamduBug("Unhandled case"
                                                        ,"DEF_a4e4077b0c07428e86abf1bac4a10b4f"
                                                        ,"037df5e76b157671e777748996e8ff72");
                       }
                    };
             });
var pestovalQuerySessions = rts.memo(function () {
                               return function (local_100) {
                                      var teacherQuery = function () {
                                                            var x = local_100.teacher;
                                                            switch (x.tag)
                                                            {
                                                              case "just":
                                                                var local_101 = x.data;
                                                                return {where: _3a__3a_()({infixl: _2b__2b_()({a: rts.bytesFromAscii("pestoval_session_teachers.teacher_id = ")
                                                                                                              ,b: showNum()(local_101)})
                                                                                          ,infixr: function (local_102) {
                                                                                             return {tag: "empty"
                                                                                                    ,data: {}};
                                                                                          }})
                                                                       ,from: rts.bytesFromAscii("FROM pestoval_session_teachers\nLEFT OUTER JOIN pestoval_session ON pestoval_session_teachers.session_id = pestoval_session.id")};
                                                              case "nothing":
                                                                var local_103 = x.data;
                                                                return {where: {tag: "empty"
                                                                               ,data: {}}
                                                                       ,from: rts.bytesFromAscii("FROM pestoval_session")};
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                                             ,"c83b0d9e623697d989e5a09fb1c59c4f");
                                                            }
                                                         }();
                                      var where1 =
                                      join()({texts: _2b__2b_2()({infixl: teacherQuery.where
                                                                 ,infixr: function (local_104) {
                                                                    var x =
                                                                    local_100.filter;
                                                                    switch (x.tag)
                                                                    {
                                                                      case "just":
                                                                        var local_105 =
                                                                        x.data;
                                                                        return _3a__3a_()({infixl: local_105
                                                                                          ,infixr: function (local_106) {
                                                                                             return {tag: "empty"
                                                                                                    ,data: {}};
                                                                                          }});
                                                                      case "nothing":
                                                                        var local_107 =
                                                                        x.data;
                                                                        return {tag: "empty"
                                                                               ,data: {}};
                                                                      default:
                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                     ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                                                     ,"b9b460a647ac4021e5d0ace3826c3537");
                                                                    }
                                                                 }})
                                             ,seperator: rts.bytesFromAscii(" AND ")});
                                      return _3b_()({infixl: query()({database: local_100.database
                                                                     ,object: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("SELECT\n  pestoval_session.id, pestoval_session.name AS session_name,\n  pestoval_session.description, pestoval_session.prereqs,\n  pestoval_timeslot.start, pestoval_timeslot.stop,\n  pestoval_location.id AS location_id, pestoval_location.name AS location_name,\n  pestoval_level.name AS level_name, pestoval_level.color")
                                                                                                        ,infixr: function (local_120) {
                                                                                                           return _3a__3a_()({infixl: teacherQuery.from
                                                                                                                             ,infixr: function (local_121) {
                                                                                                                                return _2b__2b_2()({infixl: map()({stream: _3a__3a_()({infixl: {key: rts.bytesFromAscii("when_id")
                                                                                                                                                                                               ,table: rts.bytesFromAscii("pestoval_timeslot")}
                                                                                                                                                                                      ,infixr: function (local_122) {
                                                                                                                                                                                         return _3a__3a_()({infixl: {key: rts.bytesFromAscii("location_id")
                                                                                                                                                                                                                    ,table: rts.bytesFromAscii("pestoval_location")}
                                                                                                                                                                                                           ,infixr: function (local_123) {
                                                                                                                                                                                                              return _3a__3a_()({infixl: {key: rts.bytesFromAscii("level_id")
                                                                                                                                                                                                                                         ,table: rts.bytesFromAscii("pestoval_level")}
                                                                                                                                                                                                                                ,infixr: function (local_124) {
                                                                                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                                                                                          ,data: {}};
                                                                                                                                                                                                                                }});
                                                                                                                                                                                                           }});
                                                                                                                                                                                      }})
                                                                                                                                                                  ,mapping: function (local_125) {
                                                                                                                                                                     return join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("LEFT OUTER JOIN ")
                                                                                                                                                                                                      ,infixr: function (local_126) {
                                                                                                                                                                                                         return _3a__3a_()({infixl: local_125.table
                                                                                                                                                                                                                           ,infixr: function (local_127) {
                                                                                                                                                                                                                              return _3a__3a_()({infixl: rts.bytesFromAscii(" ON pestoval_session.")
                                                                                                                                                                                                                                                ,infixr: function (local_128) {
                                                                                                                                                                                                                                                   return _3a__3a_()({infixl: local_125.key
                                                                                                                                                                                                                                                                     ,infixr: function (local_129) {
                                                                                                                                                                                                                                                                        return _3a__3a_()({infixl: rts.bytesFromAscii(" = ")
                                                                                                                                                                                                                                                                                          ,infixr: function (local_130) {
                                                                                                                                                                                                                                                                                             return _3a__3a_()({infixl: local_125.table
                                                                                                                                                                                                                                                                                                               ,infixr: function (local_131) {
                                                                                                                                                                                                                                                                                                                  return _3a__3a_()({infixl: rts.bytesFromAscii(".id")
                                                                                                                                                                                                                                                                                                                                    ,infixr: function (local_132) {
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
                                                                                                                                                   ,infixr: function (local_133) {
                                                                                                                                                      return _2b__2b_2()({infixl: function () {
                                                                                                                                                                            var x =
                                                                                                                                                                            _3d__3d_()({infixl: where1
                                                                                                                                                                                       ,infixr: rts.bytesFromAscii("")});
                                                                                                                                                                            switch (x.tag)
                                                                                                                                                                            {
                                                                                                                                                                              case "false":
                                                                                                                                                                                var local_134 =
                                                                                                                                                                                x.data;
                                                                                                                                                                                return _3a__3a_()({infixl: _2b__2b_()({a: rts.bytesFromAscii("WHERE ")
                                                                                                                                                                                                                      ,b: where1})
                                                                                                                                                                                                  ,infixr: function (local_135) {
                                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                                  }});
                                                                                                                                                                              case "true":
                                                                                                                                                                                var local_136 =
                                                                                                                                                                                x.data;
                                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                                       ,data: {}};
                                                                                                                                                                              default:
                                                                                                                                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                                             ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                                                                                                                                                             ,"f573ad31abd803e9dda9e82ec3ef4df2");
                                                                                                                                                                            }
                                                                                                                                                                         }()
                                                                                                                                                                         ,infixr: function (local_137) {
                                                                                                                                                                            return _3a__3a_()({infixl: rts.bytesFromAscii("ORDER BY pestoval_timeslot.start, pestoval_location.id")
                                                                                                                                                                                              ,infixr: function (local_138) {
                                                                                                                                                                                                 return {tag: "empty"
                                                                                                                                                                                                        ,data: {}};
                                                                                                                                                                                              }});
                                                                                                                                                                         }});
                                                                                                                                                   }});
                                                                                                                             }});
                                                                                                        }})
                                                                                     ,seperator: rts.bytesFromAscii("\n")})})
                                                    ,infixr: function (x139) {
                                                       switch (x139.tag)
                                                       {
                                                         case "error":
                                                           var local_140 = x139.data;
                                                           return ignoreError()(local_140);
                                                         case "success":
                                                           var local_141 = x139.data;
                                                           return _3b_()({infixl: pestovalQuerySessionTeachers()(local_100.database)
                                                                         ,infixr: function (teachers) {
                                                                            var field =
                                                                            function (local_182) {
                                                                               var x =
                                                                               first()({that: function (index3) {
                                                                                          return _3d__3d_()({infixl: item1()({index: index3
                                                                                                                             ,object: local_141.fields})
                                                                                                            ,infixr: local_182});
                                                                                       }
                                                                                       ,stream: _2e__2e_()({start: 0.0
                                                                                                           ,stop: length1()(local_141.fields)})});
                                                                               switch (x.tag)
                                                                               {
                                                                                 case "just":
                                                                                   return id2()(x.data);
                                                                                 case "nothing":
                                                                                   var local_183 =
                                                                                   x.data;
                                                                                   throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                                                   ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                                                                   ,"a8dea6e428906f6970698acdd1c10cbd");
                                                                                 default:
                                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                ,"DEF_e5c6245d56b44014a6cc92cf5ff83de4"
                                                                                                                ,"ca9c646dae236b23539d3c03280dc8af");
                                                                               }
                                                                            };
                                                                            var session1 =
                                                                            field(rts.bytesFromAscii("id"));
                                                                            var start1 =
                                                                            field(rts.bytesFromAscii("start"));
                                                                            var stop1 =
                                                                            field(rts.bytesFromAscii("stop"));
                                                                            var name1 =
                                                                            field(rts.bytesFromAscii("session_name"));
                                                                            var level =
                                                                            {name: field(rts.bytesFromAscii("level_name"))
                                                                            ,color: field(rts.bytesFromAscii("color"))};
                                                                            var place =
                                                                            {name: field(rts.bytesFromAscii("location_name"))
                                                                            ,id1: field(rts.bytesFromAscii("location_id"))};
                                                                            var description =
                                                                            field(rts.bytesFromAscii("description"));
                                                                            var prereqs =
                                                                            field(rts.bytesFromAscii("prereqs"));
                                                                            return __return()(toArray()(map()({stream: fromArray()(local_141.__data)
                                                                                                              ,mapping: function (row1) {
                                                                                                                 var item3 =
                                                                                                                 function (local_184) {
                                                                                                                    return item1()({index: local_184
                                                                                                                                   ,object: row1});
                                                                                                                 };
                                                                                                                 var id3 =
                                                                                                                 parseInt()(item3(session1));
                                                                                                                 return {prereqs1: item3(prereqs)
                                                                                                                        ,name: item3(name1)
                                                                                                                        ,start: parseDateTime()(item3(start1))
                                                                                                                        ,stop: parseDateTime()(item3(stop1))
                                                                                                                        ,place1: {name: item3(place.name)
                                                                                                                                 ,id1: item3(place.id1)}
                                                                                                                        ,description1: item3(description)
                                                                                                                        ,teachers1: function () {
                                                                                                                           var x =
                                                                                                                           lookup()({key: id3
                                                                                                                                    ,sorted: teachers});
                                                                                                                           switch (x.tag)
                                                                                                                           {
                                                                                                                             case "just":
                                                                                                                               return id2()(x.data);
                                                                                                                             case "nothing":
                                                                                                                               var local_207 =
                                                                                                                               x.data;
                                                                                                                               return toArray()({tag: "empty"
                                                                                                                                                ,data: {}});
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
                            });
var getSession = rts.memo(function () {
                    return function (local_89) {
                           return _3b_()({infixl: pestovalQuerySessions()({database: local_89.database
                                                                          ,teacher: {tag: "nothing"
                                                                                    ,data: {}}
                                                                          ,filter: {tag: "just"
                                                                                   ,data: _2b__2b_()({a: rts.bytesFromAscii("pestoval_session.id = ")
                                                                                                     ,b: showNum()(local_89.id1)})}})
                                         ,infixr: function (sessions) {
                                            return __return()(function () {
                                                   var x =
                                                   _3d__3d_()({infixl: length1()(sessions)
                                                              ,infixr: 0.0});
                                                   switch (x.tag)
                                                   {
                                                     case "false":
                                                       var local_208 = x.data;
                                                       return {tag: "just"
                                                              ,data: item1()({index: 0.0
                                                                             ,object: sessions})};
                                                     case "true":
                                                       var local_209 = x.data;
                                                       return {tag: "nothing",data: {}};
                                                     default:
                                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                                    ,"DEF_c3b63c0f3e6e462a850436879fb81873"
                                                                                    ,"e32bce02e3cc0b5a93b3fb45cf8c0056");
                                                   }
                                                }());
                                         }});
                        };
                 });
var _7c__7c_ = rts.memo(function () {
                  return function (local_219) {
                         var x = local_219.infixl;
                         switch (x.tag)
                         {
                           case "false":
                             return local_219.infixr(x.data);
                           case "true":
                             var local_220 = x.data;
                             return {tag: "true",data: {}};
                           default:
                             throw rts.exceptions.LamduBug("Unhandled case"
                                                          ,"DEF_dff4e86e63c54fab8b58ab3fe7e440ad"
                                                          ,"cc82dca9551140c9af0084b786718cc5");
                         }
                      };
               });
var anyOf = rts.memo(function () {
               return function (local_216) {
                      return foldLazy()({stream: local_216.stream
                                        ,initial: function (local_217) {
                                           return {tag: "false",data: {}};
                                        }
                                        ,binop: function (local_218) {
                                           return _7c__7c_()({infixl: local_216.satisfy(local_218.item)
                                                             ,infixr: local_218.rest});
                                        }});
                   };
            });
var pestovalAuth = rts.memo(function () {
                      return function (local_211) {
                             return _3b_()({infixl: query()({database: local_211.database
                                                            ,object: _2b__2b_()({a: _2b__2b_()({a: rts.bytesFromAscii("SELECT pestoval_teacher.id, pestoval_teacher.is_admin\nFROM pestoval_teacher\nWHERE pestoval_teacher.password = \'")
                                                                                               ,b: local_211.password})
                                                                                ,b: rts.bytesFromAscii("\'")})})
                                           ,infixr: function (x212) {
                                              switch (x212.tag)
                                              {
                                                case "error":
                                                  var local_213 = x212.data;
                                                  return ignoreError()(local_213);
                                                case "success":
                                                  var local_214 = x212.data;
                                                  return __return()(function () {
                                                         var x =
                                                         anyOf()({stream: fromArray()(local_214.__data)
                                                                 ,satisfy: function (local_215) {
                                                                    return _3d__3d_()({infixl: item1()({index: 1.0
                                                                                                       ,object: local_215})
                                                                                      ,infixr: rts.bytesFromAscii("true")});
                                                                 }});
                                                         switch (x.tag)
                                                         {
                                                           case "false":
                                                             var local_221 = x.data;
                                                             var x =
                                                             anyOf()({stream: fromArray()(local_214.__data)
                                                                     ,satisfy: function (local_222) {
                                                                        var teacher1 =
                                                                        parseInt()(item1()({index: 0.0
                                                                                           ,object: local_222}));
                                                                        return anyOf()({stream: fromArray()(local_211.teachers1)
                                                                                       ,satisfy: function (local_223) {
                                                                                          return _3d__3d_()({infixl: local_223.id1
                                                                                                            ,infixr: teacher1});
                                                                                       }});
                                                                     }});
                                                             switch (x.tag)
                                                             {
                                                               case "false":
                                                                 var local_224 = x.data;
                                                                 return {tag: "unauthorized"
                                                                        ,data: {}};
                                                               case "true":
                                                                 var local_225 = x.data;
                                                                 return {tag: "teacher"
                                                                        ,data: {}};
                                                               default:
                                                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                                                              ,"DEF_bf4df1f93fdc4eb78c4ab15db7b5f9a0"
                                                                                              ,"63099f6a8ec233abc1896a5e6518eaf6");
                                                             }
                                                           case "true":
                                                             var local_226 = x.data;
                                                             return {tag: "admin"
                                                                    ,data: {}};
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
                   });
var pestovalUnauthorized = rts.memo(function () {
                              return {content: {__data: rts.bytesFromAscii("Not authorized to edit")
                                               ,mimeType: rts.bytesFromAscii("text/plain")}
                                     ,status: {message: rts.bytesFromAscii("Unauthorized")
                                              ,code: 403.0}};
                           });
var _22f2_ = rts.memo(function () {
                return function (local_232) {
                       return {root: local_232.infixl,subTrees: local_232.infixr};
                    };
             });
var leaf = rts.memo(function () {
              return function (local_231) {
                     return _22f2_()({infixl: local_231
                                     ,infixr: toArray()({tag: "empty",data: {}})});
                  };
           });
var singleton = rts.memo(function () {
                   return function (local_233) {
                          return toArray()(_3a__3a_()({infixl: local_233
                                                      ,infixr: function (local_234) {
                                                         return {tag: "empty",data: {}};
                                                      }}));
                       };
                });
var htmlParagraph = rts.memo(function () {
                       return function (text2) {
                              return _22f2_()({infixl: rts.bytesFromAscii("<p>")
                                              ,infixr: singleton()(leaf()(text2))});
                           };
                    });
var pestovalSessionSummary = rts.memo(function () {
                                return function (session3) {
                                       return concat()(map()({stream: _3a__3a_()({infixl: {name: rts.bytesFromAscii("Teachers")
                                                                                          ,value: join()({texts: map()({stream: fromArray()(session3.teachers1)
                                                                                                                       ,mapping: function (local_239) {
                                                                                                                          return local_239.name;
                                                                                                                       }})
                                                                                                         ,seperator: rts.bytesFromAscii(" & ")})}
                                                                                 ,infixr: function (local_240) {
                                                                                    return _3a__3a_()({infixl: {name: rts.bytesFromAscii("Where")
                                                                                                               ,value: session3.place1.name}
                                                                                                      ,infixr: function (local_241) {
                                                                                                         return _3a__3a_()({infixl: {name: rts.bytesFromAscii("What")
                                                                                                                                    ,value: session3.name}
                                                                                                                           ,infixr: function (local_242) {
                                                                                                                              return _3a__3a_()({infixl: {name: rts.bytesFromAscii("Level")
                                                                                                                                                         ,value: session3.level1.name}
                                                                                                                                                ,infixr: function (local_243) {
                                                                                                                                                   return {tag: "empty"
                                                                                                                                                          ,data: {}};
                                                                                                                                                }});
                                                                                                                           }});
                                                                                                      }});
                                                                                 }})
                                                             ,mapping: function (local_244) {
                                                                return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<h4>")
                                                                                                    ,infixr: singleton()(leaf()(local_244.name))})
                                                                                  ,infixr: function (local_245) {
                                                                                     return _3a__3a_()({infixl: leaf()(local_244.value)
                                                                                                       ,infixr: function (local_246) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                  }});
                                                             }}));
                                    };
                             });
var isPrefixOf = rts.memo(function () {
                    return function (local_266) {
                           var lw = length()(local_266.whole);
                           var lp = length()(local_266.prefix);
                           return _26__26_()({infixl: _2265_()({infixl: lw,infixr: lp})
                                             ,infixr: function (local_267) {
                                                return _3d__3d_()({infixl: slice1()({object: local_266.whole
                                                                                    ,start: 0.0
                                                                                    ,stop: lp})
                                                                  ,infixr: local_266.prefix});
                                             }});
                        };
                 });
var has = rts.memo(function () {
             return function (local_265) {
                    return isPrefixOf()({whole: local_265.text,prefix: local_265.prefix});
                 };
          });
var isSuffixOf = rts.memo(function () {
                    return function (local_270) {
                           var lw1 = length()(local_270.whole);
                           var ls = length()(local_270.suffix);
                           return _26__26_()({infixl: _2265_()({infixl: lw1,infixr: ls})
                                             ,infixr: function (local_271) {
                                                return _3d__3d_()({infixl: slice1()({object: local_270.whole
                                                                                    ,start: _2d_()({infixl: lw1
                                                                                                   ,infixr: ls})
                                                                                    ,stop: lw1})
                                                                  ,infixr: local_270.suffix});
                                             }});
                        };
                 });
var has1 = rts.memo(function () {
              return function (local_269) {
                     return isSuffixOf()({suffix: local_269.suffix
                                         ,whole: local_269.text});
                  };
           });
var not = rts.memo(function () {
             return function (local_272) {
                    var x = local_272;
                    switch (x.tag)
                    {
                      case "false":
                        var local_273 = x.data;
                        return {tag: "true",data: {}};
                      case "true":
                        var local_274 = x.data;
                        return {tag: "false",data: {}};
                      default:
                        throw rts.exceptions.LamduBug("Unhandled case"
                                                     ,"DEF_414bf66f7dd84da7881a390b2f34ef76"
                                                     ,"b298b3233fa94db5b07f79925bfdbb19");
                    }
                 };
          });
var renderHtml = rts.memo(function () {
                    return function (tree) {
                           var local_262 = tree.root;
                           return join()({texts: _3a__3a_()({infixl: local_262
                                                            ,infixr: function (local_263) {
                                                               return _2b__2b_2()({infixl: map()({stream: fromArray()(tree.subTrees)
                                                                                                 ,mapping: renderHtml()})
                                                                                  ,infixr: function (local_264) {
                                                                                     var x =
                                                                                     _26__26_()({infixl: has()({text: local_262
                                                                                                               ,prefix: rts.bytesFromAscii("<")})
                                                                                                ,infixr: function (local_268) {
                                                                                                   return not()(has1()({text: local_262
                                                                                                                       ,suffix: rts.bytesFromAscii("/>")}));
                                                                                                }});
                                                                                     switch (x.tag)
                                                                                     {
                                                                                       case "false":
                                                                                         var local_275 =
                                                                                         x.data;
                                                                                         return {tag: "empty"
                                                                                                ,data: {}};
                                                                                       case "true":
                                                                                         var local_276 =
                                                                                         x.data;
                                                                                         return _3a__3a_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("</")
                                                                                                                                              ,infixr: function (local_277) {
                                                                                                                                                 return _3a__3a_()({infixl: toBytes()(toArray()(take()({stream: drop()({stream: fromBytes()(local_262)
                                                                                                                                                                                                                       ,count: 1.0})
                                                                                                                                                                                                       ,__while: function (local_278) {
                                                                                                                                                                                                          return _26__26_()({infixl: _2260_()({infixl: local_278
                                                                                                                                                                                                                                              ,infixr: 32.0})
                                                                                                                                                                                                                            ,infixr: function (local_279) {
                                                                                                                                                                                                                               return _2260_()({infixl: local_278
                                                                                                                                                                                                                                               ,infixr: 62.0});
                                                                                                                                                                                                                            }});
                                                                                                                                                                                                       }})))
                                                                                                                                                                   ,infixr: function (local_280) {
                                                                                                                                                                      return _3a__3a_()({infixl: rts.bytesFromAscii(">")
                                                                                                                                                                                        ,infixr: function (local_281) {
                                                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                                                  ,data: {}};
                                                                                                                                                                                        }});
                                                                                                                                                                   }});
                                                                                                                                              }})
                                                                                                                           ,seperator: rts.bytesFromAscii("")})
                                                                                                           ,infixr: function (local_282) {
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
                 });
var httpOk200 = rts.memo(function () {
                   return {message: rts.bytesFromAscii("OK"),code: 200.0};
                });
var pestovalPage = rts.memo(function () {
                      return function (local_257) {
                             return {content: {__data: _2b__2b_()({a: rts.bytesFromAscii("<!DOCTYPE html>\n")
                                                                  ,b: renderHtml()(_22f2_()({infixl: rts.bytesFromAscii("<html>")
                                                                                            ,infixr: toArray()(_3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<head>")
                                                                                                                                            ,infixr: toArray()(_3a__3a_()({infixl: leaf()(rts.bytesFromAscii("<meta charset=\"utf-8\" />"))
                                                                                                                                                                          ,infixr: function (local_258) {
                                                                                                                                                                             return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<title>")
                                                                                                                                                                                                                 ,infixr: singleton()(leaf()(local_257.title))})
                                                                                                                                                                                               ,infixr: function (local_259) {
                                                                                                                                                                                                  return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<body>")
                                                                                                                                                                                                                                      ,infixr: local_257.body})
                                                                                                                                                                                                                    ,infixr: function (local_260) {
                                                                                                                                                                                                                       return {tag: "empty"
                                                                                                                                                                                                                              ,data: {}};
                                                                                                                                                                                                                    }});
                                                                                                                                                                                               }});
                                                                                                                                                                          }}))})
                                                                                                                          ,infixr: function (local_261) {
                                                                                                                             return {tag: "empty"
                                                                                                                                    ,data: {}};
                                                                                                                          }}))}))})
                                              ,mimeType: rts.bytesFromAscii("text/html")}
                                    ,status: httpOk200()};
                          };
                   });
var pestovalEditForm = rts.memo(function () {
                          return function (local_230) {
                                 return pestovalPage()({title: rts.bytesFromAscii("Edit Session")
                                                       ,body: toArray()(_3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<h2>")
                                                                                                     ,infixr: singleton()(leaf()(rts.bytesFromAscii("Edit Session")))})
                                                                                   ,infixr: function (local_235) {
                                                                                      return _3a__3a_()({infixl: _22f2_()({infixl: _2b__2b_()({a: _2b__2b_()({a: rts.bytesFromAscii("<form method=\"POST\" action=\"")
                                                                                                                                                             ,b: local_230.path})
                                                                                                                                              ,b: rts.bytesFromAscii("\">")})
                                                                                                                          ,infixr: toArray()(_2b__2b_2()({infixl: function () {
                                                                                                                                                            var x =
                                                                                                                                                            local_230.authorization1;
                                                                                                                                                            switch (x.tag)
                                                                                                                                                            {
                                                                                                                                                              case "admin":
                                                                                                                                                                var local_236 =
                                                                                                                                                                x.data;
                                                                                                                                                                return _3a__3a_()({infixl: htmlParagraph()(rts.bytesFromAscii("TODO"))
                                                                                                                                                                                  ,infixr: function (local_237) {
                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                  }});
                                                                                                                                                              case "teacher":
                                                                                                                                                                var local_238 =
                                                                                                                                                                x.data;
                                                                                                                                                                return pestovalSessionSummary()(local_230.session);
                                                                                                                                                              default:
                                                                                                                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                             ,"DEF_6e7bdd9e6c574058baa08fe619b870cd"
                                                                                                                                                                                             ,"51101d04f9fe7ce01c9a8a10e2124c7f");
                                                                                                                                                            }
                                                                                                                                                         }()
                                                                                                                                                         ,infixr: function (local_247) {
                                                                                                                                                            return _2b__2b_2()({infixl: concat()(map()({stream: _3a__3a_()({infixl: {name: rts.bytesFromAscii("Description")
                                                                                                                                                                                                                                    ,value: local_230.session.description1
                                                                                                                                                                                                                                    ,key: rts.bytesFromAscii("description")}
                                                                                                                                                                                                                           ,infixr: function (local_248) {
                                                                                                                                                                                                                              return _3a__3a_()({infixl: {name: rts.bytesFromAscii("Pre-reqs")
                                                                                                                                                                                                                                                         ,value: local_230.session.prereqs1
                                                                                                                                                                                                                                                         ,key: rts.bytesFromAscii("prereqs")}
                                                                                                                                                                                                                                                ,infixr: function (local_249) {
                                                                                                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                                                                                                          ,data: {}};
                                                                                                                                                                                                                                                }});
                                                                                                                                                                                                                           }})
                                                                                                                                                                                                       ,mapping: function (local_250) {
                                                                                                                                                                                                          var local_251 =
                                                                                                                                                                                                          local_250.name;
                                                                                                                                                                                                          return _3a__3a_()({infixl: _22f2_()({infixl: _2b__2b_()({a: _2b__2b_()({a: rts.bytesFromAscii("<label for=\"")
                                                                                                                                                                                                                                                                                 ,b: local_250.key})
                                                                                                                                                                                                                                                                  ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                                                                                                              ,infixr: singleton()(_22f2_()({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                                                                                                            ,infixr: singleton()(leaf()(_2b__2b_()({a: local_251
                                                                                                                                                                                                                                                                                                                   ,b: rts.bytesFromAscii(":")})))}))})
                                                                                                                                                                                                                            ,infixr: function (local_252) {
                                                                                                                                                                                                                               return _3a__3a_()({infixl: _22f2_()({infixl: _2b__2b_()({a: _2b__2b_()({a: _2b__2b_()({a: _2b__2b_()({a: rts.bytesFromAscii("<textarea rows=10 cols=80 id=\"")
                                                                                                                                                                                                                                                                                                                                    ,b: local_250.key})
                                                                                                                                                                                                                                                                                                                     ,b: rts.bytesFromAscii("\" name=\"")})
                                                                                                                                                                                                                                                                                                      ,b: local_250.key})
                                                                                                                                                                                                                                                                                       ,b: rts.bytesFromAscii("\">")})
                                                                                                                                                                                                                                                                   ,infixr: singleton()(leaf()(local_250.value))})
                                                                                                                                                                                                                                                 ,infixr: function (local_253) {
                                                                                                                                                                                                                                                    return {tag: "empty"
                                                                                                                                                                                                                                                           ,data: {}};
                                                                                                                                                                                                                                                 }});
                                                                                                                                                                                                                            }});
                                                                                                                                                                                                       }}))
                                                                                                                                                                               ,infixr: function (local_254) {
                                                                                                                                                                                  return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<p>")
                                                                                                                                                                                                                      ,infixr: singleton()(_22f2_()({infixl: rts.bytesFromAscii("<button type=\"submit\">")
                                                                                                                                                                                                                                                    ,infixr: singleton()(leaf()(rts.bytesFromAscii("Update")))}))})
                                                                                                                                                                                                    ,infixr: function (local_255) {
                                                                                                                                                                                                       return {tag: "empty"
                                                                                                                                                                                                              ,data: {}};
                                                                                                                                                                                                    }});
                                                                                                                                                                               }});
                                                                                                                                                         }}))})
                                                                                                        ,infixr: function (local_256) {
                                                                                                           return {tag: "empty"
                                                                                                                  ,data: {}};
                                                                                                        }});
                                                                                   }}))});
                              };
                       });
var pestovalUpdate = rts.memo(function () {
                        return function (local_284) {
                               var x = local_284.request1.body;
                               switch (x.tag)
                               {
                                 case "just":
                                   var body1 = x.data;
                                   return _3b_()({infixl: query()({database: local_284.database
                                                                  ,object: _2b__2b_()({a: _2b__2b_()({a: _2b__2b_()({a: rts.bytesFromAscii("UPDATE pestoval_session\nSET ")
                                                                                                                    ,b: join()({texts: map()({stream: split()({text: body1
                                                                                                                                                              ,seperator: rts.bytesFromAscii("&")})
                                                                                                                                             ,mapping: function (local_285) {
                                                                                                                                                var x =
                                                                                                                                                split()({text: local_285
                                                                                                                                                        ,seperator: rts.bytesFromAscii("=")});
                                                                                                                                                switch (x.tag)
                                                                                                                                                {
                                                                                                                                                  case "nonEmpty":
                                                                                                                                                    var local_286 =
                                                                                                                                                    x.data;
                                                                                                                                                    return _2b__2b_()({a: _2b__2b_()({a: _2b__2b_()({a: local_286.head
                                                                                                                                                                                                    ,b: rts.bytesFromAscii(" = \'")})
                                                                                                                                                                                     ,b: join()({texts: local_286.tail({})
                                                                                                                                                                                                ,seperator: rts.bytesFromAscii("=")})})
                                                                                                                                                                      ,b: rts.bytesFromAscii("\'")});
                                                                                                                                                  case "empty":
                                                                                                                                                    var local_287 =
                                                                                                                                                    x.data;
                                                                                                                                                    throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                                                                                                                    ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                                                                                                                                                    ,"08592d281e1f4293115587c6af3edb43");
                                                                                                                                                  default:
                                                                                                                                                    throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                 ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                                                                                                                                                 ,"f4893006fbdbfe2f2bb534acbf6dc518");
                                                                                                                                                }
                                                                                                                                             }})
                                                                                                                               ,seperator: rts.bytesFromAscii(", ")})})
                                                                                                     ,b: rts.bytesFromAscii("\nWHERE pestoval_session.id = ")})
                                                                                      ,b: showNum()(local_284.session)})})
                                                 ,infixr: function (x288) {
                                                    switch (x288.tag)
                                                    {
                                                      case "error":
                                                        var local_289 = x288.data;
                                                        return ignoreError()(local_289);
                                                      case "success":
                                                        var local_290 = x288.data;
                                                        return __return()({content: {__data: rts.bytesFromAscii("Update successful, refresh")
                                                                                    ,mimeType: rts.bytesFromAscii("text/plain")}
                                                                          ,status: {message: _2b__2b_()({a: rts.bytesFromAscii("See Other\r\nLocation: ")
                                                                                                        ,b: local_284.request1.path})
                                                                                   ,code: 303.0}});
                                                      default:
                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                     ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                                                     ,"601e113ccba88e0bf9ac1fe558419963");
                                                    }
                                                 }});
                                 case "nothing":
                                   var local_291 = x.data;
                                   return __return()({content: {__data: rts.bytesFromAscii("POST with no body")
                                                               ,mimeType: rts.bytesFromAscii("text/plain")}
                                                     ,status: {message: rts.bytesFromAscii("Forbidden")
                                                              ,code: 403.0}});
                                 default:
                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                ,"DEF_7fbd3bd4533a428eb08b679d36605be0"
                                                                ,"7155adc9c6327a297327ec4e1f1a8007");
                               }
                            };
                     });
var pestovalEditPage = rts.memo(function () {
                          return function (local_88) {
                                 var parts1 =
                                 toArray()(split()({text: local_88.request1.path
                                                   ,seperator: rts.bytesFromAscii("/")}));
                                 var id = parseInt()(item1()({index: 3.0
                                                             ,object: parts1}));
                                 var password1 = item1()({index: 4.0,object: parts1});
                                 return _3b_()({infixl: getSession()({database: local_88.database
                                                                     ,id1: id})
                                               ,infixr: function (local_210) {
                                                  var x = local_210;
                                                  switch (x.tag)
                                                  {
                                                    case "just":
                                                      var session2 = x.data;
                                                      return _3b_()({infixl: pestovalAuth()({database: local_88.database
                                                                                            ,password: password1
                                                                                            ,teachers1: session2.teachers1})
                                                                    ,infixr: function (x227) {
                                                                       switch (x227.tag)
                                                                       {
                                                                         case "unauthorized":
                                                                           var local_228 =
                                                                           x227.data;
                                                                           return __return()(pestovalUnauthorized());
                                                                         default:
                                                                           var authorization =
                                                                           x227;
                                                                           var x =
                                                                           _3d__3d_()({infixl: local_88.request1.method
                                                                                      ,infixr: rts.bytesFromAscii("POST")});
                                                                           switch (x.tag)
                                                                           {
                                                                             case "false":
                                                                               var local_229 =
                                                                               x.data;
                                                                               return __return()(pestovalEditForm()({path: local_88.request1.path
                                                                                                                    ,authorization1: authorization
                                                                                                                    ,session: session2}));
                                                                             case "true":
                                                                               var local_283 =
                                                                               x.data;
                                                                               return pestovalUpdate()({request1: local_88.request1
                                                                                                       ,database: local_88.database
                                                                                                       ,session: session2.id1});
                                                                             default:
                                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                            ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                                                            ,"649431586e8fa4f8144892306470de2e");
                                                                           }
                                                                       }
                                                                    }});
                                                    case "nothing":
                                                      var local_292 = x.data;
                                                      return __return()(httpNotFound404()(local_88.request1.path));
                                                    default:
                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                   ,"DEF_3c898249b1784b72beed36db3fa87518"
                                                                                   ,"08ce1c8a7d9560da25879978070222da");
                                                  }
                                               }});
                              };
                       });
var overlaysCss = rts.memo(function () {
                     return _22f2_()({infixl: rts.bytesFromAscii("<style type=\"text/css\">")
                                     ,infixr: singleton()(leaf()(rts.bytesFromAscii("/* Thanks https://eichefam.net/2011/12/21/popup-windows-without-javascript/ */\n.overlay {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: rgba(0,0,0,0.5);\n  transition: opacity 200ms;\n  visibility: hidden;\n  opacity: 0;\n}\n.overlay:target {\n  visibility: visible;\n  opacity: 1;\n}\n.cancel {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  cursor: default;\n}\n.popup {\n  margin: 50px auto;\n  padding: 20px;\n  background: #fff;\n  border: 1px solid #666;\n  width: 70%;\n  box-shadow: 0 0 50px rgba(0,0,0,0.5);\n  position: relative;\n}")))});
                  });
var filter1 = rts.memo(function () {
                 return function (local_305) {
                        var x = local_305.stream;
                        switch (x.tag)
                        {
                          case "nonEmpty":
                            var local_306 = x.data;
                            var rest1 = function (local_307) {
                               return filter1()({stream: local_306.tail({})
                                                ,keep: local_305.keep});
                            };
                            var x = local_305.keep(local_306.head);
                            switch (x.tag)
                            {
                              case "false":
                                var local_308 = x.data;
                                return rest1({});
                              case "true":
                                var local_309 = x.data;
                                return {tag: "nonEmpty"
                                       ,data: {head: local_306.head,tail: rest1}};
                              default:
                                throw rts.exceptions.LamduBug("Unhandled case"
                                                             ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                                             ,"fbe0954bea2f4c248cb91ac61e7821ba");
                            }
                          case "empty":
                            var local_310 = x.data;
                            return {tag: "empty",data: {}};
                          default:
                            throw rts.exceptions.LamduBug("Unhandled case"
                                                         ,"DEF_d7dafdd0c4c14e81beb071e1181c6356"
                                                         ,"2cb5f2574b8b4e3d8e5510fee403db44");
                        }
                     };
              });
var replicate = rts.memo(function () {
                   return function (local_327) {
                          var x = _2264_()({infixl: local_327.count,infixr: 0.0});
                          switch (x.tag)
                          {
                            case "false":
                              var local_328 = x.data;
                              return {tag: "nonEmpty"
                                     ,data: {head: local_327.item
                                            ,tail: function (local_329) {
                                               return replicate()({count: _2d_()({infixl: local_327.count
                                                                                 ,infixr: 1.0})
                                                                  ,item: local_327.item});
                                            }}};
                            case "true":
                              var local_330 = x.data;
                              return {tag: "empty",data: {}};
                            default:
                              throw rts.exceptions.LamduBug("Unhandled case"
                                                           ,"DEF_70f79762f05c41ccb9677f7a60746680"
                                                           ,"3b53ee6d875f49f4acdb9a2e8b33fb2d");
                          }
                       };
                });
var rightJustify = rts.memo(function () {
                      return function (local_325) {
                             var count1 = _2d_()({infixl: local_325.length5
                                                 ,infixr: length()(local_325.text)});
                             var x = _2264_()({infixl: count1,infixr: 0.0});
                             switch (x.tag)
                             {
                               case "false":
                                 var local_326 = x.data;
                                 return _2b__2b_()({a: toBytes()(toArray()(replicate()({count: count1
                                                                                       ,item: local_325.character})))
                                                   ,b: local_325.text});
                               case "true":
                                 var local_331 = x.data;
                                 return local_325.text;
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_c96ce62be72e4d1e85d07af16867169d"
                                                              ,"ea6106b4e471dead7c7d3638866db4a1");
                             }
                          };
                   });
var showTime = rts.memo(function () {
                  return function (local_321) {
                         return join()({texts: map()({stream: _3a__3a_()({infixl: local_321.hour
                                                                         ,infixr: function (local_322) {
                                                                            return _3a__3a_()({infixl: local_321.minute
                                                                                              ,infixr: function (local_323) {
                                                                                                 return {tag: "empty"
                                                                                                        ,data: {}};
                                                                                              }});
                                                                         }})
                                                     ,mapping: function (local_324) {
                                                        return rightJustify()({length5: 2.0
                                                                              ,text: showNum()(local_324)
                                                                              ,character: 48.0});
                                                     }})
                                       ,seperator: rts.bytesFromAscii(":")});
                      };
               });
var formatTimeSlot = rts.memo(function () {
                        return function (local_319) {
                               return join()({texts: _3a__3a_()({infixl: item1()({index: _2d_()({infixl: local_319.start.date.weekDay
                                                                                                ,infixr: 1.0})
                                                                                 ,object: dayNames()})
                                                                ,infixr: function (local_320) {
                                                                   return _3a__3a_()({infixl: showTime()(local_319.start.time)
                                                                                     ,infixr: function (local_332) {
                                                                                        return _3a__3a_()({infixl: rts.bytesFromAscii("-")
                                                                                                          ,infixr: function (local_333) {
                                                                                                             return _3a__3a_()({infixl: showTime()(local_319.stop.time)
                                                                                                                               ,infixr: function (local_334) {
                                                                                                                                  return {tag: "empty"
                                                                                                                                         ,data: {}};
                                                                                                                               }});
                                                                                                          }});
                                                                                     }});
                                                                }})
                                             ,seperator: rts.bytesFromAscii(" ")});
                            };
                     });
var pestovalSessionInfo = rts.memo(function () {
                             return function (local_354) {
                                    var line = function (local_355) {
                                       return _22f2_()({infixl: rts.bytesFromAscii("<p>")
                                                       ,infixr: toArray()(_3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<b>")
                                                                                                       ,infixr: singleton()(leaf()(local_355.key))})
                                                                                     ,infixr: function (local_356) {
                                                                                        return _3a__3a_()({infixl: leaf()(local_355.value)
                                                                                                          ,infixr: function (local_357) {
                                                                                                             return {tag: "empty"
                                                                                                                    ,data: {}};
                                                                                                          }});
                                                                                     }}))});
                                    };
                                    var teacher3 = function (local_358) {
                                       return _22f2_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("<a href=\"/eng/teacher/")
                                                                                          ,infixr: function (local_359) {
                                                                                             return _3a__3a_()({infixl: showNum()(local_358.id1)
                                                                                                               ,infixr: function (local_360) {
                                                                                                                  return _3a__3a_()({infixl: rts.bytesFromAscii("/\">")
                                                                                                                                    ,infixr: function (local_361) {
                                                                                                                                       return {tag: "empty"
                                                                                                                                              ,data: {}};
                                                                                                                                    }});
                                                                                                               }});
                                                                                          }})
                                                                       ,seperator: rts.bytesFromAscii("")})
                                                       ,infixr: singleton()(leaf()(local_358.name))});
                                    };
                                    return toArray()(_3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<h2>")
                                                                                  ,infixr: function () {
                                                                                     var x =
                                                                                     fromArray()(local_354.session.teachers1);
                                                                                     switch (x.tag)
                                                                                     {
                                                                                       case "nonEmpty":
                                                                                         var local_362 =
                                                                                         x.data;
                                                                                         return toArray()(_3a__3a_()({infixl: teacher3(local_362.head)
                                                                                                                     ,infixr: function (local_363) {
                                                                                                                        return _2b__2b_2()({infixl: concat()(map()({stream: local_362.tail({})
                                                                                                                                                                   ,mapping: function (local_364) {
                                                                                                                                                                      return _3a__3a_()({infixl: leaf()(rts.bytesFromAscii(" & "))
                                                                                                                                                                                        ,infixr: function (local_365) {
                                                                                                                                                                                           return _3a__3a_()({infixl: teacher3(local_364)
                                                                                                                                                                                                             ,infixr: function (local_366) {
                                                                                                                                                                                                                return {tag: "empty"
                                                                                                                                                                                                                       ,data: {}};
                                                                                                                                                                                                             }});
                                                                                                                                                                                        }});
                                                                                                                                                                   }}))
                                                                                                                                           ,infixr: function (local_367) {
                                                                                                                                              return _3a__3a_()({infixl: leaf()(_2b__2b_()({a: rts.bytesFromAscii(": ")
                                                                                                                                                                                           ,b: local_354.session.name}))
                                                                                                                                                                ,infixr: function (local_368) {
                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                          ,data: {}};
                                                                                                                                                                }});
                                                                                                                                           }});
                                                                                                                     }}));
                                                                                       case "empty":
                                                                                         var local_369 =
                                                                                         x.data;
                                                                                         return singleton()(leaf()(local_354.session.name));
                                                                                       default:
                                                                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                      ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                      ,"ed7be6bad9f71095a62be6746bf728a3");
                                                                                     }
                                                                                  }()})
                                                                ,infixr: function (local_370) {
                                                                   return _2b__2b_2()({infixl: function () {
                                                                                         var x =
                                                                                         local_354.password;
                                                                                         switch (x.tag)
                                                                                         {
                                                                                           case "just":
                                                                                             var local_371 =
                                                                                             x.data;
                                                                                             return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<p>")
                                                                                                                                 ,infixr: singleton()(_22f2_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("<a href=\"/edit/")
                                                                                                                                                                                                  ,infixr: function (local_372) {
                                                                                                                                                                                                     return _3a__3a_()({infixl: showNum()(local_354.session.id1)
                                                                                                                                                                                                                       ,infixr: function (local_373) {
                                                                                                                                                                                                                          return _3a__3a_()({infixl: rts.bytesFromAscii("/")
                                                                                                                                                                                                                                            ,infixr: function (local_374) {
                                                                                                                                                                                                                                               return _3a__3a_()({infixl: local_371
                                                                                                                                                                                                                                                                 ,infixr: function (local_375) {
                                                                                                                                                                                                                                                                    return _3a__3a_()({infixl: rts.bytesFromAscii("/\">")
                                                                                                                                                                                                                                                                                      ,infixr: function (local_376) {
                                                                                                                                                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                                                                                                                                                ,data: {}};
                                                                                                                                                                                                                                                                                      }});
                                                                                                                                                                                                                                                                 }});
                                                                                                                                                                                                                                            }});
                                                                                                                                                                                                                       }});
                                                                                                                                                                                                  }})
                                                                                                                                                                               ,seperator: rts.bytesFromAscii("")})
                                                                                                                                                               ,infixr: singleton()(leaf()(rts.bytesFromAscii("Edit details")))}))})
                                                                                                               ,infixr: function (local_377) {
                                                                                                                  return {tag: "empty"
                                                                                                                         ,data: {}};
                                                                                                               }});
                                                                                           case "nothing":
                                                                                             var local_378 =
                                                                                             x.data;
                                                                                             return {tag: "empty"
                                                                                                    ,data: {}};
                                                                                           default:
                                                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                          ,"DEF_cc47114d3d1544e4b59dee95bf065482"
                                                                                                                          ,"fad3e2035a95ac24b0214f741995983a");
                                                                                         }
                                                                                      }()
                                                                                      ,infixr: function (local_379) {
                                                                                         return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<b>")
                                                                                                                             ,infixr: singleton()(leaf()(formatTimeSlot()(local_354.session)))})
                                                                                                           ,infixr: function (local_380) {
                                                                                                              return _3a__3a_()({infixl: line({value: local_354.session.place1.name
                                                                                                                                              ,key: rts.bytesFromAscii("Where: ")})
                                                                                                                                ,infixr: function (local_381) {
                                                                                                                                   return _3a__3a_()({infixl: line({value: local_354.session.level1.name
                                                                                                                                                                   ,key: rts.bytesFromAscii("Who: ")})
                                                                                                                                                     ,infixr: function (local_382) {
                                                                                                                                                        return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                            ,infixr: singleton()(leaf()(rts.bytesFromAscii("Description:")))})
                                                                                                                                                                          ,infixr: function (local_383) {
                                                                                                                                                                             return _3a__3a_()({infixl: htmlParagraph()(local_354.session.description1)
                                                                                                                                                                                               ,infixr: function (local_384) {
                                                                                                                                                                                                  return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<h3>")
                                                                                                                                                                                                                                      ,infixr: singleton()(leaf()(rts.bytesFromAscii("Prereqs:")))})
                                                                                                                                                                                                                    ,infixr: function (local_385) {
                                                                                                                                                                                                                       return _3a__3a_()({infixl: htmlParagraph()(local_354.session.prereqs1)
                                                                                                                                                                                                                                         ,infixr: function (local_386) {
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
                          });
var htmlPopup = rts.memo(function () {
                   return function (local_387) {
                          return _22f2_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("<div id=\"")
                                                                             ,infixr: function (local_388) {
                                                                                return _3a__3a_()({infixl: local_387.id1
                                                                                                  ,infixr: function (local_389) {
                                                                                                     return _3a__3a_()({infixl: rts.bytesFromAscii("\" class=\"overlay\">")
                                                                                                                       ,infixr: function (local_390) {
                                                                                                                          return {tag: "empty"
                                                                                                                                 ,data: {}};
                                                                                                                       }});
                                                                                                  }});
                                                                             }})
                                                          ,seperator: rts.bytesFromAscii("")})
                                          ,infixr: toArray()(_3a__3a_()({infixl: leaf()(rts.bytesFromAscii("<a class=\"cancel\" href=\"javascript:history.back()\">"))
                                                                        ,infixr: function (local_391) {
                                                                           return _3a__3a_()({infixl: _22f2_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("<div class=\"popup\" style=\"background-color:")
                                                                                                                                                  ,infixr: function (local_392) {
                                                                                                                                                     return _3a__3a_()({infixl: local_387.color
                                                                                                                                                                       ,infixr: function (local_393) {
                                                                                                                                                                          return _3a__3a_()({infixl: rts.bytesFromAscii("\">")
                                                                                                                                                                                            ,infixr: function (local_394) {
                                                                                                                                                                                               return {tag: "empty"
                                                                                                                                                                                                      ,data: {}};
                                                                                                                                                                                            }});
                                                                                                                                                                       }});
                                                                                                                                                  }})
                                                                                                                               ,seperator: rts.bytesFromAscii("")})
                                                                                                               ,infixr: local_387.content})
                                                                                             ,infixr: function (local_395) {
                                                                                                return {tag: "empty"
                                                                                                       ,data: {}};
                                                                                             }});
                                                                        }}))});
                       };
                });
var pestovalSessionCell = rts.memo(function () {
                             return function (local_339) {
                                    var popup =
                                    _2b__2b_()({a: rts.bytesFromAscii("popup-")
                                               ,b: showNum()(local_339.session.id1)});
                                    var local_340 =
                                    htmlParagraph()(local_339.session.place1.name);
                                    return _22f2_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("<td style=\"background-color:")
                                                                                       ,infixr: function (local_341) {
                                                                                          var color1 =
                                                                                          local_339.session.level1.color;
                                                                                          return _3a__3a_()({infixl: function () {
                                                                                                               var x =
                                                                                                               _3d__3d_()({infixl: color1
                                                                                                                          ,infixr: rts.bytesFromAscii("null")});
                                                                                                               switch (x.tag)
                                                                                                               {
                                                                                                                 case "false":
                                                                                                                   var local_342 =
                                                                                                                   x.data;
                                                                                                                   return color1;
                                                                                                                 case "true":
                                                                                                                   var local_343 =
                                                                                                                   x.data;
                                                                                                                   return rts.bytesFromAscii("#eee");
                                                                                                                 default:
                                                                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                ,"DEF_9020eea8542142a09c1a8813ef9990af"
                                                                                                                                                ,"8af192079f77d68114daa54992f28614");
                                                                                                               }
                                                                                                            }()
                                                                                                            ,infixr: function (local_344) {
                                                                                                               return _3a__3a_()({infixl: rts.bytesFromAscii(";")
                                                                                                                                 ,infixr: function (local_345) {
                                                                                                                                    return _3a__3a_()({infixl: local_339.style
                                                                                                                                                      ,infixr: function (local_346) {
                                                                                                                                                         return _3a__3a_()({infixl: rts.bytesFromAscii("\" ")
                                                                                                                                                                           ,infixr: function (local_347) {
                                                                                                                                                                              return _3a__3a_()({infixl: local_339.attributes
                                                                                                                                                                                                ,infixr: function (local_348) {
                                                                                                                                                                                                   return _3a__3a_()({infixl: rts.bytesFromAscii(">")
                                                                                                                                                                                                                     ,infixr: function (local_349) {
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
                                                    ,infixr: toArray()(_3a__3a_()({infixl: _22f2_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("<a href=\"#")
                                                                                                                                       ,infixr: function (local_350) {
                                                                                                                                          return _3a__3a_()({infixl: popup
                                                                                                                                                            ,infixr: function (local_351) {
                                                                                                                                                               return _3a__3a_()({infixl: rts.bytesFromAscii("\" style=\"text-decoration: none; color: black;\">")
                                                                                                                                                                                 ,infixr: function (local_352) {
                                                                                                                                                                                    return {tag: "empty"
                                                                                                                                                                                           ,data: {}};
                                                                                                                                                                                 }});
                                                                                                                                                            }});
                                                                                                                                       }})
                                                                                                                    ,seperator: rts.bytesFromAscii("")})
                                                                                                    ,infixr: local_339.content})
                                                                                  ,infixr: function (local_353) {
                                                                                     return _3a__3a_()({infixl: htmlPopup()({content: pestovalSessionInfo()({password: local_339.password
                                                                                                                                                            ,session: local_339.session})
                                                                                                                            ,id1: popup
                                                                                                                            ,color: local_339.session.level1.color})
                                                                                                       ,infixr: function (local_396) {
                                                                                                          return {tag: "empty"
                                                                                                                 ,data: {}};
                                                                                                       }});
                                                                                  }}))});
                                 };
                          });
var htmlTable = rts.memo(function () {
                   return function (local_397) {
                          return _22f2_()({infixl: rts.bytesFromAscii("<table width=\"100%\">")
                                          ,infixr: singleton()(_22f2_()({infixl: rts.bytesFromAscii("<tbody>")
                                                                        ,infixr: local_397}))});
                       };
                });
var pestovalTeacherPage = rts.memo(function () {
                             return function (local_294) {
                                    var teacher2 = parseInt()(item1()({index: 0.0
                                                                      ,object: local_294.path}));
                                    return _3b_()({infixl: query()({database: local_294.database
                                                                   ,object: _2b__2b_()({a: rts.bytesFromAscii("SELECT pestoval_teacher.name, pestoval_teacher.password\nFROM pestoval_teacher\nWHERE pestoval_teacher.id =")
                                                                                       ,b: showNum()(teacher2)})})
                                                  ,infixr: function (x295) {
                                                     switch (x295.tag)
                                                     {
                                                       case "error":
                                                         var local_296 = x295.data;
                                                         return ignoreError()(local_296);
                                                       case "success":
                                                         var local_297 = x295.data;
                                                         var password2 =
                                                         function (value1) {
                                                            var x =
                                                            _26__26_()({infixl: _3e_()({infixl: length1()(local_294.path)
                                                                                       ,infixr: 1.0})
                                                                       ,infixr: function (local_298) {
                                                                          return _3d__3d_()({infixl: item1()({index: 1.0
                                                                                                             ,object: local_294.path})
                                                                                            ,infixr: value1});
                                                                       }});
                                                            switch (x.tag)
                                                            {
                                                              case "false":
                                                                var local_299 = x.data;
                                                                return {tag: "nothing"
                                                                       ,data: {}};
                                                              case "true":
                                                                var local_300 = x.data;
                                                                return {tag: "just"
                                                                       ,data: value1};
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_50938aa1a135407c826989b9e1339047"
                                                                                             ,"91cc4c8b5af33ae92f94375e3a666b89");
                                                            }
                                                         }(item1()({index: 1.0
                                                                   ,object: item1()({index: 0.0
                                                                                    ,object: local_297.__data})}));
                                                         var title1 = item1()({index: 0.0
                                                                              ,object: item1()({index: 0.0
                                                                                               ,object: local_297.__data})});
                                                         return _3b_()({infixl: pestovalQuerySessions()({database: local_294.database
                                                                                                        ,teacher: {tag: "just"
                                                                                                                  ,data: teacher2}
                                                                                                        ,filter: {tag: "nothing"
                                                                                                                 ,data: {}}})
                                                                       ,infixr: function (sessions1) {
                                                                          return __return()(pestovalPage()({title: title1
                                                                                                           ,body: toArray()(_3a__3a_()({infixl: overlaysCss()
                                                                                                                                       ,infixr: function (local_301) {
                                                                                                                                          return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                                              ,infixr: singleton()(leaf()(title1))})
                                                                                                                                                            ,infixr: function (local_302) {
                                                                                                                                                               return _3a__3a_()({infixl: htmlTable()(toArray()(map()({stream: fromArray()(sessions1)
                                                                                                                                                                                                                      ,mapping: function (session4) {
                                                                                                                                                                                                                         var info =
                                                                                                                                                                                                                         join()({texts: _3a__3a_()({infixl: session4.name
                                                                                                                                                                                                                                                   ,infixr: function (local_303) {
                                                                                                                                                                                                                                                      var x =
                                                                                                                                                                                                                                                      filter1()({stream: fromArray()(session4.teachers1)
                                                                                                                                                                                                                                                                ,keep: function (local_304) {
                                                                                                                                                                                                                                                                   return _2260_()({infixl: local_304.id1
                                                                                                                                                                                                                                                                                   ,infixr: teacher2});
                                                                                                                                                                                                                                                                }});
                                                                                                                                                                                                                                                      switch (x.tag)
                                                                                                                                                                                                                                                      {
                                                                                                                                                                                                                                                        case "nonEmpty":
                                                                                                                                                                                                                                                          var local_311 =
                                                                                                                                                                                                                                                          x.data;
                                                                                                                                                                                                                                                          return _3a__3a_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("(With ")
                                                                                                                                                                                                                                                                                                               ,infixr: function (local_312) {
                                                                                                                                                                                                                                                                                                                  return _3a__3a_()({infixl: local_311.head.name
                                                                                                                                                                                                                                                                                                                                    ,infixr: function (local_313) {
                                                                                                                                                                                                                                                                                                                                       return _3a__3a_()({infixl: join()({texts: map()({stream: local_311.tail({})
                                                                                                                                                                                                                                                                                                                                                                                       ,mapping: function (local_314) {
                                                                                                                                                                                                                                                                                                                                                                                          return _2b__2b_()({a: rts.bytesFromAscii(" & ")
                                                                                                                                                                                                                                                                                                                                                                                                            ,b: local_314.name});
                                                                                                                                                                                                                                                                                                                                                                                       }})
                                                                                                                                                                                                                                                                                                                                                                         ,seperator: rts.bytesFromAscii("")})
                                                                                                                                                                                                                                                                                                                                                         ,infixr: function (local_315) {
                                                                                                                                                                                                                                                                                                                                                            return _3a__3a_()({infixl: rts.bytesFromAscii(")")
                                                                                                                                                                                                                                                                                                                                                                              ,infixr: function (local_316) {
                                                                                                                                                                                                                                                                                                                                                                                 return {tag: "empty"
                                                                                                                                                                                                                                                                                                                                                                                        ,data: {}};
                                                                                                                                                                                                                                                                                                                                                                              }});
                                                                                                                                                                                                                                                                                                                                                         }});
                                                                                                                                                                                                                                                                                                                                    }});
                                                                                                                                                                                                                                                                                                               }})
                                                                                                                                                                                                                                                                                            ,seperator: rts.bytesFromAscii("")})
                                                                                                                                                                                                                                                                            ,infixr: function (local_317) {
                                                                                                                                                                                                                                                                               return {tag: "empty"
                                                                                                                                                                                                                                                                                      ,data: {}};
                                                                                                                                                                                                                                                                            }});
                                                                                                                                                                                                                                                        case "empty":
                                                                                                                                                                                                                                                          var local_318 =
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
                                                                                                                                                                                                                         return _22f2_()({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                                                                                                         ,infixr: singleton()(pestovalSessionCell()({password: password2
                                                                                                                                                                                                                                                                                    ,content: toArray()(_3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<p style=\"font-weight=bold\">")
                                                                                                                                                                                                                                                                                                                                     ,infixr: singleton()(leaf()(join()({texts: _3a__3a_()({infixl: formatTimeSlot()(session4)
                                                                                                                                                                                                                                                                                                                                                                                           ,infixr: function (local_335) {
                                                                                                                                                                                                                                                                                                                                                                                              return _3a__3a_()({infixl: session4.place1.name
                                                                                                                                                                                                                                                                                                                                                                                                                ,infixr: function (local_336) {
                                                                                                                                                                                                                                                                                                                                                                                                                   return {tag: "empty"
                                                                                                                                                                                                                                                                                                                                                                                                                          ,data: {}};
                                                                                                                                                                                                                                                                                                                                                                                                                }});
                                                                                                                                                                                                                                                                                                                                                                                           }})
                                                                                                                                                                                                                                                                                                                                                                        ,seperator: rts.bytesFromAscii(" / ")})))})
                                                                                                                                                                                                                                                                                                                   ,infixr: function (local_337) {
                                                                                                                                                                                                                                                                                                                      return _3a__3a_()({infixl: htmlParagraph()(info)
                                                                                                                                                                                                                                                                                                                                        ,infixr: function (local_338) {
                                                                                                                                                                                                                                                                                                                                           return {tag: "empty"
                                                                                                                                                                                                                                                                                                                                                  ,data: {}};
                                                                                                                                                                                                                                                                                                                                        }});
                                                                                                                                                                                                                                                                                                                   }}))
                                                                                                                                                                                                                                                                                    ,style: rts.bytesFromAscii("")
                                                                                                                                                                                                                                                                                    ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                                                                                                                    ,session: session4}))});
                                                                                                                                                                                                                      }})))
                                                                                                                                                                                 ,infixr: function (local_398) {
                                                                                                                                                                                    return {tag: "empty"
                                                                                                                                                                                           ,data: {}};
                                                                                                                                                                                 }});
                                                                                                                                                            }});
                                                                                                                                       }}))}));
                                                                       }});
                                                       default:
                                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                                      ,"DEF_50938aa1a135407c826989b9e1339047"
                                                                                      ,"fc81fe2932d91417e79f74d97a2f2ad5");
                                                     }
                                                  }});
                                 };
                          });
var maximum2 = rts.memo(function () {
                  return function (local_416) {
                         var x = _2265_()({infixl: local_416.__x1,infixr: local_416.y});
                         switch (x.tag)
                         {
                           case "false":
                             var local_417 = x.data;
                             return local_416.y;
                           case "true":
                             var local_418 = x.data;
                             return local_416.__x1;
                           default:
                             throw rts.exceptions.LamduBug("Unhandled case"
                                                          ,"DEF_19e923b820b04266a9811a6b34fe7b37"
                                                          ,"a5d0a997c71340b2b9d148187aeb6d00");
                         }
                      };
               });
var nonEmptyFold = rts.memo(function () {
                      return function (local_419) {
                             var x = local_419.stream;
                             switch (x.tag)
                             {
                               case "nonEmpty":
                                 var local_420 = x.data;
                                 return {tag: "just"
                                        ,data: fold()({stream: local_420.tail({})
                                                      ,initial: local_420.head
                                                      ,binop: local_419.binop})};
                               case "empty":
                                 var local_421 = x.data;
                                 return {tag: "nothing",data: {}};
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_05d859467ac547cc890fea33e3ff4642"
                                                              ,"eb3e9576545c4cc390019d2c5a8d9ce4");
                             }
                          };
                   });
var maximum1 = rts.memo(function () {
                  return function (stream8) {
                         return nonEmptyFold()({stream: stream8
                                               ,binop: function (local_415) {
                                                  return maximum2()({y: local_415.item
                                                                    ,__x1: local_415.acc});
                                               }});
                      };
               });
var maybe = rts.memo(function () {
               return function (local_422) {
                      var x = local_422.object;
                      switch (x.tag)
                      {
                        case "just":
                          return id2()(x.data);
                        case "nothing":
                          var local_423 = x.data;
                          return local_422.or;
                        default:
                          throw rts.exceptions.LamduBug("Unhandled case"
                                                       ,"DEF_6c78a9bb4dc7418b9c6fcbcdd77f4088"
                                                       ,"df8546f58bdc08635e9f6ff7be4f4953");
                      }
                   };
            });
var gcd = rts.memo(function () {
             return function (local_426) {
                    var x = _3d__3d_()({infixl: local_426.__x1,infixr: 0.0});
                    switch (x.tag)
                    {
                      case "false":
                        var local_427 = x.data;
                        return gcd()({y: local_426.__x1
                                     ,__x1: _25_()({infixl: local_426.y
                                                   ,infixr: local_426.__x1})});
                      case "true":
                        var local_428 = x.data;
                        return local_426.y;
                      default:
                        throw rts.exceptions.LamduBug("Unhandled case"
                                                     ,"DEF_493da5cfecea49b89fd9a10c42df9e12"
                                                     ,"426c0882a83d8df5efe64ca0e57098af");
                    }
                 };
          });
var lcm = rts.memo(function () {
             return function (local_425) {
                    return _2f_()({infixl: _2a_()({infixl: local_425.__x1
                                                  ,infixr: local_425.y})
                                  ,infixr: gcd()({y: local_425.y,__x1: local_425.__x1})});
                 };
          });
var timeSlotRow = rts.memo(function () {
                     return function (local_431) {
                            return _22f2_()({infixl: rts.bytesFromAscii("<tr>")
                                            ,infixr: singleton()(_22f2_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("<td colspan=")
                                                                                                             ,infixr: function (local_432) {
                                                                                                                return _3a__3a_()({infixl: showNum()(local_431.numColumns1)
                                                                                                                                  ,infixr: function (local_433) {
                                                                                                                                     return _3a__3a_()({infixl: rts.bytesFromAscii(" style=\"font-size:150%; border-top:3pt solid black;\">")
                                                                                                                                                       ,infixr: function (local_434) {
                                                                                                                                                          return {tag: "empty"
                                                                                                                                                                 ,data: {}};
                                                                                                                                                       }});
                                                                                                                                  }});
                                                                                                             }})
                                                                                          ,seperator: rts.bytesFromAscii("")})
                                                                          ,infixr: singleton()(leaf()(formatTimeSlot()(local_431.timeSlot)))}))});
                         };
                  });
var formatTeachers = rts.memo(function () {
                        return function (teachers2) {
                               return htmlParagraph()(_2b__2b_()({a: join()({texts: map()({stream: fromArray()(teachers2)
                                                                                          ,mapping: function (local_437) {
                                                                                             return local_437.name;
                                                                                          }})
                                                                            ,seperator: rts.bytesFromAscii(" & ")})
                                                                 ,b: rts.bytesFromAscii(":")}));
                            };
                     });
var pestovalLevelsPage = rts.memo(function () {
                            return function (local_400) {
                                   var minimum = parseInt()(item1()({index: 0.0
                                                                    ,object: local_400.path}));
                                   var maximum = function () {
                                                    var x =
                                                    _3e_()({infixl: length1()(local_400.path)
                                                           ,infixr: 1.0});
                                                    switch (x.tag)
                                                    {
                                                      case "false":
                                                        var local_401 = x.data;
                                                        return minimum;
                                                      case "true":
                                                        var local_402 = x.data;
                                                        return parseInt()(item1()({index: 1.0
                                                                                  ,object: local_400.path}));
                                                      default:
                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                     ,"DEF_a358e35c87a74404b2c606eb39bddad1"
                                                                                     ,"4c173067c4670de5fcb231cf53d90418");
                                                    }
                                                 }();
                                   var title2 = join()({texts: function () {
                                                          var x =
                                                          _3d__3d_()({infixl: minimum
                                                                     ,infixr: maximum});
                                                          switch (x.tag)
                                                          {
                                                            case "false":
                                                              var local_403 = x.data;
                                                              return _3a__3a_()({infixl: rts.bytesFromAscii("Levels")
                                                                                ,infixr: function (local_404) {
                                                                                   return _3a__3a_()({infixl: showNum()(minimum)
                                                                                                     ,infixr: function (local_405) {
                                                                                                        return _3a__3a_()({infixl: rts.bytesFromAscii("-")
                                                                                                                          ,infixr: function (local_406) {
                                                                                                                             return _3a__3a_()({infixl: showNum()(maximum)
                                                                                                                                               ,infixr: function (local_407) {
                                                                                                                                                  return {tag: "empty"
                                                                                                                                                         ,data: {}};
                                                                                                                                               }});
                                                                                                                          }});
                                                                                                     }});
                                                                                }});
                                                            case "true":
                                                              var local_408 = x.data;
                                                              return _3a__3a_()({infixl: rts.bytesFromAscii("Level")
                                                                                ,infixr: function (local_409) {
                                                                                   return _3a__3a_()({infixl: showNum()(minimum)
                                                                                                     ,infixr: function (local_410) {
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
                                   return _3b_()({infixl: pestovalQuerySessions()({database: local_400.database
                                                                                  ,teacher: {tag: "nothing"
                                                                                            ,data: {}}
                                                                                  ,filter: {tag: "just"
                                                                                           ,data: join()({texts: _3a__3a_()({infixl: showNum()(minimum)
                                                                                                                            ,infixr: function (local_411) {
                                                                                                                               return _3a__3a_()({infixl: rts.bytesFromAscii(" <= pestoval_level.as_number AND pestoval_level.as_number <= ")
                                                                                                                                                 ,infixr: function (local_412) {
                                                                                                                                                    return _3a__3a_()({infixl: showNum()(maximum)
                                                                                                                                                                      ,infixr: function (local_413) {
                                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                                ,data: {}};
                                                                                                                                                                      }});
                                                                                                                                                 }});
                                                                                                                            }})
                                                                                                         ,seperator: rts.bytesFromAscii("")})}})
                                                 ,infixr: function (sessions2) {
                                                    var groups =
                                                    toArray()(group()({stream: fromArray()(sessions2)
                                                                      ,by: function (local_414) {
                                                                         return _3d__3d_()({infixl: local_414.infixl.start
                                                                                           ,infixr: local_414.infixr.start});
                                                                      }}));
                                                    var maxRow =
                                                    maybe()({object: maximum1()(map()({stream: fromArray()(groups)
                                                                                      ,mapping: length1()}))
                                                            ,or: 0.0});
                                                    var numColumns =
                                                    fold()({stream: _2e__2e_()({start: 1.0
                                                                               ,stop: _2b_()({infixl: maxRow
                                                                                             ,infixr: 1.0})})
                                                           ,initial: 1.0
                                                           ,binop: function (local_424) {
                                                              return lcm()({y: local_424.item
                                                                           ,__x1: local_424.acc});
                                                           }});
                                                    return __return()(pestovalPage()({title: title2
                                                                                     ,body: toArray()(_3a__3a_()({infixl: overlaysCss()
                                                                                                                 ,infixr: function (local_429) {
                                                                                                                    return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<h2>")
                                                                                                                                                        ,infixr: singleton()(leaf()(title2))})
                                                                                                                                      ,infixr: function (local_430) {
                                                                                                                                         return _3a__3a_()({infixl: htmlTable()(toArray()(concat()(map()({stream: fromArray()(groups)
                                                                                                                                                                                                         ,mapping: function (group1) {
                                                                                                                                                                                                            return _3a__3a_()({infixl: timeSlotRow()({numColumns1: numColumns
                                                                                                                                                                                                                                                     ,timeSlot: item1()({index: 0.0
                                                                                                                                                                                                                                                                        ,object: group1})})
                                                                                                                                                                                                                              ,infixr: function (local_435) {
                                                                                                                                                                                                                                 var attributes1 =
                                                                                                                                                                                                                                 function (local_436) {
                                                                                                                                                                                                                                    return _2b__2b_()({a: _2b__2b_()({a: _2b__2b_()({a: _2b__2b_()({a: rts.bytesFromAscii("colspan=")
                                                                                                                                                                                                                                                                                                   ,b: showNum()(_2f_()({infixl: numColumns
                                                                                                                                                                                                                                                                                                                        ,infixr: local_436}))})
                                                                                                                                                                                                                                                                                    ,b: rts.bytesFromAscii(" width=\"")})
                                                                                                                                                                                                                                                                     ,b: showNum()(_2f__2f_()({infixl: 100.0
                                                                                                                                                                                                                                                                                              ,infixr: local_436}))})
                                                                                                                                                                                                                                                      ,b: rts.bytesFromAscii("%\"")});
                                                                                                                                                                                                                                 }(length1()(group1));
                                                                                                                                                                                                                                 return _3a__3a_()({infixl: _22f2_()({infixl: rts.bytesFromAscii("<tr>")
                                                                                                                                                                                                                                                                     ,infixr: toArray()(map()({stream: fromArray()(group1)
                                                                                                                                                                                                                                                                                              ,mapping: function (session5) {
                                                                                                                                                                                                                                                                                                 return pestovalSessionCell()({password: {tag: "nothing"
                                                                                                                                                                                                                                                                                                                                         ,data: {}}
                                                                                                                                                                                                                                                                                                                              ,content: toArray()(_3a__3a_()({infixl: formatTeachers()(session5.teachers1)
                                                                                                                                                                                                                                                                                                                                                             ,infixr: function (local_438) {
                                                                                                                                                                                                                                                                                                                                                                return _3a__3a_()({infixl: htmlParagraph()(session5.name)
                                                                                                                                                                                                                                                                                                                                                                                  ,infixr: function (local_439) {
                                                                                                                                                                                                                                                                                                                                                                                     return _3a__3a_()({infixl: htmlParagraph()(session5.place1.name)
                                                                                                                                                                                                                                                                                                                                                                                                       ,infixr: function (local_440) {
                                                                                                                                                                                                                                                                                                                                                                                                          return {tag: "empty"
                                                                                                                                                                                                                                                                                                                                                                                                                 ,data: {}};
                                                                                                                                                                                                                                                                                                                                                                                                       }});
                                                                                                                                                                                                                                                                                                                                                                                  }});
                                                                                                                                                                                                                                                                                                                                                             }}))
                                                                                                                                                                                                                                                                                                                              ,style: rts.bytesFromAscii("border-left: 1pt solid black")
                                                                                                                                                                                                                                                                                                                              ,attributes: attributes1
                                                                                                                                                                                                                                                                                                                              ,session: session5});
                                                                                                                                                                                                                                                                                              }}))})
                                                                                                                                                                                                                                                   ,infixr: function (local_441) {
                                                                                                                                                                                                                                                      return {tag: "empty"
                                                                                                                                                                                                                                                             ,data: {}};
                                                                                                                                                                                                                                                   }});
                                                                                                                                                                                                                              }});
                                                                                                                                                                                                         }}))))
                                                                                                                                                           ,infixr: function (local_442) {
                                                                                                                                                              return {tag: "empty"
                                                                                                                                                                     ,data: {}};
                                                                                                                                                           }});
                                                                                                                                      }});
                                                                                                                 }}))}));
                                                 }});
                                };
                         });
var dedup = rts.memo(function () {
               return function (local_446) {
                      return toArray()(map()({stream: group()({stream: local_446
                                                              ,by: _3d__3d_()})
                                             ,mapping: function (local_447) {
                                                return item1()({index: 0.0
                                                               ,object: local_447});
                                             }}));
                   };
            });
var placesRow = rts.memo(function () {
                   return function (places1) {
                          var __tag =
                          join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("<th width=\"")
                                                    ,infixr: function (local_449) {
                                                       return _3a__3a_()({infixl: showNum()(_2f_()({infixl: 100.0
                                                                                                   ,infixr: length1()(places1)}))
                                                                         ,infixr: function (local_450) {
                                                                            return _3a__3a_()({infixl: rts.bytesFromAscii("%\">")
                                                                                              ,infixr: function (local_451) {
                                                                                                 return {tag: "empty"
                                                                                                        ,data: {}};
                                                                                              }});
                                                                         }});
                                                    }})
                                 ,seperator: rts.bytesFromAscii("")});
                          return _22f2_()({infixl: rts.bytesFromAscii("<tr style=\"background-color:#eee\">")
                                          ,infixr: toArray()(map()({stream: fromArray()(places1)
                                                                   ,mapping: function (local_452) {
                                                                      return _22f2_()({infixl: __tag
                                                                                      ,infixr: singleton()(_22f2_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("<a href=\"/places/")
                                                                                                                                                       ,infixr: function (local_453) {
                                                                                                                                                          return _3a__3a_()({infixl: local_452.id1
                                                                                                                                                                            ,infixr: function (local_454) {
                                                                                                                                                                               return _3a__3a_()({infixl: rts.bytesFromAscii("/\"> ")
                                                                                                                                                                                                 ,infixr: function (local_455) {
                                                                                                                                                                                                    return {tag: "empty"
                                                                                                                                                                                                           ,data: {}};
                                                                                                                                                                                                 }});
                                                                                                                                                                            }});
                                                                                                                                                       }})
                                                                                                                                    ,seperator: rts.bytesFromAscii("")})
                                                                                                                    ,infixr: singleton()(leaf()(local_452.name))}))});
                                                                   }}))});
                       };
                });
var toArray1 = rts.memo(function () {
                  return function (local_461) {
                         return runMutArray()(_3b_()({infixl: newMutArray1()(replicate()({count: local_461.size
                                                                                         ,item: {tag: "nothing"
                                                                                                ,data: {}}}))
                                                     ,infixr: function (__array5) {
                                                        return _3b_()({infixl: sequence__()(map()({stream: local_461.stream
                                                                                                  ,mapping: function (local_462) {
                                                                                                     return writeMutArray()({index: local_461.index(local_462)
                                                                                                                            ,object: __array5
                                                                                                                            ,value: {tag: "just"
                                                                                                                                    ,data: local_462}});
                                                                                                  }}))
                                                                      ,infixr: function (local_463) {
                                                                         return __return()(__array5);
                                                                      }});
                                                     }}));
                      };
               });
var pestovalSessionsTable = rts.memo(function () {
                               return function (database2) {
                                      return _3b_()({infixl: pestovalQuerySessions()({database: database2
                                                                                     ,teacher: {tag: "nothing"
                                                                                               ,data: {}}
                                                                                     ,filter: {tag: "nothing"
                                                                                              ,data: {}}})
                                                    ,infixr: function (sessions3) {
                                                       var places =
                                                       dedup()(fromArray()(sort()({stream: map()({stream: fromArray()(sessions3)
                                                                                                 ,mapping: function (local_444) {
                                                                                                    return local_444.place1;
                                                                                                 }})
                                                                                  ,_3c_1: function (local_445) {
                                                                                     return _3c_()({infixl: local_445.infixl.id1
                                                                                                   ,infixr: local_445.infixr.id1});
                                                                                  }})));
                                                       var numColumns2 =
                                                       length1()(places);
                                                       return __return()(pestovalPage()({title: rts.bytesFromAscii("All Sessions")
                                                                                        ,body: toArray()(_3a__3a_()({infixl: overlaysCss()
                                                                                                                    ,infixr: function (local_448) {
                                                                                                                       return _3a__3a_()({infixl: htmlTable()(toArray()(_3a__3a_()({infixl: placesRow()(places)
                                                                                                                                                                                   ,infixr: function (local_456) {
                                                                                                                                                                                      return concat()(map()({stream: group()({stream: fromArray()(sessions3)
                                                                                                                                                                                                                             ,by: function (local_457) {
                                                                                                                                                                                                                                return _3d__3d_()({infixl: local_457.infixl.start
                                                                                                                                                                                                                                                  ,infixr: local_457.infixr.start});
                                                                                                                                                                                                                             }})
                                                                                                                                                                                                            ,mapping: function (local_458) {
                                                                                                                                                                                                               return _3a__3a_()({infixl: timeSlotRow()({numColumns1: numColumns2
                                                                                                                                                                                                                                                        ,timeSlot: item1()({index: 0.0
                                                                                                                                                                                                                                                                           ,object: local_458})})
                                                                                                                                                                                                                                 ,infixr: function (local_459) {
                                                                                                                                                                                                                                    return map()({stream: fromArray()(toArray1()({stream: fromArray()(local_458)
                                                                                                                                                                                                                                                                                 ,index: function (local_460) {
                                                                                                                                                                                                                                                                                    return index4()({__array4: places
                                                                                                                                                                                                                                                                                                    ,item: local_460.place1});
                                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                                 ,size: numColumns2}))
                                                                                                                                                                                                                                                 ,mapping: function (local_464) {
                                                                                                                                                                                                                                                    var x =
                                                                                                                                                                                                                                                    local_464;
                                                                                                                                                                                                                                                    switch (x.tag)
                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                      case "just":
                                                                                                                                                                                                                                                        var session6 =
                                                                                                                                                                                                                                                        x.data;
                                                                                                                                                                                                                                                        return pestovalSessionCell()({password: {tag: "nothing"
                                                                                                                                                                                                                                                                                                ,data: {}}
                                                                                                                                                                                                                                                                                     ,content: toArray()(_3a__3a_()({infixl: formatTeachers()(session6.teachers1)
                                                                                                                                                                                                                                                                                                                    ,infixr: function (local_465) {
                                                                                                                                                                                                                                                                                                                       return _3a__3a_()({infixl: htmlParagraph()(session6.name)
                                                                                                                                                                                                                                                                                                                                         ,infixr: function (local_466) {
                                                                                                                                                                                                                                                                                                                                            return {tag: "empty"
                                                                                                                                                                                                                                                                                                                                                   ,data: {}};
                                                                                                                                                                                                                                                                                                                                         }});
                                                                                                                                                                                                                                                                                                                    }}))
                                                                                                                                                                                                                                                                                     ,style: rts.bytesFromAscii("")
                                                                                                                                                                                                                                                                                     ,attributes: rts.bytesFromAscii("")
                                                                                                                                                                                                                                                                                     ,session: session6});
                                                                                                                                                                                                                                                      case "nothing":
                                                                                                                                                                                                                                                        var local_467 =
                                                                                                                                                                                                                                                        x.data;
                                                                                                                                                                                                                                                        return leaf()(rts.bytesFromAscii("<td style=\"background-color:#f8f8f8\">"));
                                                                                                                                                                                                                                                      default:
                                                                                                                                                                                                                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                                                                                                                     ,"DEF_753a440ceaa64a519d4334364c39d50b"
                                                                                                                                                                                                                                                                                     ,"e22df53d1ea1be33327cca9a5f4067a5");
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                 }});
                                                                                                                                                                                                                                 }});
                                                                                                                                                                                                            }}));
                                                                                                                                                                                   }})))
                                                                                                                                         ,infixr: function (local_468) {
                                                                                                                                            return {tag: "empty"
                                                                                                                                                   ,data: {}};
                                                                                                                                         }});
                                                                                                                    }}))}));
                                                    }});
                                   };
                            });
var readFile = rts.memo(function () { return rts.builtins.IO.file["readFile"];});
var pestovalIndex = rts.memo(function () {
                       return _3b_()({infixl: readFile()(rts.bytesFromAscii("index.html"))
                                     ,infixr: function (local_470) {
                                        return __return()({content: {__data: local_470
                                                                    ,mimeType: rts.bytesFromAscii("text/html")}
                                                          ,status: httpOk200()});
                                     }});
                    });
var pestovalHandler = rts.memo(function () {
                         return function (local_67) {
                                var parts =
                                toArray()(split()({text: local_67.request1.path
                                                  ,seperator: rts.bytesFromAscii("/")}));
                                var language = item1()({index: 1.0,object: parts});
                                var x =
                                _26__26_()({infixl: _3d__3d_()({infixl: length1()(parts)
                                                               ,infixr: 2.0})
                                           ,infixr: function (local_68) {
                                              return _3d__3d_()({infixl: language
                                                                ,infixr: rts.bytesFromAscii("")});
                                           }});
                                switch (x.tag)
                                {
                                  case "false":
                                    var local_69 = x.data;
                                    var page = item1()({index: 2.0,object: parts});
                                    var path1 =
                                    toArray()(drop()({stream: fromArray()(parts)
                                                     ,count: 3.0}));
                                    var x =
                                    _26__26_()({infixl: _3d__3d_()({infixl: length1()(parts)
                                                                   ,infixr: 3.0})
                                               ,infixr: function (local_76) {
                                                  return _3d__3d_()({infixl: page
                                                                    ,infixr: rts.bytesFromAscii("")});
                                               }});
                                    switch (x.tag)
                                    {
                                      case "false":
                                        var local_77 = x.data;
                                        var x = _3d__3d_()({infixl: page
                                                           ,infixr: rts.bytesFromAscii("levels")});
                                        switch (x.tag)
                                        {
                                          case "false":
                                            var local_78 = x.data;
                                            var x = _3d__3d_()({infixl: page
                                                               ,infixr: rts.bytesFromAscii("teacher")});
                                            switch (x.tag)
                                            {
                                              case "false":
                                                var local_79 = x.data;
                                                var x = _3d__3d_()({infixl: page
                                                                   ,infixr: rts.bytesFromAscii("edit")});
                                                switch (x.tag)
                                                {
                                                  case "false":
                                                    var local_80 = x.data;
                                                    return __return()(httpNotFound404()(local_67.request1.path));
                                                  case "true":
                                                    var local_87 = x.data;
                                                    return pestovalEditPage()({request1: local_67.request1
                                                                              ,database: local_67.database});
                                                  default:
                                                    throw rts.exceptions.LamduBug("Unhandled case"
                                                                                 ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                                                 ,"3904128e0f229aab0f559b8c4efd7e8c");
                                                }
                                              case "true":
                                                var local_293 = x.data;
                                                return pestovalTeacherPage()({path: path1
                                                                             ,database: local_67.database});
                                              default:
                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                             ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                                             ,"1efb5179a530efb5cf0ea0f292813e32");
                                            }
                                          case "true":
                                            var local_399 = x.data;
                                            return pestovalLevelsPage()({path: path1
                                                                        ,database: local_67.database});
                                          default:
                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                         ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                                         ,"3725e3e3e238c36942a62af16a116f25");
                                        }
                                      case "true":
                                        var local_443 = x.data;
                                        return pestovalSessionsTable()(local_67.database);
                                      default:
                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                     ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                                     ,"0e90da8443f9aff3c55edb7f8fef28fc");
                                    }
                                  case "true":
                                    var local_469 = x.data;
                                    return pestovalIndex();
                                  default:
                                    throw rts.exceptions.LamduBug("Unhandled case"
                                                                 ,"DEF_e08e75bbdef9486a9b6cb96aacef3212"
                                                                 ,"56d9fbebaa75d3344238b42c2f66dbca");
                                }
                             };
                      });
var send = rts.memo(function () { return rts.builtins.IO.network["socketSend"];});
var truncateMutArray = rts.memo(function () {
                          return rts.builtins.Mut.Array["truncate"];
                       });
var popLastMutArray = rts.memo(function () {
                         return function (__array6) {
                                return _3b_()({infixl: length4()(__array6)
                                              ,infixr: function (length6) {
                                                 var x = _3e_()({infixl: length6
                                                                ,infixr: 0.0});
                                                 switch (x.tag)
                                                 {
                                                   case "false":
                                                     var local_483 = x.data;
                                                     return __return()({tag: "nothing"
                                                                       ,data: {}});
                                                   case "true":
                                                     var local_484 = x.data;
                                                     return _3b_()({infixl: readMutArray()({index: _2d_()({infixl: length6
                                                                                                          ,infixr: 1.0})
                                                                                           ,object: __array6})
                                                                   ,infixr: function (result) {
                                                                      return _3b_()({infixl: truncateMutArray()({object: __array6
                                                                                                                ,stop: _2d_()({infixl: length6
                                                                                                                              ,infixr: 1.0})})
                                                                                    ,infixr: function (local_485) {
                                                                                       return __return()({tag: "just"
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
                      });
var sequence = rts.memo(function () {
                  return function (stream9) {
                         return foldLazy()({stream: stream9
                                           ,initial: function (local_493) {
                                              return __return()({tag: "empty",data: {}});
                                           }
                                           ,binop: function (local_494) {
                                              return _3b_()({infixl: local_494.item
                                                            ,infixr: function (local_495) {
                                                               return _3b_()({infixl: local_494.rest({})
                                                                             ,infixr: function (local_496) {
                                                                                return __return()({tag: "nonEmpty"
                                                                                                  ,data: {head: local_495
                                                                                                         ,tail: function (local_497) {
                                                                                                            return local_496;
                                                                                                         }}});
                                                                             }});
                                                            }});
                                           }});
                      };
               });
var find1 = rts.memo(function () {
               return function (local_509) {
                      return first()({that: function (local_510) {
                                        return _3d__3d_()({infixl: byteAt()({index: local_510
                                                                            ,object: local_509.__bytes})
                                                          ,infixr: local_509.byte});
                                     }
                                     ,stream: _2e__2e_()({start: local_509.start
                                                         ,stop: length()(local_509.__bytes)})});
                   };
            });
var unsuffixed = rts.memo(function () {
                    return function (local_516) {
                           var x = isSuffixOf()({suffix: local_516.suffix
                                                ,whole: local_516.whole});
                           switch (x.tag)
                           {
                             case "false":
                               var local_517 = x.data;
                               return {tag: "nothing",data: {}};
                             case "true":
                               var local_518 = x.data;
                               return {tag: "just"
                                      ,data: slice1()({object: local_516.whole
                                                      ,start: 0.0
                                                      ,stop: _2d_()({infixl: length()(local_516.whole)
                                                                    ,infixr: length()(local_516.suffix)})})};
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_6c2d206c45c348b3b8e2bbfdae7bde35"
                                                            ,"7d90a0e076a149c4443b780b21470ef3");
                           }
                        };
                 });
var removeSuffix = rts.memo(function () {
                      return function (local_515) {
                             var x = unsuffixed()({suffix: local_515.suffix
                                                  ,whole: local_515.whole});
                             switch (x.tag)
                             {
                               case "just":
                                 return id2()(x.data);
                               case "nothing":
                                 var local_519 = x.data;
                                 return local_515.whole;
                               default:
                                 throw rts.exceptions.LamduBug("Unhandled case"
                                                              ,"DEF_8c9d00ae73ab41ca903aa34ee4c6601a"
                                                              ,"97a63e2f16bd481c6e64fd0c8a6d92fa");
                             }
                          };
                   });
var packetsEndWith = rts.memo(function () {
                        return function (local_523) {
                               var x = _3d__3d_()({infixl: local_523.stop,infixr: 0.0});
                               switch (x.tag)
                               {
                                 case "false":
                                   var local_524 = x.data;
                                   return _3b_()({infixl: readMutArray()({index: _2d_()({infixl: local_523.stop
                                                                                        ,infixr: 1.0})
                                                                         ,object: local_523.packets1})
                                                 ,infixr: function (packet1) {
                                                    var x =
                                                    isSuffixOf()({suffix: local_523.suffix
                                                                 ,whole: packet1});
                                                    switch (x.tag)
                                                    {
                                                      case "false":
                                                        var local_525 = x.data;
                                                        var x =
                                                        unsuffixed()({suffix: packet1
                                                                     ,whole: local_523.suffix});
                                                        switch (x.tag)
                                                        {
                                                          case "just":
                                                            var remain1 = x.data;
                                                            return packetsEndWith()({suffix: remain1
                                                                                    ,stop: _2d_()({infixl: local_523.stop
                                                                                                  ,infixr: 1.0})
                                                                                    ,packets1: local_523.packets1});
                                                          case "nothing":
                                                            var local_526 = x.data;
                                                            return __return()({tag: "false"
                                                                              ,data: {}});
                                                          default:
                                                            throw rts.exceptions.LamduBug("Unhandled case"
                                                                                         ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                                                         ,"0d0804c08ad23d9eed424fc83122d6dc");
                                                        }
                                                      case "true":
                                                        var local_527 = x.data;
                                                        return __return()({tag: "true"
                                                                          ,data: {}});
                                                      default:
                                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                                     ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                                                     ,"49052b2836be0b25cb20bc95d00972ca");
                                                    }
                                                 }});
                                 case "true":
                                   var local_528 = x.data;
                                   return __return()({tag: "false",data: {}});
                                 default:
                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                ,"DEF_a2f069d7413941fdafe42795f6970175"
                                                                ,"ae670587961cb7d305eef1133a3bbc18");
                               }
                            };
                     });
var parseHttpHeaderPacket = rts.memo(function () {
                               return function (local_508) {
                                      var x = find1()({start: local_508.start
                                                      ,__bytes: local_508.newPacket
                                                      ,byte: 10.0});
                                      switch (x.tag)
                                      {
                                        case "just":
                                          var lfPos = x.data;
                                          var after = _2b_()({infixl: lfPos,infixr: 1.0});
                                          return _3b_()({infixl: length4()(local_508.packets1)
                                                        ,infixr: function (packetIdx) {
                                                           var done1 =
                                                           function (local_511) {
                                                              return _3b_()({infixl: sequence()(map()({stream: _2e__2e_()({start: 0.0
                                                                                                                          ,stop: packetIdx})
                                                                                                      ,mapping: function (i) {
                                                                                                         return readMutArray()({index: i
                                                                                                                               ,object: local_508.packets1});
                                                                                                      }}))
                                                                            ,infixr: function (local_512) {
                                                                               var headerBytes =
                                                                               concat2()(_2b__2b_2()({infixl: local_512
                                                                                                     ,infixr: function (local_513) {
                                                                                                        return _3a__3a_()({infixl: slice1()({object: local_508.newPacket
                                                                                                                                            ,start: 0.0
                                                                                                                                            ,stop: lfPos})
                                                                                                                          ,infixr: function (local_514) {
                                                                                                                             return {tag: "empty"
                                                                                                                                    ,data: {}};
                                                                                                                          }});
                                                                                                     }}));
                                                                               var headerLines =
                                                                               toArray()(map()({stream: split1()({__bytes: headerBytes
                                                                                                                 ,seperator: rts.bytes([10])})
                                                                                               ,mapping: function (line1) {
                                                                                                  return removeSuffix()({suffix: rts.bytes([13])
                                                                                                                        ,whole: line1});
                                                                                               }}));
                                                                               return _3b_()({infixl: truncateMutArray()({object: local_508.packets1
                                                                                                                         ,stop: 0.0})
                                                                                             ,infixr: function (local_520) {
                                                                                                return _3b_()({infixl: appendMutArray()({object: local_508.packets1
                                                                                                                                        ,value: slice1()({object: local_508.newPacket
                                                                                                                                                         ,start: after
                                                                                                                                                         ,stop: length()(local_508.newPacket)})})
                                                                                                              ,infixr: function (local_521) {
                                                                                                                 return __return()({tag: "just"
                                                                                                                                   ,data: headerLines});
                                                                                                              }});
                                                                                             }});
                                                                            }});
                                                           };
                                                           var prevEndsWith =
                                                           function (local_522) {
                                                              return packetsEndWith()({suffix: local_522
                                                                                      ,stop: packetIdx
                                                                                      ,packets1: local_508.packets1});
                                                           };
                                                           var next1 =
                                                           function (local_529) {
                                                              return parseHttpHeaderPacket()({start: after
                                                                                             ,newPacket: local_508.newPacket
                                                                                             ,packets1: local_508.packets1});
                                                           };
                                                           var x =
                                                           _3d__3d_()({infixl: lfPos
                                                                      ,infixr: 0.0});
                                                           switch (x.tag)
                                                           {
                                                             case "false":
                                                               var local_530 = x.data;
                                                               var prevByte =
                                                               byteAt()({index: _2d_()({infixl: lfPos
                                                                                       ,infixr: 1.0})
                                                                        ,object: local_508.newPacket});
                                                               var x =
                                                               _3d__3d_()({infixl: prevByte
                                                                          ,infixr: 10.0});
                                                               switch (x.tag)
                                                               {
                                                                 case "false":
                                                                   var local_531 = x.data;
                                                                   var x =
                                                                   _3d__3d_()({infixl: prevByte
                                                                              ,infixr: 13.0});
                                                                   switch (x.tag)
                                                                   {
                                                                     case "false":
                                                                       return next1(x.data);
                                                                     case "true":
                                                                       var local_532 =
                                                                       x.data;
                                                                       var x =
                                                                       _3d__3d_()({infixl: lfPos
                                                                                  ,infixr: 1.0});
                                                                       switch (x.tag)
                                                                       {
                                                                         case "false":
                                                                           var local_533 =
                                                                           x.data;
                                                                           var x =
                                                                           _3d__3d_()({infixl: byteAt()({index: _2d_()({infixl: lfPos
                                                                                                                       ,infixr: 2.0})
                                                                                                        ,object: local_508.newPacket})
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
                                                                           var local_534 =
                                                                           x.data;
                                                                           return _3b_()({infixl: prevEndsWith(rts.bytes([10]))
                                                                                         ,infixr: function (local_535) {
                                                                                            var x =
                                                                                            local_535;
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
                                                               var local_536 = x.data;
                                                               return _3b_()({infixl: prevEndsWith(rts.bytes([10]))
                                                                             ,infixr: function (local_537) {
                                                                                var x =
                                                                                local_537;
                                                                                switch (x.tag)
                                                                                {
                                                                                  case "false":
                                                                                    var local_538 =
                                                                                    x.data;
                                                                                    return _3b_()({infixl: prevEndsWith(rts.bytes([10
                                                                                                                                  ,13]))
                                                                                                  ,infixr: function (local_539) {
                                                                                                     var x =
                                                                                                     local_539;
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
                                          var local_540 = x.data;
                                          return _3b_()({infixl: appendMutArray()({object: local_508.packets1
                                                                                  ,value: local_508.newPacket})
                                                        ,infixr: function (local_541) {
                                                           return __return()({tag: "nothing"
                                                                             ,data: {}});
                                                        }});
                                        default:
                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                       ,"DEF_a00f5ba4e1de43628a3c7097ac2b957e"
                                                                       ,"a641e1eefdb6d290e8f5e30eb99ae939");
                                      }
                                   };
                            });
var requestHeaderIndex = rts.memo(function () {
                            return function (x544) {
                                   switch (x544.tag)
                                   {
                                     case "referer":
                                       var local_545 = x544.data;
                                       return 9.0;
                                     case "range":
                                       var local_546 = x544.data;
                                       return 4.0;
                                     case "contentLength":
                                       var local_547 = x544.data;
                                       return 0.0;
                                     case "connection":
                                       var local_548 = x544.data;
                                       return 3.0;
                                     case "host":
                                       var local_549 = x544.data;
                                       return 5.0;
                                     case "userAgent":
                                       var local_550 = x544.data;
                                       return 10.0;
                                     case "ifModifiedSince":
                                       var local_551 = x544.data;
                                       return 6.0;
                                     case "ifRange":
                                       var local_552 = x544.data;
                                       return 8.0;
                                     case "count":
                                       var local_553 = x544.data;
                                       return 11.0;
                                     case "transferEncoding":
                                       var local_554 = x544.data;
                                       return 1.0;
                                     case "expect":
                                       var local_555 = x544.data;
                                       return 2.0;
                                     case "ifUnmodifiedSince":
                                       var local_556 = x544.data;
                                       return 7.0;
                                     default:
                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                    ,"DEF_1b4c5f4e650b40db91d34fcbb46eedcc"
                                                                    ,"2d1d3f6c02b34a16b1ecc9cff08b339e");
                                   }
                                };
                         });
var toLower8 = rts.memo(function () {
                  return function (local_559) {
                         var x =
                         _7c__7c_()({infixl: _26__26_()({infixl: _2264_()({infixl: 65.0
                                                                          ,infixr: local_559})
                                                        ,infixr: function (local_560) {
                                                           return _2264_()({infixl: local_559
                                                                           ,infixr: 90.0});
                                                        }})
                                    ,infixr: function (local_561) {
                                       return _26__26_()({infixl: _2264_()({infixl: 192.0
                                                                           ,infixr: local_559})
                                                         ,infixr: function (local_562) {
                                                            return _26__26_()({infixl: _2264_()({infixl: local_559
                                                                                                ,infixr: 222.0})
                                                                              ,infixr: function (local_563) {
                                                                                 return _2260_()({infixl: local_559
                                                                                                 ,infixr: 215.0});
                                                                              }});
                                                         }});
                                    }});
                         switch (x.tag)
                         {
                           case "false":
                             var local_564 = x.data;
                             return local_559;
                           case "true":
                             var local_565 = x.data;
                             return _2b_()({infixl: local_559,infixr: 32.0});
                           default:
                             throw rts.exceptions.LamduBug("Unhandled case"
                                                          ,"DEF_d53402309e2246e0acda443ccc6735f8"
                                                          ,"26914d49ae6cd50363dc7b55bd37d4d5");
                         }
                      };
               });
var numHeadItems = rts.memo(function () {
                      return function (local_569) {
                             return foldLazy()({stream: local_569.stream
                                               ,initial: function (local_570) {
                                                  return id2();
                                               }
                                               ,binop: function (local_571) {
                                                  return function (local_572) {
                                                         var x =
                                                         local_569.that(local_571.item);
                                                         switch (x.tag)
                                                         {
                                                           case "false":
                                                             var local_573 = x.data;
                                                             return local_572;
                                                           case "true":
                                                             var local_574 = x.data;
                                                             return local_571.rest({})(_2b_()({infixl: local_572
                                                                                              ,infixr: 1.0}));
                                                           default:
                                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                                          ,"DEF_8e2a63199d5c4946ae51e428c77e2587"
                                                                                          ,"b73a61d07547543acce9e5aa2b53f447");
                                                         }
                                                      };
                                               }})(0.0);
                          };
                   });
var parseHeader = rts.memo(function () {
                     return function (line2) {
                            var withLower = function (local_558) {
                               return {headerNameOrig: local_558
                                      ,headerNameLower: toBytes()(toArray()(map()({stream: fromBytes()(local_558)
                                                                                  ,mapping: toLower8()})))};
                            };
                            var x = find1()({start: 0.0,__bytes: line2,byte: 58.0});
                            switch (x.tag)
                            {
                              case "just":
                                var local_566 = x.data;
                                var x = Object.assign({__data: function (local_567) {
                                                        return slice1()({object: line2
                                                                        ,start: _2b_()({infixl: _2b_()({infixl: local_566
                                                                                                       ,infixr: 1.0})
                                                                                       ,infixr: numHeadItems()({that: function (c) {
                                                                                                                  return _7c__7c_()({infixl: _3d__3d_()({infixl: c
                                                                                                                                                        ,infixr: 32.0})
                                                                                                                                    ,infixr: function (local_568) {
                                                                                                                                       return _3d__3d_()({infixl: c
                                                                                                                                                         ,infixr: 9.0});
                                                                                                                                    }});
                                                                                                               }
                                                                                                               ,stream: fromBytes()(slice1()({object: line2
                                                                                                                                             ,start: _2b_()({infixl: local_566
                                                                                                                                                            ,infixr: 1.0})
                                                                                                                                             ,stop: local_567}))})})
                                                                        ,stop: local_567});
                                                     }(length()(line2))}
                                                     ,withLower(slice1()({object: line2
                                                                         ,start: 0.0
                                                                         ,stop: local_566})));
                                delete x.cacheId;
                                return x;
                              case "nothing":
                                var local_575 = x.data;
                                var x = Object.assign({__data: rts.bytesFromAscii("")}
                                                     ,withLower(line2));
                                delete x.cacheId;
                                return x;
                              default:
                                throw rts.exceptions.LamduBug("Unhandled case"
                                                             ,"DEF_24c62861bfb940e4addebcc337a003f8"
                                                             ,"2fd2696b8bb145a1f8ea35cf6754cfb8");
                            }
                         };
                  });
var requestHeaderIndexFromText = rts.memo(function () {
                                    return function (local_577) {
                                           var local_578 = length()(local_577);
                                           var test = function (local_579) {
                                              var x = _3d__3d_()({infixl: local_577
                                                                 ,infixr: local_579.text});
                                              switch (x.tag)
                                              {
                                                case "false":
                                                  var local_580 = x.data;
                                                  return {tag: "nothing",data: {}};
                                                case "true":
                                                  var local_581 = x.data;
                                                  return {tag: "just"
                                                         ,data: requestHeaderIndex()(local_579.value)};
                                                default:
                                                  throw rts.exceptions.LamduBug("Unhandled case"
                                                                               ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                               ,"dc1fada55c8b610b4ec39d131179bc92");
                                              }
                                           };
                                           var x = _3d__3d_()({infixl: local_578
                                                              ,infixr: 4.0});
                                           switch (x.tag)
                                           {
                                             case "false":
                                               var local_582 = x.data;
                                               var x = _3d__3d_()({infixl: local_578
                                                                  ,infixr: 5.0});
                                               switch (x.tag)
                                               {
                                                 case "false":
                                                   var local_583 = x.data;
                                                   var x = _3d__3d_()({infixl: local_578
                                                                      ,infixr: 6.0});
                                                   switch (x.tag)
                                                   {
                                                     case "false":
                                                       var local_584 = x.data;
                                                       var x =
                                                       _3d__3d_()({infixl: local_578
                                                                  ,infixr: 7.0});
                                                       switch (x.tag)
                                                       {
                                                         case "false":
                                                           var local_585 = x.data;
                                                           var x =
                                                           _3d__3d_()({infixl: local_578
                                                                      ,infixr: 8.0});
                                                           switch (x.tag)
                                                           {
                                                             case "false":
                                                               var local_586 = x.data;
                                                               var x =
                                                               _3d__3d_()({infixl: local_578
                                                                          ,infixr: 10.0});
                                                               switch (x.tag)
                                                               {
                                                                 case "false":
                                                                   var local_587 = x.data;
                                                                   var x =
                                                                   _3d__3d_()({infixl: local_578
                                                                              ,infixr: 14.0});
                                                                   switch (x.tag)
                                                                   {
                                                                     case "false":
                                                                       var local_588 =
                                                                       x.data;
                                                                       var x =
                                                                       _3d__3d_()({infixl: local_578
                                                                                  ,infixr: 17.0});
                                                                       switch (x.tag)
                                                                       {
                                                                         case "false":
                                                                           var local_589 =
                                                                           x.data;
                                                                           var x =
                                                                           _3d__3d_()({infixl: local_578
                                                                                      ,infixr: 19.0});
                                                                           switch (x.tag)
                                                                           {
                                                                             case "false":
                                                                               var local_590 =
                                                                               x.data;
                                                                               return {tag: "nothing"
                                                                                      ,data: {}};
                                                                             case "true":
                                                                               var local_591 =
                                                                               x.data;
                                                                               return test({text: rts.bytesFromAscii("if-unmodified-since")
                                                                                           ,value: {tag: "ifUnmodifiedSince"
                                                                                                   ,data: {}}});
                                                                             default:
                                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                                                            ,"f8cf9e99c6ebab86468dac6f079e1d43");
                                                                           }
                                                                         case "true":
                                                                           var local_592 =
                                                                           x.data;
                                                                           var x =
                                                                           _3d__3d_()({infixl: local_577
                                                                                      ,infixr: rts.bytesFromAscii("transfer-encoding")});
                                                                           switch (x.tag)
                                                                           {
                                                                             case "false":
                                                                               var local_593 =
                                                                               x.data;
                                                                               var x =
                                                                               _3d__3d_()({infixl: local_577
                                                                                          ,infixr: rts.bytesFromAscii("if-modified-since")});
                                                                               switch (x.tag)
                                                                               {
                                                                                 case "false":
                                                                                   var local_594 =
                                                                                   x.data;
                                                                                   return {tag: "nothing"
                                                                                          ,data: {}};
                                                                                 case "true":
                                                                                   var local_595 =
                                                                                   x.data;
                                                                                   return {tag: "just"
                                                                                          ,data: requestHeaderIndex()({tag: "ifModifiedSince"
                                                                                                                      ,data: {}})};
                                                                                 default:
                                                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                                                                ,"5c9b7e120cfcbfe66378a56aa55e1554");
                                                                               }
                                                                             case "true":
                                                                               var local_596 =
                                                                               x.data;
                                                                               return {tag: "just"
                                                                                      ,data: requestHeaderIndex()({tag: "transferEncoding"
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
                                                                       var local_597 =
                                                                       x.data;
                                                                       return test({text: rts.bytesFromAscii("content-length")
                                                                                   ,value: {tag: "contentLength"
                                                                                           ,data: {}}});
                                                                     default:
                                                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                                                    ,"316352807090bd4b8e1627c428b18ad0");
                                                                   }
                                                                 case "true":
                                                                   var local_598 = x.data;
                                                                   var x =
                                                                   _3d__3d_()({infixl: local_577
                                                                              ,infixr: rts.bytesFromAscii("user-agent")});
                                                                   switch (x.tag)
                                                                   {
                                                                     case "false":
                                                                       var local_599 =
                                                                       x.data;
                                                                       var x =
                                                                       _3d__3d_()({infixl: local_577
                                                                                  ,infixr: rts.bytesFromAscii("connection")});
                                                                       switch (x.tag)
                                                                       {
                                                                         case "false":
                                                                           var local_600 =
                                                                           x.data;
                                                                           return {tag: "nothing"
                                                                                  ,data: {}};
                                                                         case "true":
                                                                           var local_601 =
                                                                           x.data;
                                                                           return {tag: "just"
                                                                                  ,data: requestHeaderIndex()({tag: "connection"
                                                                                                              ,data: {}})};
                                                                         default:
                                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                                                        ,"0a18521fa15139803614889d5ac640f3");
                                                                       }
                                                                     case "true":
                                                                       var local_602 =
                                                                       x.data;
                                                                       return {tag: "just"
                                                                              ,data: requestHeaderIndex()({tag: "userAgent"
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
                                                               var local_603 = x.data;
                                                               return test({text: rts.bytesFromAscii("if-range")
                                                                           ,value: {tag: "ifRange"
                                                                                   ,data: {}}});
                                                             default:
                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                                            ,"0c12468dbe34d1382d0b97b93b5cab94");
                                                           }
                                                         case "true":
                                                           var local_604 = x.data;
                                                           return test({text: rts.bytesFromAscii("referer")
                                                                       ,value: {tag: "referer"
                                                                               ,data: {}}});
                                                         default:
                                                           throw rts.exceptions.LamduBug("Unhandled case"
                                                                                        ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                                        ,"13eb12f71c41a5c676528975f4cd2d8f");
                                                       }
                                                     case "true":
                                                       var local_605 = x.data;
                                                       return test({text: rts.bytesFromAscii("expect")
                                                                   ,value: {tag: "expect"
                                                                           ,data: {}}});
                                                     default:
                                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                                    ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                                    ,"a709b7964f58d9b479a336260545d465");
                                                   }
                                                 case "true":
                                                   var local_606 = x.data;
                                                   return test({text: rts.bytesFromAscii("range")
                                                               ,value: {tag: "range"
                                                                       ,data: {}}});
                                                 default:
                                                   throw rts.exceptions.LamduBug("Unhandled case"
                                                                                ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                                ,"1d20a17a150e74e964a7731e9e75cc90");
                                               }
                                             case "true":
                                               var local_607 = x.data;
                                               return test({text: rts.bytesFromAscii("host")
                                                           ,value: {tag: "host"
                                                                   ,data: {}}});
                                             default:
                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                            ,"DEF_54b6e50a63674fa9a0022a7c3b3fad5d"
                                                                            ,"b082b30c0d03c8abd35416fd055c4e65");
                                           }
                                        };
                                 });
var parseHeaders = rts.memo(function () {
                      return function (local_543) {
                             var headersArr1 = runMutArray()(_3b_()({infixl: newMutArray()
                                                                    ,infixr: function (headersArr) {
                                                                       return _3b_()({infixl: sequence__()(replicate()({count: requestHeaderIndex()({tag: "count"
                                                                                                                                                    ,data: {}})
                                                                                                                       ,item: appendMutArray()({object: headersArr
                                                                                                                                               ,value: {tag: "nothing"
                                                                                                                                                       ,data: {}}})}))
                                                                                     ,infixr: function (local_557) {
                                                                                        return _3b_()({infixl: sequence__()(map()({stream: _2e__2e_()({start: 1.0
                                                                                                                                                      ,stop: length1()(local_543)})
                                                                                                                                  ,mapping: function (i1) {
                                                                                                                                     var local_576 =
                                                                                                                                     parseHeader()(item1()({index: i1
                                                                                                                                                           ,object: local_543}));
                                                                                                                                     var mIdx =
                                                                                                                                     requestHeaderIndexFromText()(local_576.headerNameLower);
                                                                                                                                     var x =
                                                                                                                                     mIdx;
                                                                                                                                     switch (x.tag)
                                                                                                                                     {
                                                                                                                                       case "just":
                                                                                                                                         var index8 =
                                                                                                                                         x.data;
                                                                                                                                         return _3b_()({infixl: readMutArray()({index: index8
                                                                                                                                                                               ,object: headersArr})
                                                                                                                                                       ,infixr: function (mVal) {
                                                                                                                                                          var x =
                                                                                                                                                          mVal;
                                                                                                                                                          switch (x.tag)
                                                                                                                                                          {
                                                                                                                                                            case "just":
                                                                                                                                                              var local_608 =
                                                                                                                                                              x.data;
                                                                                                                                                              throw rts.exceptions.ReachedHole("Reached a hole"
                                                                                                                                                                                              ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                                                              ,"0ba4efe1ab9b937a5c4c329950c130eb");
                                                                                                                                                            case "nothing":
                                                                                                                                                              var local_609 =
                                                                                                                                                              x.data;
                                                                                                                                                              return writeMutArray()({index: index8
                                                                                                                                                                                     ,object: headersArr
                                                                                                                                                                                     ,value: {tag: "just"
                                                                                                                                                                                             ,data: local_576.__data}});
                                                                                                                                                            default:
                                                                                                                                                              throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                                           ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                                                           ,"46e58c07915691b0449b51e2c57e8c26");
                                                                                                                                                          }
                                                                                                                                                       }});
                                                                                                                                       case "nothing":
                                                                                                                                         var local_610 =
                                                                                                                                         x.data;
                                                                                                                                         return __return()({});
                                                                                                                                       default:
                                                                                                                                         throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                                      ,"DEF_8552ea85f4a64beeaf6f8d46bcc5e1d4"
                                                                                                                                                                      ,"96d7c2e4942aa324705674b28c8d8892");
                                                                                                                                     }
                                                                                                                                  }}))
                                                                                                      ,infixr: function (local_611) {
                                                                                                         return __return()(headersArr);
                                                                                                      }});
                                                                                     }});
                                                                    }}));
                             var value2 = function (hdr) {
                                return item1()({index: requestHeaderIndex()(hdr)
                                               ,object: headersArr1});
                             };
                             return {referer: value2({tag: "referer",data: {}})
                                    ,range: value2({tag: "range",data: {}})
                                    ,contentLength: value2({tag: "contentLength"
                                                           ,data: {}})
                                    ,connection: value2({tag: "connection",data: {}})
                                    ,host: value2({tag: "host",data: {}})
                                    ,userAgent: value2({tag: "userAgent",data: {}})
                                    ,ifModifiedSince: value2({tag: "ifModifiedSince"
                                                             ,data: {}})
                                    ,ifRange: value2({tag: "ifRange",data: {}})
                                    ,transferEncoding: value2({tag: "transferEncoding"
                                                              ,data: {}})
                                    ,expect: value2({tag: "expect",data: {}})
                                    ,ifUnmodifiedSince: value2({tag: "ifUnmodifiedSince"
                                                               ,data: {}})};
                          };
                   });
var parseHttpVersion = rts.memo(function () {
                          return function (local_615) {
                                 var x =
                                 _26__26_()({infixl: _3d__3d_()({infixl: slice1()({object: local_615
                                                                                  ,start: 0.0
                                                                                  ,stop: 5.0})
                                                                ,infixr: rts.bytesFromAscii("HTTP/")})
                                            ,infixr: function (local_616) {
                                               return _26__26_()({infixl: _3d__3d_()({infixl: slice1()({object: local_615
                                                                                                       ,start: 6.0
                                                                                                       ,stop: 7.0})
                                                                                     ,infixr: rts.bytesFromAscii(".")})
                                                                 ,infixr: function (local_617) {
                                                                    return _2265_()({infixl: length()(local_615)
                                                                                    ,infixr: 8.0});
                                                                 }});
                                            }});
                                 switch (x.tag)
                                 {
                                   case "false":
                                     var local_618 = x.data;
                                     throw rts.exceptions.ReachedHole("Reached a hole"
                                                                     ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                                                     ,"d4d438d8b8c3035dd13c03c182e694f8");
                                   case "true":
                                     var local_619 = x.data;
                                     var majByte = byteAt()({index: 5.0
                                                            ,object: local_615});
                                     var minByte = byteAt()({index: 7.0
                                                            ,object: local_615});
                                     var x = _3d__3d_()({infixl: majByte,infixr: 49.0});
                                     switch (x.tag)
                                     {
                                       case "false":
                                         var local_620 = x.data;
                                         var x =
                                         _26__26_()({infixl: _3d__3d_()({infixl: majByte
                                                                        ,infixr: 50.0})
                                                    ,infixr: function (local_621) {
                                                       return _3d__3d_()({infixl: minByte
                                                                         ,infixr: 48.0});
                                                    }});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_622 = x.data;
                                             return {minor: 0.0,major: 1.0};
                                           case "true":
                                             var local_623 = x.data;
                                             return {minor: 0.0,major: 2.0};
                                           default:
                                             throw rts.exceptions.LamduBug("Unhandled case"
                                                                          ,"DEF_cdde9ce31af346e5879cd20194adf297"
                                                                          ,"6d72ed51030c146e142824d8c5608502");
                                         }
                                       case "true":
                                         var local_624 = x.data;
                                         var x = _3d__3d_()({infixl: minByte
                                                            ,infixr: 49.0});
                                         switch (x.tag)
                                         {
                                           case "false":
                                             var local_625 = x.data;
                                             return {minor: 0.0,major: 1.0};
                                           case "true":
                                             var local_626 = x.data;
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
                       });
var parseHttpPathAndQuery = rts.memo(function () {
                               return function (local_627) {
                                      var x = find1()({start: 0.0
                                                      ,__bytes: local_627
                                                      ,byte: 63.0});
                                      switch (x.tag)
                                      {
                                        case "just":
                                          var queryStart = x.data;
                                          return {path: slice1()({object: local_627
                                                                 ,start: 0.0
                                                                 ,stop: queryStart})
                                                 ,query1: slice1()({object: local_627
                                                                   ,start: queryStart
                                                                   ,stop: length()(local_627)})};
                                        case "nothing":
                                          var local_628 = x.data;
                                          return {path: local_627
                                                 ,query1: rts.bytesFromAscii("")};
                                        default:
                                          throw rts.exceptions.LamduBug("Unhandled case"
                                                                       ,"DEF_e1ddf2e103fc4a77ba877761b12b0489"
                                                                       ,"7b5454e4261c24d201d9384e83ca385c");
                                      }
                                   };
                            });
var parseRequestLine = rts.memo(function () {
                          return function (local_612) {
                                 var parts3 = toArray()(split()({text: local_612
                                                                ,seperator: rts.bytesFromAscii(" ")}));
                                 var x = _3d__3d_()({infixl: length1()(parts3)
                                                    ,infixr: 3.0});
                                 switch (x.tag)
                                 {
                                   case "false":
                                     var local_613 = x.data;
                                     throw rts.exceptions.ReachedHole("Reached a hole"
                                                                     ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                                                     ,"a7de8d96fb5e1479e6bb2a3ddb6eeaaa");
                                   case "true":
                                     var local_614 = x.data;
                                     var x =
                                     Object.assign({httpVersion: parseHttpVersion()(item1()({index: 2.0
                                                                                            ,object: parts3}))
                                                   ,method: item1()({index: 0.0
                                                                    ,object: parts3})}
                                                  ,parseHttpPathAndQuery()(item1()({index: 1.0
                                                                                   ,object: parts3})));
                                     delete x.cacheId;
                                     return x;
                                   default:
                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                  ,"DEF_28113fa9b1e04cb29f6f52fbde130f67"
                                                                  ,"1a29dea7dd98168ceba76256560b374b");
                                 }
                              };
                       });
var unprefixed = rts.memo(function () {
                    return function (local_635) {
                           var x = isPrefixOf()({whole: local_635.whole
                                                ,prefix: local_635.prefix});
                           switch (x.tag)
                           {
                             case "false":
                               var local_636 = x.data;
                               return {tag: "nothing",data: {}};
                             case "true":
                               var local_637 = x.data;
                               return {tag: "just"
                                      ,data: slice1()({object: local_635.whole
                                                      ,start: length()(local_635.prefix)
                                                      ,stop: length()(local_635.whole)})};
                             default:
                               throw rts.exceptions.LamduBug("Unhandled case"
                                                            ,"DEF_1d18b3f94ac64cc39b8dc131624a5e9f"
                                                            ,"2de3ba5a8affabb154216378ec3580e6");
                           }
                        };
                 });
var httpAddLocalPath = rts.memo(function () {
                          return function (r) {
                                 var p = r.path;
                                 var nonEmpty1 = function (local_629) {
                                    var x = _3d__3d_()({infixl: local_629
                                                       ,infixr: rts.bytesFromAscii("")});
                                    switch (x.tag)
                                    {
                                      case "false":
                                        var local_630 = x.data;
                                        return local_629;
                                      case "true":
                                        var local_631 = x.data;
                                        return rts.bytesFromAscii("/");
                                      default:
                                        throw rts.exceptions.LamduBug("Unhandled case"
                                                                     ,"DEF_97b5de980c3149218877e33920fb5729"
                                                                     ,"5ae9e78cf85c5d6952c38eb479596553");
                                    }
                                 };
                                 var afterSlash = function (local_632) {
                                    return nonEmpty1(function () {
                                           var x = find1()({start: 0.0
                                                           ,__bytes: local_632
                                                           ,byte: 47.0});
                                           switch (x.tag)
                                           {
                                             case "just":
                                               var local_633 = x.data;
                                               return slice1()({object: local_632
                                                               ,start: local_633
                                                               ,stop: length()(local_632)});
                                             case "nothing":
                                               var local_634 = x.data;
                                               return rts.bytesFromAscii("");
                                             default:
                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                            ,"DEF_97b5de980c3149218877e33920fb5729"
                                                                            ,"8d9250a6123ff265d7652592a88c96a8");
                                           }
                                        }());
                                 };
                                 var x = Object.assign({localPath: function () {
                                                         var x = unprefixed()({whole: p
                                                                              ,prefix: rts.bytesFromAscii("http://")});
                                                         switch (x.tag)
                                                         {
                                                           case "just":
                                                             return afterSlash(x.data);
                                                           case "nothing":
                                                             var local_638 = x.data;
                                                             var x =
                                                             unprefixed()({whole: p
                                                                          ,prefix: rts.bytesFromAscii("https://")});
                                                             switch (x.tag)
                                                             {
                                                               case "just":
                                                                 return afterSlash(x.data);
                                                               case "nothing":
                                                                 var local_639 = x.data;
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
                       });
var httpContinueMessage = rts.memo(function () {
                             return function (local_642) {
                                    return concat2()(_3a__3a_()({infixl: function () {
                                                                   var x =
                                                                   _3d__3d_()({infixl: local_642
                                                                              ,infixr: {minor: 1.0
                                                                                       ,major: 1.0}});
                                                                   switch (x.tag)
                                                                   {
                                                                     case "false":
                                                                       var local_643 =
                                                                       x.data;
                                                                       return rts.bytesFromAscii("HTTP/1.0");
                                                                     case "true":
                                                                       var local_644 =
                                                                       x.data;
                                                                       return rts.bytesFromAscii("HTTP/1.1");
                                                                     default:
                                                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                    ,"DEF_28b20b49b76041158f817cb6f1ae7069"
                                                                                                    ,"7a33dc1474f28318b0a1a21410017295");
                                                                   }
                                                                }()
                                                                ,infixr: function (local_645) {
                                                                   return _3a__3a_()({infixl: rts.bytesFromAscii(" 100 Continue")
                                                                                     ,infixr: function (local_646) {
                                                                                        return _3a__3a_()({infixl: rts.bytes([13
                                                                                                                             ,10
                                                                                                                             ,13
                                                                                                                             ,10])
                                                                                                          ,infixr: function (local_647) {
                                                                                                             return {tag: "empty"
                                                                                                                    ,data: {}};
                                                                                                          }});
                                                                                     }});
                                                                }}));
                                 };
                          });
var parseHttpRequestPacket = rts.memo(function () {
                                return function (local_482) {
                                       var parseRemain =
                                       _3b_()({infixl: popLastMutArray()(local_482.unparsedPackets1)
                                              ,infixr: function (local_486) {
                                                 var x = local_486;
                                                 switch (x.tag)
                                                 {
                                                   case "just":
                                                     var local_487 = x.data;
                                                     return parseHttpRequestPacket()({socket: local_482.socket
                                                                                     ,unparsedPackets1: local_482.unparsedPackets1
                                                                                     ,newPacket: local_487
                                                                                     ,stateRef1: local_482.stateRef1
                                                                                     ,handler: local_482.handler});
                                                   case "nothing":
                                                     var local_488 = x.data;
                                                     return __return()({});
                                                   default:
                                                     throw rts.exceptions.LamduBug("Unhandled case"
                                                                                  ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                  ,"a71ca59bb3302212a2d667ac7d89c4e8");
                                                 }
                                              }});
                                       return _3b_()({infixl: readMutRef()(local_482.stateRef1)
                                                     ,infixr: function (x489) {
                                                        switch (x489.tag)
                                                        {
                                                          case "body":
                                                            var local_490 = x489.data;
                                                            var plen =
                                                            length()(local_482.newPacket);
                                                            var x = _3c_()({infixl: plen
                                                                           ,infixr: local_490.remain});
                                                            switch (x.tag)
                                                            {
                                                              case "false":
                                                                var local_491 = x.data;
                                                                return _3b_()({infixl: length4()(local_482.unparsedPackets1)
                                                                              ,infixr: function (numPackets) {
                                                                                 return _3b_()({infixl: sequence()(map()({stream: _2e__2e_()({start: 0.0
                                                                                                                                             ,stop: numPackets})
                                                                                                                         ,mapping: function (local_492) {
                                                                                                                            return readMutArray()({index: local_492
                                                                                                                                                  ,object: local_482.unparsedPackets1});
                                                                                                                         }}))
                                                                                               ,infixr: function (packets) {
                                                                                                  return _3b_()({infixl: _3b_()({infixl: truncateMutArray()({object: local_482.unparsedPackets1
                                                                                                                                                            ,stop: 0.0})
                                                                                                                                ,infixr: function (local_498) {
                                                                                                                                   return local_482.handler({request1: function () {
                                                                                                                                                               var x =
                                                                                                                                                               Object.assign({body: {tag: "just"
                                                                                                                                                                                    ,data: concat2()(_2b__2b_2()({infixl: packets
                                                                                                                                                                                                                 ,infixr: function (local_499) {
                                                                                                                                                                                                                    return _3a__3a_()({infixl: slice1()({object: local_482.newPacket
                                                                                                                                                                                                                                                        ,start: 0.0
                                                                                                                                                                                                                                                        ,stop: local_490.remain})
                                                                                                                                                                                                                                      ,infixr: function (local_500) {
                                                                                                                                                                                                                                         return {tag: "empty"
                                                                                                                                                                                                                                                ,data: {}};
                                                                                                                                                                                                                                      }});
                                                                                                                                                                                                                 }}))}}
                                                                                                                                                                            ,local_490.request1);
                                                                                                                                                               delete x.cacheId;
                                                                                                                                                               return x;
                                                                                                                                                            }()
                                                                                                                                                            ,socket: local_482.socket});
                                                                                                                                }})
                                                                                                                ,infixr: function (local_501) {
                                                                                                                   return _3b_()({infixl: writeMutRef()({object: local_482.stateRef1
                                                                                                                                                        ,value: {tag: "header"
                                                                                                                                                                ,data: {}}})
                                                                                                                                 ,infixr: function (local_502) {
                                                                                                                                    var x =
                                                                                                                                    _3c_()({infixl: local_490.remain
                                                                                                                                           ,infixr: plen});
                                                                                                                                    switch (x.tag)
                                                                                                                                    {
                                                                                                                                      case "false":
                                                                                                                                        var local_503 =
                                                                                                                                        x.data;
                                                                                                                                        return __return()({});
                                                                                                                                      case "true":
                                                                                                                                        var local_504 =
                                                                                                                                        x.data;
                                                                                                                                        return parseHttpRequestPacket()({socket: local_482.socket
                                                                                                                                                                        ,unparsedPackets1: local_482.unparsedPackets1
                                                                                                                                                                        ,newPacket: slice1()({object: local_482.newPacket
                                                                                                                                                                                             ,start: local_490.remain
                                                                                                                                                                                             ,stop: plen})
                                                                                                                                                                        ,stateRef1: local_482.stateRef1
                                                                                                                                                                        ,handler: local_482.handler});
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
                                                                var local_505 = x.data;
                                                                return _3b_()({infixl: appendMutArray()({object: local_482.unparsedPackets1
                                                                                                        ,value: local_482.newPacket})
                                                                              ,infixr: function (local_506) {
                                                                                 return writeMutRef()({object: local_482.stateRef1
                                                                                                      ,value: {tag: "body"
                                                                                                              ,data: {request1: local_490.request1
                                                                                                                     ,remain: _2d_()({infixl: local_490.remain
                                                                                                                                     ,infixr: plen})}}});
                                                                              }});
                                                              default:
                                                                throw rts.exceptions.LamduBug("Unhandled case"
                                                                                             ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                             ,"4a7857b1e6dc15eee111f928eef30ceb");
                                                            }
                                                          case "header":
                                                            var local_507 = x489.data;
                                                            return _3b_()({infixl: parseHttpHeaderPacket()({start: 0.0
                                                                                                           ,newPacket: local_482.newPacket
                                                                                                           ,packets1: local_482.unparsedPackets1})
                                                                          ,infixr: function (local_542) {
                                                                             var x =
                                                                             local_542;
                                                                             switch (x.tag)
                                                                             {
                                                                               case "just":
                                                                                 var headerLines1 =
                                                                                 x.data;
                                                                                 var request2 =
                                                                                 function () {
                                                                                    var x =
                                                                                    Object.assign({headers: parseHeaders()(headerLines1)}
                                                                                                 ,httpAddLocalPath()(parseRequestLine()(item1()({index: 0.0
                                                                                                                                                ,object: headerLines1}))));
                                                                                    delete x.cacheId;
                                                                                    return x;
                                                                                 }();
                                                                                 return _3b_()({infixl: function () {
                                                                                                  var x =
                                                                                                  _3d__3d_()({infixl: request2.headers.expect
                                                                                                             ,infixr: {tag: "just"
                                                                                                                      ,data: rts.bytesFromAscii("100-continue")}});
                                                                                                  switch (x.tag)
                                                                                                  {
                                                                                                    case "false":
                                                                                                      var local_640 =
                                                                                                      x.data;
                                                                                                      return __return()({});
                                                                                                    case "true":
                                                                                                      var local_641 =
                                                                                                      x.data;
                                                                                                      return send()({__data: httpContinueMessage()(request2.httpVersion)
                                                                                                                    ,socket: local_482.socket});
                                                                                                    default:
                                                                                                      throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                   ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                                                   ,"0010e59778d59572282a2dab5b43c99f");
                                                                                                  }
                                                                                               }()
                                                                                               ,infixr: function (local_648) {
                                                                                                  return _3b_()({infixl: function () {
                                                                                                                   var x =
                                                                                                                   request2.headers.contentLength;
                                                                                                                   switch (x.tag)
                                                                                                                   {
                                                                                                                     case "just":
                                                                                                                       var lenText =
                                                                                                                       x.data;
                                                                                                                       return writeMutRef()({object: local_482.stateRef1
                                                                                                                                            ,value: {tag: "body"
                                                                                                                                                    ,data: {request1: request2
                                                                                                                                                           ,remain: parseInt()(lenText)}}});
                                                                                                                     case "nothing":
                                                                                                                       var local_649 =
                                                                                                                       x.data;
                                                                                                                       return local_482.handler({request1: function () {
                                                                                                                                                   var x =
                                                                                                                                                   Object.assign({body: {tag: "nothing"
                                                                                                                                                                        ,data: {}}}
                                                                                                                                                                ,request2);
                                                                                                                                                   delete x.cacheId;
                                                                                                                                                   return x;
                                                                                                                                                }()
                                                                                                                                                ,socket: local_482.socket});
                                                                                                                     default:
                                                                                                                       throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                                                                    ,"DEF_fb176ed99ba34f26a6d61d63751a555d"
                                                                                                                                                    ,"c91c5cea0890a94419165f2c0e413659");
                                                                                                                   }
                                                                                                                }()
                                                                                                                ,infixr: function (local_650) {
                                                                                                                   return parseRemain;
                                                                                                                }});
                                                                                               }});
                                                                               case "nothing":
                                                                                 var local_651 =
                                                                                 x.data;
                                                                                 return __return()({});
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
                             });
var parseHttpRequests = rts.memo(function () {
                           return function (local_481) {
                                  return _3b_()({infixl: newMutRef()({tag: "header"
                                                                     ,data: {}})
                                                ,infixr: function (stateRef) {
                                                   return _3b_()({infixl: newMutArray()
                                                                 ,infixr: function (unparsedPackets) {
                                                                    return __return()(function (packet) {
                                                                           return parseHttpRequestPacket()({socket: local_481.socket
                                                                                                           ,unparsedPackets1: unparsedPackets
                                                                                                           ,newPacket: packet
                                                                                                           ,stateRef1: stateRef
                                                                                                           ,handler: local_481.handler});
                                                                        });
                                                                 }});
                                                }});
                               };
                        });
var openTcpServer = rts.memo(function () {
                       return rts.builtins.IO.network["openTcpServer"];
                    });
var httpServer = rts.memo(function () {
                    return function (local_471) {
                           return openTcpServer()({connectionHandler: function (socket) {
                                                     return parseHttpRequests()({socket: socket
                                                                                ,handler: function (local_472) {
                                                                                   return _3b_()({infixl: local_471.handler(local_472.request1)
                                                                                                 ,infixr: function (response) {
                                                                                                    return send()({__data: _2b__2b_1()({a: join()({texts: _3a__3a_()({infixl: join()({texts: _3a__3a_()({infixl: rts.bytesFromAscii("HTTP/1.1")
                                                                                                                                                                                                        ,infixr: function (local_473) {
                                                                                                                                                                                                           return _3a__3a_()({infixl: showNum()(response.status.code)
                                                                                                                                                                                                                             ,infixr: function (local_474) {
                                                                                                                                                                                                                                return _3a__3a_()({infixl: response.status.message
                                                                                                                                                                                                                                                  ,infixr: function (local_475) {
                                                                                                                                                                                                                                                     return {tag: "empty"
                                                                                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                                                                                  }});
                                                                                                                                                                                                                             }});
                                                                                                                                                                                                        }})
                                                                                                                                                                                     ,seperator: rts.bytesFromAscii(" ")})
                                                                                                                                                                     ,infixr: function (local_476) {
                                                                                                                                                                        return _3a__3a_()({infixl: _2b__2b_()({a: rts.bytesFromAscii("Content-Type: ")
                                                                                                                                                                                                              ,b: response.content.mimeType})
                                                                                                                                                                                          ,infixr: function (local_477) {
                                                                                                                                                                                             return _3a__3a_()({infixl: _2b__2b_()({a: rts.bytesFromAscii("Content-Length: ")
                                                                                                                                                                                                                                   ,b: showNum()(length()(response.content.__data))})
                                                                                                                                                                                                               ,infixr: function (local_478) {
                                                                                                                                                                                                                  return _3a__3a_()({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                                                                    ,infixr: function (local_479) {
                                                                                                                                                                                                                                       return _3a__3a_()({infixl: rts.bytesFromAscii("")
                                                                                                                                                                                                                                                         ,infixr: function (local_480) {
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
                                                  ,host: local_471.host
                                                  ,port: local_471.port});
                        };
                 });
var pestoval = rts.memo(function () {
                  return _3b_()({infixl: pestovalDb()
                                ,infixr: function (database1) {
                                   return _3b_()({infixl: environment()(rts.bytesFromAscii("PORT"))
                                                 ,infixr: function (port1) {
                                                    return httpServer()({host: rts.bytesFromAscii("0.0.0.0")
                                                                        ,port: function () {
                                                                           var x = port1;
                                                                           switch (x.tag)
                                                                           {
                                                                             case "just":
                                                                               var local_65 =
                                                                               x.data;
                                                                               return parseInt()(local_65);
                                                                             case "nothing":
                                                                               var local_66 =
                                                                               x.data;
                                                                               return 5000.0;
                                                                             default:
                                                                               throw rts.exceptions.LamduBug("Unhandled case"
                                                                                                            ,"DEF_03805ab8c62443a3b30436fe169288a2"
                                                                                                            ,"3c935b9a695b9f760ec99c27b590c3d2");
                                                                           }
                                                                        }()
                                                                        ,handler: function (request) {
                                                                           return pestovalHandler()({request1: request
                                                                                                    ,database: database1});
                                                                        }});
                                                 }});
                                }});
               });
try {
   var repl = pestoval();
   rts.logRepl(repl);
} catch (err) {
   rts.logReplErr(err);
} 
(function () {
        module.exports = repl;
     }());
