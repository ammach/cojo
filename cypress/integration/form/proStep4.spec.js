context("Form | Vie professionnelle - Trajets step", () => {
  const sizes = [
    {
      device: "iphone-5",
      width: 320,
    },
    {
      device: "ipad-2",
      width: 768,
    },
    {
      device: "macbook-13",
      width: 1280,
    },
  ];

  it("should show Trajets step on form page", () => {
    sizes.forEach((size) => {
      cy.viewport(size.device);
      cy.window().then((win) => {
        win.sessionStorage.clear();
        win.sessionStorage.setItem("current-step", 4);
        cy.login("email@paris2024.org");

        cy.visit("/form");

        cy.url()
          .should("include", "/form")
          .then(() => {
            cy.takeSnapshots("form - Trajets", size);
          });
      });
    });
  });
});
