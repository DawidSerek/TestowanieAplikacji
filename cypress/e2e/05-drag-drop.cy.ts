/// <reference types="cypress" />

import { DRAG_DROP_SELECTORS as SEL } from "../selectors/pages/interaction/drag-drop.selectors";

describe("Drag and Drop (/pages/interaction/drag-drop/)", () => {
  beforeEach(() => {
    cy.visit("/pages/interaction/drag-drop/");
  });

  it("Initial state shows the drop prompts (get, should, contains)", () => {
    cy.get(SEL.draggable1).should("contain.text", "Drag me");
    cy.get(SEL.draggable2).should("contain.text", "Drag me");
    cy.get(SEL.droppable1).should("contain.text", "Drop here");
    cy.get(SEL.droppable2).should("contain.text", "No Drop here");
  });

  it("Dropping draggable1 onto droppable1 changes its message (then, get, should)", () => {
    cy.window().then((win) => {
      const w = win as unknown as {
        dropped?: (droppee: Element, ontoa: Element[]) => void;
      };
      const draggable = win.document.getElementById("draggable1")!;
      const droppable = win.document.getElementById("droppable1")!;
      w.dropped?.(draggable, [droppable]);
    });

    cy.get(SEL.droppable1)
      .should("contain.text", "Dropped!");
  });

  it("Dropping draggable2 onto droppable1 changes its message to Get Off Me (then, get, should)", () => {
    cy.window().then((win) => {
      const w = win as unknown as {
        dropped?: (droppee: Element, ontoa: Element[]) => void;
      };
      const draggable = win.document.getElementById("draggable2")!;
      const droppable = win.document.getElementById("droppable1")!;
      w.dropped?.(draggable, [droppable]);
    });

    cy.get(SEL.droppable1)
      .should("contain.text", "Get Off Me");
  });
});
