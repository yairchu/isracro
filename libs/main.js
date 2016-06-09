"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("./rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var _23_ = function (local_12) {
           return {tag: "NonEmpty",data: {head: local_12.h,tail: local_12.t}};
        };
var _3d__3d_ = rts.builtins.Prelude["=="];
var foldLazy = function (local_23) {
           var x = local_23.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_24 = x.data;
               return local_23.binop({rest: function (local_25) {
                                        var dummy = _3d__3d_({infixl: local_25
                                                             ,infixr: {}});
                                        return foldLazy({stream: local_24.tail({})
                                                        ,initial: local_23.initial
                                                        ,binop: local_23.binop});
                                     }
                                     ,item: local_24.head});
             case "Empty":
               return local_23.initial(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var map = function (local_20) {
           return foldLazy({stream: local_20.stream
                           ,initial: function (local_21) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_22) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_20.mapping(local_22.item)
                                            ,tail: local_22.rest}};
                           }});
        };
var _2b__2b_ = function (local_28) {
           return foldLazy({stream: local_28.l
                           ,initial: local_28.r
                           ,binop: function (local_29) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_29.item,tail: local_29.rest}};
                           }});
        };
var concat = function (stream1) {
           return foldLazy({stream: stream1
                           ,initial: function (local_26) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_27) {
                              return _2b__2b_({l: local_27.item,r: local_27.rest});
                           }});
        };
var intersperse = function (local_14) {
           var x = local_14.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_15 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_15.head
                             ,tail: function (local_16) {
                                return concat(map({stream: local_15.tail({})
                                                  ,mapping: function (local_17) {
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: local_14.item
                                                                   ,tail: function (local_18) {
                                                                      return {tag: "NonEmpty"
                                                                             ,data: {head: local_17
                                                                                    ,tail: function (local_19) {
                                                                                       return {tag: "Empty"
                                                                                              ,data: {}};
                                                                                    }}};
                                                                   }}};
                                                  }}));
                             }}};
             case "Empty":
               var local_30 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var length = rts.builtins.Bytes["length"];
var _3e__3d_ = rts.builtins.Prelude[">="];
var _2b_ = rts.builtins.Prelude["+"];
var _2e__2e_1 = function (local_34) {
           var x = _3e__3d_({infixl: local_34.start,infixr: local_34.stop});
           switch (x.tag)
           {
             case "False":
               var local_35 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_34.start
                             ,tail: function (local_36) {
                                return _2e__2e_1({step: local_34.step
                                                 ,start: _2b_({infixl: local_34.start
                                                              ,infixr: local_34.step})
                                                 ,stop: local_34.stop});
                             }}};
             case "True":
               var local_37 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2e__2e_ = function (local_33) {
           return _2e__2e_1({step: 1.0,start: local_33.start,stop: local_33.stop});
        };
var byteAt = rts.builtins.Bytes["byteAt"];
var fromBytes = function (__bytes) {
           var len = length(__bytes);
           return map({stream: _2e__2e_({start: 0.0,stop: len})
                      ,mapping: function (local_38) {
                         return byteAt({index: local_38,object: __bytes});
                      }});
        };
var toBytes = rts.builtins.Bytes["fromStream"];
var concat2 = function (stream3) {
           return toBytes(concat(map({stream: stream3
                                     ,mapping: function (local_32) {
                                        return fromBytes(local_32);
                                     }})));
        };
var concat1 = function (stream2) {
           return concat2(map({stream: stream2
                              ,mapping: function (local_31) {
                                 return local_31;
                              }}));
        };
var join = function (local_13) {
           return concat1(intersperse({stream: local_13.texts,item: local_13.sep}));
        };
var toArray = rts.builtins.Array["fromStream"];
var htmlTextNode = function (local_40) {
           return {root: local_40,subTrees: toArray({tag: "Empty",data: {}})};
        };
var arraySingle = function (__x) {
           return toArray({tag: "NonEmpty"
                          ,data: {head: __x
                                 ,tail: function (local_41) {
                                    return {tag: "Empty",data: {}};
                                 }}});
        };
