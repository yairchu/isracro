"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("./rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var _3d__3d_ = rts.builtins.Prelude["=="];
var length = rts.builtins.Bytes["length"];
var _2b_ = rts.builtins.Prelude["+"];
var slice1 = rts.builtins.Bytes["slice"];
var _2d_ = rts.builtins.Prelude["-"];
var iterate = function (local_8) {
   return {tag: "NonEmpty"
          ,data: {head: local_8.initial
                 ,tail: function (local_9) {
                    return iterate({initial: local_8.next(local_8.initial)
                                   ,next: local_8.next});
                 }}};
};
var _3e_ = rts.builtins.Prelude[">"];
var _3c_ = rts.builtins.Prelude["<"];
var take = function (local_14) {
   var x = local_14.stream;
   switch (x.tag)
   {
     case "NonEmpty":
       var local_15 = x.data;
       var x = local_14.__while(local_15.head);
       switch (x.tag)
       {
         case "False":
           var local_16 = x.data;
           return {tag: "Empty",data: {}};
         case "True":
           var local_17 = x.data;
           return {tag: "NonEmpty"
                  ,data: {head: local_15.head
                         ,tail: function (local_18) {
                            return take({stream: local_15.tail({})
                                        ,__while: local_14.__while});
                         }}};
         default:
           throw "Unhandled case? This is a type error!";
       }
     case "Empty":
       var local_19 = x.data;
       return {tag: "Empty",data: {}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var _2e__2e_1 = function (local_6) {
   return take({stream: iterate({initial: local_6.start
                                ,next: function (local_7) {
                                   return _2b_({infixl: local_7,infixr: local_6.step});
                                }})
               ,__while: function () {
                  var x = _3e_({infixl: local_6.step,infixr: 0.0});
                  switch (x.tag)
                  {
                    case "False":
                      var local_10 = x.data;
                      return function (local_11) {
                             return _3e_({infixl: local_11,infixr: local_6.stop});
                          };
                    case "True":
                      var local_12 = x.data;
                      return function (local_13) {
                             return _3c_({infixl: local_13,infixr: local_6.stop});
                          };
                    default:
                      throw "Unhandled case? This is a type error!";
                  }
               }()});
};
var _2e__2e_ = function (local_5) {
   return _2e__2e_1({step: 1.0,start: local_5.start,stop: local_5.stop});
};
var first = function (local_20) {
   var x = local_20.stream;
   switch (x.tag)
   {
     case "NonEmpty":
       var local_21 = x.data;
       var x = local_20.that(local_21.head);
       switch (x.tag)
       {
         case "False":
           var local_22 = x.data;
           return first({that: local_20.that,stream: local_21.tail({})});
         case "True":
           var local_23 = x.data;
           return {tag: "Just",data: local_21.head};
         default:
           throw "Unhandled case? This is a type error!";
       }
     case "Empty":
       var local_24 = x.data;
       return {tag: "Nothing",data: {}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var find = function (local_3) {
   var subLen = length(local_3.slice);
   return first({that: function (local_4) {
                   return _3d__3d_({infixl: slice1({object: local_3.__bytes
                                                   ,start: local_4
                                                   ,stop: _2b_({infixl: local_4
                                                               ,infixr: subLen})})
                                   ,infixr: local_3.slice});
                }
                ,stream: _2e__2e_({start: 0.0
                                  ,stop: _2b_({infixl: _2d_({infixl: length(local_3.__bytes)
                                                            ,infixr: subLen})
                                              ,infixr: 1.0})})});
};
var xmlTagName = function (fullTag) {
   var x = find({__bytes: fullTag,slice: rts.bytesFromAscii(" ")});
   switch (x.tag)
   {
     case "Just":
       var pos = x.data;
       return slice1({object: fullTag,start: 0.0,stop: pos});
     case "Nothing":
       var local_25 = x.data;
       return fullTag;
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var _7c__7c_ = function (local_26) {
   var x = local_26.l;
   switch (x.tag)
   {
     case "False":
       return local_26.r(x.data);
     case "True":
       var local_27 = x.data;
       return {tag: "True",data: {}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var startsWith = function (text1) {
   return _3d__3d_({infixl: slice1({object: text1.text
                                   ,start: 0.0
                                   ,stop: length(text1.prefix)})
                   ,infixr: text1.prefix});
};
var removePrefix = function (text3) {
   var x = startsWith({text: text3.text2,prefix: text3.prefix1});
   switch (x.tag)
   {
     case "False":
       var local_36 = x.data;
       return {tag: "Nothing",data: {}};
     case "True":
       var local_37 = x.data;
       return {tag: "Just"
              ,data: slice1({object: text3.text2
                            ,start: length(text3.prefix1)
                            ,stop: length(text3.text2)})};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var parseExact = function (local_35) {
   return function (src) {
          var x = removePrefix({prefix1: local_35,text2: src});
          switch (x.tag)
          {
            case "Just":
              var suffix = x.data;
              return {state: suffix,val: {tag: "True",data: {}}};
            case "Nothing":
              var local_38 = x.data;
              return {state: src,val: {tag: "False",data: {}}};
            default:
              throw "Unhandled case? This is a type error!";
          }
       };
};
var __return = function (local_41) {
   return function (local_42) {
          return {state: local_42,val: local_41};
       };
};
var get = function (local_44) { return {state: local_44,val: local_44};};
var put = function (local_45) {
   return function (local_46) {
          return {state: local_45,val: {}};
       };
};
var _3b_ = function (local_48) {
   return function (local_49) {
          var local_50 = local_48.infixl(local_49);
          return local_48.infixr(local_50.val)(local_50.state);
       };
};
var parseMXmlTag = function (parseBody) {
   return _3b_({infixl: parseExact(rts.bytesFromAscii("<"))
               ,infixr: function (local_39) {
                  var x = local_39;
                  switch (x.tag)
                  {
                    case "False":
                      var local_40 = x.data;
                      return __return({tag: "Nothing",data: {}});
                    case "True":
                      var local_43 = x.data;
                      return _3b_({infixl: get
                                  ,infixr: function (src1) {
                                     var x = find({__bytes: src1
                                                  ,slice: rts.bytesFromAscii(">")});
                                     switch (x.tag)
                                     {
                                       case "Just":
                                         var endPos = x.data;
                                         var x = parseBody(slice1({object: src1
                                                                  ,start: 0.0
                                                                  ,stop: endPos}));
                                         switch (x.tag)
                                         {
                                           case "Just":
                                             var res = x.data;
                                             return _3b_({infixl: put(slice1({object: src1
                                                                             ,start: _2b_({infixl: endPos
                                                                                          ,infixr: 1.0})
                                                                             ,stop: length(src1)}))
                                                         ,infixr: function (local_47) {
                                                            return __return({tag: "Just"
                                                                            ,data: res});
                                                         }});
                                           case "Nothing":
                                             var local_51 = x.data;
                                             return __return({tag: "Nothing",data: {}});
                                           default:
                                             throw "Unhandled case? This is a type error!";
                                         }
                                       case "Nothing":
                                         var local_52 = x.data;
                                         return __return({tag: "Nothing",data: {}});
                                       default:
                                         throw "Unhandled case? This is a type error!";
                                     }
                                  }});
                    default:
                      throw "Unhandled case? This is a type error!";
                  }
               }});
};
var parseMXmlOpenTag = parseMXmlTag(function (local_32) {
                          var x = startsWith({text: local_32
                                             ,prefix: rts.bytesFromAscii("/")});
                          switch (x.tag)
                          {
                            case "False":
                              var local_33 = x.data;
                              return {tag: "Just",data: local_32};
                            case "True":
                              var local_34 = x.data;
                              return {tag: "Nothing",data: {}};
                            default:
                              throw "Unhandled case? This is a type error!";
                          }
                       });
var toArray = rts.builtins.Array["fromStream"];
var leaf = function (local_55) {
   return {root: local_55,subTrees: toArray({tag: "Empty",data: {}})};
};
var endsWith = function (text5) {
   var len = length(text5.text4);
   return _3d__3d_({infixl: slice1({object: text5.text4
                                   ,start: _2d_({infixl: len
                                                ,infixr: length(text5.suffix1)})
                                   ,stop: len})
                   ,infixr: text5.suffix1});
};
var parseMXmlCloseTag = parseMXmlTag(function (local_57) {
                           return removePrefix({prefix1: rts.bytesFromAscii("/")
                                               ,text2: local_57});
                        });
var parseMany = function (parseOne) {
   return _3b_({infixl: parseOne
               ,infixr: function (mOne) {
                  var x = mOne;
                  switch (x.tag)
                  {
                    case "Just":
                      var __x = x.data;
                      return _3b_({infixl: parseMany(parseOne)
                                  ,infixr: function (xs) {
                                     return __return({tag: "NonEmpty"
                                                     ,data: {head: __x
                                                            ,tail: function (local_67) {
                                                               return xs;
                                                            }}});
                                  }});
                    case "Nothing":
                      var local_68 = x.data;
                      return __return({tag: "Empty",data: {}});
                    default:
                      throw "Unhandled case? This is a type error!";
                  }
               }});
};
var byteAt = rts.builtins.Bytes["byteAt"];
var foldLazy = function (local_76) {
   var x = local_76.stream;
   switch (x.tag)
   {
     case "NonEmpty":
       var local_77 = x.data;
       return local_76.binop({rest: function (local_78) {
                                var dummy = _3d__3d_({infixl: local_78,infixr: {}});
                                return foldLazy({stream: local_77.tail({})
                                                ,initial: local_76.initial
                                                ,binop: local_76.binop});
                             }
                             ,item: local_77.head});
     case "Empty":
       return local_76.initial(x.data);
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var map = function (local_73) {
   return foldLazy({stream: local_73.stream
                   ,initial: function (local_74) {
                      return {tag: "Empty",data: {}};
                   }
                   ,binop: function (local_75) {
                      return {tag: "NonEmpty"
                             ,data: {head: local_73.mapping(local_75.item)
                                    ,tail: local_75.rest}};
                   }});
};
var fromBytes = function (__bytes1) {
   var len1 = length(__bytes1);
   return map({stream: _2e__2e_({start: 0.0,stop: len1})
              ,mapping: function (local_72) {
                 return byteAt({index: local_72,object: __bytes1});
              }});
};
var _2b__2b_2 = function (local_80) {
   return foldLazy({stream: local_80.l
                   ,initial: local_80.r
                   ,binop: function (local_81) {
                      return {tag: "NonEmpty"
                             ,data: {head: local_81.item,tail: local_81.rest}};
                   }});
};
var toBytes = rts.builtins.Bytes["fromStream"];
var _2b__2b_1 = function (local_71) {
   return toBytes(_2b__2b_2({l: fromBytes(local_71.a)
                            ,r: function (local_79) {
                               return fromBytes(local_71.b);
                            }}));
};
var _2b__2b_ = function (local_70) { return _2b__2b_1({a: local_70.a,b: local_70.b});};
var parseUntil = function (sep) {
   return function (src2) {
          var x = find({__bytes: src2,slice: sep});
          switch (x.tag)
          {
            case "Just":
              var pos1 = x.data;
              return {state: slice1({object: src2,start: pos1,stop: length(src2)})
                     ,val: slice1({object: src2,start: 0.0,stop: pos1})};
            case "Nothing":
              var local_82 = x.data;
              return {state: rts.bytesFromAscii(""),val: src2};
            default:
              throw "Unhandled case? This is a type error!";
          }
       };
};
var parseXmlElem = function (tagInfo) {
   return _3b_({infixl: parseMXmlOpenTag
               ,infixr: function (local_53) {
                  var x = local_53;
                  switch (x.tag)
                  {
                    case "Just":
                      var fullTag1 = x.data;
                      var singleTag = function (local_54) {
                         return __return(leaf({tag: "Tag",data: fullTag1}));
                      };
                      var x = endsWith({suffix1: rts.bytesFromAscii("/")
                                       ,text4: fullTag1});
                      switch (x.tag)
                      {
                        case "False":
                          var local_56 = x.data;
                          var parseCloser = function (onGood) {
                             return _3b_({infixl: parseMXmlCloseTag
                                         ,infixr: function (local_58) {
                                            var err = function (msg) {
                                               return __return({root: {tag: "Tag"
                                                                      ,data: msg}
                                                               ,subTrees: toArray({tag: "NonEmpty"
                                                                                  ,data: {head: onGood
                                                                                         ,tail: function (local_59) {
                                                                                            return {tag: "Empty"
                                                                                                   ,data: {}};
                                                                                         }}})});
                                            };
                                            var x = local_58;
                                            switch (x.tag)
                                            {
                                              case "Just":
                                                var closeName = x.data;
                                                var x = _3d__3d_({infixl: closeName
                                                                 ,infixr: xmlTagName(fullTag1)});
                                                switch (x.tag)
                                                {
                                                  case "False":
                                                    var local_60 = x.data;
                                                    return err(rts.bytesFromAscii("ERR CLOSER MISMATCH"));
                                                  case "True":
                                                    var local_61 = x.data;
                                                    return __return(onGood);
                                                  default:
                                                    throw "Unhandled case? This is a type error!";
                                                }
                                              case "Nothing":
                                                var local_62 = x.data;
                                                return err(rts.bytesFromAscii("ERR NO CLOSER"));
                                              default:
                                                throw "Unhandled case? This is a type error!";
                                            }
                                         }});
                          };
                          var x = tagInfo(fullTag1);
                          switch (x.tag)
                          {
                            case "SingleTag":
                              return singleTag(x.data);
                            case "Normal":
                              var local_63 = x.data;
                              return _3b_({infixl: parseMany(_3b_({infixl: get
                                                                  ,infixr: function (remain) {
                                                                     var x =
                                                                     _7c__7c_({l: _3d__3d_({infixl: remain
                                                                                           ,infixr: rts.bytesFromAscii("")})
                                                                              ,r: function (local_64) {
                                                                                 return startsWith({text: remain
                                                                                                   ,prefix: rts.bytesFromAscii("</")});
                                                                              }});
                                                                     switch (x.tag)
                                                                     {
                                                                       case "False":
                                                                         var local_65 =
                                                                         x.data;
                                                                         return _3b_({infixl: parseXmlElem(tagInfo)
                                                                                     ,infixr: function (res1) {
                                                                                        return __return({tag: "Just"
                                                                                                        ,data: res1});
                                                                                     }});
                                                                       case "True":
                                                                         var local_66 =
                                                                         x.data;
                                                                         return __return({tag: "Nothing"
                                                                                         ,data: {}});
                                                                       default:
                                                                         throw "Unhandled case? This is a type error!";
                                                                     }
                                                                  }}))
                                          ,infixr: function (elems) {
                                             return parseCloser({root: {tag: "Tag"
                                                                       ,data: fullTag1}
                                                                ,subTrees: toArray(elems)});
                                          }});
                            case "CData":
                              var local_69 = x.data;
                              return _3b_({infixl: parseUntil(_2b__2b_({a: rts.bytesFromAscii("</")
                                                                       ,b: xmlTagName(fullTag1)}))
                                          ,infixr: function (local_83) {
                                             return parseCloser({root: {tag: "Tag"
                                                                       ,data: fullTag1}
                                                                ,subTrees: toArray({tag: "NonEmpty"
                                                                                   ,data: {head: leaf({tag: "Data"
                                                                                                      ,data: local_83})
                                                                                          ,tail: function (local_84) {
                                                                                             return {tag: "Empty"
                                                                                                    ,data: {}};
                                                                                          }}})});
                                          }});
                            default:
                              throw "Unhandled case? This is a type error!";
                          }
                        case "True":
                          return singleTag(x.data);
                        default:
                          throw "Unhandled case? This is a type error!";
                      }
                    case "Nothing":
                      var local_85 = x.data;
                      return _3b_({infixl: parseUntil(rts.bytesFromAscii("<"))
                                  ,infixr: function (local_86) {
                                     return __return(leaf({tag: "Data",data: local_86}));
                                  }});
                    default:
                      throw "Unhandled case? This is a type error!";
                  }
               }});
};
var parseHtmlElem = parseXmlElem(function (local_1) {
                       var x = _7c__7c_({l: _3d__3d_({infixl: local_1
                                                     ,infixr: rts.bytesFromAscii("br")})
                                        ,r: function (local_2) {
                                           return _3d__3d_({infixl: xmlTagName(local_1)
                                                           ,infixr: rts.bytesFromAscii("link")});
                                        }});
                       switch (x.tag)
                       {
                         case "False":
                           var local_28 = x.data;
                           var x = _3d__3d_({infixl: xmlTagName(local_1)
                                            ,infixr: rts.bytesFromAscii("script")});
                           switch (x.tag)
                           {
                             case "False":
                               var local_29 = x.data;
                               return {tag: "Normal",data: {}};
                             case "True":
                               var local_30 = x.data;
                               return {tag: "CData",data: {}};
                             default:
                               throw "Unhandled case? This is a type error!";
                           }
                         case "True":
                           var local_31 = x.data;
                           return {tag: "SingleTag",data: {}};
                         default:
                           throw "Unhandled case? This is a type error!";
                       }
                    });
var isTree = function (local_89) {
   var x = local_89.tree.root;
   switch (x.tag)
   {
     case "Data":
       var local_90 = x.data;
       return {tag: "False",data: {}};
     case "Tag":
       var local_91 = x.data;
       return _3d__3d_({infixl: xmlTagName(local_91),infixr: local_89.ofTag});
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var length1 = rts.builtins.Array["length"];
var item1 = rts.builtins.Array["item"];
var fromArray = function (__array) {
   var len2 = length1(__array);
   return map({stream: _2e__2e_({start: 0.0,stop: len2})
              ,mapping: function (local_93) {
                 return item1({index: local_93,object: __array});
              }});
};
var concat = function (stream1) {
   return foldLazy({stream: stream1
                   ,initial: function (local_95) {
                      return {tag: "Empty",data: {}};
                   }
                   ,binop: function (local_96) {
                      return _2b__2b_2({l: local_96.item,r: local_96.rest});
                   }});
};
var findSubTrees = function (tree2) {
   var x = tree2.which(tree2.tree1);
   switch (x.tag)
   {
     case "False":
       var local_92 = x.data;
       return concat(map({stream: fromArray(tree2.tree1.subTrees)
                         ,mapping: function (local_94) {
                            return findSubTrees({which: tree2.which,tree1: local_94});
                         }}));
     case "True":
       var local_97 = x.data;
       return {tag: "NonEmpty"
              ,data: {head: tree2.tree1
                     ,tail: function (local_98) {
                        return {tag: "Empty",data: {}};
                     }}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var split = function (local_105) {
   var x = find({__bytes: local_105.text8,slice: local_105.seperator});
   switch (x.tag)
   {
     case "Just":
       var sepIndex = x.data;
       return {tag: "NonEmpty"
              ,data: {head: slice1({object: local_105.text8,start: 0.0,stop: sepIndex})
                     ,tail: function (local_106) {
                        return split({text8: slice1({object: local_105.text8
                                                    ,start: _2b_({infixl: sepIndex
                                                                 ,infixr: length(local_105.seperator)})
                                                    ,stop: length(local_105.text8)})
                                     ,seperator: local_105.seperator});
                     }}};
     case "Nothing":
       var local_107 = x.data;
       return {tag: "NonEmpty"
              ,data: {head: local_105.text8
                     ,tail: function (local_108) {
                        return {tag: "Empty",data: {}};
                     }}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var intersperse = function (local_110) {
   var x = local_110.stream;
   switch (x.tag)
   {
     case "NonEmpty":
       var local_111 = x.data;
       return {tag: "NonEmpty"
              ,data: {head: local_111.head
                     ,tail: function (local_112) {
                        return concat(map({stream: local_111.tail({})
                                          ,mapping: function (local_113) {
                                             return {tag: "NonEmpty"
                                                    ,data: {head: local_110.item
                                                           ,tail: function (local_114) {
                                                              return {tag: "NonEmpty"
                                                                     ,data: {head: local_113
                                                                            ,tail: function (local_115) {
                                                                               return {tag: "Empty"
                                                                                      ,data: {}};
                                                                            }}};
                                                           }}};
                                          }}));
                     }}};
     case "Empty":
       var local_116 = x.data;
       return {tag: "Empty",data: {}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var concat2 = function (stream3) {
   return toBytes(concat(map({stream: stream3
                             ,mapping: function (local_118) {
                                return fromBytes(local_118);
                             }})));
};
var concat1 = function (stream2) {
   return concat2(map({stream: stream2
                      ,mapping: function (local_117) {
                         return local_117;
                      }}));
};
var join = function (local_109) {
   return concat1(intersperse({stream: local_109.texts,item: local_109.sep1}));
};
var replace = function (text7) {
   return join({texts: split({text8: text7.text6,seperator: text7.from}),sep1: text7.to});
};
var unwords = function (words) {
   return join({texts: words,sep1: rts.bytesFromAscii(" ")});
};
var htmlText = function (tree3) {
   return join({texts: foldLazy({stream: map({stream: findSubTrees({which: function (local_100) {
                                                                      var x =
                                                                      local_100.root;
                                                                      switch (x.tag)
                                                                      {
                                                                        case "Data":
                                                                          var local_101 =
                                                                          x.data;
                                                                          return {tag: "True"
                                                                                 ,data: {}};
                                                                        case "Tag":
                                                                          var __tag =
                                                                          x.data;
                                                                          return _7c__7c_({l: _3d__3d_({infixl: xmlTagName(__tag)
                                                                                                       ,infixr: rts.bytesFromAscii("p")})
                                                                                          ,r: function (local_102) {
                                                                                             return _3d__3d_({infixl: __tag
                                                                                                             ,infixr: rts.bytesFromAscii("br")});
                                                                                          }});
                                                                        default:
                                                                          throw "Unhandled case? This is a type error!";
                                                                      }
                                                                   }
                                                                   ,tree1: tree3})
                                             ,mapping: function (local_103) {
                                                var x = local_103.root;
                                                switch (x.tag)
                                                {
                                                  case "Data":
                                                    var local_104 = x.data;
                                                    return {sep2: rts.bytesFromAscii(" ")
                                                           ,text9: replace({text6: replace({text6: local_104
                                                                                           ,from: rts.bytesFromAscii("&nbsp;")
                                                                                           ,to: rts.bytesFromAscii(" ")})
                                                                           ,from: rts.bytesFromAscii("&amp;")
                                                                           ,to: rts.bytesFromAscii("&")})};
                                                  case "Tag":
                                                    var local_119 = x.data;
                                                    var x = _3d__3d_({infixl: local_119
                                                                     ,infixr: rts.bytesFromAscii("br")});
                                                    switch (x.tag)
                                                    {
                                                      case "False":
                                                        var local_120 = x.data;
                                                        return {sep2: rts.bytesFromAscii("\n")
                                                               ,text9: unwords(map({stream: fromArray(local_103.subTrees)
                                                                                   ,mapping: htmlText}))};
                                                      case "True":
                                                        var local_121 = x.data;
                                                        return {sep2: rts.bytesFromAscii("")
                                                               ,text9: rts.bytesFromAscii("\n")};
                                                      default:
                                                        throw "Unhandled case? This is a type error!";
                                                    }
                                                  default:
                                                    throw "Unhandled case? This is a type error!";
                                                }
                                             }})
                                ,initial: function (local_122) {
                                   return {tag: "Empty",data: {}};
                                }
                                ,binop: function (local_123) {
                                   return {tag: "NonEmpty"
                                          ,data: {head: local_123.item.text9
                                                 ,tail: function (local_124) {
                                                    var x = local_123.rest({});
                                                    switch (x.tag)
                                                    {
                                                      case "NonEmpty":
                                                        var local_125 = x.data;
                                                        return {tag: "NonEmpty"
                                                               ,data: {head: local_123.item.sep2
                                                                      ,tail: function (local_126) {
                                                                         return {tag: "NonEmpty"
                                                                                ,data: local_125};
                                                                      }}};
                                                      case "Empty":
                                                        var local_127 = x.data;
                                                        return {tag: "Empty",data: {}};
                                                      default:
                                                        throw "Unhandled case? This is a type error!";
                                                    }
                                                 }}};
                                }})
               ,sep1: rts.bytesFromAscii("")});
};
var textAfter = function (text11) {
   var x = find({__bytes: text11.text10,slice: text11.sep3});
   switch (x.tag)
   {
     case "Just":
       var local_132 = x.data;
       return slice1({object: text11.text10
                     ,start: _2b_({infixl: local_132,infixr: length(text11.sep3)})
                     ,stop: length(text11.text10)});
     case "Nothing":
       var local_133 = x.data;
       throw {error: "Reached hole!"};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var textUntil = function (text13) {
   var x = find({__bytes: text13.text12,slice: text13.sep4});
   switch (x.tag)
   {
     case "Just":
       var pos2 = x.data;
       return slice1({object: text13.text12,start: 0.0,stop: pos2});
     case "Nothing":
       var local_134 = x.data;
       return text13.text12;
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var splitAt = function (stream7) {
   var x = _3d__3d_({infixl: stream7.index1,infixr: 0.0});
   switch (x.tag)
   {
     case "False":
       var local_137 = x.data;
       var x = stream7.stream6;
       switch (x.tag)
       {
         case "NonEmpty":
           var local_138 = x.data;
           var local_139 = splitAt({index1: _2d_({infixl: stream7.index1,infixr: 1.0})
                                   ,stream6: local_138.tail({})});
           return {prefix2: {tag: "NonEmpty"
                            ,data: {head: local_138.head
                                   ,tail: function (local_140) {
                                      return local_139.prefix2;
                                   }}}
                  ,suffix2: local_139.suffix2};
         case "Empty":
           var local_141 = x.data;
           return {prefix2: {tag: "Empty",data: {}},suffix2: {tag: "Empty",data: {}}};
         default:
           throw "Unhandled case? This is a type error!";
       }
     case "True":
       var local_142 = x.data;
       return {prefix2: {tag: "Empty",data: {}},suffix2: stream7.stream6};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var groups = function (stream5) {
   var x = stream5.stream4;
   switch (x.tag)
   {
     case "NonEmpty":
       var local_136 = x.data;
       var local_143 = splitAt({index1: stream5.size,stream6: stream5.stream4});
       return {tag: "NonEmpty"
              ,data: {head: local_143.prefix2
                     ,tail: function (local_144) {
                        return groups({size: stream5.size,stream4: local_143.suffix2});
                     }}};
     case "Empty":
       var local_145 = x.data;
       return {tag: "Empty",data: {}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var _2a_ = rts.builtins.Prelude["*"];
var ord = function (txt) { return byteAt({index: 0.0,object: txt});};
var _2265_ = rts.builtins.Prelude[">="];
var _2264_ = rts.builtins.Prelude["<="];
var _26__26_ = function (local_150) {
   var x = local_150.l;
   switch (x.tag)
   {
     case "False":
       var local_151 = x.data;
       return {tag: "False",data: {}};
     case "True":
       return local_150.r(x.data);
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var digitVal = function (local_148) {
   var x = _26__26_({l: _2265_({infixl: local_148,infixr: ord(rts.bytesFromAscii("0"))})
                    ,r: function (local_149) {
                       return _2264_({infixl: local_148
                                     ,infixr: ord(rts.bytesFromAscii("9"))});
                    }});
   switch (x.tag)
   {
     case "False":
       var local_152 = x.data;
       var x = _26__26_({l: _2265_({infixl: local_148
                                   ,infixr: ord(rts.bytesFromAscii("a"))})
                        ,r: function (local_153) {
                           return _2264_({infixl: local_148
                                         ,infixr: ord(rts.bytesFromAscii("z"))});
                        }});
       switch (x.tag)
       {
         case "False":
           var local_154 = x.data;
           var x = _26__26_({l: _2265_({infixl: local_148
                                       ,infixr: ord(rts.bytesFromAscii("A"))})
                            ,r: function (local_155) {
                               return _2264_({infixl: local_148
                                             ,infixr: ord(rts.bytesFromAscii("Z"))});
                            }});
           switch (x.tag)
           {
             case "False":
               var local_156 = x.data;
               throw {error: "Reached hole!"};
             case "True":
               var local_157 = x.data;
               return _2d_({infixl: _2b_({infixl: 10.0,infixr: local_148})
                           ,infixr: ord(rts.bytesFromAscii("A"))});
             default:
               throw "Unhandled case? This is a type error!";
           }
         case "True":
           var local_158 = x.data;
           return _2d_({infixl: _2b_({infixl: 10.0,infixr: local_148})
                       ,infixr: ord(rts.bytesFromAscii("a"))});
         default:
           throw "Unhandled case? This is a type error!";
       }
     case "True":
       var local_159 = x.data;
       return _2d_({infixl: local_148,infixr: ord(rts.bytesFromAscii("0"))});
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var fold = function (local_160) {
   var x = local_160.stream;
   switch (x.tag)
   {
     case "NonEmpty":
       var local_161 = x.data;
       return fold({stream: local_161.tail({})
                   ,initial: local_160.binop({acc: local_160.initial
                                             ,item: local_161.head})
                   ,binop: local_160.binop});
     case "Empty":
       var local_162 = x.data;
       return local_160.initial;
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var parsePosInt = function (text15) {
   return fold({stream: fromBytes(text15.text14)
               ,initial: 0.0
               ,binop: function (local_147) {
                  return _2b_({infixl: _2a_({infixl: local_147.acc,infixr: text15.base})
                              ,infixr: digitVal(local_147.item)});
               }});
};
var parseHexBytes = function (local_135) {
   return toArray(map({stream: groups({size: 2.0,stream4: fromBytes(local_135)})
                      ,mapping: function (local_146) {
                         return parsePosInt({text14: toBytes(local_146),base: 16.0});
                      }}));
};
var sqr = function (__x1) { return _2a_({infixl: __x1,infixr: __x1});};
var zipWith = function (local_165) {
   var x = local_165.streamA;
   switch (x.tag)
   {
     case "NonEmpty":
       var local_166 = x.data;
       var x = local_165.streamB;
       switch (x.tag)
       {
         case "NonEmpty":
           var local_167 = x.data;
           return {tag: "NonEmpty"
                  ,data: {head: local_165.combineAB({a: local_166.head,b: local_167.head})
                         ,tail: function (local_168) {
                            return zipWith({combineAB: local_165.combineAB
                                           ,streamB: local_167.tail({})
                                           ,streamA: local_166.tail({})});
                         }}};
         case "Empty":
           var local_169 = x.data;
           return {tag: "Empty",data: {}};
         default:
           throw "Unhandled case? This is a type error!";
       }
     case "Empty":
       var local_170 = x.data;
       return {tag: "Empty",data: {}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var sum = function (stream8) {
   return fold({stream: stream8
               ,initial: 0.0
               ,binop: function (local_171) {
                  return _2b_({infixl: local_171.item,infixr: local_171.acc});
               }});
};
var id = function (__x2) { return __x2;};
var levelColors =
toArray(map({stream: split({text8: rts.bytesFromAscii("ffffff d1e6c9 fff0c1 e4c5d4 e38587")
                           ,seperator: rts.bytesFromAscii(" ")})
            ,mapping: parseHexBytes}));
var levelForColor = function (color) {
   var x = first({that: function (local_163) {
                    return _3c_({infixl: sum(zipWith({combineAB: function (local_164) {
                                                        return sqr(_2d_({infixl: local_164.a
                                                                        ,infixr: local_164.b}));
                                                     }
                                                     ,streamB: fromArray(local_163.b)
                                                     ,streamA: fromArray(color)}))
                                ,infixr: 300.0});
                 }
                 ,stream: zipWith({combineAB: id
                                  ,streamB: fromArray(levelColors)
                                  ,streamA: iterate({initial: 0.0
                                                    ,next: function (local_172) {
                                                       return _2b_({infixl: local_172
                                                                   ,infixr: 1.0});
                                                    }})})});
   switch (x.tag)
   {
     case "Just":
       var local_173 = x.data;
       return local_173.a;
     case "Nothing":
       var local_174 = x.data;
       return 0.0;
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var parseClassLevels = function (local_87) {
   return toArray(concat(map({stream: findSubTrees({which: function (local_88) {
                                                      return isTree({tree: local_88
                                                                    ,ofTag: rts.bytesFromAscii("style")});
                                                   }
                                                   ,tree1: local_87})
                             ,mapping: function (local_99) {
                                var styleText = htmlText(item1({index: 0.0
                                                               ,object: local_99.subTrees}));
                                return concat(map({stream: split({text8: styleText
                                                                 ,seperator: rts.bytesFromAscii("}")})
                                                  ,mapping: function (local_128) {
                                                     var local_129 =
                                                     toArray(split({text8: local_128
                                                                   ,seperator: rts.bytesFromAscii("background-color:#")}));
                                                     var x =
                                                     _3d__3d_({infixl: length1(local_129)
                                                              ,infixr: 2.0});
                                                     switch (x.tag)
                                                     {
                                                       case "False":
                                                         var local_130 = x.data;
                                                         return {tag: "Empty",data: {}};
                                                       case "True":
                                                         var local_131 = x.data;
                                                         return {tag: "NonEmpty"
                                                                ,data: {head: {key: textUntil({text12: textAfter({text10: item1({index: 0.0
                                                                                                                                ,object: local_129})
                                                                                                                 ,sep3: rts.bytesFromAscii(".")})
                                                                                              ,sep4: rts.bytesFromAscii("{")})
                                                                              ,val: levelForColor(parseHexBytes(textUntil({text12: item1({index: 1.0
                                                                                                                                         ,object: local_129})
                                                                                                                          ,sep4: rts.bytesFromAscii(";")})))}
                                                                       ,tail: function (local_175) {
                                                                          return {tag: "Empty"
                                                                                 ,data: {}};
                                                                       }}};
                                                       default:
                                                         throw "Unhandled case? This is a type error!";
                                                     }
                                                  }}));
                             }})));
};
var drop = function (local_177) {
   var x = _2264_({infixl: local_177.count,infixr: 0.0});
   switch (x.tag)
   {
     case "False":
       var local_178 = x.data;
       var x = local_177.stream;
       switch (x.tag)
       {
         case "NonEmpty":
           var local_179 = x.data;
           return drop({stream: local_179.tail({})
                       ,count: _2d_({infixl: local_177.count,infixr: 1.0})});
         case "Empty":
           var local_180 = x.data;
           return {tag: "Empty",data: {}};
         default:
           throw "Unhandled case? This is a type error!";
       }
     case "True":
       var local_181 = x.data;
       return local_177.stream;
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var max = function (local_194) {
   var x = _2265_({infixl: local_194.__x3,infixr: local_194.y});
   switch (x.tag)
   {
     case "False":
       var local_195 = x.data;
       return local_194.y;
     case "True":
       var local_196 = x.data;
       return local_194.__x3;
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var nonEmptyFold = function (local_197) {
   var x = local_197.stream;
   switch (x.tag)
   {
     case "NonEmpty":
       var local_198 = x.data;
       return {tag: "Just"
              ,data: fold({stream: local_198.tail({})
                          ,initial: local_198.head
                          ,binop: local_197.binop})};
     case "Empty":
       var local_199 = x.data;
       return {tag: "Nothing",data: {}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var maximum = function (stream9) {
   return nonEmptyFold({stream: stream9
                       ,binop: function (local_193) {
                          return max({y: local_193.item,__x3: local_193.acc});
                       }});
};
var parseClassesTable = function (source1) {
   var parsedHtml = parseHtmlElem(source1).val;
   var classLevels = parseClassLevels(parsedHtml);
   var table = function () {
                  var x = drop({stream: findSubTrees({which: function (local_176) {
                                                        return isTree({tree: local_176
                                                                      ,ofTag: rts.bytesFromAscii("table")});
                                                     }
                                                     ,tree1: parsedHtml})
                               ,count: 1.0});
                  switch (x.tag)
                  {
                    case "NonEmpty":
                      var local_182 = x.data;
                      return local_182.head;
                    case "Empty":
                      var local_183 = x.data;
                      throw {error: "Reached hole!"};
                    default:
                      throw "Unhandled case? This is a type error!";
                  }
               }();
   return map({stream: drop({stream: findSubTrees({which: function (local_184) {
                                                     return isTree({tree: local_184
                                                                   ,ofTag: rts.bytesFromAscii("tr")});
                                                  }
                                                  ,tree1: table})
                            ,count: 1.0})
              ,mapping: function (local_185) {
                 var cells = toArray(findSubTrees({which: function (local_186) {
                                                     return isTree({tree: local_186
                                                                   ,ofTag: rts.bytesFromAscii("td")});
                                                  }
                                                  ,tree1: local_185}));
                 var whenItems = item1({index: 0.0,object: cells}).subTrees;
                 return {description: {eng: htmlText(item1({index: 4.0,object: cells}))
                                      ,heb: htmlText(item1({index: 7.0,object: cells}))}
                        ,level: function () {
                           var x = item1({index: 0.0,object: cells}).root;
                           switch (x.tag)
                           {
                             case "Data":
                               var local_187 = x.data;
                               throw {error: "Reached hole!"};
                             case "Tag":
                               var local_188 = x.data;
                               var x =
                               maximum(map({stream: split({text8: textUntil({text12: textAfter({text10: local_188
                                                                                               ,sep3: rts.bytesFromAscii(" class=\"")})
                                                                            ,sep4: rts.bytesFromAscii("\"")})
                                                          ,seperator: rts.bytesFromAscii(" ")})
                                           ,mapping: function (local_189) {
                                              var x = first({that: function (local_190) {
                                                               return _3d__3d_({infixl: local_189
                                                                               ,infixr: local_190.key});
                                                            }
                                                            ,stream: fromArray(classLevels)});
                                              switch (x.tag)
                                              {
                                                case "Just":
                                                  var local_191 = x.data;
                                                  return local_191.val;
                                                case "Nothing":
                                                  var local_192 = x.data;
                                                  return 0.0;
                                                default:
                                                  throw "Unhandled case? This is a type error!";
                                              }
                                           }}));
                               switch (x.tag)
                               {
                                 case "Just":
                                   return id(x.data);
                                 case "Nothing":
                                   var local_200 = x.data;
                                   throw {error: "Reached hole!"};
                                 default:
                                   throw "Unhandled case? This is a type error!";
                               }
                             default:
                               throw "Unhandled case? This is a type error!";
                           }
                        }()
                        ,prereqs: {eng: htmlText(item1({index: 5.0,object: cells}))
                                  ,heb: htmlText(item1({index: 6.0,object: cells}))}
                        ,where: htmlText(item1({index: 1.0,object: cells}))
                        ,what: {eng: htmlText(item1({index: 3.0,object: cells}))
                               ,heb: htmlText(item1({index: 8.0,object: cells}))}
                        ,when: {day: htmlText(item1({index: 0.0,object: whenItems}))
                               ,timeOfDay: htmlText(item1({index: 1.0
                                                          ,object: whenItems}))}
                        ,who: htmlText(item1({index: 2.0,object: cells}))};
              }});
};
var filter = function (local_202) {
   var x = local_202.stream;
   switch (x.tag)
   {
     case "NonEmpty":
       var local_203 = x.data;
       var rest1 = function (local_204) {
          return filter({stream: local_203.tail({}),keep: local_202.keep});
       };
       var x = local_202.keep(local_203.head);
       switch (x.tag)
       {
         case "False":
           var local_205 = x.data;
           return rest1({});
         case "True":
           var local_206 = x.data;
           return {tag: "NonEmpty",data: {head: local_203.head,tail: rest1}};
         default:
           throw "Unhandled case? This is a type error!";
       }
     case "Empty":
       var local_207 = x.data;
       return {tag: "Empty",data: {}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var langEnglish =
{header: toArray(split({text8: rts.bytesFromAscii("Where Who What Pre-Reqs")
                       ,seperator: rts.bytesFromAscii(" ")}))
,dir: rts.bytesFromAscii("ltr")
,fromEng: id
,getLang: function (local_208) {
   return local_208.eng;
}};
var classesTableStyle =
rts.bytesFromAscii(".level-1 { background-color: #d9ead3; }\n.level-2 { background-color: #fff2cc; }\n.level-3 { background-color: #ead1dc; }\n.level-4 { background-color: #ea9999; }\ntable { border-collapse: collapse; }\nth {\n  font-size: 125%;\n  padding: 5pt;\n}\ntd {\n  border: 2pt solid white;\n  padding: 3pt;\n}\np {\n  margin-top: 1px;\n  margin-bottom: 1px;\n}\n.when {\n  font-size: 150%;\n  padding: 5pt;\n  border-top: 3pt solid black;\n}\n.workshop { font-weight: bold; }\n.where { white-space: nowrap; }\n");
var xmlTagWithData = function (__data) {
   return {root: {tag: "Tag",data: __data.__tag1}
          ,subTrees: toArray({tag: "NonEmpty"
                             ,data: {head: leaf({tag: "Data",data: __data.contents})
                                    ,tail: function (local_210) {
                                       return {tag: "Empty",data: {}};
                                    }}})};
};
var classesTableHeader = function (lang1) {
   return {root: {tag: "Tag",data: rts.bytesFromAscii("tr")}
          ,subTrees: toArray(map({stream: fromArray(lang1.header)
                                 ,mapping: function (local_209) {
                                    return xmlTagWithData({__tag1: rts.bytesFromAscii("th")
                                                          ,contents: local_209});
                                 }}))};
};
var group = function (stream11) {
   var x = stream11.stream10;
   switch (x.tag)
   {
     case "NonEmpty":
       var local_213 = x.data;
       var single = function (local_214) {
          return {tag: "NonEmpty"
                 ,data: {head: local_213.head
                        ,tail: function (local_215) {
                           return {tag: "Empty",data: {}};
                        }}};
       };
       var t = local_213.tail({});
       var x = t;
       switch (x.tag)
       {
         case "NonEmpty":
           var local_216 = x.data;
           var rest2 = function (local_217) {
              return group({stream10: t,on: stream11.on});
           };
           var x = _3d__3d_({infixl: stream11.on(local_213.head)
                            ,infixr: stream11.on(local_216.head)});
           switch (x.tag)
           {
             case "False":
               var local_218 = x.data;
               return {tag: "NonEmpty",data: {head: single({}),tail: rest2}};
             case "True":
               var local_219 = x.data;
               var x = rest2({});
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_220 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: {tag: "NonEmpty"
                                        ,data: {head: local_213.head
                                               ,tail: function (local_221) {
                                                  return local_220.head;
                                               }}}
                                 ,tail: local_220.tail}};
                 case "Empty":
                   var local_222 = x.data;
                   throw {error: "Reached hole!"};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             default:
               throw "Unhandled case? This is a type error!";
           }
         case "Empty":
           var local_223 = x.data;
           return {tag: "NonEmpty"
                  ,data: {head: single({})
                         ,tail: function (local_224) {
                            return {tag: "Empty",data: {}};
                         }}};
         default:
           throw "Unhandled case? This is a type error!";
       }
     case "Empty":
       var local_225 = x.data;
       return {tag: "Empty",data: {}};
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var classesGroupTimeHeader = function (local_226) {
   var w = function () {
              var x = local_226.group2;
              switch (x.tag)
              {
                case "NonEmpty":
                  var local_227 = x.data;
                  return local_227.head.when;
                case "Empty":
                  var local_228 = x.data;
                  throw {error: "Reached hole!"};
                default:
                  throw "Unhandled case? This is a type error!";
              }
           }();
   return xmlTagWithData({__tag1: rts.bytesFromAscii("td colspan=4 class=\"when\"")
                         ,contents: _2b__2b_({a: _2b__2b_({a: local_226.lang2.fromEng(w.day)
                                                          ,b: rts.bytesFromAscii(" ")})
                                             ,b: w.timeOfDay})});
};
var _2f__2f_ = rts.builtins.Prelude["div"];
var _25_ = rts.builtins.Prelude["mod"];
var digits = function (__number2) {
   return map({stream: take({stream: iterate({initial: __number2.__number1
                                             ,next: function (local_234) {
                                                return _2f__2f_({infixl: local_234
                                                                ,infixr: __number2.base1});
                                             }})
                            ,__while: function (local_235) {
                               return _3e_({infixl: local_235,infixr: 0.0});
                            }})
              ,mapping: function (local_236) {
                 return _25_({infixl: local_236,infixr: __number2.base1});
              }});
};
var reverse = function (stream12) {
   return fold({stream: stream12
               ,initial: {tag: "Empty",data: {}}
               ,binop: function (local_237) {
                  return {tag: "NonEmpty"
                         ,data: {head: local_237.item
                                ,tail: function (local_238) {
                                   return local_237.acc;
                                }}};
               }});
};
var negate = rts.builtins.Prelude["negate"];
var showInt = function (__number) {
   var x = _3d__3d_({infixl: __number,infixr: 0.0});
   switch (x.tag)
   {
     case "False":
       var local_232 = x.data;
       var x = _3c_({infixl: __number,infixr: 0.0});
       switch (x.tag)
       {
         case "False":
           var local_233 = x.data;
           return toBytes(map({stream: reverse(digits({__number1: __number,base1: 10.0}))
                              ,mapping: function (local_239) {
                                 return _2b_({infixl: local_239,infixr: 48.0});
                              }}));
         case "True":
           var local_240 = x.data;
           return _2b__2b_({a: rts.bytesFromAscii("-"),b: showInt(negate(__number))});
         default:
           throw "Unhandled case? This is a type error!";
       }
     case "True":
       var local_241 = x.data;
       return rts.bytesFromAscii("0");
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var classRow = function (local_231) {
   return {root: {tag: "Tag"
                 ,data: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("tr class=\"level-")
                                              ,b: showInt(local_231.__class.level)})
                                 ,b: rts.bytesFromAscii("\"")})}
          ,subTrees: toArray({tag: "NonEmpty"
                             ,data: {head: function (where1) {
                                       return {root: {tag: "Tag"
                                                     ,data: rts.bytesFromAscii("td class=\"where\"")}
                                              ,subTrees: toArray(function () {
                                                 var x = find({__bytes: where1
                                                              ,slice: rts.bytesFromAscii(" (")});
                                                 switch (x.tag)
                                                 {
                                                   case "Just":
                                                     var local_242 = x.data;
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: xmlTagWithData({__tag1: rts.bytesFromAscii("p")
                                                                                         ,contents: slice1({object: where1
                                                                                                           ,start: 0.0
                                                                                                           ,stop: local_242})})
                                                                   ,tail: function (local_243) {
                                                                      return {tag: "NonEmpty"
                                                                             ,data: {head: xmlTagWithData({__tag1: rts.bytesFromAscii("p")
                                                                                                          ,contents: slice1({object: where1
                                                                                                                            ,start: _2b_({infixl: local_242
                                                                                                                                         ,infixr: 1.0})
                                                                                                                            ,stop: length(where1)})})
                                                                                    ,tail: function (local_244) {
                                                                                       return {tag: "Empty"
                                                                                              ,data: {}};
                                                                                    }}};
                                                                   }}};
                                                   case "Nothing":
                                                     var local_245 = x.data;
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: leaf({tag: "Data"
                                                                               ,data: where1})
                                                                   ,tail: function (local_246) {
                                                                      return {tag: "Empty"
                                                                             ,data: {}};
                                                                   }}};
                                                   default:
                                                     throw "Unhandled case? This is a type error!";
                                                 }
                                              }())};
                                    }(local_231.lang3.fromEng(local_231.__class.where))
                                    ,tail: function (local_247) {
                                       return {tag: "NonEmpty"
                                              ,data: {head: xmlTagWithData({__tag1: rts.bytesFromAscii("td")
                                                                           ,contents: local_231.lang3.fromEng(local_231.__class.who)})
                                                     ,tail: function (local_248) {
                                                        var desc =
                                                        local_231.lang3.getLang(local_231.__class.description);
                                                        var what1 =
                                                        local_231.lang3.getLang(local_231.__class.what);
                                                        return {tag: "NonEmpty"
                                                               ,data: {head: {root: {tag: "Tag"
                                                                                    ,data: rts.bytesFromAscii("td")}
                                                                             ,subTrees: toArray(function () {
                                                                                var x =
                                                                                _3d__3d_({infixl: desc
                                                                                         ,infixr: rts.bytesFromAscii("")});
                                                                                switch (x.tag)
                                                                                {
                                                                                  case "False":
                                                                                    var local_249 =
                                                                                    x.data;
                                                                                    return {tag: "NonEmpty"
                                                                                           ,data: {head: xmlTagWithData({__tag1: rts.bytesFromAscii("p class=\"workshop\"")
                                                                                                                        ,contents: _2b__2b_({a: what1
                                                                                                                                            ,b: rts.bytesFromAscii(":")})})
                                                                                                  ,tail: function (local_250) {
                                                                                                     return {tag: "NonEmpty"
                                                                                                            ,data: {head: xmlTagWithData({__tag1: rts.bytesFromAscii("p")
                                                                                                                                         ,contents: desc})
                                                                                                                   ,tail: function (local_251) {
                                                                                                                      return {tag: "Empty"
                                                                                                                             ,data: {}};
                                                                                                                   }}};
                                                                                                  }}};
                                                                                  case "True":
                                                                                    var local_252 =
                                                                                    x.data;
                                                                                    return {tag: "NonEmpty"
                                                                                           ,data: {head: leaf({tag: "Data"
                                                                                                              ,data: what1})
                                                                                                  ,tail: function (local_253) {
                                                                                                     return {tag: "Empty"
                                                                                                            ,data: {}};
                                                                                                  }}};
                                                                                  default:
                                                                                    throw "Unhandled case? This is a type error!";
                                                                                }
                                                                             }())}
                                                                      ,tail: function (local_254) {
                                                                         return {tag: "NonEmpty"
                                                                                ,data: {head: xmlTagWithData({__tag1: rts.bytesFromAscii("td")
                                                                                                             ,contents: local_231.lang3.getLang(local_231.__class.prereqs)})
                                                                                       ,tail: function (local_255) {
                                                                                          return {tag: "Empty"
                                                                                                 ,data: {}};
                                                                                       }}};
                                                                      }}};
                                                     }}};
                                    }}})};
};
var htmlDoc = function (local_257) {
   return {root: {tag: "Tag",data: rts.bytesFromAscii("html")}
          ,subTrees: toArray({tag: "NonEmpty"
                             ,data: {head: {root: {tag: "Tag"
                                                  ,data: rts.bytesFromAscii("head")}
                                           ,subTrees: toArray({tag: "NonEmpty"
                                                              ,data: {head: leaf({tag: "Tag"
                                                                                 ,data: rts.bytesFromAscii("meta charset=\"utf-8\"")})
                                                                     ,tail: function (local_258) {
                                                                        return {tag: "NonEmpty"
                                                                               ,data: {head: {root: {tag: "Tag"
                                                                                                    ,data: rts.bytesFromAscii("style type=\"text/css\"")}
                                                                                             ,subTrees: toArray({tag: "NonEmpty"
                                                                                                                ,data: {head: leaf({tag: "Data"
                                                                                                                                   ,data: local_257.style})
                                                                                                                       ,tail: function (local_259) {
                                                                                                                          return {tag: "Empty"
                                                                                                                                 ,data: {}};
                                                                                                                       }}})}
                                                                                      ,tail: function (local_260) {
                                                                                         return {tag: "Empty"
                                                                                                ,data: {}};
                                                                                      }}};
                                                                     }}})}
                                    ,tail: function (local_261) {
                                       return {tag: "NonEmpty"
                                              ,data: {head: local_257.body
                                                     ,tail: function (local_262) {
                                                        return {tag: "Empty",data: {}};
                                                     }}};
                                    }}})};
};
var formatClassesTable = function (classes2) {
   return htmlDoc({style: classesTableStyle
                  ,body: {root: {tag: "Tag"
                                ,data: _2b__2b_({a: _2b__2b_({a: rts.bytesFromAscii("body dir=\"")
                                                             ,b: classes2.lang.dir})
                                                ,b: rts.bytesFromAscii("\"")})}
                         ,subTrees: toArray({tag: "NonEmpty"
                                            ,data: {head: {root: {tag: "Tag"
                                                                 ,data: rts.bytesFromAscii("table")}
                                                          ,subTrees: toArray({tag: "NonEmpty"
                                                                             ,data: {head: classesTableHeader(classes2.lang)
                                                                                    ,tail: function (local_211) {
                                                                                       return concat(map({stream: group({stream10: classes2.classes1
                                                                                                                        ,on: function (local_212) {
                                                                                                                           return local_212.when;
                                                                                                                        }})
                                                                                                         ,mapping: function (group1) {
                                                                                                            return {tag: "NonEmpty"
                                                                                                                   ,data: {head: classesGroupTimeHeader({lang2: classes2.lang
                                                                                                                                                        ,group2: group1})
                                                                                                                          ,tail: function (local_229) {
                                                                                                                             return map({stream: group1
                                                                                                                                        ,mapping: function (local_230) {
                                                                                                                                           return classRow({__class: local_230
                                                                                                                                                           ,lang3: classes2.lang});
                                                                                                                                        }});
                                                                                                                          }}};
                                                                                                         }}));
                                                                                    }}})}
                                                   ,tail: function (local_256) {
                                                      return {tag: "Empty",data: {}};
                                                   }}})}});
};
var htmlToText = function (local_263) {
   var x = local_263.root;
   switch (x.tag)
   {
     case "Data":
       return id(x.data);
     case "Tag":
       var __tag2 = x.data;
       return join({texts: {tag: "NonEmpty"
                           ,data: {head: rts.bytesFromAscii("<")
                                  ,tail: function (local_264) {
                                     return {tag: "NonEmpty"
                                            ,data: {head: __tag2
                                                   ,tail: function (local_265) {
                                                      var sub = local_263.subTrees;
                                                      var x =
                                                      _3d__3d_({infixl: length1(sub)
                                                               ,infixr: 0.0});
                                                      switch (x.tag)
                                                      {
                                                        case "False":
                                                          var local_266 = x.data;
                                                          return {tag: "NonEmpty"
                                                                 ,data: {head: rts.bytesFromAscii(">")
                                                                        ,tail: function (local_267) {
                                                                           return _2b__2b_2({l: map({stream: fromArray(sub)
                                                                                                    ,mapping: htmlToText})
                                                                                            ,r: function (local_268) {
                                                                                               return {tag: "NonEmpty"
                                                                                                      ,data: {head: rts.bytesFromAscii("</")
                                                                                                             ,tail: function (local_269) {
                                                                                                                return {tag: "NonEmpty"
                                                                                                                       ,data: {head: xmlTagName(__tag2)
                                                                                                                              ,tail: function (local_270) {
                                                                                                                                 return {tag: "NonEmpty"
                                                                                                                                        ,data: {head: rts.bytesFromAscii(">")
                                                                                                                                               ,tail: function (local_271) {
                                                                                                                                                  return {tag: "Empty"
                                                                                                                                                         ,data: {}};
                                                                                                                                               }}};
                                                                                                                              }}};
                                                                                                             }}};
                                                                                            }});
                                                                        }}};
                                                        case "True":
                                                          var local_272 = x.data;
                                                          return {tag: "NonEmpty"
                                                                 ,data: {head: rts.bytesFromAscii("/>")
                                                                        ,tail: function (local_273) {
                                                                           return {tag: "Empty"
                                                                                  ,data: {}};
                                                                        }}};
                                                        default:
                                                          throw "Unhandled case? This is a type error!";
                                                      }
                                                   }}};
                                  }}}
                   ,sep1: rts.bytesFromAscii("")});
     default:
       throw "Unhandled case? This is a type error!";
   }
};
var hebrewTranslations = toArray(zipWith({combineAB: id
                                         ,streamB: split({text8: rts.bytes([215
                                                                           ,168
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,169
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,159
                                                                           ,59
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
                                                                           ,59
                                                                           ,215
                                                                           ,169
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,169
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,215
                                                                           ,169
                                                                           ,215
                                                                           ,145
                                                                           ,215
                                                                           ,170
                                                                           ,59
                                                                           ,215
                                                                           ,145
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,148
                                                                           ,59
                                                                           ,215
                                                                           ,169
                                                                           ,215
                                                                           ,152
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,151
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,157
                                                                           ,32
                                                                           ,40
                                                                           ,215
                                                                           ,151
                                                                           ,215
                                                                           ,147
                                                                           ,215
                                                                           ,168
                                                                           ,32
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,166
                                                                           ,215
                                                                           ,162
                                                                           ,215
                                                                           ,153
                                                                           ,41
                                                                           ,59
                                                                           ,215
                                                                           ,164
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,167
                                                                           ,215
                                                                           ,152
                                                                           ,32
                                                                           ,40
                                                                           ,215
                                                                           ,151
                                                                           ,215
                                                                           ,147
                                                                           ,215
                                                                           ,168
                                                                           ,32
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,151
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,153
                                                                           ,41
                                                                           ,59
                                                                           ,215
                                                                           ,147
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,157
                                                                           ,59
                                                                           ,215
                                                                           ,150
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,156
                                                                           ,215
                                                                           ,148
                                                                           ,59
                                                                           ,215
                                                                           ,147
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,149
                                                                           ,32
                                                                           ,215
                                                                           ,147
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,32
                                                                           ,215
                                                                           ,149
                                                                           ,59
                                                                           ,215
                                                                           ,155
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,161
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,161
                                                                           ,59
                                                                           ,215
                                                                           ,164
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,152
                                                                           ,215
                                                                           ,168
                                                                           ,59
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,167
                                                                           ,215
                                                                           ,148
                                                                           ,59
                                                                           ,215
                                                                           ,156
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,167
                                                                           ,215
                                                                           ,161
                                                                           ,59
                                                                           ,215
                                                                           ,146
                                                                           ,215
                                                                           ,179
                                                                           ,215
                                                                           ,161
                                                                           ,215
                                                                           ,156
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,159
                                                                           ,59
                                                                           ,215
                                                                           ,146
                                                                           ,215
                                                                           ,156
                                                                           ,215
                                                                           ,159
                                                                           ,59
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,156
                                                                           ,215
                                                                           ,159
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,146
                                                                           ,215
                                                                           ,179
                                                                           ,215
                                                                           ,156
                                                                           ,215
                                                                           ,148
                                                                           ,59
                                                                           ,215
                                                                           ,146
                                                                           ,215
                                                                           ,179
                                                                           ,215
                                                                           ,161
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,156
                                                                           ,59
                                                                           ,215
                                                                           ,170
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,156
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,149
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,145
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,168
                                                                           ,59
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,162
                                                                           ,215
                                                                           ,156
                                                                           ,59
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,162
                                                                           ,215
                                                                           ,157
                                                                           ,59
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,162
                                                                           ,215
                                                                           ,148
                                                                           ,59
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,168
                                                                           ,59
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,170
                                                                           ,215
                                                                           ,157
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,156
                                                                           ,215
                                                                           ,162
                                                                           ,215
                                                                           ,147
                                                                           ,59
                                                                           ,215
                                                                           ,146
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,144
                                                                           ,59
                                                                           ,215
                                                                           ,147
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,170
                                                                           ,59
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,146
                                                                           ,215
                                                                           ,148
                                                                           ,59
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,162
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,145
                                                                           ,59
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,168
                                                                           ,59
                                                                           ,215
                                                                           ,169
                                                                           ,215
                                                                           ,156
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,148
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,145
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,148
                                                                           ,59
                                                                           ,215
                                                                           ,152
                                                                           ,215
                                                                           ,156
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,161
                                                                           ,215
                                                                           ,163
                                                                           ,59
                                                                           ,215
                                                                           ,162
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,145
                                                                           ,215
                                                                           ,168
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,170
                                                                           ,215
                                                                           ,159
                                                                           ,59
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,169
                                                                           ,215
                                                                           ,148
                                                                           ,59
                                                                           ,215
                                                                           ,164
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,161
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,161
                                                                           ,59
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,159
                                                                           ,59
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,168
                                                                           ,59
                                                                           ,215
                                                                           ,155
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,156
                                                                           ,59
                                                                           ,215
                                                                           ,162
                                                                           ,215
                                                                           ,160
                                                                           ,215
                                                                           ,145
                                                                           ,215
                                                                           ,156
                                                                           ,59
                                                                           ,215
                                                                           ,162
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,170
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,170
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,145
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,152
                                                                           ,215
                                                                           ,156
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,156
                                                                           ,215
                                                                           ,148
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,149
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,149
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,159
                                                                           ,59
                                                                           ,215
                                                                           ,144
                                                                           ,215
                                                                           ,147
                                                                           ,215
                                                                           ,157
                                                                           ,59
                                                                           ,215
                                                                           ,158
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,215
                                                                           ,169
                                                                           ,215
                                                                           ,153
                                                                           ,59
                                                                           ,215
                                                                           ,169
                                                                           ,215
                                                                           ,153
                                                                           ,215
                                                                           ,168
                                                                           ,215
                                                                           ,153])
                                                         ,seperator: rts.bytesFromAscii(";")})
                                         ,streamA: split({text8: rts.bytes([83
                                                                           ,117
                                                                           ,110
                                                                           ,100
                                                                           ,97
                                                                           ,121
                                                                           ,59
                                                                           ,84
                                                                           ,104
                                                                           ,117
                                                                           ,114
                                                                           ,115
                                                                           ,100
                                                                           ,97
                                                                           ,121
                                                                           ,59
                                                                           ,70
                                                                           ,114
                                                                           ,105
                                                                           ,100
                                                                           ,97
                                                                           ,121
                                                                           ,59
                                                                           ,83
                                                                           ,97
                                                                           ,116
                                                                           ,117
                                                                           ,114
                                                                           ,100
                                                                           ,97
                                                                           ,121
                                                                           ,59
                                                                           ,83
                                                                           ,116
                                                                           ,97
                                                                           ,103
                                                                           ,101
                                                                           ,59
                                                                           ,82
                                                                           ,117
                                                                           ,103
                                                                           ,115
                                                                           ,32
                                                                           ,40
                                                                           ,109
                                                                           ,105
                                                                           ,100
                                                                           ,100
                                                                           ,108
                                                                           ,101
                                                                           ,32
                                                                           ,114
                                                                           ,111
                                                                           ,111
                                                                           ,109
                                                                           ,41
                                                                           ,59
                                                                           ,80
                                                                           ,97
                                                                           ,114
                                                                           ,113
                                                                           ,117
                                                                           ,101
                                                                           ,116
                                                                           ,32
                                                                           ,40
                                                                           ,98
                                                                           ,97
                                                                           ,99
                                                                           ,107
                                                                           ,32
                                                                           ,114
                                                                           ,111
                                                                           ,111
                                                                           ,109
                                                                           ,41
                                                                           ,59
                                                                           ,68
                                                                           ,111
                                                                           ,109
                                                                           ,101
                                                                           ,59
                                                                           ,90
                                                                           ,111
                                                                           ,111
                                                                           ,108
                                                                           ,97
                                                                           ,59
                                                                           ,68
                                                                           ,117
                                                                           ,111
                                                                           ,32
                                                                           ,68
                                                                           ,105
                                                                           ,101
                                                                           ,59
                                                                           ,32
                                                                           ,38
                                                                           ,32
                                                                           ,59
                                                                           ,67
                                                                           ,104
                                                                           ,114
                                                                           ,105
                                                                           ,115
                                                                           ,59
                                                                           ,73
                                                                           ,114
                                                                           ,105
                                                                           ,115
                                                                           ,59
                                                                           ,80
                                                                           ,101
                                                                           ,116
                                                                           ,101
                                                                           ,114
                                                                           ,59
                                                                           ,77
                                                                           ,97
                                                                           ,114
                                                                           ,105
                                                                           ,101
                                                                           ,107
                                                                           ,101
                                                                           ,59
                                                                           ,76
                                                                           ,117
                                                                           ,120
                                                                           ,59
                                                                           ,74
                                                                           ,101
                                                                           ,115
                                                                           ,115
                                                                           ,97
                                                                           ,108
                                                                           ,121
                                                                           ,110
                                                                           ,59
                                                                           ,71
                                                                           ,108
                                                                           ,101
                                                                           ,110
                                                                           ,59
                                                                           ,77
                                                                           ,97
                                                                           ,114
                                                                           ,106
                                                                           ,111
                                                                           ,108
                                                                           ,101
                                                                           ,105
                                                                           ,110
                                                                           ,59
                                                                           ,65
                                                                           ,110
                                                                           ,103
                                                                           ,101
                                                                           ,108
                                                                           ,97
                                                                           ,59
                                                                           ,74
                                                                           ,101
                                                                           ,115
                                                                           ,115
                                                                           ,101
                                                                           ,59
                                                                           ,78
                                                                           ,111
                                                                           ,195
                                                                           ,171
                                                                           ,108
                                                                           ,59
                                                                           ,84
                                                                           ,111
                                                                           ,109
                                                                           ,105
                                                                           ,108
                                                                           ,105
                                                                           ,111
                                                                           ,59
                                                                           ,65
                                                                           ,118
                                                                           ,110
                                                                           ,101
                                                                           ,114
                                                                           ,59
                                                                           ,89
                                                                           ,97
                                                                           ,101
                                                                           ,108
                                                                           ,59
                                                                           ,89
                                                                           ,111
                                                                           ,110
                                                                           ,105
                                                                           ,59
                                                                           ,89
                                                                           ,97
                                                                           ,110
                                                                           ,97
                                                                           ,105
                                                                           ,59
                                                                           ,78
                                                                           ,111
                                                                           ,97
                                                                           ,109
                                                                           ,59
                                                                           ,78
                                                                           ,111
                                                                           ,105
                                                                           ,59
                                                                           ,78
                                                                           ,111
                                                                           ,97
                                                                           ,59
                                                                           ,89
                                                                           ,97
                                                                           ,105
                                                                           ,114
                                                                           ,59
                                                                           ,82
                                                                           ,111
                                                                           ,116
                                                                           ,101
                                                                           ,109
                                                                           ,59
                                                                           ,69
                                                                           ,108
                                                                           ,97
                                                                           ,100
                                                                           ,59
                                                                           ,71
                                                                           ,117
                                                                           ,121
                                                                           ,59
                                                                           ,68
                                                                           ,97
                                                                           ,110
                                                                           ,105
                                                                           ,59
                                                                           ,73
                                                                           ,114
                                                                           ,105
                                                                           ,116
                                                                           ,59
                                                                           ,78
                                                                           ,111
                                                                           ,103
                                                                           ,97
                                                                           ,59
                                                                           ,82
                                                                           ,111
                                                                           ,105
                                                                           ,59
                                                                           ,89
                                                                           ,97
                                                                           ,114
                                                                           ,105
                                                                           ,118
                                                                           ,59
                                                                           ,78
                                                                           ,105
                                                                           ,114
                                                                           ,59
                                                                           ,83
                                                                           ,104
                                                                           ,108
                                                                           ,111
                                                                           ,109
                                                                           ,111
                                                                           ,59
                                                                           ,65
                                                                           ,118
                                                                           ,105
                                                                           ,97
                                                                           ,59
                                                                           ,84
                                                                           ,97
                                                                           ,108
                                                                           ,59
                                                                           ,65
                                                                           ,115
                                                                           ,115
                                                                           ,97
                                                                           ,102
                                                                           ,59
                                                                           ,73
                                                                           ,110
                                                                           ,98
                                                                           ,97
                                                                           ,114
                                                                           ,59
                                                                           ,79
                                                                           ,114
                                                                           ,105
                                                                           ,59
                                                                           ,69
                                                                           ,105
                                                                           ,116
                                                                           ,97
                                                                           ,110
                                                                           ,59
                                                                           ,77
                                                                           ,111
                                                                           ,115
                                                                           ,104
                                                                           ,101
                                                                           ,59
                                                                           ,70
                                                                           ,114
                                                                           ,97
                                                                           ,110
                                                                           ,99
                                                                           ,105
                                                                           ,115
                                                                           ,59
                                                                           ,82
                                                                           ,121
                                                                           ,97
                                                                           ,110
                                                                           ,59
                                                                           ,77
                                                                           ,111
                                                                           ,114
                                                                           ,59
                                                                           ,67
                                                                           ,97
                                                                           ,114
                                                                           ,109
                                                                           ,101
                                                                           ,108
                                                                           ,59
                                                                           ,73
                                                                           ,110
                                                                           ,98
                                                                           ,97
                                                                           ,108
                                                                           ,59
                                                                           ,65
                                                                           ,109
                                                                           ,105
                                                                           ,116
                                                                           ,109
                                                                           ,105
                                                                           ,116
                                                                           ,59
                                                                           ,65
                                                                           ,118
                                                                           ,105
                                                                           ,116
                                                                           ,97
                                                                           ,108
                                                                           ,59
                                                                           ,65
                                                                           ,121
                                                                           ,97
                                                                           ,108
                                                                           ,97
                                                                           ,59
                                                                           ,65
                                                                           ,121
                                                                           ,111
                                                                           ,59
                                                                           ,79
                                                                           ,114
                                                                           ,101
                                                                           ,110
                                                                           ,59
                                                                           ,65
                                                                           ,100
                                                                           ,97
                                                                           ,109
                                                                           ,59
                                                                           ,77
                                                                           ,101
                                                                           ,105
                                                                           ,59
                                                                           ,83
                                                                           ,104
                                                                           ,97
                                                                           ,105
                                                                           ,59
                                                                           ,83
                                                                           ,104
                                                                           ,105
                                                                           ,114
                                                                           ,105])
                                                         ,seperator: rts.bytesFromAscii(";")})}));
var langHebrew = {header: toArray(split({text8: rts.bytes([215
                                                          ,144
                                                          ,215
                                                          ,153
                                                          ,215
                                                          ,164
                                                          ,215
                                                          ,148
                                                          ,59
                                                          ,215
                                                          ,158
                                                          ,215
                                                          ,153
                                                          ,59
                                                          ,215
                                                          ,158
                                                          ,215
                                                          ,148
                                                          ,59
                                                          ,215
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
                                                          ,157])
                                        ,seperator: rts.bytesFromAscii(";")}))
                 ,dir: rts.bytesFromAscii("rtl")
                 ,fromEng: function (local_274) {
                    return fold({stream: fromArray(hebrewTranslations)
                                ,initial: local_274
                                ,binop: function (local_275) {
                                   return join({texts: split({text8: local_275.acc
                                                             ,seperator: local_275.item.a})
                                               ,sep1: local_275.item.b});
                                }});
                 }
                 ,getLang: function (local_276) {
                    var x = _3d__3d_({infixl: local_276.heb
                                     ,infixr: rts.bytesFromAscii("")});
                    switch (x.tag)
                    {
                      case "False":
                        var local_277 = x.data;
                        return local_276.heb;
                      case "True":
                        var local_278 = x.data;
                        return local_276.eng;
                      default:
                        throw "Unhandled case? This is a type error!";
                    }
                 }};
var makeSchedules = function (source) {
   var classes = toArray(parseClassesTable(source));
   var make = function (filterLevel) {
      var filtered = filter({stream: fromArray(classes)
                            ,keep: function (local_201) {
                               return filterLevel(local_201.level);
                            }});
      var langEng__INFER__BUG__WORKAROUND = langEnglish;
      return {eng: htmlToText(formatClassesTable({lang: langEng__INFER__BUG__WORKAROUND
                                                 ,classes1: filtered}))
             ,heb: htmlToText(formatClassesTable({lang: langHebrew,classes1: filtered}))};
   };
   return {all: make(function (local_279) {
             return {tag: "True",data: {}};
          })
          ,lvl012: make(function (local_280) {
             return _2264_({infixl: local_280,infixr: 2.0});
          })
          ,lvl23: make(function (local_281) {
             return _26__26_({l: _2265_({infixl: local_281,infixr: 2.0})
                             ,r: function (local_282) {
                                return _2264_({infixl: local_281,infixr: 3.0});
                             }});
          })
          ,lvl34: make(function (local_283) {
             return _2265_({infixl: local_283,infixr: 3.0});
          })};
};
var repl = makeSchedules;
rts.logRepl(repl);
module.exports = repl;
