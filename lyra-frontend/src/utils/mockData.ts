import { Event, Registration } from "@/features/events/types";

// ─── Mock Events ──────────────────────────────────────────────────────────────

export const mockEvents: Event[] = [
  {
    id: "a1b2c3d4-0001-4e5f-8a9b-c1d2e3f40001",
    title: "Introduction à SAP S/4HANA",
    description:
      "Présentation complète des nouveautés de SAP S/4HANA et du processus de migration depuis ECC. Au programme : architecture simplifiée, nouvelles interfaces Fiori, gestion en temps réel grâce à la base de données in-memory HANA, et retours d'expérience concrets de plusieurs projets terrain. La session inclut une démonstration live et un temps d'échange avec les participants.",
    location: "Salle Confluence – Lyon Part-Dieu",
    event_date: "2025-06-10T09:00:00.000Z",
    duration_minutes: 120,
    capacity: 40,
    category: "GConf",
    created_by: "TGI00123",
    created_at: "2025-05-01T08:30:00.000Z",
  },
  {
    id: "a1b2c3d4-0002-4e5f-8a9b-c1d2e3f40002",
    title: "Atelier ERP : Optimisation des flux achats",
    description:
      "Workshop pratique centré sur l'automatisation et la fiabilisation des processus achats au sein d'un ERP. Nous aborderons la configuration des workflows d'approbation, la gestion des fournisseurs, le rapprochement automatique des factures et les indicateurs de performance clés. La session alterne apports théoriques et exercices en sous-groupes sur des cas concrets issus du terrain.",
    location: "Centre de formation – Paris La Défense",
    event_date: "2025-06-18T14:00:00.000Z",
    duration_minutes: 180,
    capacity: 25,
    category: "Ingenierie",
    created_by: "TGI00456",
    created_at: "2025-05-03T10:15:00.000Z",
  },
  {
    id: "a1b2c3d4-0003-4e5f-8a9b-c1d2e3f40003",
    title: "RH & Digital : Gestion des talents en 2025",
    description:
      "Comment les outils digitaux transforment-ils concrètement la gestion des ressources humaines ? Cette session explore les grandes tendances : SIRH nouvelle génération, onboarding 100% digital, entretiens annuels assistés par IA, et plateformes de développement des compétences. Des retours d'expérience d'entreprises ayant déjà franchi le pas viendront illustrer chaque thématique, suivis d'un tour d'horizon des outils disponibles sur le marché.",
    location: "Auditorium – Bordeaux Mériadeck",
    event_date: "2025-07-02T10:00:00.000Z",
    duration_minutes: 90,
    capacity: 60,
    category: "Data",
    created_by: "TGI00789",
    created_at: "2025-05-05T09:00:00.000Z",
  },
  {
    id: "a1b2c3d4-0004-4e5f-8a9b-c1d2e3f40004",
    title: "SAP BTP – Développement d'extensions cloud",
    description:
      "Formation avancée dédiée aux développeurs souhaitant étendre les fonctionnalités de SAP via la Business Technology Platform. Au menu : création d'applications cloud-native avec CAP (Cloud Application Programming Model), intégration avec S/4HANA via des API REST et OData, gestion des identités avec SAP Identity Authentication, et déploiement sur Cloud Foundry. Prérequis : bases en JavaScript/TypeScript et connaissance de l'environnement SAP.",
    location: "En ligne (Teams)",
    event_date: "2025-07-15T09:30:00.000Z",
    duration_minutes: 240,
    capacity: 20,
    category: "SSI",
    created_by: "TGI00123",
    created_at: "2025-05-08T14:00:00.000Z",
  },
  {
    id: "a1b2c3d4-0005-4e5f-8a9b-c1d2e3f40005",
    title: "Conformité RGPD & RH",
    description:
      "Les équipes RH traitent quotidiennement des données personnelles sensibles : dossiers salariés, évaluations, données de santé, historiques de paie. Cette session fait le point sur les obligations légales en vigueur, les erreurs les plus fréquentes constatées lors d'audits, et les bonnes pratiques à mettre en place. Un DPO en exercice animera une séance de Q&A pour répondre aux cas concrets rencontrés par les participants.",
    location: "Salle Garance – Marseille",
    event_date: "2025-07-22T13:30:00.000Z",
    duration_minutes: 60,
    capacity: 35,
    category: "HSE",
    created_by: "TGI00321",
    created_at: "2025-05-10T11:45:00.000Z",
  },
  {
    id: "a1b2c3d4-0006-4e5f-8a9b-c1d2e3f40006",
    title: "ERP Finance : Clôture mensuelle & reporting",
    description:
      "La clôture mensuelle est souvent vécue comme une course contre la montre. Cette session présente les bonnes pratiques pour en réduire la durée et en améliorer la fiabilité grâce à l'ERP : automatisation des écritures récurrentes, contrôles de cohérence en temps réel, tableaux de bord financiers dynamiques et génération automatisée des rapports réglementaires. Retours d'expérience et démonstration sur un environnement de test.",
    location: "Tour Ariane – Paris La Défense",
    event_date: "2025-08-05T09:00:00.000Z",
    duration_minutes: 150,
    capacity: 30,
    category: "Cyber",
    created_by: "TGI00456",
    created_at: "2025-05-12T08:00:00.000Z",
  },
];

