// npm library imports
import { useReducer, useEffect, useState } from "react";

// hooks
import { useFirestore } from "@/hooks/useFirestore.jsx";

// contexts
import useAuthContext from "@/hooks/useAuthContext";

/****************************************************************************
Victor Khanye LM
*****************************************************************************/
// Victor Khanye LM boundary

import za_mp_nkangala_vk from "@/maps/za/za_mp_nkangala_vk.geojson";
// Victor Khanye ward boundaries
import za_mp_nkangala_vk_w1 from "@/maps/za/za_mp_nkangala_vk_w1.geojson";
import za_mp_nkangala_vk_w2 from "@/maps/za/za_mp_nkangala_vk_w2.geojson";
import za_mp_nkangala_vk_w3 from "@/maps/za/za_mp_nkangala_vk_w3.geojson";
import za_mp_nkangala_vk_w4 from "@/maps/za/za_mp_nkangala_vk_w4.geojson";
import za_mp_nkangala_vk_w5 from "@/maps/za/za_mp_nkangala_vk_w5.geojson";
import za_mp_nkangala_vk_w6 from "@/maps/za/za_mp_nkangala_vk_w6.geojson";
import za_mp_nkangala_vk_w7 from "@/maps/za/za_mp_nkangala_vk_w7.geojson";
import za_mp_nkangala_vk_w8 from "@/maps/za/za_mp_nkangala_vk_w8.geojson";
import za_mp_nkangala_vk_w9 from "@/maps/za/za_mp_nkangala_vk_w9.geojson";
// za_mp_nkangala_vk ward cadastral
import za_mp_nkangala_vk_w1_cadastral from "@/maps/za/za_mp_nkangala_vk_w1_cadastral.geojson";
import za_mp_nkangala_vk_w2_cadastral from "@/maps/za/za_mp_nkangala_vk_w2_cadastral.geojson";
import za_mp_nkangala_vk_w3_cadastral from "@/maps/za/za_mp_nkangala_vk_w3_cadastral.geojson";
import za_mp_nkangala_vk_w4_cadastral from "@/maps/za/za_mp_nkangala_vk_w4_cadastral.geojson";
import za_mp_nkangala_vk_w5_cadastral from "@/maps/za/za_mp_nkangala_vk_w5_cadastral.geojson";
import za_mp_nkangala_vk_w6_cadastral from "@/maps/za/za_mp_nkangala_vk_w6_cadastral.geojson";
import za_mp_nkangala_vk_w7_cadastral from "@/maps/za/za_mp_nkangala_vk_w7_cadastral.geojson";
import za_mp_nkangala_vk_w8_cadastral from "@/maps/za/za_mp_nkangala_vk_w8_cadastral.geojson";
import za_mp_nkangala_vk_w9_cadastral from "@/maps/za/za_mp_nkangala_vk_w9_cadastral.geojson";

/****************************************************************************
Lesedi LM
*****************************************************************************/
// Lesedi LM boundary
import za_gp_sedibeng_lesedi from "@/maps/za/za_gp_sedibeng_lesedi.geojson";
// Lesedi LM ward boundaries
import za_gp_sedibeng_lesedi_w1 from "@/maps/za/za_gp_sedibeng_lesedi_w1.geojson";
import za_gp_sedibeng_lesedi_w2 from "@/maps/za/za_gp_sedibeng_lesedi_w2.geojson";
import za_gp_sedibeng_lesedi_w3 from "@/maps/za/za_gp_sedibeng_lesedi_w3.geojson";
import za_gp_sedibeng_lesedi_w4 from "@/maps/za/za_gp_sedibeng_lesedi_w4.geojson";
import za_gp_sedibeng_lesedi_w5 from "@/maps/za/za_gp_sedibeng_lesedi_w5.geojson";
import za_gp_sedibeng_lesedi_w6 from "@/maps/za/za_gp_sedibeng_lesedi_w6.geojson";
import za_gp_sedibeng_lesedi_w7 from "@/maps/za/za_gp_sedibeng_lesedi_w7.geojson";
import za_gp_sedibeng_lesedi_w8 from "@/maps/za/za_gp_sedibeng_lesedi_w8.geojson";
import za_gp_sedibeng_lesedi_w9 from "@/maps/za/za_gp_sedibeng_lesedi_w9.geojson";
import za_gp_sedibeng_lesedi_w10 from "@/maps/za/za_gp_sedibeng_lesedi_w10.geojson";
import za_gp_sedibeng_lesedi_w11 from "@/maps/za/za_gp_sedibeng_lesedi_w11.geojson";
import za_gp_sedibeng_lesedi_w12 from "@/maps/za/za_gp_sedibeng_lesedi_w12.geojson";
import za_gp_sedibeng_lesedi_w13 from "@/maps/za/za_gp_sedibeng_lesedi_w13.geojson";
// za_gp_sedibeng_lesedi ward cadastral
import za_gp_sedibeng_lesedi_w1_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w1_cadastral.geojson";
import za_gp_sedibeng_lesedi_w2_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w2_cadastral.geojson";
import za_gp_sedibeng_lesedi_w3_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w3_cadastral.geojson";
import za_gp_sedibeng_lesedi_w4_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w4_cadastral.geojson";
import za_gp_sedibeng_lesedi_w5_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w5_cadastral.geojson";
import za_gp_sedibeng_lesedi_w6_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w6_cadastral.geojson";
import za_gp_sedibeng_lesedi_w7_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w7_cadastral.geojson";
import za_gp_sedibeng_lesedi_w8_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w8_cadastral.geojson";
import za_gp_sedibeng_lesedi_w9_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w9_cadastral.geojson";
import za_gp_sedibeng_lesedi_w10_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w10_cadastral.geojson";
import za_gp_sedibeng_lesedi_w11_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w11_cadastral.geojson";
import za_gp_sedibeng_lesedi_w12_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w12_cadastral.geojson";
import za_gp_sedibeng_lesedi_w13_cadastral from "@/maps/za/za_gp_sedibeng_lesedi_w13_cadastral.geojson";

