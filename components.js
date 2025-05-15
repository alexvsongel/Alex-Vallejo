import { authClient } from "./lib/auth.js";
///---------------CONSTANTES-----------------///
const alturaRelativaHeader = "10vh";
const alturaRelativaBody = "85vh";
const alturaRelativaFooter = "5vh";
const fontSizeh1 = "35px";
const fontSizeh2 = "24px";
const fontSizeh3 = "20px";
let usuarioActual = 103;

const backgroundColorButton = "#BF0F1E3D";
const accentColor = "#D42635";
const blackColor = "#1B1B1B";

let modoOscuroOff = JSON.parse(localStorage.getItem("modoOscuro")) || false;

//Inicio "Anchura Breackpoints"
let width = window.innerWidth;
const handleResize = () => {
  width = window.innerWidth;
  m.redraw();
};
window.addEventListener("resize", handleResize);

/**
 * Función creada por IA para animar botones usando una simulación de resorte.
 * @param {HTMLElement} element - The element to be animated.
 * @param {string} property - The CSS transform property to apply (e.g., "scale").
 * @param {number} from - Starting value.
 * @param {number} to - Target value.
 * @param {Object} options - Spring parameters.
 */
function animateSpring(element, property, from, to, options = {}) {
  let current = from;
  let velocity = 0;
  // Default spring parameters (tweak these to change the feel):
  const stiffness = options.stiffness || 200; // spring stiffness
  const damping = options.damping || 15; // damping factor
  const mass = options.mass || 1; // mass (affects acceleration)
  const threshold = options.threshold || 0.001; // when to stop the animation

  const dt = 1 / 60; // approximate time step (60fps)

  function update() {
    // Calculate the spring force: F = -stiffness * (current - to)
    const springForce = -stiffness * (current - to);
    // Calculate the damping force: F = -damping * velocity
    const dampingForce = -damping * velocity;
    // Sum forces to get acceleration: F = ma, so a = F / m
    const acceleration = (springForce + dampingForce) / mass;

    // Update velocity and current value with simple Euler integration
    velocity += acceleration * dt;
    current += velocity * dt;

    // Apply the new scale value using transform (for example, scale)
    element.style.transform = `${property}(${current.toFixed(3)})`;

    // Stop if the change is below a small threshold
    if (Math.abs(current - to) > threshold || Math.abs(velocity) > threshold) {
      requestAnimationFrame(update);
    } else {
      // Ensure final value is set
      element.style.transform = `${property}(${to})`;
    }
  }

  requestAnimationFrame(update);
}

