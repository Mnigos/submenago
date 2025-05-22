# SubMenago - Subscription Management Application

## 📋 Application Overview

**SubMenago** is a personal subscription management application that helps users track and manage their paid subscriptions in one centralized dashboard. Users can monitor subscription costs, expiration dates, plan types, and billing cycles to better control their recurring expenses.

### Key Features

- 📱 **Dashboard Overview**: Visual summary of all subscriptions, total monthly/yearly costs
- 🎯 **Subscription Management**: Add, edit, delete, and categorize subscriptions
- 📅 **Expiration Tracking**: Calendar view and notifications for upcoming renewals
- 💰 **Cost Analysis**: Spending analytics and budget tracking
- 🏷️ **Plan Comparison**: Different tiers (Basic, Standard, Premium) with pricing
- 🔄 **Billing Cycles**: Support for monthly, yearly, and custom intervals
- 📚 **Predefined Services**: Popular services with automatic logos and plan data
- ✨ **Custom Subscriptions**: User-defined services for any subscription

---

## 🗂️ Implementation Plan

### **Phase 1: Database Schema & Models (2-3 days)**

#### Task 1.1: Design Database Schema

```prisma
// Add to schema.prisma
model Subscription {
  id                String            @id @default(cuid())
  userId            String
  serviceId         String
  planId            String
  customName        String?           // For custom subscriptions
  customDescription String?
  customLogo        String?
  startDate         DateTime
  nextBillingDate   DateTime
  endDate           DateTime?
  isActive          Boolean           @default(true)
  notes             String?
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
  
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  service           Service           @relation(fields: [serviceId], references: [id])
  plan              Plan              @relation(fields: [planId], references: [id])
  
  @@map("subscription")
}

model Service {
  id            String         @id @default(cuid())
  name          String         @unique
  description   String?
  logo          String?
  website       String?
  category      ServiceCategory
  isPopular     Boolean        @default(false)
  isCustom      Boolean        @default(false)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  
  plans         Plan[]
  subscriptions Subscription[]
  
  @@map("service")
}

model Plan {
  id            String         @id @default(cuid())
  serviceId     String
  name          String         // Premium, Standard, Basic
  description   String?
  features      Json?          // Array of features
  billingCycle  BillingCycle
  price         Decimal
  currency      String         @default("USD")
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  
  service       Service        @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  subscriptions Subscription[]
  
  @@map("plan")
}

enum ServiceCategory {
  STREAMING
  MUSIC
  GAMING
  PRODUCTIVITY
  CLOUD_STORAGE
  NEWS
  FITNESS
  EDUCATION
  DESIGN
  DEVELOPMENT
  OTHER
}

enum BillingCycle {
  MONTHLY
  YEARLY
  WEEKLY
  QUARTERLY
  LIFETIME
  CUSTOM
}
```

#### Task 1.2: Create Migration & Seed Data

- Create Prisma migration
- Seed popular services (Netflix, Spotify, Amazon Prime, etc.)
- Add common plans for each service

---

### **Phase 2: Core UI Components (3-4 days)**

#### Task 2.1: Layout & Navigation

- Create main dashboard layout
- Implement responsive navigation with sidebar
- Add user profile dropdown with auth actions

#### Task 2.2: Subscription Cards & Lists

```typescript
// components/subscription/subscription-card.tsx
// components/subscription/subscription-list.tsx
// components/subscription/subscription-grid.tsx
```

#### Task 2.3: Forms & Modals

```typescript
// components/subscription/add-subscription-modal.tsx
// components/subscription/edit-subscription-modal.tsx
// components/service/service-selector.tsx
// components/plan/plan-selector.tsx
```

#### Task 2.4: Dashboard Components

```typescript
// components/dashboard/overview-stats.tsx
// components/dashboard/spending-chart.tsx
// components/dashboard/upcoming-renewals.tsx
// components/dashboard/cost-breakdown.tsx
```

---

### **Phase 3: Subscription Management Features (4-5 days)**

#### Task 3.1: Add Subscription Flow

- Service selection (predefined + custom)
- Plan selection with pricing
- Billing cycle configuration
- Start date and renewal calculation

#### Task 3.2: Subscription CRUD Operations

```typescript
// app/api/subscriptions/route.ts - List & Create
// app/api/subscriptions/[id]/route.ts - Get, Update, Delete
// app/api/services/route.ts - List services
// app/api/services/[id]/plans/route.ts - Get plans for service
```