/****************************************************************************
Nkandla LM
*****************************************************************************/
// za_kzn_umgungundlovu_mpofana lm boundary
import za_kzn_king_cetshwayo_nkandla from "@/maps/za/za_kzn_king_cetshwayo_nkandla.geojson";
// za_kzn_king_cetshwayo_nkandla ward boundaries
import za_kzn_king_cetshwayo_nkandla_w1 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w1.geojson";
import za_kzn_king_cetshwayo_nkandla_w2 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w2.geojson";
import za_kzn_king_cetshwayo_nkandla_w3 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w3.geojson";
import za_kzn_king_cetshwayo_nkandla_w4 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w4.geojson";
import za_kzn_king_cetshwayo_nkandla_w5 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w5.geojson";
import za_kzn_king_cetshwayo_nkandla_w6 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w6.geojson";
import za_kzn_king_cetshwayo_nkandla_w7 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w7.geojson";
import za_kzn_king_cetshwayo_nkandla_w8 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w8.geojson";
import za_kzn_king_cetshwayo_nkandla_w9 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w9.geojson";
import za_kzn_king_cetshwayo_nkandla_w10 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w10.geojson";
import za_kzn_king_cetshwayo_nkandla_w11 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w11.geojson";
import za_kzn_king_cetshwayo_nkandla_w12 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w12.geojson";
import za_kzn_king_cetshwayo_nkandla_w13 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w13.geojson";
import za_kzn_king_cetshwayo_nkandla_w14 from "@/maps/za/za_kzn_king_cetshwayo_nkandla_w14.geojson";

/****************************************************************************
Mpofana LM
*****************************************************************************/
// za_kzn_umgungundlovu_mpofana lm boundary
import za_kzn_umgungundlovu_mpofana from "@/maps/za/za_kzn_umgungundlovu_mpofana.geojson";
// za_kzn_umgungundlovu_mpofana ward boundaries
import za_kzn_umgungundlovu_mpofana_w1 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w1.geojson";
import za_kzn_umgungundlovu_mpofana_w2 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w2.geojson";
import za_kzn_umgungundlovu_mpofana_w3 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w3.geojson";
import za_kzn_umgungundlovu_mpofana_w4 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w4.geojson";
import za_kzn_umgungundlovu_mpofana_w5 from "@/maps/za/za_kzn_umgungundlovu_mpofana_w5.geojson";
// za_kzn_umgungundlovu_mpofana ward cadastral
import za_kzn_umgungundlovu_mpofana_w1_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w1_cadastral.geojson";
import za_kzn_umgungundlovu_mpofana_w2_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w2_cadastral.geojson";
import za_kzn_umgungundlovu_mpofana_w3_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w3_cadastral.geojson";
import za_kzn_umgungundlovu_mpofana_w4_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w4_cadastral.geojson";
import za_kzn_umgungundlovu_mpofana_w5_cadastral from "@/maps/za/za_kzn_umgungundlovu_mpofana_w5_cadastral.geojson";

/****************************************************************************
uMngeni LM
*****************************************************************************/
// za_kzn_umgungundlovu_umngeni lm boundary
import za_kzn_umgungundlovu_umngeni from "@/maps/za/za_kzn_umgungundlovu_umngeni.geojson";
// // za_kzn_umgungundlovu_umngeni ward boundaries
import za_kzn_umgungundlovu_umngeni_w1 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w1.geojson";
import za_kzn_umgungundlovu_umngeni_w2 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w2.geojson";
import za_kzn_umgungundlovu_umngeni_w3 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w3.geojson";
import za_kzn_umgungundlovu_umngeni_w4 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w4.geojson";
import za_kzn_umgungundlovu_umngeni_w5 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w5.geojson";
import za_kzn_umgungundlovu_umngeni_w6 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w6.geojson";
import za_kzn_umgungundlovu_umngeni_w7 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w7.geojson";
import za_kzn_umgungundlovu_umngeni_w8 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w8.geojson";
import za_kzn_umgungundlovu_umngeni_w9 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w9.geojson";
import za_kzn_umgungundlovu_umngeni_w10 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w10.geojson";
import za_kzn_umgungundlovu_umngeni_w11 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w11.geojson";
import za_kzn_umgungundlovu_umngeni_w12 from "@/maps/za/za_kzn_umgungundlovu_umngeni_w12.geojson";
// za_kzn_umgungundlovu_umngeni ward cadastral
import za_kzn_umgungundlovu_umngeni_w1_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w1_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w2_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w2_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w3_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w3_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w4_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w4_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w5_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w5_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w6_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w6_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w7_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w7_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w8_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w8_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w9_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w9_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w10_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w10_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w11_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w11_cadastral.geojson";
import za_kzn_umgungundlovu_umngeni_w12_cadastral from "@/maps/za/za_kzn_umgungundlovu_umngeni_w12_cadastral.geojson";