///-------------------LOGIN------------------///
function Login() {
  let formData = {
    usuario: "",
    contraseña: "",
  };

  let loading = false;
  let error = "";

  let mostrarContraseña = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*
     * ESTO ES PARA CREAR LA CUENTA ADMIN
    await authClient.signUp.email({name: "admin", email: formData.usuario, password: formData.contraseña}, {
      onRequest: context => {
        // Mostrar un loader
      },
      onSuccess: context => {
        // Redirigir a la pagina de principal
        m.route.set("/Inicio");
      },
      onError: context => {
        // Mostrar error
        alert(context.error.message);
      }
    })
    /*
     * ESTE ES EL BUENO
     */
    await authClient.signIn.email({ email: formData.usuario, password: formData.contraseña }, {
      onRequest: () => {
        loading = true;
        error = "";
        m.redraw();
      },
      onResponse: () => {
        loading = false;
        m.redraw();
      },
      onSuccess: () => m.route.set("/Inicio"),
      onError: context => error = context.error.message,
    })
  };

  const handleInputChange = (key, value) => {
    //Falta implementar la funcionalidad
    formData[key] = value;
  };

  const toggleMostrarContraseña = () => {
    mostrarContraseña = !mostrarContraseña;
    m.redraw();
  };

  return {
    oncreate: () => {
      window.scrollTo(0, 0);
      authClient.useSession.subscribe((miau) => {
        const { error, data, isPending } = miau;
        let authenticated = false;

        if (isPending) {
          return;
        }

        if (error) {
          console.error(error);
          return;
        }

        if (data && data.session) {
          authenticated = true;
          console.log(data.user);
        }

        const currentRoute = m.route.get();

        if (currentRoute === "/Login" && authenticated) {
          m.route.set("/Inicio")
          m.redraw();
        }

        if (currentRoute !== "/Login" && !authenticated) {
          m.route.set("/Login")
          m.redraw();
        }
      });

    },
    view: () => {
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [
        m(Header),
        m("img", {
          src: "imagenes/logoRecortado.webp",
          alt: "Logo",
          style: {
            position: "absolute",
            top: "100px",
            left: "100px",
            width: "100px",
            height: "auto",
            transition: "all 0.3s ease",
            ...(window.innerWidth <= 970 && {
              width: "150px",
              position: "relative",
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
              margin: "0 auto",
            }),
          },
        }),
        m(
          "div",
          {
            style: {
              width: "90%",
              maxWidth: "500px",
              margin: "0 auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            },
          },
          [
            m(
              "h1",
              {
                style: {
                  fontSize: "3em",
                  color: modoOscuroOff ? "black" : "white",
                  fontFamily: "monospace",
                  textAlign: "center",
                  margin: "20px 0",
                },
              },
              "Iniciar Sesión"
            ),
            m(
              "form",
              {
                style: {
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                },
                onsubmit: handleSubmit,
              },
              [
                m(
                  "label",
                  {
                    for: "usuario",
                    style: {
                      color: modoOscuroOff ? "black" : "white",
                      fontFamily: "monospace",
                      fontSize: fontSizeh3,
                    },
                  },
                  "Usuario"
                ),
                m("input", {
                  type: "text",
                  id: "usuario",
                  placeholder: "Introduce tu usuario",
                  value: formData.usuario,
                  oninput: (e) => handleInputChange("usuario", e.target.value),
                  style: {
                    fontFamily: "monospace",
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "30px",
                    border: "2px solid #ccc",
                    boxSizing: "border-box",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = "none";
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    e.target.style.border = `2px solid ${accentColor}`;
                  },
                  onblur: (e) => {
                    e.target.style.backgroundColor = "#FFFFFF";
                    e.target.style.outline = "none";
                    e.target.style.color = "black";
                    e.target.style.border = "2px solid #ccc";
                  },
                }),
                m(
                  "label",
                  {
                    for: "contraseña",
                    style: {
                      color: modoOscuroOff ? "black" : "white",
                      fontFamily: "monospace",
                      fontSize: fontSizeh3,
                    },
                  },
                  "Contraseña"
                ),
                m(
                  "div",
                  {
                    style: {
                      position: "relative",
                      width: "100%",
                    },
                  },
                  [
                    m("input", {
                      type: mostrarContraseña ? "text" : "password",
                      id: "contraseña",
                      placeholder: "Introduce tu contraseña",
                      value: formData.contraseña,
                      oninput: (e) =>
                        handleInputChange("contraseña", e.target.value),
                      style: {
                        fontFamily: "monospace",
                        width: "100%",
                        padding: "0.8rem",
                        borderRadius: "30px",
                        border: "2px solid #ccc",
                        boxSizing: "border-box",
                        paddingRight: "3rem",
                      },
                      onfocus: (e) => {
                        e.target.style.backgroundColor = backgroundColorButton;
                        e.target.style.outline = "none";
                        e.target.style.color = modoOscuroOff
                          ? "black"
                          : "white";
                        e.target.style.border = `2px solid ${accentColor}`;
                      },
                      onblur: (e) => {
                        e.target.style.backgroundColor = "#FFFFFF";
                        e.target.style.outline = "none";
                        e.target.style.color = "black";
                        e.target.style.border = "2px solid #ccc";
                      },
                    }),
                    m(
                      "button",
                      {
                        type: "button",
                        onclick: toggleMostrarContraseña,
                        style: {
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                        onfocus: (e) => {
                          e.target.style.outline = `2px solid ${accentColor}`;
                          e.target.style.borderRadius = "50%";
                        },
                        onblur: (e) => {
                          e.target.style.outline = "none";
                        },
                      },
                      m("img", {
                        src: "imagenes/ojo.svg",
                        alt: mostrarContraseña
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña",
                        style: {
                          width: "30px",
                          height: "30px",
                        },
                      })
                    ),
                  ]
                ),
                m(
                  "button",
                  {
                    type: "submit",
                    style: {
                      fontSize: fontSizeh3,
                      padding: "0.8rem",
                      borderRadius: "30px",
                      border: "none",
                      backgroundColor: "#6a131b",
                      color: "white",
                      cursor: "pointer",
                      marginTop: "20px",
                    },
                    onfocus: (e) => {
                      e.target.style.backgroundColor = backgroundColorButton;
                      e.target.style.outline = `2px solid ${accentColor}`;
                      e.target.style.color = modoOscuroOff ? "black" : "white";
                      animateSpring(e.target, "scale", 1.05, 1, {
                        stiffness: 1020,
                        damping: 10,
                        mass: 1.5,
                        threshold: 0.01,
                      });
                    },
                    onblur: (e) => {
                      e.target.style.outline = "none";
                      e.target.style.backgroundColor = "#6a131b";
                      e.target.style.color = "white";
                    },
                    onmouseenter: (e) => {
                      e.target.style.backgroundColor = backgroundColorButton;
                      e.target.style.outline = `2px solid ${accentColor}`;
                      e.target.style.color = modoOscuroOff ? "black" : "white";
                      animateSpring(e.target, "scale", 1.05, 1, {
                        stiffness: 900,
                        damping: 8,
                        mass: 1.2,
                        threshold: 0.01,
                      });
                    },
                    onmouseleave: (e) => {
                      e.target.style.backgroundColor = "#6a131b";
                      e.target.style.outline = "none";
                      e.target.style.color = "white";
                    }
                  },
                  `${loading ? "Cargando..." : "Iniciar Sesión"}`
                ),
                m("p", error)
              ]
            ),
          ]
        ),
      ];
    },
  };
}
///-------------------HEADER------------------///
function Header() {
  return {
    view: function() {
      const currentRoute = m.route.get();
      const enInicio = currentRoute === "/Inicio" || currentRoute === "/Login";
      return m(
        "header",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2rem 5vw 1rem 5vw",
            boxSizing: "border-box",
          },
        },
        [
          [
            !enInicio
              ? m(botonAtras)
              : m(".elementoInvisible", { style: { visibility: "hidden" } }), //Evita que aparezca el botón de volver al atrás
            !enInicio
              ? m(botonInicio)
              : m(".elementoInvisible", { style: { visibility: "hidden" } }), //Evita que aparezca el botón de volver al inicio
            m(botonModoOscuro),
          ].filter(Boolean),
        ]
      );
    },
  };
}

function botonModoOscuro() {
  return {
    view: () => {
      return m(
        "button",
        {
          role: "switch",
          ariaLabel: modoOscuroOff
            ? "Activar modo oscuro"
            : "Desactivar modo oscuro",
          ariaChecked: modoOscuroOff,
          style: {
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: "none",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(3rem, 6vw, 5rem)",
            height: "clamp(3rem, 6vw, 5rem)",
            cursor: "pointer",
            transition: "all 0.1s ease",
          },
          onclick: () => {
            modoOscuroOff = !modoOscuroOff;
            localStorage.setItem("modoOscuro", JSON.stringify(modoOscuroOff));
            m.redraw();
          },
          onfocus: (e) => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onblur: (e) => {
            e.target.style.outline = "none";
            e.target.style.backgroundColor = "transparent";
          },
          onmouseenter: (e) => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onmouseleave: (e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.outline = "none";
          },
        },
        m("img", {
          src: modoOscuroOff
            ? "imagenes/luna2.svg"
            : "imagenes/modoOscuroBlanco.svg",
          style: {
            width: "70%",
            height: "70%",
            objectFit: "contain",
          },
          alt: modoOscuroOff ? "Activar modo oscuro" : "Desactivar modo oscuro",
        })
      );
    },
  };
}

function botonInicio() {
  return {
    view: () => {
      return m(
        "button",
        {
          role: "switch",
          ariaLabel: modoOscuroOff
            ? "Activar modo oscuro"
            : "Desactivar modo oscuro",
          ariaChecked: modoOscuroOff,
          style: {
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: "none",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(3rem, 6vw, 5rem)",
            height: "clamp(3rem, 6vw, 5rem)",
            cursor: "pointer",
            alt: "Volver al inicio",
          },
          onclick: () => {
            m.route.set("/Inicio");
          },
          onfocus: (e) => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onblur: (e) => {
            e.target.style.outline = "none";
            e.target.style.backgroundColor = "transparent";
          },
          onmouseenter: (e) => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onmouseleave: (e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.outline = "none";
          },
        },
        m("img", {
          src: modoOscuroOff
            ? "imagenes/inicio.svg"
            : "imagenes/inicioBlanco.svg",
          style: {
            width: "70%",
            height: "70%",
            objectFit: "contain",
          },
        })
      );
    },
  };
}

