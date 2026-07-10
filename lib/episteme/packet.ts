/* ==========================================================
   Episteme Operating System

   Knowledge Packet

   Civilization Intelligence OS

========================================================== */

import type {

  OrganId,

} from "./organ";

/* ==========================================================
   Packet Type
========================================================== */

export type PacketType =

  | "signal"

  | "knowledge"

  | "reasoning"

  | "design"

  | "execution"

  | "memory";

/* ==========================================================
   Packet Priority
========================================================== */

export type PacketPriority =

  | "low"

  | "normal"

  | "high"

  | "critical";

/* ==========================================================
   Packet Status
========================================================== */

export type PacketStatus =

  | "created"

  | "queued"

  | "processing"

  | "completed"

  | "archived";

/* ==========================================================
   Packet Source
========================================================== */

export interface PacketSource {

  name: string;

  url?: string;

  provider?: string;

}

/* ==========================================================
   Packet Metadata
========================================================== */

export interface PacketMetadata {

  tags: string[];

  confidence: number;

  importance: number;

  relevance: number;

  timestamp: number;

}

/* ==========================================================
   Knowledge Packet
========================================================== */

export interface KnowledgePacket {

  id: string;

  type: PacketType;

  priority: PacketPriority;

  status: PacketStatus;

  from: OrganId;

  to: OrganId;

  title: string;

  summary: string;

  content: string;

  source?: PacketSource;

  metadata: PacketMetadata;

}

/* ==========================================================
   Packet Queue
========================================================== */

export interface PacketQueue {

  packets: KnowledgePacket[];

}

/* ==========================================================
   Factory
========================================================== */

export function createPacket(

  input: Partial<KnowledgePacket>

): KnowledgePacket {

  return {

    id:

      input.id ??

      crypto.randomUUID(),

    type:

      input.type ??

      "signal",

    priority:

      input.priority ??

      "normal",

    status:

      input.status ??

      "created",

    from:

      input.from ??

      "observation",

    to:

      input.to ??

      "understanding",

    title:

      input.title ??

      "",

    summary:

      input.summary ??

      "",

    content:

      input.content ??

      "",

    source:

      input.source,

    metadata:

      {

        tags:

          input.metadata?.tags ??

          [],

        confidence:

          input.metadata?.confidence ??

          0,

        importance:

          input.metadata?.importance ??

          0,

        relevance:

          input.metadata?.relevance ??

          0,

        timestamp:

          input.metadata?.timestamp ??

          Date.now(),

      },

  };

}

/* ==========================================================
   Queue Factory
========================================================== */

export function createPacketQueue(): PacketQueue {

  return {

    packets: [],

  };

}

/* ==========================================================
   Queue Operations
========================================================== */

export function enqueuePacket(

  queue: PacketQueue,

  packet: KnowledgePacket,

): PacketQueue {

  return {

    packets: [

      ...queue.packets,

      packet,

    ],

  };

}

export function dequeuePacket(

  queue: PacketQueue,

):{

  packet?: KnowledgePacket;

  queue: PacketQueue;

}{

  if(queue.packets.length===0){

    return{

      packet:undefined,

      queue,

    };

  }

  const [packet,...rest]=queue.packets;

  return{

    packet,

    queue:{

      packets:rest,

    },

  };

}

/* ==========================================================
   Routing
========================================================== */

export function routePacket(

  packet:KnowledgePacket,

  next:OrganId,

):KnowledgePacket{

  return{

    ...packet,

    from:packet.to,

    to:next,

    status:"queued",

  };

}

/* ==========================================================
   Status
========================================================== */

export function updatePacketStatus(

packet:KnowledgePacket,

status:PacketStatus,

):KnowledgePacket{

return{

...packet,

status,

};

}

/* ==========================================================
   Priority
========================================================== */

export function elevatePriority(

packet:KnowledgePacket,

):KnowledgePacket{

const next=

packet.priority==="low"

?"normal"

:packet.priority==="normal"

?"high"

:packet.priority==="high"

?"critical"

:"critical";

return{

...packet,

priority:next,

};

}

/* ==========================================================
   Clone
========================================================== */

export function clonePacket(

packet:KnowledgePacket,

):KnowledgePacket{

return{

...packet,

id:crypto.randomUUID(),

metadata:{

...packet.metadata,

timestamp:Date.now(),

},

};

}

/* ==========================================================
   Validation
========================================================== */

export function isPacketExpired(

packet:KnowledgePacket,

maxAge:number,

){

return(

Date.now()-

packet.metadata.timestamp>

maxAge

);

}

/* ==========================================================
   Statistics
========================================================== */

export function countPackets(

queue:PacketQueue,

){

return queue.packets.length;

}

export function packetsByPriority(

queue:PacketQueue,

priority:PacketPriority,

){

return queue.packets.filter(

packet=>packet.priority===priority,

);

}

export function packetsByStatus(

queue:PacketQueue,

status:PacketStatus,

){

return queue.packets.filter(

packet=>packet.status===status,

);

}

/* ==========================================================
   Debug
========================================================== */

export function printPacket(

packet:KnowledgePacket,

){

console.table({

id:packet.id,

type:packet.type,

from:packet.from,

to:packet.to,

priority:packet.priority,

status:packet.status,

title:packet.title,

});

}