/****************************************************************************
eDumbe LM
*****************************************************************************/
// za_kzn_kwazulu_edumbe lm boundary
import za_kzn_kwazulu_edumbe from "@/maps/za/za_kzn_kwazulu_edumbe.geojson";
// za_kzn_kwazulu_edumbe ward boundaries
import za_kzn_kwazulu_edumbe_w1 from "@/maps/za/za_kzn_kwazulu_edumbe_w1.geojson";
import za_kzn_kwazulu_edumbe_w2 from "@/maps/za/za_kzn_kwazulu_edumbe_w2.geojson";
import za_kzn_kwazulu_edumbe_w3 from "@/maps/za/za_kzn_kwazulu_edumbe_w3.geojson";
import za_kzn_kwazulu_edumbe_w4 from "@/maps/za/za_kzn_kwazulu_edumbe_w4.geojson";
import za_kzn_kwazulu_edumbe_w5 from "@/maps/za/za_kzn_kwazulu_edumbe_w5.geojson";
import za_kzn_kwazulu_edumbe_w6 from "@/maps/za/za_kzn_kwazulu_edumbe_w6.geojson";
import za_kzn_kwazulu_edumbe_w7 from "@/maps/za/za_kzn_kwazulu_edumbe_w7.geojson";
import za_kzn_kwazulu_edumbe_w8 from "@/maps/za/za_kzn_kwazulu_edumbe_w8.geojson";
// za_kzn_kwazulu_edumbe ward cadastral
import za_kzn_kwazulu_edumbe_w1_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w1_cadastral.geojson";
import za_kzn_kwazulu_edumbe_w2_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w2_cadastral.geojson";
import za_kzn_kwazulu_edumbe_w3_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w3_cadastral.geojson";
import za_kzn_kwazulu_edumbe_w4_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w4_cadastral.geojson";
import za_kzn_kwazulu_edumbe_w5_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w5_cadastral.geojson";
import za_kzn_kwazulu_edumbe_w6_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w6_cadastral.geojson";
import za_kzn_kwazulu_edumbe_w7_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w7_cadastral.geojson";
// import za_kzn_kwazulu_edumbe_w8_cadastral from "@/maps/za/za_kzn_kwazulu_edumbe_w8_cadastral.geojson";

/****************************************************************************
Amahlathi LM
*****************************************************************************/

// Amahlathi LM boundary
import za_ec_amathole_amahlathi from "@/maps/za/za_ec_amathole_amahlathi.geojson";

// Amahlathi ward boundaries
import za_ec_amathole_amahlathi_w1 from "@/maps/za/za_ec_amathole_amahlathi_w1.geojson";
import za_ec_amathole_amahlathi_w2 from "@/maps/za/za_ec_amathole_amahlathi_w2.geojson";
import za_ec_amathole_amahlathi_w3 from "@/maps/za/za_ec_amathole_amahlathi_w3.geojson";
import za_ec_amathole_amahlathi_w4 from "@/maps/za/za_ec_amathole_amahlathi_w4.geojson";
import za_ec_amathole_amahlathi_w5 from "@/maps/za/za_ec_amathole_amahlathi_w5.geojson";
import za_ec_amathole_amahlathi_w6 from "@/maps/za/za_ec_amathole_amahlathi_w6.geojson";
import za_ec_amathole_amahlathi_w7 from "@/maps/za/za_ec_amathole_amahlathi_w7.geojson";
import za_ec_amathole_amahlathi_w8 from "@/maps/za/za_ec_amathole_amahlathi_w8.geojson";
import za_ec_amathole_amahlathi_w9 from "@/maps/za/za_ec_amathole_amahlathi_w9.geojson";
import za_ec_amathole_amahlathi_w10 from "@/maps/za/za_ec_amathole_amahlathi_w10.geojson";
import za_ec_amathole_amahlathi_w11 from "@/maps/za/za_ec_amathole_amahlathi_w11.geojson";
import za_ec_amathole_amahlathi_w12 from "@/maps/za/za_ec_amathole_amahlathi_w12.geojson";
import za_ec_amathole_amahlathi_w13 from "@/maps/za/za_ec_amathole_amahlathi_w13.geojson";
import za_ec_amathole_amahlathi_w14 from "@/maps/za/za_ec_amathole_amahlathi_w14.geojson";
import za_ec_amathole_amahlathi_w15 from "@/maps/za/za_ec_amathole_amahlathi_w15.geojson";

// za_ec_amathole_amahlathi ward cadastral
import za_ec_amathole_amahlathi_w1_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w1_cadastral.geojson";
import za_ec_amathole_amahlathi_w2_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w2_cadastral.geojson";
import za_ec_amathole_amahlathi_w3_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w3_cadastral.geojson";
import za_ec_amathole_amahlathi_w4_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w4_cadastral.geojson";
import za_ec_amathole_amahlathi_w5_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w5_cadastral.geojson";
import za_ec_amathole_amahlathi_w6_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w6_cadastral.geojson";
import za_ec_amathole_amahlathi_w7_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w7_cadastral.geojson";
import za_ec_amathole_amahlathi_w8_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w8_cadastral.geojson";
import za_ec_amathole_amahlathi_w9_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w9_cadastral.geojson";
import za_ec_amathole_amahlathi_w10_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w10_cadastral.geojson";
import za_ec_amathole_amahlathi_w11_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w11_cadastral.geojson";
import za_ec_amathole_amahlathi_w12_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w12_cadastral.geojson";
import za_ec_amathole_amahlathi_w13_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w13_cadastral.geojson";
import za_ec_amathole_amahlathi_w14_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w14_cadastral.geojson";
import za_ec_amathole_amahlathi_w15_cadastral from "@/maps/za/za_ec_amathole_amahlathi_w15_cadastral.geojson";