function botonAtras() {
  return {
    view: () => {
      return m(
        "button",
        {
          role: "switch",
          ariaLabel: modoOscuroOff
            ? "Activar modo oscuro"
            : "Desactivar modo oscuro",
          ariaChecked: modoOscuroOff,
          style: {
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: "none",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(3rem, 6vw, 5rem)",
            height: "clamp(3rem, 6vw, 5rem)",
            cursor: "pointer",
            alt: "Volver al inicio",
          },
          onclick: () => {
            window.history.back();
          },
          onfocus: (e) => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onblur: (e) => {
            e.target.style.outline = "none";
            e.target.style.backgroundColor = "transparent";
          },
          onmouseenter: (e) => {
            e.target.style.backgroundColor = backgroundColorButton;
            e.target.style.outline = `2px solid ${accentColor}`;
          },
          onmouseleave: (e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.outline = "none";
          },
        },
        m("img", {
          src: modoOscuroOff
            ? "imagenes/volver.svg"
            : "imagenes/volverBlanco.svg",
          style: {
            width: "70%",
            height: "70%",
            objectFit: "contain",
          },
        })
      );
    },
  };
}

///-------------------INICIO-------------------///
function Inicio() {

  let datosBtn = [
    {
      icono: "imagenes/calendario.svg",
      texto: "Calendario",
      iconoModoOscuro: "imagenes/calendarioBlanco.svg",
      alt: "",
      titulo: "",
      slug: "/Calendario",
    },
    {
      icono: "imagenes/galeria.svg",
      texto: "Galería",
      iconoModoOscuro: "imagenes/galeriaBlanco.svg",
      alt: "",
      titulo: "",
      slug: "/Galeria",
    },
    {
      icono: "imagenes/buzon.svg",
      texto: "Buzón de sugerencias",
      iconoModoOscuro: "imagenes/buzonBlanco.svg",
      alt: "",
      titulo: "",
      slug: "/Buzon",
    },
    {
      icono: "imagenes/documentos.svg",
      texto: "Documentos",
      iconoModoOscuro: "imagenes/documentosBlanco.svg",
      alt: "",
      titulo: "",
      slug: "/Documentos",
    },
  ];
  return {
    oncreate: async () => {
      window.scrollTo(0, 0);
      authClient.useSession.subscribe((miau) => {
        const { error, data, isPending } = miau;
        let authenticated = false;

        if (isPending) {
          return;
        }

        if (error) {
          console.error(error);
          return;
        }

        if (data && data.session) {
          authenticated = true;
        }

        const currentRoute = m.route.get();

        if (currentRoute === "/Login" && authenticated) {
          m.route.set("/Inicio")
          m.redraw();
        }

        if (currentRoute !== "/Login" && !authenticated) {
          m.route.set("/Login")
          m.redraw();
        }
      });
    },
    view: () => {
      return (
        (document.body.style.backgroundColor = modoOscuroOff
          ? "white"
          : blackColor),
        [
          m(Header),
          m(
            "div",
            {
              style: {
                postion: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                boxSizing: "border-box",
              },
            },
            [
              m(
                "h1",
                {
                  style: {
                    fontSize: "3em",
                    textAlign: "center",
                    marginBottom: "3vh",
                    color: modoOscuroOff ? "black" : "white",
                  },
                },
                "Bienvenido Usuario!"
              ),
              m(
                "main",
                {
                  style: {
                    padding: "15px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    margin: "0 auto",
                    maxWidth: "850px",
                    boxSizing: "border-box",
                    justifyContent: "center",
                  },
                },
                datosBtn.map((btn) =>
                  m(
                    "button",
                    {
                      style: {
                        backgroundColor: backgroundColorButton,
                        minHeight: "300px",
                        flex:
                          window.innerWidth < 850 ? "0 0 300px" : "0 0 400px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: fontSizeh2,
                        padding: "10px",
                        border: `2px solid 
                          ${modoOscuroOff ? "transparent" : accentColor}`,
                        borderRadius: "30px",
                        cursor: "pointer",
                        boxSizing: "border-box",
                        transform: "scale(1)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                        gap: "20px",
                      },
                      onfocus: (e) => {
                        (e.target.style.backgroundColor = accentColor),
                          (e.target.style.outline = "none"),
                          animateSpring(e.target, "scale", 1.05, 1, {
                            stiffness: 1020,
                            damping: 10,
                            mass: 1.5,
                            threshold: 0.01,
                          });
                      },
                      onblur: (e) => (
                        (e.target.style.backgroundColor =
                          backgroundColorButton),
                        (e.target.style.transform = "scale(1)")
                      ),
                      onmouseenter: (e) => {
                        e.target.style.backgroundColor = accentColor;
                        animateSpring(e.target, "scale", 1.05, 1, {
                          stiffness: 1020,
                          damping: 10,
                          mass: 1.5,
                          threshold: 0.01,
                        });
                      },
                      onmouseleave: function(e) {
                        (e.target.style.backgroundColor =
                          backgroundColorButton),
                          (e.target.style.transform = "scale(1)");
                      },
                      onclick: function() {
                        m.route.set(btn.slug);
                      },
                    },
                    m(
                      "span",
                      {
                        style: {
                          width: "50%",
                          height: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      },
                      m("img", {
                        src: modoOscuroOff ? btn.icono : btn.iconoModoOscuro,
                        alt: "Ir a " + btn.texto,
                        style: {
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        },
                      })
                    ),
                    m(
                      "span",
                      {
                        style: {
                          fontSize: fontSizeh1,
                          color: modoOscuroOff ? "black" : "white",
                        },
                      },
                      btn.texto
                    )
                  )
                )
              ),
              m(
                "button",
                {
                  style: {
                    fontSize: fontSizeh3,
                    padding: "0.8rem 2rem",
                    borderRadius: "30px",
                    border: "none",
                    backgroundColor: "#6a131b",
                    color: "white",
                    cursor: "pointer",
                    marginTop: "2vh",
                    marginBottom: "2vh",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = `2px solid ${accentColor}`;
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    animateSpring(e.target, "scale", 1.05, 1, {
                      stiffness: 1020,
                      damping: 10,
                      mass: 1.5,
                      threshold: 0.01,
                    });
                  },
                  onblur: (e) => {
                    e.target.style.outline = "none";
                    e.target.style.backgroundColor = "#6a131b";
                    e.target.style.color = "white";
                  },
                  onmouseenter: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = `2px solid ${accentColor}`;
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    animateSpring(e.target, "scale", 1.05, 1, {
                      stiffness: 900,
                      damping: 8,
                      mass: 1.2,
                      threshold: 0.01,
                    });
                  },
                  onmouseleave: (e) => {
                    e.target.style.backgroundColor = "#6a131b";
                    e.target.style.outline = "none";
                    e.target.style.color = "white";
                  },
                  onclick: () => {
                    authClient.signOut({
                      fetchOptions: {
                        onRequest: context => {
                          console.log(context)
                        },
                        onSuccess: () => {
                          m.route.set("/Login");
                        },
                      },
                    })
                  },
                },
                "Cerrar Sesión"
              ),
            ]
          ),
        ]
      );
    },
  };
}