// ─── Mock Registrations ───────────────────────────────────────────────────────

export const mockRegistrations: Registration[] = [
  // Event 1 – SAP S/4HANA (4 inscrits)
  {
    id: "r0000001-aaaa-4bbb-8ccc-ddddeeee0001",
    event_id: "a1b2c3d4-0001-4e5f-8a9b-c1d2e3f40001",
    user_id: "TGI00201",
    registered_at: "2025-05-02T09:12:00.000Z",
  },
  {
    id: "r0000002-aaaa-4bbb-8ccc-ddddeeee0002",
    event_id: "a1b2c3d4-0001-4e5f-8a9b-c1d2e3f40001",
    user_id: "TGI00202",
    registered_at: "2025-05-02T10:34:00.000Z",
  },
  {
    id: "r0000003-aaaa-4bbb-8ccc-ddddeeee0003",
    event_id: "a1b2c3d4-0001-4e5f-8a9b-c1d2e3f40001",
    user_id: "TGI00203",
    registered_at: "2025-05-03T14:00:00.000Z",
  },
  {
    id: "r0000004-aaaa-4bbb-8ccc-ddddeeee0004",
    event_id: "a1b2c3d4-0001-4e5f-8a9b-c1d2e3f40001",
    user_id: "TGI00204",
    registered_at: "2025-05-04T08:55:00.000Z",
  },

  // Event 2 – ERP Achats (3 inscrits)
  {
    id: "r0000005-aaaa-4bbb-8ccc-ddddeeee0005",
    event_id: "a1b2c3d4-0002-4e5f-8a9b-c1d2e3f40002",
    user_id: "TGI00301",
    registered_at: "2025-05-04T11:20:00.000Z",
  },
  {
    id: "r0000006-aaaa-4bbb-8ccc-ddddeeee0006",
    event_id: "a1b2c3d4-0002-4e5f-8a9b-c1d2e3f40002",
    user_id: "TGI00302",
    registered_at: "2025-05-05T16:00:00.000Z",
  },
  {
    id: "r0000007-aaaa-4bbb-8ccc-ddddeeee0007",
    event_id: "a1b2c3d4-0002-4e5f-8a9b-c1d2e3f40002",
    user_id: "TGI00201", // même user, event différent → OK
    registered_at: "2025-05-06T09:05:00.000Z",
  },

  // Event 3 – RH Digital (5 inscrits)
  {
    id: "r0000008-aaaa-4bbb-8ccc-ddddeeee0008",
    event_id: "a1b2c3d4-0003-4e5f-8a9b-c1d2e3f40003",
    user_id: "TGI00401",
    registered_at: "2025-05-06T13:30:00.000Z",
  },
  {
    id: "r0000009-aaaa-4bbb-8ccc-ddddeeee0009",
    event_id: "a1b2c3d4-0003-4e5f-8a9b-c1d2e3f40003",
    user_id: "TGI00402",
    registered_at: "2025-05-07T10:00:00.000Z",
  },
  {
    id: "r0000010-aaaa-4bbb-8ccc-ddddeeee0010",
    event_id: "a1b2c3d4-0003-4e5f-8a9b-c1d2e3f40003",
    user_id: "TGI00403",
    registered_at: "2025-05-07T15:45:00.000Z",
  },
  {
    id: "r0000011-aaaa-4bbb-8ccc-ddddeeee0011",
    event_id: "a1b2c3d4-0003-4e5f-8a9b-c1d2e3f40003",
    user_id: "TGI00404",
    registered_at: "2025-05-08T08:20:00.000Z",
  },
  {
    id: "r0000012-aaaa-4bbb-8ccc-ddddeeee0012",
    event_id: "a1b2c3d4-0003-4e5f-8a9b-c1d2e3f40003",
    user_id: "TGI00302",
    registered_at: "2025-05-08T09:10:00.000Z",
  },

  // Event 4 – SAP BTP (2 inscrits)
  {
    id: "r0000013-aaaa-4bbb-8ccc-ddddeeee0013",
    event_id: "a1b2c3d4-0004-4e5f-8a9b-c1d2e3f40004",
    user_id: "TGI00501",
    registered_at: "2025-05-09T11:00:00.000Z",
  },
  {
    id: "r0000014-aaaa-4bbb-8ccc-ddddeeee0014",
    event_id: "a1b2c3d4-0004-4e5f-8a9b-c1d2e3f40004",
    user_id: "TGI00203",
    registered_at: "2025-05-10T14:30:00.000Z",
  },

  // Event 5 – RGPD (1 inscrit)
  {
    id: "r0000015-aaaa-4bbb-8ccc-ddddeeee0015",
    event_id: "a1b2c3d4-0005-4e5f-8a9b-c1d2e3f40005",
    user_id: "TGI00401",
    registered_at: "2025-05-11T08:45:00.000Z",
  },

  // Event 6 – ERP Finance (0 inscrit pour l'instant)
];