/****************************************************************************
Walter Sisulu LM
*****************************************************************************/
// Walter Sisulu LM boundary

import za_ec_joe_gqabi_walter_sisulu from "@/maps/za/za_ec_joe_gqabi_walter_sisulu.geojson";
// Walter Sisulu ward boundaries
import za_ec_joe_gqabi_walter_sisulu_w1 from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w1.geojson";
import za_ec_joe_gqabi_walter_sisulu_w2 from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w2.geojson";
import za_ec_joe_gqabi_walter_sisulu_w3 from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w3.geojson";
import za_ec_joe_gqabi_walter_sisulu_w4 from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w4.geojson";
import za_ec_joe_gqabi_walter_sisulu_w5 from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w5.geojson";
import za_ec_joe_gqabi_walter_sisulu_w6 from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w6.geojson";
// za_mp_nkangala_vk ward cadastral
import za_ec_joe_gqabi_walter_sisulu_w1_cadastral from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w1_cadastral.geojson";
import za_ec_joe_gqabi_walter_sisulu_w2_cadastral from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w2_cadastral.geojson";
import za_ec_joe_gqabi_walter_sisulu_w3_cadastral from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w3_cadastral.geojson";
import za_ec_joe_gqabi_walter_sisulu_w4_cadastral from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w4_cadastral.geojson";
import za_ec_joe_gqabi_walter_sisulu_w5_cadastral from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w5_cadastral.geojson";
import za_ec_joe_gqabi_walter_sisulu_w6_cadastral from "@/maps/za/za_ec_joe_gqabi_walter_sisulu_w6_cadastral.geojson";

/****************************************************************************
Knysna LM
*****************************************************************************/
// Lesedi LM boundary
import za_wc_garden_route_knysna from "@/maps/za/za_wc_garden_route_knysna.geojson";
// Lesedi LM ward boundaries
import za_wc_garden_route_knysna_w1 from "@/maps/za/za_wc_garden_route_knysna_w1.geojson";
import za_wc_garden_route_knysna_w2 from "@/maps/za/za_wc_garden_route_knysna_w2.geojson";
import za_wc_garden_route_knysna_w3 from "@/maps/za/za_wc_garden_route_knysna_w3.geojson";
import za_wc_garden_route_knysna_w4 from "@/maps/za/za_wc_garden_route_knysna_w4.geojson";
import za_wc_garden_route_knysna_w5 from "@/maps/za/za_wc_garden_route_knysna_w5.geojson";
import za_wc_garden_route_knysna_w6 from "@/maps/za/za_wc_garden_route_knysna_w6.geojson";
import za_wc_garden_route_knysna_w7 from "@/maps/za/za_wc_garden_route_knysna_w7.geojson";
import za_wc_garden_route_knysna_w8 from "@/maps/za/za_wc_garden_route_knysna_w8.geojson";
import za_wc_garden_route_knysna_w9 from "@/maps/za/za_wc_garden_route_knysna_w9.geojson";
import za_wc_garden_route_knysna_w10 from "@/maps/za/za_wc_garden_route_knysna_w10.geojson";
import za_wc_garden_route_knysna_w11 from "@/maps/za/za_wc_garden_route_knysna_w11.geojson";
// za_wc_garden_route_knysna ward cadastral
import za_wc_garden_route_knysna_w1_cadastral from "@/maps/za/za_wc_garden_route_knysna_w1_cadastral.geojson";
import za_wc_garden_route_knysna_w2_cadastral from "@/maps/za/za_wc_garden_route_knysna_w2_cadastral.geojson";
import za_wc_garden_route_knysna_w3_cadastral from "@/maps/za/za_wc_garden_route_knysna_w3_cadastral.geojson";
import za_wc_garden_route_knysna_w4_cadastral from "@/maps/za/za_wc_garden_route_knysna_w4_cadastral.geojson";
import za_wc_garden_route_knysna_w5_cadastral from "@/maps/za/za_wc_garden_route_knysna_w5_cadastral.geojson";
import za_wc_garden_route_knysna_w6_cadastral from "@/maps/za/za_wc_garden_route_knysna_w6_cadastral.geojson";
import za_wc_garden_route_knysna_w7_cadastral from "@/maps/za/za_wc_garden_route_knysna_w7_cadastral.geojson";
import za_wc_garden_route_knysna_w8_cadastral from "@/maps/za/za_wc_garden_route_knysna_w8_cadastral.geojson";
import za_wc_garden_route_knysna_w9_cadastral from "@/maps/za/za_wc_garden_route_knysna_w9_cadastral.geojson";
import za_wc_garden_route_knysna_w10_cadastral from "@/maps/za/za_wc_garden_route_knysna_w10_cadastral.geojson";
import za_wc_garden_route_knysna_w11_cadastral from "@/maps/za/za_wc_garden_route_knysna_w11_cadastral.geojson";

/****************************************************************************
Ephraim Mogale LM
*****************************************************************************/
// Ephraim Mogale LM boundary
import za_lp_sekhukhune_ephraim_mogale from "@/maps/za/za_lp_sekhukhune_ephraim_mogale.geojson";
// Lesedi LM ward boundaries
import za_lp_sekhukhune_ephraim_mogale_w7 from "@/maps/za/za_lp_sekhukhune_ephraim_mogale_w7.geojson";
import za_lp_sekhukhune_ephraim_mogale_w8 from "@/maps/za/za_lp_sekhukhune_ephraim_mogale_w8.geojson";

