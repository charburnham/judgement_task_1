// Experiment 3 Stimuli: "Controlling for plugs"
// Breheny, Katsos & Williams (2006), Cognition 100, 434-463
//
// 3 conditions:
//   - upper_bound_some: Upper-Bound context with 'some' (implicature expected)
//   - upper_bound_only_some: Upper-Bound context with 'only some' (explicit control)
//   - lower_bound_some: Lower-Bound context with 'some' (no implicature expected)
//
// Segments are presented one at a time. "||" marks sentence boundaries
// (1000ms pause inserted). The trigger phrase ("some of the Fs") is always
// the last segment of the trigger-containing sentence (sentence-final
// position). The target phrase ("the rest"/"the others") is always the first
// segment of the following sentence.

const criticalItems = [
  // ---- Items 1-4: from Appendix A.3 (English translations) ----
  {
    id: 1,
    conditions: {
      upper_bound_some: {
        segments: [
          "Mary asked John",
          "whether he intended to host",
          "all his relatives",
          "in his tiny apartment.",
          "||",
          "John replied",
          "that he intended to host",
          "some of his relatives.",
          "||",
          "The rest",
          "would stay",
          "in a nearby hotel."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "Mary asked John",
          "whether he intended to host",
          "all his relatives",
          "in his tiny apartment.",
          "||",
          "John replied",
          "that he intended to host",
          "only some of his relatives.",
          "||",
          "The rest",
          "would stay",
          "in a nearby hotel."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "Mary was surprised",
          "to see John",
          "cleaning his apartment",
          "and she asked the reason why.",
          "||",
          "John told her",
          "that he intended to host",
          "some of his relatives.",
          "||",
          "The rest",
          "would stay",
          "in a nearby hotel."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      }
    },
    question: {
      text: "Was it his schoolmates that John intended to host?",
      correct: "no"
    }
  },
  {
    id: 2,
    conditions: {
      upper_bound_some: {
        segments: [
          "Mary wanted to create",
          "a very special atmosphere",
          "and wondered whether to light",
          "all her special candles",
          "in the dining hall or not.",
          "||",
          "Eventually she took her decision:",
          "she lit",
          "some of her candles.",
          "||",
          "The others",
          "were left unlit",
          "to create a nice atmosphere."
        ],
        trigger_index: 8,
        target_index: 10,
        post_target_index: 11
      },
      upper_bound_only_some: {
        segments: [
          "Mary wanted to create",
          "a very special atmosphere",
          "and wondered whether to light",
          "all her special candles",
          "in the dining hall or not.",
          "||",
          "Eventually she took her decision:",
          "she lit",
          "only some of her candles.",
          "||",
          "The others",
          "were left unlit",
          "to create a nice atmosphere."
        ],
        trigger_index: 8,
        target_index: 10,
        post_target_index: 11
      },
      lower_bound_some: {
        segments: [
          "Mary pays attention",
          "to the most minute detail",
          "in order to create a romantic atmosphere",
          "in her dinner parties.",
          "||",
          "Last night she had a dinner party and",
          "she lit",
          "some of her candles.",
          "||",
          "The others",
          "were left unlit",
          "to create a nice atmosphere."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      }
    },
    question: null
  },
  {
    id: 3,
    conditions: {
      upper_bound_some: {
        segments: [
          "Yesterday, George asked Mary",
          "whether John had gone to the cinema",
          "with all his friends.",
          "||",
          "Mary said that",
          "he went to the cinema",
          "with some of his friends.",
          "||",
          "The others",
          "went for bowling",
          "and roller-skating."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      },
      upper_bound_only_some: {
        segments: [
          "Yesterday, George asked Mary",
          "whether John had gone to the cinema",
          "with all his friends.",
          "||",
          "Mary said that",
          "he went to the cinema",
          "with only some of his friends.",
          "||",
          "The others",
          "went for bowling",
          "and roller-skating."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      },
      lower_bound_some: {
        segments: [
          "John's mother",
          "is anxious about his whereabouts.",
          "||",
          "She asked Mary",
          "if she knew what John did on Friday night.",
          "||",
          "Mary said that",
          "he went to the cinema",
          "with some of his friends.",
          "||",
          "The others",
          "went for bowling",
          "and roller-skating."
        ],
        trigger_index: 8,
        target_index: 10,
        post_target_index: 11
      }
    },
    question: null
  },
  {
    id: 4,
    conditions: {
      upper_bound_some: {
        segments: [
          "The warden of the zoo",
          "asked whether all the lions had been fed.",
          "||",
          "The worker replied that",
          "he had fed",
          "some of the lions.",
          "||",
          "The rest",
          "were being examined by the vets",
          "and would be fed later."
        ],
        trigger_index: 5,
        target_index: 7,
        post_target_index: 8
      },
      upper_bound_only_some: {
        segments: [
          "The warden of the zoo",
          "asked whether all the lions had been fed.",
          "||",
          "The worker replied that",
          "he had fed",
          "only some of the lions.",
          "||",
          "The rest",
          "were being examined by the vets",
          "and would be fed later."
        ],
        trigger_index: 5,
        target_index: 7,
        post_target_index: 8
      },
      lower_bound_some: {
        segments: [
          "The warden of the zoo",
          "asked the worker",
          "what he had been doing the whole morning.",
          "||",
          "He replied that",
          "he had fed",
          "some of the lions.",
          "||",
          "The rest",
          "were being examined by the vets",
          "and would be fed later."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  // ---- Items 5-18: generated to complete the 18-item set ----
  // UB frames are varied: making-sure, deliberation, wondering, direct-question,
  // inspection, expectation, eagerness, confirmation, discovery, wanting-to-know,
  // task-assignment, promise, urgency, third-party-managed-to.
  {
    id: 5, // colleagues / farewell party — UB: making-sure
    conditions: {
      upper_bound_some: {
        segments: [
          "Sarah's boss wanted to make sure",
          "that she had invited",
          "all her colleagues",
          "to the farewell party.",
          "||",
          "Sarah mentioned",
          "that she had invited",
          "some of her colleagues.",
          "||",
          "The others",
          "had already made plans",
          "for the evening."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "Sarah's boss wanted to make sure",
          "that she had invited",
          "all her colleagues",
          "to the farewell party.",
          "||",
          "Sarah mentioned",
          "that she had invited",
          "only some of her colleagues.",
          "||",
          "The others",
          "had already made plans",
          "for the evening."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "Sarah was on the phone all morning",
          "making arrangements",
          "for a farewell party.",
          "||",
          "She mentioned",
          "that she had invited",
          "some of her colleagues.",
          "||",
          "The others",
          "had already made plans",
          "for the evening."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 6, // chapters / textbook — UB: deliberation / trying-to-determine
    conditions: {
      upper_bound_some: {
        segments: [
          "The professor was trying to determine",
          "whether Tom had read",
          "all the chapters",
          "before the exam.",
          "||",
          "Tom admitted",
          "that he had read",
          "some of the chapters.",
          "||",
          "The rest",
          "were too difficult",
          "to finish before the deadline."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "The professor was trying to determine",
          "whether Tom had read",
          "all the chapters",
          "before the exam.",
          "||",
          "Tom admitted",
          "that he had read",
          "only some of the chapters.",
          "||",
          "The rest",
          "were too difficult",
          "to finish before the deadline."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "Tom was studying",
          "for his exam next week",
          "and felt quite stressed about it.",
          "||",
          "He admitted",
          "that he had read",
          "some of the chapters.",
          "||",
          "The rest",
          "were too difficult",
          "to finish before the deadline."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 7, // packages / courier — UB: wondering
    conditions: {
      upper_bound_some: {
        segments: [
          "The supervisor was wondering",
          "whether the courier had delivered",
          "all the packages",
          "before closing time.",
          "||",
          "The courier explained",
          "that he had delivered",
          "some of the packages.",
          "||",
          "The rest",
          "would be delivered",
          "the following morning."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "The supervisor was wondering",
          "whether the courier had delivered",
          "all the packages",
          "before closing time.",
          "||",
          "The courier explained",
          "that he had delivered",
          "only some of the packages.",
          "||",
          "The rest",
          "would be delivered",
          "the following morning."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "The courier returned to the depot",
          "looking quite exhausted",
          "after a long day of work.",
          "||",
          "He explained",
          "that he had delivered",
          "some of the packages.",
          "||",
          "The rest",
          "would be delivered",
          "the following morning."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: {
      text: "Was the courier delivering letters?",
      correct: "no"
    }
  },
  {
    id: 8, // flowers / garden — UB: direct question
    conditions: {
      upper_bound_some: {
        segments: [
          "John asked his wife",
          "whether she had planted",
          "all the flowers",
          "she had bought at the market.",
          "||",
          "She replied",
          "that she had planted",
          "some of the flowers.",
          "||",
          "The others",
          "were still in pots",
          "on the balcony."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "John asked his wife",
          "whether she had planted",
          "all the flowers",
          "she had bought at the market.",
          "||",
          "She replied",
          "that she had planted",
          "only some of the flowers.",
          "||",
          "The others",
          "were still in pots",
          "on the balcony."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "John came home from work",
          "and found his wife",
          "busy in the garden.",
          "||",
          "She told him",
          "that she had planted",
          "some of the flowers.",
          "||",
          "The others",
          "were still in pots",
          "on the balcony."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 9, // windows / building — UB: inspection
    conditions: {
      upper_bound_some: {
        segments: [
          "The landlord stopped by to check",
          "whether the repairman had fixed",
          "all the windows",
          "in the old building.",
          "||",
          "The repairman said",
          "that he had fixed",
          "some of the windows.",
          "||",
          "The rest",
          "needed special parts",
          "that had not arrived yet."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "The landlord stopped by to check",
          "whether the repairman had fixed",
          "all the windows",
          "in the old building.",
          "||",
          "The repairman said",
          "that he had fixed",
          "only some of the windows.",
          "||",
          "The rest",
          "needed special parts",
          "that had not arrived yet."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "The repairman was having a cup of tea",
          "in the break room",
          "after a long afternoon of work.",
          "||",
          "He mentioned",
          "that he had fixed",
          "some of the windows.",
          "||",
          "The rest",
          "needed special parts",
          "that had not arrived yet."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 10, // shirts / trip — UB: expectation / prior instruction
    conditions: {
      upper_bound_some: {
        segments: [
          "Anna had told her husband",
          "that he needed to wash",
          "all the shirts",
          "before the business trip.",
          "||",
          "He replied",
          "that he had washed",
          "some of the shirts.",
          "||",
          "The others",
          "were still hanging",
          "in the wardrobe."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "Anna had told her husband",
          "that he needed to wash",
          "all the shirts",
          "before the business trip.",
          "||",
          "He replied",
          "that he had washed",
          "only some of the shirts.",
          "||",
          "The others",
          "were still hanging",
          "in the wardrobe."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "Anna's husband was getting ready",
          "for a business trip",
          "and seemed rather busy.",
          "||",
          "He told her",
          "that he had washed",
          "some of the shirts.",
          "||",
          "The others",
          "were still hanging",
          "in the wardrobe."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 11, // paintings / exhibition — UB: eagerness
    conditions: {
      upper_bound_some: {
        segments: [
          "The gallery owner was eager to know",
          "whether the artist had sold",
          "all her paintings",
          "at the exhibition.",
          "||",
          "The artist replied",
          "that she had sold",
          "some of her paintings.",
          "||",
          "The rest",
          "were still on display",
          "at the gallery."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "The gallery owner was eager to know",
          "whether the artist had sold",
          "all her paintings",
          "at the exhibition.",
          "||",
          "The artist replied",
          "that she had sold",
          "only some of her paintings.",
          "||",
          "The rest",
          "were still on display",
          "at the gallery."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "The artist returned home",
          "after a long and busy weekend",
          "at the annual exhibition.",
          "||",
          "She mentioned",
          "that she had sold",
          "some of her paintings.",
          "||",
          "The rest",
          "were still on display",
          "at the gallery."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 12, // employees / training — UB: confirmation
    conditions: {
      upper_bound_some: {
        segments: [
          "The manager needed to confirm",
          "that Helen had trained",
          "all the new employees",
          "on the safety protocol.",
          "||",
          "Helen explained",
          "that she had trained",
          "some of the new employees.",
          "||",
          "The others",
          "would complete their training",
          "the following week."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "The manager needed to confirm",
          "that Helen had trained",
          "all the new employees",
          "on the safety protocol.",
          "||",
          "Helen explained",
          "that she had trained",
          "only some of the new employees.",
          "||",
          "The others",
          "would complete their training",
          "the following week."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "Helen called the office",
          "to give an update",
          "on her morning's work.",
          "||",
          "She explained",
          "that she had trained",
          "some of the new employees.",
          "||",
          "The others",
          "would complete their training",
          "the following week."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 13, // rooms / hotel — UB: discovery / finding out
    conditions: {
      upper_bound_some: {
        segments: [
          "The hotel manager came to find out",
          "whether the cleaner had finished",
          "all the rooms",
          "on the third floor.",
          "||",
          "The cleaner replied",
          "that she had cleaned",
          "some of the rooms.",
          "||",
          "The rest",
          "were still occupied",
          "by late checkout guests."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "The hotel manager came to find out",
          "whether the cleaner had finished",
          "all the rooms",
          "on the third floor.",
          "||",
          "The cleaner replied",
          "that she had cleaned",
          "only some of the rooms.",
          "||",
          "The rest",
          "were still occupied",
          "by late checkout guests."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "The cleaner was taking a short break",
          "in the staff room",
          "after a busy morning.",
          "||",
          "She reported",
          "that she had cleaned",
          "some of the rooms.",
          "||",
          "The rest",
          "were still occupied",
          "by late checkout guests."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 14, // essays / grading — UB: wanting to know
    conditions: {
      upper_bound_some: {
        segments: [
          "The department head wanted to know",
          "whether the professor had graded",
          "all the essays",
          "from the final exam.",
          "||",
          "The professor replied",
          "that he had graded",
          "some of the essays.",
          "||",
          "The others",
          "required more careful attention",
          "and would take extra time."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "The department head wanted to know",
          "whether the professor had graded",
          "all the essays",
          "from the final exam.",
          "||",
          "The professor replied",
          "that he had graded",
          "only some of the essays.",
          "||",
          "The others",
          "required more careful attention",
          "and would take extra time."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "The professor was in his office",
          "looking quite tired",
          "after a very long day.",
          "||",
          "He mentioned",
          "that he had graded",
          "some of the essays.",
          "||",
          "The others",
          "required more careful attention",
          "and would take extra time."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 15, // hotel rooms / conference — UB: task assignment
    conditions: {
      upper_bound_some: {
        segments: [
          "The conference organiser had asked Maria",
          "to book",
          "all the hotel rooms",
          "for the visiting delegation.",
          "||",
          "Maria explained",
          "that she had booked",
          "some of the hotel rooms.",
          "||",
          "The rest",
          "were on a waiting list",
          "at a different hotel."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "The conference organiser had asked Maria",
          "to book",
          "all the hotel rooms",
          "for the visiting delegation.",
          "||",
          "Maria explained",
          "that she had booked",
          "only some of the hotel rooms.",
          "||",
          "The rest",
          "were on a waiting list",
          "at a different hotel."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "Maria bumped into her colleague",
          "in the hallway",
          "and they started chatting about work.",
          "||",
          "She mentioned",
          "that she had booked",
          "some of the hotel rooms.",
          "||",
          "The rest",
          "were on a waiting list",
          "at a different hotel."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 16, // presents / birthday — UB: promise
    conditions: {
      upper_bound_some: {
        segments: [
          "Tom's sister had promised",
          "that she would wrap",
          "all the presents",
          "for the birthday party.",
          "||",
          "She told him",
          "that she had wrapped",
          "some of the presents.",
          "||",
          "The others",
          "were hidden away",
          "in the bedroom cupboard."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "Tom's sister had promised",
          "that she would wrap",
          "all the presents",
          "for the birthday party.",
          "||",
          "She told him",
          "that she had wrapped",
          "only some of the presents.",
          "||",
          "The others",
          "were hidden away",
          "in the bedroom cupboard."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "Tom's sister was in the kitchen",
          "getting ready for the party",
          "and preparing the food.",
          "||",
          "She told him",
          "that she had wrapped",
          "some of the presents.",
          "||",
          "The others",
          "were hidden away",
          "in the bedroom cupboard."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: {
      text: "Was Tom's sister wrapping presents for a wedding?",
      correct: "no"
    }
  },
  {
    id: 17, // reports / board meeting — UB: urgency
    conditions: {
      upper_bound_some: {
        segments: [
          "The director was anxious to find out",
          "whether his assistant had reviewed",
          "all the financial reports",
          "before the board meeting.",
          "||",
          "The assistant replied",
          "that she had reviewed",
          "some of the reports.",
          "||",
          "The rest",
          "contained complex data",
          "that needed further analysis."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "The director was anxious to find out",
          "whether his assistant had reviewed",
          "all the financial reports",
          "before the board meeting.",
          "||",
          "The assistant replied",
          "that she had reviewed",
          "only some of the reports.",
          "||",
          "The rest",
          "contained complex data",
          "that needed further analysis."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "Over lunch the assistant was telling a colleague",
          "about her busy morning",
          "at the office.",
          "||",
          "She mentioned",
          "that she had reviewed",
          "some of the reports.",
          "||",
          "The rest",
          "contained complex data",
          "that needed further analysis."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  },
  {
    id: 18, // candidates / interviews — UB: third-party managed-to
    conditions: {
      upper_bound_some: {
        segments: [
          "The HR manager asked the panel",
          "whether they had managed to interview",
          "all the candidates",
          "for the open position.",
          "||",
          "The panel chair replied",
          "that they had interviewed",
          "some of the candidates.",
          "||",
          "The others",
          "were scheduled to come in",
          "the following afternoon."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      upper_bound_only_some: {
        segments: [
          "The HR manager asked the panel",
          "whether they had managed to interview",
          "all the candidates",
          "for the open position.",
          "||",
          "The panel chair replied",
          "that they had interviewed",
          "only some of the candidates.",
          "||",
          "The others",
          "were scheduled to come in",
          "the following afternoon."
        ],
        trigger_index: 7,
        target_index: 9,
        post_target_index: 10
      },
      lower_bound_some: {
        segments: [
          "The interview panel had been meeting",
          "in the large conference room",
          "since early that morning.",
          "||",
          "The chair explained",
          "that they had interviewed",
          "some of the candidates.",
          "||",
          "The others",
          "were scheduled to come in",
          "the following afternoon."
        ],
        trigger_index: 6,
        target_index: 8,
        post_target_index: 9
      }
    },
    question: null
  }
];

// Filler items (36 total; do not contain the "some of the Fs" trigger)
// 10 fillers have comprehension questions (6 yes, 4 no), giving 13 questions
// across the 54 texts (~24%) with the 3 critical questions (all 'no'),
// for an overall yes/no split of 6/7.
const fillerItems = [
  { id: "f1", segments: ["The teacher announced","that the school trip","would take place on Friday.","||","The students","were very excited","about the visit to the museum."], question: null },
  { id: "f2", segments: ["Sarah went to the supermarket","to buy ingredients","for the dinner party.","||","She picked up","fresh vegetables","and a bottle of wine."], question: null },
  { id: "f3", segments: ["The manager called a meeting","to discuss the quarterly results.","||","The sales team","had exceeded their targets","by a significant margin."], question: { text: "Did the sales team exceed their targets?", correct: "yes" } },
  { id: "f4", segments: ["Tom decided to renovate","his kitchen over the weekend.","||","He painted the walls","a bright shade of yellow","and replaced the old tiles."], question: null },
  { id: "f5", segments: ["The librarian noticed","that several books","were missing from the shelves.","||","She checked the records","and found that they had been","borrowed last week."], question: null },
  { id: "f6", segments: ["The weather forecast predicted","heavy rain for the entire week.","||","Despite the warning,","many people","went out without umbrellas."], question: { text: "Did the forecast predict sunshine?", correct: "no" } },
  { id: "f7", segments: ["Emily started her new job","at the marketing firm","on a Monday morning.","||","Her colleagues","welcomed her warmly","and showed her around the office."], question: null },
  { id: "f8", segments: ["The construction workers","finished the bridge","ahead of schedule.","||","The mayor praised their effort","and announced","a celebration for the town."], question: { text: "Was the bridge completed on time?", correct: "yes" } },
  { id: "f9", segments: ["David practiced the piano","for three hours every day.","||","His dedication paid off","when he won first place","in the regional competition."], question: null },
  { id: "f10", segments: ["The flight was delayed","by two hours","due to bad weather.","||","The passengers waited patiently","in the departure lounge","reading books and magazines."], question: null },
  { id: "f11", segments: ["The professor assigned","a challenging essay topic","for the final exam.","||","The students spent the weekend","researching and writing","their arguments carefully."], question: null },
  { id: "f12", segments: ["Rachel volunteered","at the animal shelter","every Saturday afternoon.","||","She enjoyed spending time","with the dogs","and taking them for walks."], question: null },
  // ---- 24 additional fillers ----
  { id: "f13", segments: ["The dentist recommended","that James brush his teeth","three times a day.","||","James bought","a new electric toothbrush","and started following the advice."], question: null },
  { id: "f14", segments: ["The couple decided","to adopt a rescue dog","from the local shelter.","||","They named the puppy Max","and took him home","that same afternoon."], question: { text: "Did the couple buy the dog from a breeder?", correct: "no" } },
  { id: "f15", segments: ["Laura finished her novel","after working on it","for over two years.","||","She submitted the manuscript","to a publishing house","and waited for a response."], question: null },
  { id: "f16", segments: ["The children built","a snowman in the front yard","during the winter holidays.","||","They used a carrot","for the nose","and buttons for the eyes."], question: { text: "Did the children use a carrot for the nose?", correct: "yes" } },
  { id: "f17", segments: ["The electrician arrived","at the house early in the morning","to fix the wiring.","||","He worked steadily","throughout the day","and finished by late afternoon."], question: null },
  { id: "f18", segments: ["Michael trained hard","for the marathon","over the summer months.","||","On race day","he completed the course","in under four hours."], question: null },
  { id: "f19", segments: ["The chef prepared","an elaborate five-course meal","for the anniversary dinner.","||","The guests were impressed","by the quality of the food","and the beautiful presentation."], question: { text: "Was the meal prepared for a birthday?", correct: "no" } },
  { id: "f20", segments: ["The taxi driver took","a shortcut through the back streets","to avoid the traffic.","||","They arrived at the airport","with plenty of time","to catch the flight."], question: null },
  { id: "f21", segments: ["The gardener planted","a row of rose bushes","along the garden fence.","||","By the following spring","the bushes had grown","and were covered in flowers."], question: { text: "Were the rose bushes planted along the fence?", correct: "yes" } },
  { id: "f22", segments: ["Karen received","a promotion at work","after her outstanding performance.","||","Her team celebrated","with a small party","in the office kitchen."], question: null },
  { id: "f23", segments: ["The plumber was called","to fix a leaking pipe","in the basement.","||","He replaced the old fitting","with a new copper joint","and tested the pressure."], question: null },
  { id: "f24", segments: ["The mechanic inspected","the engine carefully","before giving his assessment.","||","He told the owner","that the car needed","a new set of brake pads."], question: null },
  { id: "f25", segments: ["The swimmer dove","into the pool","at the sound of the whistle.","||","She completed the lap","in record time","and qualified for the finals."], question: null },
  { id: "f26", segments: ["The architect presented","her design for the new library","to the town council.","||","The councillors were enthusiastic","and approved the project","without any objections."], question: { text: "Did the council approve the library project?", correct: "yes" } },
  { id: "f27", segments: ["Peter forgot","to set his alarm","the night before the interview.","||","He woke up late","and had to rush","to get to the office on time."], question: null },
  { id: "f28", segments: ["The photographer set up","her equipment on the hilltop","just before dawn.","||","She waited patiently","and captured a stunning image","of the sunrise over the valley."], question: null },
  { id: "f29", segments: ["The nurse checked","the patient's temperature","every two hours.","||","By the evening","the fever had gone down","and the patient was feeling much better."], question: { text: "Did the fever stay the same?", correct: "no" } },
  { id: "f30", segments: ["The students organised","a charity bake sale","in the school hall.","||","They raised over two hundred pounds","which they donated","to the local food bank."], question: null },
  { id: "f31", segments: ["The pilot announced","that the plane would be landing","in approximately thirty minutes.","||","The flight attendants","began preparing the cabin","for the descent."], question: null },
  { id: "f32", segments: ["The tailor measured","the fabric carefully","before making the first cut.","||","He wanted to ensure","that the suit","would fit the client perfectly."], question: null },
  { id: "f33", segments: ["The volunteers cleaned up","the beach after the storm","picking up debris and litter.","||","By the end of the day","the shoreline looked","much better than before."], question: null },
  { id: "f34", segments: ["The baker experimented","with a new recipe","for sourdough bread.","||","The first batch turned out","surprisingly well","and sold out within the hour."], question: { text: "Did the sourdough bread sell quickly?", correct: "yes" } },
  { id: "f35", segments: ["The postman delivered","a large parcel","to the wrong address.","||","He realised his mistake","and returned later","to collect it and redeliver it."], question: null },
  { id: "f36", segments: ["The scientist published","her findings in a leading journal","after years of research.","||","The paper attracted attention","from colleagues worldwide","and was widely cited."], question: null }
];

// Practice items (3 items, 1 with a question; do not contain the target inference)
const practiceItems = [
  {
    id: "p1",
    segments: [
      "The baker woke up early",
      "to prepare the bread",
      "for the morning customers.",
      "||",
      "He mixed the dough",
      "and put it in the oven",
      "before sunrise."
    ],
    question: null
  },
  {
    id: "p2",
    segments: [
      "Anna took the bus",
      "to the city centre",
      "to meet her friend.",
      "||",
      "They had lunch together",
      "at a small Italian restaurant",
      "near the park."
    ],
    question: {
      text: "Did Anna drive to the city centre?",
      correct: "no"
    }
  },
  {
    id: "p3",
    segments: [
      "The children played",
      "in the garden",
      "until it got dark.",
      "||",
      "Their parents called them inside",
      "for dinner",
      "and they came running."
    ],
    question: null
  }
];