#### Task 3.3: Dashboard Pages

```typescript
// app/(dashboard)/page.tsx - Main dashboard
// app/(dashboard)/subscriptions/page.tsx - All subscriptions
// app/(dashboard)/subscriptions/[id]/page.tsx - Subscription details
// app/(dashboard)/analytics/page.tsx - Spending analytics
```

---

### **Phase 4: Advanced Features (3-4 days)**

#### Task 4.1: Calendar & Notifications

```typescript
// components/calendar/renewal-calendar.tsx
// components/notifications/upcoming-renewals.tsx
// lib/notifications.ts - Renewal reminder logic
```

#### Task 4.2: Analytics & Reporting

```typescript
// components/analytics/spending-overview.tsx
// components/analytics/category-breakdown.tsx
// components/analytics/cost-trends.tsx
// utils/analytics.ts - Calculation helpers
```

#### Task 4.3: Search & Filtering

```typescript
// components/subscription/subscription-filters.tsx
// components/search/global-search.tsx
// hooks/use-subscription-filters.ts
```

---

### **Phase 5: Service Management (2-3 days)**

#### Task 5.1: Predefined Services

- Implement popular services with logos
- Auto-complete service selection
- Service categories and filtering

#### Task 5.2: Custom Services

- Allow users to create custom services
- Image upload for custom logos
- Manage user's custom services

---

### **Phase 6: Polish & Optimization (2-3 days)**

#### Task 6.1: Error Handling & Validation

- Form validation with Zod schemas
- Error boundaries and fallbacks
- Loading states and skeletons

#### Task 6.2: Performance & UX

- Implement optimistic updates
- Add animations and transitions
- Mobile responsiveness
- PWA capabilities

---

## 🎯 Priority GitHub Issues

### **High Priority (MVP)**

1. **Database Schema Design** - Design and implement Prisma models
2. **Basic Subscription CRUD** - Add, view, edit, delete subscriptions
3. **Dashboard Overview** - Main dashboard with subscription summary
4. **Service Selection** - Choose from predefined services
5. **Plan & Pricing** - Configure subscription plans and pricing

### **Medium Priority (Enhanced UX)**

6. **Subscription Analytics** - Cost analysis and spending trends
7. **Calendar Integration** - Renewal calendar and notifications
8. **Custom Services** - Allow users to add custom subscription services
9. **Advanced Filtering** - Search and filter subscriptions
10. **Mobile Optimization** - Responsive design improvements

### **Low Priority (Nice-to-have)**

11. **Export/Import** - Data export and backup features
12. **Sharing** - Share subscription lists with family
13. **Integrations** - Connect with banking APIs for automatic tracking
14. **Dark Mode** - Theme switching
15. **Notifications** - Email/SMS renewal reminders

---

## 🛠️ Technical Architecture

### **Frontend Structure**

```
app/
├── (auth)/          # Authentication pages
├── (dashboard)/     # Main application pages
│   ├── page.tsx     # Dashboard overview
│   ├── subscriptions/
│   ├── analytics/
│   └── settings/
├── api/             # API routes
└── globals.css

components/
├── ui/              # ShadCN components
├── subscription/    # Subscription-specific components
├── dashboard/       # Dashboard components
├── analytics/       # Analytics components
└── forms/           # Form components

lib/
├── prisma.ts        # Database client
├── auth.ts          # Authentication config
├── validations/     # Zod schemas
└── utils/           # Helper functions
```

### **Database Relations**

- `User` → `Subscription` (one-to-many)
- `Service` → `Plan` (one-to-many)
- `Service` → `Subscription` (one-to-many)
- `Plan` → `Subscription` (one-to-many)

---

## 📈 Development Timeline

**Total Estimated Time: 18-22 days**

- **Week 1**: Database setup, core UI components
- **Week 2**: Subscription management, basic functionality
- **Week 3**: Advanced features, analytics
- **Week 4**: Polish, optimization, deployment

---

## 🚀 Getting Started

1. Set up database schema and run migrations
2. Create seed data for popular services
3. Build core UI components using existing ShadCN setup
4. Implement basic CRUD operations
5. Add dashboard and analytics features
6. Polish and optimize for production

This plan provides a solid foundation for building a comprehensive subscription management application while leveraging your existing tech stack effectively, focusing on implementation and user experience.