// za_lp_sekhukhune_ephraim_mogale ward cadastral
import za_lp_sekhukhune_ephraim_mogale_w7_cadastral from "@/maps/za/za_lp_sekhukhune_ephraim_mogale_w7_cadastral.geojson";
import za_lp_sekhukhune_ephraim_mogale_w8_cadastral from "@/maps/za/za_lp_sekhukhune_ephraim_mogale_w8_cadastral.geojson";

// const initUserCadastral = {
// 	lmName: null,
// 	lmWardBoundaries: [],
// 	lmBoundary: [],
// };

/****************************************************************************
Blouberg LM
*****************************************************************************/
// Blouberg LM boundary
import za_lp_capricon_blouberg from "@/maps/za/za_lp_capricon_blouberg.geojson";
// Blouberg LM ward boundaries
import za_lp_capricon_blouberg_w19 from "@/maps/za/za_lp_capricon_blouberg_w19.geojson";
import za_lp_capricon_blouberg_w8 from "@/maps/za/za_lp_capricon_blouberg_w8.geojson";

// za_lp_sekhukhune_ephraim_mogale ward cadastral
import za_lp_capricon_blouberg_w19_cadastral from "@/maps/za/za_lp_capricon_blouberg_w19_cadastral.geojson";
import za_lp_capricon_blouberg_w8_cadastral from "@/maps/za/za_lp_capricon_blouberg_w8_cadastral.geojson";

const initUserCadastral = {
	lmName: null,
	lmWardBoundaries: [],
	lmBoundary: [],
};

const reducer = (state, action) => {
	// console.log(`state`, state);
	// console.log(`action`, action);

	const { type, payload } = action;
	switch (type) {
		default:
			return state;
		case "lmName":
			return { ...state, lmName: payload?.lmName };
		case "lmWardBoundaries":
			return { ...state, lmWardBoundaries: payload?.lmWardBoundaries };
		case "lmBoundary":
			return { ...state, lmBoundary: payload?.lmBoundary };
	}
};

