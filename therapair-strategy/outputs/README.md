# Strategy Module Outputs

This directory contains the completed strategic analysis modules for Therapair.

## Structure

Each module produces two files:
- **[NN]_[MODULE_NAME].md** - The main strategic analysis document
- **[NN]_[MODULE_NAME].memory.md** - A condensed memory capsule for context in subsequent modules

## Modules

Once completed, this directory will contain:

### Core Analysis Modules
- `01_EXEC_SUMMARY.md` + `01_EXEC_SUMMARY.memory.md`
- `02_MARKET_ANALYSIS.md` + `02_MARKET_ANALYSIS.memory.md`
- `03_COMPETITIVE.md` + `03_COMPETITIVE.memory.md`
- `04_SWOT_PESTLE.md` + `04_SWOT_PESTLE.memory.md`

### User & Business Model Modules
- `05_AUDIENCE_JTBD.md` + `05_AUDIENCE_JTBD.memory.md`
- `06_BUSINESS_MODEL.md` + `06_BUSINESS_MODEL.memory.md`

### Go-to-Market Modules
- `07_POSITIONING.md` + `07_POSITIONING.memory.md`
- `08_MARKETING_GROWTH.md` + `08_MARKETING_GROWTH.memory.md`

### Execution & Planning Modules
- `09_ROADMAP.md` + `09_ROADMAP.memory.md`
- `10_FUNDING_GRANTS.md` + `10_FUNDING_GRANTS.memory.md`
- `11_RISKS_SUCCESS.md` + `11_RISKS_SUCCESS.memory.md`
- `12_TOP10_KPIS.md` + `12_TOP10_KPIS.memory.md`

## Workflow

1. Execute prompt from `/prompts/` directory
2. Use `/templates/module_output.template.md` for structure
3. Reference `/inputs/` for context and constraints
4. Include relevant `.memory.md` files from previous modules
5. Save completed module here
6. Create memory capsule using `/templates/memory_capsule.template.md`
7. Review against checklist in `/review/01_checklist.md`
8. Update `/review/CHANGELOG.md` upon approval

## Status

Track module completion status in `/review/CHANGELOG.md`.

---

*Modules will be generated sequentially, with each building on insights from previous work.*