var slice1 = rts.builtins.Bytes["slice"];
var _2d_ = rts.builtins.Prelude["-"];
var first = function (local_48) {
           var x = local_48.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_49 = x.data;
               var x = local_48.that(local_49.head);
               switch (x.tag)
               {
                 case "False":
                   var local_50 = x.data;
                   return first({that: local_48.that,stream: local_49.tail({})});
                 case "True":
                   var local_51 = x.data;
                   return {tag: "Just",data: local_49.head};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_52 = x.data;
               return {tag: "Nothing",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var find = function (local_46) {
           var subLen = length(local_46.slice);
           return first({that: function (local_47) {
                           return _3d__3d_({infixl: slice1({object: local_46.__bytes1
                                                           ,start: local_47
                                                           ,stop: _2b_({infixl: local_47
                                                                       ,infixr: subLen})})
                                           ,infixr: local_46.slice});
                        }
                        ,stream: _2e__2e_({start: 0.0
                                          ,stop: _2d_({infixl: length(local_46.__bytes1)
                                                      ,infixr: subLen})})});
        };
var split = function (local_45) {
           var x = find({__bytes1: local_45.text1,slice: local_45.seperator});
           switch (x.tag)
           {
             case "Just":
               var sepIndex = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: slice1({object: local_45.text1
                                           ,start: 0.0
                                           ,stop: sepIndex})
                             ,tail: function (local_53) {
                                return split({text1: slice1({object: local_45.text1
                                                            ,start: _2b_({infixl: sepIndex
                                                                         ,infixr: length(local_45.seperator)})
                                                            ,stop: length(local_45.text1)})
                                             ,seperator: local_45.seperator});
                             }}};
             case "Nothing":
               var local_54 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_45.text1
                             ,tail: function (local_55) {
                                return {tag: "Empty",data: {}};
                             }}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var replace = function (local_44) {
           return join({texts: split({text1: local_44.text,seperator: local_44.from})
                       ,sep: local_44.to});
        };
var classCellItems = function (local_39) {
           return toArray(_23_({h: {root: rts.bytesFromAscii("<b>")
                                   ,subTrees: arraySingle(htmlTextNode(local_39.getLang1(local_39.info1.who)))}
                               ,t: function (local_42) {
                                  return _23_({h: {root: rts.bytesFromAscii("<br>")
                                                  ,subTrees: toArray({tag: "Empty"
                                                                     ,data: {}})}
                                              ,t: function (local_43) {
                                                 return _23_({h: htmlTextNode(replace({text: local_39.getLang1(local_39.info1.what)
                                                                                      ,from: rts.bytes([194
                                                                                                       ,160])
                                                                                      ,to: rts.bytesFromAscii("")}))
                                                             ,t: function (local_56) {
                                                                return {tag: "Empty"
                                                                       ,data: {}};
                                                             }});
                                              }});
                               }}));
        };
var length1 = rts.builtins.Array["length"];
var item1 = rts.builtins.Array["item"];
var fromArray = function (__array) {
           var len1 = length1(__array);
           return map({stream: _2e__2e_({start: 0.0,stop: len1})
                      ,mapping: function (local_57) {
                         return item1({index: local_57,object: __array});
                      }});
        };
var startsWith = function (local_59) {
           return _3d__3d_({infixl: slice1({object: local_59.text1
                                           ,start: 0.0
                                           ,stop: length(local_59.prefix)})
                           ,infixr: local_59.prefix});
        };
var filter = function (local_60) {
           var x = local_60.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_61 = x.data;
               var rest1 = function (local_62) {
                          return filter({stream: local_61.tail({}),keep: local_60.keep});
                       };
               var x = local_60.keep(local_61.head);
               switch (x.tag)
               {
                 case "False":
                   var local_63 = x.data;
                   return rest1({});
                 case "True":
                   var local_64 = x.data;
                   return {tag: "NonEmpty",data: {head: local_61.head,tail: rest1}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_65 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var iacPlacesOrder =
        toArray(split({text1: rts.bytesFromAscii("Stage,Rugs (middle room),Parquet (back room),Dome,I Bike,Zoola,Chicken space,Ardon")
                      ,seperator: rts.bytesFromAscii(",")}));
var id = function (__x1) { return __x1;};
var _3c_ = rts.builtins.Prelude["<"];
var fold = function (local_80) {
           var x = local_80.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_81 = x.data;
               return fold({stream: local_81.tail({})
                           ,initial: local_80.binop({acc: local_80.initial
                                                    ,item: local_81.head})
                           ,binop: local_80.binop});
             case "Empty":
               var local_82 = x.data;
               return local_80.initial;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var reverse = function (stream7) {
           return toArray(fold({stream: stream7
                               ,initial: {tag: "Empty",data: {}}
                               ,binop: function (local_84) {
                                  return _23_({h: local_84.item
                                              ,t: function (local_85) {
                                                 return local_84.acc;
                                              }});
                               }}));
        };
var partition = function (local_74) {
           var local_83 = fold({stream: local_74.stream
                               ,initial: {False: {tag: "Empty",data: {}}
                                         ,True: {tag: "Empty",data: {}}}
                               ,binop: function (local_75) {
                                  var x = local_74.by(local_75.item);
                                  switch (x.tag)
                                  {
                                    case "False":
                                      var local_76 = x.data;
                                      return {False: _23_({h: local_75.item
                                                          ,t: function (local_77) {
                                                             return local_75.acc.False;
                                                          }})
                                             ,True: local_75.acc.True};
                                    case "True":
                                      var local_78 = x.data;
                                      return {False: local_75.acc.False
                                             ,True: _23_({h: local_75.item
                                                         ,t: function (local_79) {
                                                            return local_75.acc.True;
                                                         }})};
                                    default:
                                      throw "Unhandled case? This is a type error!";
                                  }
                               }});
           return {False: reverse(local_83.False),True: reverse(local_83.True)};
        };
var sortOn = function (local_70) {
           var x = local_70.stream6;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_71 = x.data;
               var local_72 = local_70.on(local_71.head);
               var parts = partition({stream: local_71.tail({})
                                     ,by: function (local_73) {
                                        return _3c_({infixl: local_70.on(local_73)
                                                    ,infixr: local_72});
                                     }});
               return _2b__2b_({l: sortOn({stream6: fromArray(parts.True)
                                          ,on: local_70.on})
                               ,r: function (local_86) {
                                  return _23_({h: local_71.head
                                              ,t: function (local_87) {
                                                 return sortOn({stream6: fromArray(parts.False)
                                                               ,on: local_70.on});
                                              }});
                               }});
             case "Empty":
               var local_88 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var sort = function (stream5) { return sortOn({stream6: stream5,on: id});};
var uniques = function (stream4) {
           var x = sort(stream4);
           switch (x.tag)
           {
             case "NonEmpty":
               var local_89 = x.data;
               return foldLazy({stream: local_89.tail({})
                               ,initial: function (local_90) {
                                  return function (local_91) {
                                         return _23_({h: local_91
                                                     ,t: function (local_92) {
                                                        return {tag: "Empty",data: {}};
                                                     }});
                                      };
                               }
                               ,binop: function (local_93) {
                                  return function (prev) {
                                         var local_95 = function (local_94) {
                                                    return local_93.rest({})(local_93.item);
                                                 };
                                         var x = _3d__3d_({infixl: prev
                                                          ,infixr: local_93.item});
                                         switch (x.tag)
                                         {
                                           case "False":
                                             var local_96 = x.data;
                                             return _23_({h: prev,t: local_95});
                                           case "True":
                                             return local_95(x.data);
                                           default:
                                             throw "Unhandled case? This is a type error!";
                                         }
                                      };
                               }})(local_89.head);
             case "Empty":
               var local_97 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2a_ = rts.builtins.Prelude["*"];
var parsePosInt = function (text2) {
           return fold({stream: fromBytes(text2)
                       ,initial: 0.0
                       ,binop: function (local_99) {
                          return _2b_({infixl: _2a_({infixl: local_99.acc,infixr: 10.0})
                                      ,infixr: _2d_({infixl: local_99.item
                                                    ,infixr: 48.0})});
                       }});
        };
var iacTimeOfDayOrder = function (local_98) {
           return parsePosInt(item1({index: 0.0
                                    ,object: toArray(split({text1: item1({index: 1.0
                                                                         ,object: toArray(split({text1: local_98
                                                                                                ,seperator: rts.bytesFromAscii(" ")}))})
                                                           ,seperator: rts.bytesFromAscii(":")}))}));
        };
var iacTablesCss = {root: rts.bytesFromAscii("<style>")
                   ,subTrees: arraySingle(htmlTextNode(rts.bytesFromAscii("th, td {\n    border: 1px solid black;\n}\n")))};
var iacTablesHtmlHead = function (title) {
           return {root: rts.bytesFromAscii("<head>")
                  ,subTrees: toArray(_23_({h: {root: rts.bytesFromAscii("<meta charset=\"UTF-8\" />")
                                              ,subTrees: toArray({tag: "Empty",data: {}})}
                                          ,t: function (local_106) {
                                             return _23_({h: {root: rts.bytesFromAscii("<title>")
                                                             ,subTrees: arraySingle(htmlTextNode(title))}
                                                         ,t: function (local_107) {
                                                            return _23_({h: iacTablesCss
                                                                        ,t: function (local_108) {
                                                                           return {tag: "Empty"
                                                                                  ,data: {}};
                                                                        }});
                                                         }});
                                          }}))};
        };
var iacDaysOrder =
        toArray(split({text1: rts.bytesFromAscii("Thursday,Friday,Saturday,Sunday")
                      ,seperator: rts.bytesFromAscii(",")}));
var overviewTable = function (local_3) {
           var classCell = function (local_4) {
                      return {root: join({texts: _23_({h: rts.bytesFromAscii("<td style=\"background-color:")
                                                      ,t: function (local_5) {
                                                         return _23_({h: local_4.color
                                                                     ,t: function (local_6) {
                                                                        return _23_({h: rts.bytesFromAscii("\" id=\"")
                                                                                    ,t: function (local_7) {
                                                                                       return _23_({h: local_4.when
                                                                                                   ,t: function (local_8) {
                                                                                                      return _23_({h: rts.bytesFromAscii("_")
                                                                                                                  ,t: function (local_9) {
                                                                                                                     return _23_({h: local_4.who.eng
                                                                                                                                 ,t: function (local_10) {
                                                                                                                                    return _23_({h: rts.bytesFromAscii("\">")
                                                                                                                                                ,t: function (local_11) {
                                                                                                                                                   return {tag: "Empty"
                                                                                                                                                          ,data: {}};
                                                                                                                                                }});
                                                                                                                                 }});
                                                                                                                  }});
                                                                                                   }});
                                                                                    }});
                                                                     }});
                                                      }})
                                         ,sep: rts.bytesFromAscii("")})
                             ,subTrees: classCellItems({getLang1: local_3.getLang
                                                       ,info1: local_4})};
                   };
           var perDay = function (day) {
                      var onDay = toArray(filter({stream: fromArray(local_3.info)
                                                 ,keep: function (local_58) {
                                                    return startsWith({prefix: day
                                                                      ,text1: local_58.when});
                                                 }}));
                      var topTh =
                              rts.bytesFromAscii("<th style=\"border-top: 3px solid black\">");
                      return _23_({h: {root: rts.bytesFromAscii("<tr>")
                                      ,subTrees: toArray(_23_({h: {root: topTh
                                                                  ,subTrees: arraySingle(htmlTextNode(rts.bytesFromAscii("When")))}
                                                              ,t: function (local_66) {
                                                                 return map({stream: fromArray(iacPlacesOrder)
                                                                            ,mapping: function (local_67) {
                                                                               return {root: topTh
                                                                                      ,subTrees: arraySingle(htmlTextNode(local_67))};
                                                                            }});
                                                              }}))}
                                  ,t: function (local_68) {
                                     return map({stream: fromArray(toArray(sortOn({stream6: uniques(map({stream: fromArray(onDay)
                                                                                                        ,mapping: function (local_69) {
                                                                                                           return local_69.when;
                                                                                                        }}))
                                                                                  ,on: iacTimeOfDayOrder})))
                                                ,mapping: function (local_100) {
                                                   var atThisTime =
                                                           toArray(filter({stream: fromArray(onDay)
                                                                          ,keep: function (local_101) {
                                                                             return _3d__3d_({infixl: local_101.when
                                                                                             ,infixr: local_100});
                                                                          }}));
                                                   return {root: rts.bytesFromAscii("<tr>")
                                                          ,subTrees: toArray(_23_({h: {root: rts.bytesFromAscii("<th>")
                                                                                      ,subTrees: arraySingle(htmlTextNode(local_100))}
                                                                                  ,t: function (local_102) {
                                                                                     return map({stream: fromArray(iacPlacesOrder)
                                                                                                ,mapping: function (place) {
                                                                                                   var x =
                                                                                                           filter({stream: fromArray(atThisTime)
                                                                                                                  ,keep: function (local_103) {
                                                                                                                     return _3d__3d_({infixl: local_103.where
                                                                                                                                     ,infixr: place});
                                                                                                                  }});
                                                                                                   switch (x.tag)
                                                                                                   {
                                                                                                     case "NonEmpty":
                                                                                                       var local_104 =
                                                                                                               x.data;
                                                                                                       return classCell(local_104.head);
                                                                                                     case "Empty":
                                                                                                       var local_105 =
                                                                                                               x.data;
                                                                                                       return {root: rts.bytesFromAscii("<td>")
                                                                                                              ,subTrees: arraySingle(htmlTextNode(rts.bytesFromAscii("-")))};
                                                                                                     default:
                                                                                                       throw "Unhandled case? This is a type error!";
                                                                                                   }
                                                                                                }});
                                                                                  }}))};
                                                }});
                                  }});
                   };
           return {root: rts.bytesFromAscii("<html>")
                  ,subTrees: toArray(_23_({h: iacTablesHtmlHead(rts.bytesFromAscii("IAC 2016 schedule overview"))
                                          ,t: function (local_109) {
                                             return _23_({h: {root: rts.bytesFromAscii("<body>")
                                                             ,subTrees: arraySingle({root: rts.bytesFromAscii("<table cellspacing=\"0\">")
                                                                                    ,subTrees: arraySingle({root: rts.bytesFromAscii("<tbody>")
                                                                                                           ,subTrees: toArray(concat(map({stream: fromArray(iacDaysOrder)
                                                                                                                                         ,mapping: perDay})))})})}
                                                         ,t: function (local_110) {
                                                            return {tag: "Empty"
                                                                   ,data: {}};
                                                         }});
                                          }}))};
        };
var _2f__3d_ = rts.builtins.Prelude["/="];
var not = function (local_115) {
           var x = local_115;
           switch (x.tag)
           {
             case "False":
               var local_116 = x.data;
               return {tag: "True",data: {}};
             case "True":
               var local_117 = x.data;
               return {tag: "False",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var drop = function (local_119) {
           return slice1({object: local_119.__bytes1
                         ,start: local_119.count
                         ,stop: length(local_119.__bytes1)});
        };
var _26__26_ = function (local_120) {
           var x = local_120.l;
           switch (x.tag)
           {
             case "False":
               var local_121 = x.data;
               return {tag: "False",data: {}};
             case "True":
               return local_120.r(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _7c__7c_ = function (local_131) {
           var x = local_131.l;
           switch (x.tag)
           {
             case "False":
               return local_131.r(x.data);
             case "True":
               var local_132 = x.data;
               return {tag: "True",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var anyOf = function (local_128) {
           return foldLazy({stream: local_128.stream
                           ,initial: function (local_129) {
                              return {tag: "False",data: {}};
                           }
                           ,binop: function (local_130) {
                              return _7c__7c_({l: local_128.satisfy(local_130.item)
                                              ,r: local_130.rest});
                           }});
        };
var contains = function (local_126) {
           return anyOf({stream: local_126.stream
                        ,satisfy: function (local_127) {
                           return _3d__3d_({infixl: local_127,infixr: local_126.item});
                        }});
        };
var take = function (local_133) {
           var x = local_133.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_134 = x.data;
               var x = local_133.__while(local_134.head);
               switch (x.tag)
               {
                 case "False":
                   var local_135 = x.data;
                   return {tag: "Empty",data: {}};
                 case "True":
                   var local_136 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_134.head
                                 ,tail: function (local_137) {
                                    return take({stream: local_134.tail({})
                                                ,__while: local_133.__while});
                                 }}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_138 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var htmlTagName = function (tagItem1) {
           return toBytes(take({stream: fromBytes(slice1({object: tagItem1
                                                         ,start: 1.0
                                                         ,stop: _2d_({infixl: length(tagItem1)
                                                                     ,infixr: 1.0})}))
                               ,__while: function (local_125) {
                                  return not(contains({stream: fromBytes(rts.bytesFromAscii(" /"))
                                                      ,item: local_125}));
                               }}));
        };
var htmlCloser = function (tagItem) {
           var x = _26__26_({l: startsWith({prefix: rts.bytesFromAscii("<")
                                           ,text1: tagItem})
                            ,r: function (local_113) {
                               return _26__26_({l: _2f__3d_({infixl: tagItem
                                                            ,infixr: rts.bytesFromAscii("<br>")})
                                               ,r: function (local_114) {
                                                  return _26__26_({l: not(startsWith({prefix: rts.bytesFromAscii("<link ")
                                                                                     ,text1: tagItem}))
                                                                  ,r: function (local_118) {
                                                                     return _2f__3d_({infixl: drop({__bytes1: tagItem
                                                                                                   ,count: _2d_({infixl: length(tagItem)
                                                                                                                ,infixr: 2.0})})
                                                                                     ,infixr: rts.bytesFromAscii("/>")});
                                                                  }});
                                               }});
                            }});
           switch (x.tag)
           {
             case "False":
               var local_122 = x.data;
               return rts.bytesFromAscii("");
             case "True":
               var local_123 = x.data;
               return join({texts: _23_({h: rts.bytesFromAscii("</")
                                        ,t: function (local_124) {
                                           return _23_({h: htmlTagName(tagItem)
                                                       ,t: function (local_139) {
                                                          return _23_({h: rts.bytesFromAscii(">")
                                                                      ,t: function (local_140) {
                                                                         return {tag: "Empty"
                                                                                ,data: {}};
                                                                      }});
                                                       }});
                                        }})
                           ,sep: rts.bytesFromAscii("")});
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var formatHtml = function (tree) {
           var __tag = tree.root;
           return join({texts: _23_({h: __tag
                                    ,t: function (local_111) {
                                       return _2b__2b_({l: map({stream: fromArray(tree.subTrees)
                                                               ,mapping: formatHtml})
                                                       ,r: function (local_112) {
                                                          return _23_({h: htmlCloser(__tag)
                                                                      ,t: function (local_141) {
                                                                         return {tag: "Empty"
                                                                                ,data: {}};
                                                                      }});
                                                       }});
                                    }})
                       ,sep: rts.bytesFromAscii("")});
        };
var _25_ = rts.builtins.Prelude["mod"];
var _2f__2f_ = rts.builtins.Prelude["div"];
var littleEndianDigits = function (local_147) {
           var x = _3d__3d_({infixl: local_147.num1,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_148 = x.data;
               return _23_({h: _25_({infixl: local_147.num1,infixr: local_147.base})
                           ,t: function (local_149) {
                              return littleEndianDigits({base: local_147.base
                                                        ,num1: _2f__2f_({infixl: local_147.num1
                                                                        ,infixr: local_147.base})});
                           }});
             case "True":
               var local_150 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var showPosInt = function (num) {
           return toBytes(map({stream: fromArray(reverse(littleEndianDigits({base: 10.0
                                                                            ,num1: num})))
                              ,mapping: function (local_151) {
                                 return _2b_({infixl: local_151,infixr: 48.0});
                              }}));
        };
var __while1 = function (local_184) {
           var x = local_184.iter(local_184.init);
           switch (x.tag)
           {
             case "Continue":
               var local_185 = x.data;
               return __while1({iter: local_184.iter,init: local_185});
             case "Done":
               return id(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var split1 = function (local_178) {
           return __while1({iter: function (local_179) {
                              var done = function (local_180) {
                                         return {tag: "Done"
                                                ,data: {post: local_179.post
                                                       ,pre: reverse(local_179.pre)}};
                                      };
                              var x = _3d__3d_({infixl: local_179.rem,infixr: 0.0});
                              switch (x.tag)
                              {
                                case "False":
                                  var local_181 = x.data;
                                  var x = local_179.post;
                                  switch (x.tag)
                                  {
                                    case "NonEmpty":
                                      var local_182 = x.data;
                                      return {tag: "Continue"
                                             ,data: {post: local_182.tail({})
                                                    ,pre: _23_({h: local_182.head
                                                               ,t: function (local_183) {
                                                                  return local_179.pre;
                                                               }})
                                                    ,rem: _2d_({infixl: local_179.rem
                                                               ,infixr: 1.0})}};
                                    case "Empty":
                                      return done(x.data);
                                    default:
                                      throw "Unhandled case? This is a type error!";
                                  }
                                case "True":
                                  return done(x.data);
                                default:
                                  throw "Unhandled case? This is a type error!";
                              }
                           }
                           ,init: {post: local_178.stream9
                                  ,pre: {tag: "Empty",data: {}}
                                  ,rem: local_178.at}});
        };
var groups1 = function (local_176) {
           var x = local_176.stream8;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_177 = x.data;
               var local_186 = split1({stream9: local_176.stream8
                                      ,at: local_176.ofLength});
               return _23_({h: local_186.pre
                           ,t: function (local_187) {
                              return groups1({ofLength: local_176.ofLength
                                             ,stream8: local_186.post});
                           }});
             case "Empty":
               var local_188 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _3c__3d_ = rts.builtins.Prelude["<="];
var drop1 = function (local_202) {
           var x = _3c__3d_({infixl: local_202.count,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_203 = x.data;
               var x = local_202.stream;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_204 = x.data;
                   return drop1({stream: local_204.tail({})
                                ,count: _2d_({infixl: local_202.count,infixr: 1.0})});
                 case "Empty":
                   var local_205 = x.data;
                   return {tag: "Empty",data: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "True":
               var local_206 = x.data;
               return local_202.stream;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var detailedTable = function (local_144) {
           var perDay1 = function (day1) {
                      var onDay1 = toArray(filter({stream: fromArray(local_144.info2)
                                                  ,keep: function (local_145) {
                                                     return startsWith({prefix: day1
                                                                       ,text1: local_145.when});
                                                  }}));
                      var cellsInRow = _2a_({infixl: local_144.classesPerRow
                                            ,infixr: 4.0});
                      return _23_({h: {root: rts.bytesFromAscii("<tr>")
                                      ,subTrees: arraySingle({root: join({texts: _23_({h: rts.bytesFromAscii("<th colspan=")
                                                                                      ,t: function (local_146) {
                                                                                         return _23_({h: showPosInt(_2b_({infixl: 1.0
                                                                                                                         ,infixr: cellsInRow}))
                                                                                                     ,t: function (local_152) {
                                                                                                        return _23_({h: rts.bytesFromAscii(" style=\"border-top: 3px solid black\">")
                                                                                                                    ,t: function (local_153) {
                                                                                                                       return {tag: "Empty"
                                                                                                                              ,data: {}};
                                                                                                                    }});
                                                                                                     }});
                                                                                      }})
                                                                         ,sep: rts.bytesFromAscii("")})
                                                             ,subTrees: arraySingle(htmlTextNode(day1))})}
                                  ,t: function (local_154) {
                                     var tdColor = function (local_155) {
                                                return join({texts: _23_({h: rts.bytesFromAscii("<td style=\"background-color:")
                                                                         ,t: function (local_156) {
                                                                            return _23_({h: local_155.color1
                                                                                        ,t: function (local_157) {
                                                                                           return _23_({h: local_155.more
                                                                                                       ,t: function (local_158) {
                                                                                                          return _23_({h: rts.bytesFromAscii("\">")
                                                                                                                      ,t: function (local_159) {
                                                                                                                         return {tag: "Empty"
                                                                                                                                ,data: {}};
                                                                                                                      }});
                                                                                                       }});
                                                                                        }});
                                                                         }})
                                                            ,sep: rts.bytesFromAscii("")});
                                             };
                                     var baseCells = function (local_160) {
                                                return _23_({h: {root: tdColor({more: rts.bytesFromAscii(";border-left: 3px solid black")
                                                                               ,color1: local_160.color})
                                                                ,subTrees: arraySingle({root: rts.bytesFromAscii("<b>")
                                                                                       ,subTrees: arraySingle(htmlTextNode(local_160.where))})}
                                                            ,t: function (local_161) {
                                                               return _23_({h: {root: tdColor({more: rts.bytesFromAscii("")
                                                                                              ,color1: local_160.color})
                                                                               ,subTrees: classCellItems({getLang1: local_144.getLang2
                                                                                                         ,info1: local_160})}
                                                                           ,t: function (local_162) {
                                                                              return {tag: "Empty"
                                                                                     ,data: {}};
                                                                           }});
                                                            }});
                                             };
                                     return concat(map({stream: sortOn({stream6: uniques(map({stream: fromArray(onDay1)
                                                                                             ,mapping: function (local_163) {
                                                                                                return local_163.when;
                                                                                             }}))
                                                                       ,on: iacTimeOfDayOrder})
                                                       ,mapping: function (time) {
                                                          var onTime =
                                                                  toArray(filter({stream: fromArray(onDay1)
                                                                                 ,keep: function (local_164) {
                                                                                    return _3d__3d_({infixl: local_164.when
                                                                                                    ,infixr: time});
                                                                                 }}));
                                                          var groups =
                                                                  partition({stream: fromArray(onTime)
                                                                            ,by: function (local_165) {
                                                                               return _7c__7c_({l: _2f__3d_({infixl: local_144.getLang2(local_165.desc)
                                                                                                            ,infixr: rts.bytesFromAscii("")})
                                                                                               ,r: function (local_166) {
                                                                                                  return _2f__3d_({infixl: local_144.getLang2(local_165.prereqs)
                                                                                                                  ,infixr: rts.bytesFromAscii("")});
                                                                                               }});
                                                                            }});
                                                          var rows =
                                                                  toArray(map({stream: groups1({ofLength: cellsInRow
                                                                                               ,stream8: concat(_2b__2b_({l: map({stream: fromArray(groups.True)
                                                                                                                                 ,mapping: function (local_167) {
                                                                                                                                    return _2b__2b_({l: baseCells({prereqs: local_167.prereqs
                                                                                                                                                                  ,where: local_167.where
                                                                                                                                                                  ,color: local_167.color
                                                                                                                                                                  ,what: local_167.what
                                                                                                                                                                  ,who: local_167.who
                                                                                                                                                                  ,desc: local_167.desc
                                                                                                                                                                  ,when: local_167.when})
                                                                                                                                                    ,r: function (local_168) {
                                                                                                                                                       return _23_({h: {root: tdColor({more: rts.bytesFromAscii("")
                                                                                                                                                                                      ,color1: local_167.color})
                                                                                                                                                                       ,subTrees: toArray(_23_({h: {root: rts.bytesFromAscii("<b>")
                                                                                                                                                                                                   ,subTrees: arraySingle(htmlTextNode(rts.bytesFromAscii("Description:")))}
                                                                                                                                                                                               ,t: function (local_169) {
                                                                                                                                                                                                  return _23_({h: htmlTextNode(local_144.getLang2(local_167.desc))
                                                                                                                                                                                                              ,t: function (local_170) {
                                                                                                                                                                                                                 return {tag: "Empty"
                                                                                                                                                                                                                        ,data: {}};
                                                                                                                                                                                                              }});
                                                                                                                                                                                               }}))}
                                                                                                                                                                   ,t: function (local_171) {
                                                                                                                                                                      return _23_({h: {root: tdColor({more: rts.bytesFromAscii("")
                                                                                                                                                                                                     ,color1: local_167.color})
                                                                                                                                                                                      ,subTrees: toArray(_23_({h: {root: rts.bytesFromAscii("<b>")
                                                                                                                                                                                                                  ,subTrees: arraySingle(htmlTextNode(rts.bytesFromAscii("Pre-reqs:")))}
                                                                                                                                                                                                              ,t: function (local_172) {
                                                                                                                                                                                                                 return _23_({h: htmlTextNode(local_144.getLang2(local_167.prereqs))
                                                                                                                                                                                                                             ,t: function (local_173) {
                                                                                                                                                                                                                                return {tag: "Empty"
                                                                                                                                                                                                                                       ,data: {}};
                                                                                                                                                                                                                             }});
                                                                                                                                                                                                              }}))}
                                                                                                                                                                                  ,t: function (local_174) {
                                                                                                                                                                                     return {tag: "Empty"
                                                                                                                                                                                            ,data: {}};
                                                                                                                                                                                  }});
                                                                                                                                                                   }});
                                                                                                                                                    }});
                                                                                                                                 }})
                                                                                                                         ,r: function (local_175) {
                                                                                                                            return map({stream: fromArray(groups.False)
                                                                                                                                       ,mapping: baseCells});
                                                                                                                         }}))})
                                                                              ,mapping: function (local_189) {
                                                                                 var len2 =
                                                                                         length1(local_189);
                                                                                 var x =
                                                                                         _3d__3d_({infixl: len2
                                                                                                  ,infixr: cellsInRow});
                                                                                 switch (x.tag)
                                                                                 {
                                                                                   case "False":
                                                                                     var local_190 =
                                                                                             x.data;
                                                                                     return toArray(_2b__2b_({l: fromArray(local_189)
                                                                                                             ,r: function (local_191) {
                                                                                                                return _23_({h: {root: join({texts: _23_({h: rts.bytesFromAscii("<td style=\"border-left: 3px solid black\" colspan=")
                                                                                                                                                         ,t: function (local_192) {
                                                                                                                                                            return _23_({h: showPosInt(_2d_({infixl: cellsInRow
                                                                                                                                                                                            ,infixr: len2}))
                                                                                                                                                                        ,t: function (local_193) {
                                                                                                                                                                           return _23_({h: rts.bytesFromAscii(">")
                                                                                                                                                                                       ,t: function (local_194) {
                                                                                                                                                                                          return {tag: "Empty"
                                                                                                                                                                                                 ,data: {}};
                                                                                                                                                                                       }});
                                                                                                                                                                        }});
                                                                                                                                                         }})
                                                                                                                                            ,sep: rts.bytesFromAscii("")})
                                                                                                                                ,subTrees: arraySingle(htmlTextNode(rts.bytesFromAscii("-")))}
                                                                                                                            ,t: function (local_195) {
                                                                                                                               return {tag: "Empty"
                                                                                                                                      ,data: {}};
                                                                                                                            }});
                                                                                                             }}));
                                                                                   case "True":
                                                                                     var local_196 =
                                                                                             x.data;
                                                                                     return local_189;
                                                                                   default:
                                                                                     throw "Unhandled case? This is a type error!";
                                                                                 }
                                                                              }}));
                                                          return _23_({h: {root: rts.bytesFromAscii("<tr class=\"top\">")
                                                                          ,subTrees: toArray(_23_({h: {root: join({texts: _23_({h: rts.bytesFromAscii("<th rowspan=")
                                                                                                                               ,t: function (local_197) {
                                                                                                                                  return _23_({h: showPosInt(length1(rows))
                                                                                                                                              ,t: function (local_198) {
                                                                                                                                                 return _23_({h: rts.bytesFromAscii(">")
                                                                                                                                                             ,t: function (local_199) {
                                                                                                                                                                return {tag: "Empty"
                                                                                                                                                                       ,data: {}};
                                                                                                                                                             }});
                                                                                                                                              }});
                                                                                                                               }})
                                                                                                                  ,sep: rts.bytesFromAscii("")})
                                                                                                      ,subTrees: arraySingle(htmlTextNode(time))}
                                                                                                  ,t: function (local_200) {
                                                                                                     return fromArray(item1({index: 0.0
                                                                                                                            ,object: rows}));
                                                                                                  }}))}
                                                                      ,t: function (local_201) {
                                                                         return map({stream: drop1({stream: fromArray(rows)
                                                                                                   ,count: 1.0})
                                                                                    ,mapping: function (local_207) {
                                                                                       return {root: rts.bytesFromAscii("<tr>")
                                                                                              ,subTrees: local_207};
                                                                                    }});
                                                                      }});
                                                       }}));
                                  }});
                   };
           return {root: rts.bytesFromAscii("<html>")
                  ,subTrees: toArray(_23_({h: {root: rts.bytesFromAscii("<head>")
                                              ,subTrees: toArray(_23_({h: {root: rts.bytesFromAscii("<meta charset=\"UTF-8\" />")
                                                                          ,subTrees: toArray({tag: "Empty"
                                                                                             ,data: {}})}
                                                                      ,t: function (local_208) {
                                                                         return _23_({h: {root: rts.bytesFromAscii("<title>")
                                                                                         ,subTrees: arraySingle(htmlTextNode(rts.bytesFromAscii("IAC 2016 Detailed Schedule")))}
                                                                                     ,t: function (local_209) {
                                                                                        return _23_({h: {root: rts.bytesFromAscii("<style>")
                                                                                                        ,subTrees: arraySingle(htmlTextNode(rts.bytesFromAscii("\nth {\n    border: 1px solid black;\n    border-top: 4px solid black;\n}\ntd {\n    border: 0.5px solid black;\n    border-top: 2px solid black;\n}\n.top td {\n    border-top: 4px solid black;\n}\n")))}
                                                                                                    ,t: function (local_210) {
                                                                                                       return {tag: "Empty"
                                                                                                              ,data: {}};
                                                                                                    }});
                                                                                     }});
                                                                      }}))}
                                          ,t: function (local_211) {
                                             return _23_({h: {root: rts.bytesFromAscii("<body>")
                                                             ,subTrees: arraySingle({root: rts.bytesFromAscii("<table cellspacing=0>")
                                                                                    ,subTrees: arraySingle({root: rts.bytesFromAscii("<tbody>")
                                                                                                           ,subTrees: toArray(concat(map({stream: fromArray(iacDaysOrder)
                                                                                                                                         ,mapping: perDay1})))})})}
                                                         ,t: function (local_212) {
                                                            return {tag: "Empty"
                                                                   ,data: {}};
                                                         }});
                                          }}))};
        };
var _3e_ = rts.builtins.Prelude[">"];
var parseHtmlTree = function (html) {
           var simpleItem = function (cutAt) {
                      return {state: drop({__bytes1: html,count: cutAt})
                             ,val: {root: slice1({object: html,start: 0.0,stop: cutAt})
                                   ,subTrees: toArray({tag: "Empty",data: {}})}};
                   };
           var x = find({__bytes1: html,slice: rts.bytesFromAscii("<")});
           switch (x.tag)
           {
             case "Just":
               var openPos = x.data;
               var x = _3e_({infixl: openPos,infixr: 0.0});
               switch (x.tag)
               {
                 case "False":
                   var local_213 = x.data;
                   var x = find({__bytes1: html,slice: rts.bytesFromAscii(">")});
                   switch (x.tag)
                   {
                     case "Just":
                       var closePos = x.data;
                       var tagItem2 = slice1({object: html
                                             ,start: 0.0
                                             ,stop: _2b_({infixl: closePos
                                                         ,infixr: 1.0})});
                       var closer = htmlCloser(tagItem2);
                       var x = _3d__3d_({infixl: closer
                                        ,infixr: rts.bytesFromAscii("</script>")});
                       switch (x.tag)
                       {
                         case "False":
                           var local_214 = x.data;
                           var local_220 = __while1({iter: function (local_215) {
                                                       var x = startsWith({prefix: closer
                                                                          ,text1: local_215.state});
                                                       switch (x.tag)
                                                       {
                                                         case "False":
                                                           var local_216 = x.data;
                                                           var local_217 =
                                                                   parseHtmlTree(local_215.state);
                                                           return {tag: "Continue"
                                                                  ,data: {state: local_217.state
                                                                         ,val: _23_({h: local_217.val
                                                                                    ,t: function (local_218) {
                                                                                       return local_215.val;
                                                                                    }})}};
                                                         case "True":
                                                           var local_219 = x.data;
                                                           return {tag: "Done"
                                                                  ,data: {state: drop({__bytes1: local_215.state
                                                                                      ,count: length(closer)})
                                                                         ,val: local_215.val}};
                                                         default:
                                                           throw "Unhandled case? This is a type error!";
                                                       }
                                                    }
                                                    ,init: {state: drop({__bytes1: html
                                                                        ,count: _2b_({infixl: closePos
                                                                                     ,infixr: 1.0})})
                                                           ,val: {tag: "Empty"
                                                                 ,data: {}}}});
                           return {state: local_220.state
                                  ,val: {root: tagItem2
                                        ,subTrees: reverse(local_220.val)}};
                         case "True":
                           var local_221 = x.data;
                           var x = find({__bytes1: html,slice: closer});
                           switch (x.tag)
                           {
                             case "Just":
                               var scriptEnd = x.data;
                               return {state: drop({__bytes1: html
                                                   ,count: _2b_({infixl: scriptEnd
                                                                ,infixr: length(closer)})})
                                      ,val: {root: tagItem2
                                            ,subTrees: toArray(_23_({h: {root: slice1({object: html
                                                                                      ,start: _2b_({infixl: closePos
                                                                                                   ,infixr: 1.0})
                                                                                      ,stop: scriptEnd})
                                                                        ,subTrees: toArray({tag: "Empty"
                                                                                           ,data: {}})}
                                                                    ,t: function (local_222) {
                                                                       return {tag: "Empty"
                                                                              ,data: {}};
                                                                    }}))}};
                             case "Nothing":
                               var local_223 = x.data;
                               throw "Reached hole!";
                             default:
                               throw "Unhandled case? This is a type error!";
                           }
                         default:
                           throw "Unhandled case? This is a type error!";
                       }
                     case "Nothing":
                       var local_224 = x.data;
                       throw "Reached hole!";
                     default:
                       throw "Unhandled case? This is a type error!";
                   }
                 case "True":
                   var local_225 = x.data;
                   return simpleItem(openPos);
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Nothing":
               var local_226 = x.data;
               return simpleItem(length(html));
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var subtrees = function (tree1) {
           return _23_({h: tree1
                       ,t: function (local_227) {
                          return concat(map({stream: fromArray(tree1.subTrees)
                                            ,mapping: subtrees}));
                       }});
        };
var htmlText = function (tree2) {
           return join({texts: filter({stream: map({stream: subtrees(tree2)
                                                   ,mapping: function (local_229) {
                                                      return local_229.root;
                                                   }})
                                      ,keep: function (local_230) {
                                         return not(startsWith({prefix: rts.bytesFromAscii("<")
                                                               ,text1: local_230}));
                                      }})
                       ,sep: rts.bytesFromAscii("")});
        };
var parsePage = function (page) {
           var parsedHtml = parseHtmlTree(drop({__bytes1: page
                                               ,count: length(rts.bytesFromAscii("<!DOCTYPE html>"))})).val;
           var styles = toArray(concat(map({stream: filter({stream: subtrees(parsedHtml)
                                                           ,keep: function (local_228) {
                                                              return _3d__3d_({infixl: local_228.root
                                                                              ,infixr: rts.bytesFromAscii("<style type=\"text/css\">")});
                                                           }})
                                           ,mapping: function (cssNode) {
                                              return concat(map({stream: split({text1: htmlText(cssNode)
                                                                               ,seperator: rts.bytesFromAscii("}.")})
                                                                ,mapping: function (local_231) {
                                                                   var x =
                                                                           split({text1: local_231
                                                                                 ,seperator: rts.bytesFromAscii("{")});
                                                                   switch (x.tag)
                                                                   {
                                                                     case "NonEmpty":
                                                                       var local_232 =
                                                                               x.data;
                                                                       var x =
                                                                               local_232.tail({});
                                                                       switch (x.tag)
                                                                       {
                                                                         case "NonEmpty":
                                                                           var local_233 =
                                                                                   x.data;
                                                                           return concat(map({stream: split({text1: local_233.head
                                                                                                            ,seperator: rts.bytesFromAscii(";")})
                                                                                             ,mapping: function (local_234) {
                                                                                                var bgTag =
                                                                                                        rts.bytesFromAscii("background-color:");
                                                                                                var x =
                                                                                                        startsWith({prefix: bgTag
                                                                                                                   ,text1: local_234});
                                                                                                switch (x.tag)
                                                                                                {
                                                                                                  case "False":
                                                                                                    var local_235 =
                                                                                                            x.data;
                                                                                                    return {tag: "Empty"
                                                                                                           ,data: {}};
                                                                                                  case "True":
                                                                                                    var local_236 =
                                                                                                            x.data;
                                                                                                    return _23_({h: {background: slice1({object: local_234
                                                                                                                                        ,start: length(bgTag)
                                                                                                                                        ,stop: _2b_({infixl: length(bgTag)
                                                                                                                                                    ,infixr: 7.0})})
                                                                                                                    ,htmlClass: local_232.head}
                                                                                                                ,t: function (local_237) {
                                                                                                                   return {tag: "Empty"
                                                                                                                          ,data: {}};
                                                                                                                }});
                                                                                                  default:
                                                                                                    throw "Unhandled case? This is a type error!";
                                                                                                }
                                                                                             }}));
                                                                         case "Empty":
                                                                           var local_238 =
                                                                                   x.data;
                                                                           return {tag: "Empty"
                                                                                  ,data: {}};
                                                                         default:
                                                                           throw "Unhandled case? This is a type error!";
                                                                       }
                                                                     case "Empty":
                                                                       var local_239 =
                                                                               x.data;
                                                                       throw "Reached hole!";
                                                                     default:
                                                                       throw "Unhandled case? This is a type error!";
                                                                   }
                                                                }}));
                                           }})));
           var table = item1({index: 1.0
                             ,object: toArray(filter({stream: subtrees(parsedHtml)
                                                     ,keep: function (local_240) {
                                                        return startsWith({prefix: rts.bytesFromAscii("<table ")
                                                                          ,text1: local_240.root});
                                                     }}))});
           var tbody = item1({index: 0.0,object: table.subTrees});
           var contentRows = toArray(filter({stream: fromArray(tbody.subTrees)
                                            ,keep: function (local_241) {
                                               var local_242 = htmlText(item1({index: 0.0
                                                                              ,object: local_241.subTrees}));
                                               return _26__26_({l: _2f__3d_({infixl: local_242
                                                                            ,infixr: rts.bytesFromAscii("Date/time")})
                                                               ,r: function (local_243) {
                                                                  return _2f__3d_({infixl: local_242
                                                                                  ,infixr: rts.bytesFromAscii("(This may change! Check schedule)")});
                                                               }});
                                            }}));
           return toArray(map({stream: fromArray(contentRows)
                              ,mapping: function (rowTree) {
                                 var cellTexts =
                                         toArray(map({stream: fromArray(rowTree.subTrees)
                                                     ,mapping: htmlText}));
                                 var firstCellClasses = function () {
                                            var x =
                                                    drop1({stream: split({text1: item1({index: 0.0
                                                                                       ,object: rowTree.subTrees}).root
                                                                         ,seperator: rts.bytesFromAscii("\"")})
                                                          ,count: 1.0});
                                            switch (x.tag)
                                            {
                                              case "NonEmpty":
                                                var local_244 = x.data;
                                                return split({text1: local_244.head
                                                             ,seperator: rts.bytesFromAscii(" ")});
                                              case "Empty":
                                                var local_245 = x.data;
                                                return {tag: "Empty",data: {}};
                                              default:
                                                throw "Unhandled case? This is a type error!";
                                            }
                                         }();
                                 return {prereqs: {heb: item1({index: 9.0
                                                              ,object: cellTexts})
                                                  ,eng: item1({index: 8.0
                                                              ,object: cellTexts})}
                                        ,where: item1({index: 1.0,object: cellTexts})
                                        ,color: function () {
                                           var x = concat(map({stream: firstCellClasses
                                                              ,mapping: function (local_246) {
                                                                 return map({stream: filter({stream: fromArray(styles)
                                                                                            ,keep: function (local_247) {
                                                                                               return _3d__3d_({infixl: local_247.htmlClass
                                                                                                               ,infixr: local_246});
                                                                                            }})
                                                                            ,mapping: function (local_248) {
                                                                               return local_248.background;
                                                                            }});
                                                              }}));
                                           switch (x.tag)
                                           {
                                             case "NonEmpty":
                                               var local_249 = x.data;
                                               return local_249.head;
                                             case "Empty":
                                               var local_250 = x.data;
                                               return rts.bytesFromAscii("#000000");
                                             default:
                                               throw "Unhandled case? This is a type error!";
                                           }
                                        }()
                                        ,what: {heb: item1({index: 5.0,object: cellTexts})
                                               ,eng: item1({index: 4.0
                                                           ,object: cellTexts})}
                                        ,who: {heb: item1({index: 3.0,object: cellTexts})
                                              ,eng: item1({index: 2.0,object: cellTexts})}
                                        ,desc: {heb: item1({index: 7.0,object: cellTexts})
                                               ,eng: item1({index: 6.0
                                                           ,object: cellTexts})}
                                        ,when: item1({index: 0.0,object: cellTexts})};
                              }}));
        };
var forJs = {makeBrief: function (local_1) {
               return formatHtml(overviewTable({info: local_1
                                               ,getLang: function (local_2) {
                                                  return local_2.eng;
                                               }}));
            }
            ,makeDetailed: function (local_142) {
               return formatHtml(detailedTable({classesPerRow: 2.0
                                               ,getLang2: function (local_143) {
                                                  return local_143.eng;
                                               }
                                               ,info2: local_142}));
            }
            ,parse: parsePage};
var repl = forJs;
rts.logRepl(repl);
module.exports = repl;