const useUserCadastral = () => {
	// console.log(`useUserCadastral`);

	// ------------------------------------------------------------------

	// get workbase from user
	const { user } = useAuthContext();
	// console.log(`user`, user);

	// get user details from firestore on snapshot
	const { getDocument, response } = useFirestore("users");
	// console.log(`response`, response);

	const [workbase, setWorkbase] = useState(null);
	// console.log(`workbase`, workbase);

	useEffect(() => {
		if (user?.uid) {
			getDocument(user?.uid);
		}
	}, [user?.uid]);

	useEffect(() => {
		if (response.success) {
			// console.log(`response`, response);
			const { workbase } = response?.document;
			// console.log(`workbase`, workbase)
			setWorkbase(workbase);
		}
	}, [response.success]);

	// ---------------------------------------------------------

	// set user cadastral data based on user workbase
	const [state, dispatch] = useReducer(reducer, initUserCadastral);
	// console.log(`state`, state);

	useEffect(() => {
		if (workbase) {
			// console.log(`workbase`, workbase);
			dispatch({
				type: "lmName",
				payload: {
					lmName: workbase,
				},
			});

			let lmWardBoundaries = [];
			switch (workbase) {
				case "uMngeni LM":
					// console.log(`workbase`, workbase);
					// ward 1
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w1,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w1_cadastral,
						ward: 1,
					});
					// ward 2
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w2,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w2_cadastral,
						ward: 2,
					});
					// ward 3
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w3,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w3_cadastral,
						ward: 3,
					});

					// ward 4
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w4,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w4_cadastral,
						ward: 4,
					});

					// ward 5
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w5,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w5_cadastral,
						ward: 5,
					});

					// ward 6
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w6,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w6_cadastral,
						ward: 6,
					});

					// ward 7
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w7,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w7_cadastral,
						ward: 7,
					});

					// ward 8
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w8,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w8_cadastral,
						ward: 8,
					});

					// ward 9
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w9,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w9_cadastral,
						ward: 9,
					});

					// ward 10
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w10,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w10_cadastral,
						ward: 10,
					});

					// ward 11
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w11,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w11_cadastral,
						ward: 11,
					});

					// ward 12
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_umngeni_w12,
						erfBoundary: za_kzn_umgungundlovu_umngeni_w12_cadastral,
						ward: 12,
					});

					// console.log(`lmWardBoundaries`, lmWardBoundaries)

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_kzn_umgungundlovu_umngeni,
						},
					});
					break;
				case "Ephraim Mogale LM":
					// console.log(`workbase`, workbase);
					// ward 1
					// lmWardBoundaries.push({
					// 	wardBoundary: za_wc_garden_route_knysna_w1,
					// 	erfBoundary: za_wc_garden_route_knysna_w1_cadastral,
					// 	ward: 1,
					// });
					// ward 2
					// lmWardBoundaries.push({
					// 	wardBoundary: za_wc_garden_route_knysna_w2,
					// 	erfBoundary: za_wc_garden_route_knysna_w2_cadastral,
					// 	ward: 2,
					// });
					// ward 3
					// lmWardBoundaries.push({
					// 	wardBoundary: za_wc_garden_route_knysna_w3,
					// 	erfBoundary: za_wc_garden_route_knysna_w3_cadastral,
					// 	ward: 3,
					// });

					// ward 4
					// lmWardBoundaries.push({
					// 	wardBoundary: za_wc_garden_route_knysna_w4,
					// 	erfBoundary: za_wc_garden_route_knysna_w4_cadastral,
					// 	ward: 4,
					// });

					// ward 5
					// lmWardBoundaries.push({
					// 	wardBoundary: za_wc_garden_route_knysna_w5,
					// 	erfBoundary: za_wc_garden_route_knysna_w5_cadastral,
					// 	ward: 5,
					// });

					// ward 6
					// lmWardBoundaries.push({
					// 	wardBoundary: za_wc_garden_route_knysna_w6,
					// 	erfBoundary: za_wc_garden_route_knysna_w6_cadastral,
					// 	ward: 6,
					// });

					// ward 7
					lmWardBoundaries.push({
						wardBoundary: za_lp_sekhukhune_ephraim_mogale_w7,
						erfBoundary: za_lp_sekhukhune_ephraim_mogale_w7_cadastral,
						ward: 7,
					});

					// ward 8
					lmWardBoundaries.push({
						wardBoundary: za_lp_sekhukhune_ephraim_mogale_w8,
						erfBoundary: za_lp_sekhukhune_ephraim_mogale_w8_cadastral,
						ward: 8,
					});

					// ward 9
					// lmWardBoundaries.push({
					// 	wardBoundary: za_wc_garden_route_knysna_w9,
					// 	erfBoundary: za_wc_garden_route_knysna_w9_cadastral,
					// 	ward: 9,
					// });

					// ward 10
					// lmWardBoundaries.push({
					// 	wardBoundary: za_wc_garden_route_knysna_w10,
					// 	erfBoundary: za_wc_garden_route_knysna_w10_cadastral,
					// 	ward: 10,
					// });

					// ward 11
					// lmWardBoundaries.push({
					// 	wardBoundary: za_wc_garden_route_knysna_w11,
					// 	erfBoundary: za_wc_garden_route_knysna_w11_cadastral,
					// 	ward: 11,
					// });

					// console.log(`lmWardBoundaries`, lmWardBoundaries)

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_lp_sekhukhune_ephraim_mogale,
						},
					});
					break;

				case "Blouberg LM":
					// ward 19
					lmWardBoundaries.push({
						wardBoundary: za_lp_capricon_blouberg_w19,
						erfBoundary: za_lp_capricon_blouberg_w19_cadastral,
						ward: 19,
					});

					// ward 8
					lmWardBoundaries.push({
						wardBoundary: za_lp_capricon_blouberg_w8,
						erfBoundary: za_lp_capricon_blouberg_w8_cadastral,
						ward: 8,
					});

					// console.log(`lmWardBoundaries`, lmWardBoundaries)

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_lp_capricon_blouberg,
						},
					});
					break;

				case "Nkandla LM":
					// console.log(`workbase`, workbase);

					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w1,
						wardName: "w1",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w2,
						wardName: "w2",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w3,
						wardName: "w3",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w4,
						wardName: "w4",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w5,
						wardName: "w5",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w6,
						wardName: "w6",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w7,
						wardName: "w7",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w8,
						wardName: "w8",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w9,
						wardName: "w9",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w10,
						wardName: "w10",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w11,
						wardName: "w11",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w12,
						wardName: "w12",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w13,
						wardName: "w13",
					});
					lmWardBoundaries.push({
						wardBoundary: za_kzn_king_cetshwayo_nkandla_w14,
						wardName: "w14",
					});

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_kzn_king_cetshwayo_nkandla,
						},
					});
					break;

				case "Mpofana LM":
					// console.log(`workbase`, workbase);

					// ward 1
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w1,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w1_cadastral,
						ward: 1,
					});
					// ward 2
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w2,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w2_cadastral,
						ward: 2,
					});
					// ward 3
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w3,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w3_cadastral,
						ward: 3,
					});

					// ward 4
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w4,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w4_cadastral,
						ward: 4,
					});

					// ward 5
					lmWardBoundaries.push({
						wardBoundary: za_kzn_umgungundlovu_mpofana_w5,
						erfBoundary: za_kzn_umgungundlovu_mpofana_w5_cadastral,
						ward: 5,
					});
					// console.log(`lmWardBoundaries`, lmWardBoundaries)

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_kzn_umgungundlovu_mpofana,
						},
					});
					break;

				case "eDumbe LM":
					// console.log(`workbase`, workbase);
					console.log(`workbase`, workbase);

					lmWardBoundaries.push({
						wardBoundary: za_kzn_kwazulu_edumbe_w1,
						erfBoundary: za_kzn_kwazulu_edumbe_w1_cadastral,
						ward: 1,
					});

					lmWardBoundaries.push({
						wardBoundary: za_kzn_kwazulu_edumbe_w2,
						erfBoundary: za_kzn_kwazulu_edumbe_w2_cadastral,
						ward: 2,
					});

					lmWardBoundaries.push({
						wardBoundary: za_kzn_kwazulu_edumbe_w3,
						erfBoundary: za_kzn_kwazulu_edumbe_w3_cadastral,
						ward: 3,
					});

					lmWardBoundaries.push({
						wardBoundary: za_kzn_kwazulu_edumbe_w4,
						erfBoundary: za_kzn_kwazulu_edumbe_w4_cadastral,
						ward: 4,
					});

					lmWardBoundaries.push({
						wardBoundary: za_kzn_kwazulu_edumbe_w5,
						erfBoundary: za_kzn_kwazulu_edumbe_w5_cadastral,
						ward: 5,
					});

					lmWardBoundaries.push({
						wardBoundary: za_kzn_kwazulu_edumbe_w6,
						erfBoundary: za_kzn_kwazulu_edumbe_w6_cadastral,
						ward: 6,
					});

					lmWardBoundaries.push({
						wardBoundary: za_kzn_kwazulu_edumbe_w7,
						erfBoundary: za_kzn_kwazulu_edumbe_w7_cadastral,
						ward: 7,
					});

					lmWardBoundaries.push({
						wardBoundary: za_kzn_kwazulu_edumbe_w8,
						// erfBoundary:  za_kzn_kwazulu_edumbe_w8_cadastral,
						ward: 8,
					});

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_kzn_kwazulu_edumbe,
						},
					});
					break;

				case "Victor Khanye LM":
					// console.log(`workbase`, workbase);
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w1,
						erfBoundary: za_mp_nkangala_vk_w1_cadastral,
						ward: 1,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w2,
						erfBoundary: za_mp_nkangala_vk_w2_cadastral,
						ward: 2,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w3,
						erfBoundary: za_mp_nkangala_vk_w3_cadastral,
						ward: 3,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w4,
						erfBoundary: za_mp_nkangala_vk_w4_cadastral,
						ward: 4,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w5,
						erfBoundary: za_mp_nkangala_vk_w5_cadastral,
						ward: 5,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w6,
						erfBoundary: za_mp_nkangala_vk_w6_cadastral,
						ward: 6,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w7,
						erfBoundary: za_mp_nkangala_vk_w7_cadastral,
						ward: 7,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w8,
						erfBoundary: za_mp_nkangala_vk_w8_cadastral,
						ward: 8,
					});
					lmWardBoundaries.push({
						wardBoundary: za_mp_nkangala_vk_w9,
						erfBoundary: za_mp_nkangala_vk_w9_cadastral,
						ward: 9,
					});

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_mp_nkangala_vk,
						},
					});
					break;

				case "Lesedi LM":
					// console.log(`workbase`, workbase);
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w1,
						erfBoundary: za_gp_sedibeng_lesedi_w1_cadastral,
						ward: 1,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w2,
						erfBoundary: za_gp_sedibeng_lesedi_w2_cadastral,
						ward: 2,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w3,
						erfBoundary: za_gp_sedibeng_lesedi_w3_cadastral,
						ward: 3,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w4,
						erfBoundary: za_gp_sedibeng_lesedi_w4_cadastral,
						ward: 4,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w5,
						erfBoundary: za_gp_sedibeng_lesedi_w5_cadastral,
						ward: 5,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w6,
						erfBoundary: za_gp_sedibeng_lesedi_w6_cadastral,
						ward: 6,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w7,
						erfBoundary: za_gp_sedibeng_lesedi_w7_cadastral,
						ward: 7,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w8,
						erfBoundary: za_gp_sedibeng_lesedi_w8_cadastral,
						ward: 8,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w9,
						erfBoundary: za_gp_sedibeng_lesedi_w9_cadastral,
						ward: 9,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w10,
						erfBoundary: za_gp_sedibeng_lesedi_w10_cadastral,
						ward: 10,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w11,
						erfBoundary: za_gp_sedibeng_lesedi_w11_cadastral,
						ward: 11,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w12,
						erfBoundary: za_gp_sedibeng_lesedi_w12_cadastral,
						ward: 12,
					});
					lmWardBoundaries.push({
						wardBoundary: za_gp_sedibeng_lesedi_w13,
						erfBoundary: za_gp_sedibeng_lesedi_w13_cadastral,
						ward: 13,
					});

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_gp_sedibeng_lesedi,
						},
					});
					break;

				case "Amahlathi LM":
					// console.log(`workbase`, workbase);
					// ward 1
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w1,
						erfBoundary: za_ec_amathole_amahlathi_w1_cadastral,
						ward: 1,
					});
					// ward 2
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w2,
						erfBoundary: za_ec_amathole_amahlathi_w2_cadastral,
						ward: 2,
					});
					// ward 3
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w3,
						erfBoundary: za_ec_amathole_amahlathi_w3_cadastral,
						ward: 3,
					});

					// ward 4
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w4,
						erfBoundary: za_ec_amathole_amahlathi_w4_cadastral,
						ward: 4,
					});

					// ward 5
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w5,
						erfBoundary: za_ec_amathole_amahlathi_w5_cadastral,
						ward: 5,
					});

					// ward 6
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w6,
						erfBoundary: za_ec_amathole_amahlathi_w6_cadastral,
						ward: 6,
					});

					// ward 7
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w7,
						erfBoundary: za_ec_amathole_amahlathi_w7_cadastral,
						ward: 7,
					});

					// ward 8
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w8,
						erfBoundary: za_ec_amathole_amahlathi_w8_cadastral,
						ward: 8,
					});

					// ward 9
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w9,
						erfBoundary: za_ec_amathole_amahlathi_w9_cadastral,
						ward: 9,
					});

					// ward 10
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w10,
						erfBoundary: za_ec_amathole_amahlathi_w10_cadastral,
						ward: 10,
					});

					// ward 11
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w11,
						erfBoundary: za_ec_amathole_amahlathi_w11_cadastral,
						ward: 11,
					});

					// ward 12
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w12,
						erfBoundary: za_ec_amathole_amahlathi_w12_cadastral,
						ward: 12,
					});

					// ward 13
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w13,
						erfBoundary: za_ec_amathole_amahlathi_w13_cadastral,
						ward: 13,
					});

					// ward 14
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w14,
						erfBoundary: za_ec_amathole_amahlathi_w14_cadastral,
						ward: 14,
					});

					// ward 15
					lmWardBoundaries.push({
						wardBoundary: za_ec_amathole_amahlathi_w15,
						erfBoundary: za_ec_amathole_amahlathi_w15_cadastral,
						ward: 15,
					});
					// console.log(`lmWardBoundaries`, lmWardBoundaries)

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_ec_amathole_amahlathi,
						},
					});
					break;

				case "Walter Sisulu LM":
					// console.log(`workbase`, workbase);
					// ward 1
					lmWardBoundaries.push({
						wardBoundary: za_ec_joe_gqabi_walter_sisulu_w1,
						erfBoundary: za_ec_joe_gqabi_walter_sisulu_w1_cadastral,
						ward: 1,
					});
					// ward 2
					lmWardBoundaries.push({
						wardBoundary: za_ec_joe_gqabi_walter_sisulu_w2,
						erfBoundary: za_ec_joe_gqabi_walter_sisulu_w2_cadastral,
						ward: 2,
					});
					// ward 3
					lmWardBoundaries.push({
						wardBoundary: za_ec_joe_gqabi_walter_sisulu_w3,
						erfBoundary: za_ec_joe_gqabi_walter_sisulu_w3_cadastral,
						ward: 3,
					});

					// ward 4
					lmWardBoundaries.push({
						wardBoundary: za_ec_joe_gqabi_walter_sisulu_w4,
						erfBoundary: za_ec_joe_gqabi_walter_sisulu_w4_cadastral,
						ward: 4,
					});

					// ward 5
					lmWardBoundaries.push({
						wardBoundary: za_ec_joe_gqabi_walter_sisulu_w5,
						erfBoundary: za_ec_joe_gqabi_walter_sisulu_w5_cadastral,
						ward: 5,
					});

					// ward 6
					lmWardBoundaries.push({
						wardBoundary: za_ec_joe_gqabi_walter_sisulu_w6,
						erfBoundary: za_ec_joe_gqabi_walter_sisulu_w6_cadastral,
						ward: 6,
					});

					// ward 7
					// lmWardBoundaries.push({
					// 	wardBoundary: za_ec_joe_gqabi_walter_sisulu_w7,
					// 	erfBoundary: za_ec_joe_gqabi_walter_sisulu_w7_cadastral,
					// 	ward: 7,
					// });

					// ward 8
					// lmWardBoundaries.push({
					// 	wardBoundary: za_ec_joe_gqabi_walter_sisulu_w8,
					// 	erfBoundary: za_ec_joe_gqabi_walter_sisulu_w8_cadastral,
					// 	ward: 8,
					// });

					// ward 9
					// lmWardBoundaries.push({
					// 	wardBoundary: za_ec_joe_gqabi_walter_sisulu_w9,
					// 	erfBoundary: za_ec_joe_gqabi_walter_sisulu_w9_cadastral,
					// 	ward: 9,
					// });

					// ward 10
					// lmWardBoundaries.push({
					// 	wardBoundary: za_ec_joe_gqabi_walter_sisulu_w10,
					// 	erfBoundary: za_ec_joe_gqabi_walter_sisulu_w10_cadastral,
					// 	ward: 10,
					// });

					// ward 11
					// lmWardBoundaries.push({
					// 	wardBoundary: za_ec_joe_gqabi_walter_sisulu_w11,
					// 	erfBoundary: za_ec_joe_gqabi_walter_sisulu_w11_cadastral,
					// 	ward: 11,
					// });

					// console.log(`lmWardBoundaries`, lmWardBoundaries)

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_ec_joe_gqabi_walter_sisulu,
						},
					});
					break;

				case "Knysna LM":
					// console.log(`workbase`, workbase);
					// ward 1
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w1,
						erfBoundary: za_wc_garden_route_knysna_w1_cadastral,
						ward: 1,
					});
					// ward 2
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w2,
						erfBoundary: za_wc_garden_route_knysna_w2_cadastral,
						ward: 2,
					});
					// ward 3
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w3,
						erfBoundary: za_wc_garden_route_knysna_w3_cadastral,
						ward: 3,
					});

					// ward 4
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w4,
						erfBoundary: za_wc_garden_route_knysna_w4_cadastral,
						ward: 4,
					});

					// ward 5
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w5,
						erfBoundary: za_wc_garden_route_knysna_w5_cadastral,
						ward: 5,
					});

					// ward 6
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w6,
						erfBoundary: za_wc_garden_route_knysna_w6_cadastral,
						ward: 6,
					});

					// ward 7
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w7,
						erfBoundary: za_wc_garden_route_knysna_w7_cadastral,
						ward: 7,
					});

					// ward 8
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w8,
						erfBoundary: za_wc_garden_route_knysna_w8_cadastral,
						ward: 8,
					});

					// ward 9
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w9,
						erfBoundary: za_wc_garden_route_knysna_w9_cadastral,
						ward: 9,
					});

					// ward 10
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w10,
						erfBoundary: za_wc_garden_route_knysna_w10_cadastral,
						ward: 10,
					});

					// ward 11
					lmWardBoundaries.push({
						wardBoundary: za_wc_garden_route_knysna_w11,
						erfBoundary: za_wc_garden_route_knysna_w11_cadastral,
						ward: 11,
					});

					// console.log(`lmWardBoundaries`, lmWardBoundaries)

					dispatch({
						type: "lmWardBoundaries",
						payload: {
							lmWardBoundaries: lmWardBoundaries,
						},
					});

					dispatch({
						type: "lmBoundary",
						payload: {
							lmBoundary: za_wc_garden_route_knysna,
						},
					});
					break;

				default:
					break;
			}
		}
	}, [workbase]);

	return { state };
};

export default useUserCadastral;