///-------------------CALENDARIO-------------------///
function formatearFecha(fechaStr) {
  // Convertir la cadena a objeto Date
  const fecha = new Date(fechaStr);

  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];

  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;

  // Formatear la cadena final
  return `${diaSemana} ${dia} de ${mes} a las ${horas}:${minutos}`;
}

async function getActividades() {
  try {
    const response = await fetch("http://localhost:3000/calendario");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const events = await response.json();
    console.log("Actividades recibidos:", events);
    return events;
  } catch (error) {
    console.error("Error fetching actividades:", error);
    return [];
  }
}

function Calendario() {
  let calendar;
  return {
    oncreate: async () => {
      window.scrollTo(0, 0);
      const calendarEl = document.getElementById("calendar");
      if (calendarEl) {
        calendar = new FullCalendar.Calendar(calendarEl, {
          locale: "es",
          firstDay: 1,
          initialView: "dayGridMonth",
          contentHeight: "auto",
          aspectRatio: 1.5,
          buttonText: {
            today: "Hoy",
          },
          headerToolbar: { left: "", center: "title", right: "" },
          footerToolbar: { left: "today", center: "", right: "prev,next" },
          events: await getActividades(),
          eventClick: (info) =>
            console.log(
              `Actividad: ${info.event.title}\nFecha inicio: ${formatearFecha(
                info.event.start
              )}\nFecha fin: ${formatearFecha(info.event.end)}`
            ),
          dateClick: (info) => {
            const title = prompt("Nueva actividad:");
            if (title) calendar.addEvent({ title, start: info.dateStr });
          },
        });
        calendar.render();
      }
    },
    onremove: () => {
      if (calendar) calendar.destroy();
    },

    view: () => {
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [
        m(Header),
        m(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: modoOscuroOff ? "black" : "white",
            },
          },
          m(
            "h1",
            {
              style: {
                marginBottom: "1.5vh",
                fontSize: "3em",
              },
            },
            "Calendario"
          ),
          m("div", {
            id: "calendar",
            style: {
              margin: "0 2%",
            },
          }),
          m(
            "button",
            {
              style: {
                fontSize: fontSizeh3,
                color: "white",
                margin: "2vh auto",
                padding: "0.8rem",
                borderRadius: "30px",
                backgroundColor: "#6a131b",
                border: "none",
              },
              onfocus: (e) => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = `2px solid ${accentColor}`;
                e.target.style.color = modoOscuroOff ? "black" : "white";
                animateSpring(e.target, "scale", 1.05, 1, {
                  stiffness: 1020,
                  damping: 10,
                  mass: 1.5,
                  threshold: 0.01,
                });
              },
              onblur: (e) => {
                e.target.style.outline = "none";
                e.target.style.backgroundColor = "#6a131b";
                e.target.style.color = "white";
              },
              onmouseenter: (e) => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = `2px solid ${accentColor}`;
                e.target.style.color = modoOscuroOff ? "black" : "white";
                animateSpring(e.target, "scale", 1.05, 1, {
                  stiffness: 900,
                  damping: 8,
                  mass: 1.2,
                  threshold: 0.01,
                });
              },
              onmouseleave: (e) => {
                e.target.style.backgroundColor = "#6a131b";
                e.target.style.outline = "none";
                e.target.style.color = "white";
              },
              onclick: function() {
                m.route.set("/AñadirActividad");
              },
            },
            "Añadir actividad"
          )
        ),
      ];
    },
  };
}

function AñadirActividad() {
  let formData = {
    titulo: "",
    ubicacion: "",
    fecha: "",
    horario: "",
    descripcion: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const actividad = {
        titulo: formData.titulo,
        ubicacion: formData.ubicacion,
        fecha: formData.fecha,
        horario: formData.horario,
        descripcion: formData.descripcion,
      };

      const response = await m.request({
        method: "POST",
        url: "http://localhost:3000/calendario",
        body: actividad,
      });

      alert("Actividad añadido correctamente!");
      formData = {
        titulo: "",
        ubicacion: "",
        fecha: "",
        horario: "",
        descripcion: "",
      };
    } catch (error) {
      console.error("Error al añadir la actividad:", error);
      alert("Hubo un error al añadir la actividad");
    }
  };

  // Función para actualizar formData cuando cambian los inputs
  const handleInputChange = (key, value) => {
    formData[key] = value;
  };
  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => {
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [
        m(Header),
        m(
          "h1",
          {
            style: {
              fontSize: "3em",
              color: modoOscuroOff ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "center",
              margin: "20px 0",
            },
          },
          "Añade tu actividad"
        ),
        m(
          "div",
          {
            style: {
              width: "90%",
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            },
          },
          m(
            "form",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                gap: "15px",
              },
              onsubmit: handleSubmit,
            },
            [
              //Titulo
              m(
                "label",
                {
                  for: "Titulo",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Título"
              ),
              m("input", {
                type: "text",
                placeholder: "Escribe un nombre para tu actividad: ",
                ariaLabel: "Escribe aquí un nombre para tu actividad: ",
                value: formData.titulo,
                oninput: (e) => handleInputChange("titulo", e.target.value),
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              //Ubicación
              m(
                "label",
                {
                  for: "ubicacion",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Ubicación"
              ),
              m("input", {
                type: "text",
                placeholder: "Escribe donde quieres hacer tu actividad: ",
                ariaLabel: "Escribe aquí la ubicación de tu actividad: ",
                value: formData.ubicacion,
                oninput: (e) => handleInputChange("ubicacion", e.target.value),
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              //Fecha
              m(
                "label",
                {
                  for: "fecha",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Fecha: "
              ),
              m("input", {
                id: "fecha",
                type: "date",
                ariaLabel:
                  "Escribe aquí la fecha de tu actividad con formato día / número de mes / año",
                value: formData.fecha,
                oninput: (e) => handleInputChange("fecha", e.target.value),
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              //Horario
              m(
                "label",
                {
                  for: "horario",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Hora: "
              ),
              m("input", {
                id: "horario",
                type: "text",
                placeholder: "Formato: 09:00-15:00",
                ariaLabel:
                  "Escribe aquí qué horario va a tener la actividad con formato hora:minuto-hora:minuto",
                value: formData.horario,
                oninput: (e) => handleInputChange("horario", e.target.value),

                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              //Descripción
              m(
                "label",
                {
                  for: "descripcion",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Descripción"
              ),
              m("textarea", {
                id: "descripcion",
                name: "Describe tu actividad: ",
                value: formData.descripcion,

                ariaLabel: "Describe aquí tu actividad",
                style: {
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                  minHeight: "150px",
                  resize: "vertical",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "button",
                {
                  style: {
                    fontSize: fontSizeh3,
                    color: "white",
                    margin: "2vh auto",
                    padding: "0.8rem",
                    borderRadius: "30px",
                    backgroundColor: "#6a131b",
                    border: "none",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = `2px solid ${accentColor}`;
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    animateSpring(e.target, "scale", 1.05, 1, {
                      stiffness: 1020,
                      damping: 10,
                      mass: 1.5,
                      threshold: 0.01,
                    });
                  },
                  onblur: (e) => {
                    e.target.style.outline = "none";
                    e.target.style.backgroundColor = "#6a131b";
                    e.target.style.color = "white";
                  },
                  onmouseenter: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = `2px solid ${accentColor}`;
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    animateSpring(e.target, "scale", 1.05, 1, {
                      stiffness: 900,
                      damping: 8,
                      mass: 1.2,
                      threshold: 0.01,
                    });
                  },
                  onmouseleave: (e) => {
                    e.target.style.backgroundColor = "#6a131b";
                    e.target.style.outline = "none";
                    e.target.style.color = "white";
                  },
                  onclick: function() {
                    //Añade la actividad
                  },
                },
                "Añadir actividad"
              ),
            ]
          )
        ),
      ];
    },
  };
}

///-------------------GALERIA-------------------///
function Galeria() {
  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => {
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [
        m(Header),
        m(
          "h1",
          {
            style: {
              fontSize: "3em",
              color: modoOscuroOff ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "center",
              margin: "20px 0",
            },
          },
          "Galería"
        ),
        m(
          "p",
          {
            style: {
              fontSize: fontSizeh3,
              color: modoOscuroOff ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "left",
              margin: "0 auto",
              maxWidth: "800px",
              width: "90%",
              lineHeight: "1.6",
            },
          },
          "Aquí puedes ver las fotos de las actividades que hemos realizado."
        ),
      ];
    },
  };
}

///-------------------BUZON-------------------///
function BuzonDeSugerencias() {
  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => {
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [
        m(Header),
        m(
          "h1",
          {
            style: {
              fontSize: "3em",
              color: modoOscuroOff ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "center",
              margin: "20px 0",
            },
          },
          "Buzón de sugerencias"
        ),
        m(
          "p",
          {
            style: {
              fontSize: fontSizeh3,
              color: modoOscuroOff ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "left",
              margin: "0 auto",
              maxWidth: "800px",
              width: "90%",
              lineHeight: "1.6",
            },
          },
          "¿Tienes una idea genial? ¡Compártela con nosotros!"
        ),
        m(
          "p",
          {
            style: {
              fontSize: fontSizeh3,
              color: modoOscuroOff ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "left",
              margin: "0 auto",
              maxWidth: "800px",
              width: "90%",
              lineHeight: "1.6",
            },
          },
          "En esta sección puedes sugerir una actividad que te gustaría hacer rellenando el formulario o ver las sugerencias que tus compañer@s han compartido."
        ),
        m(
          "div",
          {
            style: {
              width: "90%",
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            },
          },
          m(
            "button",
            {
              type: "button",
              style: {
                fontSize: fontSizeh3,
                color: "white",
                padding: "0.8rem",
                borderRadius: "30px",
                backgroundColor: "#6a131b",
                border: "none",
                width: "fit-content",
                display: "block",
                margin: "30px auto 4vh auto",
              },
              onfocus: (e) => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = `2px solid ${accentColor}`;
                e.target.style.color = modoOscuroOff ? "black" : "white";
                animateSpring(e.target, "scale", 1.05, 1, {
                  stiffness: 1020,
                  damping: 10,
                  mass: 1.5,
                  threshold: 0.01,
                });
              },
              onblur: (e) => {
                e.target.style.outline = "none";
                e.target.style.backgroundColor = "#6a131b";
                e.target.style.color = "white";
              },
              onmouseenter: (e) => {
                e.target.style.backgroundColor = backgroundColorButton;
                e.target.style.outline = `2px solid ${accentColor}`;
                e.target.style.color = modoOscuroOff ? "black" : "white";
                animateSpring(e.target, "scale", 1.05, 1, {
                  stiffness: 900,
                  damping: 8,
                  mass: 1.2,
                  threshold: 0.01,
                });
              },
              onmouseleave: (e) => {
                e.target.style.backgroundColor = "#6a131b";
                e.target.style.outline = "none";
                e.target.style.color = "white";
              },
              onclick: function() {
                m.route.set("/Sugerencias");
              },
            },
            " Ver sugerencias"
          ),
          m(
            "form",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                gap: "15px",
              },
            },
            [
              m(
                "label",
                {
                  for: "Titulo",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Título"
              ),
              m("input", {
                type: "text",
                placeholder: "Escribe un nombre para tu actividad: ",
                ariaLabel: "Escribe aquí un nombre para tu actividad: ",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "label",
                {
                  for: "ubicacion",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Ubicación"
              ),
              m("input", {
                type: "text",
                placeholder: "Escribe donde quieres hacer tu actividad: ",
                ariaLabel: "Escribe aquí la ubicación de tu actividad: ",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "label",
                {
                  for: "fecha",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Fecha: "
              ),
              m("input", {
                id: "ubicacion",
                type: "date",
                placeholder: "Escribe cuando quieres hacer tu actividad: ",
                ariaLabel:
                  "Escribe aquí la fecha de tu actividad con formato día / número de mes / año",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              //--------------------Horario
              m(
                "label",
                {
                  for: "horario",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Horario: "
              ),
              m("input", {
                id: "horario",
                type: "text",
                placeholder: "Formato: 09:00-15:00",
                ariaLabel:
                  "Escribe aquí qué horario va a tener la actividad con formato hora:minuto-hora:minuto",
                style: {
                  fontFamily: "monospace",
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              //--------------------Descripción
              m(
                "label",
                {
                  for: "descripcion",
                  style: {
                    color: modoOscuroOff ? "black" : "white",
                    fontFamily: "monospace",
                    fontSize: fontSizeh3,
                  },
                },
                "Descripción"
              ),
              m("textarea", {
                name: "Describe tu actividad: ",
                ariaLabel: "Describe aquí tu actividad",
                id: "descripcion",
                style: {
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "30px",
                  border: "2px solid #ccc",
                  boxSizing: "border-box",
                  minHeight: "150px",
                  resize: "vertical",
                },
                onfocus: (e) => {
                  e.target.style.backgroundColor = backgroundColorButton;
                  e.target.style.outline = "none";
                  e.target.style.color = modoOscuroOff ? "black" : "white";
                  e.target.style.border = `2px solid ${accentColor}`;
                },
                onblur: (e) => {
                  e.target.style.backgroundColor = "#FFFFFF";
                  e.target.style.outline = "none";
                  e.target.style.color = "black";
                  e.target.style.border = "2px solid #ccc";
                },
              }),
              m(
                "button",
                {
                  type: "submit",
                  style: {
                    fontSize: fontSizeh3,
                    padding: "0.8rem",
                    borderRadius: "30px",
                    border: "none",
                    backgroundColor: "#6a131b",
                    color: "white",
                    cursor: "pointer",
                    margin: "10px auto 0",
                    width: "fit-content",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = `2px solid ${accentColor}`;
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    animateSpring(e.target, "scale", 1.05, 1, {
                      stiffness: 1020,
                      damping: 10,
                      mass: 1.5,
                      threshold: 0.01,
                    });
                  },
                  onblur: (e) => {
                    e.target.style.outline = "none";
                    e.target.style.backgroundColor = "#6a131b";
                    e.target.style.color = "white";
                  },
                  onmouseenter: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = `2px solid ${accentColor}`;
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    animateSpring(e.target, "scale", 1.05, 1, {
                      stiffness: 900,
                      damping: 8,
                      mass: 1.2,
                      threshold: 0.01,
                    });
                  },
                  onmouseleave: (e) => {
                    e.target.style.backgroundColor = "#6a131b";
                    e.target.style.outline = "none";
                    e.target.style.color = "white";
                  },
                  onclick: (e) => {
                    e.preventDefault();
                  },
                },
                "Enviar sugerencia"
              ),
            ]
          )
        ),
      ];
    },
  };
}

function getSugerencias() {
  return [
    {
      id: 1,
      user_id: 101,
      title: "Taller de programación en Mithril",
      start_date: "2024-06-15",
      hour: "16:30",
      location: "Aula 3, Edificio Principal",
      description:
        "Un taller práctico para aprender a construir aplicaciones web con Mithril.js y buenas prácticas de desarrollo.",
      created_at: "2024-05-07T10:00:00Z",
      updated_at: "2024-05-07T10:00:00Z",
    },
    {
      id: 2,
      user_id: 42,
      title: "Charla sobre accesibilidad web",
      start_date: "2024-06-20",
      hour: "18:00",
      location: "Sala de Conferencias Virtual",
      description: "Cómo diseñar interfaces inclusivas y cumplir con WCAG 2.1.",
      created_at: "2024-05-07T11:30:00Z",
      updated_at: "2024-05-07T11:30:00Z",
    },
    {
      id: 3,
      user_id: 89,
      title: "Meetup de desarrollo open-source",
      start_date: "2024-07-05",
      hour: "19:15",
      location: "Cafetería TechHub",
      description:
        "Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.",
      created_at: "2024-05-07T12:45:00Z",
      updated_at: "2024-05-07T12:45:00Z",
    },
    {
      id: 3,
      user_id: 89,
      title: "Meetup de desarrollo open-source",
      start_date: "2024-07-05",
      hour: "19:15",
      location: "Cafetería TechHub",
      description:
        "Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.",
      created_at: "2024-05-07T12:45:00Z",
      updated_at: "2024-05-07T12:45:00Z",
    },
    {
      id: 3,
      user_id: 89,
      title: "Meetup de desarrollo open-source",
      start_date: "2024-07-05",
      hour: "19:15",
      location: "Cafetería TechHub",
      description:
        "Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.",
      created_at: "2024-05-07T12:45:00Z",
      updated_at: "2024-05-07T12:45:00Z",
    },
    {
      id: 3,
      user_id: 89,
      title: "Meetup de desarrollo open-source",
      start_date: "2024-07-05",
      hour: "19:15",
      location: "Cafetería TechHub",
      description:
        "Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.",
      created_at: "2024-05-07T12:45:00Z",
      updated_at: "2024-05-07T12:45:00Z",
    },
    {
      id: 3,
      user_id: 89,
      title: "Meetup de desarrollo open-source",
      start_date: "2024-07-05",
      hour: "19:15",
      location: "Cafetería TechHub",
      description:
        "Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.",
      created_at: "2024-05-07T12:45:00Z",
      updated_at: "2024-05-07T12:45:00Z",
    },
    {
      id: 3,
      user_id: 89,
      title: "Meetup de desarrollo open-source",
      start_date: "2024-07-05",
      hour: "19:15",
      location: "Cafetería TechHub",
      description:
        "Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.",
      created_at: "2024-05-07T12:45:00Z",
      updated_at: "2024-05-07T12:45:00Z",
    },
    {
      id: 3,
      user_id: 89,
      title: "Meetup de desarrollo open-source",
      start_date: "2024-07-05",
      hour: "19:15",
      location: "Cafetería TechHub",
      description:
        "Discusión sobre contribuciones a proyectos open-source y colaboración en equipo.",
      created_at: "2024-05-07T12:45:00Z",
      updated_at: "2024-05-07T12:45:00Z",
    },
  ];
}

function Sugerencias() {
  let sugerencias = getSugerencias().sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  let filtros = {
    nombre: "",
    fecha: "",
    titulo: "",
  };

  const filtrarSugerencias = () => {
    return sugerencias.filter((sugerencia) => {
      const coincideNombre = sugerencia.user_id
        .toString()
        .includes(filtros.nombre);
      const coincideTitulo = sugerencia.title
        .toLowerCase()
        .includes(filtros.titulo.toLowerCase());
      const coincideFecha =
        filtros.fecha === "" ||
        new Date(sugerencia.created_at)
          .toLocaleDateString("es-ES")
          .includes(filtros.fecha);

      return coincideNombre && coincideTitulo && coincideFecha;
    });
  };

  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => {
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [
        m(Header),
        m(
          "h1",
          {
            style: {
              fontSize: "3em",
              color: modoOscuroOff ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "center",
              margin: "20px 0",
            },
          },
          "Sugerencias"
        ),
        m(
          "div",
          {
            style: {
              width: "90%",
              maxWidth: "800px",
              margin: "0 auto",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            },
          },
          [
            m(
              "div",
              {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                  marginBottom: "20px",
                },
              },
              [
                m("input", {
                  type: "text",
                  placeholder: "Buscar por ID usuario",
                  value: filtros.nombre,
                  oninput: (e) => {
                    filtros.nombre = e.target.value;
                    m.redraw();
                  },
                  style: {
                    flex: "1",
                    minWidth: "200px",
                    padding: "10px",
                    borderRadius: "30px",
                    border: "2px solid #ccc",
                    color: modoOscuroOff ? "black" : "white",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = "none";
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    e.target.style.border = `2px solid ${accentColor}`;
                  },
                  onblur: (e) => {
                    e.target.style.backgroundColor = "#FFFFFF";
                    e.target.style.outline = "none";
                    e.target.style.color = "black";
                    e.target.style.border = "2px solid #ccc";
                  },
                }),
                m("input", {
                  type: "text",
                  placeholder: "Buscar por título",
                  value: filtros.titulo,
                  oninput: (e) => {
                    filtros.titulo = e.target.value;
                    m.redraw();
                  },
                  style: {
                    flex: "1",
                    minWidth: "200px",
                    padding: "10px",
                    borderRadius: "30px",
                    border: "2px solid #ccc",
                    color: modoOscuroOff ? "black" : "white",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = "none";
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    e.target.style.border = `2px solid ${accentColor}`;
                  },
                  onblur: (e) => {
                    e.target.style.backgroundColor = "#FFFFFF";
                    e.target.style.outline = "none";
                    e.target.style.color = "black";
                    e.target.style.border = "2px solid #ccc";
                  },
                }),
                m("input", {
                  type: "date",
                  value: filtros.fecha,
                  oninput: (e) => {
                    filtros.fecha = e.target.value;
                    m.redraw();
                  },
                  style: {
                    flex: "1",
                    minWidth: "200px",
                    padding: "10px",
                    borderRadius: "30px",
                    border: "2px solid #ccc",
                    color: modoOscuroOff ? "black" : "white",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.outline = "none";
                    e.target.style.color = modoOscuroOff ? "black" : "white";
                    e.target.style.border = `2px solid ${accentColor}`;
                  },
                  onblur: (e) => {
                    e.target.style.backgroundColor = "#FFFFFF";
                    e.target.style.outline = "none";
                    e.target.style.color = "black";
                    e.target.style.border = "2px solid #ccc";
                  },
                }),
              ]
            ),
            filtrarSugerencias().map((sugerencia) =>
              m(
                "div",
                {
                  tabindex: "0",
                  role: "article",
                  style: {
                    backgroundColor: backgroundColorButton,
                    padding: "20px",
                    borderRadius: "30px",
                    border: `2px solid ${modoOscuroOff ? "transparent" : accentColor
                      }`,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                    cursor: "pointer",
                    outline: "none",
                  },
                  onfocus: (e) => {
                    e.target.style.backgroundColor = accentColor;
                    e.target.style.outline = "none";
                  },
                  onblur: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.transform = "scale(1)";
                  },
                  onmouseenter: (e) => {
                    e.target.style.backgroundColor = accentColor;
                  },
                  onmouseleave: (e) => {
                    e.target.style.backgroundColor = backgroundColorButton;
                    e.target.style.transform = "scale(1)";
                  },
                },
                [
                  m(
                    "h2",
                    {
                      style: {
                        fontSize: fontSizeh2,
                        color: modoOscuroOff ? "black" : "white",
                        marginBottom: "10px",
                      },
                    },
                    sugerencia.title
                  ),
                  m(
                    "p",
                    {
                      style: {
                        fontSize: fontSizeh3,
                        color: modoOscuroOff ? "black" : "white",
                        marginBottom: "5px",
                      },
                    },
                    `ID Usuario: ${sugerencia.user_id}`
                  ),
                  m(
                    "p",
                    {
                      style: {
                        fontSize: fontSizeh3,
                        color: modoOscuroOff ? "black" : "white",
                      },
                    },
                    `Fecha: ${new Date(
                      sugerencia.created_at
                    ).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`
                  ),
                ]
              )
            ),
          ]
        ),
      ];
    },
  };
}
///---------------DOCUMENTOS-------------------///
function getDocumentosUsuario(usuarioActual) {
  // Aquí iría la lógica para obtener los documentos de la base de datos
  // Por ahora usaremos datos de ejemplo
  return [
    {
      id: 1,
      nombre: "Documentosdfsfsdfsdfsdfsdfsdfsdfsd1.pdf",
      fechaSubida: "2024-03-15",
      usuario: usuarioActual,
    },
    {
      id: 2,
      nombre: "Presentación.pptx",
      fechaSubida: "2024-03-14T15:45:00Z",
      usuario: usuarioActual,
    },
    {
      id: 3,
      nombre: "Informe.docx",
      fechaSubida: "2024-03-13T09:15:00Z",
      usuario: usuarioActual,
    },
  ];
}

function Documentos() {
  let documentos = getDocumentosUsuario(usuarioActual);
  let archivoSeleccionado = null;

  const handleFileSelect = (event) => {
    archivoSeleccionado = event.target.files[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivoSeleccionado) {
      alert("Por favor, selecciona un archivo");
      return;
    }

    // Aquí iría la lógica para subir el archivo al servidor
    alert("Archivo subido correctamente");
    documentos = getDocumentosUsuario(usuarioActual);
    m.redraw();
  };

  const handleDelete = (id) => {
    // Aquí iría la lógica para borrar el archivo del servidor
    documentos = documentos.filter((doc) => doc.id !== id);
    m.redraw();
  };

  return {
    oncreate: () => {
      window.scrollTo(0, 0);
    },
    view: () => {
      document.body.style.backgroundColor = modoOscuroOff
        ? "white"
        : blackColor;
      return [
        m(Header),
        m(
          "h1",
          {
            style: {
              fontSize: "3em",
              color: modoOscuroOff ? "black" : "white",
              fontFamily: "monospace",
              textAlign: "center",
              margin: "20px 0",
            },
          },
          "Mis Documentos"
        ),
        m(
          "div",
          {
            style: {
              width: "90%",
              maxWidth: "800px",
              margin: "2vh  auto",
              // padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            },
          },
          [
            // Botón para subir archivos
            m(
              "form",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  marginBottom: "30px",
                  width: "100%",
                },
                onsubmit: handleSubmit,
              },
              [
                m(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      alignItems: "center",
                      width: "100%",
                    },
                  },
                  [
                    m(
                      "label",
                      {
                        style: {
                          fontSize: fontSizeh3,
                          color: modoOscuroOff ? "black" : "white",
                          fontFamily: "monospace",
                          textAlign: "center",
                        },
                      },
                      "Subir nuevo documento"
                    ),
                    m(
                      "div",
                      {
                        style: {
                          position: "relative",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        },
                      },
                      [
                        m("input", {
                          type: "file",
                          onchange: handleFileSelect,
                          style: {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            opacity: 0,
                            cursor: "pointer",
                            zIndex: 2,
                          },
                        }),
                        m(
                          "div",
                          {
                            style: {
                              backgroundColor: backgroundColorButton,
                              padding: "0.8rem 2rem",
                              borderRadius: "30px",
                              border: `2px solid ${modoOscuroOff ? "#ccc" : accentColor
                                }`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "10px",
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              width: "100%",
                              maxWidth: "600px",
                            },
                          },
                          [
                            m("img", {
                              src: modoOscuroOff
                                ? "imagenes/subir.svg"
                                : "imagenes/subirBlanco.svg",
                              alt: "Subir archivo",
                              style: {
                                width: "24px",
                                height: "24px",
                              },
                            }),
                            m(
                              "span",
                              {
                                style: {
                                  fontSize: fontSizeh3,
                                  color: modoOscuroOff ? "black" : "white",
                                  fontFamily: "monospace",
                                  textAlign: "center",
                                  whiteSpace: "nowrap",
                                },
                              },
                              archivoSeleccionado
                                ? archivoSeleccionado.name
                                : "Seleccionar archivo"
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
                m(
                  "button",
                  {
                    type: "submit",
                    style: {
                      fontSize: fontSizeh3,
                      padding: "0.8rem",
                      borderRadius: "30px",
                      border: "none",
                      backgroundColor: "#6a131b",
                      color: "white",
                      cursor: "pointer",
                      width: "fit-content",
                      margin: "0 auto",
                    },
                    onfocus: (e) => {
                      e.target.style.backgroundColor = backgroundColorButton;
                      e.target.style.outline = `2px solid ${accentColor}`;
                      e.target.style.color = modoOscuroOff ? "black" : "white";
                      animateSpring(e.target, "scale", 1.05, 1, {
                        stiffness: 1020,
                        damping: 10,
                        mass: 1.5,
                        threshold: 0.01,
                      });
                    },
                    onblur: (e) => {
                      e.target.style.outline = "none";
                      e.target.style.backgroundColor = "#6a131b";
                      e.target.style.color = "white";
                    },
                    onmouseenter: (e) => {
                      e.target.style.backgroundColor = backgroundColorButton;
                      e.target.style.outline = `2px solid ${accentColor}`;
                      e.target.style.color = modoOscuroOff ? "black" : "white";
                      animateSpring(e.target, "scale", 1.05, 1, {
                        stiffness: 900,
                        damping: 8,
                        mass: 1.2,
                        threshold: 0.01,
                      });
                    },
                    onmouseleave: (e) => {
                      e.target.style.backgroundColor = "#6a131b";
                      e.target.style.outline = "none";
                      e.target.style.color = "white";
                    },
                  },
                  "Subir archivo"
                ),
              ]
            ),
            // Lista de documentos
            documentos.map((doc) =>
              m(
                "div",
                {
                  class: "1111",
                  style: {
                    backgroundColor: backgroundColorButton,
                    padding: "20px",
                    borderRadius: "30px",
                    border: `2px solid ${modoOscuroOff ? "transparent" : accentColor
                      }`,
                    display: "flex",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                  },
                },
                [
                  m(
                    "div",
                    {
                      class: "2222",
                      style: {
                        display: "flex",
                        flexDirection:
                          window.innerWidth <= 600 ? "column" : "row",
                        alignItems:
                          window.innerWidth <= 600 ? "flex-start" : "center",
                        gap: window.innerWidth <= 600 ? "10px" : "20px",
                        flex: 1,
                        width: "100%",
                      },
                    },
                    [
                      m(
                        "span",
                        {
                          style: {
                            fontSize: fontSizeh3,
                            color: modoOscuroOff ? "black" : "white",
                            fontFamily: "monospace",
                            wordBreak: "break-word",
                            maxWidth: window.innerWidth <= 600 ? "100%" : "50%",
                          },
                        },
                        doc.nombre
                      ),
                      m(
                        "span",
                        {
                          style: {
                            fontSize: fontSizeh3,
                            color: modoOscuroOff ? "black" : "white",
                            fontFamily: "monospace",
                            whiteSpace:
                              window.innerWidth <= 600 ? "normal" : "nowrap",
                          },
                        },
                        new Date(doc.fechaSubida).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      ),
                    ]
                  ),
                  m(
                    "button",
                    {
                      onclick: () => handleDelete(doc.id),
                      style: {
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        alignSelf:
                          window.innerWidth <= 600 ? "flex-end" : "center",
                      },
                      onfocus: (e) => {
                        e.target.style.backgroundColor = backgroundColorButton;
                        e.target.style.outline = `2px solid ${accentColor}`;
                      },
                      onblur: (e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.outline = "none";
                      },
                      onmouseenter: (e) => {
                        e.target.style.backgroundColor = backgroundColorButton;
                      },
                      onmouseleave: (e) => {
                        e.target.style.backgroundColor = "transparent";
                      },
                    },
                    m("img", {
                      src: modoOscuroOff
                        ? "imagenes/borrar.svg"
                        : "imagenes/borrarBlanco.svg",
                      alt: "Borrar documento",
                      style: {
                        width: "24px",
                        height: "24px",
                      },
                    })
                  ),
                ]
              )
            ),
          ]
        ),
      ];
    },
  };
}

export {
  Login,
  BuzonDeSugerencias,
  Sugerencias,
  Inicio,
  Calendario,
  AñadirActividad,
  Documentos,
  Galeria,
};
